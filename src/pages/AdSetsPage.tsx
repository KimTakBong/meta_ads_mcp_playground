import { Link } from 'react-router-dom';
import { adSets } from '../data/mockData';
import { adSetSchema } from '../data/schemas';
import { formatCurrency, formatNumber, getResults, getCostPerResult } from '../utils/format';
import { Plus } from 'lucide-react';
import DevLink from '../components/DevLink';

export default function AdSetsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Ad Sets</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">ads_get_ad_entities • level: adset</p>
          </div>
          <DevLink clipboards={[
            { title: 'Ad Sets List', toolName: 'ads_get_ad_entities', schema: adSetSchema, data: adSets }
          ]}>
            <span className="font-mono">&lt;dev&gt;</span>
          </DevLink>
        </div>
        <Link to="/adsets/new" className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Create Ad Set
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Ad Set</th>
                <th className="text-center px-3 py-3 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="text-right px-3 py-3 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Results</th>
                <th className="text-right px-3 py-3 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Cost/Result</th>
                <th className="text-right px-3 py-3 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Impr.</th>
                <th className="text-right px-3 py-3 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">CTR</th>
                <th className="text-right px-3 py-3 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Spend</th>
                <th className="text-right px-3 py-3 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">ROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {adSets.map((a) => (
                <tr key={a.adset_id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link to={`/adsets/${a.adset_id}`} className="block">
                      <p className="text-xs font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">{a.adset_name}</p>
                      <p className="text-[9px] text-gray-400 mt-0.5">{a.ads_count} ads • {a.optimization_goal}</p>
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className={`text-[10px] font-medium ${a.status === 'ACTIVE' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right text-xs text-gray-700 dark:text-gray-300 font-medium">{formatNumber(getResults(a.actions))}</td>
                  <td className="px-3 py-3 text-right text-xs text-gray-700 dark:text-gray-300 font-medium">{formatCurrency(getCostPerResult(a.spend, a.actions))}</td>
                  <td className="px-3 py-3 text-right text-xs text-gray-700 dark:text-gray-300 font-medium">{formatNumber(a.impressions)}</td>
                  <td className="px-3 py-3 text-right text-xs text-gray-700 dark:text-gray-300 font-medium">{a.ctr}%</td>
                  <td className="px-3 py-3 text-right text-xs text-gray-700 dark:text-gray-300 font-medium">{formatCurrency(a.spend)}</td>
                  <td className="px-3 py-3 text-right">
                    <span className={`text-xs font-semibold ${a.purchase_roas && a.purchase_roas >= 4 ? 'text-emerald-600 dark:text-emerald-400' : a.purchase_roas && a.purchase_roas >= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                      {a.purchase_roas ? `${a.purchase_roas}x` : '—'}
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
