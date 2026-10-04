import { ReactNode, useState } from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  icon: ReactNode;
  subtitle?: string;
  details?: { label: string; value: string }[];
}

export default function MetricCard({ title, value, change, icon, subtitle, details }: MetricCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Compact view (always visible) */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
            isHovered ? 'bg-blue-100 text-blue-700' : 'bg-blue-50 text-blue-600'
          }`}>
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

      {/* Expanded overlay - absolute positioned, doesn't affect layout */}
      <div
        className={`absolute left-0 right-0 top-full z-50 transition-all duration-300 ease-in-out ${
          isHovered ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="mx-1 mt-1 p-3 bg-white rounded-xl border border-blue-200 shadow-xl">
          {subtitle && (
            <p className="text-[11px] text-gray-500 mb-2 pb-2 border-b border-gray-100">{subtitle}</p>
          )}
          {details && details.length > 0 && (
            <div className="space-y-1.5">
              {details.map((detail, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-500">{detail.label}</span>
                  <span className="text-[11px] font-semibold text-gray-900">{detail.value}</span>
                </div>
              ))}
            </div>
          )}
          {change !== undefined && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="text-[10px] text-gray-400">vs periode sebelumnya</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
