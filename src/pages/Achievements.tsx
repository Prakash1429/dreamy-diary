import React from 'react';
import { Award, Lock, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { ACHIEVEMENT_DEFINITIONS } from '../utils/achievements';

export const Achievements: React.FC = () => {
  const { user } = useAuth();

  const unlockedAchievements = useLiveQuery(
    () => (user ? db.achievements.where('userId').equals(user.id).toArray() : []),
    [user?.id]
  ) || [];

  const unlockedCodes = new Set(unlockedAchievements.map(a => a.code));
  const totalCount = ACHIEVEMENT_DEFINITIONS.length;
  const unlockedCount = unlockedCodes.size;

  const triggerBadgeConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6 pb-12">
      
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Gamified Milestones</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 dark:text-white">
            Journey Achievements ✨
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Celebrate every milestone as you turn your dreams into lifelong memories.
          </p>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-heading font-bold text-center shadow-md">
          <p className="text-2xl">{unlockedCount} / {totalCount}</p>
          <p className="text-[10px] text-rose-100 uppercase tracking-wider font-sans">Badges Unlocked</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENT_DEFINITIONS.map((def) => {
          const isUnlocked = unlockedCodes.has(def.code);
          const unlockedItem = unlockedAchievements.find(a => a.code === def.code);

          return (
            <div
              key={def.code}
              onClick={() => { if (isUnlocked) triggerBadgeConfetti(); }}
              className={`p-6 rounded-3xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-900/60 shadow-md hover:scale-[1.02] cursor-pointer'
                  : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-70 grayscale-[0.4]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${
                    isUnlocked 
                      ? 'bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 text-white' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {def.icon}
                  </div>

                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-500">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold font-serif-title text-slate-900 dark:text-white">
                    {def.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                    {def.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-semibold flex items-center justify-between">
                <span>Milestone Badge</span>
                {isUnlocked && unlockedItem && (
                  <span className="text-rose-500 dark:text-rose-400">
                    Unlocked {new Date(unlockedItem.unlockedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
