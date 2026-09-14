import React, { useState } from 'react';
import { Sparkles, Compass, Plus, Menu, Calendar, MapPin, Award, Settings, User, History as HistoryIcon, Users } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAddMemory: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenAddMemory
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setShowMoreMenu(false);
  };

  return (
    <>
      {/* More Options Drawer Overlay */}
      {showMoreMenu && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={() => setShowMoreMenu(false)}
        >
          <div 
            className="fixed bottom-20 right-4 w-56 bg-white dark:bg-slate-900 rounded-3xl p-3 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-1 animate-in fade-in slide-in-from-bottom-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => handleSelectTab('recommend')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Recommend Chennai 🧭</span>
            </button>

            <button
              onClick={() => handleSelectTab('collaboration')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Users className="w-4 h-4 text-purple-500" />
              <span>Collab Albums 👥</span>
            </button>

            <button
              onClick={() => handleSelectTab('timeline')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Calendar className="w-4 h-4 text-rose-500" />
              <span>Timeline</span>
            </button>

            <button
              onClick={() => handleSelectTab('history')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
            >
              <HistoryIcon className="w-4 h-4 text-emerald-500" />
              <span>History Logs</span>
            </button>

            <button
              onClick={() => handleSelectTab('map')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
            >
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Memory Map</span>
            </button>

            <button
              onClick={() => handleSelectTab('achievements')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Award className="w-4 h-4 text-purple-500" />
              <span>Achievements</span>
            </button>

            <button
              onClick={() => handleSelectTab('profile')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
            >
              <User className="w-4 h-4 text-blue-500" />
              <span>Profile</span>
            </button>

            <button
              onClick={() => handleSelectTab('settings')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom Nav Bar */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 lg:hidden w-[92%] max-w-md">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-rose-100/80 dark:border-slate-800/80 rounded-full px-4 py-2 shadow-xl shadow-slate-900/10 flex items-center justify-between">
          
          <button
            onClick={() => handleSelectTab('dashboard')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
              activeTab === 'dashboard' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span>Home</span>
          </button>

          {/* Prominent Glowing Center Button */}
          <button
            onClick={onOpenAddMemory}
            className="-mt-5 w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/40 active:scale-90 transition-transform"
            title="Add New Memory"
          >
            <Plus className="w-7 h-7 stroke-[2.5]" />
          </button>

          <button
            onClick={() => handleSelectTab('journey')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
              activeTab === 'journey' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span>Journey</span>
          </button>

          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
              showMoreMenu ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            <Menu className="w-5 h-5" />
            <span>More</span>
          </button>

        </div>
      </div>
    </>
  );
};
