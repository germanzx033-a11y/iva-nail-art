"use client";

import { motion } from "framer-motion";
import { Sparkles, Calendar, Clock, MapPin, Check, Download } from "lucide-react";
import { CONFIG } from "../constants";

interface GoldenTicketProps {
  lang: "en" | "es";
  booking: {
    serviceName: string;
    date: string;
    time: string;
    name: string;
    phone: string;
  };
  onClose: () => void;
}

export default function GoldenTicket({ lang, booking, onClose }: GoldenTicketProps) {
  const t = {
    en: {
      title: "Your Exclusive Access",
      subtitle: "Golden Ticket",
      confirmed: "Spot Secured",
      details: "Appointment Details",
      service: "Service",
      dateTime: "Date & Time",
      location: "Location",
      contact: "Contact",
      confirmationCode: "Confirmation Code",
      nextSteps: "Next Steps",
      step1: "Check WhatsApp for deposit payment instructions",
      step2: "You'll receive a confirmation once payment is received",
      step3: "Prepare to be transformed",
      shareTicket: "Share Ticket",
      close: "Close",
      reserved: "Reserved exclusively for you",
    },
    es: {
      title: "Tu Acceso Exclusivo",
      subtitle: "Ticket Dorado",
      confirmed: "Espacio Asegurado",
      details: "Detalles de la Cita",
      service: "Servicio",
      dateTime: "Fecha y Hora",
      location: "Ubicación",
      contact: "Contacto",
      confirmationCode: "Código de Confirmación",
      nextSteps: "Próximos Pasos",
      step1: "Revisa WhatsApp para instrucciones de pago del depósito",
      step2: "Recibirás una confirmación una vez recibido el pago",
      step3: "Prepárate para ser transformada",
      shareTicket: "Compartir Ticket",
      close: "Cerrar",
      reserved: "Reservado exclusivamente para ti",
    },
  };

  const text = t[lang];

  // Generate decorative QR code placeholder
  const generateConfirmationCode = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `IVA-${timestamp}-${random}`;
  };

  const confirmationCode = generateConfirmationCode();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative max-w-md w-full"
      >
        {/* Golden Ticket Card */}
        <div className="relative bg-gradient-to-br from-[#D4AF37] via-[#F7E7CE] to-[#D4AF37] rounded-3xl p-1 shadow-2xl">
          {/* Inner Card */}
          <div className="bg-[#1A0F0A] rounded-3xl overflow-hidden">
            {/* Header - Golden Section */}
            <div className="relative bg-gradient-to-br from-[#D4AF37] via-[#F7E7CE] to-[#D4AF37] px-8 py-10 text-center overflow-hidden">
              {/* Decorative Pattern */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%234A0404" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                }}
              />

              {/* Floating particles */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-4 right-8"
              >
                <Sparkles className="w-6 h-6 text-[#4A0404]/30" />
              </motion.div>

              <motion.div
                animate={{
                  y: [10, -10, 10],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-4 left-8"
              >
                <Sparkles className="w-5 h-5 text-[#4A0404]/30" />
              </motion.div>

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full border-2 border-[#4A0404]/20 mb-4"
                >
                  <Check className="w-8 h-8 text-[#4A0404]" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif text-3xl text-[#4A0404] mb-2"
                >
                  {text.subtitle}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm text-[#4A0404]/70 tracking-wider uppercase"
                >
                  {text.confirmed}
                </motion.p>
              </div>
            </div>

            {/* Content - Dark Section */}
            <div className="px-8 py-8 space-y-6">
              {/* Confirmation Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <p className="text-[#F7E7CE] text-sm mb-1">{text.reserved}</p>
                <p className="text-[#D4AF37] font-medium text-lg">{booking.name}</p>
              </motion.div>

              {/* Appointment Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 space-y-4"
              >
                <h3 className="text-[#D4AF37] font-medium text-sm uppercase tracking-wider mb-4">
                  {text.details}
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[#F7E7CE]/60 text-xs">{text.service}</p>
                      <p className="text-[#F7E7CE]">{booking.serviceName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[#F7E7CE]/60 text-xs">{text.dateTime}</p>
                      <p className="text-[#F7E7CE]">{booking.date}</p>
                      <p className="text-[#F7E7CE]/80 text-xs mt-0.5">{booking.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[#F7E7CE]/60 text-xs">{text.location}</p>
                      <p className="text-[#F7E7CE] text-xs">{CONFIG.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative QR Code Area */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-[#D4AF37]/20 text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center relative overflow-hidden">
                  {/* Decorative QR Pattern */}
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-0.5 p-2">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`${Math.random() > 0.5 ? 'bg-[#4A0404]' : 'bg-transparent'} rounded-sm`}
                      />
                    ))}
                  </div>
                  <Sparkles className="w-8 h-8 text-[#D4AF37] relative z-10" />
                </div>
                <p className="text-[#F7E7CE]/60 text-xs mb-2">{text.confirmationCode}</p>
                <p className="text-[#D4AF37] font-mono text-sm tracking-wider">{confirmationCode}</p>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-3"
              >
                <h3 className="text-[#D4AF37] font-medium text-sm uppercase tracking-wider">
                  {text.nextSteps}
                </h3>
                <div className="space-y-2">
                  {[text.step1, text.step2, text.step3].map((step, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0 text-[#D4AF37] text-xs font-medium">
                        {i + 1}
                      </div>
                      <p className="text-[#F7E7CE]/80 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE] text-[#4A0404] font-medium hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all"
              >
                {text.close}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-[#4A0404]/20 rounded-3xl blur-3xl -z-10" />
      </motion.div>
    </div>
  );
}

// Helper function to notify owner (console.log for now, Supabase later)
export function notifyOwner(booking: {
  date: string;
  time: string;
  remainingSlots: number;
  timeBlock: string;
}) {
  console.log('🚨 ¡Alerta Iva! Nueva cita confirmada');
  console.log(`📅 Fecha: ${booking.date}`);
  console.log(`🕐 Bloque: ${booking.timeBlock}`);
  console.log(`📊 Cupos restantes hoy: ${booking.remainingSlots}/2`);
  console.log(`⏱️ Bloque de 4 horas reservado`);
  console.log('-----------------------------------');
}
