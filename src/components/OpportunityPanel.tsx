import { opportunityScore, anomalySignals } from '../data/mockData';
import { Award, AlertTriangle } from 'lucide-react';

export default function OpportunityPanel() {
  const impactColors = {
    HIGH: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
    MEDIUM: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    LOW: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  };

  const severityColors = {
    CRITICAL: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
    WARNING: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    INFO: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Opportunity Score */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">ads_get_opportunity_score</h3>
          </div>
          <span className={`text-lg font-bold ${
            opportunityScore.score >= 80 ? 'text-emerald-600 dark:text-emerald-400' :
            opportunityScore.score >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {opportunityScore.score}/100
          </span>
        </div>
        <div className="space-y-2">
          {opportunityScore.recommendations.map((rec) => (
            <div key={rec.id} className="flex items-start gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${impactColors[rec.impact]} flex-shrink-0 mt-0.5`}>
                {rec.impact}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">{rec.title}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Anomaly Signals */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">ads_insights_anomaly_signal</h3>
          </div>
          <span className="text-[10px] text-gray-400 dark:text-gray-500">{anomalySignals.length} signals</span>
        </div>
        <div className="space-y-2">
          {anomalySignals.map((signal, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${severityColors[signal.severity]} flex-shrink-0 mt-0.5`}>
                {signal.severity}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-900 dark:text-gray-100">{signal.message}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    Current: <span className="font-semibold">{signal.currentValue}</span>
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    Expected: <span className="font-semibold">{signal.expectedValue}</span>
                  </span>
                  <span className={`text-[10px] font-bold ${signal.deviation.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {signal.deviation}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
