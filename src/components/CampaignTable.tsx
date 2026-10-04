import { campaigns } from '../data/mockData';
import { ExternalLink, MoreHorizontal, Pause, Play, CheckCircle } from 'lucide-react';

export default function CampaignTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Aktif
          </span>
        );
      case 'paused':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Pause className="w-3 h-3" />
            Pause
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            <CheckCircle className="w-3 h-3" />
            Selesai
          </span>
        );
      default:
        return null;
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
            <h3 className="text-lg font-semibold text-gray-900">Detail Campaign</h3>
            <p className="text-sm text-gray-500">Performa semua campaign iklan</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
            <ExternalLink className="w-4 h-4" />
            Buka Ads Manager
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/80">
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Campaign</th>
              <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-right px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Impressions</th>
              <th className="text-right px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Clicks</th>
              <th className="text-right px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">CTR</th>
              <th className="text-right px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Spending</th>
              <th className="text-right px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Conv.</th>
              <th className="text-right px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">ROAS</th>
              <th className="text-center px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trend</th>
              <th className="text-center px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900 max-w-[200px] truncate">{campaign.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{campaign.platform} • {campaign.objective}</p>
                  </div>
                </td>
                <td className="px-4 py-4">{getStatusBadge(campaign.status)}</td>
                <td className="px-4 py-4 text-right text-sm text-gray-700 font-medium">{formatNumber(campaign.impressions)}</td>
                <td className="px-4 py-4 text-right text-sm text-gray-700 font-medium">{formatNumber(campaign.clicks)}</td>
                <td className="px-4 py-4 text-right text-sm text-gray-700 font-medium">{campaign.ctr}%</td>
                <td className="px-4 py-4 text-right text-sm text-gray-700 font-medium">{formatCurrency(campaign.spend)}</td>
                <td className="px-4 py-4 text-right text-sm text-gray-700 font-medium">{formatNumber(campaign.conversions)}</td>
                <td className="px-4 py-4 text-right">
                  <span className={`text-sm font-semibold ${campaign.roas >= 4 ? 'text-emerald-600' : campaign.roas >= 3 ? 'text-blue-600' : 'text-amber-600'}`}>
                    {campaign.roas}x
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`text-sm font-medium ${campaign.change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {campaign.change >= 0 ? '+' : ''}{campaign.change}%
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
