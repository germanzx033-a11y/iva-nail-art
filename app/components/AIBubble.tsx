'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  X,
  MessageCircle,
  ChevronRight,
  Heart,
  Lightbulb,
  Palette,
  Star,
  Send,
} from 'lucide-react';

// Nail inspiration ideas with images from gallery
const INSPIRATION_CATEGORIES = [
  {
    id: 'trending',
    title: 'Trending Now',
    emoji: '🔥',
    ideas: [
      { name: 'Chrome Finish', description: 'Mirror-like metallic shine', image: '/gallery/c61db860-4810-473d-9af3-90ea78e17226.jpg' },
      { name: 'Soft French', description: 'Modern take on classic French', image: '/gallery/afb39b9f-63de-4281-9d62-57670fc5f3b5.jpg' },
      { name: '3D Florals', description: 'Delicate raised flower art', image: '/gallery/f0d71275-94d3-4325-9592-55cbe28a5bdd.jpg' },
    ],
  },
  {
    id: 'classic',
    title: 'Timeless Classics',
    emoji: '💎',
    ideas: [
      { name: 'Nude Elegance', description: 'Sophisticated natural tones', image: '/gallery/1c77f4d1-58a0-4b2f-b1ca-f7054eeb9627.jpg' },
      { name: 'Bold Red', description: 'Statement-making crimson', image: '/gallery/2b1d20c5-dd9d-45d5-85eb-da7821a34743.jpg' },
      { name: 'French Tips', description: 'The eternal favorite', image: '/gallery/14e8d740-b174-48d9-8c87-bddcb007ec72.jpg' },
    ],
  },
  {
    id: 'artistic',
    title: 'Artistic Designs',
    emoji: '🎨',
    ideas: [
      { name: 'Abstract Art', description: 'Unique hand-painted designs', image: '/gallery/810c6eb7-e2e7-49eb-87e4-c6867d09f390.jpg' },
      { name: 'Geometric', description: 'Clean lines and shapes', image: '/gallery/0252121b-f561-4b19-bf43-11cdd5a1f36a.jpg' },
      { name: 'Ombre Magic', description: 'Beautiful color gradients', image: '/gallery/599ff034-b45d-48af-8a8e-9996f5d98a8b.jpg' },
    ],
  },
];

const QUICK_IDEAS = [
  'Something elegant for a wedding',
  'Bold and colorful for summer',
  'Minimalist and professional',
  'Sparkly for a party',
  'Natural pregnancy-safe look',
  'Festive holiday design',
];

export default function AIBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(INSPIRATION_CATEGORIES[0].id);
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null);
  const [customRequest, setCustomRequest] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSendRequest = () => {
    if (!customRequest.trim() && !selectedIdea) return;

    const message = selectedIdea
      ? `Hi! I'm interested in this nail design: ${selectedIdea}. Can I book an appointment?`
      : `Hi! I'd like to get nails done with this idea: ${customRequest}`;

    window.open(
      `https://wa.me/13474735036?text=${encodeURIComponent(message)}`,
      '_blank'
    );

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsOpen(false);
      setSelectedIdea(null);
      setCustomRequest('');
    }, 2000);
  };

  const activeInspiration = INSPIRATION_CATEGORIES.find(c => c.id === activeCategory);

  return (
    <>
      {/* Floating Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-[#722F37] to-[#B76E79] shadow-2xl flex items-center justify-center group overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Sparkles className="w-7 h-7 text-white relative z-10" />
        <motion.span
          className="absolute -top-1 -right-1 w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center shadow-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Lightbulb className="w-3 h-3 text-[#722F37]" />
        </motion.span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative bg-white w-full max-w-lg max-h-[90vh] rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-[#722F37] via-[#8B3A44] to-[#B76E79] p-6 text-white">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl" />

                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-[#FFD700]" />
                      <span className="text-xs uppercase tracking-wider text-white/80">Nail Inspiration</span>
                    </div>
                    <h2 className="text-2xl font-serif">Find Your Perfect Design</h2>
                    <p className="text-white/70 text-sm mt-1">Get inspired and book your appointment</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition backdrop-blur-sm"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
                  {INSPIRATION_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                        activeCategory === cat.id
                          ? 'bg-white text-[#722F37]'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      {cat.emoji} {cat.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[50vh] p-6">
                {showSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-10 h-10 text-green-500 fill-current" />
                    </div>
                    <h3 className="text-xl font-serif text-[#722F37] mb-2">Opening WhatsApp...</h3>
                    <p className="text-gray-500">We can&apos;t wait to create your dream nails!</p>
                  </motion.div>
                ) : (
                  <>
                    {/* Inspiration Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {activeInspiration?.ideas.map((idea, idx) => (
                        <motion.button
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          onClick={() => setSelectedIdea(selectedIdea === idea.name ? null : idea.name)}
                          className={`relative rounded-xl overflow-hidden aspect-square group ${
                            selectedIdea === idea.name ? 'ring-2 ring-[#722F37] ring-offset-2' : ''
                          }`}
                        >
                          <img
                            src={idea.image}
                            alt={idea.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-left">
                            <p className="text-xs font-medium">{idea.name}</p>
                          </div>
                          {selectedIdea === idea.name && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-[#722F37] rounded-full flex items-center justify-center">
                              <Star className="w-3 h-3 text-white fill-current" />
                            </div>
                          )}
                        </motion.button>
                      ))}
                    </div>

                    {/* Quick Ideas */}
                    <div className="mb-6">
                      <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Quick Ideas
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {QUICK_IDEAS.map((idea, i) => (
                          <button
                            key={i}
                            onClick={() => setCustomRequest(idea)}
                            className={`px-3 py-1.5 text-xs rounded-full transition ${
                              customRequest === idea
                                ? 'bg-[#722F37] text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                          >
                            {idea}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Request Input */}
                    <div className="mb-4">
                      <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                        Or describe your own idea
                      </label>
                      <textarea
                        value={customRequest}
                        onChange={(e) => setCustomRequest(e.target.value)}
                        placeholder="E.g., Soft pink with gold accents for a birthday..."
                        className="w-full p-4 border border-gray-200 rounded-xl resize-none h-20 focus:ring-2 focus:ring-[#722F37]/20 focus:border-[#722F37] transition text-sm"
                      />
                    </div>

                    {/* Send Button */}
                    <button
                      onClick={handleSendRequest}
                      disabled={!customRequest.trim() && !selectedIdea}
                      className="w-full py-4 bg-gradient-to-r from-[#722F37] to-[#B76E79] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Send via WhatsApp
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-4">
                      We&apos;ll discuss your design and schedule your appointment
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
