import { StrictMode, Component, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Unregister any stale service workers that may cache broken assets
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  }).catch(() => {});
}

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-rose-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-rose-500 text-white flex items-center justify-center text-3xl mb-4 shadow-lg">
            ✨
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white font-serif mb-2">
            Welcome to Dreamy Diary
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mb-6">
            An unexpected error occurred. Click below to refresh your diary.
          </p>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="px-6 py-3 rounded-2xl bg-rose-500 text-white text-xs font-bold shadow-md hover:bg-rose-600 transition-all"
          >
            Reset Cache & Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
