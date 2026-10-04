import { campaigns } from '../data/mockData';
import type { CampaignStatus, DeliveryStatus } from '../data/mockData';
import { ExternalLink, MoreHorizontal, Pause, Play, AlertCircle, Eye } from 'lucide-react';

export default function CampaignTable() {
  const getStatusBadge = (status: CampaignStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Active
          </span>
        );
      case 'Paused':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Pause className="w-3 h-3" />
            Paused
          </span>
        );
      case 'Off':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            <AlertCircle className="w-3 h-3" />
            Off
          </span>
        );
      case 'Draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200">
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  const getDeliveryBadge = (delivery: DeliveryStatus) => {
    switch (delivery) {
      case 'Active':
        return <span className="text-xs text-emerald-600 font-medium">Active</span>;
      case 'Learning':
        return <span className="text-xs text-blue-600 font-medium">🔄 Learning</span>;
      case 'Limited':
        return <span className="text-xs text-amber-600 font-medium">⚠️ Limited</span>;
      case 'Inactive':
        return <span className="text-xs text-gray-400 font-medium">Inactive</span>;
      default:
        return null;
    }
  };

  const getObjectiveBadge = (objective: string) => {
    const colors: Record<string, string> = {
      'Sales': 'bg-purple-50 text-purple-700 border-purple-200',
      'Leads': 'bg-blue-50 text-blue-700 border-blue-200',
      'Engagement': 'bg-pink-50 text-pink-700 border-pink-200',
      'Traffic': 'bg-cyan-50 text-cyan-700 border-cyan-200',
      'Awareness': 'bg-amber-50 text-amber-700 border-amber-200',
      'App Promotion': 'bg-green-50 text-green-700 border-green-200',
    };
    return (
      <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-semibold border ${colors[objective] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
        {objective}
      </span>
    );
  };

  const getQualityBadge = (ranking: string) => {
    switch (ranking) {
      case 'Above Average':
        return <span className="text-xs text-emerald-600 font-medium">↑ Above Avg</span>;
      case 'Average':
        return <span className="text-xs text-gray-500 font-medium">→ Average</span>;
      case 'Below Average':
        return <span className="text-xs text-red-500 font-medium">↓ Below Avg</span>;
      default:
        return <span className="text-xs text-gray-400">N/A</span>;
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(1)} Jt`;
    if (value >= 1000) return `Rp ${(value / 1000).toFixed(0)} Rb`;
    return `Rp ${value}`;
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Campaign Level</h3>
            <p className="text-sm text-gray-500">Performa semua campaign di level Campaign</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors">
              <Eye className="w-3.5 h-3.5" />
              Breakdown
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-700 transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
              Buka Ads Manager
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/80">
              <th className="text-left px-5 py-3.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Campaign</th>
              <th className="text-center px-3 py-3.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-center px-3 py-3.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Delivery</th>
              <th className="text-right px-3 py-3.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Results</th>
              <th className="text-right px-3 py-3.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Cost/Result</th>
              <th className="text-right px-3 py-3.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Impressions</th>
              <th className="text-right px-3 py-3.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Link Clicks</th>
              <th className="text-right px-3 py-3.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">CTR</th>
              <th className="text-right px-3 py-3.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Amount Spent</th>
              <th className="text-right px-3 py-3.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">CPM</th>
              <th className="text-right px-3 py-3.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">ROAS</th>
              <th className="text-center px-3 py-3.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Quality</th>
              <th className="text-center px-3 py-3.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-start gap-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900 max-w-[220px] truncate">{campaign.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getObjectiveBadge(campaign.objective)}
                        <span className="text-[10px] text-gray-400">
                          {campaign.adSets} Ad Sets • {campaign.ads} Ads
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 text-center">{getStatusBadge(campaign.status)}</td>
                <td className="px-3 py-4 text-center">{getDeliveryBadge(campaign.delivery)}</td>
                <td className="px-3 py-4 text-right text-sm text-gray-700 font-medium">{formatNumber(campaign.results)}</td>
                <td className="px-3 py-4 text-right text-sm text-gray-700 font-medium">{formatCurrency(campaign.costPerResult)}</td>
                <td className="px-3 py-4 text-right text-sm text-gray-700 font-medium">{formatNumber(campaign.impressions)}</td>
                <td className="px-3 py-4 text-right text-sm text-gray-700 font-medium">{formatNumber(campaign.linkClicks)}</td>
                <td className="px-3 py-4 text-right text-sm text-gray-700 font-medium">{campaign.ctr}%</td>
                <td className="px-3 py-4 text-right text-sm text-gray-700 font-medium">{formatCurrency(campaign.spend)}</td>
                <td className="px-3 py-4 text-right text-sm text-gray-700 font-medium">{formatCurrency(campaign.cpm)}</td>
                <td className="px-3 py-4 text-right">
                  <span className={`text-sm font-semibold ${campaign.roas >= 4 ? 'text-emerald-600' : campaign.roas >= 3 ? 'text-blue-600' : campaign.roas > 0 ? 'text-amber-600' : 'text-gray-400'}`}>
                    {campaign.roas > 0 ? `${campaign.roas}x` : '—'}
                  </span>
                </td>
                <td className="px-3 py-4 text-center">{getQualityBadge(campaign.qualityRanking)}</td>
                <td className="px-3 py-4 text-center">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs text-gray-500">Menampilkan {campaigns.length} campaigns</p>
        <p className="text-xs text-gray-400">Data level: Campaign | Klik untuk drill down ke Ad Set / Ad level</p>
      </div>
    </div>
  );
}
