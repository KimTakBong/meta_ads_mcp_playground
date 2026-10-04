/**
 * Data structure disesuaikan dengan output Meta Ads MCP Server
 * Reference: https://developers.facebook.com/documentation/ads-commerce/ads-ai-connectors/ads-mcp-server/
 *
 * Tools yang digunakan:
 * - ads_get_ad_entities (campaigns, ad sets, ads with performance metrics)
 * - ads_insights_performance_trend (CPC, CPM, cost per result, ROAS, CTR, conversion rate)
 * - ads_get_opportunity_score (optimization score 0-100)
 * - ads_insights_anomaly_signal (unusual patterns)
 * - ads_insights_auction_ranking_benchmarks (quality ranking)
 * - ads_insights_industry_benchmark (comparison vs similar advertisers)
 */

// ============================================
// ads_get_opportunity_score response
// ============================================
export interface OpportunityScore {
  score: number; // 0-100
  recommendations: {
    id: string;
    title: string;
    description: string;
    impact: 'HIGH' | 'MEDIUM' | 'LOW';
    type: string;
  }[];
}

export const opportunityScore: OpportunityScore = {
  score: 72,
  recommendations: [
    {
      id: 'rec_001',
      title: 'Increase budget on high-ROAS campaign',
      description: '"Sales - SmartWatch Pro Q1" has ROAS 4.2x but is budget-constrained. Increase daily budget by 30%.',
      impact: 'HIGH',
      type: 'BUDGET_REALLOCATION',
    },
    {
      id: 'rec_002',
      title: 'Refresh creative for fatigued ad',
      description: 'Ad "Flash Sale Carousel v2" has frequency 3.8 and CTR declined 32%. Replace creative.',
      impact: 'MEDIUM',
      type: 'CREATIVE_REFRESH',
    },
    {
      id: 'rec_003',
      title: 'Expand audience for Learning ad set',
      description: '"Retargeting - Cart Abandonment" has limited delivery. Consider broadening audience.',
      impact: 'MEDIUM',
      type: 'AUDIENCE_EXPANSION',
    },
  ],
};

// ============================================
// ads_insights_anomaly_signal response
// ============================================
export interface AnomalySignal {
  metric: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  message: string;
  currentValue: number;
  expectedValue: number;
  deviation: string;
}

export const anomalySignals: AnomalySignal[] = [
  {
    metric: 'CPM',
    severity: 'WARNING',
    message: 'CPM meningkat 28% pada campaign "Traffic - Blog Content" dalam 3 hari terakhir',
    currentValue: 20766,
    expectedValue: 16200,
    deviation: '+28%',
  },
  {
    metric: 'CTR',
    severity: 'INFO',
    message: 'CTR "Engagement - Brand Content Series" naik 22% vs 7-day average',
    currentValue: 2.74,
    expectedValue: 2.24,
    deviation: '+22%',
  },
];

// ============================================
// ads_get_ad_entities response (campaign level)
// ============================================
// ODAX objectives (Meta Marketing API enum values)
export type CampaignObjective =
  | 'AWARENESS'
  | 'TRAFFIC'
  | 'ENGAGEMENT'
  | 'LEADS'
  | 'APP_PROMOTION'
  | 'SALES';

// Status enum dari Meta Marketing API
export type CampaignStatus = 'ACTIVE' | 'PAUSED' | 'DELETED' | 'ARCHIVED';

// Delivery status
export type DeliveryStatus = 'ACTIVE' | 'LEARNING' | 'LIMITED' | 'INACTIVE' | 'PREAPPROVED' | 'PENDING';

// Action types dari AdsActionStats
export interface AdsActionStat {
  action_type: string;
  value: string;
}

// Auction ranking (dari ads_insights_auction_ranking_benchmarks)
export type QualityRanking = 'ABOVE_AVERAGE' | 'AVERAGE' | 'BELOW_AVERAGE';

// Campaign entity (format sesuai ads_get_ad_entities)
export interface CampaignEntity {
  campaign_id: string;
  campaign_name: string;
  objective: CampaignObjective;
  status: CampaignStatus;
  delivery_status: DeliveryStatus;
  start_time: string;
  end_time: string | null;
  daily_budget: string | null;
  lifetime_budget: string | null;
  bid_strategy: string;
  // Ad structure
  adsets_count: number;
  ads_count: number;
  // Performance metrics (semua string sesuai API response)
  impressions: string;
  reach: string;
  frequency: string;
  clicks: string; // all clicks
  inline_link_clicks: string; // link clicks
  ctr: string; // link CTR = inline_link_clicks / impressions
  cpc: string; // cost per inline link click
  cpm: string;
  spend: string;
  // Actions (array of {action_type, value})
  actions: AdsActionStat[];
  action_values: AdsActionStat[];
  cost_per_action_type: AdsActionStat[];
  // ROAS
  purchase_roas: number | null;
  // Quality rankings
  quality_ranking: QualityRanking;
  engagement_rate_ranking: QualityRanking;
  conversion_rate_ranking: QualityRanking;
}

export const campaigns: CampaignEntity[] = [
  {
    campaign_id: '23851234567890123',
    campaign_name: 'Sales - SmartWatch Pro Q1',
    objective: 'SALES',
    status: 'ACTIVE',
    delivery_status: 'ACTIVE',
    start_time: '2026-01-01T00:00:00+0700',
    end_time: '2026-03-31T23:59:59+0700',
    daily_budget: '500000',
    lifetime_budget: null,
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
    adsets_count: 3,
    ads_count: 9,
    impressions: '425000',
    reach: '312000',
    frequency: '1.36',
    clicks: '14200',
    inline_link_clicks: '12500',
    ctr: '2.94',
    cpc: '416',
    cpm: '12235',
    spend: '5200000',
    actions: [
      { action_type: 'offsite_conversion.fb_pixel_purchase', value: '420' },
      { action_type: 'purchase', value: '420' },
    ],
    action_values: [
      { action_type: 'offsite_conversion.fb_pixel_purchase', value: '21840000' },
      { action_type: 'purchase', value: '21840000' },
    ],
    cost_per_action_type: [
      { action_type: 'offsite_conversion.fb_pixel_purchase', value: '12381' },
      { action_type: 'purchase', value: '12381' },
    ],
    purchase_roas: 4.2,
    quality_ranking: 'ABOVE_AVERAGE',
    engagement_rate_ranking: 'ABOVE_AVERAGE',
    conversion_rate_ranking: 'AVERAGE',
  },
  {
    campaign_id: '23851234567890124',
    campaign_name: 'Leads - Webinar Digital Marketing',
    objective: 'LEADS',
    status: 'ACTIVE',
    delivery_status: 'ACTIVE',
    start_time: '2026-01-05T00:00:00+0700',
    end_time: '2026-02-28T23:59:59+0700',
    daily_budget: '400000',
    lifetime_budget: null,
    bid_strategy: 'COST_CAP',
    adsets_count: 2,
    ads_count: 6,
    impressions: '380000',
    reach: '285000',
    frequency: '1.33',
    clicks: '12800',
    inline_link_clicks: '11200',
    ctr: '2.95',
    cpc: '607',
    cpm: '17895',
    spend: '6800000',
    actions: [
      { action_type: 'lead', value: '520' },
      { action_type: 'onsite_conversion.lead_grouped', value: '380' },
      { action_type: 'offsite_conversion.fb_pixel_lead', value: '140' },
    ],
    action_values: [
      { action_type: 'lead', value: '32640000' },
    ],
    cost_per_action_type: [
      { action_type: 'lead', value: '13077' },
    ],
    purchase_roas: 4.8,
    quality_ranking: 'ABOVE_AVERAGE',
    engagement_rate_ranking: 'ABOVE_AVERAGE',
    conversion_rate_ranking: 'ABOVE_AVERAGE',
  },
  {
    campaign_id: '23851234567890125',
    campaign_name: 'Retargeting - Cart Abandonment',
    objective: 'SALES',
    status: 'ACTIVE',
    delivery_status: 'ACTIVE',
    start_time: '2026-01-01T00:00:00+0700',
    end_time: '2026-03-31T23:59:59+0700',
    daily_budget: '350000',
    lifetime_budget: null,
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
    adsets_count: 4,
    ads_count: 12,
    impressions: '520000',
    reach: '180000',
    frequency: '2.89',
    clicks: '10200',
    inline_link_clicks: '8900',
    ctr: '1.71',
    cpc: '506',
    cpm: '8654',
    spend: '4500000',
    actions: [
      { action_type: 'offsite_conversion.fb_pixel_purchase', value: '380' },
      { action_type: 'purchase', value: '380' },
    ],
    action_values: [
      { action_type: 'purchase', value: '23400000' },
    ],
    cost_per_action_type: [
      { action_type: 'purchase', value: '11842' },
    ],
    purchase_roas: 5.2,
    quality_ranking: 'AVERAGE',
    engagement_rate_ranking: 'AVERAGE',
    conversion_rate_ranking: 'ABOVE_AVERAGE',
  },
  {
    campaign_id: '23851234567890126',
    campaign_name: 'Engagement - Brand Content Series',
    objective: 'ENGAGEMENT',
    status: 'ACTIVE',
    delivery_status: 'LEARNING',
    start_time: '2026-01-15T00:00:00+0700',
    end_time: '2026-02-15T23:59:59+0700',
    daily_budget: '200000',
    lifetime_budget: null,
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
    adsets_count: 2,
    ads_count: 4,
    impressions: '285000',
    reach: '220000',
    frequency: '1.30',
    clicks: '15600',
    inline_link_clicks: '7800',
    ctr: '2.74',
    cpc: '410',
    cpm: '11228',
    spend: '3200000',
    actions: [
      { action_type: 'post_engagement', value: '1850' },
      { action_type: 'page_engagement', value: '1620' },
      { action_type: 'link_click', value: '7800' },
    ],
    action_values: [],
    cost_per_action_type: [
      { action_type: 'post_engagement', value: '1730' },
    ],
    purchase_roas: null,
    quality_ranking: 'ABOVE_AVERAGE',
    engagement_rate_ranking: 'ABOVE_AVERAGE',
    conversion_rate_ranking: 'ABOVE_AVERAGE',
  },
  {
    campaign_id: '23851234567890127',
    campaign_name: 'Traffic - Blog Content Promotion',
    objective: 'TRAFFIC',
    status: 'PAUSED',
    delivery_status: 'INACTIVE',
    start_time: '2026-01-01T00:00:00+0700',
    end_time: '2026-01-31T23:59:59+0700',
    daily_budget: '300000',
    lifetime_budget: null,
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
    adsets_count: 3,
    ads_count: 6,
    impressions: '235000',
    reach: '195000',
    frequency: '1.20',
    clicks: '5400',
    inline_link_clicks: '4800',
    ctr: '2.04',
    cpc: '1017',
    cpm: '20766',
    spend: '4880000',
    actions: [
      { action_type: 'link_click', value: '4800' },
      { action_type: 'offsite_conversion.fb_pixel_purchase', value: '220' },
    ],
    action_values: [
      { action_type: 'purchase', value: '10248000' },
    ],
    cost_per_action_type: [
      { action_type: 'link_click', value: '1017' },
    ],
    purchase_roas: 2.1,
    quality_ranking: 'BELOW_AVERAGE',
    engagement_rate_ranking: 'AVERAGE',
    conversion_rate_ranking: 'BELOW_AVERAGE',
  },
  {
    campaign_id: '23851234567890128',
    campaign_name: 'Awareness - New Product Teaser',
    objective: 'AWARENESS',
    status: 'ACTIVE',
    delivery_status: 'ACTIVE',
    start_time: '2026-01-10T00:00:00+0700',
    end_time: '2026-02-10T23:59:59+0700',
    daily_budget: null,
    lifetime_budget: '5000000',
    bid_strategy: 'HIGHEST_CPM',
    adsets_count: 1,
    ads_count: 3,
    impressions: '450000',
    reach: '380000',
    frequency: '1.18',
    clicks: '3200',
    inline_link_clicks: '2100',
    ctr: '0.47',
    cpc: '1333',
    cpm: '6222',
    spend: '2800000',
    actions: [],
    action_values: [],
    cost_per_action_type: [],
    purchase_roas: null,
    quality_ranking: 'AVERAGE',
    engagement_rate_ranking: 'BELOW_AVERAGE',
    conversion_rate_ranking: 'AVERAGE',
  },
];

// ============================================
// ads_insights_performance_trend response
// ============================================
export interface PerformanceTrend {
  date_start: string;
  date_stop: string;
  impressions: string;
  inline_link_clicks: string;
  spend: string;
  conversions: string;
  reach: string;
  // Computed
  ctr: string;
  cpc: string;
  cpm: string;
  cost_per_result: string;
  roas: string;
  conversion_rate: string;
}

export const dailyPerformance: PerformanceTrend[] = [
  { date_start: '2026-01-07', date_stop: '2026-01-07', impressions: '58000', inline_link_clicks: '1420', spend: '780000', conversions: '58', reach: '42000', ctr: '2.45', cpc: '549', cpm: '13448', cost_per_result: '13448', roas: '3.1', conversion_rate: '4.08' },
  { date_start: '2026-01-08', date_stop: '2026-01-08', impressions: '62000', inline_link_clicks: '1580', spend: '820000', conversions: '65', reach: '45000', ctr: '2.55', cpc: '519', cpm: '13226', cost_per_result: '12615', roas: '3.3', conversion_rate: '4.11' },
  { date_start: '2026-01-09', date_stop: '2026-01-09', impressions: '55000', inline_link_clicks: '1350', spend: '720000', conversions: '52', reach: '39000', ctr: '2.45', cpc: '533', cpm: '13091', cost_per_result: '13846', roas: '2.9', conversion_rate: '3.85' },
  { date_start: '2026-01-10', date_stop: '2026-01-10', impressions: '71000', inline_link_clicks: '1820', spend: '950000', conversions: '78', reach: '52000', ctr: '2.56', cpc: '522', cpm: '13380', cost_per_result: '12179', roas: '3.5', conversion_rate: '4.29' },
  { date_start: '2026-01-11', date_stop: '2026-01-11', impressions: '68000', inline_link_clicks: '1680', spend: '890000', conversions: '72', reach: '49000', ctr: '2.47', cpc: '530', cpm: '13088', cost_per_result: '12361', roas: '3.4', conversion_rate: '4.29' },
  { date_start: '2026-01-12', date_stop: '2026-01-12', impressions: '75000', inline_link_clicks: '1950', spend: '1020000', conversions: '85', reach: '55000', ctr: '2.60', cpc: '523', cpm: '13600', cost_per_result: '12000', roas: '3.7', conversion_rate: '4.36' },
  { date_start: '2026-01-13', date_stop: '2026-01-13', impressions: '82000', inline_link_clicks: '2100', spend: '1100000', conversions: '92', reach: '60000', ctr: '2.56', cpc: '524', cpm: '13415', cost_per_result: '11957', roas: '3.8', conversion_rate: '4.38' },
  { date_start: '2026-01-14', date_stop: '2026-01-14', impressions: '78000', inline_link_clicks: '1980', spend: '1050000', conversions: '88', reach: '57000', ctr: '2.54', cpc: '530', cpm: '13462', cost_per_result: '11932', roas: '3.6', conversion_rate: '4.44' },
  { date_start: '2026-01-15', date_stop: '2026-01-15', impressions: '85000', inline_link_clicks: '2200', spend: '1150000', conversions: '95', reach: '63000', ctr: '2.59', cpc: '523', cpm: '13529', cost_per_result: '12105', roas: '3.9', conversion_rate: '4.32' },
  { date_start: '2026-01-16', date_stop: '2026-01-16', impressions: '90000', inline_link_clicks: '2350', spend: '1200000', conversions: '102', reach: '67000', ctr: '2.61', cpc: '511', cpm: '13333', cost_per_result: '11765', roas: '4.0', conversion_rate: '4.34' },
  { date_start: '2026-01-17', date_stop: '2026-01-17', impressions: '88000', inline_link_clicks: '2280', spend: '1180000', conversions: '98', reach: '65000', ctr: '2.59', cpc: '518', cpm: '13409', cost_per_result: '12041', roas: '3.9', conversion_rate: '4.30' },
  { date_start: '2026-01-18', date_stop: '2026-01-18', impressions: '92000', inline_link_clicks: '2400', spend: '1250000', conversions: '108', reach: '69000', ctr: '2.61', cpc: '521', cpm: '13587', cost_per_result: '11574', roas: '4.1', conversion_rate: '4.50' },
  { date_start: '2026-01-19', date_stop: '2026-01-19', impressions: '95000', inline_link_clicks: '2520', spend: '1300000', conversions: '115', reach: '72000', ctr: '2.65', cpc: '516', cpm: '13684', cost_per_result: '11304', roas: '4.2', conversion_rate: '4.56' },
  { date_start: '2026-01-20', date_stop: '2026-01-20', impressions: '98000', inline_link_clicks: '2600', spend: '1350000', conversions: '120', reach: '75000', ctr: '2.65', cpc: '519', cpm: '13776', cost_per_result: '11250', roas: '4.3', conversion_rate: '4.62' },
];

// ============================================
// ads_insights_industry_benchmark response
// ============================================
export interface IndustryBenchmark {
  metric: string;
  yourValue: number;
  industryAverage: number;
  industryTop: number;
  percentile: number;
}

export const industryBenchmarks: IndustryBenchmark[] = [
  { metric: 'CTR', yourValue: 2.45, industryAverage: 1.80, industryTop: 3.50, percentile: 72 },
  { metric: 'CPC', yourValue: 543, industryAverage: 680, industryTop: 420, percentile: 68 },
  { metric: 'CPM', yourValue: 13322, industryAverage: 15500, industryTop: 11000, percentile: 65 },
  { metric: 'ROAS', yourValue: 3.8, industryAverage: 2.9, industryTop: 5.2, percentile: 74 },
  { metric: 'Conversion Rate', yourValue: 4.09, industryAverage: 3.2, industryTop: 5.8, percentile: 70 },
];

// ============================================
// Aggregated metrics (computed from campaigns)
// ============================================
export const overviewMetrics = {
  // Core delivery
  impressions: 1845000,
  reach: 1230000,
  frequency: 1.5,
  // Click metrics
  clicks: 52800, // all clicks
  inline_link_clicks: 45200, // link clicks
  ctr: 2.45, // link CTR
  // Cost metrics
  spend: 24580000,
  cpc: 543, // cost per inline link click
  cpm: 13322,
  cpp: 19984, // cost per 1000 people reached
  // Conversions
  conversions: 1850,
  cost_per_result: 13286,
  conversion_rate: 4.09,
  // ROAS
  purchase_roas: 3.8,
  // Engagement
  engagement_rate: 4.12,
};

// ============================================
// Breakdowns (dari ads_get_ad_entities dengan breakdowns param)
// ============================================

// age, gender breakdown
export const audienceByAge = [
  { age: '13-17', impressions: '36900', reach: '24600', spend: '491600', inline_link_clicks: '904' },
  { age: '18-24', impressions: '405900', reach: '270600', spend: '5399780', inline_link_clicks: '9944' },
  { age: '25-34', impressions: '701100', reach: '467400', spend: '9324630', inline_link_clicks: '17177' },
  { age: '35-44', impressions: '405900', reach: '270600', spend: '5399780', inline_link_clicks: '9944' },
  { age: '45-54', impressions: '184500', reach: '123000', spend: '2458000', inline_link_clicks: '4516' },
  { age: '55-64', impressions: '73800', reach: '49200', spend: '983200', inline_link_clicks: '1808' },
  { age: '65+', impressions: '36900', reach: '24600', spend: '491600', inline_link_clicks: '904' },
];

export const audienceByGender = [
  { gender: 'male', impressions: '996300', reach: '664200', spend: '13273200', inline_link_clicks: '24408' },
  { gender: 'female', impressions: '813900', reach: '542600', spend: '10852200', inline_link_clicks: '19946' },
  { gender: 'unknown', impressions: '36900', reach: '24600', spend: '491600', inline_link_clicks: '904' },
];

// publisher_platform, platform_position breakdown
export const placementsBreakdown = [
  { publisher_platform: 'facebook', platform_position: 'feed', impressions: '520000', inline_link_clicks: '14200', spend: '8200000' },
  { publisher_platform: 'instagram', platform_position: 'feed', impressions: '380000', inline_link_clicks: '11500', spend: '6500000' },
  { publisher_platform: 'instagram', platform_position: 'reels', impressions: '285000', inline_link_clicks: '8200', spend: '4200000' },
  { publisher_platform: 'facebook', platform_position: 'story', impressions: '132000', inline_link_clicks: '3400', spend: '1680000' },
  { publisher_platform: 'instagram', platform_position: 'story', impressions: '88000', inline_link_clicks: '2400', spend: '1120000' },
  { publisher_platform: 'facebook', platform_position: 'reels', impressions: '180000', inline_link_clicks: '4500', spend: '2100000' },
  { publisher_platform: 'audience_network', platform_position: 'classic', impressions: '140000', inline_link_clicks: '2800', spend: '1280000' },
  { publisher_platform: 'messenger', platform_position: 'messenger_home', impressions: '120000', inline_link_clicks: '1900', spend: '900000' },
];

// device_platform breakdown
export const deviceBreakdown = [
  { device_platform: 'mobile', impressions: '1400000', inline_link_clicks: '36100', spend: '18732000' },
  { device_platform: 'desktop', impressions: '320000', inline_link_clicks: '6400', spend: '4264000' },
  { device_platform: 'tablet', impressions: '125000', inline_link_clicks: '2700', spend: '1584000' },
];
