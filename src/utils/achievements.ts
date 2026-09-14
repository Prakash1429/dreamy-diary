export interface AchievementDefinition {
  code: string;
  title: string;
  description: string;
  icon: string;
  check: (stats: { totalMemories: number; completedDreams: number; totalDreams: number; categoryCounts: Record<string, number> }) => boolean;
}

export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  {
    code: 'first_memory',
    title: 'First Memory Captured 📸',
    description: 'Preserved your very first special moment.',
    icon: '📸',
    check: ({ totalMemories }) => totalMemories >= 1,
  },
  {
    code: 'memories_5',
    title: 'Memory Enthusiast 🌟',
    description: 'Captured 5 beautiful life experiences.',
    icon: '🌟',
    check: ({ totalMemories }) => totalMemories >= 5,
  },
  {
    code: 'memories_10',
    title: 'Memory Collector 🔟',
    description: 'Captured 10 beautiful life experiences.',
    icon: '🔟',
    check: ({ totalMemories }) => totalMemories >= 10,
  },
  {
    code: 'explorer',
    title: 'Curious Explorer 🧳',
    description: 'Logged memories in at least 3 different categories.',
    icon: '🧳',
    check: ({ categoryCounts }) => Object.keys(categoryCounts).length >= 3,
  },
  {
    code: 'temple_lover',
    title: 'Spiritual Soul 🛕',
    description: 'Visited and recorded a temple or spiritual sanctuary experience.',
    icon: '🛕',
    check: ({ categoryCounts }) => (categoryCounts['Temples'] || 0) >= 1,
  },
  {
    code: 'museum_explorer',
    title: 'Culture Seeker 🏛️',
    description: 'Explored a museum or cultural exhibit.',
    icon: '🏛️',
    check: ({ categoryCounts }) => (categoryCounts['Museums'] || 0) >= 1,
  },
  {
    code: 'travel_lover',
    title: 'Wanderlust Lover 🌍',
    description: 'Recorded 3 or more travel adventures.',
    icon: '🌍',
    check: ({ categoryCounts }) => (categoryCounts['Travel'] || 0) >= 3,
  },
  {
    code: 'memories_25',
    title: 'Master Memory Keeper 🏆',
    description: 'Saved 25 precious memory moments.',
    icon: '🏆',
    check: ({ totalMemories }) => totalMemories >= 25,
  }
];
