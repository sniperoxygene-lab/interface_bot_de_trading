'use client';

import { useState } from 'react';

export default function InvestorsPage() {
    const [investors, setInvestors] = useState([
        { id: 1, name: 'Camille', invested: 5000, value: 5600, roi: 12 },
        { id: 2, name: 'Thomas', invested: 10000, value: 11200, roi: 12 },
    ]);

    return (
        <div className="min-h-screen bg-binance-black text-white p-8">
            <header className="mb-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-binance-yellow">Investors</h1>
                <button className="bg-binance-yellow text-binance-black px-4 py-2 rounded font-bold hover:bg-yellow-400 transition">
                    + New Investor
                </button>
            </header>

            <div className="bg-binance-dark rounded-lg shadow-lg border border-binance-gray/20 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-800 text-gray-400">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Total Invested</th>
                            <th className="p-4">Current Value</th>
                            <th className="p-4">ROI</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {investors.map((inv) => (
                            <tr key={inv.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <td className="p-4 font-bold">{inv.name}</td>
                                <td className="p-4">{inv.invested.toLocaleString()} USDT</td>
                                <td className="p-4 font-mono text-green-400">{inv.value.toLocaleString()} USDT</td>
                                <td className="p-4 text-green-400">+{inv.roi}%</td>
                                <td className="p-4">
                                    <button className="text-binance-yellow hover:underline mr-4">Deposit</button>
                                    <button className="text-red-400 hover:underline">Withdraw</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
