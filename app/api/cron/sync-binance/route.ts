import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getAccountBalance, getFuturesStats } from '@/lib/binance';

export async function GET(req: NextRequest) {
    // Secure cron job
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const { totalUsdt } = await getAccountBalance();
        const { cumulativePnl } = await getFuturesStats();

        // Mock EUR rate for now or fetch it
        const eurRate = 0.92; // TODO: Fetch real rate
        const totalEur = totalUsdt * eurRate;

        // Calculate ROI / Drawdown based on previous snapshots
        // Simple logic for now: ROI = (Current - Start) / Start
        // "Start" needs definition. Is it "Capital Reference"?
        // Using simple PnL based ROI:
        // ROI = CumulativePnL / (TotalCapital - CumulativePnL) * 100 roughly, 
        // or better: ROI comes from proper time-weighted return if deposits happen.
        // For now, let's just log the basics demanded.

        const roi = 0; // Placeholder until we have refined formula
        const drawdown = 0; // Placeholder

        const snapshot = await prisma.capitalSnapshot.create({
            data: {
                totalUsdt,
                totalEur,
                cumulativePnl,
                roi,
                drawdown,
            },
        });

        return NextResponse.json({ success: true, snapshot });
    } catch (error: any) {
        console.error('Sync failed:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
