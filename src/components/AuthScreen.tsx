import React, { useState } from 'react';
import { User, Mail, Lock, UserPlus, LogIn, CheckCircle2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../db';

const AVATARS = ['✨', '🌟', '📸', '💖', '🧳', '🎨', '🏖️', '🌸', '☕', '🚀'];

interface AuthScreenProps {
  onSuccess?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess }) => {
  const { login, signup, loginAsGuest } = useAuth();
  const [activeMode, setActiveMode] = useState<'signin' | 'signup'>('signin');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('✨');

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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
          setSuccessMsg('🎉 Account created successfully! Please Sign In below to enter your diary.');
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
        if (success) {
          if (onSuccess) onSuccess();
        } else {
          const allUsers = await db.users.toArray();
          const userExists = allUsers.some(
            u => u.name.toLowerCase() === name.trim().toLowerCase() ||
                 (u.email && u.email.toLowerCase() === name.trim().toLowerCase())
          );
          if (userExists) {
            setError('Incorrect password. Please try again.');
          } else {
            setError('Account not found. Please click Sign Up to create your account first.');
          }
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100/70 via-pink-50 to-amber-100/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4 sm:p-6 transition-colors duration-300">
      
      {/* Background Decor Elements */}
      <div className="fixed top-12 left-12 w-64 h-64 bg-rose-300/30 dark:bg-rose-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-12 right-12 w-80 h-80 bg-purple-300/30 dark:bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 dark:border-slate-800 relative z-10 my-auto">
        
        {/* App Title & Branding */}
        <div className="text-center space-y-3 mb-5">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 mx-auto p-0.5 animate-glow-pulse shake-on-hover cursor-pointer">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[22px] flex items-center justify-center text-3xl">
              {activeMode === 'signup' ? avatar : '✨'}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold font-serif-title bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 dark:from-rose-400 dark:via-purple-300 dark:to-amber-300 bg-clip-text text-transparent">
              Dreamy Diary
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Collect Dreams • Live Moments • Keep Memories
            </p>
          </div>
        </div>

        {/* Access Notice */}
        <div className="mb-5 p-3 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 text-xs text-center font-medium flex items-center justify-center gap-2 shadow-xs shadow-rose-200/50">
          <Lock className="w-4 h-4 text-rose-500 shrink-0 animate-pulse" />
          <span>Please sign in to continue to your Dreamy Diary</span>
        </div>

        {/* Tab Switcher: Sign In / Sign Up */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => { setActiveMode('signin'); setError(''); setSuccessMsg(''); }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeMode === 'signin'
                ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-md shadow-rose-200/50'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveMode('signup'); setError(''); setSuccessMsg(''); }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeMode === 'signup'
                ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-md shadow-rose-200/50'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Sign Up</span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 text-xs text-center border border-rose-200 dark:border-rose-800 font-medium animate-in fade-in">
            {error}
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-300 text-xs text-center border border-emerald-200 dark:border-emerald-800 font-medium flex items-center justify-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Dynamic Form */}
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
                    placeholder="Enter your registered name or email"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
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
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white text-sm font-bold shadow-lg shadow-rose-500/30 hover:scale-[1.01] active:scale-95 transition-all mt-2 flex items-center justify-center gap-2"
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
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
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
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
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
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
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
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white text-sm font-bold shadow-lg shadow-rose-500/30 hover:scale-[1.01] active:scale-95 transition-all mt-2 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Account ✨</span>
              </button>
            </>
          )}

        </form>

        <div className="mt-5 space-y-3 text-center">
          <button
            onClick={() => { setActiveMode(activeMode === 'signin' ? 'signup' : 'signin'); setError(''); setSuccessMsg(''); }}
            className="text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline"
          >
            {activeMode === 'signin' 
              ? "Don't have an account? Sign Up" 
              : "Already have an account? Sign In"}
          </button>

          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500"><span className="bg-white dark:bg-slate-900 px-2">or</span></div>
          </div>

          <button
            type="button"
            onClick={async () => {
              await loginAsGuest();
              if (onSuccess) onSuccess();
            }}
            className="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>🚀 Continue as Guest (Quick Demo)</span>
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Private & Offline Local Storage</span>
          </div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500">
            Your personal dreams and memories are stored safely on your device.
          </p>
        </div>

      </div>
    </div>
  );
};
