"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Crown,
  Sparkles,
  Calendar,
  Gift,
  Share2,
  Check,
  Clock,
  Phone,
  User,
  Key,
  LogOut,
  Edit3,
  ExternalLink,
  MessageCircle,
  Gem,
  AlertCircle,
  ChevronRight,
  Droplets,
} from "lucide-react";
import CalendlyModal from "./CalendlyModal";
import MobileBookingBar from "./MobileBookingBar";
import { BUSINESS, SITE_URL } from "@/lib/site";

interface ClientPortalProps {
  lang: "en" | "es";
}

interface ClientData {
  id: string;
  name: string;
  phone: string;
  pin?: string;
  email?: string;
  preferredShape: "Almond" | "Coffin" | "Square" | "Oval" | "Stiletto";
  service: string;
  lastApptDate: string;
  totalVisits: number;
  notes: string;
  stamps: number;
  tier: "Alabaster" | "Champagne Gold" | "Obsidian VIP";
  daysSinceLastAppt: number;
  refillWindow?: {
    start: string;
    end: string;
    daysRemainingForIdealWindow: number;
  };
  referralCode?: string;
  referralCredits?: number;
}

const SHAPES: Array<ClientData["preferredShape"]> = ["Almond", "Coffin", "Square", "Oval", "Stiletto"];

export default function ClientPortalDashboard({ lang }: ClientPortalProps) {
  const isEs = lang === "es";

  // Auth States
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [phoneInput, setPhoneInput] = useState("");
  const [pinInput, setPinInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [shapeInput, setShapeInput] = useState<ClientData["preferredShape"]>("Almond");
  const [serviceInput, setServiceInput] = useState("Builder Gel Manicure (BIAB)");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Logged-in State
  const [client, setClient] = useState<ClientData | null>(null);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Read URL query and localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check query params
    const params = new URLSearchParams(window.location.search);
    const phoneParam = params.get("phone");
    if (phoneParam) {
      setPhoneInput(phoneParam);
    }

    // Check saved session in localStorage
    try {
      const savedSession = localStorage.getItem("iva_client_portal_session");
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed && parsed.phone) {
          // Auto login with saved session
          setClient(parsed);
          // Refresh data in background
          fetch(`/api/clients/portal?phone=${parsed.phone}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.success && data.client) {
                setClient(data.client);
                localStorage.setItem("iva_client_portal_session", JSON.stringify(data.client));
              }
            })
            .catch(() => {});
        }
      }
    } catch {}
  }, []);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const res = await fetch("/api/clients/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          phone: phoneInput,
          pin: pinInput || "1234",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.error || (isEs ? "Error al iniciar sesión." : "Login failed."));
        return;
      }

      setClient(data.client);
      localStorage.setItem("iva_client_portal_session", JSON.stringify(data.client));
    } catch {
      setAuthError(isEs ? "Error de conexión. Intenta de nuevo." : "Connection error. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    if (!nameInput.trim()) {
      setAuthError(isEs ? "Por favor ingresa tu nombre completo." : "Please enter your full name.");
      setAuthLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/clients/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          name: nameInput,
          phone: phoneInput,
          pin: pinInput || "1234",
          preferredShape: shapeInput,
          service: serviceInput,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.error || (isEs ? "Error al registrarse." : "Registration failed."));
        return;
      }

      setClient(data.client);
      localStorage.setItem("iva_client_portal_session", JSON.stringify(data.client));
    } catch {
      setAuthError(isEs ? "Error de conexión. Intenta de nuevo." : "Connection error. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Update Preferred Shape in live profile
  const handleUpdateShape = async (newShape: ClientData["preferredShape"]) => {
    if (!client) return;
    const updated = { ...client, preferredShape: newShape };
    setClient(updated);
    localStorage.setItem("iva_client_portal_session", JSON.stringify(updated));

    try {
      await fetch("/api/clients/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_preferences",
          phone: client.phone,
          preferredShape: newShape,
        }),
      });
      setSaveSuccessMsg(isEs ? "¡Forma preferida actualizada!" : "Preferred shape updated!");
      setTimeout(() => setSaveSuccessMsg(null), 3000);
    } catch {}
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("iva_client_portal_session");
    } catch {}
    setClient(null);
  };

  const handleCopyReferral = async () => {
    if (!client) return;
    const refCode = client.referralCode || `IVA-${client.name.split(" ")[0].toUpperCase()}`;
    const link = `${SITE_URL}/${isEs ? "es/" : ""}vip-club?ref=${refCode}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopiedReferral(true);
      setTimeout(() => setCopiedReferral(false), 3000);
    } catch {}
  };

  const shareWhatsAppReferral = () => {
    if (!client) return;
    const refCode = client.referralCode || `IVA-${client.name.split(" ")[0].toUpperCase()}`;
    const link = `${SITE_URL}/${isEs ? "es/" : ""}vip-club?ref=${refCode}`;
    const text = isEs
      ? `¡Hola! ✨ Te regalo $15 de descuento para consentir tus uñas en IVA Nail Art (Bay Ridge, Brooklyn) usando mi código ${refCode}. Reserva tu cita con mi pase aquí: ${link} 💅`
      : `Hi! ✨ Here is a $15 gift toward your first luxury manicure at IVA Nail Art in Bay Ridge, Brooklyn using my code ${refCode}. Book with my pass here: ${link} 💅`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const askIvanniaWhatsApp = () => {
    const text = isEs
      ? `¡Hola Ivannía! Te escribo desde mi Portal VIP de IVA Nail Art. Tengo una consulta sobre mi próximo diseño / cita 🤍`
      : `Hi Ivannía! Contacting you from my IVA Nail Art VIP Portal. I have a question regarding my next set / appointment 🤍`;
    window.open(`https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Open booking modal preselected for refill
  const openRefillBooking = () => {
    setIsCalendlyOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0E0706] text-[#F4EBE1] selection:bg-[#D4A574]/30 selection:text-white pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-[#D4A574]/20 bg-[#0E0706]/95 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link
            href={isEs ? "/es" : "/"}
            className="flex items-center gap-2.5 text-xs text-[#D4A574] hover:text-white transition-colors"
          >
            <div className="relative h-7 w-7 rounded-lg overflow-hidden border border-[#D4A574]/40 p-0.5 bg-[#170c0a]">
              <Image src="/logo-iva.png" alt="IVA Nail Art" width={28} height={28} className="object-contain" />
            </div>
            <span className="font-display font-medium tracking-[0.2em] text-sm">IVA NAIL ART NY</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <Link
              href={isEs ? "/portal" : "/es/portal"}
              className="text-xs text-[#F4EBE1]/70 hover:text-[#D4A574] transition-colors border border-[#D4A574]/20 rounded-lg px-2.5 py-1"
            >
              {isEs ? "EN" : "ES"}
            </Link>

            {client && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs text-[#F4EBE1]/70 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors border border-white/10"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{isEs ? "Salir" : "Log out"}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ================= SCREEN 1: LOGIN / REGISTER ================= */}
      {!client ? (
        <main className="max-w-md mx-auto px-4 py-12 sm:py-20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D4A574] via-[#722F37] to-[#170c0a] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#D4A574]/40 shadow-xl shadow-[#D4A574]/15">
              <Crown className="w-8 h-8 text-[#F4EBE1]" />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-light text-[#F4EBE1]">
              {isEs ? "Portal VIP de Clientas" : "VIP Client Sanctuary Portal"}
            </h1>
            <p className="text-xs sm:text-sm text-[#F4EBE1]/65 mt-2">
              {isEs
                ? "Consulta tus sellos, tus preferencias de uña y agenda tu refill en 1 toque."
                : "View your loyalty stamps, manage your nail shape profile & schedule your refill in 1 tap."}
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl border border-[#D4A574]/40 bg-[#160b09]/90 backdrop-blur-xl p-6 sm:p-7 shadow-2xl space-y-5">
            {/* Toggle Mode */}
            <div className="grid grid-cols-2 p-1 bg-black/40 rounded-xl border border-white/10 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`py-2 rounded-lg transition-all ${
                  authMode === "login"
                    ? "bg-gradient-to-r from-[#D4A574] via-[#E8C9A8] to-[#B8864E] text-[#0E0706] shadow"
                    : "text-[#F4EBE1]/70 hover:text-white"
                }`}
              >
                {isEs ? "Ya soy Clienta (Entrar)" : "Log In"}
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className={`py-2 rounded-lg transition-all ${
                  authMode === "register"
                    ? "bg-gradient-to-r from-[#D4A574] via-[#E8C9A8] to-[#B8864E] text-[#0E0706] shadow"
                    : "text-[#F4EBE1]/70 hover:text-white"
                }`}
              >
                {isEs ? "Primera Vez (Crear)" : "New Client"}
              </button>
            </div>

            {authError && (
              <div className="p-3 bg-rose-500/15 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={authMode === "login" ? handleLogin : handleRegister} className="space-y-4">
              {authMode === "register" && (
                <div>
                  <label className="text-[11px] uppercase font-semibold text-[#D4A574] tracking-wider block mb-1">
                    {isEs ? "Tu Nombre Completo *" : "Full Name *"}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder={isEs ? "ej. Camila Ramos" : "e.g. Camila Ramos"}
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-black/50 border border-white/15 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#D4A574]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] uppercase font-semibold text-[#D4A574] tracking-wider block mb-1">
                  {isEs ? "Tu Número de Teléfono *" : "Phone Number (10 digits) *"}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="929-555-0182"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-black/50 border border-white/15 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#D4A574]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase font-semibold text-[#D4A574] tracking-wider block mb-1">
                  {isEs ? "PIN de Seguridad (4 dígitos)" : "4-Digit Security PIN"}
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    maxLength={6}
                    placeholder="1234"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-black/50 border border-white/15 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#D4A574]"
                  />
                </div>
                <p className="text-[10px] text-white/40 mt-1">
                  {isEs
                    ? "💡 Si no recuerdas haber creado uno, usa 1234."
                    : "💡 Default studio PIN is 1234."}
                </p>
              </div>

              {authMode === "register" && (
                <div>
                  <label className="text-[11px] uppercase font-semibold text-[#D4A574] tracking-wider block mb-1">
                    {isEs ? "Forma de Uña Preferida" : "Preferred Nail Shape"}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {SHAPES.map((shape) => (
                      <button
                        key={shape}
                        type="button"
                        onClick={() => setShapeInput(shape)}
                        className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                          shapeInput === shape
                            ? "border-[#D4A574] bg-[#D4A574]/20 text-[#D4A574]"
                            : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                        }`}
                      >
                        {shape}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-semibold text-[#D4A574] tracking-wider block mb-1">
                      {isEs ? "Servicio Principal" : "Primary Service"}
                    </label>
                    <select
                      value={serviceInput}
                      onChange={(e) => setServiceInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-black/50 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D4A574]"
                    >
                      <option value="Builder Gel Manicure (BIAB)">Builder Gel Manicure (BIAB)</option>
                      <option value="Russian Dry Manicure">Russian Dry Manicure</option>
                      <option value="Set Completo de Acrílico">Set Completo de Acrílico</option>
                      <option value="Relleno de Acrílico">Relleno de Acrílico</option>
                      <option value="Japanese Hard Gel">Japanese Hard Gel</option>
                    </select>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4A574] via-[#E8C9A8] to-[#B8864E] text-[#0E0706] text-xs font-semibold uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-2"
              >
                {authLoading
                  ? isEs ? "Verificando..." : "Verifying..."
                  : authMode === "login"
                  ? isEs ? "Entrar a mi Portal" : "Access My Sanctuary"
                  : isEs ? "Crear mi Cuenta VIP" : "Create My VIP Account"}
              </button>
            </form>

            <div className="pt-3 border-t border-white/10 text-center">
              <button
                type="button"
                onClick={askIvanniaWhatsApp}
                className="text-[11px] text-[#D4A574] hover:underline flex items-center justify-center gap-1 mx-auto"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>{isEs ? "¿Dudas con tu acceso? Escríbele a Ivannía" : "Need help? Message Ivannía directly"}</span>
              </button>
            </div>
          </div>
        </main>
      ) : (
        /* ================= SCREEN 2: ACTIVE CLIENT DASHBOARD ================= */
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
          {/* Welcome Greeting Banner */}
          <div className="relative rounded-3xl border border-[#D4A574]/40 bg-gradient-to-br from-[#1c0f0e] via-[#140807] to-[#0A0404] p-6 sm:p-8 overflow-hidden shadow-2xl">
            <div className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 bg-[#D4A574]/15 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A574]/40 bg-[#D4A574]/10 px-3 py-0.5 text-xs text-[#D4A574] font-medium uppercase tracking-wider mb-3">
                  <Crown className="w-3.5 h-3.5" />
                  <span>{client.tier}</span>
                </div>
                <h1 className="font-display text-2xl sm:text-4xl font-light text-[#F4EBE1]">
                  {isEs ? "Bienvenida," : "Welcome back,"}{" "}
                  <span className="font-serif italic text-[#D4A574]">{client.name}</span>
                </h1>
                <p className="text-xs sm:text-sm text-[#F4EBE1]/70 mt-1 max-w-md">
                  {isEs
                    ? "Tu santuario de manicura rusa y builder gel en Bay Ridge. Gestiona tus citas, sellos y preferencias."
                    : "Your private Russian manicure & builder gel sanctuary in Bay Ridge. Manage refills, stamps, and style preferences."}
                </p>
              </div>

              {/* Direct Booking CTA */}
              <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5">
                <button
                  onClick={openRefillBooking}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4A574] via-[#E8C9A8] to-[#B8864E] px-6 py-3 text-xs font-semibold text-[#0E0706] uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isEs ? "Agendar mi Próximo Refill" : "Schedule My Next Refill"}</span>
                </button>

                <button
                  onClick={askIvanniaWhatsApp}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs text-[#F4EBE1] hover:bg-white/10 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>{isEs ? "Consultar por WhatsApp" : "Ask Ivannía via WhatsApp"}</span>
                </button>
              </div>
            </div>
          </div>

          {saveSuccessMsg && (
            <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-[#160b09] border border-[#D4A574]/25 p-4 rounded-2xl">
              <span className="text-[10px] uppercase tracking-wider text-[#D4A574] font-semibold block mb-1">
                {isEs ? "Sellos Acumulados" : "Loyalty Stamps"}
              </span>
              <span className="font-serif text-3xl text-white font-medium">{client.stamps} / 6</span>
            </div>

            <div className="bg-[#160b09] border border-[#D4A574]/25 p-4 rounded-2xl">
              <span className="text-[10px] uppercase tracking-wider text-[#D4A574] font-semibold block mb-1">
                {isEs ? "Total de Visitas" : "Total Visits"}
              </span>
              <span className="font-serif text-3xl text-white font-medium">{client.totalVisits}</span>
            </div>

            <div className="bg-[#160b09] border border-[#D4A574]/25 p-4 rounded-2xl">
              <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold block mb-1">
                {isEs ? "Edad del Set Actual" : "Current Set Age"}
              </span>
              <span className="font-serif text-3xl text-amber-300 font-medium">
                {client.daysSinceLastAppt} {isEs ? "días" : "days"}
              </span>
            </div>

            <div className="bg-[#160b09] border border-[#D4A574]/25 p-4 rounded-2xl">
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                {isEs ? "Créditos de Referidos" : "Referral Credits"}
              </span>
              <span className="font-serif text-3xl text-emerald-300 font-medium">${client.referralCredits || 0}</span>
            </div>
          </div>

          {/* Section 1: Digital VIP Loyalty Card */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-[#F4EBE1] flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#D4A574]" />
                <span>{isEs ? "Tu Pase Digital Sanctuary Circle" : "Your Sanctuary Circle Pass"}</span>
              </h2>
              <span className="text-xs text-[#D4A574] font-medium">
                {client.stamps >= 6
                  ? isEs ? "¡Premio Disponible!" : "Reward Ready!"
                  : isEs ? `Faltan ${6 - client.stamps} sellos para tu set gratis` : `${6 - client.stamps} stamps to complimentary set`}
              </span>
            </div>

            <div className="rounded-3xl border-2 border-[#D4A574]/50 bg-gradient-to-b from-[#1c0f0e] via-[#120807] to-[#0A0404] p-6 sm:p-7 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#D4A574]/20">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl border border-[#D4A574]/40 p-1 bg-[#0E0706] flex items-center justify-center">
                    <Image src="/logo-iva.png" alt="IVA" width={28} height={28} className="object-contain" />
                  </div>
                  <div>
                    <p className="font-display text-xs tracking-[0.2em] uppercase font-semibold text-[#D4A574]">
                      SANCTUARY PASS
                    </p>
                    <p className="text-[10px] text-[#F4EBE1]/60">IVA Nail Art NY · Bay Ridge</p>
                  </div>
                </div>

                <span className="text-[10px] font-semibold tracking-wider text-[#D4A574] uppercase rounded-full bg-[#D4A574]/15 px-3 py-1 border border-[#D4A574]/30">
                  {client.tier}
                </span>
              </div>

              {/* 6 Stamps Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[1, 2, 3, 4, 5, 6].map((num) => {
                  const isEarned = num <= client.stamps;
                  const isSixth = num === 6;

                  return (
                    <div
                      key={num}
                      className={`h-20 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        isEarned
                          ? isSixth
                            ? "border-[#D4A574] bg-gradient-to-br from-[#D4A574]/30 to-[#B8864E]/20 text-[#D4A574] shadow-lg shadow-[#D4A574]/20 scale-105"
                            : "border-[#D4A574]/60 bg-[#D4A574]/15 text-[#D4A574]"
                          : "border-white/10 bg-white/5 text-white/20"
                      }`}
                    >
                      {isEarned ? (
                        isSixth ? (
                          <>
                            <Crown className="w-6 h-6 text-[#D4A574]" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4A574]">
                              {isEs ? "PREMIO" : "REWARD"}
                            </span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 text-[#D4A574]" />
                            <span className="text-[11px] font-serif font-semibold">#{num}</span>
                          </>
                        )
                      ) : (
                        <>
                          <Gem className="w-4 h-4 opacity-30" />
                          <span className="text-[10px] font-light">#{num}</span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-3.5 bg-[#170c0a] rounded-2xl border border-[#D4A574]/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <Gift className="w-4 h-4 text-[#D4A574]" />
                  <span>
                    {client.stamps >= 6
                      ? isEs
                        ? "¡Completaste tu ciclo de 6 sellos! Tu próxima manicura de autor es de cortesía."
                        : "You've completed your 6 stamps! Your next signature nail ritual is complimentary."
                      : isEs
                      ? `Recompensa del 6to sello: Manicura de autor de cortesía`
                      : `6th Stamp Reward: Complimentary bespoke signature manicure`}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Smart Refill Auto-Scheduler & Nail Health Window */}
          <section className="rounded-3xl border border-[#D4A574]/30 bg-[#140908] p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#D4A574]" />
                <h3 className="font-serif text-lg text-white">
                  {isEs ? "Ventana Óptima de Refill (Salud de tu Uña)" : "Optimal Refill Window & Nail Health"}
                </h3>
              </div>
              <span
                className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                  client.daysSinceLastAppt >= 28
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                    : client.daysSinceLastAppt >= 21
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse"
                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                }`}
              >
                {client.daysSinceLastAppt >= 28
                  ? isEs ? "Refill Recomendado Ahora" : "Refill Due Now"
                  : client.daysSinceLastAppt >= 21
                  ? isEs ? "Momento Perfecto Esta Semana" : "Perfect Refill Window"
                  : isEs ? "Set en Perfecto Estado" : "Set in Prime Condition"}
              </span>
            </div>

            <p className="text-xs text-[#F4EBE1]/75 leading-relaxed">
              {isEs
                ? `Tu último servicio fue el ${client.lastApptDate} (${client.daysSinceLastAppt} días transcurridos). A partir de la 3ra y 4ta semana, el centro de gravedad (ápice) del builder gel se desplaza hacia la punta. Agendar en tu ventana previene desprendimientos y evita quiebres en tu uña natural.`
                : `Your last appointment was on ${client.lastApptDate} (${client.daysSinceLastAppt} days elapsed). Between weeks 3 and 4, the structural apex shifts toward the free edge. Rebalancing during this window protects your natural nail plate.`}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={openRefillBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4A574] via-[#E8C9A8] to-[#B8864E] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0E0706] hover:brightness-110 active:scale-95 transition-all shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>{isEs ? "Abrir Calendario de Citas" : "Open Refill Calendar"}</span>
              </button>

              <button
                onClick={askIvanniaWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-xs text-[#F4EBE1] hover:bg-white/10 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>{isEs ? "Consultar Horarios Especiales" : "Inquire via WhatsApp"}</span>
              </button>
            </div>
          </section>

          {/* Section 3: My Nail Profile & Style Customizer */}
          <section className="rounded-3xl border border-[#D4A574]/30 bg-[#140908] p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#D4A574]" />
                <h3 className="font-serif text-lg text-white">
                  {isEs ? "Tu Ficha de Estilo en el Atelier" : "Your Atelier Nail Profile"}
                </h3>
              </div>
              <span className="text-[10px] text-[#F4EBE1]/60 uppercase tracking-wider">
                {isEs ? "Toca para cambiar" : "Tap to update"}
              </span>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#D4A574] font-semibold block mb-2">
                {isEs ? "Forma de Uña Favorita:" : "Preferred Nail Shape:"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {SHAPES.map((shape) => {
                  const isSelected = client.preferredShape === shape;
                  return (
                    <button
                      key={shape}
                      type="button"
                      onClick={() => handleUpdateShape(shape)}
                      className={`py-3 px-3 rounded-2xl text-xs font-medium border text-center transition-all ${
                        isSelected
                          ? "border-[#D4A574] bg-gradient-to-br from-[#D4A574]/25 to-[#722F37]/20 text-[#D4A574] font-semibold shadow-md scale-102"
                          : "border-white/10 bg-white/5 text-[#F4EBE1]/70 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {shape}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-[#170c0a] rounded-xl border border-white/10">
                <span className="text-white/50 block text-[10px] uppercase font-semibold">
                  {isEs ? "Servicio Habitual:" : "Primary Service:"}
                </span>
                <span className="text-white font-medium mt-0.5 block">{client.service}</span>
              </div>

              <div className="p-3 bg-[#170c0a] rounded-xl border border-white/10">
                <span className="text-white/50 block text-[10px] uppercase font-semibold">
                  {isEs ? "Teléfono Registrado:" : "Registered Phone:"}
                </span>
                <span className="text-white font-medium mt-0.5 block">{client.phone}</span>
              </div>
            </div>

            {client.notes && (
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-[#F4EBE1]/80 italic">
                &quot;{client.notes}&quot;
              </div>
            )}
          </section>

          {/* Section 4: Referral Center (Give $15, Get $15) */}
          <section className="rounded-3xl border border-[#D4A574]/30 bg-[#140908] p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#D4A574]" />
              <h3 className="font-serif text-lg text-white">
                {isEs ? "Programa de Embajadoras (Regala $15, Gana $15)" : "Ambassador Program (Give $15, Get $15)"}
              </h3>
            </div>

            <p className="text-xs text-[#F4EBE1]/75 leading-relaxed">
              {isEs
                ? "Comparte tu enlace de recomendación con amigas y compañeras. Ellas reciben $15 de descuento en su primera visita a IVA Nail Art, y tú ganas $15 de crédito en tu cuenta por cada amiga que asista."
                : "Share your personal invitation with friends. They receive $15 off their first appointment at IVA Nail Art, and you earn $15 studio credit for each friend who visits."}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="p-3 bg-[#170c0a] rounded-xl border border-[#D4A574]/30 text-xs font-mono font-bold text-[#D4A574] text-center sm:text-left flex-1">
                {client.referralCode || `IVA-${client.name.split(" ")[0].toUpperCase()}`}
              </div>

              <button
                onClick={shareWhatsAppReferral}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white px-5 py-3 text-xs font-semibold hover:brightness-105 active:scale-95 transition-all shadow-md"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isEs ? "Compartir por WhatsApp" : "Share via WhatsApp"}</span>
              </button>

              <button
                onClick={handleCopyReferral}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-xs text-[#F4EBE1] hover:bg-white/10 transition-all"
              >
                {copiedReferral ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ExternalLink className="w-3.5 h-3.5" />}
                <span>{copiedReferral ? (isEs ? "¡Copiado!" : "Copied!") : (isEs ? "Copiar Enlace" : "Copy Link")}</span>
              </button>
            </div>
          </section>

          {/* Section 5: Studio Aftercare 3 Golden Rules */}
          <section className="rounded-3xl border border-white/10 bg-[#140908] p-6 sm:p-7 space-y-3">
            <h3 className="font-serif text-base text-white flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-400" />
              <span>{isEs ? "Tus 3 Reglas de Oro para un Set Impecable" : "3 Golden Rules for 4-Week Retention"}</span>
            </h3>

            <div className="grid sm:grid-cols-3 gap-3 text-xs text-[#F4EBE1]/75">
              <div className="p-3 bg-[#170c0a] rounded-xl border border-white/10 space-y-1">
                <span className="font-semibold text-white block">1. Aceite Diario</span>
                <p className="text-[11px] leading-relaxed">Aplica aceite de jojoba en tus cutículas todas las noches para mantener el builder gel flexible.</p>
              </div>

              <div className="p-3 bg-[#170c0a] rounded-xl border border-white/10 space-y-1">
                <span className="font-semibold text-white block">2. Yemas, No Uñas</span>
                <p className="text-[11px] leading-relaxed">Usa las yemas de tus dedos para abrir latas o cajas para proteger el ápice de la uña.</p>
              </div>

              <div className="p-3 bg-[#170c0a] rounded-xl border border-white/10 space-y-1">
                <span className="font-semibold text-white block">3. Guantes en Casa</span>
                <p className="text-[11px] leading-relaxed">Usa guantes al limpiar con químicos o lavar platos prolongadamente.</p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <Link
                href={isEs ? "/es/aftercare" : "/aftercare"}
                className="text-xs text-[#D4A574] hover:underline inline-flex items-center gap-1"
              >
                <span>{isEs ? "Ver guía completa de cuidados" : "View complete aftercare guide"}</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </section>
        </main>
      )}

      {/* Calendly Booking Modal */}
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        lang={lang}
        prefilledService={client?.service || "Builder Gel Manicure (BIAB)"}
      />

      {/* Mobile Booking Bar */}
      <MobileBookingBar lang={lang} onBookClick={() => setIsCalendlyOpen(true)} />
    </div>
  );
}
