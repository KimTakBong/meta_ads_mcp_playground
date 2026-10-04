import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart, ComposedChart } from 'recharts';
import { weeklyTrend } from '../data/mockData';

export default function WeeklyTrendChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Tren Mingguan</h3>
          <p className="text-sm text-gray-500">CTR, ROAS & Cost per Result per minggu</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-[11px] text-gray-500">CTR (%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-[11px] text-gray-500">ROAS</span>
          </div>
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={weeklyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              formatter={(value: number, name: string) => {
                if (name === 'CTR (%)') return [`${value}%`, name];
                if (name === 'ROAS') return [`${value}x`, name];
                return [value, name];
              }}
            />
            <Bar yAxisId="left" dataKey="ctr" name="CTR (%)" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={28} opacity={0.8} />
            <Line yAxisId="right" type="monotone" dataKey="roas" name="ROAS" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4, fill: '#8b5cf6' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
