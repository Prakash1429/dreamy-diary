import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  Camera, 
  X, 
  ArrowLeft, 
  UserPlus, 
  Layers, 
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db, logHistory } from '../db';
import type { CollaborationRoom, CategoryType, SharedPhoto } from '../types';
import { FannedPhotoDeck } from '../components/FannedPhotoDeck';
import { PhotoLightbox } from '../components/PhotoLightbox';

const CATEGORIES: CategoryType[] = [
  'Travel', 'Food', 'Adventure', 'Temples', 'Museums',
  'Personal Goals', 'Experiences', 'Entertainment', 'Events', 'Other'
];

interface CollaborationProps {
  initialInviteCode?: string | null;
  onClearInitialInviteCode?: () => void;
}

export const CollaborationPage: React.FC<CollaborationProps> = ({
  initialInviteCode,
  onClearInitialInviteCode
}) => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<CollaborationRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<CollaborationRoom | null>(null);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<CollaborationRoom | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isAddPhotoModalOpen, setIsAddPhotoModalOpen] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CategoryType>('Travel');
  const [newDescription, setNewDescription] = useState('');
  const [newCoverPhoto, setNewCoverPhoto] = useState('');
  
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [joinError, setJoinError] = useState('');
  
  // Shared photo upload form
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  // Lightbox
  const [activeLightboxPhotos, setActiveLightboxPhotos] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Copy state
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedInsta, setCopiedInsta] = useState(false);

  // Load collaboration rooms
  const loadRooms = async () => {
    if (!user) return;
    try {
      const allRooms = await db.collaborations.toArray();
      // Filter rooms where user is owner or member
      const userRooms = allRooms.filter(r => 
        r.ownerUserId === user.id || 
        r.members.some(m => m.userId === user.id)
      ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setRooms(userRooms);
      
      // Update selected room if active
      if (selectedRoom) {
        const updated = userRooms.find(r => r.id === selectedRoom.id);
        if (updated) setSelectedRoom(updated);
      }
    } catch (err) {
      console.error('Failed to load collaboration rooms:', err);
    }
  };

  useEffect(() => {
    loadRooms();
  }, [user]);

  // Handle auto join from URL parameter inviteCode
  useEffect(() => {
    if (initialInviteCode && user) {
      handleJoinByCode(initialInviteCode);
      if (onClearInitialInviteCode) onClearInitialInviteCode();
    }
  }, [initialInviteCode, user]);

  // Generate Invite Code (e.g. COLLAB-8492)
  const generateInviteCode = () => {
    const num = Math.floor(10000 + Math.random() * 90000);
    return `COLLAB-${num}`;
  };

  // Handle Create Room
  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newTitle.trim()) return;

    const inviteCode = generateInviteCode();
    const newRoom: CollaborationRoom = {
      id: 'collab_' + Date.now(),
      ownerUserId: user.id,
      ownerName: user.name,
      title: newTitle.trim(),
      description: newDescription.trim(),
      category: newCategory,
      coverPhoto: newCoverPhoto || undefined,
      inviteCode,
      members: [
        {
          userId: user.id,
          name: user.name,
          avatar: user.avatar || '✨',
          role: 'owner',
          joinedAt: new Date().toISOString()
        }
      ],
      sharedPhotos: [],
      createdAt: new Date().toISOString()
    };

    await db.collaborations.add(newRoom);
    await logHistory({
      category: 'system',
      action: 'create_collab',
      status: 'success',
      title: 'Created Collaboration Room',
      details: `Created new shared album "${newTitle}" with invite code ${inviteCode}.`,
      icon: '👥'
    });

    setNewTitle('');
    setNewDescription('');
    setNewCoverPhoto('');
    setIsCreateModalOpen(false);
    loadRooms();
    setIsShareModalOpen(newRoom);
  };

  // Handle Join Room by Code
  const handleJoinByCode = async (codeToJoin?: string) => {
    const targetCode = (codeToJoin || joinCodeInput).trim().toUpperCase();
    setJoinError('');

    if (!user || !targetCode) return;

    try {
      const allRooms = await db.collaborations.toArray();
      const targetRoom = allRooms.find(r => r.inviteCode.toUpperCase() === targetCode);

      if (!targetRoom) {
        setJoinError(`No collaboration room found matching invite code "${targetCode}".`);
        return;
      }

      // Check if already a member
      const alreadyMember = targetRoom.members.some(m => m.userId === user.id);
      if (alreadyMember) {
        setSelectedRoom(targetRoom);
        setIsJoinModalOpen(false);
        setJoinCodeInput('');
        return;
      }

      // Add user as collaborator
      const updatedMembers = [
        ...targetRoom.members,
        {
          userId: user.id,
          name: user.name,
          avatar: user.avatar || '✨',
          role: 'collaborator' as const,
          joinedAt: new Date().toISOString()
        }
      ];

      await db.collaborations.update(targetRoom.id, { members: updatedMembers });
      await logHistory({
        category: 'system',
        action: 'join_collab',
        status: 'success',
        title: 'Joined Collaboration',
        details: `Successfully joined shared album "${targetRoom.title}".`,
        icon: '🤝'
      });

      setIsJoinModalOpen(false);
      setJoinCodeInput('');
      loadRooms();
      setSelectedRoom({ ...targetRoom, members: updatedMembers });
    } catch (err) {
      console.error('Failed to join room:', err);
      setJoinError('Error joining collaboration room. Please try again.');
    }
  };

  // Handle Add Photos to Room
  const handleAddPhotoToRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedRoom || photoUrls.length === 0) return;

    const newPhoto: SharedPhoto = {
      id: 'photo_' + Date.now(),
      photoUrl: photoUrls[0],
      photos: photoUrls,
      title: photoTitle.trim() || (photoUrls.length > 1 ? `Shared Album (${photoUrls.length} Photos)` : 'Shared Moment'),
      addedByUserId: user.id,
      addedByName: user.name,
      addedByAvatar: user.avatar || '✨',
      addedAt: new Date().toISOString()
    };

    const updatedPhotos = [newPhoto, ...(selectedRoom.sharedPhotos || [])];
    await db.collaborations.update(selectedRoom.id, { sharedPhotos: updatedPhotos });

    await logHistory({
      category: 'memory',
      action: 'add_shared_photo',
      status: 'success',
      title: 'Added Photos to Shared Album',
      details: `Added ${photoUrls.length} photo(s) to collaboration "${selectedRoom.title}".`,
      icon: '📸'
    });

    setPhotoTitle('');
    setPhotoUrls([]);
    setIsAddPhotoModalOpen(false);
    loadRooms();
  };

  // Multi-Photo Upload Handler (files to Base64 array)
  const handleMultiplePhotosUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const filePromises = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises).then(newUrls => {
      setPhotoUrls(prev => [...prev, ...newUrls]);
    });
  };

  const removeSelectedPhoto = (index: number) => {
    setPhotoUrls(prev => prev.filter((_, i) => i !== index));
  };

  // Cover Photo Upload Handler (file to Base64)
  const handleCoverPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target?.result) {
        setNewCoverPhoto(evt.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Delete Room
  const handleDeleteRoom = async (roomId: string) => {
    if (confirm('Are you sure you want to delete/leave this collaboration room?')) {
      await db.collaborations.delete(roomId);
      if (selectedRoom?.id === roomId) setSelectedRoom(null);
      loadRooms();
    }
  };

  // Build Share URL & Messages
  const getShareUrl = (room: CollaborationRoom) => {
    return `${window.location.origin}/?inviteCode=${room.inviteCode}`;
  };

  const getWhatsAppShareUrl = (room: CollaborationRoom) => {
    const link = getShareUrl(room);
    const text = encodeURIComponent(
      `Hey! 🌟 Join my shared photo album "${room.title}" on Dreamy Diary ✨\n\nClick link to join & collaborate: ${link}\nOr enter Invite Code: ${room.inviteCode}`
    );
    return `https://api.whatsapp.com/send?text=${text}`;
  };

  const copyToClipboard = (text: string, type: 'code' | 'link' | 'insta') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else if (type === 'link') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else if (type === 'insta') {
      setCopiedInsta(true);
      setTimeout(() => setCopiedInsta(false), 2000);
    }
  };

  const handleNativeShare = async (room: CollaborationRoom) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join Collaboration: ${room.title}`,
          text: `Join my shared photo album "${room.title}" on Dreamy Diary ✨ Code: ${room.inviteCode}`,
          url: getShareUrl(room)
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      copyToClipboard(getShareUrl(room), 'link');
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      
      {/* Page Header / Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white">
            <Users className="w-3.5 h-3.5" />
            <span>Multi-Person Shared Scrapbooks</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif-title tracking-tight">
            Collaboration & Shared Albums 🤝
          </h1>
          <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
            Invite friends, partner, or family to collaborate on shared memories, fanned card decks, and bucket list dreams!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setIsJoinModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold border border-white/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Enter Invite Code</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-white text-rose-600 hover:bg-rose-50 text-xs font-bold shadow-lg active:scale-95 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-rose-500" />
            <span>Create Collaboration</span>
          </button>
        </div>
      </div>

      {/* Selected Room View OR Rooms Grid */}
      {selectedRoom ? (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Back Button & Room Top Header */}
          <div className="flex items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-rose-100 dark:border-slate-800 shadow-xs">
            <button
              onClick={() => setSelectedRoom(null)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Rooms</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsShareModalOpen(selectedRoom)}
                className="px-3.5 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold hover:bg-purple-200 transition-all flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Invite Friends</span>
              </button>

              <button
                onClick={() => setIsAddPhotoModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-rose-500 text-white text-xs font-bold shadow-md hover:bg-rose-600 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Add Shared Photo</span>
              </button>
            </div>
          </div>

          {/* Room Summary Header */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300">
                    {selectedRoom.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    🔑 {selectedRoom.inviteCode}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 dark:text-white">
                  {selectedRoom.title}
                </h2>
                {selectedRoom.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                    {selectedRoom.description}
                  </p>
                )}
              </div>

              {selectedRoom.ownerUserId === user?.id && (
                <button
                  onClick={() => handleDeleteRoom(selectedRoom.id)}
                  className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100 transition-colors self-start sm:self-auto"
                  title="Delete Collaboration Room"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Members Roster */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-rose-500" />
                <span>Collaborators ({selectedRoom.members.length} Active Member{selectedRoom.members.length === 1 ? '' : 's'})</span>
              </h4>

              <div className="flex flex-wrap gap-2">
                {selectedRoom.members.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    <div className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/60 flex items-center justify-center text-xs font-bold">
                      {m.avatar || '✨'}
                    </div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {m.name}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      m.role === 'owner' 
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300' 
                        : 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                    }`}>
                      {m.role === 'owner' ? '👑 Owner' : '👥 Joined'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shared Photo Album & Fanned Card Deck */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-serif-title text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-rose-500" />
                <span>Shared Photo Gallery ({selectedRoom.sharedPhotos?.length || 0} Photos)</span>
              </h3>

              <button
                onClick={() => setIsAddPhotoModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-xs font-bold hover:bg-rose-100 transition-colors flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>+ Upload Photo</span>
              </button>
            </div>

            {!selectedRoom.sharedPhotos || selectedRoom.sharedPhotos.length === 0 ? (
              <div className="p-12 text-center space-y-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 mx-auto flex items-center justify-center text-2xl">
                  📸
                </div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200">No shared photos yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Be the first collaborator to add a photo to this shared memory album!
                </p>
                <button
                  onClick={() => setIsAddPhotoModalOpen(true)}
                  className="px-4 py-2 rounded-2xl bg-rose-500 text-white text-xs font-bold shadow-md hover:bg-rose-600 inline-flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>+ Add First Photo</span>
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Fanned Deck Presentation */}
                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <FannedPhotoDeck
                    photos={selectedRoom.sharedPhotos.flatMap(p => (p.photos && p.photos.length > 0 ? p.photos : [p.photoUrl]))}
                    title={selectedRoom.title}
                    onPhotoClick={(idx) => {
                      const allPhotos = selectedRoom.sharedPhotos.flatMap(p => (p.photos && p.photos.length > 0 ? p.photos : [p.photoUrl]));
                      setActiveLightboxPhotos(allPhotos);
                      setLightboxIndex(idx);
                    }}
                  />
                </div>

                {/* Individual Contributor Cards Grid */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Contributed Photos by Members
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedRoom.sharedPhotos.map((photo, idx) => {
                      const cardPhotos = photo.photos && photo.photos.length > 0 ? photo.photos : [photo.photoUrl];
                      const singleCover = cardPhotos[0];

                      return (
                        <div
                          key={photo.id || idx}
                          onClick={() => {
                            setActiveLightboxPhotos(cardPhotos);
                            setLightboxIndex(0);
                          }}
                          className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2 group"
                        >
                          <div className="h-48 rounded-xl overflow-hidden relative bg-slate-100 dark:bg-slate-900">
                            <img
                              src={singleCover}
                              alt={photo.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            
                            <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/70 backdrop-blur-md text-white flex items-center gap-1">
                              <span>{photo.addedByAvatar}</span>
                              <span>{photo.addedByName}</span>
                            </span>

                            {cardPhotos.length > 1 && (
                              <span className="absolute top-2 right-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500 text-white shadow-md flex items-center gap-1">
                                <span>📸 {cardPhotos.length} Photos</span>
                              </span>
                            )}
                          </div>

                          <div className="space-y-1">
                            <h5 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                              {photo.title}
                            </h5>
                            <p className="text-[10px] text-slate-400">
                              Added {new Date(photo.addedAt).toLocaleDateString()} • {cardPhotos.length} photo{cardPhotos.length > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      ) : (
        /* Rooms Overview Feed */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-serif-title text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-rose-500" />
              <span>My Collaboration Rooms ({rooms.length})</span>
            </h2>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>New Collaboration</span>
            </button>
          </div>

          {rooms.length === 0 ? (
            <div className="p-12 sm:p-16 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-3xl bg-purple-50 dark:bg-purple-950/60 text-purple-500 mx-auto flex items-center justify-center text-3xl shadow-xs">
                🤝
              </div>
              <h3 className="text-2xl font-bold font-serif-title text-slate-900 dark:text-white">
                No Collaboration Rooms Yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                Create a collaboration room or enter an invite code from a friend to start sharing photos & memories together!
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-5 py-2.5 rounded-2xl bg-rose-500 text-white text-xs font-bold shadow-md hover:bg-rose-600 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Room</span>
                </button>
                <button
                  onClick={() => setIsJoinModalOpen(true)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition-all flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Join with Code</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between cursor-pointer group p-5 space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300">
                        {room.category}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                        🔑 {room.inviteCode}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold font-serif-title text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors line-clamp-1">
                        {room.title}
                      </h3>
                      {room.description && (
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                          {room.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center -space-x-2">
                      {room.members.slice(0, 4).map((m, idx) => (
                        <div
                          key={idx}
                          className="w-7 h-7 rounded-full bg-rose-200 dark:bg-rose-900 border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-bold"
                          title={m.name}
                        >
                          {m.avatar || '✨'}
                        </div>
                      ))}
                      {room.members.length > 4 && (
                        <span className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                          +{room.members.length - 4}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsShareModalOpen(room);
                      }}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
                      title="Share Invite"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CREATE COLLABORATION MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 dark:border-slate-800 relative my-8">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300">
                <Users className="w-3.5 h-3.5" />
                <span>New Collaboration Album</span>
              </div>
              <h2 className="text-2xl font-bold font-serif-title text-slate-900 dark:text-white">
                Create Shared Room
              </h2>

              <form onSubmit={handleCreateRoom} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Room Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Paris Trip 2026 ✈️ or College Memories 🎓"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CategoryType)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Description & Purpose
                  </label>
                  <textarea
                    rows={2}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="What is this shared scrapbook for?"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Room Cover Photo (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverPhotoUpload}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-rose-50 file:text-rose-600 hover:file:bg-rose-100"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-bold shadow-md hover:scale-[1.01] active:scale-95 transition-all"
                  >
                    Create & Generate Invite Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* SHARE & INVITE MODAL (WhatsApp, Insta, Native Share, Copy Link) */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 dark:border-slate-800 relative my-8 space-y-6">
            <button
              onClick={() => setIsShareModalOpen(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300">
                <Share2 className="w-3.5 h-3.5" />
                <span>Invite Collaborators</span>
              </div>
              <h2 className="text-2xl font-bold font-serif-title text-slate-900 dark:text-white">
                Share "{isShareModalOpen.title}"
              </h2>
              <p className="text-xs text-slate-500">
                Send this link or invite code to anyone you want to collaborate with!
              </p>
            </div>

            {/* Invite Code Box */}
            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 space-y-2 text-center">
              <span className="text-[10px] uppercase font-bold text-rose-500 tracking-wider">
                Unique Invite Code
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-mono font-bold tracking-widest text-slate-900 dark:text-white">
                  {isShareModalOpen.inviteCode}
                </span>
                <button
                  onClick={() => copyToClipboard(isShareModalOpen.inviteCode, 'code')}
                  className="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 shadow-xs transition-colors"
                  title="Copy Code"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 1-Click Social Sharing Buttons */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1-Click Social Sharing
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* WhatsApp Button */}
                <a
                  href={getWhatsAppShareUrl(isShareModalOpen)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Share on WhatsApp</span>
                </a>

                {/* Instagram DM formatted text copy */}
                <button
                  onClick={() => copyToClipboard(
                    `Hey! Join my shared album "${isShareModalOpen.title}" on Dreamy Diary ✨\nLink: ${getShareUrl(isShareModalOpen)}\nCode: ${isShareModalOpen.inviteCode}`,
                    'insta'
                  )}
                  className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 text-white text-xs font-bold shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>{copiedInsta ? 'Copied Insta Message!' : 'Copy for Insta DM'}</span>
                </button>
              </div>

              {/* Copy Full Link & Native Share */}
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(getShareUrl(isShareModalOpen), 'link')}
                  className="flex-1 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Copy Share Link'}</span>
                </button>

                <button
                  onClick={() => handleNativeShare(isShareModalOpen)}
                  className="p-3 rounded-2xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-all flex items-center justify-center"
                  title="More Apps"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* JOIN ROOM BY CODE MODAL */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 dark:border-slate-800 relative space-y-4">
            <button
              onClick={() => setIsJoinModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300">
                <UserPlus className="w-3.5 h-3.5" />
                <span>Join Collaboration</span>
              </div>
              <h2 className="text-2xl font-bold font-serif-title text-slate-900 dark:text-white">
                Enter Invite Code
              </h2>
            </div>

            {joinError && (
              <p className="text-xs font-bold text-rose-500 bg-rose-50 p-3 rounded-2xl">
                {joinError}
              </p>
            )}

            <div className="space-y-3">
              <input
                type="text"
                value={joinCodeInput}
                onChange={(e) => setJoinCodeInput(e.target.value)}
                placeholder="e.g. COLLAB-84920"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono font-bold text-center tracking-widest text-slate-900 dark:text-white uppercase focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

              <button
                onClick={() => handleJoinByCode()}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-rose-500 text-white text-xs font-bold shadow-md hover:scale-[1.01] active:scale-95 transition-all"
              >
                Join Collaboration Album ✨
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD SHARED PHOTO MODAL */}
      {isAddPhotoModalOpen && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 dark:border-slate-800 relative space-y-4 my-8">
            <button
              onClick={() => {
                setIsAddPhotoModalOpen(false);
                setPhotoUrls([]);
                setPhotoTitle('');
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300">
                <Camera className="w-3.5 h-3.5" />
                <span>Upload Shared Memory</span>
              </div>
              <h2 className="text-2xl font-bold font-serif-title text-slate-900 dark:text-white">
                Add Photos to "{selectedRoom.title}"
              </h2>
            </div>

            <form onSubmit={handleAddPhotoToRoom} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Photo Title / Caption
                </label>
                <input
                  type="text"
                  value={photoTitle}
                  onChange={(e) => setPhotoTitle(e.target.value)}
                  placeholder="e.g. Sunset at the Eiffel Tower 🌇"
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-rose-500" />
                    <span>Select Photos ({photoUrls.length} Selected) *</span>
                  </label>
                  <label className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold cursor-pointer transition-all shadow-xs hover:scale-[1.02] flex items-center gap-1">
                    <span>+ Select Multiple Photos</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleMultiplePhotosUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {photoUrls.length === 0 ? (
                  <label className="p-8 rounded-2xl border-2 border-dashed border-rose-200 dark:border-slate-700 bg-rose-50/40 dark:bg-slate-800/40 text-center cursor-pointer flex flex-col items-center justify-center gap-2 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors">
                    <Camera className="w-8 h-8 text-rose-400 animate-bounce-short" />
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Click here to select multiple photos at once
                    </p>
                    <p className="text-[10px] text-slate-400">
                      You can select multiple photos to upload together into a single card.
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleMultiplePhotosUpload}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 max-h-56 overflow-y-auto">
                    {photoUrls.map((img, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden shadow-xs border border-slate-200 dark:border-slate-700">
                        <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                        
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-black/70 text-white">
                          {idx === 0 ? '★ Cover' : `#${idx + 1}`}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeSelectedPhoto(idx)}
                          className="absolute top-1 right-1 p-1 rounded-lg bg-rose-600 text-white hover:bg-rose-700 shadow-xs opacity-80 group-hover:opacity-100 transition-opacity"
                          title="Remove photo"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddPhotoModalOpen(false);
                    setPhotoUrls([]);
                    setPhotoTitle('');
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={photoUrls.length === 0}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-bold shadow-md hover:scale-[1.01] active:scale-95 disabled:opacity-50 transition-all"
                >
                  Upload {photoUrls.length} Photo{photoUrls.length !== 1 ? 's' : ''} ✨
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LIGHTBOX FOR SHARED PHOTOS */}
      {selectedRoom && lightboxIndex !== null && activeLightboxPhotos.length > 0 && (
        <PhotoLightbox
          isOpen={lightboxIndex !== null}
          photos={activeLightboxPhotos}
          initialIndex={lightboxIndex}
          onClose={() => {
            setLightboxIndex(null);
            setActiveLightboxPhotos([]);
          }}
        />
      )}

    </div>
  );
};
