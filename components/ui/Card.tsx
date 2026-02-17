import { ReactNode } from 'react';

interface CardProps {
    title: string;
    value: string | number;
    subValue?: string;
    icon?: ReactNode;
    className?: string;
}

export function Card({ title, value, subValue, icon, className = '' }: CardProps) {
    return (
        <div className={`bg-binance-dark p-6 rounded-lg shadow-lg border border-binance-gray/20 ${className}`}>
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
                {icon && <span className="text-binance-yellow">{icon}</span>}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            {subValue && <div className="text-sm text-gray-500">{subValue}</div>}
        </div>
    );
}
