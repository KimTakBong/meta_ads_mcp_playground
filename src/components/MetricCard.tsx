import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  icon: ReactNode;
  subtitle?: string;
}

export default function MetricCard({ title, value, change, icon, subtitle }: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          {change !== undefined && (
            <div className={`flex items-center mt-2 text-sm font-medium ${change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              <span>{change >= 0 ? '↑' : '↓'} {Math.abs(change)}%</span>
              <span className="text-gray-400 ml-1 font-normal">vs minggu lalu</span>
            </div>
          )}
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}
