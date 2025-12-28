"use client";

/**
 * IVA Nail Art - Stripe Booking System
 * Online deposit payment for appointments
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Calendar,
  Clock,
  Sparkles,
  Check,
  Lock,
  X,
  ChevronRight,
  Shield,
  Info,
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  deposit: number;
  description: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const SERVICES: Service[] = [
  {
    id: "signature-gel",
    name: "Signature Gel Manicure",
    price: 65,
    duration: "60 min",
    deposit: 20,
    description: "Our classic gel manicure with premium 10-free polish",
  },
  {
    id: "3d-art",
    name: "3D Nail Art",
    price: 85,
    duration: "90 min",
    deposit: 25,
    description: "Custom 3D designs with embellishments",
  },
  {
    id: "chrome-art",
    name: "Chrome Art Manicure",
    price: 75,
    duration: "75 min",
    deposit: 25,
    description: "Stunning chrome and holographic finishes",
  },
  {
    id: "spa-pedicure",
    name: "Luxury Spa Pedicure",
    price: 85,
    duration: "75 min",
    deposit: 25,
    description: "Full pedicure with paraffin treatment",
  },
  {
    id: "bridal",
    name: "Bridal Package",
    price: 150,
    duration: "120 min",
    deposit: 50,
    description: "Trial + wedding day nails with custom design",
  },
];

const TIME_SLOTS: TimeSlot[] = [
  { time: "10:00 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "12:00 PM", available: false },
  { time: "1:00 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "3:00 PM", available: false },
  { time: "4:00 PM", available: true },
  { time: "5:00 PM", available: true },
  { time: "6:00 PM", available: true },
];

type BookingStep = "service" | "datetime" | "payment" | "confirmation";

interface StripeBookingProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  language?: "en" | "es";
}

export default function StripeBooking({ isOpen, onClose, preselectedService, language = "en" }: StripeBookingProps) {
  const [step, setStep] = useState<BookingStep>("service");
  const [selectedService, setSelectedService] = useState<Service | null>(
    preselectedService ? SERVICES.find((s) => s.id === preselectedService) || null : null
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const isSpanish = language === "es";

  // Generate available dates (next 30 days, excluding Mondays)
  const getAvailableDates = () => {
    const dates: Date[] = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 1) {
        // Exclude Mondays
        dates.push(date);
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(isSpanish ? "es-ES" : "en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // In production, integrate with Stripe
    // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    // const { error } = await stripe.confirmPayment(...)

    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000));

    setIsProcessing(false);
    setStep("confirmation");
  };

  const resetBooking = () => {
    setStep("service");
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setCardDetails({ number: "", expiry: "", cvc: "", name: "" });
    setEmail("");
    setPhone("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#B76E79] to-[#722F37] px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5" />
              <h2 className="font-serif text-lg">
                {isSpanish ? "Reservar Cita" : "Book Appointment"}
              </h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mt-4">
            {[
              { id: "service", label: isSpanish ? "Servicio" : "Service" },
              { id: "datetime", label: isSpanish ? "Fecha/Hora" : "Date/Time" },
              { id: "payment", label: isSpanish ? "Pago" : "Payment" },
              { id: "confirmation", label: isSpanish ? "Confirmación" : "Confirmation" },
            ].map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step === s.id
                      ? "bg-white text-[#722F37]"
                      : ["service", "datetime", "payment", "confirmation"].indexOf(step) >
                        ["service", "datetime", "payment", "confirmation"].indexOf(s.id)
                      ? "bg-white/80 text-[#722F37]"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {["service", "datetime", "payment", "confirmation"].indexOf(step) >
                  ["service", "datetime", "payment", "confirmation"].indexOf(s.id) ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < 3 && <div className="w-6 h-0.5 bg-white/20 mx-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <AnimatePresence mode="wait">
            {/* Step 1: Service Selection */}
            {step === "service" && (
              <motion.div
                key="service"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="font-medium text-[#1A1A1A] mb-4">
                  {isSpanish ? "Selecciona tu servicio" : "Select your service"}
                </h3>

                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      selectedService?.id === service.id
                        ? "border-[#722F37] bg-[#722F37]/5"
                        : "border-[#EBE8E2] hover:border-[#B76E79]"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-[#1A1A1A]">{service.name}</p>
                        <p className="text-sm text-[#7A7A7A] mt-1">{service.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-sm text-[#7A7A7A]">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {service.duration}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-[#1A1A1A]">${service.price}</p>
                        <p className="text-xs text-[#B76E79]">
                          {isSpanish ? `Depósito: $${service.deposit}` : `Deposit: $${service.deposit}`}
                        </p>
                      </div>
                    </div>

                    {selectedService?.id === service.id && (
                      <div className="absolute right-4 top-4">
                        <Check className="w-5 h-5 text-[#722F37]" />
                      </div>
                    )}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 2: Date & Time Selection */}
            {step === "datetime" && (
              <motion.div
                key="datetime"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Date Selection */}
                <div>
                  <h3 className="font-medium text-[#1A1A1A] mb-4">
                    {isSpanish ? "Selecciona la fecha" : "Select a date"}
                  </h3>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {availableDates.slice(0, 10).map((date) => (
                      <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={`flex-shrink-0 p-3 rounded-xl border text-center min-w-[80px] transition-all ${
                          selectedDate?.toDateString() === date.toDateString()
                            ? "border-[#722F37] bg-[#722F37] text-white"
                            : "border-[#EBE8E2] hover:border-[#B76E79]"
                        }`}
                      >
                        <p className="text-xs uppercase">
                          {date.toLocaleDateString(isSpanish ? "es-ES" : "en-US", { weekday: "short" })}
                        </p>
                        <p className="text-lg font-medium">{date.getDate()}</p>
                        <p className="text-xs">
                          {date.toLocaleDateString(isSpanish ? "es-ES" : "en-US", { month: "short" })}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <h3 className="font-medium text-[#1A1A1A] mb-4">
                      {isSpanish ? "Selecciona la hora" : "Select a time"}
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => slot.available && setSelectedTime(slot.time)}
                          disabled={!slot.available}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            !slot.available
                              ? "border-[#EBE8E2] bg-[#F9F8F6] text-[#D4D0C8] cursor-not-allowed"
                              : selectedTime === slot.time
                              ? "border-[#722F37] bg-[#722F37] text-white"
                              : "border-[#EBE8E2] hover:border-[#B76E79]"
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Order Summary */}
                <div className="bg-[#F9F8F6] rounded-xl p-4">
                  <h4 className="font-medium text-[#1A1A1A] mb-3">
                    {isSpanish ? "Resumen de la Reserva" : "Booking Summary"}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#7A7A7A]">{isSpanish ? "Servicio" : "Service"}</span>
                      <span className="text-[#1A1A1A]">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A7A7A]">{isSpanish ? "Fecha" : "Date"}</span>
                      <span className="text-[#1A1A1A]">{selectedDate && formatDate(selectedDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A7A7A]">{isSpanish ? "Hora" : "Time"}</span>
                      <span className="text-[#1A1A1A]">{selectedTime}</span>
                    </div>
                    <div className="border-t border-[#EBE8E2] my-2 pt-2">
                      <div className="flex justify-between font-medium">
                        <span>{isSpanish ? "Depósito a pagar" : "Deposit due today"}</span>
                        <span className="text-[#722F37]">${selectedService?.deposit}</span>
                      </div>
                      <div className="flex justify-between text-[#7A7A7A] text-xs mt-1">
                        <span>{isSpanish ? "Restante en la cita" : "Due at appointment"}</span>
                        <span>${(selectedService?.price || 0) - (selectedService?.deposit || 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="font-medium text-[#1A1A1A] mb-3">
                    {isSpanish ? "Información de Contacto" : "Contact Information"}
                  </h4>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder={isSpanish ? "Correo electrónico" : "Email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-[#EBE8E2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79]/30"
                    />
                    <input
                      type="tel"
                      placeholder={isSpanish ? "Teléfono" : "Phone"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-[#EBE8E2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79]/30"
                    />
                  </div>
                </div>

                {/* Card Details */}
                <div>
                  <h4 className="font-medium text-[#1A1A1A] mb-3 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    {isSpanish ? "Detalles de la Tarjeta" : "Card Details"}
                  </h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      className="w-full px-4 py-3 border border-[#EBE8E2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79]/30"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        className="w-full px-4 py-3 border border-[#EBE8E2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79]/30"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        value={cardDetails.cvc}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                        className="w-full px-4 py-3 border border-[#EBE8E2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79]/30"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder={isSpanish ? "Nombre en la tarjeta" : "Name on card"}
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      className="w-full px-4 py-3 border border-[#EBE8E2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79]/30"
                    />
                  </div>
                </div>

                {/* Security Note */}
                <div className="flex items-center gap-2 text-xs text-[#7A7A7A]">
                  <Lock className="w-4 h-4" />
                  <span>
                    {isSpanish
                      ? "Pago seguro con encriptación SSL. Procesado por Stripe."
                      : "Secure payment with SSL encryption. Powered by Stripe."}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === "confirmation" && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>

                <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2">
                  {isSpanish ? "¡Reserva Confirmada!" : "Booking Confirmed!"}
                </h3>

                <p className="text-[#7A7A7A] mb-6">
                  {isSpanish
                    ? "Te hemos enviado un correo de confirmación con todos los detalles."
                    : "We've sent you a confirmation email with all the details."}
                </p>

                <div className="bg-[#F9F8F6] rounded-xl p-4 text-left mb-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#7A7A7A]">{isSpanish ? "Servicio" : "Service"}</span>
                      <span className="text-[#1A1A1A]">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A7A7A]">{isSpanish ? "Fecha" : "Date"}</span>
                      <span className="text-[#1A1A1A]">{selectedDate && formatDate(selectedDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A7A7A]">{isSpanish ? "Hora" : "Time"}</span>
                      <span className="text-[#1A1A1A]">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A7A7A]">{isSpanish ? "Depósito pagado" : "Deposit paid"}</span>
                      <span className="text-green-600">${selectedService?.deposit}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-center p-3 bg-blue-50 rounded-xl text-sm text-blue-700 mb-6">
                  <Info className="w-5 h-5" />
                  <span>
                    {isSpanish
                      ? "Te enviaremos un recordatorio 24 horas antes de tu cita."
                      : "We'll send you a reminder 24 hours before your appointment."}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      resetBooking();
                      onClose();
                    }}
                    className="flex-1 py-3 bg-[#722F37] text-white rounded-xl hover:bg-[#5A252C] transition-colors"
                  >
                    {isSpanish ? "Listo" : "Done"}
                  </button>
                  <button
                    onClick={() => window.open("/my-account", "_self")}
                    className="flex-1 py-3 border border-[#EBE8E2] rounded-xl hover:bg-[#F9F8F6] transition-colors flex items-center justify-center gap-2"
                  >
                    {isSpanish ? "Ver Citas" : "View Appointments"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        {step !== "confirmation" && (
          <div className="sticky bottom-0 bg-white border-t border-[#EBE8E2] px-6 py-4 flex gap-3">
            {step !== "service" && (
              <button
                onClick={() => {
                  const steps: BookingStep[] = ["service", "datetime", "payment", "confirmation"];
                  const currentIndex = steps.indexOf(step);
                  setStep(steps[currentIndex - 1]);
                }}
                className="px-6 py-3 border border-[#EBE8E2] rounded-xl hover:bg-[#F9F8F6] transition-colors"
              >
                {isSpanish ? "Atrás" : "Back"}
              </button>
            )}

            <button
              onClick={() => {
                if (step === "service" && selectedService) {
                  setStep("datetime");
                } else if (step === "datetime" && selectedDate && selectedTime) {
                  setStep("payment");
                } else if (step === "payment") {
                  handlePayment();
                }
              }}
              disabled={
                (step === "service" && !selectedService) ||
                (step === "datetime" && (!selectedDate || !selectedTime)) ||
                (step === "payment" && (!email || !phone || !cardDetails.number)) ||
                isProcessing
              }
              className="flex-1 py-3 bg-[#722F37] text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5A252C] transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isSpanish ? "Procesando..." : "Processing..."}
                </>
              ) : step === "payment" ? (
                <>
                  <Lock className="w-4 h-4" />
                  {isSpanish ? `Pagar $${selectedService?.deposit}` : `Pay $${selectedService?.deposit}`}
                </>
              ) : (
                <>
                  {isSpanish ? "Continuar" : "Continue"}
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
