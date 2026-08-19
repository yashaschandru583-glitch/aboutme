import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SkillsGrid } from './components/SkillsGrid';
import { ProjectsGallery } from './components/ProjectsGallery';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ArchitectureGuideModal } from './components/ArchitectureGuideModal';
import { NewProjectModal } from './components/NewProjectModal';
import { UploadPhotoModal } from './components/UploadPhotoModal';
import { Toast, ToastMessage } from './components/Toast';
import { ServerHealth, Project } from './types';
import { developerProfile } from './data/portfolioData';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [serverHealth, setServerHealth] = useState<ServerHealth | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load avatar from localStorage or fallback to developerProfile.avatarUrl
  const [currentPhoto, setCurrentPhoto] = useState<string>(() => {
    try {
      return localStorage.getItem('portfolio_user_avatar') || developerProfile.avatarUrl;
    } catch {
      return developerProfile.avatarUrl;
    }
  });

  // Fetch health status on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/health');
        const data = await res.json();
        if (data.status === 'healthy') {
          setServerHealth(data);
        }
      } catch (err) {
        console.warn('API health check error:', err);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  const handlePhotoUpdated = (newPhotoUrl: string) => {
    setCurrentPhoto(newPhotoUrl);
    showToast('Profile photo updated successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f9fafb] font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Sticky Navigation Bar */}
      <Navbar
        serverHealth={serverHealth}
        currentPhoto={currentPhoto}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenNewProject={() => setIsNewProjectOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenUploadPhoto={() => setIsPhotoModalOpen(true)}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Sections */}
      <main className="relative">
        {/* 1. Hero Section */}
        <Hero
          serverHealth={serverHealth}
          currentPhoto={currentPhoto}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenUploadPhoto={() => setIsPhotoModalOpen(true)}
          isDark={isDark}
        />

        {/* 2. About & Metrics Section */}
        <About isDark={isDark} />

        {/* 3. Skills Grid Section */}
        <SkillsGrid isDark={isDark} />

        {/* 4. Projects Gallery Section */}
        <ProjectsGallery
          serverHealth={serverHealth}
          isDark={isDark}
          onShowToast={showToast}
        />

        {/* 5. Contact Section */}
        <ContactForm
          isDark={isDark}
          onShowToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer
        serverHealth={serverHealth}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        isDark={isDark}
      />

      {/* Modals & Dialogs */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        isDark={isDark}
      />

      <ArchitectureGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        isDark={isDark}
      />

      <NewProjectModal
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        onProjectCreated={(p: Project) => {
          showToast(`Project "${p.title}" created via REST API!`, 'success');
        }}
        isDark={isDark}
      />

      {/* Upload Photo Modal */}
      <UploadPhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        currentPhoto={currentPhoto}
        onPhotoUpdated={handlePhotoUpdated}
        isDark={isDark}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
