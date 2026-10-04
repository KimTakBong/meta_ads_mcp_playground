import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { dailyPerformance } from '../data/mockData';
import { useState } from 'react';

type MetricType = 'impressions' | 'linkClicks' | 'spend' | 'conversions' | 'reach';

const metricConfig: Record<MetricType, { label: string; color: string; format: (v: number) => string }> = {
  impressions: { label: 'Impressions', color: '#3b82f6', format: (v) => `${(v / 1000).toFixed(0)}K` },
  reach: { label: 'Reach', color: '#06b6d4', format: (v) => `${(v / 1000).toFixed(0)}K` },
  linkClicks: { label: 'Link Clicks', color: '#8b5cf6', format: (v) => `${(v / 1000).toFixed(1)}K` },
  spend: { label: 'Amount Spent (Rp)', color: '#f59e0b', format: (v) => `${(v / 1000000).toFixed(1)}Jt` },
  conversions: { label: 'Conversions', color: '#10b981', format: (v) => `${v}` },
};

export default function PerformanceChart() {
  const [activeMetrics, setActiveMetrics] = useState<MetricType[]>(['impressions', 'linkClicks']);

  const toggleMetric = (metric: MetricType) => {
    setActiveMetrics((prev) =>
      prev.includes(metric) ? prev.filter((m) => m !== metric) : [...prev, metric]
    );
  };

  const colors = ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981'];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Performa Harian</h3>
          <p className="text-sm text-gray-500">Tren performa iklan 14 hari terakhir</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
          {(Object.keys(metricConfig) as MetricType[]).map((metric) => (
            <button
              key={metric}
              onClick={() => toggleMetric(metric)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
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
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dailyPerformance} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              {(Object.keys(metricConfig) as MetricType[]).map((metric, i) => (
                <linearGradient key={metric} id={`gradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[i]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={colors[i]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              labelStyle={{ fontWeight: 600, marginBottom: 4 }}
            />
            <Legend />
            {activeMetrics.map((metric, i) => (
              <Area
                key={metric}
                type="monotone"
                dataKey={metric}
                name={metricConfig[metric].label}
                stroke={colors[i]}
                strokeWidth={2.5}
                fill={`url(#gradient-${metric})`}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
