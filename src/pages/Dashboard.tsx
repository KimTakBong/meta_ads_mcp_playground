import { Link } from 'react-router-dom';
import { campaigns, accountPerformanceTrend, opportunityScore, anomalySignals } from '../data/mockData';
import { campaignSchema, performanceTrendSchema, opportunityScoreSchema, anomalySignalSchema, campaignSummarySchema } from '../data/schemas';
import { formatCurrency, formatNumber, getResults, getCostPerResult, getObjectiveColor, getObjectiveLabel } from '../utils/format';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DollarSign, Eye, MousePointerClick, TrendingUp, Award, AlertTriangle, ArrowRight, Activity } from 'lucide-react';
import DevLink from '../components/DevLink';

export default function Dashboard() {
  // Aggregate account-level metrics
  const totalSpend = campaigns.reduce((sum, c) => sum + parseInt(c.spend), 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + parseInt(c.impressions), 0);
  const totalLinkClicks = campaigns.reduce((sum, c) => sum + parseInt(c.inline_link_clicks), 0);
  const totalResults = campaigns.reduce((sum, c) => sum + getResults(c.actions), 0);
  const totalRevenue = campaigns.reduce((sum, c) => {
    const rev = c.action_values.find(v => v.action_type === 'purchase' || v.action_type === 'offsite_conversion.fb_pixel_purchase');
    return sum + (rev ? parseInt(rev.value) : 0);
  }, 0);
  const avgROAS = totalSpend > 0 ? (totalRevenue / totalSpend).toFixed(1) : '0';
  const avgCTR = ((totalLinkClicks / totalImpressions) * 100).toFixed(2);
  const avgCPC = totalLinkClicks > 0 ? Math.round(totalSpend / totalLinkClicks) : 0;

  const chartData = accountPerformanceTrend.map(d => ({
    date: d.date_start.split('-').slice(1).join('/'),
    spend: parseInt(d.spend),
    conversions: parseInt(d.conversions),
    impressions: parseInt(d.impressions),
  }));

  const campaignSummary = campaigns.map(c => ({
    name: c.campaign_name.split(' - ')[1] || c.campaign_name,
    spend: parseInt(c.spend),
    results: getResults(c.actions),
    roas: c.purchase_roas || 0,
  }));

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Account-level summary • ads_get_ad_entities (level: campaign) aggregated
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Account Summary</h3>
          <DevLink clipboards={[
            { title: 'Campaigns Data', toolName: 'ads_get_ad_entities', schema: campaignSchema, data: campaigns },
            { title: 'Performance Trend', toolName: 'ads_insights_performance_trend', schema: performanceTrendSchema, data: accountPerformanceTrend }
          ]}>
            <span className="font-mono">&lt;dev&gt;</span>
          </DevLink>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">Amount Spent</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatCurrency(totalSpend)}</p>
          <p className="text-[9px] text-gray-400 mt-1">Daily avg: {formatCurrency(totalSpend / 14)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
              <Eye className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">Impressions</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatNumber(totalImpressions)}</p>
          <p className="text-[9px] text-gray-400 mt-1">CPM: {formatCurrency(Math.round(totalSpend / (totalImpressions / 1000)))}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
              <MousePointerClick className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">Link Clicks</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatNumber(totalLinkClicks)}</p>
          <p className="text-[9px] text-gray-400 mt-1">CTR: {avgCTR}%</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">ROAS</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{avgROAS}x</p>
          <p className="text-[9px] text-gray-400 mt-1">Revenue: {formatCurrency(totalRevenue)}</p>
        </div>
      </div>
      </div>

      {/* Performance Trend Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Performance Trend</h3>
          <DevLink clipboards={[
            { title: 'Performance Trend', toolName: 'ads_insights_performance_trend', schema: performanceTrendSchema, data: accountPerformanceTrend },
            { title: 'Campaigns Summary', toolName: 'ads_get_ad_entities', schema: campaignSchema, data: campaigns }
          ]}>
            <span className="font-mono">&lt;dev&gt;</span>
          </DevLink>
        </div>
        <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-4">ads_insights_performance_trend • time_increment: 1 • last 14 days</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="gradSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradConv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }} />
              <Area type="monotone" dataKey="spend" name="Spend" stroke="#3b82f6" strokeWidth={2} fill="url(#gradSpend)" />
              <Area type="monotone" dataKey="conversions" name="Conversions" stroke="#10b981" strokeWidth={2} fill="url(#gradConv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Campaign Summary + Opportunity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Campaigns */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Campaigns</h3>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">ads_get_ad_entities • level: campaign</p>
              </div>
              <DevLink clipboards={[
                { title: 'Campaigns', toolName: 'ads_get_ad_entities', schema: campaignSchema, data: campaigns },
                { title: 'Opportunity Score', toolName: 'ads_get_opportunity_score', schema: opportunityScoreSchema, data: opportunityScore }
              ]}>
                <span className="font-mono">&lt;dev&gt;</span>
              </DevLink>
            </div>
            <Link to="/campaigns" className="text-[10px] text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {campaigns.slice(0, 4).map((c) => (
              <Link
                key={c.campaign_id}
                to={`/campaigns/${c.campaign_id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">{c.campaign_name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${getObjectiveColor(c.objective)}`}>
                      {getObjectiveLabel(c.objective)}
                    </span>
                    <span className={`text-[9px] font-medium ${c.status === 'ACTIVE' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                      {c.status}
                    </span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-xs font-bold text-gray-900 dark:text-gray-100">{formatCurrency(c.spend)}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">{formatNumber(getResults(c.actions))} results • {c.purchase_roas ? `${c.purchase_roas}x` : '—'}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Opportunity & Anomaly */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100">Opportunity Score</h3>
              <span className="ml-auto text-sm font-bold text-amber-600 dark:text-amber-400">{opportunityScore.score}/100</span>
            </div>
            <div className="space-y-1.5">
              {opportunityScore.recommendations.map((rec) => (
                <div key={rec.id} className="flex items-center gap-2 text-[10px]">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${rec.impact === 'HIGH' ? 'bg-red-500' : rec.impact === 'MEDIUM' ? 'bg-amber-500' : 'bg-blue-500'}`}></span>
                  <span className="text-gray-700 dark:text-gray-300 truncate">{rec.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100">Anomaly Signals</h3>
            </div>
            <div className="space-y-2">
              {anomalySignals.map((signal, i) => (
                <div key={i} className="text-[10px]">
                  <p className="text-gray-700 dark:text-gray-300">{signal.message}</p>
                  <span className={`font-bold ${signal.deviation.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {signal.deviation}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Performance Comparison */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Campaign Performance</h3>
          <DevLink clipboards={[
            { title: 'Campaign Performance', toolName: 'ads_get_ad_entities', schema: campaignSummarySchema, data: campaignSummary },
            { title: 'Anomaly Signals', toolName: 'ads_insights_anomaly_signal', schema: anomalySignalSchema, data: anomalySignals }
          ]}>
            <span className="font-mono">&lt;dev&gt;</span>
          </DevLink>
        </div>
        <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-4">Spend vs Results comparison</p>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campaignSummary} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }} />
              <Bar dataKey="spend" name="Spend" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="results" name="Results" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>


    </div>
  );
}
