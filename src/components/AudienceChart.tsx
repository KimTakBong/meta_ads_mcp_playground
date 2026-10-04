import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { audienceDemographics, platformSplit } from '../data/mockData';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
const PLATFORM_COLORS = ['#1877f2', '#e4405f', '#0084ff'];

export default function AudienceChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Demografi Audience</h3>
      <p className="text-sm text-gray-500 mb-4">Distribusi usia audience</p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={audienceDemographics}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {audienceDemographics.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
              formatter={(value: number) => [`${value}%`, 'Persentase']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {audienceDemographics.map((item, i) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
            <span className="text-xs text-gray-600">{item.name}</span>
            <span className="text-xs font-semibold text-gray-900 ml-auto">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlatformChart() {
  const totalSpend = platformSplit.reduce((sum, p) => sum + p.spend, 0);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Distribusi Platform</h3>
      <p className="text-sm text-gray-500 mb-4">Spending per platform</p>
      <div className="space-y-4">
        {platformSplit.map((platform, i) => {
          const percentage = ((platform.spend / totalSpend) * 100).toFixed(1);
          return (
            <div key={platform.name}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PLATFORM_COLORS[i] }}></div>
                  <span className="text-sm font-medium text-gray-700">{platform.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%`, backgroundColor: PLATFORM_COLORS[i] }}
                ></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">
                  {(platform.impressions / 1000).toFixed(0)}K impressions
                </span>
                <span className="text-xs text-gray-500">
                  Rp {(platform.spend / 1000000).toFixed(1)} Jt
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
