import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Camera, 
  Image as ImageIcon, 
  Check, 
  RefreshCw, 
  Trash2, 
  Sparkles,
  Link2
} from 'lucide-react';
import { developerProfile } from '../data/portfolioData';

interface UploadPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhoto: string;
  onPhotoUpdated: (newPhotoUrl: string) => void;
  isDark: boolean;
}

const PRESET_AVATARS = [
  {
    name: 'Modern Tech Leader',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Software Architect',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Senior Developer',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Minimalist Monogram',
    url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80',
  },
];

export const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({
  isOpen,
  onClose,
  currentPhoto,
  onPhotoUpdated,
  isDark,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>(currentPhoto);
  const [urlInput, setUrlInput] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (file: File) => {
    setErrorMsg(null);
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg('Image size exceeds 8MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreviewUrl(event.target.result as string);
      }
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read file.');
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setPreviewUrl(urlInput.trim());
    setUrlInput('');
  };

  const handleSave = () => {
    setIsSaving(true);
    try {
      localStorage.setItem('portfolio_user_avatar', previewUrl);
      onPhotoUpdated(previewUrl);
      onClose();
    } catch (err) {
      console.error(err);
      onPhotoUpdated(previewUrl);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDefault = () => {
    const defaultUrl = developerProfile.avatarUrl;
    setPreviewUrl(defaultUrl);
    localStorage.removeItem('portfolio_user_avatar');
  };

  return (
    <div 
      id="upload-photo-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="upload-photo-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#0a0a0a] text-gray-200 shadow-2xl overflow-hidden my-8"
      >
        {/* Modal Top Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs">
              <Camera className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase">
                PROFILE PHOTO SETTINGS
              </h3>
              <p className="text-[11px] text-gray-500 font-mono">
                Upload custom portrait or choose from preset engineer avatars
              </p>
            </div>
          </div>

          <button
            id="btn-close-upload-photo"
            onClick={onClose}
            className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto font-mono text-xs">
          
          {errorMsg && (
            <div className="p-3 rounded bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs">
              {errorMsg}
            </div>
          )}

          {/* Current Avatar Preview */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl border border-white/10 bg-white/5">
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-xl bg-black/60 relative">
                <img
                  src={previewUrl}
                  alt="Profile Avatar Preview"
                  className="w-full h-full object-cover"
                  onError={() => setPreviewUrl(developerProfile.avatarUrl)}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-black p-1.5 rounded-lg font-bold shadow-md">
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex-1 space-y-1.5 text-center sm:text-left">
              <div className="font-bold text-sm text-white uppercase">
                {developerProfile.name}
              </div>
              <p className="text-xs text-gray-400 font-sans">
                Displayed in Hero headline, About biography, and Printable Resume.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded bg-emerald-500 text-black font-bold text-[11px] hover:bg-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>BROWSE IMAGE</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="px-3 py-1.5 rounded border border-white/10 bg-white/5 text-gray-400 hover:text-white text-[11px] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>RESET DEFAULT</span>
                </button>
              </div>
            </div>
          </div>

          {/* Drag & Drop Zone */}
          <div>
            <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              DRAG & DROP OR SELECT IMAGE FILE
            </label>
            <div
              id="photo-drag-drop-zone"
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-8 rounded-xl border-2 border-dashed text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 ${
                isDragging
                  ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300'
                  : 'border-white/10 hover:border-emerald-500/40 bg-black/40 text-gray-400 hover:text-gray-200'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />
              <div className="p-3 rounded-full bg-white/5 border border-white/10 text-emerald-400">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-white mb-0.5">
                  Click to browse or drag and drop image here
                </p>
                <p className="text-[11px] text-gray-500">
                  Supports PNG, JPG, GIF, WebP, SVG (up to 8MB)
                </p>
              </div>
            </div>
          </div>

          {/* Preset Avatars Selection */}
          <div>
            <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              OR SELECT PRESET ENGINEER PORTRAIT
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PRESET_AVATARS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPreviewUrl(preset.url)}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 group ${
                    previewUrl === preset.url
                      ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-14 h-14 rounded-lg object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="text-[10px] truncate max-w-full font-mono">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Web Image URL Input */}
          <div>
            <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              OR LOAD FROM REMOTE IMAGE URL
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link2 className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/my-avatar.jpg"
                  className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 pl-9 text-xs text-white placeholder-gray-600 focus:border-emerald-500 outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyUrl}
                disabled={!urlInput.trim()}
                className="px-4 py-2 rounded bg-white/10 border border-white/10 text-white text-xs hover:bg-white/20 disabled:opacity-50 cursor-pointer"
              >
                APPLY
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 border-t border-white/10 flex items-center justify-between bg-white/[0.02]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded text-xs text-gray-400 hover:text-white font-mono"
          >
            CANCEL
          </button>

          <button
            type="button"
            id="btn-save-profile-photo"
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 rounded bg-emerald-500 text-black font-bold font-mono text-xs hover:bg-emerald-400 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            <span>SAVE PROFILE PHOTO</span>
          </button>
        </div>

      </div>
    </div>
  );
};
