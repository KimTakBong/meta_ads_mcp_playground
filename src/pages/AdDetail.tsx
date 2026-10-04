import { useParams, Link } from 'react-router-dom';
import { ads } from '../data/mockData';
import { formatCurrency, formatNumber, getResults, getCostPerResult } from '../utils/format';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import DevLink from '../components/DevLink';

export default function AdDetail() {
  const { adId } = useParams();
  const ad = ads.find(a => a.ad_id === adId);

  if (!ad) {
    return <div className="text-center py-10 text-gray-500">Ad not found</div>;
  }

  return (
    <div className="space-y-5">
      <div>
        <Link to={`/adsets/${ad.adset_id}`} className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline mb-3">
          <ArrowLeft className="w-3 h-3" /> Back to Ad Set
        </Link>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{ad.ad_name}</h2>
          <DevLink clipboards={[
            { title: 'Ad Data', toolName: 'ads_get_ad_entities', data: ad },
            { title: 'Creative Details', toolName: 'ads_get_ad_entities', data: ad.creative }
          ]}>
            <span className="font-mono">&lt;dev&gt;</span>
          </DevLink>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] font-medium ${ad.status === 'ACTIVE' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
            {ad.status}
          </span>
          <span className="text-[10px] text-gray-400">• {ad.ad_id}</span>
        </div>
      </div>

      {/* Ad Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Spend</p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatCurrency(ad.spend)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Results</p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatNumber(getResults(ad.actions))}</p>
          <p className="text-[9px] text-gray-400 mt-1">Cost/result: {formatCurrency(getCostPerResult(ad.spend, ad.actions))}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Impressions</p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatNumber(ad.impressions)}</p>
          <p className="text-[9px] text-gray-400 mt-1">CPM: {formatCurrency(ad.cpm)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">ROAS</p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{ad.purchase_roas ? `${ad.purchase_roas}x` : '—'}</p>
          <p className="text-[9px] text-gray-400 mt-1">CTR: {ad.ctr}%</p>
        </div>
      </div>

      {/* Creative Details */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Creative</h3>
        <div className="space-y-2">
          <div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Title</p>
            <p className="text-xs text-gray-900 dark:text-gray-100 font-medium">{ad.creative.title}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Body</p>
            <p className="text-xs text-gray-900 dark:text-gray-100">{ad.creative.body}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Link</p>
            <a href={ad.creative.link_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              {ad.creative.link_url} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Detailed Metrics</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Reach</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{formatNumber(ad.reach)}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Frequency</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{ad.frequency}x</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Clicks (all)</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{formatNumber(ad.clicks)}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Link Clicks</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{formatNumber(ad.inline_link_clicks)}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">CPC</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{formatCurrency(ad.cpc)}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Quality Ranking</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100 capitalize">{ad.quality_ranking.replace('_', ' ')}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Engagement Ranking</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100 capitalize">{ad.engagement_rate_ranking.replace('_', ' ')}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Conversion Ranking</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100 capitalize">{ad.conversion_rate_ranking.replace('_', ' ')}</p>
          </div>
        </div>
      </div>


    </div>
  );
}
