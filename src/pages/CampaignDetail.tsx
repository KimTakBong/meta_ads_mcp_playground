import { useParams, Link } from 'react-router-dom';
import { campaigns, adSets } from '../data/mockData';
import { campaignSchema, adSetSchema } from '../data/schemas';
import { formatCurrency, formatNumber, getResults, getCostPerResult, getObjectiveColor, getObjectiveLabel } from '../utils/format';
import { ArrowLeft } from 'lucide-react';
import DevLink from '../components/DevLink';

export default function CampaignDetail() {
  const { campaignId } = useParams();
  const campaign = campaigns.find(c => c.campaign_id === campaignId);

  if (!campaign) {
    return <div className="text-center py-10 text-gray-500">Campaign not found</div>;
  }

  const campaignAdSets = adSets.filter(a => a.campaign_id === campaignId);

  return (
    <div className="space-y-5">
      <div>
        <Link to="/campaigns" className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline mb-3">
          <ArrowLeft className="w-3 h-3" /> Back to Campaigns
        </Link>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{campaign.campaign_name}</h2>
          <DevLink clipboards={[
            { title: 'Campaign Data', toolName: 'ads_get_ad_entities', schema: campaignSchema, data: campaign },
            { title: 'Ad Sets Data', toolName: 'ads_get_ad_entities', schema: adSetSchema, data: campaignAdSets }
          ]}>
            <span className="font-mono">&lt;dev&gt;</span>
          </DevLink>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getObjectiveColor(campaign.objective)}`}>
            {getObjectiveLabel(campaign.objective)}
          </span>
          <span className={`text-[10px] font-medium ${campaign.status === 'ACTIVE' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
            {campaign.status}
          </span>
          <span className="text-[10px] text-gray-400">• {campaign.campaign_id}</span>
        </div>
      </div>

      {/* Campaign Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Spend</p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatCurrency(campaign.spend)}</p>
          <p className="text-[9px] text-gray-400 mt-1">Daily: {campaign.daily_budget ? formatCurrency(campaign.daily_budget) : '—'}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Results</p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatNumber(getResults(campaign.actions))}</p>
          <p className="text-[9px] text-gray-400 mt-1">Cost/result: {formatCurrency(getCostPerResult(campaign.spend, campaign.actions))}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Impressions</p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatNumber(campaign.impressions)}</p>
          <p className="text-[9px] text-gray-400 mt-1">CPM: {formatCurrency(campaign.cpm)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">ROAS</p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{campaign.purchase_roas ? `${campaign.purchase_roas}x` : '—'}</p>
          <p className="text-[9px] text-gray-400 mt-1">CTR: {campaign.ctr}%</p>
        </div>
      </div>

      {/* Ad Sets */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Ad Sets</h3>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">ads_get_ad_entities • level: adset • filtering: campaign_id</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Ad Set</th>
                <th className="text-center px-3 py-2.5 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Results</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Cost/Result</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Impr.</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">CTR</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Spend</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">ROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {campaignAdSets.map((adset) => (
                <tr key={adset.adset_id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link to={`/adsets/${adset.adset_id}`} className="block">
                      <p className="text-xs font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">{adset.adset_name}</p>
                      <p className="text-[9px] text-gray-400 mt-0.5">{adset.ads_count} ads • {adset.optimization_goal}</p>
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className={`text-[10px] font-medium ${adset.status === 'ACTIVE' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                      {adset.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right text-xs text-gray-700 dark:text-gray-300 font-medium">{formatNumber(getResults(adset.actions))}</td>
                  <td className="px-3 py-3 text-right text-xs text-gray-700 dark:text-gray-300 font-medium">{formatCurrency(getCostPerResult(adset.spend, adset.actions))}</td>
                  <td className="px-3 py-3 text-right text-xs text-gray-700 dark:text-gray-300 font-medium">{formatNumber(adset.impressions)}</td>
                  <td className="px-3 py-3 text-right text-xs text-gray-700 dark:text-gray-300 font-medium">{adset.ctr}%</td>
                  <td className="px-3 py-3 text-right text-xs text-gray-700 dark:text-gray-300 font-medium">{formatCurrency(adset.spend)}</td>
                  <td className="px-3 py-3 text-right">
                    <span className={`text-xs font-semibold ${adset.purchase_roas && adset.purchase_roas >= 4 ? 'text-emerald-600 dark:text-emerald-400' : adset.purchase_roas && adset.purchase_roas >= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                      {adset.purchase_roas ? `${adset.purchase_roas}x` : '—'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
}
