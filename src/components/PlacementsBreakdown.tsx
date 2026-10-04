import { placementsBreakdown } from '../data/mockData';

const placementLabels: Record<string, string> = {
  'facebook_feed': 'Facebook Feed',
  'instagram_feed': 'Instagram Feed',
  'instagram_reels': 'Instagram Reels',
  'facebook_story': 'FB Story',
  'instagram_story': 'IG Story',
  'facebook_reels': 'Facebook Reels',
  'audience_network_classic': 'Audience Network',
  'messenger_home': 'Messenger',
};

const placementColors: Record<string, string> = {
  'facebook_feed': '#1877f2',
  'instagram_feed': '#e4405f',
  'instagram_reels': '#000000',
  'facebook_story': '#6c5ce7',
  'instagram_story': '#833ab4',
  'facebook_reels': '#0984e3',
  'audience_network_classic': '#00b894',
  'messenger_home': '#0084ff',
};

export default function PlacementsBreakdown() {
  const totalSpend = placementsBreakdown.reduce((sum, item) => sum + parseInt(item.spend), 0);

  const getPlacementKey = (publisher: string, position: string) => {
    if (publisher === 'facebook' && position === 'feed') return 'facebook_feed';
    if (publisher === 'instagram' && position === 'feed') return 'instagram_feed';
    if (publisher === 'instagram' && position === 'reels') return 'instagram_reels';
    if (publisher === 'facebook' && position === 'story') return 'facebook_story';
    if (publisher === 'instagram' && position === 'story') return 'instagram_story';
    if (publisher === 'facebook' && position === 'reels') return 'facebook_reels';
    if (publisher === 'audience_network') return 'audience_network_classic';
    if (publisher === 'messenger') return 'messenger_home';
    return `${publisher}_${position}`;
  };

  const formatNumber = (value: string) => {
    const num = parseInt(value);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return value;
  };

  const formatCurrency = (value: string) => {
    const num = parseInt(value);
    if (num >= 1000000) return `Rp ${(num / 1000000).toFixed(1)} Jt`;
    return `Rp ${num.toLocaleString('id-ID')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Breakdown by Placement</h3>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">breakdowns: publisher_platform, platform_position</p>
        </div>
      </div>

      {/* Visual Bar */}
      <div className="mb-4">
        <div className="flex h-8 rounded-lg overflow-hidden">
          {placementsBreakdown.map((placement, i) => {
            const key = getPlacementKey(placement.publisher_platform, placement.platform_position);
            const percentage = (parseInt(placement.spend) / totalSpend) * 100;
            return (
              <div
                key={i}
                className="relative group transition-all hover:opacity-80"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: placementColors[key] || '#6b7280',
                }}
                title={`${placementLabels[key] || key}: ${percentage.toFixed(1)}%`}
              >
                {percentage > 6 && (
                  <span className="absolute inset-0 flex items-center justify-center text-white text-[9px] font-bold">
                    {percentage.toFixed(0)}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed List */}
      <div className="space-y-2">
        {placementsBreakdown.map((placement, i) => {
          const key = getPlacementKey(placement.publisher_platform, placement.platform_position);
          const percentage = ((parseInt(placement.spend) / totalSpend) * 100).toFixed(1);
          const color = placementColors[key] || '#6b7280';
          return (
            <div
              key={i}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {/* Colored dot indicator */}
              <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '20' }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-[11px] font-medium text-gray-900 dark:text-gray-100 truncate">{placementLabels[key] || key}</p>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-gray-100 ml-2">{percentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: color,
                    }}
                  ></div>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[9px] text-gray-500 dark:text-gray-400">{formatNumber(placement.impressions)} impr.</span>
                  <span className="text-[9px] text-gray-500 dark:text-gray-400">{formatNumber(placement.inline_link_clicks)} clicks</span>
                  <span className="text-[9px] text-gray-500 dark:text-gray-400">{formatCurrency(placement.spend)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
