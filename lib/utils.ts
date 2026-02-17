import prisma from './db';

/**
 * Calculates the current total value of the pool.
 * This should handle fetching the latest capital snapshot or real-time data if needed.
 * For now, we'll assume it fetches the latest snapshot from the DB or a provided value.
 */
export async function getCurrentTotalCapital(): Promise<number> {
    const latestSnapshot = await prisma.capitalSnapshot.findFirst({
        orderBy: { createdAt: 'desc' },
    });
    return latestSnapshot?.totalUsdt || 0;
}

/**
 * Calculates the value of a specific investor's holdings.
 * Value = Sum of (Deposit Share * Current Total Capital) - Withdrawals (handled by share reduction)
 * actually, simplest model: 
 * Investor Value = (Investor's Total Current Shares) * Current Total Capital
 * 
 * Note: In this "share" model, "Total Capital" implies "Capital per 1.0 share" if we normalized it,
 * OR we can say: 
 * Total Shares = Sum of all investor shares.
 * Unit Value = Total Capital / Total Shares.
 * Investor Value = Investor Shares * Unit Value.
 * 
 * Method from User:
 * deposit: share = amount / capital_after (where capital_after = capital_before + amount)
 * This implies Share represents a percentage of the pool (0.0 to 1.0).
 * So Investor Value = Investor Shares * Total Capital.
 */

export async function getInvestorData(investorId: string, currentTotalCapital: number) {
    const deposits = await prisma.deposit.findMany({
        where: { investorId },
    });

    const withdrawals = await prisma.withdrawal.findMany({
        where: { investorId },
    });

    // Calculate current total shares for this investor
    // In a robust system, withdrawals would reduce the 'active' shares.
    // We need to track the 'active' shares.

    // Let's sum active shares. 
    // Accessing raw shares from deposits might be tricky if recent withdrawals reduced them.
    // Requirement: "Lors d’un retrait... réduire chaque share_i : share_i = share_i * (1 - ratio)"
    // This implies we need to update the Deposit rows OR track the current share factor.
    // Updating Deposit rows is destructive but simplest for this "Logique type fonds" description.
    // Alternatively, we store "CurrentActiveShare" on the Investor model or calculate it effectively.

    // Given the requirement "Réduire chaque share_i", we will opt to UPDATE the deposit records 
    // or store a "current_share" field on the deposit that gets updated.
    // Let's check schema: Deposit has `share`. We will treat this as the *current* share.

    let totalShares = 0;
    let totalInvested = 0;

    deposits.forEach(d => {
        totalShares += d.share;
        // We might want to track original invested amount separately if we want "Net Gain" to be accurate vs "Cash in".
        // For specific ROI, we usually compare Current Value vs Net Invested (Deposits - Withdrawals).
        totalInvested += d.amount;
    });

    withdrawals.forEach(w => {
        totalInvested -= w.amount;
        // withdrawals should have updated the deposit shares at the moment of withdrawal, 
        // so we don't subtract shares here again if we trust the DB state.
    });

    const currentValue = totalShares * currentTotalCapital;
    const netGain = currentValue - totalInvested;
    const roi = totalInvested > 0 ? (netGain / totalInvested) * 100 : 0;

    return {
        totalShares,
        totalInvested,
        currentValue,
        netGain,
        roi
    };
}
