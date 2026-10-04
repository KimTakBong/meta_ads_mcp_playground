import { campaigns } from '../data/mockData';
import type { CampaignEntity, CampaignStatus, DeliveryStatus } from '../data/mockData';
import { ExternalLink, MoreHorizontal, Pause, AlertCircle, Eye } from 'lucide-react';

export default function CampaignTable() {
  const getStatusBadge = (status: CampaignStatus) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            ACTIVE
          </span>
        );
      case 'PAUSED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Pause className="w-2.5 h-2.5" />
            PAUSED
          </span>
        );
      case 'DELETED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
            <AlertCircle className="w-2.5 h-2.5" />
            DELETED
          </span>
        );
      case 'ARCHIVED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
            ARCHIVED
          </span>
        );
      default:
        return null;
    }
  };

  const getDeliveryBadge = (delivery: DeliveryStatus) => {
    switch (delivery) {
      case 'ACTIVE':
        return <span className="text-[10px] text-emerald-600 font-medium">Active</span>;
      case 'LEARNING':
        return <span className="text-[10px] text-blue-600 font-medium">🔄 Learning</span>;
      case 'LIMITED':
        return <span className="text-[10px] text-amber-600 font-medium">⚠️ Limited</span>;
      case 'INACTIVE':
        return <span className="text-[10px] text-gray-400 font-medium">Inactive</span>;
      default:
        return <span className="text-[10px] text-gray-400">{delivery}</span>;
    }
  };

  const getObjectiveBadge = (objective: string) => {
    const colors: Record<string, string> = {
      SALES: 'bg-purple-50 text-purple-700 border-purple-200',
      LEADS: 'bg-blue-50 text-blue-700 border-blue-200',
      ENGAGEMENT: 'bg-pink-50 text-pink-700 border-pink-200',
      TRAFFIC: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      AWARENESS: 'bg-amber-50 text-amber-700 border-amber-200',
      APP_PROMOTION: 'bg-green-50 text-green-700 border-green-200',
    };
    const labels: Record<string, string> = {
      SALES: 'Sales',
      LEADS: 'Leads',
      ENGAGEMENT: 'Engage',
      TRAFFIC: 'Traffic',
      AWARENESS: 'Aware',
      APP_PROMOTION: 'App',
    };
    return (
      <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold border ${colors[objective] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
        {labels[objective] || objective}
      </span>
    );
  };

  const getQualityBadge = (ranking: string) => {
    switch (ranking) {
      case 'ABOVE_AVERAGE':
        return <span className="text-[10px] text-emerald-600 font-medium">↑ Above</span>;
      case 'AVERAGE':
        return <span className="text-[10px] text-gray-500 font-medium">→ Avg</span>;
      case 'BELOW_AVERAGE':
        return <span className="text-[10px] text-red-500 font-medium">↓ Below</span>;
      default:
        return <span className="text-[10px] text-gray-400">—</span>;
    }
  };

  const formatCurrency = (value: string) => {
    const num = parseInt(value);
    if (num >= 1000000) return `Rp ${(num / 1000000).toFixed(1)} Jt`;
    if (num >= 1000) return `Rp ${(num / 1000).toFixed(0)} Rb`;
    return `Rp ${num}`;
  };

  const formatNumber = (value: string) => {
    const num = parseInt(value);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return value;
  };

  const getResults = (campaign: CampaignEntity) => {
    const purchaseAction = campaign.actions.find(a => a.action_type === 'purchase' || a.action_type === 'offsite_conversion.fb_pixel_purchase');
    const leadAction = campaign.actions.find(a => a.action_type === 'lead');
    const engagementAction = campaign.actions.find(a => a.action_type === 'post_engagement');
    
    if (purchaseAction) return parseInt(purchaseAction.value);
    if (leadAction) return parseInt(leadAction.value);
    if (engagementAction) return parseInt(engagementAction.value);
    return parseInt(campaign.inline_link_clicks);
  };

  const getCostPerResult = (campaign: CampaignEntity) => {
    const costAction = campaign.cost_per_action_type[0];
    if (costAction) return parseInt(costAction.value);
    return parseInt(campaign.spend) / getResults(campaign);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Campaign Level</h3>
            <p className="text-[10px] text-gray-500">ads_get_ad_entities • level: campaign</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-medium hover:bg-blue-700 transition-colors">
            <ExternalLink className="w-3 h-3" />
            Ads Manager
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/80">
              <th className="text-left px-4 py-2.5 text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Campaign</th>
              <th className="text-center px-2 py-2.5 text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-center px-2 py-2.5 text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Delivery</th>
              <th className="text-right px-2 py-2.5 text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Results</th>
              <th className="text-right px-2 py-2.5 text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Cost/Result</th>
              <th className="text-right px-2 py-2.5 text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Impr.</th>
              <th className="text-right px-2 py-2.5 text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Link Clicks</th>
              <th className="text-right px-2 py-2.5 text-[9px] font-semibold text-gray-500 uppercase tracking-wider">CTR</th>
              <th className="text-right px-2 py-2.5 text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Spend</th>
              <th className="text-right px-2 py-2.5 text-[9px] font-semibold text-gray-500 uppercase tracking-wider">ROAS</th>
              <th className="text-center px-2 py-2.5 text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Quality</th>
              <th className="text-center px-2 py-2.5 text-[9px] font-semibold text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {campaigns.map((campaign) => (
              <tr key={campaign.campaign_id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div>
                    <p className="text-xs font-medium text-gray-900 max-w-[180px] truncate">{campaign.campaign_name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {getObjectiveBadge(campaign.objective)}
                      <span className="text-[9px] text-gray-400">
                        {campaign.adsets_count} adsets • {campaign.ads_count} ads
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3 text-center">{getStatusBadge(campaign.status)}</td>
                <td className="px-2 py-3 text-center">{getDeliveryBadge(campaign.delivery_status)}</td>
                <td className="px-2 py-3 text-right text-xs text-gray-700 font-medium">{formatNumber(getResults(campaign).toString())}</td>
                <td className="px-2 py-3 text-right text-xs text-gray-700 font-medium">{formatCurrency(getCostPerResult(campaign).toString())}</td>
                <td className="px-2 py-3 text-right text-xs text-gray-700 font-medium">{formatNumber(campaign.impressions)}</td>
                <td className="px-2 py-3 text-right text-xs text-gray-700 font-medium">{formatNumber(campaign.inline_link_clicks)}</td>
                <td className="px-2 py-3 text-right text-xs text-gray-700 font-medium">{campaign.ctr}%</td>
                <td className="px-2 py-3 text-right text-xs text-gray-700 font-medium">{formatCurrency(campaign.spend)}</td>
                <td className="px-2 py-3 text-right">
                  <span className={`text-xs font-semibold ${
                    campaign.purchase_roas && campaign.purchase_roas >= 4 ? 'text-emerald-600' :
                    campaign.purchase_roas && campaign.purchase_roas >= 3 ? 'text-blue-600' :
                    campaign.purchase_roas && campaign.purchase_roas > 0 ? 'text-amber-600' : 'text-gray-400'
                  }`}>
                    {campaign.purchase_roas ? `${campaign.purchase_roas}x` : '—'}
                  </span>
                </td>
                <td className="px-2 py-3 text-center">{getQualityBadge(campaign.quality_ranking)}</td>
                <td className="px-2 py-3 text-center">
                  <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
        <p className="text-[9px] text-gray-500">{campaigns.length} campaigns</p>
        <p className="text-[9px] text-gray-400">level: campaign | drill down: adset → ad</p>
      </div>
    </div>
  );
}
