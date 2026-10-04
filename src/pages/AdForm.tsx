import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { adFormSchema } from '../data/schemas';
import { adSets } from '../data/mockData';
import FormDevLink from '../components/FormDevLink';

export default function AdForm() {
  const [formData, setFormData] = useState({
    name: '',
    adset_id: '',
    status: 'PAUSED',
    creative_id: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fields = [
    { name: 'name', type: 'string', required: true, value: formData.name },
    { name: 'adset_id', type: 'string', required: true, value: formData.adset_id },
    { name: 'status', type: 'enum', required: true, value: formData.status },
    { name: 'creative_id', type: 'string', required: true, value: formData.creative_id },
  ];

  return (
    <div className="space-y-5">
      <div>
        <Link to="/ads" className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline mb-3">
          <ArrowLeft className="w-3 h-3" /> Back to Ads
        </Link>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Create Ad</h2>
          <FormDevLink
            toolName="ads_create_ad"
            fields={fields}
            schema={adFormSchema}
          >
            <span className="font-mono">&lt;dev&gt;</span>
          </FormDevLink>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          ads_create_ad • Create new ad in Meta Ads
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ad Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              placeholder="e.g. Product Showcase - Carousel v1"
            />
          </div>

          {/* Ad Set ID */}
          <div>
            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ad Set
              <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.adset_id}
              onChange={(e) => handleChange('adset_id', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            >
              <option value="">Select ad set...</option>
              {adSets.map(a => (
                <option key={a.adset_id} value={a.adset_id}>{a.adset_name}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
              <span className="text-red-500">*</span>
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

          {/* Creative ID */}
          <div>
            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Creative ID
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.creative_id}
              onChange={(e) => handleChange('creative_id', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              placeholder="e.g. 23851234567893001"
            />
            <p className="text-[9px] text-gray-400 mt-1">
              Must create creative first via <span className="font-mono">ads_create_creative</span>
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Link to="/ads" className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            Cancel
          </Link>
          <button 
            disabled={!formData.name || !formData.adset_id || !formData.status || !formData.creative_id}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-3.5 h-3.5" />
            Create Ad
          </button>
        </div>
      </div>
    </div>
  );
}
