import React, { useState, useEffect } from 'react';
import { Award, Edit3, Check, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../db';
import type { MemoryItem, AchievementItem } from '../types';

interface ProfileProps {
  onOpenAuthModal: () => void;
}

const AVATARS = ['✨', '🌟', '📸', '💖', '🧳', '🎨', '🏖️', '🌸', '☕', '🚀'];

export const Profile: React.FC<ProfileProps> = ({ onOpenAuthModal }) => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '✨');

  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setBio(user.bio);
    setAvatar(user.avatar);

    const loadData = async () => {
      const memData = await db.memories.where('userId').equals(user.id).toArray();
      const achData = await db.achievements.where('userId').equals(user.id).toArray();
      setMemories(memData);
      setAchievements(achData);
    };
    loadData();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!name.trim()) return;
    await updateProfile({ name: name.trim(), bio: bio.trim(), avatar });
    setIsEditing(false);
  };

  const totalMemories = memories.length;
  const favoriteMemoriesCount = memories.filter(m => m.isFavorite).length;

  const categoryCounts: Record<string, number> = {};
  memories.forEach(m => {
    categoryCounts[m.category] = (categoryCounts[m.category] || 0) + 1;
  });
  let favoriteCategory = 'None yet';
  let maxCount = 0;
  Object.entries(categoryCounts).forEach(([cat, count]) => {
    if (count > maxCount) {
      maxCount = count;
      favoriteCategory = cat;
    }
  });

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-rose-100 dark:border-slate-800 shadow-sm relative space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 p-1 shadow-lg shadow-rose-200/50 shrink-0">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[22px] flex items-center justify-center text-4xl">
              {isEditing ? avatar : user?.avatar}
            </div>
          </div>

          <div className="space-y-2 flex-1">
            {!isEditing ? (
              <>
                <h1 className="text-3xl font-bold font-serif-title text-slate-900 dark:text-white">
                  {user?.name}
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-sans max-w-lg">
                  "{user?.bio}"
                </p>
                <p className="text-xs text-slate-400">
                  Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}
                </p>
              </>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Bio</label>
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Choose Avatar</label>
                  <div className="flex flex-wrap gap-1.5">
                    {AVATARS.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => setAvatar(a)}
                        className={`w-8 h-8 rounded-xl text-base flex items-center justify-center transition-all ${
                          avatar === a ? 'bg-rose-500 text-white scale-110 shadow-xs' : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Edit3 className="w-4 h-4" /> Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 rounded-2xl bg-rose-500 text-white text-xs font-bold shadow-md hover:bg-rose-600 transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Save Changes
              </button>
            )}

            <button
              onClick={onOpenAuthModal}
              className="px-4 py-2 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" /> Switch Profile
            </button>
          </div>

        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs text-center space-y-1">
          <span className="text-2xl">📸</span>
          <p className="text-2xl font-bold font-heading text-rose-600 dark:text-rose-400">{totalMemories}</p>
          <p className="text-xs text-slate-400">Total Memories</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs text-center space-y-1">
          <span className="text-2xl">💖</span>
          <p className="text-2xl font-bold font-heading text-purple-600 dark:text-purple-400">{favoriteMemoriesCount}</p>
          <p className="text-xs text-slate-400">Favorite Memories</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs text-center space-y-1">
          <span className="text-2xl">🌍</span>
          <p className="text-sm font-bold font-heading text-amber-600 dark:text-amber-400 truncate">{favoriteCategory}</p>
          <p className="text-xs text-slate-400">Top Category</p>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-lg font-bold font-serif-title text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-500" />
          <span>Unlocked Achievements ({achievements.length})</span>
        </h3>

        {achievements.length === 0 ? (
          <p className="text-xs text-slate-400">No achievements unlocked yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {achievements.map((ach) => (
              <div key={ach.id} className="p-3 rounded-2xl bg-rose-50/60 dark:bg-slate-800/60 border border-rose-100 dark:border-slate-700 text-center space-y-1">
                <span className="text-3xl block">{ach.icon}</span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{ach.title}</h4>
                <p className="text-[9px] text-slate-400">{new Date(ach.unlockedAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
