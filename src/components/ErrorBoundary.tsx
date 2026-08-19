import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message || 'An error occurred during rendering.' };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Portfolio Error Boundary caught:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch {}
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#f9fafb] flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full p-8 rounded-2xl border border-red-500/30 bg-[#121212] shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-mono font-bold text-white uppercase tracking-wider">
              Runtime Diagnostic Alert
            </h2>
            <p className="text-xs text-gray-400 font-mono">
              {this.state.errorMessage}
            </p>
            <button
              onClick={this.handleReset}
              className="mt-4 px-5 py-2.5 rounded-lg bg-emerald-500 text-black font-mono font-bold text-xs hover:bg-emerald-400 flex items-center gap-2 mx-auto transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>RELOAD PORTFOLIO</span>
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
