import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { campaignFormSchema } from '../data/schemas';
import FormDevLink from '../components/FormDevLink';

export default function CampaignForm() {
  const [formData, setFormData] = useState({
    name: '',
    objective: '',
    status: 'PAUSED',
    start_time: '',
    end_time: '',
    daily_budget: '',
    lifetime_budget: '',
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fields = Object.entries(formData).map(([key, value]) => ({
    name: key,
    type: campaignFormSchema[key as keyof typeof campaignFormSchema]?.type || 'string',
    required: campaignFormSchema[key as keyof typeof campaignFormSchema]?.required || false,
    value,
    description: campaignFormSchema[key as keyof typeof campaignFormSchema]?.description,
  }));

  return (
    <div className="space-y-5">
      <div>
        <Link to="/campaigns" className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline mb-3">
          <ArrowLeft className="w-3 h-3" /> Back to Campaigns
        </Link>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Create Campaign</h2>
          <FormDevLink
            toolName="ads_create_campaign"
            fields={fields}
            schema={campaignFormSchema}
          >
            <span className="font-mono">&lt;dev&gt;</span>
          </FormDevLink>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          ads_create_campaign • Create new campaign in Meta Ads
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Campaign Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              placeholder="e.g. Sales - Summer Collection 2026"
            />
          </div>

          {/* Objective */}
          <div>
            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Objective
              <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.objective}
              onChange={(e) => handleChange('objective', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            >
              <option value="">Select objective...</option>
              <option value="AWARENESS">Awareness</option>
              <option value="TRAFFIC">Traffic</option>
              <option value="ENGAGEMENT">Engagement</option>
              <option value="LEADS">Leads</option>
              <option value="APP_PROMOTION">App Promotion</option>
              <option value="SALES">Sales</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Status
              <span className="text-gray-400 ml-1">(optional)</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            >
              <option value="PAUSED">Paused</option>
              <option value="ACTIVE">Active</option>
            </select>
          </div>

          {/* Budget */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Daily Budget
                <span className="text-gray-400 ml-1">(optional)</span>
              </label>
              <input
                type="number"
                value={formData.daily_budget}
                onChange={(e) => handleChange('daily_budget', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                placeholder="500000"
              />
              <p className="text-[9px] text-gray-400 mt-1">In cents (500000 = Rp 5,000)</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Lifetime Budget
                <span className="text-gray-400 ml-1">(optional)</span>
              </label>
              <input
                type="number"
                value={formData.lifetime_budget}
                onChange={(e) => handleChange('lifetime_budget', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                placeholder="10000000"
              />
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Start Time
                <span className="text-gray-400 ml-1">(optional)</span>
              </label>
              <input
                type="datetime-local"
                value={formData.start_time}
                onChange={(e) => handleChange('start_time', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                End Time
                <span className="text-gray-400 ml-1">(optional)</span>
              </label>
              <input
                type="datetime-local"
                value={formData.end_time}
                onChange={(e) => handleChange('end_time', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              />
            </div>
          </div>

          {/* Bid Strategy */}
          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Bid Strategy
              <span className="text-gray-400 ml-1">(optional)</span>
            </label>
            <select
              value={formData.bid_strategy}
              onChange={(e) => handleChange('bid_strategy', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            >
              <option value="LOWEST_COST_WITHOUT_CAP">Lowest Cost (Highest Volume)</option>
              <option value="COST_CAP">Cost Cap</option>
              <option value="HIGHEST_CPM">Highest CPM</option>
              <option value="LOWEST_COST_WITH_MIN_ROAS">Lowest Cost with Min ROAS</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Link to="/campaigns" className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            Cancel
          </Link>
          <button 
            disabled={!formData.name || !formData.objective}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-3.5 h-3.5" />
            Create Campaign
          </button>
        </div>
      </div>
    </div>
  );
}
