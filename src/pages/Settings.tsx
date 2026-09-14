import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  Download, 
  Upload, 
  Trash2, 
  ShieldCheck, 
  HardDrive
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { db, logHistory } from '../db';

export const SettingsPage: React.FC = () => {
  const { theme, preset, setPreset, toggleTheme } = useTheme();
  const [importStatus, setImportStatus] = useState('');

  const THEME_PRESETS = [
    { id: 'default', name: 'Rose Gold', icon: '🌸', bg: 'bg-rose-500 text-white' },
    { id: 'lavender', name: 'Lavender Dusk', icon: '🪻', bg: 'bg-purple-600 text-white' },
    { id: 'coral', name: 'Sunset Coral', icon: '🌅', bg: 'bg-orange-500 text-white' },
    { id: 'matcha', name: 'Matcha Serenity', icon: '🍵', bg: 'bg-emerald-600 text-white' },
    { id: 'dark', name: 'Midnight Sky', icon: '🌌', bg: 'bg-slate-800 text-white' },
  ];

  const handleExportBackup = async () => {
    try {
      const users = await db.users.toArray();
      const wishlist = await db.wishlist.toArray();
      const memories = await db.memories.toArray();
      const achievements = await db.achievements.toArray();

      const backupData = {
        app: 'Dreamy Diary',
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        users,
        wishlist,
        memories,
        achievements
      };

      const jsonStr = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dreamy-diary-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);

      await logHistory({
        category: 'system',
        action: 'export',
        status: 'success',
        title: 'Exported Backup JSON',
        details: `Successfully exported full diary backup file.`,
        icon: '💾'
      });
    } catch (err) {
      console.error('Export error:', err);
      await logHistory({
        category: 'system',
        action: 'export',
        status: 'fail',
        title: 'Export Backup Failed',
        details: `Error generating backup JSON download file.`,
        icon: '❌'
      });
      alert('Failed to generate export backup.');
    }
  };

  const handleRestoreBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (data.app !== 'Dreamy Diary') {
        await logHistory({
          category: 'system',
          action: 'restore',
          status: 'fail',
          title: 'Backup Restore Failed',
          details: `Invalid backup file format selected.`,
          icon: '⚠️'
        });
        alert('Invalid backup file format.');
        return;
      }

      setImportStatus('Restoring backup data...');

      if (data.users && data.users.length > 0) {
        await db.users.clear();
        await db.users.bulkAdd(data.users);
      }
      if (data.wishlist && data.wishlist.length > 0) {
        await db.wishlist.clear();
        await db.wishlist.bulkAdd(data.wishlist);
      }
      if (data.memories && data.memories.length > 0) {
        await db.memories.clear();
        await db.memories.bulkAdd(data.memories);
      }
      if (data.achievements && data.achievements.length > 0) {
        await db.achievements.clear();
        await db.achievements.bulkAdd(data.achievements);
      }

      await logHistory({
        category: 'system',
        action: 'restore',
        status: 'success',
        title: 'Backup JSON Restored',
        details: `Successfully imported diary data from backup file.`,
        icon: '📥'
      });

      setImportStatus('Backup successfully restored! Reloading...');
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (err) {
      console.error('Restore error:', err);
      await logHistory({
        category: 'system',
        action: 'restore',
        status: 'fail',
        title: 'Backup Restore Failed',
        details: `Failed to parse JSON backup file structure.`,
        icon: '❌'
      });
      alert('Failed to parse and restore backup JSON file.');
      setImportStatus('');
    }
  };

  const handleClearData = async () => {
    if (confirm('WARNING: Are you sure you want to delete ALL local data? This action cannot be undone unless you have a JSON backup file.')) {
      await logHistory({
        category: 'system',
        action: 'clear',
        status: 'success',
        title: 'Local Data Wiped',
        details: `Cleared all local storage and IndexedDB data.`,
        icon: '🧹'
      });
      await db.users.clear();
      await db.wishlist.clear();
      await db.memories.clear();
      await db.achievements.clear();
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-slate-800 shadow-xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300">
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>App Preferences & Storage</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 dark:text-white">
          Settings & Privacy
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Manage application theme, data backups, and local storage settings.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          {theme === 'dark' ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-rose-500" />}
          <span>Aesthetic Theme Presets</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {THEME_PRESETS.map((p) => {
            const isSelected = preset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPreset(p.id as any)}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'border-rose-500 ring-2 ring-rose-400 shadow-md bg-rose-50/50 dark:bg-slate-800'
                    : 'border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                }`}
              >
                <span className="text-2xl">{p.icon}</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{p.name}</span>
                {isSelected && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-rose-500 text-white">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 mt-2">
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Quick Toggle Dark Mode</p>
            <p className="text-[11px] text-slate-500">Currently using {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-2xl bg-rose-500 text-white text-xs font-bold shadow-xs hover:bg-rose-600 transition-all flex items-center gap-1.5"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-purple-500" />
          <span>Backup & Data Protection</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Export your entire diary (wishlist items, memories, photo files, and quotes) into a single offline JSON file for safe-keeping or transferring to another device.
        </p>

        {importStatus && (
          <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 text-xs text-center font-semibold">
            {importStatus}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleExportBackup}
            className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-100 text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Full Backup JSON</span>
          </button>

          <label className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-100 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer text-center">
            <Upload className="w-4 h-4" />
            <span>Restore Data from Backup File</span>
            <input
              type="file"
              accept=".json"
              onChange={handleRestoreBackup}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-50 to-pink-50 dark:from-slate-900 dark:to-slate-800 border border-rose-200 dark:border-slate-700 shadow-xs space-y-2">
        <h3 className="text-sm font-bold text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-rose-500" />
          <span>Local-First & Private by Default</span>
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Dreamy Diary is built with a strict local-first philosophy. Your personal memories, photos, wishlist dreams, and thoughts remain 100% inside your browser's local IndexedDB database on your device. Nothing is uploaded to remote cloud servers without your explicit intent.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-rose-200/60 dark:border-rose-900/40 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-2">
          <Trash2 className="w-4 h-4 text-rose-500" />
          <span>Danger Zone</span>
        </h3>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30">
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Delete All Local Data</p>
            <p className="text-[11px] text-slate-500">Permanently wipes wishlist items, memories, and photos.</p>
          </div>
          <button
            onClick={handleClearData}
            className="px-4 py-2 rounded-2xl bg-rose-600 text-white text-xs font-bold shadow-xs hover:bg-rose-700 transition-all"
          >
            Wipe Data
          </button>
        </div>
      </div>

    </div>
  );
};
