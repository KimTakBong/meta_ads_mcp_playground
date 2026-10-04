/**
 * JSON Schema definitions sesuai output Meta Ads MCP Server
 * Reference: https://developers.facebook.com/documentation/ads-commerce/ads-ai-connectors/ads-mcp-server/
 *
 * Schema ini merepresentasikan struktur data yang dikembalikan oleh MCP tools.
 * Tipe data: "string" | "number" | "boolean" | "array" | "object" | "null"
 * Enum values menunjukkan nilai yang valid sesuai Meta Marketing API.
 */

// ============================================
// ads_get_ad_entities - Campaign Level
// ============================================
export const campaignSchema = {
  campaign_id: 'string (e.g. "23851234567890123")',
  campaign_name: 'string',
  objective: 'enum: AWARENESS | TRAFFIC | ENGAGEMENT | LEADS | APP_PROMOTION | SALES',
  status: 'enum: ACTIVE | PAUSED | DELETED | ARCHIVED',
  delivery_status: 'enum: ACTIVE | LEARNING | LIMITED | INACTIVE',
  start_time: 'string (ISO 8601, e.g. "2026-01-01T00:00:00+0700")',
  end_time: 'string (ISO 8601) | null',
  daily_budget: 'string (amount in cents) | null',
  lifetime_budget: 'string (amount in cents) | null',
  bid_strategy: 'enum: LOWEST_COST_WITHOUT_CAP | COST_CAP | HIGHEST_CPM | LOWEST_COST_WITH_MIN_ROAS',
  adsets_count: 'number',
  impressions: 'string',
  reach: 'string',
  frequency: 'string',
  clicks: 'string (all clicks)',
  inline_link_clicks: 'string (link clicks only)',
  ctr: 'string (link CTR = inline_link_clicks / impressions)',
  cpc: 'string (cost per inline link click)',
  cpm: 'string (cost per 1000 impressions)',
  spend: 'string (amount in cents)',
  actions: 'array<{ action_type: string, value: string }>',
  action_values: 'array<{ action_type: string, value: string }>',
  cost_per_action_type: 'array<{ action_type: string, value: string }>',
  purchase_roas: 'number | null',
  quality_ranking: 'enum: ABOVE_AVERAGE | AVERAGE | BELOW_AVERAGE',
  engagement_rate_ranking: 'enum: ABOVE_AVERAGE | AVERAGE | BELOW_AVERAGE',
  conversion_rate_ranking: 'enum: ABOVE_AVERAGE | AVERAGE | BELOW_AVERAGE',
};

// ============================================
// ads_get_ad_entities - Ad Set Level
// ============================================
export const adSetSchema = {
  adset_id: 'string (e.g. "23851234567891001")',
  adset_name: 'string',
  campaign_id: 'string',
  status: 'enum: ACTIVE | PAUSED | DELETED | ARCHIVED',
  delivery_status: 'enum: ACTIVE | LEARNING | LIMITED | INACTIVE',
  start_time: 'string (ISO 8601)',
  end_time: 'string (ISO 8601) | null',
  daily_budget: 'string (amount in cents) | null',
  lifetime_budget: 'string (amount in cents) | null',
  bid_amount: 'string (amount in cents) | null',
  optimization_goal: 'enum: PURCHASE | LEAD_GENERATION | LINK_CLICKS | POST_ENGAGEMENT | REACH | ...',
  targeting: 'string (JSON serialized targeting spec)',
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

// ============================================
// ads_get_ad_entities - Ad Level
// ============================================
export const adSchema = {
  ad_id: 'string (e.g. "23851234567892001")',
  ad_name: 'string',
  adset_id: 'string',
  campaign_id: 'string',
  status: 'enum: ACTIVE | PAUSED | DELETED | ARCHIVED',
  delivery_status: 'enum: ACTIVE | LEARNING | LIMITED | INACTIVE',
  creative: {
    title: 'string',
    body: 'string',
    image_url: 'string (URL) | undefined',
    video_url: 'string (URL) | undefined',
    link_url: 'string (URL)',
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

// ============================================
// ads_insights_performance_trend
// ============================================
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

// ============================================
// ads_get_opportunity_score
// ============================================
export const opportunityScoreSchema = {
  score: 'number (0-100)',
  recommendations: 'array<{ id: string, title: string, impact: "HIGH" | "MEDIUM" | "LOW" }>',
};

// ============================================
// ads_insights_anomaly_signal
// ============================================
export const anomalySignalSchema = {
  metric: 'string (e.g. "CPM", "CTR", "CPC")',
  severity: 'enum: CRITICAL | WARNING | INFO',
  message: 'string',
  deviation: 'string (e.g. "+28%", "-15%")',
};

// ============================================
// Campaign Summary (derived)
// ============================================
export const campaignSummarySchema = {
  name: 'string (campaign name)',
  spend: 'number (amount)',
  results: 'number',
  roas: 'number',
};
