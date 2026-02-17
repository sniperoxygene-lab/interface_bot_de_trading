import crypto from 'crypto';

const BINANCE_API_URL = 'https://fapi.binance.com'; // Futures API
// Use 'https://api.binance.com' for Spot if needed, but requirements mention Futures PnL heavily.
// Requirement: "Capital total en USDT" -> This usually means Spot + Futures.
// We might need both.

const API_KEY = process.env.BINANCE_API_KEY;
const API_SECRET = process.env.BINANCE_API_SECRET;

async function binanceRequest(endpoint: string, method: 'GET' | 'POST' = 'GET', params: Record<string, any> = {}) {
    if (!API_KEY || !API_SECRET) {
        throw new Error('Binance API credentials missing');
    }

    const timestamp = Date.now();
    const queryString = new URLSearchParams({ ...params, timestamp: timestamp.toString() }).toString();
    const signature = crypto.createHmac('sha256', API_SECRET).update(queryString).digest('hex');

    const url = `${BINANCE_API_URL}${endpoint}?${queryString}&signature=${signature}`;

    const response = await fetch(url, {
        method,
        headers: {
            'X-MBX-APIKEY': API_KEY,
        },
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Binance API Error: ${response.status} ${error}`);
    }

    return response.json();
}

export async function getAccountBalance() {
    // Futures Account Balance
    const futuresBalances = await binanceRequest('/fapi/v2/balance');
    // Helper to parse specific assets or total wallet balance
    // Usually we look for "USDT" and "BNB" etc.
    // For Futures, "totalWalletBalance" or "totalMarginBalance" in USDT is key.

    // Note: For a complete view (Spot + Futures), we need to query Spot API too.
    // Assuming for now the "Capital" is primarily in Futures as per "Futures + PnL" focus.
    // If User holds funds in Spot, we'd need https://api.binance.com/api/v3/account

    // Let's implement a simple aggregation.
    const usdtAsset = futuresBalances.find((b: any) => b.asset === 'USDT');
    const totalUsdt = usdtAsset ? parseFloat(usdtAsset.balance) + parseFloat(usdtAsset.crossUnPnl) : 0;

    return {
        totalUsdt,
        // Add conversion to EUR here if we have a price feed, or fetch BTCUSDT/EURUSDT price
    };
}

export async function getFuturesStats() {
    // specific endpoint for positions or trades?
    // "PnL cumulé futures" -> can be derived from income history
    const income = await binanceRequest('/fapi/v1/income', 'GET', { incomeType: 'REALIZED_PNL', limit: 1000 });
    const cumulativePnl = income.reduce((acc: number, item: any) => acc + parseFloat(item.income), 0);

    return {
        cumulativePnl
    }
}
