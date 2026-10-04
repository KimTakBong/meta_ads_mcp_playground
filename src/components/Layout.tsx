import { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3, Search, Calendar, ChevronDown, Bell, Moon, Sun,
  LayoutDashboard, Megaphone, Settings, HelpCircle, Layers, Square,
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/campaigns', label: 'Campaigns', icon: Megaphone },
    { path: '/adsets', label: 'Ad Sets', icon: Layers },
    { path: '/ads', label: 'Ads', icon: Square },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarHovered ? 'w-52' : 'w-14'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 fixed h-full z-30`}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        <div className="p-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${sidebarHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
              <h1 className="font-bold text-gray-900 dark:text-gray-100 text-xs">Meta Ads</h1>
              <p className="text-[9px] text-gray-500 dark:text-gray-400">MCP Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-1.5 space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive(item.path)
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap text-xs ${sidebarHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="p-1.5 border-t border-gray-100 dark:border-gray-700 space-y-0.5">
          <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            <HelpCircle className="w-4 h-4 flex-shrink-0" />
            <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap text-xs ${sidebarHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>Help</span>
          </button>
          <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            <Settings className="w-4 h-4 flex-shrink-0" />
            <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap text-xs ${sidebarHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-14 transition-all duration-300">
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
          <div className="flex items-center justify-between px-5 py-3">
            <div className="relative hidden md:block">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs w-64 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-gray-600" />}
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs text-gray-600 dark:text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">07 - 20 Jan 2026</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
                <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold">A</div>
            </div>
          </div>
        </header>

        <div className="p-5">{children}</div>
      </main>
    </div>
  );
}
