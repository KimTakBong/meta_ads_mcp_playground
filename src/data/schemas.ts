/**
 * JSON Schema definitions untuk FORM INPUTS
 * Sesuai output Meta Ads MCP Server
 * 
 * Format:
 * - mandatory: field yang WAJIB dikirim ke Meta MCP
 * - optional: field yang BOLEH tidak dikirim
 * 
 * Warna di form:
 * - 🔴 Red border = mandatory
 * - ⚪ Gray border = optional
 */

// ============================================
// ads_create_campaign - Campaign Form Schema
// ============================================
export const campaignFormSchema = {
  name: { type: 'string', required: true, description: 'Campaign name' },
  objective: { 
    type: 'enum', 
    required: true, 
    values: ['AWARENESS', 'TRAFFIC', 'ENGAGEMENT', 'LEADS', 'APP_PROMOTION', 'SALES'],
    description: 'Campaign objective (ODAX)'
  },
  status: { 
    type: 'enum', 
    required: false, 
    values: ['ACTIVE', 'PAUSED', 'DELETED', 'ARCHIVED'],
    default: 'PAUSED',
    description: 'Campaign status'
  },
  start_time: { 
    type: 'string', 
    required: false, 
    description: 'ISO 8601 datetime (e.g. 2026-01-01T00:00:00+0700)'
  },
  end_time: { 
    type: 'string', 
    required: false, 
    description: 'ISO 8601 datetime'
  },
  daily_budget: { 
    type: 'string', 
    required: false, 
    description: 'Daily budget in cents (e.g. 500000 = Rp 5,000)'
  },
  lifetime_budget: { 
    type: 'string', 
    required: false, 
    description: 'Lifetime budget in cents'
  },
  bid_strategy: { 
    type: 'enum', 
    required: false, 
    values: ['LOWEST_COST_WITHOUT_CAP', 'COST_CAP', 'HIGHEST_CPM', 'LOWEST_COST_WITH_MIN_ROAS'],
    default: 'LOWEST_COST_WITHOUT_CAP',
    description: 'Bidding strategy'
  },
};

// ============================================
// ads_create_ad_set - Ad Set Form Schema
// ============================================
export const adSetFormSchema = {
  name: { type: 'string', required: true, description: 'Ad set name' },
  campaign_id: { type: 'string', required: true, description: 'Parent campaign ID' },
  status: { 
    type: 'enum', 
    required: false, 
    values: ['ACTIVE', 'PAUSED', 'DELETED', 'ARCHIVED'],
    default: 'PAUSED',
    description: 'Ad set status'
  },
  start_time: { 
    type: 'string', 
    required: false, 
    description: 'ISO 8601 datetime'
  },
  end_time: { 
    type: 'string', 
    required: false, 
    description: 'ISO 8601 datetime'
  },
  daily_budget: { 
    type: 'string', 
    required: false, 
    description: 'Daily budget in cents'
  },
  lifetime_budget: { 
    type: 'string', 
    required: false, 
    description: 'Lifetime budget in cents'
  },
  bid_amount: { 
    type: 'string', 
    required: false, 
    description: 'Bid amount in cents'
  },
  optimization_goal: { 
    type: 'enum', 
    required: true, 
    values: ['PURCHASE', 'LEAD_GENERATION', 'LINK_CLICKS', 'POST_ENGAGEMENT', 'REACH', 'IMPRESSIONS'],
    description: 'Optimization goal'
  },
  targeting: { 
    type: 'object', 
    required: true, 
    description: 'Targeting specification (age, gender, interests, locations, etc.)',
    properties: {
      age_min: 'number',
      age_max: 'number',
      genders: 'array<number>',
      geo_locations: 'object',
      interests: 'array<object>',
    }
  },
};

// ============================================
// ads_create_ad - Ad Form Schema
// ============================================
export const adFormSchema = {
  name: { type: 'string', required: true, description: 'Ad name' },
  adset_id: { type: 'string', required: true, description: 'Parent ad set ID' },
  status: { 
    type: 'enum', 
    required: false, 
    values: ['ACTIVE', 'PAUSED', 'DELETED', 'ARCHIVED'],
    default: 'PAUSED',
    description: 'Ad status'
  },
  creative: { 
    type: 'object', 
    required: true, 
    description: 'Ad creative specification',
    properties: {
      title: { type: 'string', required: true, description: 'Ad headline' },
      body: { type: 'string', required: true, description: 'Ad primary text' },
      link_url: { type: 'string', required: true, description: 'Destination URL' },
      image_url: { type: 'string', required: false, description: 'Image URL' },
      video_url: { type: 'string', required: false, description: 'Video URL' },
    }
  },
};

// ============================================
// Data schemas (untuk display di modal)
// ============================================
export const campaignSchema = {
  campaign_id: 'string (e.g. "23851234567890123")',
  campaign_name: 'string',
  objective: 'enum: AWARENESS | TRAFFIC | ENGAGEMENT | LEADS | APP_PROMOTION | SALES',
  status: 'enum: ACTIVE | PAUSED | DELETED | ARCHIVED',
  delivery_status: 'enum: ACTIVE | LEARNING | LIMITED | INACTIVE',
  start_time: 'string (ISO 8601)',
  end_time: 'string (ISO 8601) | null',
  daily_budget: 'string (amount in cents) | null',
  lifetime_budget: 'string (amount in cents) | null',
  bid_strategy: 'enum: LOWEST_COST_WITHOUT_CAP | COST_CAP | HIGHEST_CPM | LOWEST_COST_WITH_MIN_ROAS',
  adsets_count: 'number',
  impressions: 'string',
  reach: 'string',
  frequency: 'string',
  clicks: 'string',
  inline_link_clicks: 'string',
  ctr: 'string',
  cpc: 'string',
  cpm: 'string',
  spend: 'string',
  actions: 'array<{ action_type: string, value: string }>',
  action_values: 'array<{ action_type: string, value: string }>',
  cost_per_action_type: 'array<{ action_type: string, value: string }>',
  purchase_roas: 'number | null',
  quality_ranking: 'enum: ABOVE_AVERAGE | AVERAGE | BELOW_AVERAGE',
  engagement_rate_ranking: 'enum: ABOVE_AVERAGE | AVERAGE | BELOW_AVERAGE',
  conversion_rate_ranking: 'enum: ABOVE_AVERAGE | AVERAGE | BELOW_AVERAGE',
};

export const adSetSchema = {
  adset_id: 'string',
  adset_name: 'string',
  campaign_id: 'string',
  status: 'enum: ACTIVE | PAUSED | DELETED | ARCHIVED',
  delivery_status: 'enum: ACTIVE | LEARNING | LIMITED | INACTIVE',
  start_time: 'string (ISO 8601)',
  end_time: 'string (ISO 8601) | null',
  daily_budget: 'string | null',
  lifetime_budget: 'string | null',
  bid_amount: 'string | null',
  optimization_goal: 'enum: PURCHASE | LEAD_GENERATION | LINK_CLICKS | POST_ENGAGEMENT | REACH',
  targeting: 'string (JSON)',
  ads_count: 'number',
  impressions: 'string',
  reach: 'string',
  frequency: 'string',
  clicks: 'string',
  inline_link_clicks: 'string',
  ctr: 'string',
  cpc: 'string',
  cpm: 'string',
  spend: 'string',
  actions: 'array<{ action_type: string, value: string }>',
  action_values: 'array<{ action_type: string, value: string }>',
  cost_per_action_type: 'array<{ action_type: string, value: string }>',
  purchase_roas: 'number | null',
  quality_ranking: 'enum: ABOVE_AVERAGE | AVERAGE | BELOW_AVERAGE',
  engagement_rate_ranking: 'enum: ABOVE_AVERAGE | AVERAGE | BELOW_AVERAGE',
  conversion_rate_ranking: 'enum: ABOVE_AVERAGE | AVERAGE | BELOW_AVERAGE',
};

export const adSchema = {
  ad_id: 'string',
  ad_name: 'string',
  adset_id: 'string',
  campaign_id: 'string',
  status: 'enum: ACTIVE | PAUSED | DELETED | ARCHIVED',
  delivery_status: 'enum: ACTIVE | LEARNING | LIMITED | INACTIVE',
  creative: {
    title: 'string',
    body: 'string',
    image_url: 'string | undefined',
    video_url: 'string | undefined',
    link_url: 'string',
  },
  impressions: 'string',
  reach: 'string',
  frequency: 'string',
  clicks: 'string',
  inline_link_clicks: 'string',
  ctr: 'string',
  cpc: 'string',
  cpm: 'string',
  spend: 'string',
  actions: 'array<{ action_type: string, value: string }>',
  action_values: 'array<{ action_type: string, value: string }>',
  cost_per_action_type: 'array<{ action_type: string, value: string }>',
  purchase_roas: 'number | null',
  quality_ranking: 'enum: ABOVE_AVERAGE | AVERAGE | BELOW_AVERAGE',
  engagement_rate_ranking: 'enum: ABOVE_AVERAGE | AVERAGE | BELOW_AVERAGE',
  conversion_rate_ranking: 'enum: ABOVE_AVERAGE | AVERAGE | BELOW_AVERAGE',
};

export const performanceTrendSchema = {
  date_start: 'string (YYYY-MM-DD)',
  date_stop: 'string (YYYY-MM-DD)',
  impressions: 'string',
  inline_link_clicks: 'string',
  spend: 'string',
  conversions: 'string',
  ctr: 'string',
  cpc: 'string',
  cpm: 'string',
  cost_per_result: 'string',
  roas: 'string',
};

export const opportunityScoreSchema = {
  score: 'number (0-100)',
  recommendations: 'array<{ id: string, title: string, impact: "HIGH" | "MEDIUM" | "LOW" }>',
};

export const anomalySignalSchema = {
  metric: 'string',
  severity: 'enum: CRITICAL | WARNING | INFO',
  message: 'string',
  deviation: 'string',
};

export const campaignSummarySchema = {
  name: 'string',
  spend: 'number',
  results: 'number',
  roas: 'number',
};
