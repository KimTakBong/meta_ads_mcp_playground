import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { adSetFormSchema } from '../data/schemas';
import { campaigns } from '../data/mockData';
import FormDevLink from '../components/FormDevLink';

export default function AdSetForm() {
  const [formData, setFormData] = useState({
    name: '',
    campaign_id: '',
    status: 'PAUSED',
    start_time: '',
    end_time: '',
    daily_budget: '',
    lifetime_budget: '',
    bid_amount: '',
    optimization_goal: '',
    targeting: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fields = Object.entries(formData).map(([key, value]) => ({
    name: key,
    type: adSetFormSchema[key as keyof typeof adSetFormSchema]?.type || 'string',
    required: adSetFormSchema[key as keyof typeof adSetFormSchema]?.required || false,
    value,
    description: adSetFormSchema[key as keyof typeof adSetFormSchema]?.description,
  }));

  return (
    <div className="space-y-5">
      <div>
        <Link to="/adsets" className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline mb-3">
          <ArrowLeft className="w-3 h-3" /> Back to Ad Sets
        </Link>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Create Ad Set</h2>
          <FormDevLink
            toolName="ads_create_ad_set"
            fields={fields}
            schema={adSetFormSchema}
          >
            <span className="font-mono">&lt;dev&gt;</span>
          </FormDevLink>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          ads_create_ad_set • Create new ad set in Meta Ads
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ad Set Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              placeholder="e.g. Prospecting - Interest: Tech Gadgets"
            />
          </div>

          {/* Campaign ID */}
          <div>
            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Campaign
              <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.campaign_id}
              onChange={(e) => handleChange('campaign_id', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            >
              <option value="">Select campaign...</option>
              {campaigns.map(c => (
                <option key={c.campaign_id} value={c.campaign_id}>{c.campaign_name}</option>
              ))}
            </select>
          </div>

          {/* Optimization Goal */}
          <div>
            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Optimization Goal
              <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.optimization_goal}
              onChange={(e) => handleChange('optimization_goal', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            >
              <option value="">Select goal...</option>
              <option value="PURCHASE">Purchase</option>
              <option value="LEAD_GENERATION">Lead Generation</option>
              <option value="LINK_CLICKS">Link Clicks</option>
              <option value="POST_ENGAGEMENT">Post Engagement</option>
              <option value="REACH">Reach</option>
              <option value="IMPRESSIONS">Impressions</option>
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
          <div className="grid grid-cols-3 gap-3">
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
                placeholder="200000"
              />
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
                placeholder="5000000"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Bid Amount
                <span className="text-gray-400 ml-1">(optional)</span>
              </label>
              <input
                type="number"
                value={formData.bid_amount}
                onChange={(e) => handleChange('bid_amount', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                placeholder="50000"
              />
            </div>
          </div>

          {/* Targeting */}
          <div>
            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Targeting (JSON)
              <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.targeting}
              onChange={(e) => handleChange('targeting', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              placeholder='{"age_min": 25, "age_max": 45, "geo_locations": {"countries": ["ID"]}}'
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Link to="/adsets" className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            Cancel
          </Link>
          <button 
            disabled={!formData.name || !formData.campaign_id || !formData.optimization_goal || !formData.targeting}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-3.5 h-3.5" />
            Create Ad Set
          </button>
        </div>
      </div>
    </div>
  );
}
