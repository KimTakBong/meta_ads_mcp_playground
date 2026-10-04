import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import { dailyPerformance } from '../data/mockData';

// Aggregate daily data into weekly
interface WeeklyDataPoint {
  week: string;
  ctr: number;
  cpc: number;
  roas: number;
  cost_per_result: number;
}

const weeklyData: WeeklyDataPoint[] = [];
for (let i = 0; i < dailyPerformance.length; i += 7) {
  const weekSlice = dailyPerformance.slice(i, i + 7);
  const avgCtr = weekSlice.reduce((sum, d) => sum + parseFloat(d.ctr), 0) / weekSlice.length;
  const avgCpc = weekSlice.reduce((sum, d) => sum + parseFloat(d.cpc), 0) / weekSlice.length;
  const avgRoas = weekSlice.reduce((sum, d) => sum + parseFloat(d.roas), 0) / weekSlice.length;
  const avgCostPerResult = weekSlice.reduce((sum, d) => sum + parseFloat(d.cost_per_result), 0) / weekSlice.length;
  weeklyData.push({
    week: `Minggu ${Math.floor(i / 7) + 1}`,
    ctr: parseFloat(avgCtr.toFixed(2)),
    cpc: Math.round(avgCpc),
    roas: parseFloat(avgRoas.toFixed(1)),
    cost_per_result: Math.round(avgCostPerResult),
  });
}

export default function WeeklyTrendChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">ads_insights_performance_trend</h3>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">CTR, ROAS & Cost per Result per minggu</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
            <span className="text-[9px] text-gray-500">CTR (%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
            <span className="text-[9px] text-gray-500">ROAS</span>
          </div>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={weeklyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }}
              formatter={(value: number, name: string) => {
                if (name === 'CTR (%)') return [`${value}%`, name];
                if (name === 'ROAS') return [`${value}x`, name];
                return [value, name];
              }}
            />
            <Bar yAxisId="left" dataKey="ctr" name="CTR (%)" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} opacity={0.8} />
            <Line yAxisId="right" type="monotone" dataKey="roas" name="ROAS" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3, fill: '#8b5cf6' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
