export const formatCurrency = (value: string | number) => {
  const num = typeof value === 'string' ? parseInt(value) : value;
  if (num >= 1000000) return `Rp ${(num / 1000000).toFixed(1)} Jt`;
  if (num >= 1000) return `Rp ${(num / 1000).toFixed(0)} Rb`;
  return `Rp ${num.toLocaleString('id-ID')}`;
};

export const formatNumber = (value: string | number) => {
  const num = typeof value === 'string' ? parseInt(value) : value;
  if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export const getResults = (actions: { action_type: string; value: string }[]) => {
  const purchase = actions.find(a => a.action_type === 'purchase' || a.action_type === 'offsite_conversion.fb_pixel_purchase');
  const lead = actions.find(a => a.action_type === 'lead');
  const engagement = actions.find(a => a.action_type === 'post_engagement');
  const linkClick = actions.find(a => a.action_type === 'link_click');
  if (purchase) return parseInt(purchase.value);
  if (lead) return parseInt(lead.value);
  if (engagement) return parseInt(engagement.value);
  if (linkClick) return parseInt(linkClick.value);
  return 0;
};

export const getCostPerResult = (spend: string, actions: { action_type: string; value: string }[]) => {
  const results = getResults(actions);
  if (results === 0) return 0;
  return Math.round(parseInt(spend) / results);
};

export const getObjectiveLabel = (objective: string) => {
  const labels: Record<string, string> = {
    SALES: 'Sales',
    LEADS: 'Leads',
    ENGAGEMENT: 'Engagement',
    TRAFFIC: 'Traffic',
    AWARENESS: 'Awareness',
    APP_PROMOTION: 'App Promotion',
  };
  return labels[objective] || objective;
};

export const getObjectiveColor = (objective: string) => {
  const colors: Record<string, string> = {
    SALES: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    LEADS: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    ENGAGEMENT: 'bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800',
    TRAFFIC: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
    AWARENESS: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    APP_PROMOTION: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
  };
  return colors[objective] || 'bg-gray-50 text-gray-600 border-gray-200';
};
