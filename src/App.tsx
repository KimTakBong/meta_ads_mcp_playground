import { useState } from 'react';
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
  Smartphone,
  Zap,
  Award,
} from 'lucide-react';
import MetricCard from './components/MetricCard';
import PerformanceChart from './components/PerformanceChart';
import CampaignTable from './components/CampaignTable';
import AudienceChart, { PlatformChart } from './components/AudienceChart';
import WeeklyTrendChart from './components/WeeklyTrendChart';
import PlacementsBreakdown from './components/PlacementsBreakdown';
import { overviewMetrics } from './data/mockData';

export default function App() {
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');

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
    <div className="min-h-screen bg-gray-50/50 flex">
      {/* Sidebar - Collapsed by default, expand on hover */}
      <aside
        className={`${
          sidebarHovered ? 'w-56' : 'w-16'
        } bg-white border-r border-gray-200 flex flex-col transition-all duration-300 fixed h-full z-30 group/sidebar`}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200 flex-shrink-0">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${sidebarHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
              <h1 className="font-bold text-gray-900 text-sm">Meta Ads</h1>
              <p className="text-[10px] text-gray-500">Performance Monitor</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeNav === item.id
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${sidebarHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t border-gray-100 space-y-1">
          <button className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">
            <HelpCircle className="w-5 h-5 flex-shrink-0" />
            <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${sidebarHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
              Help Center
            </span>
          </button>
          <button className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${sidebarHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
              Settings
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ml-16 transition-all duration-300`}>
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari campaign, audience, atau metrics..."
                  className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm w-80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">07 Jan - 20 Jan 2026</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-purple-200">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Page Title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
              <p className="text-sm text-gray-500 mt-1">
                Pantau performa iklan Meta (Facebook & Instagram) secara real-time
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
                <FileText className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>

          {/* Metric Cards - Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Amount Spent"
              value={formatCurrency(overviewMetrics.totalSpend)}
              change={8.2}
              icon={<DollarSign className="w-4 h-4" />}
              subtitle="Total budget terpakai"
            />
            <MetricCard
              title="Impressions"
              value={formatNumber(overviewMetrics.totalImpressions)}
              change={12.5}
              icon={<Eye className="w-4 h-4" />}
              subtitle="Total tayangan iklan"
            />
            <MetricCard
              title="Link Clicks"
              value={formatNumber(overviewMetrics.totalLinkClicks)}
              change={5.8}
              icon={<MousePointerClick className="w-4 h-4" />}
              subtitle={`${formatNumber(overviewMetrics.totalAllClicks)} all clicks`}
            />
            <MetricCard
              title="ROAS"
              value={`${overviewMetrics.roas}x`}
              change={15.3}
              icon={<TrendingUp className="w-4 h-4" />}
              subtitle="Return on Ad Spend"
            />
          </div>

          {/* Metric Cards - Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Reach"
              value={formatNumber(overviewMetrics.totalReach)}
              change={9.1}
              icon={<Users className="w-4 h-4" />}
              subtitle={`Frequency: ${overviewMetrics.frequency}x`}
            />
            <MetricCard
              title="Results (Conversions)"
              value={formatNumber(overviewMetrics.totalResults)}
              change={18.7}
              icon={<Target className="w-4 h-4" />}
              subtitle={`Cost/result: Rp ${overviewMetrics.avgCostPerResult.toLocaleString('id-ID')}`}
            />
            <MetricCard
              title="Link CTR"
              value={`${overviewMetrics.avgCTR}%`}
              change={3.2}
              icon={<Zap className="w-4 h-4" />}
              subtitle={`All CTR: ${overviewMetrics.avgAllCTR}%`}
            />
            <MetricCard
              title="CPC (Link Click)"
              value={`Rp ${overviewMetrics.avgCPC.toLocaleString('id-ID')}`}
              change={-4.5}
              icon={<DollarSign className="w-4 h-4" />}
              subtitle={`CPM: Rp ${overviewMetrics.avgCPM.toLocaleString('id-ID')}`}
            />
          </div>

          {/* Performance Chart */}
          <PerformanceChart />

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WeeklyTrendChart />
            <AudienceChart />
          </div>

          {/* Placements Breakdown */}
          <PlacementsBreakdown />

          {/* Platform + Campaign Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CampaignTable />
            </div>
            <div>
              <PlatformChart />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Meta Ads Dashboard © 2026 • Data disinkronkan dari Meta Marketing API • Last sync: 20 Jan 2026, 14:30 WIB
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
