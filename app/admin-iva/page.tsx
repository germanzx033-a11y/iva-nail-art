"use client";

/**
 * IVA-PULSE: Admin Concierge Dashboard
 * Mobile-First Luxury Interface
 *
 * Features:
 * - Toggle MGM with haptic feedback
 * - Daily Brief with bookings & revenue
 * - WhatsApp Golden Bridge
 */

import { useState, useEffect, useCallback } from "react";
import {
  Moon,
  Sun,
  Calendar,
  DollarSign,
  Users,
  MessageCircle,
  RefreshCw,
  Shield,
  Crown,
  Sparkles,
  ChevronRight,
  Clock,
  Phone,
  Mail,
  AlertTriangle,
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

// =============================================
// HAPTIC FEEDBACK
// =============================================

const triggerHaptic = (type: "light" | "medium" | "heavy" = "medium") => {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    const patterns = {
      light: [10],
      medium: [20, 50, 20],
      heavy: [50, 100, 50],
    };
    navigator.vibrate(patterns[type]);
  }
};

// =============================================
// ADMIN PAGE
// =============================================

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [brief, setBrief] = useState<DailyBrief | null>(null);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
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
        setBrief((prev) =>
          prev ? { ...prev, appStatus: data.status } : null
        );
        triggerHaptic("light");
      }
    } catch (err) {
      setError("Failed to toggle");
    } finally {
      setIsToggling(false);
    }
  };

  // =============================================
  // WHATSAPP GOLDEN BRIDGE
  // =============================================

  const openWhatsAppConcierge = (entry: WaitlistEntry) => {
    triggerHaptic("light");

    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    const message = `Hola ${entry.name} ✨ Soy el Concierge de IVA. Iva ha abierto un espacio exclusivo para hoy (${today}) y el cupo es tuyo. ¿Confirmas? 💅`;

    const phone = entry.phone.replace(/\D/g, "");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

    // Mark as notified
    fetch("/api/waitlist", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminKey}`,
      },
      body: JSON.stringify({
        date: brief?.date,
        email: entry.email,
      }),
    });
  };

  // =============================================
  // LOGIN SCREEN
  // =============================================

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#121212] flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8960C] mb-4">
              <Crown className="w-8 h-8 text-[#121212]" />
            </div>
            <h1 className="font-serif text-2xl text-white tracking-wide">
              IVA-PULSE
            </h1>
            <p className="text-white/40 text-sm mt-1">Admin Concierge</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="mb-4">
              <label className="block text-white/60 text-sm mb-2">
                <Shield className="w-4 h-4 inline mr-2" />
                Admin Key
              </label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                placeholder="Enter admin key"
              />
            </div>

            <button
              onClick={() => {
                triggerHaptic("medium");
                setIsAuthenticated(true);
              }}
              disabled={!adminKey}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8960C] text-[#121212] font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Access Dashboard
            </button>
          </div>

          <p className="text-center text-white/20 text-xs mt-6">
            Secured with Passkey-grade protection
          </p>
        </div>
      </main>
    );
  }

  // =============================================
  // DASHBOARD
  // =============================================

  const isResting = brief?.appStatus === "REST";

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#121212]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center">
              <Crown className="w-5 h-5 text-[#121212]" />
            </div>
            <div>
              <h1 className="font-serif text-lg">IVA-PULSE</h1>
              <p className="text-white/40 text-xs">
                {brief?.formattedDate || "Loading..."}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              triggerHaptic("light");
              fetchBrief();
            }}
            disabled={isLoading}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <RefreshCw
              className={`w-5 h-5 text-white/60 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Ghost Mode Toggle */}
        <div
          className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-500 ${
            isResting
              ? "bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border border-purple-500/20"
              : "bg-gradient-to-br from-[#D4AF37]/20 to-amber-900/20 border border-[#D4AF37]/20"
          }`}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <div
              className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${
                isResting ? "bg-purple-500" : "bg-[#D4AF37]"
              }`}
            />
          </div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  isResting
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-[#D4AF37]/20 text-[#D4AF37]"
                }`}
              >
                {isResting ? (
                  <Moon className="w-7 h-7" />
                ) : (
                  <Sun className="w-7 h-7" />
                )}
              </div>
              <div>
                <h2 className="font-medium text-lg">
                  {isResting ? "Ghost Mode" : "Active"}
                </h2>
                <p className="text-white/40 text-sm">
                  {isResting ? "Calendar hidden" : "Accepting bookings"}
                </p>
              </div>
            </div>

            <button
              onClick={toggleGhostMode}
              disabled={isToggling}
              className={`relative w-16 h-9 rounded-full transition-all duration-300 ${
                isResting ? "bg-purple-500" : "bg-[#D4AF37]"
              }`}
            >
              <div
                className={`absolute top-1 w-7 h-7 rounded-full bg-white shadow-lg transition-all duration-300 ${
                  isResting ? "left-1" : "left-8"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Daily Brief Stats */}
        <div className="grid grid-cols-2 gap-4">
          {/* Bookings */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-white/40 text-xs uppercase tracking-wider">
                Bookings
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-3xl text-white">
                {brief?.bookings.count || 0}
              </span>
              <span className="text-white/40 text-sm">
                /{brief?.bookings.maxCapacity || 2}
              </span>
            </div>
            <div className="mt-2 flex gap-1">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className={`flex-1 h-1.5 rounded-full transition-colors ${
                    i < (brief?.bookings.count || 0)
                      ? "bg-[#D4AF37]"
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span className="text-white/40 text-xs uppercase tracking-wider">
                Revenue
              </span>
            </div>
            <div className="font-serif text-3xl text-white">
              ${brief?.bookings.revenue || 0}
            </div>
            <p className="text-white/30 text-xs mt-2">Deposits collected</p>
          </div>
        </div>

        {/* Slot Availability */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-white/60 text-sm font-medium">
              Slot Availability
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`p-4 rounded-xl border ${
                brief?.slots.morning
                  ? "bg-emerald-500/10 border-emerald-500/20"
                  : "bg-red-500/10 border-red-500/20"
              }`}
            >
              <span className="text-xl mb-1 block">🌅</span>
              <p className="text-white/80 text-sm font-medium">Morning</p>
              <p
                className={`text-xs ${
                  brief?.slots.morning ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {brief?.slots.morning ? "Available" : "Booked"}
              </p>
            </div>
            <div
              className={`p-4 rounded-xl border ${
                brief?.slots.afternoon
                  ? "bg-emerald-500/10 border-emerald-500/20"
                  : "bg-red-500/10 border-red-500/20"
              }`}
            >
              <span className="text-xl mb-1 block">🌇</span>
              <p className="text-white/80 text-sm font-medium">Afternoon</p>
              <p
                className={`text-xs ${
                  brief?.slots.afternoon ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {brief?.slots.afternoon ? "Available" : "Booked"}
              </p>
            </div>
          </div>
        </div>

        {/* VIP Waitlist */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-white/60 text-sm font-medium">
                VIP Waitlist
              </span>
            </div>
            <span className="text-white/40 text-xs">
              {waitlist.length} {waitlist.length === 1 ? "person" : "people"}
            </span>
          </div>

          {waitlist.length === 0 ? (
            <div className="text-center py-8">
              <Sparkles className="w-8 h-8 text-white/20 mx-auto mb-2" />
              <p className="text-white/30 text-sm">No one on waitlist</p>
            </div>
          ) : (
            <div className="space-y-3">
              {waitlist.map((entry, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border transition-all ${
                    entry.priority === "HIGH"
                      ? "bg-[#D4AF37]/10 border-[#D4AF37]/20"
                      : "bg-white/5 border-white/5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white truncate">
                          {entry.name}
                        </span>
                        {entry.priority === "HIGH" && (
                          <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-medium">
                            VIP
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-white/40 text-xs">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {entry.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {entry.email}
                        </span>
                      </div>
                    </div>

                    {/* WhatsApp Golden Bridge */}
                    <button
                      onClick={() => openWhatsAppConcierge(entry)}
                      className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
                    >
                      <MessageCircle className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {entry.lastNotifiedAt && (
                    <p className="text-white/20 text-[10px] mt-2">
                      Notified:{" "}
                      {new Date(entry.lastNotifiedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <a
            href="/"
            className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
          >
            <span className="text-white/60 text-sm">View Site</span>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </a>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setAdminKey("");
            }}
            className="flex items-center justify-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors"
          >
            <span className="text-red-400 text-sm">Logout</span>
          </button>
        </div>
      </div>
    </main>
  );
}
