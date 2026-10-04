// Data disesuaikan dengan struktur real Meta Ads Manager (ODAX 2026)
// Reference: https://www.facebook.com/business/help/1438417719786914

export const overviewMetrics = {
  totalSpend: 24580000,
  totalImpressions: 1845000,
  totalReach: 1230000,
  totalLinkClicks: 45200, // Link clicks (bukan all clicks)
  totalAllClicks: 52800, // Semua jenis klik
  totalConversions: 1850,
  totalResults: 1850, // "Results" adalah istilah Meta untuk konversi berdasarkan objective
  avgCTR: 2.45, // Link CTR (bukan all CTR)
  avgAllCTR: 2.86,
  avgCPC: 543, // Cost per link click
  avgCPM: 13322, // Cost per 1000 impressions
  avgCPP: 19984, // Cost per 1000 people reached
  avgCostPerResult: 13286, // Cost per conversion/result
  avgConversionRate: 4.09, // Conversion rate (conversions / link clicks)
  roas: 3.8,
  frequency: 1.5, // impressions / reach
  engagementRate: 4.12,
};

// 6 ODAX Objectives (simplified dari 11 objectives lama)
export type CampaignObjective =
  | 'Awareness'
  | 'Traffic'
  | 'Engagement'
  | 'Leads'
  | 'App Promotion'
  | 'Sales';

// Status di Meta Ads Manager (tidak ada "completed")
export type CampaignStatus = 'Active' | 'Paused' | 'Off' | 'Draft';

// Delivery status
export type DeliveryStatus = 'Active' | 'Learning' | 'Limited' | 'Inactive';

export const dailyPerformance = [
  { date: '07 Jan', impressions: 58000, linkClicks: 1420, allClicks: 1650, spend: 780000, conversions: 58, reach: 42000 },
  { date: '08 Jan', impressions: 62000, linkClicks: 1580, allClicks: 1820, spend: 820000, conversions: 65, reach: 45000 },
  { date: '09 Jan', impressions: 55000, linkClicks: 1350, allClicks: 1560, spend: 720000, conversions: 52, reach: 39000 },
  { date: '10 Jan', impressions: 71000, linkClicks: 1820, allClicks: 2100, spend: 950000, conversions: 78, reach: 52000 },
  { date: '11 Jan', impressions: 68000, linkClicks: 1680, allClicks: 1940, spend: 890000, conversions: 72, reach: 49000 },
  { date: '12 Jan', impressions: 75000, linkClicks: 1950, allClicks: 2250, spend: 1020000, conversions: 85, reach: 55000 },
  { date: '13 Jan', impressions: 82000, linkClicks: 2100, allClicks: 2430, spend: 1100000, conversions: 92, reach: 60000 },
  { date: '14 Jan', impressions: 78000, linkClicks: 1980, allClicks: 2290, spend: 1050000, conversions: 88, reach: 57000 },
  { date: '15 Jan', impressions: 85000, linkClicks: 2200, allClicks: 2550, spend: 1150000, conversions: 95, reach: 63000 },
  { date: '16 Jan', impressions: 90000, linkClicks: 2350, allClicks: 2720, spend: 1200000, conversions: 102, reach: 67000 },
  { date: '17 Jan', impressions: 88000, linkClicks: 2280, allClicks: 2640, spend: 1180000, conversions: 98, reach: 65000 },
  { date: '18 Jan', impressions: 92000, linkClicks: 2400, allClicks: 2780, spend: 1250000, conversions: 108, reach: 69000 },
  { date: '19 Jan', impressions: 95000, linkClicks: 2520, allClicks: 2920, spend: 1300000, conversions: 115, reach: 72000 },
  { date: '20 Jan', impressions: 98000, linkClicks: 2600, allClicks: 3010, spend: 1350000, conversions: 120, reach: 75000 },
];

// Campaign data sesuai struktur Meta Ads Manager
export const campaigns = [
  {
    id: 'camp_001',
    name: 'Sales - SmartWatch Pro Q1',
    status: 'Active' as CampaignStatus,
    delivery: 'Active' as DeliveryStatus,
    objective: 'Sales' as CampaignObjective,
    campaignType: 'Sales',
    adSets: 3,
    ads: 9,
    schedule: '01 Jan - 31 Mar 2026',
    bidding: 'Lowest Cost (Highest Volume)',
    impressions: 425000,
    reach: 312000,
    linkClicks: 12500,
    allClicks: 14200,
    ctr: 2.94, // Link CTR
    allCtr: 3.34,
    spend: 5200000,
    conversions: 420,
    results: 420,
    costPerResult: 12381,
    conversionRate: 3.36,
    cpc: 416,
    cpm: 12235,
    cpp: 16667,
    roas: 4.2,
    frequency: 1.36,
    engagementRate: 4.8,
    qualityRanking: 'Above Average',
    engagementRanking: 'Above Average',
    conversionRanking: 'Average',
    change: 12.5,
  },
  {
    id: 'camp_002',
    name: 'Leads - Webinar Digital Marketing',
    status: 'Active' as CampaignStatus,
    delivery: 'Active' as DeliveryStatus,
    objective: 'Leads' as CampaignObjective,
    campaignType: 'Leads',
    adSets: 2,
    ads: 6,
    schedule: '05 Jan - 28 Feb 2026',
    bidding: 'Cost Cap',
    impressions: 380000,
    reach: 285000,
    linkClicks: 11200,
    allClicks: 12800,
    ctr: 2.95,
    allCtr: 3.37,
    spend: 6800000,
    conversions: 520,
    results: 520,
    costPerResult: 13077,
    conversionRate: 4.64,
    cpc: 607,
    cpm: 17895,
    cpp: 23860,
    roas: 4.8,
    frequency: 1.33,
    engagementRate: 5.2,
    qualityRanking: 'Above Average',
    engagementRanking: 'Above Average',
    conversionRanking: 'Above Average',
    change: 8.3,
  },
  {
    id: 'camp_003',
    name: 'Retargeting - Cart Abandonment (Sales)',
    status: 'Active' as CampaignStatus,
    delivery: 'Active' as DeliveryStatus,
    objective: 'Sales' as CampaignObjective,
    campaignType: 'Sales',
    adSets: 4,
    ads: 12,
    schedule: '01 Jan - 31 Mar 2026',
    bidding: 'Lowest Cost (Highest Volume)',
    impressions: 520000,
    reach: 180000,
    linkClicks: 8900,
    allClicks: 10200,
    ctr: 1.71,
    allCtr: 1.96,
    spend: 4500000,
    conversions: 380,
    results: 380,
    costPerResult: 11842,
    conversionRate: 4.27,
    cpc: 506,
    cpm: 8654,
    cpp: 25000,
    roas: 5.2,
    frequency: 2.89,
    engagementRate: 3.1,
    qualityRanking: 'Average',
    engagementRanking: 'Average',
    conversionRanking: 'Above Average',
    change: -3.2,
  },
  {
    id: 'camp_004',
    name: 'Engagement - Brand Content Series',
    status: 'Active' as CampaignStatus,
    delivery: 'Learning' as DeliveryStatus,
    objective: 'Engagement' as CampaignObjective,
    campaignType: 'Engagement',
    adSets: 2,
    ads: 4,
    schedule: '15 Jan - 15 Feb 2026',
    bidding: 'Lowest Cost (Highest Volume)',
    impressions: 285000,
    reach: 220000,
    linkClicks: 7800,
    allClicks: 15600, // Engagement campaign = banyak all clicks (likes, comments, shares)
    ctr: 2.74,
    allCtr: 5.47,
    spend: 3200000,
    conversions: 310,
    results: 1850, // Results = engagements (bukan conversions)
    costPerResult: 1730,
    conversionRate: 3.97,
    cpc: 410,
    cpm: 11228,
    cpp: 14545,
    roas: 3.5,
    frequency: 1.3,
    engagementRate: 8.4,
    qualityRanking: 'Above Average',
    engagementRanking: 'Above Average',
    conversionRanking: 'Above Average',
    change: 22.1,
  },
  {
    id: 'camp_005',
    name: 'Traffic - Blog Content Promotion',
    status: 'Paused' as CampaignStatus,
    delivery: 'Inactive' as DeliveryStatus,
    objective: 'Traffic' as CampaignObjective,
    campaignType: 'Traffic',
    adSets: 3,
    ads: 6,
    schedule: '01 Jan - 31 Jan 2026',
    bidding: 'Lowest Cost (Highest Volume)',
    impressions: 235000,
    reach: 195000,
    linkClicks: 4800,
    allClicks: 5400,
    ctr: 2.04,
    allCtr: 2.3,
    spend: 4880000,
    conversions: 220,
    results: 220,
    costPerResult: 22182,
    conversionRate: 4.58,
    cpc: 1017,
    cpm: 20766,
    cpp: 25026,
    roas: 2.1,
    frequency: 1.2,
    engagementRate: 2.8,
    qualityRanking: 'Below Average',
    engagementRanking: 'Average',
    conversionRanking: 'Below Average',
    change: -15.4,
  },
  {
    id: 'camp_006',
    name: 'Awareness - New Product Teaser',
    status: 'Active' as CampaignStatus,
    delivery: 'Active' as DeliveryStatus,
    objective: 'Awareness' as CampaignObjective,
    campaignType: 'Awareness',
    adSets: 1,
    ads: 3,
    schedule: '10 Jan - 10 Feb 2026',
    bidding: 'Highest CPM (Ad Recall)',
    impressions: 450000,
    reach: 380000,
    linkClicks: 2100, // Awareness campaign = sedikit link clicks
    allClicks: 3200,
    ctr: 0.47,
    allCtr: 0.71,
    spend: 2800000,
    conversions: 0, // Awareness tidak optimasi untuk konversi
    results: 380000, // Results = reach untuk awareness
    costPerResult: 7.37,
    conversionRate: 0,
    cpc: 1333,
    cpm: 6222,
    cpp: 7368,
    roas: 0,
    frequency: 1.18,
    engagementRate: 1.2,
    qualityRanking: 'Average',
    engagementRanking: 'Below Average',
    conversionRanking: 'N/A',
    change: 5.6,
  },
];

// Demografi audience berdasarkan data Meta Ads
export const audienceDemographics = [
  { name: '13-17', value: 2 },
  { name: '18-24', value: 22 },
  { name: '25-34', value: 38 },
  { name: '35-44', value: 22 },
  { name: '45-54', value: 10 },
  { name: '55-64', value: 4 },
  { name: '65+', value: 2 },
];

// Gender split (tersedia di Meta Ads)
export const genderSplit = [
  { name: 'Male', value: 54 },
  { name: 'Female', value: 44 },
  { name: 'Other', value: 2 },
];

// Placements breakdown (sesuai Meta Ads Manager)
export const placementsBreakdown = [
  { name: 'Facebook Feed', impressions: 520000, clicks: 14200, spend: 8200000, percentage: 33.4 },
  { name: 'Instagram Feed', impressions: 380000, clicks: 11500, spend: 6500000, percentage: 26.5 },
  { name: 'Instagram Reels', impressions: 285000, clicks: 8200, spend: 4200000, percentage: 17.1 },
  { name: 'Facebook & IG Stories', impressions: 220000, clicks: 5800, spend: 2800000, percentage: 11.4 },
  { name: 'Facebook Reels', impressions: 180000, clicks: 4500, spend: 2100000, percentage: 8.5 },
  { name: 'Audience Network', impressions: 140000, clicks: 2800, spend: 1280000, percentage: 5.2 },
  { name: 'Messenger', impressions: 120000, clicks: 1900, spend: 900000, percentage: 3.7 },
];

// Platform split (simplified)
export const platformSplit = [
  { name: 'Facebook', impressions: 1060000, clicks: 28400, spend: 15280000, percentage: 62.2 },
  { name: 'Instagram', impressions: 665000, clicks: 19700, spend: 10700000, percentage: 43.5 },
  { name: 'Audience Network', impressions: 140000, clicks: 2800, spend: 1280000, percentage: 5.2 },
  { name: 'Messenger', impressions: 120000, clicks: 1900, spend: 900000, percentage: 3.7 },
];

// Weekly trend
export const weeklyTrend = [
  { week: 'Minggu 1', ctr: 2.1, cpc: 580, roas: 3.2, costPerResult: 14200 },
  { week: 'Minggu 2', ctr: 2.3, cpc: 550, roas: 3.5, costPerResult: 13800 },
  { week: 'Minggu 3', ctr: 2.5, cpc: 520, roas: 3.8, costPerResult: 13500 },
  { week: 'Minggu 4', ctr: 2.4, cpc: 540, roas: 3.6, costPerResult: 13600 },
  { week: 'Minggu 5', ctr: 2.7, cpc: 500, roas: 4.1, costPerResult: 12800 },
  { week: 'Minggu 6', ctr: 2.8, cpc: 480, roas: 4.3, costPerResult: 12400 },
];

// Device breakdown (tersedia di Meta Ads)
export const deviceBreakdown = [
  { name: 'Mobile - Android', impressions: 720000, percentage: 39 },
  { name: 'Mobile - iOS', impressions: 680000, percentage: 36.9 },
  { name: 'Desktop', impressions: 320000, percentage: 17.3 },
  { name: 'Tablet', impressions: 125000, percentage: 6.8 },
];
