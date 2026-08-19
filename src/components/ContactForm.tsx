import React, { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Mail, 
  MapPin, 
  Phone, 
  Inbox, 
  RefreshCw, 
  Clock, 
  ChevronRight,
  Sparkles,
  Terminal
} from 'lucide-react';
import { developerProfile } from '../data/portfolioData';
import { ContactSubmission } from '../types';

interface ContactFormProps {
  isDark: boolean;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ isDark, onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [inboxLoading, setInboxLoading] = useState(false);

  const fetchSubmissions = async () => {
    setInboxLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setSubmissions(data.data);
      }
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setInboxLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      onShowToast('Please complete all required fields.', 'error');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        onShowToast(data.message || 'Message safely stored in MongoDB!', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        fetchSubmissions();
      } else {
        onShowToast(data.error || 'Failed to deliver message.', 'error');
      }
    } catch (err) {
      onShowToast('Server network error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-20 px-4 sm:px-8 lg:px-10 border-t border-white/5 bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
            05. // INITIATE TRANSMISSION
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Let&apos;s Build Something Resilient
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-2 font-normal">
            Direct channel to my inbox. All submissions are validated and stored via Express REST APIs into MongoDB.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Info & Inbox Inspector */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-emerald-400">
                DIRECT CHANNELS
              </h3>

              <div className="space-y-3 font-mono text-xs">
                <a
                  href={`mailto:${developerProfile.email}`}
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <span className="p-2 rounded-lg bg-black/40 border border-white/10 text-emerald-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <span>{developerProfile.email}</span>
                </a>

                <a
                  href={`tel:${developerProfile.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  <span className="p-2 rounded-lg bg-black/40 border border-white/10 text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span className="font-bold">{developerProfile.phone}</span>
                </a>

                <div className="flex items-center gap-3 text-gray-300">
                  <span className="p-2 rounded-lg bg-black/40 border border-white/10 text-emerald-400">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <span>{developerProfile.location}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-500">
                <span>TIMEZONE: GMT-7 (PST)</span>
                <span className="text-emerald-400">AVG RESPONSE: &lt; 24H</span>
              </div>
            </div>

            {/* Submissions Inbox Drawer Trigger */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-xs text-white font-mono uppercase tracking-wider">
                    DATABASE INBOX ({submissions.length})
                  </span>
                </div>

                <button
                  id="btn-toggle-inbox-drawer"
                  onClick={() => setInboxOpen(!inboxOpen)}
                  className="text-xs font-mono text-emerald-400 hover:underline cursor-pointer"
                >
                  {inboxOpen ? 'COLLAPSE' : 'INSPECT'}
                </button>
              </div>

              <p className="text-xs text-gray-400">
                Inspect stored contact messages written to the MongoDB / Mongoose collection.
              </p>

              {inboxOpen && (
                <div className="mt-3 pt-3 border-t border-white/5 space-y-2 max-h-56 overflow-y-auto">
                  {submissions.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs font-mono space-y-1"
                    >
                      <div className="flex justify-between text-gray-400 text-[10px]">
                        <span className="text-emerald-400 font-bold">{sub.name}</span>
                        <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="text-gray-300 font-sans text-xs">{sub.message}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Contact Transmission Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col gap-4">
              
              <div className="mb-2">
                <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  TRANSMISSION_FORM.POST
                </h3>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white font-mono">TRANSMISSION DELIVERED</h4>
                  <p className="text-xs text-gray-400 max-w-md mx-auto">
                    Your message was recorded into MongoDB via `POST /api/contact`. I will review and reply promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 rounded-md bg-white/10 border border-white/10 text-xs font-mono text-white hover:bg-white/20"
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase mb-1">
                        YOUR NAME *
                      </label>
                      <input
                        id="contact-input-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="YASHAS C"
                        className="w-full bg-black/40 border border-white/10 rounded px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:border-emerald-500 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase mb-1">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        id="contact-input-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="YASHAS@COMPANY.COM"
                        className="w-full bg-black/40 border border-white/10 rounded px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:border-emerald-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase mb-1">
                      SUBJECT / SCOPE
                    </label>
                    <input
                      id="contact-input-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="FULL-STACK ARCHITECTURE / ADVISING"
                      className="w-full bg-black/40 border border-white/10 rounded px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:border-emerald-500 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase mb-1">
                      MESSAGE BODY *
                    </label>
                    <textarea
                      id="contact-input-message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="DETAILS OF YOUR ENGINEERING INITIATIVE, TECH STACK, OR TIMELINE..."
                      className="w-full bg-black/40 border border-white/10 rounded px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:border-emerald-500 outline-none transition-colors resize-none font-sans"
                    />
                  </div>

                  <button
                    id="btn-submit-contact"
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-emerald-500 text-black font-bold font-mono text-xs uppercase tracking-widest rounded hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-[0.99] disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-black" />
                        <span>RECORDING TO MONGODB...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>SEND TRANSMISSION</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
