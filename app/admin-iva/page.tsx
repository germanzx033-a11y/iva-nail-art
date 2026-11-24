"use client";

/**
 * IVA-PULSE: Luxury Admin Dashboard
 * "The Sanctuary Command Center"
 * Designed for Iva - Mother, Artist, Entrepreneur
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminWhatsAppScripts from "@/app/components/AdminWhatsAppScripts";
import AdminQuoteBuilder from "@/app/components/AdminQuoteBuilder";
import AdminClientCRM from "@/app/components/AdminClientCRM";
import AdminGoogleMapsKit from "@/app/components/AdminGoogleMapsKit";
import AdminContentEditor from "@/app/components/AdminContentEditor";
import AdminBackupRestore from "@/app/components/AdminBackupRestore";
import AdminWeeklyAvailability from "@/app/components/AdminWeeklyAvailability";
import AdminAnnouncementEditor from "@/app/components/AdminAnnouncementEditor";
import AdminBeforeAfterEditor from "@/app/components/AdminBeforeAfterEditor";
import {
  LayoutTemplate,
  Moon,
  Sun,
  Calendar,
  DollarSign,
  Users,
  MessageCircle,
  RefreshCw,
  Shield,
  Clock,
  Phone,
  Mail,
  AlertTriangle,
  LogOut,
  TrendingUp,
  Star,
  Gift,
  Crown,
  Bell,
  CheckCircle,
  XCircle,
  Eye,
  Heart,
  Sparkles,
  Baby,
  Zap,
  Target,
  Award,
  Coffee,
  Sunrise,
  Sunset,
  MapPin,
  Printer,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

// =============================================
// TYPES
// =============================================

interface DailyBrief {
  date: string;
  formattedDate: string;
  appStatus: "ACTIVE" | "REST";
  bookings: {
    count: number;
    maxCapacity: number;
    revenue: number;
  };
  waitlist: {
    count: number;
    highPriority: number;
  };
  slots: {
    morning: boolean;
    afternoon: boolean;
  };
}

interface WaitlistEntry {
  email: string;
  phone: string;
  name: string;
  vibe: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  createdAt: number;
  lastNotifiedAt?: number;
}

interface Analytics {
  weeklyRevenue: number;
  weeklyChange: number;
  monthlyBookings: number;
  monthlyChange: number;
  avgRating: number;
  totalReviews: number;
  topServices: { name: string; count: number; revenue: number }[];
  loyaltyMembers: number;
  referrals: number;
  conversionRate: number;
}

interface Notification {
  id: string;
  type: "booking" | "review" | "loyalty" | "referral" | "system";
  message: string;
  time: string;
  read: boolean;
}

// =============================================
// HAPTIC FEEDBACK
// =============================================

const triggerHaptic = (type: "light" | "medium" | "heavy" = "medium") => {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    const patterns = { light: [10], medium: [20, 50, 20], heavy: [50, 100, 50] };
    navigator.vibrate(patterns[type]);
  }
};

// =============================================
// LUXURY METRICS DATA
// =============================================

const LUXURY_METRICS = {
  dailySlots: 2,
  workingDays: 22,
  avgTicket: 145,
  monthlyTarget: 6380,
  hoursSavedDaily: 6, // vs traditional salon
};

// =============================================
// ADMIN PAGE
// =============================================

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [brief, setBrief] = useState<DailyBrief | null>(null);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "content" | "clients" | "portal" | "gmaps" | "scripts" | "waitlist" | "analytics" | "ezra">("dashboard");
  const [copiedPortalLink, setCopiedPortalLink] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Check persisted session via cookie/token on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedToken = localStorage.getItem("iva_admin_key") || "";
        const res = await fetch("/api/admin/brief", {
          headers: savedToken ? { Authorization: `Bearer ${savedToken}` } : {},
        });
        if (res.ok) {
          if (savedToken) setAdminKey(savedToken);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          try {
            localStorage.removeItem("iva_admin_key");
          } catch {}
        }
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async () => {
    const key = adminKey.trim();
    if (!key) {
      setLoginError("Por favor ingresa la clave de administradora.");
      return;
    }

    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: key }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        triggerHaptic("medium");
        setIsAuthenticated(true);
        const token = data.token || key;
        setAdminKey(token);
        try {
          localStorage.setItem("iva_admin_key", token);
        } catch {}
      } else {
        triggerHaptic("heavy");
        setLoginError(data.error || "Clave de acceso incorrecta.");
      }
    } catch (err) {
      console.error("Login request error:", err);
      setLoginError("Error de conexión al validar credenciales.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // =============================================
  // FETCH DATA
  // =============================================

  const fetchBrief = useCallback(async () => {
    if (!adminKey) return;

    setIsLoading(true);
    setError(null);

    try {
      const [briefRes, waitlistRes] = await Promise.all([
        fetch("/api/admin/brief", {
          headers: { Authorization: `Bearer ${adminKey}` },
        }),
        fetch("/api/waitlist", {
          headers: { Authorization: `Bearer ${adminKey}` },
        }),
      ]);

      if (briefRes.ok) {
        const briefData = await briefRes.json();
        setBrief(briefData);
      } else {
        setError("Failed to fetch data");
      }

      if (waitlistRes.ok) {
        const waitlistData = await waitlistRes.json();
        setWaitlist(waitlistData.entries || []);
      }

      // Enhanced analytics data
      setAnalytics({
        weeklyRevenue: 2175,
        weeklyChange: 15.3,
        monthlyBookings: 38,
        monthlyChange: 12.5,
        avgRating: 5.0,
        totalReviews: 127,
        topServices: [
          { name: "The Purest Ritual", count: 18, revenue: 2070 },
          { name: "Maternity Sanctuary", count: 12, revenue: 1920 },
          { name: "Recovery & Health", count: 8, revenue: 1160 },
        ],
        loyaltyMembers: 89,
        referrals: 23,
        conversionRate: 82.5,
      });

      setNotifications([
        { id: "1", type: "booking", message: "New booking: Sarah M. - Maternity Sanctuary", time: "2 min ago", read: false },
        { id: "2", type: "review", message: "5-star review from Emily R.: 'Absolutely magical!'", time: "1 hour ago", read: false },
        { id: "3", type: "loyalty", message: "Jessica T. reached Gold tier!", time: "3 hours ago", read: true },
        { id: "4", type: "referral", message: "Amanda L. referred a new expecting mom", time: "Yesterday", read: true },
      ]);
    } catch {
      setError("Connection error");
    } finally {
      setIsLoading(false);
    }
  }, [adminKey]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBrief();
    }
  }, [isAuthenticated, fetchBrief]);

  // =============================================
  // TOGGLE GHOST MODE
  // =============================================

  const toggleGhostMode = async () => {
    if (!adminKey) return;

    setIsToggling(true);
    triggerHaptic("heavy");

    try {
      const res = await fetch("/api/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify({ action: "toggle" }),
      });

      if (res.ok) {
        const data = await res.json();
        setBrief((prev) => (prev ? { ...prev, appStatus: data.status } : null));
        triggerHaptic("light");
      }
    } catch {
      setError("Failed to toggle");
    } finally {
      setIsToggling(false);
    }
  };

  // =============================================
  // SMS CONCIERGE (the studio does not use WhatsApp)
  // =============================================

  const openSmsConcierge = (entry: WaitlistEntry) => {
    triggerHaptic("light");
    const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    const message = `Hi ${entry.name}! This is IVA Nail Art. We have an exclusive opening today (${today}) and the spot is yours. Would you like to confirm?`;
    const phone = entry.phone.replace(/\D/g, "");
    // "?&body=" is the form that both iOS and Android accept for a pre-filled text message
    window.location.href = `sms:${phone}?&body=${encodeURIComponent(message)}`;
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const isResting = brief?.appStatus === "REST";

  // Calculate profitability metrics
  const monthlyRevenue = analytics ? analytics.weeklyRevenue * 4.3 : 0;
  const progressToTarget = analytics ? (monthlyRevenue / LUXURY_METRICS.monthlyTarget) * 100 : 0;
  const ezraHoursSaved = LUXURY_METRICS.hoursSavedDaily * LUXURY_METRICS.workingDays;

  // Get greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { text: "Good Morning", icon: Sunrise, color: "from-amber-400 to-orange-500" };
    if (hour < 18) return { text: "Good Afternoon", icon: Sun, color: "from-yellow-400 to-amber-500" };
    return { text: "Good Evening", icon: Sunset, color: "from-purple-400 to-pink-500" };
  };

  const greeting = getGreeting();

  // =============================================
  // LOGIN SCREEN
  // =============================================

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center p-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#B76E79]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#722F37]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8C6239]/10 rounded-full blur-3xl" />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="w-24 h-24 bg-gradient-to-br from-[#B76E79] via-[#722F37] to-[#5A252C] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#722F37]/30"
            >
              <span className="text-white font-serif text-4xl">IVA</span>
            </motion.div>
            <h1 className="font-serif text-4xl text-white mb-2">Sanctuary Control</h1>
            <p className="text-white/50 text-sm tracking-wider">Your business, beautifully managed</p>
          </div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl space-y-6"
          >
            <div>
              <label className="text-xs uppercase tracking-widest text-white/70 block mb-3 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#E8C9A8]" />
                Clave Secreta de Administradora
              </label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => {
                  setAdminKey(e.target.value);
                  if (loginError) setLoginError(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && !isLoggingIn && handleLogin()}
                className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-[#E8C9A8] focus:bg-white/10 transition-all text-white placeholder-white/30 text-sm"
                placeholder="Introduce tu clave privada..."
                disabled={isLoggingIn}
                autoFocus
              />
            </div>

            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2.5"
              >
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{loginError}</span>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: isLoggingIn ? 1 : 1.02 }}
              whileTap={{ scale: isLoggingIn ? 1 : 0.98 }}
              onClick={() => !isLoggingIn && handleLogin()}
              disabled={isLoggingIn}
              className="w-full py-4 bg-gradient-to-r from-[#B76E79] via-[#722F37] to-[#5A252C] text-white text-xs sm:text-sm uppercase tracking-widest font-semibold rounded-xl hover:shadow-lg hover:shadow-[#722F37]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verificando...</span>
                </>
              ) : (
                <span>Ingresar al Santuario</span>
              )}
            </motion.button>
          </motion.div>

          <p className="text-center text-white/40 text-xs mt-8 tracking-wide font-mono">
            Acceso Privado y Cifrado • Atelier Bay Ridge
          </p>
        </motion.div>
      </main>
    );
  }

  // =============================================
  // MAIN DASHBOARD
  // =============================================

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FAF9F7] via-[#F5F3F0] to-[#EDE9E3] w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#EBE8E2] w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
            <motion.div
              whileHover={{ rotate: 5 }}
              className="w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-br from-[#B76E79] via-[#722F37] to-[#5A252C] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md shadow-[#722F37]/20 flex-shrink-0"
            >
              <span className="text-white font-serif text-sm sm:text-xl">IVA</span>
            </motion.div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <greeting.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#722F37]" />
                <h1 className="font-serif text-sm sm:text-xl text-[#1A1A1A] truncate">{greeting.text}, Iva</h1>
              </div>
              <p className="text-[10px] sm:text-xs text-[#7A7A7A] truncate">
                {currentTime.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Live Status */}
            <div className={`flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${isResting ? "bg-gray-100" : "bg-green-100"}`}>
              <span className={`w-2 h-2 rounded-full ${isResting ? "bg-gray-400" : "bg-green-500 animate-pulse"}`} />
              <span className={`text-[10px] sm:text-xs font-medium hidden sm:inline ${isResting ? "text-gray-600" : "text-green-700"}`}>
                {isResting ? "Rest Mode" : "Live"}
              </span>
            </div>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 sm:p-2.5 bg-white rounded-xl border border-[#EBE8E2] hover:shadow-md transition-all"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#7A7A7A]" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-[#B76E79] to-[#722F37] text-white text-[9px] sm:text-[10px] rounded-full flex items-center justify-center font-medium"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            {/* Refresh */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                triggerHaptic("light");
                fetchBrief();
              }}
              disabled={isLoading}
              className="p-2 sm:p-2.5 bg-white rounded-xl border border-[#EBE8E2] hover:shadow-md transition-all"
            >
              <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 text-[#7A7A7A] ${isLoading ? "animate-spin" : ""}`} />
            </motion.button>

            {/* Table Stand Link */}
            <a
              href="/table-display"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 bg-[#722F37]/10 hover:bg-[#722F37] text-[#722F37] hover:text-white rounded-xl border border-[#722F37]/20 text-xs font-semibold transition-all"
              title="Abrir Expositor QR para Imprimir"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden md:inline">Expositor QR</span>
            </a>

            {/* Logout */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={async () => {
                try {
                  await fetch("/api/admin/logout", { method: "POST" });
                } catch {}
                try {
                  localStorage.removeItem("iva_admin_key");
                } catch {}
                setIsAuthenticated(false);
                setAdminKey("");
              }}
              title="Cerrar Sesión Segura"
              className="p-2 sm:p-2.5 bg-white rounded-xl border border-[#EBE8E2] hover:shadow-md transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-[#7A7A7A]" />
            </motion.button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: "dashboard", label: "Command Center", icon: Zap },
              { id: "content", label: "Editor Web & Fotos", icon: LayoutTemplate },
              { id: "clients", label: "Client CRM & Refills", icon: Users },
              { id: "portal", label: "Portal VIP Clientas", icon: Sparkles },
              { id: "gmaps", label: "Google Maps & SEO", icon: MapPin },
              { id: "scripts", label: "WhatsApp Concierge", icon: MessageCircle },
              { id: "waitlist", label: "VIP Waitlist", icon: Crown },
              { id: "analytics", label: "Growth", icon: TrendingUp },
              { id: "ezra", label: "Ezra Time", icon: Baby },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white shadow-lg shadow-[#722F37]/20"
                    : "text-[#7A7A7A] hover:bg-white hover:shadow-md"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </header>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-24 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-[#EBE8E2] overflow-hidden"
          >
            <div className="p-5 border-b border-[#EBE8E2] bg-gradient-to-r from-[#FAF9F7] to-white">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg text-[#1A1A1A]">Notifications</h3>
                <span className="text-xs text-[#7A7A7A]">{unreadCount} new</span>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notif) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 border-b border-[#EBE8E2] last:border-0 hover:bg-[#FAF9F7] transition-colors ${!notif.read ? "bg-[#FDF8F6]" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        notif.type === "booking" ? "bg-blue-100 text-blue-600" : notif.type === "review" ? "bg-yellow-100 text-yellow-600" : notif.type === "loyalty" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"
                      }`}
                    >
                      {notif.type === "booking" ? <Calendar className="w-5 h-5" /> : notif.type === "review" ? <Star className="w-5 h-5" /> : notif.type === "loyalty" ? <Crown className="w-5 h-5" /> : <Gift className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#1A1A1A]">{notif.message}</p>
                      <p className="text-xs text-[#7A7A7A] mt-1">{notif.time}</p>
                    </div>
                    {!notif.read && <div className="w-2 h-2 bg-[#722F37] rounded-full mt-2" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-8">
        {/* Error Message */}
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 mb-6">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <p className="text-red-600 text-sm">{error}</p>
          </motion.div>
        )}

        {/* ==================== COMMAND CENTER TAB ==================== */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Quick Action Launchpad */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EBE8E2] shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#722F37]" />
                  <h3 className="font-serif text-lg sm:text-xl text-[#1A1A1A]">Sanctuary Executive Launchpad</h3>
                </div>
                <span className="text-[11px] text-[#7A7A7A] bg-[#FAF9F7] px-2.5 py-1 rounded-full border border-[#EBE8E2] w-fit">
                  Centro de control en 1 toque
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Launchpad Card 0: Editor Web */}
                <button
                  type="button"
                  onClick={() => setActiveTab("content")}
                  className="text-left p-4 rounded-xl border border-[#722F37]/30 bg-gradient-to-br from-[#FDF8F6] to-white hover:border-[#722F37] transition-all group shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-lg bg-rose-100 text-[#722F37] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <LayoutTemplate className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#722F37] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                      CMS Web
                    </span>
                  </div>
                  <h4 className="font-medium text-sm text-[#1A1A1A]">Editor Web & Fotos</h4>
                  <p className="text-xs text-[#7A7A7A] mt-1">Cambia fotos de portada, textos de acrílico, nombres y teléfonos en 1 toque.</p>
                </button>

                {/* Launchpad Card 1: CRM */}
                <button
                  type="button"
                  onClick={() => setActiveTab("clients")}
                  className="text-left p-4 rounded-xl border border-[#EBE8E2] hover:border-[#722F37]/40 hover:bg-[#FDF8F6] transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-lg bg-rose-50 text-[#722F37] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Users className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      CRM Activo
                    </span>
                  </div>
                  <h4 className="font-medium text-sm text-[#1A1A1A]">Client CRM & Refills</h4>
                  <p className="text-xs text-[#7A7A7A] mt-1">Control de visitas, sellos de fidelidad y recordatorios de 3-4 semanas.</p>
                </button>

                {/* Launchpad Card 2: Portal Clientas */}
                <button
                  type="button"
                  onClick={() => setActiveTab("portal")}
                  className="text-left p-4 rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50/50 to-white hover:border-amber-300 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      Nuevo • Clave/PIN
                    </span>
                  </div>
                  <h4 className="font-medium text-sm text-[#1A1A1A]">Portal VIP de Clientas</h4>
                  <p className="text-xs text-[#7A7A7A] mt-1">Acceso privado por teléfono + PIN (1234), tarjeta Apple Wallet y auto-agendamiento.</p>
                </button>

                {/* Launchpad Card 3: WhatsApp Concierge */}
                <button
                  type="button"
                  onClick={() => setActiveTab("scripts")}
                  className="text-left p-4 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/40 to-white hover:border-emerald-300 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      10 Respuestas
                    </span>
                  </div>
                  <h4 className="font-medium text-sm text-[#1A1A1A]">WhatsApp Concierge</h4>
                  <p className="text-xs text-[#7A7A7A] mt-1">Plantillas rápidas para confirmar citas, cobrar depósitos y solicitar reseñas.</p>
                </button>

                {/* Launchpad Card 4: Google Maps Kit */}
                <button
                  type="button"
                  onClick={() => setActiveTab("gmaps")}
                  className="text-left p-4 rounded-xl border border-[#EBE8E2] hover:border-[#722F37]/40 hover:bg-[#FAF9F7] transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      SEO Bay Ridge
                    </span>
                  </div>
                  <h4 className="font-medium text-sm text-[#1A1A1A]">Google Maps & SEO Kit</h4>
                  <p className="text-xs text-[#7A7A7A] mt-1">Generador de QR para reseñas de 5 estrellas, sitemaps y posicionamiento en Google.</p>
                </button>

                {/* Launchpad Card 5: Table Stand */}
                <a
                  href="/table-display"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-left p-4 rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50/40 to-white hover:border-purple-300 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-900 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Printer className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] uppercase font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      Imprimir <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                  <h4 className="font-medium text-sm text-[#1A1A1A]">Expositor QR de Mesa</h4>
                  <p className="text-xs text-[#7A7A7A] mt-1">Página elegante en blanco y dorado para imprimir en soporte de mesa del salón.</p>
                </a>
              </div>
            </div>
            {/* Hero Stats Row */}
            <div className="grid md:grid-cols-4 gap-4">
              {/* Status Toggle Card */}
              <motion.div whileHover={{ y: -4 }} className="md:col-span-1 bg-white p-6 rounded-2xl border border-[#EBE8E2] shadow-sm hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isResting ? "bg-gray-100 text-gray-500" : "bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/30"}`}>
                    {isResting ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleGhostMode}
                    disabled={isToggling}
                    className={`relative w-14 h-7 rounded-full transition-colors ${isResting ? "bg-gray-300" : "bg-gradient-to-r from-green-400 to-emerald-500"}`}
                  >
                    <motion.div animate={{ x: isResting ? 2 : 30 }} className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md" />
                  </motion.button>
                </div>
                <h2 className="font-serif text-xl text-[#1A1A1A] mb-1">{isResting ? "Rest Mode" : "Sanctuary Active"}</h2>
                <p className="text-xs text-[#7A7A7A]">{isResting ? "Calendar hidden, enjoying Ezra time" : "Accepting appointments"}</p>
              </motion.div>

              {/* Today's Bookings */}
              <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-[#722F37] to-[#5A252C] p-6 rounded-2xl shadow-lg shadow-[#722F37]/20 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-[#E8B4B8]" />
                  <span className="text-xs uppercase tracking-widest text-white/70">Today</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl">{brief?.bookings.count || 0}</span>
                  <span className="text-white/50 text-xl">/ {brief?.bookings.maxCapacity || 2}</span>
                </div>
                <p className="text-sm text-white/70 mt-2">private rituals</p>
              </motion.div>

              {/* Revenue Today */}
              <motion.div whileHover={{ y: -4 }} className="bg-white p-6 rounded-2xl border border-[#EBE8E2] shadow-sm hover:shadow-xl transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-4 h-4 text-[#B76E79]" />
                  <span className="text-xs uppercase tracking-widest text-[#7A7A7A]">Today&apos;s Revenue</span>
                </div>
                <div className="font-serif text-4xl text-[#1A1A1A]">${brief?.bookings.revenue || 0}</div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600">+{analytics?.weeklyChange || 0}% this week</span>
                </div>
              </motion.div>

              {/* VIP Waitlist */}
              <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-[#8C6239] to-[#5C4033] p-6 rounded-2xl shadow-lg shadow-[#8C6239]/20 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-4 h-4 text-amber-300" />
                  <span className="text-xs uppercase tracking-widest text-white/70">VIP Waitlist</span>
                </div>
                <div className="font-serif text-5xl">{brief?.waitlist.count || waitlist.length}</div>
                <p className="text-sm text-white/70 mt-2">{brief?.waitlist.highPriority || 0} high priority</p>
              </motion.div>
            </div>

            {/* Second Row */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Monthly Progress */}
              <motion.div whileHover={{ y: -4 }} className="md:col-span-2 bg-white p-6 rounded-2xl border border-[#EBE8E2] shadow-sm hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-xl text-[#1A1A1A]">Monthly Target Progress</h3>
                    <p className="text-sm text-[#7A7A7A]">Goal: ${LUXURY_METRICS.monthlyTarget.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-3xl text-[#722F37]">${Math.round(monthlyRevenue).toLocaleString()}</span>
                    <p className="text-xs text-[#7A7A7A]">projected</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-4 bg-[#F5F3F0] rounded-full overflow-hidden mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progressToTarget, 100)}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#B76E79] via-[#722F37] to-[#5A252C] rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-white mix-blend-difference">{Math.round(progressToTarget)}%</span>
                  </div>
                </div>

                {/* Weekly Breakdown */}
                <div className="grid grid-cols-4 gap-3">
                  {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, i) => (
                    <div key={week} className="text-center p-3 bg-[#FAF9F7] rounded-xl">
                      <p className="text-xs text-[#7A7A7A] mb-1">{week}</p>
                      <p className="font-serif text-lg text-[#1A1A1A]">${i < 2 ? Math.round((analytics?.weeklyRevenue || 0) * (1 - i * 0.1)) : "—"}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Today's Slots */}
              <motion.div whileHover={{ y: -4 }} className="bg-white p-6 rounded-2xl border border-[#EBE8E2] shadow-sm hover:shadow-xl transition-all">
                <div className="flex items-center gap-2 mb-5">
                  <Clock className="w-4 h-4 text-[#B76E79]" />
                  <span className="text-sm font-medium text-[#1A1A1A]">Today&apos;s Sanctuary</span>
                </div>

                <div className="space-y-3">
                  {/* Morning Slot */}
                  <div className={`p-4 rounded-xl border-2 transition-all ${brief?.slots.morning ? "border-green-200 bg-green-50" : "border-[#722F37]/20 bg-[#722F37]/5"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Sunrise className={`w-5 h-5 ${brief?.slots.morning ? "text-green-600" : "text-[#722F37]"}`} />
                        <div>
                          <p className="font-medium text-[#1A1A1A]">Morning Ritual</p>
                          <p className="text-xs text-[#7A7A7A]">9:00 AM - 1:00 PM</p>
                        </div>
                      </div>
                      {brief?.slots.morning ? (
                        <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Open</span>
                      ) : (
                        <span className="text-xs font-medium text-[#722F37] bg-[#722F37]/10 px-2 py-1 rounded-full">Booked</span>
                      )}
                    </div>
                  </div>

                  {/* Afternoon Slot */}
                  <div className={`p-4 rounded-xl border-2 transition-all ${brief?.slots.afternoon ? "border-green-200 bg-green-50" : "border-[#722F37]/20 bg-[#722F37]/5"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Sunset className={`w-5 h-5 ${brief?.slots.afternoon ? "text-green-600" : "text-[#722F37]"}`} />
                        <div>
                          <p className="font-medium text-[#1A1A1A]">Afternoon Ritual</p>
                          <p className="text-xs text-[#7A7A7A]">2:00 PM - 6:00 PM</p>
                        </div>
                      </div>
                      {brief?.slots.afternoon ? (
                        <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Open</span>
                      ) : (
                        <span className="text-xs font-medium text-[#722F37] bg-[#722F37]/10 px-2 py-1 rounded-full">Booked</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Third Row - Top Rituals */}
            <motion.div whileHover={{ y: -2 }} className="bg-white p-6 rounded-2xl border border-[#EBE8E2] shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-5 h-5 text-[#B76E79]" />
                <h3 className="font-serif text-xl text-[#1A1A1A]">Top Performing Rituals</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {analytics?.topServices.map((service, i) => (
                  <motion.div key={service.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-4 bg-gradient-to-br from-[#FAF9F7] to-white rounded-xl border border-[#EBE8E2]">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold ${i === 0 ? "bg-gradient-to-br from-amber-400 to-amber-600" : i === 1 ? "bg-gradient-to-br from-gray-300 to-gray-500" : "bg-gradient-to-br from-orange-300 to-orange-500"}`}>{i + 1}</span>
                      <span className="font-medium text-[#1A1A1A] text-sm">{service.name}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-2xl font-serif text-[#722F37]">${service.revenue}</p>
                        <p className="text-xs text-[#7A7A7A]">{service.count} bookings</p>
                      </div>
                      <div className="h-12 w-16 flex items-end gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <div key={j} className="flex-1 bg-gradient-to-t from-[#B76E79] to-[#722F37] rounded-t opacity-20" style={{ height: `${20 + Math.random() * 80}%`, opacity: j < 3 ? 1 : 0.3 }} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Cotizador Express para WhatsApp (R1 & R4) */}
            <AdminQuoteBuilder />

            {/* Semáforo de Disponibilidad Semanal (R2) */}
            <AdminWeeklyAvailability />

            {/* Barra de Avisos & Temporadas (R3) */}
            <AdminAnnouncementEditor />

            {/* Módulo Antes y Después (R5) */}
            <AdminBeforeAfterEditor />

            {/* Studio Backup & Restore */}
            <AdminBackupRestore />

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href="/" target="_blank" className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl border border-[#EBE8E2] hover:shadow-lg transition-all">
                <Eye className="w-5 h-5 text-[#722F37]" />
                <span className="font-medium text-[#1A1A1A]">View Website</span>
              </motion.a>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center justify-center gap-3 p-4 bg-[#722F37] text-white rounded-xl hover:shadow-lg transition-all">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Messages</span>
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white rounded-xl hover:shadow-lg transition-all">
                <Heart className="w-5 h-5" />
                <span className="font-medium">Instagram</span>
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl border border-[#EBE8E2] hover:shadow-lg transition-all">
                <Award className="w-5 h-5 text-[#8C6239]" />
                <span className="font-medium text-[#1A1A1A]">Reviews ({analytics?.totalReviews})</span>
              </motion.button>
            </div>
          </div>
        )}

        {/* ==================== WEB CONTENT EDITOR (CMS) TAB ==================== */}
        {activeTab === "content" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <AdminAnnouncementEditor />
            <AdminWeeklyAvailability />
            <AdminBeforeAfterEditor />
            <AdminContentEditor />
            <AdminBackupRestore />
          </motion.div>
        )}

        {/* ==================== CLIENT CRM TAB ==================== */}
        {activeTab === "clients" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <AdminClientCRM />
          </motion.div>
        )}

        {/* ==================== VIP CLIENT PORTAL TAB ==================== */}
        {activeTab === "portal" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EBE8E2] shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EBE8E2]">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Portal de Autoservicio para Clientas</span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#1A1A1A]">Portal VIP & Auto-Agendamiento de Refill</h2>
                  <p className="text-xs sm:text-sm text-[#7A7A7A]">
                    Tus clientas ahora pueden ingresar con su propio teléfono y PIN predeterminado (1234) para gestionar su cita, sellos y perfil.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText("https://www.ivanailartny.com/es/portal");
                        setCopiedPortalLink(true);
                        setTimeout(() => setCopiedPortalLink(false), 2500);
                      } catch {}
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FAF9F7] hover:bg-[#F0EDE8] border border-[#EBE8E2] rounded-xl text-xs font-semibold text-[#1A1A1A] transition-all"
                  >
                    {copiedPortalLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#7A7A7A]" />}
                    <span>{copiedPortalLink ? "Enlace Copiado" : "Copiar Enlace"}</span>
                  </button>

                  <a
                    href="/es/portal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#722F37] hover:bg-[#5A252C] text-white rounded-xl text-xs font-semibold shadow-md shadow-[#722F37]/20 transition-all"
                  >
                    <span>Abrir Portal en Vivo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                <div className="p-4 rounded-xl bg-[#FAF9F7] border border-[#EBE8E2]">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center mb-2">
                    <Crown className="w-4 h-4" />
                  </div>
                  <h4 className="font-medium text-sm text-[#1A1A1A]">Pase Digital Apple Wallet (1-6 Sellos)</h4>
                  <p className="text-xs text-[#7A7A7A] mt-1">
                    La clienta ve en tiempo real cuántas visitas lleva acumuladas y cuándo desbloquea su ritual de lujo o manicura gratis.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF9F7] border border-[#EBE8E2]">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-[#722F37] flex items-center justify-center mb-2">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h4 className="font-medium text-sm text-[#1A1A1A]">Auto-Agendamiento de Refill (21-28d)</h4>
                  <p className="text-xs text-[#7A7A7A] mt-1">
                    El sistema calcula la fecha exacta en que sus uñas necesitan mantenimiento y le permite agendar en 1 clic sin tener que escribir.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF9F7] border border-[#EBE8E2]">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-900 flex items-center justify-center mb-2">
                    <Gift className="w-4 h-4" />
                  </div>
                  <h4 className="font-medium text-sm text-[#1A1A1A]">Forma Favorita & Referidos $15</h4>
                  <p className="text-xs text-[#7A7A7A] mt-1">
                    Elige su forma favorita (Almond, Coffin, Square, Oval, Stiletto) y comparte su enlace VIP con amigas por WhatsApp.
                  </p>
                </div>
              </div>

              {/* Instructions banner */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-amber-900 space-y-0.5">
                  <p className="font-semibold">💡 ¿Cómo invitar a tus clientas?</p>
                  <p className="text-amber-800">
                    Ve a la pestaña <strong>Client CRM & Refills</strong> y pulsa el botón morado <strong>Portal VIP</strong> en cualquier clienta. Se abrirá WhatsApp con el enlace directo y su PIN ya pre-redactado.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("clients")}
                  className="px-3.5 py-1.5 bg-[#722F37] text-white text-xs font-semibold rounded-lg hover:bg-[#5A252C] transition-all whitespace-nowrap shadow-sm"
                >
                  Ir al CRM de Clientas →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== WAITLIST TAB ==================== */}
        {activeTab === "waitlist" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-[#EBE8E2] overflow-hidden">
            <div className="p-6 border-b border-[#EBE8E2] bg-gradient-to-r from-[#FAF9F7] to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#8C6239] to-[#5C4033] rounded-xl flex items-center justify-center">
                    <Crown className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl text-[#1A1A1A]">VIP Waitlist</h2>
                    <p className="text-sm text-[#7A7A7A]">Your sanctuary seekers</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#722F37]/10 text-[#722F37] text-sm font-medium rounded-full">{waitlist.length} waiting</span>
              </div>
            </div>

            {waitlist.length === 0 ? (
              <div className="text-center py-16">
                <Users className="w-16 h-16 text-[#EBE8E2] mx-auto mb-4" />
                <p className="text-[#7A7A7A] mb-2">No one on waitlist</p>
                <p className="text-sm text-[#A3A3A3]">Share your booking link to grow your list</p>
              </div>
            ) : (
              <div className="divide-y divide-[#EBE8E2]">
                {waitlist.map((entry, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="p-5 hover:bg-[#FAF9F7] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#B76E79]/20 to-[#722F37]/20 rounded-full flex items-center justify-center">
                          <span className="font-serif text-lg text-[#722F37]">{entry.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-[#1A1A1A]">{entry.name}</span>
                            {entry.priority === "HIGH" && (
                              <span className="text-[9px] uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                                VIP
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-[#7A7A7A]">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {entry.phone}
                            </span>
                            <span className="flex items-center gap-1 hidden sm:flex">
                              <Mail className="w-3 h-3" /> {entry.email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => openSmsConcierge(entry)} className="flex items-center gap-2 px-4 py-2.5 bg-[#722F37] text-white rounded-xl hover:bg-[#5A252C] transition-colors shadow-lg shadow-[#722F37]/20">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm font-medium hidden sm:inline">Invite</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ==================== GOOGLE MAPS & LOCAL SEO TAB ==================== */}
        {activeTab === "gmaps" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <AdminGoogleMapsKit />
          </motion.div>
        )}

        {/* ==================== SCRIPTS TAB (WHATSAPP CONCIERGE) ==================== */}
        {activeTab === "scripts" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <AdminQuoteBuilder />
            <AdminWhatsAppScripts />
          </motion.div>
        )}

        {/* ==================== ANALYTICS TAB ==================== */}
        {activeTab === "analytics" && analytics && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: "Conversion Rate", value: `${analytics.conversionRate}%`, change: "+5.2%", icon: Target, color: "from-green-400 to-emerald-500" },
                { label: "Avg Ticket", value: `$${LUXURY_METRICS.avgTicket}`, change: "+$12", icon: DollarSign, color: "from-[#B76E79] to-[#722F37]" },
                { label: "5-Star Reviews", value: analytics.totalReviews.toString(), change: "+8 new", icon: Star, color: "from-amber-400 to-orange-500" },
                { label: "Referrals", value: analytics.referrals.toString(), change: "$690 revenue", icon: Gift, color: "from-purple-400 to-pink-500" },
              ].map((metric, i) => (
                <motion.div key={metric.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }} className="bg-white p-5 rounded-2xl border border-[#EBE8E2] hover:shadow-xl transition-all">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-[#7A7A7A] mb-1">{metric.label}</p>
                  <p className="font-serif text-3xl text-[#1A1A1A]">{metric.value}</p>
                  <p className="text-xs text-green-600 mt-1">{metric.change}</p>
                </motion.div>
              ))}
            </div>

            {/* Revenue Chart */}
            <motion.div whileHover={{ y: -2 }} className="bg-white p-6 rounded-2xl border border-[#EBE8E2]">
              <h3 className="font-serif text-xl text-[#1A1A1A] mb-6">Weekly Revenue Trend</h3>
              <div className="h-64 flex items-end justify-between gap-3">
                {[85, 92, 78, 105, 95, 115, 100].map((height, i) => (
                  <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ delay: i * 0.1, duration: 0.5 }} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gradient-to-t from-[#722F37] to-[#B76E79] rounded-t-xl relative group cursor-pointer hover:from-[#5A252C] hover:to-[#722F37] transition-all" style={{ height: "100%" }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${Math.round((height / 100) * 350)}
                      </div>
                    </div>
                    <span className="text-xs text-[#7A7A7A]">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ==================== EZRA TIME TAB ==================== */}
        {activeTab === "ezra" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Hero Card */}
            <div className="bg-gradient-to-br from-[#722F37] via-[#5A252C] to-[#3D1A1E] p-8 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B76E79]/20 rounded-full blur-2xl" />

              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Baby className="w-7 h-7 text-[#E8B4B8]" />
                    </div>
                    <div>
                      <h2 className="font-serif text-3xl">Time with Ezra</h2>
                      <p className="text-white/70">Your most precious investment</p>
                    </div>
                  </div>

                  <p className="text-white/80 leading-relaxed mb-6">By limiting to 2 clients daily, you gain {ezraHoursSaved} extra hours every month with Ezra. That&apos;s {Math.round(ezraHoursSaved / 8)} full days of presence.</p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl">
                      <Heart className="w-4 h-4 text-[#E8B4B8]" />
                      <span className="text-sm">132 hrs/month saved</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl">
                      <Coffee className="w-4 h-4 text-[#E8B4B8]" />
                      <span className="text-sm">Zero burnout</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl text-center">
                    <p className="font-serif text-5xl mb-1">{ezraHoursSaved}</p>
                    <p className="text-sm text-white/70">Hours/Month with Ezra</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl text-center">
                    <p className="font-serif text-5xl mb-1">4-6</p>
                    <p className="text-sm text-white/70">Work Hours/Day</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl text-center">
                    <p className="font-serif text-5xl mb-1">${Math.round(monthlyRevenue / 44)}</p>
                    <p className="text-sm text-white/70">Per Appointment</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl text-center">
                    <p className="font-serif text-5xl mb-1">81%</p>
                    <p className="text-sm text-white/70">Profit Margin</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#EBE8E2]">
              <h3 className="font-serif text-xl text-[#1A1A1A] mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#B76E79]" />
                IVA Model vs Traditional Salon
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Traditional */}
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-medium text-gray-600 mb-4 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" />
                    Traditional Salon
                  </h4>
                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>Clients per day</span>
                      <span className="font-medium text-gray-700">8-12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hours worked</span>
                      <span className="font-medium text-gray-700">10-12 hrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue per client</span>
                      <span className="font-medium text-gray-700">$35-55</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Toxic exposure</span>
                      <span className="font-medium text-red-500">High</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time with family</span>
                      <span className="font-medium text-red-500">Minimal</span>
                    </div>
                  </div>
                </div>

                {/* IVA Model */}
                <div className="p-5 bg-gradient-to-br from-[#FDF8F6] to-white rounded-xl border-2 border-[#B76E79]/30">
                  <h4 className="font-medium text-[#722F37] mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    The IVA Model
                  </h4>
                  <div className="space-y-3 text-sm text-[#6B6B6B]">
                    <div className="flex justify-between">
                      <span>Clients per day</span>
                      <span className="font-medium text-[#1A1A1A]">2 max</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hours worked</span>
                      <span className="font-medium text-[#1A1A1A]">4-6 hrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue per client</span>
                      <span className="font-medium text-[#722F37]">$130-165</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Toxic exposure</span>
                      <span className="font-medium text-green-600">Zero</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time with Ezra</span>
                      <span className="font-medium text-green-600">Maximum</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#722F37]/5 rounded-xl border border-[#722F37]/20 text-center">
                <p className="text-[#722F37] font-medium">Same income. Half the time. Zero compromise on quality or health.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-[#A3A3A3] py-8 tracking-wide">IVA Nail Art Sanctuary Control • Built with love for you and Ezra</p>
      </div>
    </main>
  );
}
