import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { dailyPerformance } from '../data/mockData';
import { useState } from 'react';

type MetricType = 'impressions' | 'inline_link_clicks' | 'spend' | 'conversions' | 'reach';

const metricConfig: Record<MetricType, { label: string; color: string }> = {
  impressions: { label: 'Impressions', color: '#3b82f6' },
  reach: { label: 'Reach', color: '#06b6d4' },
  inline_link_clicks: { label: 'Link Clicks', color: '#8b5cf6' },
  spend: { label: 'Amount Spent', color: '#f59e0b' },
  conversions: { label: 'Conversions', color: '#10b981' },
};

export default function PerformanceChart() {
  const [activeMetrics, setActiveMetrics] = useState<MetricType[]>(['impressions', 'inline_link_clicks']);

  const toggleMetric = (metric: MetricType) => {
    setActiveMetrics((prev) =>
      prev.includes(metric) ? prev.filter((m) => m !== metric) : [...prev, metric]
    );
  };

  const colors = ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981'];

  // Format date for display
  const chartData = dailyPerformance.map((d) => ({
    ...d,
    date: d.date_start.split('-').slice(1).join('/'),
  }));

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">ads_insights_performance_trend</h3>
          <p className="text-[10px] text-gray-500">time_increment: 1 • date_preset: last_14d</p>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2 sm:mt-0">
          {(Object.keys(metricConfig) as MetricType[]).map((metric) => (
            <button
              key={metric}
              onClick={() => toggleMetric(metric)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${
                activeMetrics.includes(metric)
                  ? 'text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={activeMetrics.includes(metric) ? { backgroundColor: metricConfig[metric].color } : {}}
            >
              {metricConfig[metric].label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              {(Object.keys(metricConfig) as MetricType[]).map((metric, i) => (
                <linearGradient key={metric} id={`gradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[i]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={colors[i]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }}
              labelStyle={{ fontWeight: 600, marginBottom: 4 }}
            />
            <Legend wrapperStyle={{ fontSize: '10px' }} />
            {activeMetrics.map((metric, i) => (
              <Area
                key={metric}
                type="monotone"
                dataKey={metric}
                name={metricConfig[metric].label}
                stroke={colors[i]}
                strokeWidth={2}
                fill={`url(#gradient-${metric})`}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
