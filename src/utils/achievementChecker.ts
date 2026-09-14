import { db } from '../db';
import { ACHIEVEMENT_DEFINITIONS } from './achievements';
import confetti from 'canvas-confetti';

export const checkAndUnlockAchievements = async (userId: string) => {
  try {
    const memories = await db.memories.where('userId').equals(userId).toArray();
    const existingAchievements = await db.achievements.where('userId').equals(userId).toArray();
    const unlockedCodes = new Set(existingAchievements.map(a => a.code));

    const completedDreams = 0;
    const totalDreams = 0;
    const totalMemories = memories.length;

    const categoryCounts: Record<string, number> = {};
    memories.forEach(m => {
      categoryCounts[m.category] = (categoryCounts[m.category] || 0) + 1;
    });

    const stats = { totalMemories, completedDreams, totalDreams, categoryCounts };

    for (const def of ACHIEVEMENT_DEFINITIONS) {
      if (!unlockedCodes.has(def.code) && def.check(stats)) {
        // Unlock new achievement
        await db.achievements.add({
          id: 'ach_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
          userId,
          code: def.code,
          title: def.title,
          description: def.description,
          icon: def.icon,
          unlockedAt: new Date().toISOString()
        });

        // Trigger celebratory confetti burst!
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    }
  } catch (err) {
    console.error('Error checking achievements:', err);
  }
};
