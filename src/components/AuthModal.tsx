import React, { useState, useEffect } from 'react';
import { X, User, Mail, Lock, UserPlus, LogIn, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../db';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  onSuccess?: () => void;
}

const AVATARS = ['✨', '🌟', '📸', '💖', '🧳', '🎨', '🏖️', '🌸', '☕', '🚀'];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signin', onSuccess }) => {
  const { login, signup } = useAuth();
  const [activeMode, setActiveMode] = useState<'signin' | 'signup'>(initialMode);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('✨');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setActiveMode(initialMode);
      setError('');
      setSuccessMsg('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    try {
      if (activeMode === 'signup') {
        if (!name.trim()) {
          setError('Please enter your full name');
          return;
        }
        if (!password.trim()) {
          setError('Password is required for Sign Up');
          return;
        }

        // Check if account already exists
        const allUsers = await db.users.toArray();
        const existing = allUsers.find(
          u => u.name.toLowerCase() === name.trim().toLowerCase() ||
               (email.trim() && u.email && u.email.toLowerCase() === email.trim().toLowerCase())
        );

        if (existing) {
          setError('An account with this name or email already exists. Please Sign In.');
          return;
        }

        const success = await signup(name.trim(), email.trim(), password.trim(), bio.trim(), avatar);
        if (success) {
          const registeredName = name.trim();
          setPassword('');
          setError('');
          setSuccessMsg('🎉 Account created successfully! Please Sign In below.');
          setActiveMode('signin');
          setName(registeredName);
        }
      } else {
        if (!name.trim()) {
          setError('Please enter your name or email address');
          return;
        }
        if (!password.trim()) {
          setError('Please enter your password');
          return;
        }

        const success = await login(name.trim(), password.trim());
        if (!success) {
          const allUsers = await db.users.toArray();
          const userExists = allUsers.some(
            u => u.name.toLowerCase() === name.trim().toLowerCase() ||
                 (u.email && u.email.toLowerCase() === name.trim().toLowerCase())
          );
          if (userExists) {
            setError('Incorrect password. Please try again.');
          } else {
            setError('Account not found. Please click Sign Up to create your account.');
          }
          return;
        }
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 dark:border-slate-800 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-16 h-16 rounded-full border-2 border-rose-300 dark:border-rose-700 mx-auto p-0.5 shadow-lg shadow-rose-200/50 overflow-hidden bg-white">
            <img src="/logo.jpg" alt="Dreamy Diary Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <h2 className="text-2xl font-bold font-serif-title bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 dark:from-rose-400 dark:via-purple-300 dark:to-amber-300 bg-clip-text text-transparent">
            Dreamy Diary
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Collect Dreams. Live Moments. Keep Memories.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => { setActiveMode('signin'); setError(''); setSuccessMsg(''); }}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeMode === 'signin'
                ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveMode('signup'); setError(''); setSuccessMsg(''); }}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeMode === 'signup'
                ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Sign Up</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 text-xs text-center border border-rose-200 dark:border-rose-800 font-medium">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-300 text-xs text-center border border-emerald-200 dark:border-emerald-800 font-medium flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {activeMode === 'signin' ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Name or Email Address *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name or email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white text-sm font-bold shadow-md shadow-rose-500/30 hover:scale-[1.01] active:scale-95 transition-all mt-2 flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Your Diary ✨</span>
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maya@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Password * (Mandatory)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Choose a strong password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Personal Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="A short quote or sentence about your journey..."
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Choose Avatar Icon
                </label>
                <div className="flex flex-wrap gap-1.5 justify-center p-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  {AVATARS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAvatar(a)}
                      className={`w-8 h-8 rounded-xl text-base flex items-center justify-center transition-all ${
                        avatar === a 
                          ? 'bg-rose-500 text-white shadow-md scale-110' 
                          : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white text-sm font-bold shadow-md shadow-rose-500/30 hover:scale-[1.01] active:scale-95 transition-all mt-2 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Account ✨</span>
              </button>
            </>
          )}

        </form>

        <div className="mt-5 text-center">
          <button
            onClick={() => { setActiveMode(activeMode === 'signin' ? 'signup' : 'signin'); setError(''); }}
            className="text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline"
          >
            {activeMode === 'signin' 
              ? "Don't have an account? Sign Up" 
              : "Already have an account? Sign In"}
          </button>
        </div>

        <p className="mt-4 text-[10px] text-center text-slate-400 dark:text-slate-500">
          🔒 Local-First Guarantee: Your accounts and data remain 100% private on your device.
        </p>
      </div>
    </div>
  );
};
