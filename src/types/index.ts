export type WishlistStatus = 'dreaming' | 'planned' | 'in-progress' | 'completed';
export type WishlistPriority = 'low' | 'medium' | 'high';
export type MemoryType = 'dream_completed' | 'beautiful_moment';

export type CategoryType = 
  | 'Travel'
  | 'Food'
  | 'Adventure'
  | 'Temples'
  | 'Museums'
  | 'Personal Goals'
  | 'Experiences'
  | 'Entertainment'
  | 'Events'
  | 'Other';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  password?: string;
  avatar: string;
  bio: string;
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  title: string;
  category: CategoryType;
  description: string;
  location?: string;
  lat?: number;
  lng?: number;
  targetDate?: string;
  priority: WishlistPriority;
  status: WishlistStatus;
  coverImage?: string;
  createdAt: string;
  completedAt?: string;
  memoryId?: string;
}

export interface MemoryItem {
  id: string;
  userId: string;
  wishlistId?: string;
  type: MemoryType;
  title: string;
  date: string;
  location?: string;
  category: CategoryType;
  photos: string[]; // Base64 data URLs or Blob URLs
  description: string;
  thoughts?: string;
  feelings?: string[]; // e.g. ['Joyful', 'Nostalgic', 'Serene']
  weather?: string; // e.g. '☀️ Sunny', '🌅 Sunset', '🌧️ Rainy', '🍃 Breezy'
  quote?: string;
  tags?: string[];
  notes?: string;
  isFavorite: boolean;
  lat?: number;
  lng?: number;
  createdAt: string;
}

export interface AchievementItem {
  id: string;
  userId: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface MotivationalQuote {
  quote: string;
  author: string;
}

export type HistoryStatus = 'success' | 'fail';
export type HistoryCategory = 'auth' | 'wishlist' | 'memory' | 'system';

export interface HistoryItem {
  id: string;
  userId: string;
  category: HistoryCategory;
  action: string;
  status: HistoryStatus;
  title: string;
  details: string;
  icon?: string;
  timestamp: string;
}

export interface CollaboratorMember {
  userId: string;
  name: string;
  avatar: string;
  role: 'owner' | 'collaborator';
  joinedAt: string;
}

export interface SharedPhoto {
  id: string;
  photoUrl: string;
  photos?: string[];
  title: string;
  addedByUserId: string;
  addedByName: string;
  addedByAvatar: string;
  addedAt: string;
}

export interface CollaborationRoom {
  id: string;
  ownerUserId: string;
  ownerName: string;
  title: string;
  description: string;
  category: CategoryType;
  coverPhoto?: string;
  inviteCode: string;
  members: CollaboratorMember[];
  sharedPhotos: SharedPhoto[];
  createdAt: string;
}

