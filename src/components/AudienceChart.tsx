import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { audienceByAge, audienceByGender, placementsBreakdown } from '../data/mockData';

const AGE_COLORS = ['#94a3b8', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

export default function AudienceChart() {
  const totalImpressions = audienceByAge.reduce((sum, item) => sum + parseInt(item.impressions), 0);

  const ageData = audienceByAge.map((item) => ({
    name: item.age,
    value: Math.round((parseInt(item.impressions) / totalImpressions) * 100),
  }));

  const totalGender = audienceByGender.reduce((sum, item) => sum + parseInt(item.impressions), 0);
  const genderData = audienceByGender.map((item) => ({
    name: item.gender,
    value: Math.round((parseInt(item.impressions) / totalGender) * 100),
  }));

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Audience Breakdown</h3>
        <p className="text-[10px] text-gray-500">breakdowns: age, gender</p>
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={ageData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {ageData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }}
              formatter={(value: number) => [`${value}%`, 'Share']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-1.5 mt-2">
        {ageData.map((item, i) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: AGE_COLORS[i] }}></div>
            <span className="text-[10px] text-gray-600 truncate">{item.name}</span>
            <span className="text-[10px] font-semibold text-gray-900 ml-auto">{item.value}%</span>
          </div>
        ))}
      </div>

      {/* Gender Split */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-[10px] font-semibold text-gray-700 mb-1.5">Gender Split</p>
        <div className="flex h-2.5 rounded-full overflow-hidden">
          {genderData.map((item, i) => (
            <div
              key={item.name}
              style={{
                width: `${item.value}%`,
                backgroundColor: i === 0 ? '#3b82f6' : i === 1 ? '#ec4899' : '#94a3b8',
              }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {genderData.map((item, i) => (
            <div key={item.name} className="flex items-center gap-1">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: i === 0 ? '#3b82f6' : i === 1 ? '#ec4899' : '#94a3b8' }}
              ></div>
              <span className="text-[9px] text-gray-500">{item.name}: {item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PlatformChart() {
  const totalSpend = placementsBreakdown.reduce((sum, item) => sum + parseInt(item.spend), 0);

  const platformAgg: Record<string, { impressions: number; spend: number }> = {};
  placementsBreakdown.forEach((item) => {
    if (!platformAgg[item.publisher_platform]) {
      platformAgg[item.publisher_platform] = { impressions: 0, spend: 0 };
    }
    platformAgg[item.publisher_platform].impressions += parseInt(item.impressions);
    platformAgg[item.publisher_platform].spend += parseInt(item.spend);
  });

  const platformData = Object.entries(platformAgg).map(([name, data]) => ({
    name,
    percentage: ((data.spend / totalSpend) * 100).toFixed(1),
    impressions: data.impressions,
    spend: data.spend,
  }));

  const COLORS: Record<string, string> = {
    facebook: '#1877f2',
    instagram: '#e4405f',
    audience_network: '#00b894',
    messenger: '#0084ff',
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Publisher Platform</h3>
        <p className="text-[10px] text-gray-500">breakdowns: publisher_platform</p>
      </div>
      <div className="space-y-3">
        {platformData.map((platform) => (
          <div key={platform.name}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[platform.name] || '#6b7280' }}></div>
                <span className="text-xs font-medium text-gray-700 capitalize">{platform.name.replace('_', ' ')}</span>
              </div>
              <span className="text-xs font-bold text-gray-900">{platform.percentage}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${platform.percentage}%`, backgroundColor: COLORS[platform.name] || '#6b7280' }}
              ></div>
            </div>
            <div className="flex justify-between mt-0.5">
              <span className="text-[9px] text-gray-500">
                {(platform.impressions / 1000).toFixed(0)}K impr.
              </span>
              <span className="text-[9px] text-gray-500">
                Rp {(platform.spend / 1000000).toFixed(1)} Jt
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
