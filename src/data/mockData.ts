/**
 * Data structure disesuaikan dengan output Meta Ads MCP Server
 * Reference: https://developers.facebook.com/documentation/ads-commerce/ads-ai-connectors/ads-mcp-server/
 *
 * Tool utama: ads_get_ad_entities
 * - level: campaign | adset | ad
 * - fields: impressions, reach, clicks, inline_link_clicks, ctr, cpc, cpm, spend, actions, action_values, cost_per_action_type, purchase_roas
 */

// ODAX objectives (Meta Marketing API enum values)
export type CampaignObjective = 'AWARENESS' | 'TRAFFIC' | 'ENGAGEMENT' | 'LEADS' | 'APP_PROMOTION' | 'SALES';
export type EntityStatus = 'ACTIVE' | 'PAUSED' | 'DELETED' | 'ARCHIVED';
export type DeliveryStatus = 'ACTIVE' | 'LEARNING' | 'LIMITED' | 'INACTIVE';
export type QualityRanking = 'ABOVE_AVERAGE' | 'AVERAGE' | 'BELOW_AVERAGE';

// Common performance metrics (available at all levels: campaign, adset, ad)
export interface PerformanceMetrics {
  impressions: string;
  reach: string;
  frequency: string;
  clicks: string;
  inline_link_clicks: string;
  ctr: string;
  cpc: string;
  cpm: string;
  spend: string;
  actions: { action_type: string; value: string }[];
  action_values: { action_type: string; value: string }[];
  cost_per_action_type: { action_type: string; value: string }[];
  purchase_roas: number | null;
  quality_ranking: QualityRanking;
  engagement_rate_ranking: QualityRanking;
  conversion_rate_ranking: QualityRanking;
}

// Campaign entity (level: campaign)
export interface CampaignEntity extends PerformanceMetrics {
  campaign_id: string;
  campaign_name: string;
  objective: CampaignObjective;
  status: EntityStatus;
  delivery_status: DeliveryStatus;
  start_time: string;
  end_time: string | null;
  daily_budget: string | null;
  lifetime_budget: string | null;
  bid_strategy: string;
  adsets_count: number;
}

// Ad Set entity (level: adset)
export interface AdSetEntity extends PerformanceMetrics {
  adset_id: string;
  adset_name: string;
  campaign_id: string;
  status: EntityStatus;
  delivery_status: DeliveryStatus;
  start_time: string;
  end_time: string | null;
  daily_budget: string | null;
  lifetime_budget: string | null;
  bid_amount: string | null;
  optimization_goal: string;
  targeting: string; // simplified
  ads_count: number;
}

// Ad entity (level: ad)
export interface AdEntity extends PerformanceMetrics {
  ad_id: string;
  ad_name: string;
  adset_id: string;
  campaign_id: string;
  status: EntityStatus;
  delivery_status: DeliveryStatus;
  creative: {
    title: string;
    body: string;
    image_url?: string;
    video_url?: string;
    link_url: string;
  };
}

// Performance trend (ads_insights_performance_trend)
export interface PerformanceTrend {
  date_start: string;
  date_stop: string;
  impressions: string;
  inline_link_clicks: string;
  spend: string;
  conversions: string;
  ctr: string;
  cpc: string;
  cpm: string;
  cost_per_result: string;
  roas: string;
}

// Opportunity score (ads_get_opportunity_score)
export interface OpportunityScore {
  score: number;
  recommendations: {
    id: string;
    title: string;
    impact: 'HIGH' | 'MEDIUM' | 'LOW';
  }[];
}

// Anomaly signal (ads_insights_anomaly_signal)
export interface AnomalySignal {
  metric: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  message: string;
  deviation: string;
}

// ============================================
// CAMPAIGNS (level: campaign)
// ============================================
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
    impressions: '425000',
    reach: '312000',
    frequency: '1.36',
    clicks: '14200',
    inline_link_clicks: '12500',
    ctr: '2.94',
    cpc: '416',
    cpm: '12235',
    spend: '5200000',
    actions: [{ action_type: 'purchase', value: '420' }],
    action_values: [{ action_type: 'purchase', value: '21840000' }],
    cost_per_action_type: [{ action_type: 'purchase', value: '12381' }],
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
    impressions: '380000',
    reach: '285000',
    frequency: '1.33',
    clicks: '12800',
    inline_link_clicks: '11200',
    ctr: '2.95',
    cpc: '607',
    cpm: '17895',
    spend: '6800000',
    actions: [{ action_type: 'lead', value: '520' }],
    action_values: [{ action_type: 'lead', value: '32640000' }],
    cost_per_action_type: [{ action_type: 'lead', value: '13077' }],
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
    impressions: '520000',
    reach: '180000',
    frequency: '2.89',
    clicks: '10200',
    inline_link_clicks: '8900',
    ctr: '1.71',
    cpc: '506',
    cpm: '8654',
    spend: '4500000',
    actions: [{ action_type: 'purchase', value: '380' }],
    action_values: [{ action_type: 'purchase', value: '23400000' }],
    cost_per_action_type: [{ action_type: 'purchase', value: '11842' }],
    purchase_roas: 5.2,
    quality_ranking: 'AVERAGE',
    engagement_rate_ranking: 'AVERAGE',
    conversion_rate_ranking: 'ABOVE_AVERAGE',
  },
  {
    campaign_id: '23851234567890126',
    campaign_name: 'Engagement - Brand Content',
    objective: 'ENGAGEMENT',
    status: 'ACTIVE',
    delivery_status: 'LEARNING',
    start_time: '2026-01-15T00:00:00+0700',
    end_time: '2026-02-15T23:59:59+0700',
    daily_budget: '200000',
    lifetime_budget: null,
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
    adsets_count: 2,
    impressions: '285000',
    reach: '220000',
    frequency: '1.30',
    clicks: '15600',
    inline_link_clicks: '7800',
    ctr: '2.74',
    cpc: '410',
    cpm: '11228',
    spend: '3200000',
    actions: [{ action_type: 'post_engagement', value: '1850' }],
    action_values: [],
    cost_per_action_type: [{ action_type: 'post_engagement', value: '1730' }],
    purchase_roas: null,
    quality_ranking: 'ABOVE_AVERAGE',
    engagement_rate_ranking: 'ABOVE_AVERAGE',
    conversion_rate_ranking: 'ABOVE_AVERAGE',
  },
  {
    campaign_id: '23851234567890127',
    campaign_name: 'Traffic - Blog Promotion',
    objective: 'TRAFFIC',
    status: 'PAUSED',
    delivery_status: 'INACTIVE',
    start_time: '2026-01-01T00:00:00+0700',
    end_time: '2026-01-31T23:59:59+0700',
    daily_budget: '300000',
    lifetime_budget: null,
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
    adsets_count: 3,
    impressions: '235000',
    reach: '195000',
    frequency: '1.20',
    clicks: '5400',
    inline_link_clicks: '4800',
    ctr: '2.04',
    cpc: '1017',
    cpm: '20766',
    spend: '4880000',
    actions: [{ action_type: 'link_click', value: '4800' }],
    action_values: [],
    cost_per_action_type: [{ action_type: 'link_click', value: '1017' }],
    purchase_roas: null,
    quality_ranking: 'BELOW_AVERAGE',
    engagement_rate_ranking: 'AVERAGE',
    conversion_rate_ranking: 'BELOW_AVERAGE',
  },
];

// ============================================
// AD SETS (level: adset)
// ============================================
export const adSets: AdSetEntity[] = [
  // Campaign 1 - SmartWatch Pro
  {
    adset_id: '23851234567891001',
    adset_name: 'Prospecting - Interest: Tech Gadgets',
    campaign_id: '23851234567890123',
    status: 'ACTIVE',
    delivery_status: 'ACTIVE',
    start_time: '2026-01-01T00:00:00+0700',
    end_time: null,
    daily_budget: '200000',
    lifetime_budget: null,
    bid_amount: null,
    optimization_goal: 'PURCHASE',
    targeting: 'age:25-45, interest:technology, location:ID',
    ads_count: 3,
    impressions: '180000',
    reach: '145000',
    frequency: '1.24',
    clicks: '5800',
    inline_link_clicks: '5200',
    ctr: '2.89',
    cpc: '423',
    cpm: '12889',
    spend: '2200000',
    actions: [{ action_type: 'purchase', value: '180' }],
    action_values: [{ action_type: 'purchase', value: '9360000' }],
    cost_per_action_type: [{ action_type: 'purchase', value: '12222' }],
    purchase_roas: 4.25,
    quality_ranking: 'ABOVE_AVERAGE',
    engagement_rate_ranking: 'ABOVE_AVERAGE',
    conversion_rate_ranking: 'ABOVE_AVERAGE',
  },
  {
    adset_id: '23851234567891002',
    adset_name: 'Prospecting - Lookalike 1%',
    campaign_id: '23851234567890123',
    status: 'ACTIVE',
    delivery_status: 'ACTIVE',
    start_time: '2026-01-01T00:00:00+0700',
    end_time: null,
    daily_budget: '150000',
    lifetime_budget: null,
    bid_amount: null,
    optimization_goal: 'PURCHASE',
    targeting: 'lookalike:purchasers_1pct, location:ID',
    ads_count: 3,
    impressions: '140000',
    reach: '108000',
    frequency: '1.30',
    clicks: '4600',
    inline_link_clicks: '4200',
    ctr: '3.00',
    cpc: '393',
    cpm: '11071',
    spend: '1550000',
    actions: [{ action_type: 'purchase', value: '145' }],
    action_values: [{ action_type: 'purchase', value: '7540000' }],
    cost_per_action_type: [{ action_type: 'purchase', value: '10690' }],
    purchase_roas: 4.86,
    quality_ranking: 'ABOVE_AVERAGE',
    engagement_rate_ranking: 'ABOVE_AVERAGE',
    conversion_rate_ranking: 'ABOVE_AVERAGE',
  },
  {
    adset_id: '23851234567891003',
    adset_name: 'Retargeting - Website Visitors 30d',
    campaign_id: '23851234567890123',
    status: 'ACTIVE',
    delivery_status: 'ACTIVE',
    start_time: '2026-01-01T00:00:00+0700',
    end_time: null,
    daily_budget: '150000',
    lifetime_budget: null,
    bid_amount: null,
    optimization_goal: 'PURCHASE',
    targeting: 'custom_audience:website_visitors_30d, location:ID',
    ads_count: 3,
    impressions: '105000',
    reach: '59000',
    frequency: '1.78',
    clicks: '3800',
    inline_link_clicks: '3100',
    ctr: '2.95',
    cpc: '468',
    cpm: '13810',
    spend: '1450000',
    actions: [{ action_type: 'purchase', value: '95' }],
    action_values: [{ action_type: 'purchase', value: '4940000' }],
    cost_per_action_type: [{ action_type: 'purchase', value: '15263' }],
    purchase_roas: 3.41,
    quality_ranking: 'AVERAGE',
    engagement_rate_ranking: 'AVERAGE',
    conversion_rate_ranking: 'ABOVE_AVERAGE',
  },
  // Campaign 2 - Webinar Leads
  {
    adset_id: '23851234567891004',
    adset_name: 'Leads - Marketers 25-40',
    campaign_id: '23851234567890124',
    status: 'ACTIVE',
    delivery_status: 'ACTIVE',
    start_time: '2026-01-05T00:00:00+0700',
    end_time: null,
    daily_budget: '250000',
    lifetime_budget: null,
    bid_amount: '50000',
    optimization_goal: 'LEAD_GENERATION',
    targeting: 'age:25-40, job:marketing, location:ID',
    ads_count: 3,
    impressions: '210000',
    reach: '165000',
    frequency: '1.27',
    clicks: '7200',
    inline_link_clicks: '6500',
    ctr: '3.10',
    cpc: '538',
    cpm: '17143',
    spend: '3500000',
    actions: [{ action_type: 'lead', value: '290' }],
    action_values: [{ action_type: 'lead', value: '17400000' }],
    cost_per_action_type: [{ action_type: 'lead', value: '12069' }],
    purchase_roas: 4.97,
    quality_ranking: 'ABOVE_AVERAGE',
    engagement_rate_ranking: 'ABOVE_AVERAGE',
    conversion_rate_ranking: 'ABOVE_AVERAGE',
  },
  {
    adset_id: '23851234567891005',
    adset_name: 'Leads - Business Owners',
    campaign_id: '23851234567890124',
    status: 'ACTIVE',
    delivery_status: 'ACTIVE',
    start_time: '2026-01-05T00:00:00+0700',
    end_time: null,
    daily_budget: '150000',
    lifetime_budget: null,
    bid_amount: '60000',
    optimization_goal: 'LEAD_GENERATION',
    targeting: 'age:30-55, interest:business, location:ID',
    ads_count: 3,
    impressions: '170000',
    reach: '120000',
    frequency: '1.42',
    clicks: '5600',
    inline_link_clicks: '4700',
    ctr: '2.76',
    cpc: '702',
    cpm: '19412',
    spend: '3300000',
    actions: [{ action_type: 'lead', value: '230' }],
    action_values: [{ action_type: 'lead', value: '15240000' }],
    cost_per_action_type: [{ action_type: 'lead', value: '14348' }],
    purchase_roas: 4.62,
    quality_ranking: 'AVERAGE',
    engagement_rate_ranking: 'ABOVE_AVERAGE',
    conversion_rate_ranking: 'ABOVE_AVERAGE',
  },
];

// ============================================
// ADS (level: ad)
// ============================================
export const ads: AdEntity[] = [
  // AdSet 1 - SmartWatch Prospecting Interest
  {
    ad_id: '23851234567892001',
    ad_name: 'SmartWatch - Product Showcase v1',
    adset_id: '23851234567891001',
    campaign_id: '23851234567890123',
    status: 'ACTIVE',
    delivery_status: 'ACTIVE',
    creative: {
      title: 'SmartWatch Pro - Feature Rich',
      body: 'Track your health, stay connected. Order now with 20% off!',
      link_url: 'https://example.com/smartwatch-pro',
    },
    impressions: '72000',
    reach: '58000',
    frequency: '1.24',
    clicks: '2400',
    inline_link_clicks: '2100',
    ctr: '2.92',
    cpc: '438',
    cpm: '13056',
    spend: '940000',
    actions: [{ action_type: 'purchase', value: '78' }],
    action_values: [{ action_type: 'purchase', value: '4056000' }],
    cost_per_action_type: [{ action_type: 'purchase', value: '12051' }],
    purchase_roas: 4.31,
    quality_ranking: 'ABOVE_AVERAGE',
    engagement_rate_ranking: 'ABOVE_AVERAGE',
    conversion_rate_ranking: 'ABOVE_AVERAGE',
  },
  {
    ad_id: '23851234567892002',
    ad_name: 'SmartWatch - Lifestyle Video',
    adset_id: '23851234567891001',
    campaign_id: '23851234567890123',
    status: 'ACTIVE',
    delivery_status: 'ACTIVE',
    creative: {
      title: 'Your Day, Upgraded',
      body: 'See how SmartWatch Pro transforms your daily routine.',
      link_url: 'https://example.com/smartwatch-pro',
    },
    impressions: '62000',
    reach: '50000',
    frequency: '1.24',
    clicks: '2000',
    inline_link_clicks: '1750',
    ctr: '2.82',
    cpc: '429',
    cpm: '12903',
    spend: '800000',
    actions: [{ action_type: 'purchase', value: '62' }],
    action_values: [{ action_type: 'purchase', value: '3224000' }],
    cost_per_action_type: [{ action_type: 'purchase', value: '12903' }],
    purchase_roas: 4.03,
    quality_ranking: 'ABOVE_AVERAGE',
    engagement_rate_ranking: 'ABOVE_AVERAGE',
    conversion_rate_ranking: 'AVERAGE',
  },
  {
    ad_id: '23851234567892003',
    ad_name: 'SmartWatch - Carousel Features',
    adset_id: '23851234567891001',
    campaign_id: '23851234567890123',
    status: 'ACTIVE',
    delivery_status: 'ACTIVE',
    creative: {
      title: '5 Reasons to Choose SmartWatch Pro',
      body: 'Swipe to discover all the features that make SmartWatch Pro the best choice.',
      link_url: 'https://example.com/smartwatch-pro',
    },
    impressions: '46000',
    reach: '37000',
    frequency: '1.24',
    clicks: '1400',
    inline_link_clicks: '1350',
    ctr: '2.93',
    cpc: '393',
    cpm: '12391',
    spend: '460000',
    actions: [{ action_type: 'purchase', value: '40' }],
    action_values: [{ action_type: 'purchase', value: '2080000' }],
    cost_per_action_type: [{ action_type: 'purchase', value: '11500' }],
    purchase_roas: 4.52,
    quality_ranking: 'ABOVE_AVERAGE',
    engagement_rate_ranking: 'ABOVE_AVERAGE',
    conversion_rate_ranking: 'ABOVE_AVERAGE',
  },
  // AdSet 4 - Webinar Leads Marketers
  {
    ad_id: '23851234567892004',
    ad_name: 'Webinar - Register Now',
    adset_id: '23851234567891004',
    campaign_id: '23851234567890124',
    status: 'ACTIVE',
    delivery_status: 'ACTIVE',
    creative: {
      title: 'Free Webinar: Digital Marketing 2026',
      body: 'Join 5000+ marketers. Learn the latest strategies. Register free!',
      link_url: 'https://example.com/webinar-register',
    },
    impressions: '120000',
    reach: '95000',
    frequency: '1.26',
    clicks: '4200',
    inline_link_clicks: '3800',
    ctr: '3.17',
    cpc: '513',
    cpm: '16667',
    spend: '2000000',
    actions: [{ action_type: 'lead', value: '170' }],
    action_values: [{ action_type: 'lead', value: '10200000' }],
    cost_per_action_type: [{ action_type: 'lead', value: '11765' }],
    purchase_roas: 5.1,
    quality_ranking: 'ABOVE_AVERAGE',
    engagement_rate_ranking: 'ABOVE_AVERAGE',
    conversion_rate_ranking: 'ABOVE_AVERAGE',
  },
  {
    ad_id: '23851234567892005',
    ad_name: 'Webinar - Social Proof',
    adset_id: '23851234567891004',
    campaign_id: '23851234567890124',
    status: 'ACTIVE',
    delivery_status: 'ACTIVE',
    creative: {
      title: 'What Our Attendees Say',
      body: '"Best marketing webinar I attended this year!" - Sarah K. Register now.',
      link_url: 'https://example.com/webinar-register',
    },
    impressions: '90000',
    reach: '70000',
    frequency: '1.29',
    clicks: '3000',
    inline_link_clicks: '2700',
    ctr: '3.00',
    cpc: '556',
    cpm: '16667',
    spend: '1500000',
    actions: [{ action_type: 'lead', value: '120' }],
    action_values: [{ action_type: 'lead', value: '7200000' }],
    cost_per_action_type: [{ action_type: 'lead', value: '12500' }],
    purchase_roas: 4.8,
    quality_ranking: 'ABOVE_AVERAGE',
    engagement_rate_ranking: 'ABOVE_AVERAGE',
    conversion_rate_ranking: 'AVERAGE',
  },
];

// ============================================
// PERFORMANCE TRENDS (ads_insights_performance_trend)
// ============================================
export const accountPerformanceTrend: PerformanceTrend[] = [
  { date_start: '2026-01-07', date_stop: '2026-01-07', impressions: '58000', inline_link_clicks: '1420', spend: '780000', conversions: '58', ctr: '2.45', cpc: '549', cpm: '13448', cost_per_result: '13448', roas: '3.1' },
  { date_start: '2026-01-08', date_stop: '2026-01-08', impressions: '62000', inline_link_clicks: '1580', spend: '820000', conversions: '65', ctr: '2.55', cpc: '519', cpm: '13226', cost_per_result: '12615', roas: '3.3' },
  { date_start: '2026-01-09', date_stop: '2026-01-09', impressions: '55000', inline_link_clicks: '1350', spend: '720000', conversions: '52', ctr: '2.45', cpc: '533', cpm: '13091', cost_per_result: '13846', roas: '2.9' },
  { date_start: '2026-01-10', date_stop: '2026-01-10', impressions: '71000', inline_link_clicks: '1820', spend: '950000', conversions: '78', ctr: '2.56', cpc: '522', cpm: '13380', cost_per_result: '12179', roas: '3.5' },
  { date_start: '2026-01-11', date_stop: '2026-01-11', impressions: '68000', inline_link_clicks: '1680', spend: '890000', conversions: '72', ctr: '2.47', cpc: '530', cpm: '13088', cost_per_result: '12361', roas: '3.4' },
  { date_start: '2026-01-12', date_stop: '2026-01-12', impressions: '75000', inline_link_clicks: '1950', spend: '1020000', conversions: '85', ctr: '2.60', cpc: '523', cpm: '13600', cost_per_result: '12000', roas: '3.7' },
  { date_start: '2026-01-13', date_stop: '2026-01-13', impressions: '82000', inline_link_clicks: '2100', spend: '1100000', conversions: '92', ctr: '2.56', cpc: '524', cpm: '13415', cost_per_result: '11957', roas: '3.8' },
  { date_start: '2026-01-14', date_stop: '2026-01-14', impressions: '78000', inline_link_clicks: '1980', spend: '1050000', conversions: '88', ctr: '2.54', cpc: '530', cpm: '13462', cost_per_result: '11932', roas: '3.6' },
  { date_start: '2026-01-15', date_stop: '2026-01-15', impressions: '85000', inline_link_clicks: '2200', spend: '1150000', conversions: '95', ctr: '2.59', cpc: '523', cpm: '13529', cost_per_result: '12105', roas: '3.9' },
  { date_start: '2026-01-16', date_stop: '2026-01-16', impressions: '90000', inline_link_clicks: '2350', spend: '1200000', conversions: '102', ctr: '2.61', cpc: '511', cpm: '13333', cost_per_result: '11765', roas: '4.0' },
  { date_start: '2026-01-17', date_stop: '2026-01-17', impressions: '88000', inline_link_clicks: '2280', spend: '1180000', conversions: '98', ctr: '2.59', cpc: '518', cpm: '13409', cost_per_result: '12041', roas: '3.9' },
  { date_start: '2026-01-18', date_stop: '2026-01-18', impressions: '92000', inline_link_clicks: '2400', spend: '1250000', conversions: '108', ctr: '2.61', cpc: '521', cpm: '13587', cost_per_result: '11574', roas: '4.1' },
  { date_start: '2026-01-19', date_stop: '2026-01-19', impressions: '95000', inline_link_clicks: '2520', spend: '1300000', conversions: '115', ctr: '2.65', cpc: '516', cpm: '13684', cost_per_result: '11304', roas: '4.2' },
  { date_start: '2026-01-20', date_stop: '2026-01-20', impressions: '98000', inline_link_clicks: '2600', spend: '1350000', conversions: '120', ctr: '2.65', cpc: '519', cpm: '13776', cost_per_result: '11250', roas: '4.3' },
];

// ============================================
// OPPORTUNITY & ANOMALY
// ============================================
export const opportunityScore: OpportunityScore = {
  score: 72,
  recommendations: [
    { id: 'rec_001', title: 'Increase budget on high-ROAS campaign', impact: 'HIGH' },
    { id: 'rec_002', title: 'Refresh creative for fatigued ad', impact: 'MEDIUM' },
    { id: 'rec_003', title: 'Expand audience for Learning ad set', impact: 'MEDIUM' },
  ],
};

export const anomalySignals: AnomalySignal[] = [
  { metric: 'CPM', severity: 'WARNING', message: 'CPM naik 28% pada "Traffic - Blog Promotion"', deviation: '+28%' },
  { metric: 'CTR', severity: 'INFO', message: 'CTR "Engagement - Brand Content" naik 22%', deviation: '+22%' },
];
