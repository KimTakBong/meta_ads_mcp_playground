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
    creative_title: '',
    creative_body: '',
    creative_link_url: '',
    creative_image_url: '',
    creative_video_url: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fields = [
    { name: 'name', type: 'string', required: true, value: formData.name },
    { name: 'adset_id', type: 'string', required: true, value: formData.adset_id },
    { name: 'status', type: 'enum', required: false, value: formData.status },
    { name: 'creative.title', type: 'string', required: true, value: formData.creative_title },
    { name: 'creative.body', type: 'string', required: true, value: formData.creative_body },
    { name: 'creative.link_url', type: 'string', required: true, value: formData.creative_link_url },
    { name: 'creative.image_url', type: 'string', required: false, value: formData.creative_image_url },
    { name: 'creative.video_url', type: 'string', required: false, value: formData.creative_video_url },
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

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Creative</h3>

            {/* Title */}
            <div className="mb-3">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Headline
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.creative_title}
                onChange={(e) => handleChange('creative_title', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                placeholder="e.g. SmartWatch Pro - Feature Rich"
              />
            </div>

            {/* Body */}
            <div className="mb-3">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Primary Text
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.creative_body}
                onChange={(e) => handleChange('creative_body', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                placeholder="e.g. Track your health, stay connected. Order now with 20% off!"
              />
            </div>

            {/* Link URL */}
            <div className="mb-3">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Website URL
                <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.creative_link_url}
                onChange={(e) => handleChange('creative_link_url', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                placeholder="https://example.com/product"
              />
            </div>

            {/* Image URL */}
            <div className="mb-3">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Image URL
                <span className="text-gray-400 ml-1">(optional)</span>
              </label>
              <input
                type="url"
                value={formData.creative_image_url}
                onChange={(e) => handleChange('creative_image_url', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Video URL */}
            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Video URL
                <span className="text-gray-400 ml-1">(optional)</span>
              </label>
              <input
                type="url"
                value={formData.creative_video_url}
                onChange={(e) => handleChange('creative_video_url', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                placeholder="https://example.com/video.mp4"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Link to="/ads" className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            Cancel
          </Link>
          <button 
            disabled={!formData.name || !formData.adset_id || !formData.creative_title || !formData.creative_body || !formData.creative_link_url}
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
