import { placementsBreakdown } from '../data/mockData';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

const placementIcons: Record<string, string> = {
  'Facebook Feed': '📘',
  'Instagram Feed': '📷',
  'Instagram Reels': '🎬',
  'Facebook & IG Stories': '📱',
  'Facebook Reels': '🎞️',
  'Audience Network': '🌐',
  'Messenger': '💬',
};

const placementColors: Record<string, string> = {
  'Facebook Feed': '#1877f2',
  'Instagram Feed': '#e4405f',
  'Instagram Reels': '#000000',
  'Facebook & IG Stories': '#6c5ce7',
  'Facebook Reels': '#0984e3',
  'Audience Network': '#00b894',
  'Messenger': '#0084ff',
};

export default function PlacementsBreakdown() {
  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(1)} Jt`;
    return `Rp ${value.toLocaleString('id-ID')}`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Breakdown by Placement</h3>
          <p className="text-sm text-gray-500">Distribusi performa berdasarkan penempatan iklan</p>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button className="px-3 py-1.5 bg-white rounded-md text-xs font-medium text-gray-900 shadow-sm">
            Placement
          </button>
          <button className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-500 hover:text-gray-700">
            Device
          </button>
          <button className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-500 hover:text-gray-700">
            Age
          </button>
          <button className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-500 hover:text-gray-700">
            Gender
          </button>
        </div>
      </div>

      {/* Visual Bar Chart */}
      <div className="mb-6">
        <div className="flex h-10 rounded-xl overflow-hidden">
          {placementsBreakdown.map((placement) => (
            <div
              key={placement.name}
              className="relative group transition-all hover:opacity-80"
              style={{
                width: `${placement.percentage}%`,
                backgroundColor: placementColors[placement.name],
              }}
              title={`${placement.name}: ${placement.percentage}%`}
            >
              {placement.percentage > 8 && (
                <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold">
                  {placement.percentage}%
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detailed List */}
      <div className="space-y-3">
        {placementsBreakdown.map((placement) => (
          <div
            key={placement.name}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="text-xl w-8 text-center">{placementIcons[placement.name]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-900 truncate">{placement.name}</p>
                <span className="text-sm font-bold text-gray-900 ml-2">{placement.percentage}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${placement.percentage}%`,
                    backgroundColor: placementColors[placement.name],
                  }}
                ></div>
              </div>
              <div className="flex items-center gap-4 mt-1.5">
                <span className="text-[11px] text-gray-500">
                  {formatNumber(placement.impressions)} impr.
                </span>
                <span className="text-[11px] text-gray-500">
                  {formatNumber(placement.clicks)} clicks
                </span>
                <span className="text-[11px] text-gray-500">
                  {formatCurrency(placement.spend)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
