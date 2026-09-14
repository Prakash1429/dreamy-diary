import React from 'react';
import { 
  Sparkles, 
  Compass, 
  Calendar, 
  Award, 
  MapPin, 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  BookOpen, 
  History as HistoryIcon,
  Users
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAddMemory: () => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab
}) => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Sparkles },
    { id: 'recommend', label: 'Recommend', icon: Compass },
    { id: 'journey', label: 'Journey', icon: Compass },
    { id: 'collaboration', label: 'Collab', icon: Users },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'favorites', label: 'Favorites', icon: BookOpen },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'history', label: 'History', icon: HistoryIcon },
    { id: 'achievements', label: 'Badges', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/85 dark:bg-slate-900/85 border-b border-rose-100/60 dark:border-slate-800/80 transition-colors">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        
        {/* Brand Logo & Title */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-2 cursor-pointer group select-none shrink-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 shadow-md shadow-rose-200/50 dark:shadow-none group-hover:scale-105 transition-transform duration-300 shrink-0 overflow-hidden bg-white border border-rose-200/60 dark:border-slate-700">
            <img src="/logo.jpg" alt="Dreamy Diary Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="shrink-0">
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 dark:from-rose-400 dark:via-purple-300 dark:to-amber-300 bg-clip-text text-transparent tracking-tight font-heading whitespace-nowrap">
              Dreamy Diary
            </h1>
            <p className="text-[9px] text-slate-500 dark:text-slate-400 hidden xl:block -mt-1 font-sans whitespace-nowrap">
              Dream it. Live it. Remember it.
            </p>
          </div>
        </div>

        {/* Desktop & Laptop Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5 bg-slate-100/70 dark:bg-slate-800/60 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shrink-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-500' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Controls & Sign In / Account */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Settings */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`p-1.5 sm:p-2 rounded-xl transition-colors shrink-0 ${
              activeTab === 'settings' 
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>



        </div>

      </div>
    </header>
  );
};
