import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { AuthModal } from './components/AuthModal';
import { MemoryModal } from './components/MemoryModal';
import { MemoryDetailModal } from './components/MemoryDetailModal';

import { Dashboard } from './pages/Dashboard';
import { Journey } from './pages/Journey';
import { Timeline } from './pages/Timeline';
import { Favorites } from './pages/Favorites';
import { RandomMemory } from './pages/RandomMemory';
import { Achievements } from './pages/Achievements';
import { Profile } from './pages/Profile';
import { SettingsPage } from './pages/Settings';
import { HistoryPage } from './pages/History';
import { CollaborationPage } from './pages/Collaboration';
import { RecommendPage } from './pages/Recommend';
import { MapView } from './components/MapView';

import type { MemoryItem, CategoryType } from './types';
import type { ChennaiPlace } from './data/chennaiPlaces';
import { db } from './db';
import { useLiveQuery } from 'dexie-react-hooks';

import { AuthScreen } from './components/AuthScreen';

const MainAppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  
  // Check URL search parameters for incoming invite links (e.g. ?inviteCode=COLLAB-84920)
  const urlParams = new URLSearchParams(window.location.search);
  const urlInviteCode = urlParams.get('inviteCode');

  const [activeTab, setActiveTab] = useState<string>(urlInviteCode ? 'collaboration' : 'dashboard');
  const [initialInviteCode, setInitialInviteCode] = useState<string | null>(urlInviteCode);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [memoryToEdit, setMemoryToEdit] = useState<MemoryItem | null>(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

  const memoriesList = useLiveQuery(
    () => (user ? db.memories.where('userId').equals(user.id).toArray() : []),
    [user?.id]
  ) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-app)] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-400 to-amber-300 mx-auto flex items-center justify-center text-2xl animate-spin">
            ✨
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Loading your Dreamy Diary...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onSuccess={() => setActiveTab('profile')} />;
  }

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setActiveTab('profile');
    setIsAuthModalOpen(false);
  };

  const handleOpenAddMemory = () => {
    setMemoryToEdit(null);
    setIsMemoryModalOpen(true);
  };

  const handleOpenAddMemoryWithPlace = (place: ChennaiPlace) => {
    const getCategoryForPlace = (cat: string): CategoryType => {
      if (cat.includes('Beach')) return 'Travel';
      if (cat.includes('Temple') || cat.includes('Church') || cat.includes('Mosque')) return 'Temples';
      if (cat.includes('Museum') || cat.includes('Heritage')) return 'Museums';
      if (cat.includes('Shopping')) return 'Experiences';
      return 'Experiences';
    };

    setMemoryToEdit({
      id: '',
      userId: user?.id || '',
      type: 'beautiful_moment',
      title: `Visiting ${place.name}`,
      date: new Date().toISOString().split('T')[0],
      location: `${place.area}, Chennai`,
      category: getCategoryForPlace(place.category),
      photos: [],
      description: place.description,
      quote: place.famousFor[0] ? `Famous for ${place.famousFor[0]}` : undefined,
      tags: [place.area, place.entryType],
      isFavorite: false,
      createdAt: new Date().toISOString(),
    });
    setIsMemoryModalOpen(true);
  };

  const handleEditMemory = (memory: MemoryItem) => {
    setMemoryToEdit(memory);
    setIsMemoryModalOpen(true);
  };

  const handleSelectMemory = (memory: MemoryItem) => {
    setSelectedMemory(memory);
    setIsDetailModalOpen(true);
  };

  const handleToggleFavorite = async (memoryId: string, currentFav: boolean) => {
    await db.memories.update(memoryId, { isFavorite: !currentFav });
    if (selectedMemory && selectedMemory.id === memoryId) {
      setSelectedMemory(prev => prev ? { ...prev, isFavorite: !currentFav } : null);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-main)] flex flex-col font-sans transition-colors duration-300 overflow-x-hidden">
      
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddMemory={handleOpenAddMemory}
        onOpenAuth={handleOpenAuth}
      />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 lg:pb-12">
        {activeTab === 'dashboard' && (
          <Dashboard
            setActiveTab={setActiveTab}
            onOpenAddMemory={handleOpenAddMemory}
            onSelectMemory={handleSelectMemory}
          />
        )}

        {activeTab === 'recommend' && (
          <RecommendPage
            onOpenAddMemoryWithPlace={handleOpenAddMemoryWithPlace}
          />
        )}

        {activeTab === 'journey' && (
          <Journey
            onOpenAddMemory={handleOpenAddMemory}
            onSelectMemory={handleSelectMemory}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activeTab === 'timeline' && (
          <Timeline onSelectMemory={handleSelectMemory} />
        )}

        {activeTab === 'favorites' && (
          <Favorites
            onSelectMemory={handleSelectMemory}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activeTab === 'random' && (
          <RandomMemory onSelectMemory={handleSelectMemory} />
        )}

        {activeTab === 'map' && (
          <MapView
            memories={memoriesList}
            onSelectMemory={handleSelectMemory}
          />
        )}

        {activeTab === 'history' && <HistoryPage />}

        {activeTab === 'collaboration' && (
          <CollaborationPage
            initialInviteCode={initialInviteCode}
            onClearInitialInviteCode={() => setInitialInviteCode(null)}
          />
        )}

        {activeTab === 'achievements' && <Achievements />}

        {activeTab === 'profile' && (
          <Profile onOpenAuthModal={() => handleOpenAuth('signin')} />
        )}

        {activeTab === 'settings' && <SettingsPage />}
      </main>

      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddMemory={handleOpenAddMemory}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
      />

      <MemoryModal
        isOpen={isMemoryModalOpen}
        onClose={() => setIsMemoryModalOpen(false)}
        memoryToEdit={memoryToEdit}
      />

      <MemoryDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        memory={selectedMemory}
        onEdit={handleEditMemory}
        onDeleted={() => setSelectedMemory(null)}
        onToggleFavorite={handleToggleFavorite}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
