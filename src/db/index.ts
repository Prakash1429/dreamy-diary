import Dexie, { type Table } from 'dexie';
import type { 
  WishlistItem, 
  MemoryItem, 
  UserProfile, 
  AchievementItem, 
  HistoryItem, 
  HistoryCategory, 
  HistoryStatus,
  CollaborationRoom
} from '../types';

export class DreamyDiaryDatabase extends Dexie {
  users!: Table<UserProfile, string>;
  wishlist!: Table<WishlistItem, string>;
  memories!: Table<MemoryItem, string>;
  achievements!: Table<AchievementItem, string>;
  history!: Table<HistoryItem, string>;
  collaborations!: Table<CollaborationRoom, string>;

  constructor() {
    super('DreamyDiaryDB');
    this.version(1).stores({
      users: 'id, email',
      wishlist: 'id, userId, category, priority, status, createdAt',
      memories: 'id, userId, type, category, date, isFavorite, wishlistId, createdAt',
      achievements: 'id, userId, code, unlockedAt'
    });
    this.version(2).stores({
      users: 'id, email',
      wishlist: 'id, userId, category, priority, status, createdAt',
      memories: 'id, userId, type, category, date, isFavorite, wishlistId, createdAt',
      achievements: 'id, userId, code, unlockedAt',
      history: 'id, userId, category, status, timestamp'
    });
    this.version(3).stores({
      users: 'id, email',
      wishlist: 'id, userId, category, priority, status, createdAt',
      memories: 'id, userId, type, category, date, isFavorite, wishlistId, createdAt',
      achievements: 'id, userId, code, unlockedAt',
      history: 'id, userId, category, status, timestamp',
      collaborations: 'id, ownerUserId, inviteCode, category, createdAt'
    });
  }
}

export const db = new DreamyDiaryDatabase();

export const logHistory = async (entry: {
  userId?: string;
  category: HistoryCategory;
  action: string;
  status: HistoryStatus;
  title: string;
  details: string;
  icon?: string;
}) => {
  try {
    const activeUserId = entry.userId || localStorage.getItem('dreamy_active_user_id') || 'guest';
    const item: HistoryItem = {
      id: 'hist_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      userId: activeUserId,
      category: entry.category,
      action: entry.action,
      status: entry.status,
      title: entry.title,
      details: entry.details,
      icon: entry.icon || (entry.status === 'success' ? '✅' : '❌'),
      timestamp: new Date().toISOString(),
    };
    await db.history.add(item);
  } catch (err) {
    console.error('Failed to log history item:', err);
  }
};

// Default user template when first creating profile (NO PRE-ADDED DREAMS OR MEMORIES)
export const DEFAULT_USER: UserProfile = {
  id: 'user_default',
  name: 'Dreamer',
  email: '',
  avatar: '✨',
  bio: 'Collect Dreams. Live Moments. Keep Memories. ✨',
  createdAt: new Date().toISOString(),
};

// Ensure default user exists if no users are registered
export const seedDatabase = async () => {
  const userCount = await db.users.count();
  if (userCount === 0) {
    await db.users.add(DEFAULT_USER);
  }
};

