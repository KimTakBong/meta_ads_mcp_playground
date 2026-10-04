import { useState, useEffect } from 'react';
import {
  DollarSign,
  Eye,
  MousePointerClick,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Bell,
  Settings,
  Search,
  Calendar,
  ChevronDown,
  RefreshCw,
  LayoutDashboard,
  Megaphone,
  PieChart as PieChartIcon,
  FileText,
  HelpCircle,
  Zap,
  Award,
  Moon,
  Sun,
} from 'lucide-react';
import MetricCard from './components/MetricCard';
import PerformanceChart from './components/PerformanceChart';
import CampaignTable from './components/CampaignTable';
import AudienceChart, { PlatformChart } from './components/AudienceChart';
import WeeklyTrendChart from './components/WeeklyTrendChart';
import PlacementsBreakdown from './components/PlacementsBreakdown';
import OpportunityPanel from './components/OpportunityPanel';
import { overviewMetrics, opportunityScore } from './data/mockData';

export default function App() {
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(1)} Jt`;
    return `Rp ${value.toLocaleString('id-ID')}`;
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'audience', label: 'Audience', icon: PieChartIcon },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarHovered ? 'w-52' : 'w-14'
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 fixed h-full z-30`}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        <div className="p-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200 dark:shadow-blue-900 flex-shrink-0">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${sidebarHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
              <h1 className="font-bold text-gray-900 dark:text-gray-100 text-xs">Meta Ads MCP</h1>
              <p className="text-[9px] text-gray-500 dark:text-gray-400">Performance Monitor</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-1.5 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm font-medium transition-all ${
                activeNav === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap text-xs ${sidebarHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-1.5 border-t border-gray-100 dark:border-gray-700 space-y-0.5">
          <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            <HelpCircle className="w-4 h-4 flex-shrink-0" />
            <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap text-xs ${sidebarHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
              Help
            </span>
          </button>
          <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            <Settings className="w-4 h-4 flex-shrink-0" />
            <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap text-xs ${sidebarHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
              Settings
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-14 transition-all duration-300">
        {/* Top Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari campaign..."
                  className="pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs w-64 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 dark:focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>

              <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <Calendar className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">07 - 20 Jan 2026</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
                <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Page Title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Dashboard Overview</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Data via <span className="font-medium text-blue-600 dark:text-blue-400">Meta Ads MCP</span> • ads_get_ad_entities + ads_insights_performance_trend
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                <RefreshCw className="w-3.5 h-3.5" />
                Sync
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 dark:shadow-blue-900">
                <FileText className="w-3.5 h-3.5" />
                Export
              </button>
            </div>
          </div>

          {/* Metric Cards - Row 1 (expand TOP) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <MetricCard
              title="Amount Spent"
              value={formatCurrency(overviewMetrics.spend)}
              change={8.2}
              icon={<DollarSign className="w-4 h-4" />}
              expandDirection="top"
              details={[
                { label: 'Daily avg', value: formatCurrency(overviewMetrics.spend / 14) },
                { label: 'Budget utilization', value: '78%' },
              ]}
            />
            <MetricCard
              title="Impressions"
              value={formatNumber(overviewMetrics.impressions)}
              change={12.5}
              icon={<Eye className="w-4 h-4" />}
              expandDirection="top"
              details={[
                { label: 'CPM', value: `Rp ${overviewMetrics.cpm.toLocaleString('id-ID')}` },
                { label: 'Frequency', value: `${overviewMetrics.frequency}x` },
              ]}
            />
            <MetricCard
              title="Link Clicks"
              value={formatNumber(overviewMetrics.inline_link_clicks)}
              change={5.8}
              icon={<MousePointerClick className="w-4 h-4" />}
              expandDirection="top"
              details={[
                { label: 'All clicks', value: formatNumber(overviewMetrics.clicks) },
                { label: 'CTR (link)', value: `${overviewMetrics.ctr}%` },
              ]}
            />
            <MetricCard
              title="Purchase ROAS"
              value={`${overviewMetrics.purchase_roas}x`}
              change={15.3}
              icon={<TrendingUp className="w-4 h-4" />}
              expandDirection="top"
              details={[
                { label: 'Revenue', value: formatCurrency(overviewMetrics.spend * overviewMetrics.purchase_roas) },
                { label: 'vs industry avg', value: '2.9x (+31%)' },
              ]}
            />
          </div>

          {/* Metric Cards - Row 2 (expand BOTTOM) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <MetricCard
              title="Reach"
              value={formatNumber(overviewMetrics.reach)}
              change={9.1}
              icon={<Users className="w-4 h-4" />}
              expandDirection="bottom"
              details={[
                { label: 'CPP', value: `Rp ${overviewMetrics.cpp.toLocaleString('id-ID')}` },
                { label: 'Reach rate', value: '66.7%' },
              ]}
            />
            <MetricCard
              title="Results (Conversions)"
              value={formatNumber(overviewMetrics.conversions)}
              change={18.7}
              icon={<Target className="w-4 h-4" />}
              expandDirection="bottom"
              details={[
                { label: 'Cost/result', value: formatCurrency(overviewMetrics.cost_per_result) },
                { label: 'Conv. rate', value: `${overviewMetrics.conversion_rate}%` },
              ]}
            />
            <MetricCard
              title="Link CTR"
              value={`${overviewMetrics.ctr}%`}
              change={3.2}
              icon={<Zap className="w-4 h-4" />}
              expandDirection="bottom"
              details={[
                { label: 'CPC (link)', value: `Rp ${overviewMetrics.cpc.toLocaleString('id-ID')}` },
                { label: 'vs industry', value: '1.80% (↑ 36%)' },
              ]}
            />
            <MetricCard
              title="Opportunity Score"
              value={`${opportunityScore.score}/100`}
              icon={<Award className="w-4 h-4" />}
              expandDirection="bottom"
              details={[
                { label: 'Recommendations', value: `${opportunityScore.recommendations.length} items` },
                { label: 'High impact', value: `${opportunityScore.recommendations.filter(r => r.impact === 'HIGH').length}` },
              ]}
            />
          </div>

          {/* Opportunity & Anomaly Panel */}
          <OpportunityPanel />

          {/* Performance Chart */}
          <PerformanceChart />

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <WeeklyTrendChart />
            <AudienceChart />
          </div>

          {/* Placements Breakdown */}
          <PlacementsBreakdown />

          {/* Platform + Campaign Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <CampaignTable />
            </div>
            <div>
              <PlatformChart />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-3 border-t border-gray-100 dark:border-gray-700">
            <p className="text-[10px] text-gray-400 dark:text-gray-500">
              Powered by Meta Ads MCP Server (mcp.facebook.com/ads) • Tools: ads_get_ad_entities, ads_insights_performance_trend, ads_get_opportunity_score, ads_insights_anomaly_signal • Last sync: 20 Jan 2026, 14:30 WIB
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
