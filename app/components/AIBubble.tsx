'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Curated nail designs from gallery
const FEATURED_DESIGNS = [
  { id: 1, image: '/gallery/c61db860-4810-473d-9af3-90ea78e17226.jpg', name: 'Chrome Elegance' },
  { id: 2, image: '/gallery/afb39b9f-63de-4281-9d62-57670fc5f3b5.jpg', name: 'Soft French' },
  { id: 3, image: '/gallery/f0d71275-94d3-4325-9592-55cbe28a5bdd.jpg', name: '3D Florals' },
  { id: 4, image: '/gallery/1c77f4d1-58a0-4b2f-b1ca-f7054eeb9627.jpg', name: 'Nude Elegance' },
  { id: 5, image: '/gallery/810c6eb7-e2e7-49eb-87e4-c6867d09f390.jpg', name: 'Abstract Art' },
  { id: 6, image: '/gallery/599ff034-b45d-48af-8a8e-9996f5d98a8b.jpg', name: 'Ombre Magic' },
];

const WHATSAPP_NUMBER = '19296257273';

export default function AIBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);
  const [customIdea, setCustomIdea] = useState('');

  const handleBook = () => {
    const selected = FEATURED_DESIGNS.find(d => d.id === selectedDesign);
    const message = selected
      ? `Hi IVA! I love this design: "${selected.name}" ✨ Can I book an appointment?`
      : `Hi IVA! I have a nail idea: ${customIdea} ✨ Can I book an appointment?`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    setIsOpen(false);
    setSelectedDesign(null);
    setCustomIdea('');
  };

  const canBook = selectedDesign !== null || customIdea.trim().length > 0;

  return (
    <>
      {/* Elegant Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 group"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#B76E79] to-[#722F37] rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />

          {/* Button */}
          <div className="relative w-14 h-14 bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] rounded-full flex items-center justify-center border border-[#B76E79]/30 shadow-2xl">
            <svg className="w-6 h-6 text-[#B76E79]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Pulse indicator */}
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3">
            <span className="absolute inset-0 bg-[#FFD700] rounded-full animate-ping opacity-75" />
            <span className="relative block w-3 h-3 bg-[#FFD700] rounded-full" />
          </span>
        </div>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-md bg-[#0D0D0D] rounded-2xl overflow-hidden border border-[#B76E79]/20 shadow-2xl"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              {/* Header */}
              <div className="relative p-6 border-b border-white/5">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B76E79] to-[#722F37] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-serif text-white">Get Inspired</h2>
                    <p className="text-sm text-white/40">Select a design or describe your idea</p>
                  </div>
                </div>
              </div>

              {/* Design Grid */}
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2">
                  {FEATURED_DESIGNS.map((design, idx) => (
                    <motion.button
                      key={design.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => {
                        setSelectedDesign(selectedDesign === design.id ? null : design.id);
                        setCustomIdea('');
                      }}
                      className={`relative aspect-square rounded-lg overflow-hidden group transition-all duration-300 ${
                        selectedDesign === design.id
                          ? 'ring-2 ring-[#B76E79] ring-offset-2 ring-offset-[#0D0D0D] scale-[0.98]'
                          : 'hover:scale-[1.02]'
                      }`}
                    >
                      <Image
                        src={design.image}
                        alt={design.name}
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity ${
                        selectedDesign === design.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`} />
                      <span className={`absolute bottom-1.5 left-1.5 right-1.5 text-[10px] text-white font-medium transition-opacity ${
                        selectedDesign === design.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        {design.name}
                      </span>
                      {selectedDesign === design.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#B76E79] rounded-full flex items-center justify-center"
                        >
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="px-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-white/30 uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Custom Input */}
              <div className="p-4">
                <input
                  type="text"
                  value={customIdea}
                  onChange={(e) => {
                    setCustomIdea(e.target.value);
                    setSelectedDesign(null);
                  }}
                  placeholder="Describe your dream nails..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#B76E79]/50 focus:bg-white/[0.07] transition"
                />
              </div>

              {/* Book Button */}
              <div className="p-4 pt-0">
                <motion.button
                  onClick={handleBook}
                  disabled={!canBook}
                  className="w-full py-3.5 bg-gradient-to-r from-[#B76E79] to-[#722F37] text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                  whileHover={canBook ? { scale: 1.01 } : {}}
                  whileTap={canBook ? { scale: 0.99 } : {}}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  Book via WhatsApp
                </motion.button>
                <p className="text-center text-[11px] text-white/25 mt-3">
                  We&apos;ll respond within 24 hours
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
