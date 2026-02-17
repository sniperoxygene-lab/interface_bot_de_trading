'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Mock data for initial render
    const mockChartData = [
        { name: 'Jan', value: 4000 },
        { name: 'Feb', value: 3000 },
        { name: 'Mar', value: 5000 },
        { name: 'Apr', value: 4500 },
        { name: 'May', value: 6000 },
        { name: 'Jun', value: 7000 },
    ];

    useEffect(() => {
        // Fetch data from API
        // fetch('/api/stats').then...
        setLoading(false);
    }, []);

    return (
        <div className="min-h-screen bg-binance-black text-white p-8">
            <header className="mb-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-binance-yellow">Capital Dashboard</h1>
                <div className="text-sm text-gray-400">Last updated: Just now</div>
            </header>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card title="Total Capital (USDT)" value="124,500.00" subValue="≈ €114,540.00" />
                <Card title="Return on Investment" value="+12.5%" subValue="All time" />
                <Card title="PnL (Futures)" value="+ $15,420.00" subValue="Realized" />
                <Card title="Drawdown" value="-2.1%" subValue="Max peak-to-trough" />
            </div>

            {/* Main Chart */}
            <div className="bg-binance-dark p-6 rounded-lg shadow-lg border border-binance-gray/20 mb-8 h-[400px]">
                <h2 className="text-xl font-bold mb-4 text-white">Capital Evolution</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockChartData}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F0B90B" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#F0B90B" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#474D57" />
                        <YAxis stroke="#474D57" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1E2329', border: '1px solid #474D57' }}
                            itemStyle={{ color: '#F0B90B' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#F0B90B" fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Recent Trades / Activity */}
            <div className="bg-binance-dark p-6 rounded-lg shadow-lg border border-binance-gray/20">
                <h2 className="text-xl font-bold mb-4 text-white">Recent Activity</h2>
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-gray-400 border-b border-gray-700">
                            <th className="pb-2">Time</th>
                            <th className="pb-2">Type</th>
                            <th className="pb-2">Amount</th>
                            <th className="pb-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b border-gray-800">
                            <td className="py-3">2023-10-25 14:30</td>
                            <td className="py-3 text-green-500">Deposit</td>
                            <td className="py-3">1,000 USDT</td>
                            <td className="py-3">Completed</td>
                        </tr>
                        <tr>
                            <td className="py-3">2023-10-24 09:15</td>
                            <td className="py-3 text-binance-yellow">PnL Update</td>
                            <td className="py-3">+150 USDT</td>
                            <td className="py-3">Synced</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
