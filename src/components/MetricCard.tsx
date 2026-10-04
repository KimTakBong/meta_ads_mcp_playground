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
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden group">
      {/* Compact view (default) */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-100 transition-colors">
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-gray-500 truncate">{title}</p>
            <p className="text-lg font-bold text-gray-900 leading-tight">{value}</p>
          </div>
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-0.5 text-xs font-semibold flex-shrink-0 ml-2 ${change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            <span>{change >= 0 ? '↑' : '↓'}</span>
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>

      {/* Expanded content on hover */}
      <div className="max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-300 ease-in-out">
        <div className="px-4 pb-3 pt-1 border-t border-gray-50">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-500">{subtitle}</span>
            {change !== undefined && (
              <span className="text-gray-400">vs minggu lalu</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
