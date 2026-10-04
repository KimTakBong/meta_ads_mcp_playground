import { useParams, Link } from 'react-router-dom';
import { adSets, ads } from '../data/mockData';
import { formatCurrency, formatNumber, getResults, getCostPerResult } from '../utils/format';
import { ArrowLeft } from 'lucide-react';
import DevLink from '../components/DevLink';

export default function AdSetDetail() {
  const { adsetId } = useParams();
  const adSet = adSets.find(a => a.adset_id === adsetId);

  if (!adSet) {
    return <div className="text-center py-10 text-gray-500">Ad Set not found</div>;
  }

  const adSetAds = ads.filter(a => a.adset_id === adsetId);

  return (
    <div className="space-y-5">
      <div>
        <Link to={`/campaigns/${adSet.campaign_id}`} className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline mb-3">
          <ArrowLeft className="w-3 h-3" /> Back to Campaign
        </Link>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{adSet.adset_name}</h2>
          <DevLink clipboards={[
            { title: 'Ad Set Data', toolName: 'ads_get_ad_entities', data: adSet },
            { title: 'Ads Data', toolName: 'ads_get_ad_entities', data: adSetAds }
          ]}>
            <span className="font-mono">&lt;dev&gt;</span>
          </DevLink>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] font-medium ${adSet.status === 'ACTIVE' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
            {adSet.status}
          </span>
          <span className="text-[10px] text-gray-400">• {adSet.adset_id}</span>
        </div>
      </div>

      {/* Ad Set Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Spend</p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatCurrency(adSet.spend)}</p>
          <p className="text-[9px] text-gray-400 mt-1">Daily: {adSet.daily_budget ? formatCurrency(adSet.daily_budget) : '—'}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Results</p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatNumber(getResults(adSet.actions))}</p>
          <p className="text-[9px] text-gray-400 mt-1">Cost/result: {formatCurrency(getCostPerResult(adSet.spend, adSet.actions))}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Impressions</p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatNumber(adSet.impressions)}</p>
          <p className="text-[9px] text-gray-400 mt-1">CPM: {formatCurrency(adSet.cpm)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">ROAS</p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{adSet.purchase_roas ? `${adSet.purchase_roas}x` : '—'}</p>
          <p className="text-[9px] text-gray-400 mt-1">CTR: {adSet.ctr}%</p>
        </div>
      </div>

      {/* Ads */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Ads</h3>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">ads_get_ad_entities • level: ad • filtering: adset_id</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Ad</th>
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
              {adSetAds.map((ad) => (
                <tr key={ad.ad_id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link to={`/ads/${ad.ad_id}`} className="block">
                      <p className="text-xs font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">{ad.ad_name}</p>
                      <p className="text-[9px] text-gray-400 mt-0.5 truncate max-w-[200px]">{ad.creative.title}</p>
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className={`text-[10px] font-medium ${ad.status === 'ACTIVE' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                      {ad.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right text-xs text-gray-700 dark:text-gray-300 font-medium">{formatNumber(getResults(ad.actions))}</td>
                  <td className="px-3 py-3 text-right text-xs text-gray-700 dark:text-gray-300 font-medium">{formatCurrency(getCostPerResult(ad.spend, ad.actions))}</td>
                  <td className="px-3 py-3 text-right text-xs text-gray-700 dark:text-gray-300 font-medium">{formatNumber(ad.impressions)}</td>
                  <td className="px-3 py-3 text-right text-xs text-gray-700 dark:text-gray-300 font-medium">{ad.ctr}%</td>
                  <td className="px-3 py-3 text-right text-xs text-gray-700 dark:text-gray-300 font-medium">{formatCurrency(ad.spend)}</td>
                  <td className="px-3 py-3 text-right">
                    <span className={`text-xs font-semibold ${ad.purchase_roas && ad.purchase_roas >= 4 ? 'text-emerald-600 dark:text-emerald-400' : ad.purchase_roas && ad.purchase_roas >= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                      {ad.purchase_roas ? `${ad.purchase_roas}x` : '—'}
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
