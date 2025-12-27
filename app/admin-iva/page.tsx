"use client";

/**
 * IVA-PULSE: Admin Concierge Dashboard
 * EDITORIAL LUXURY - Refined Elegance
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
  Clock,
  Phone,
  Mail,
  AlertTriangle,
  LogOut,
  ArrowUpRight,
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
        setBrief((prev) =>
          prev ? { ...prev, appStatus: data.status } : null
        );
        triggerHaptic("light");
      }
    } catch {
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

    const message = `Hi ${entry.name}! This is IVA Nail Art. We have an exclusive opening today (${today}) and the spot is yours. Would you like to confirm?`;

    const phone = entry.phone.replace(/\D/g, "");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

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
      <main className="min-h-screen bg-[#F9F8F6] flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl text-[#1A1A1A] mb-2">IVA</h1>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#7A7A7A]">Admin Portal</p>
          </div>

          {/* Login Form */}
          <div className="bg-white p-8 border border-[#EBE8E2]">
            <div className="mb-6">
              <label className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A7A] block mb-3">
                <Shield className="w-3.5 h-3.5 inline mr-2 opacity-60" />
                Admin Key
              </label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="input"
                placeholder="Enter admin key"
              />
            </div>

            <button
              onClick={() => {
                triggerHaptic("medium");
                setIsAuthenticated(true);
              }}
              disabled={!adminKey}
              className="btn-editorial-filled w-full disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Access Dashboard
            </button>
          </div>

          <p className="text-center text-[#A3A3A3] text-[11px] mt-8 tracking-wide">
            Secured access
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
    <main className="min-h-screen bg-[#F9F8F6]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F9F8F6]/95 backdrop-blur-sm border-b border-[#EBE8E2]">
        <div className="max-w-lg mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl text-[#1A1A1A]">Dashboard</h1>
            <p className="text-[11px] text-[#7A7A7A] tracking-wide">
              {brief?.formattedDate || "Loading..."}
            </p>
          </div>

          <button
            onClick={() => {
              triggerHaptic("light");
              fetchBrief();
            }}
            disabled={isLoading}
            className="p-2 hover:opacity-70 transition-all duration-500"
          >
            <RefreshCw
              className={`w-4 h-4 text-[#7A7A7A] ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-white border border-red-200 p-4 flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <p className="text-red-600 text-[13px]">{error}</p>
          </div>
        )}

        {/* Status Toggle Card */}
        <div className="bg-white p-6 border border-[#EBE8E2]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 flex items-center justify-center transition-colors duration-500 ${
                  isResting ? "bg-[#F1EFE9] text-[#7A7A7A]" : "bg-[#F1EFE9] text-[#8C7355]"
                }`}
              >
                {isResting ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </div>
              <div>
                <h2 className="font-serif text-lg text-[#1A1A1A]">
                  {isResting ? "Rest Mode" : "Active"}
                </h2>
                <p className="text-[12px] text-[#7A7A7A]">
                  {isResting ? "Calendar hidden" : "Accepting bookings"}
                </p>
              </div>
            </div>

            <button
              onClick={toggleGhostMode}
              disabled={isToggling}
              className={`relative w-12 h-6 transition-colors duration-500 ${
                isResting ? "bg-[#7A7A7A]" : "bg-[#8C7355]"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white transition-all duration-500 ${
                  isResting ? "left-0.5" : "left-6"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Bookings */}
          <div className="bg-white p-6 border border-[#EBE8E2]">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-3.5 h-3.5 text-[#8C7355] opacity-70" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#7A7A7A]">
                Today
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-4xl text-[#1A1A1A]">
                {brief?.bookings.count || 0}
              </span>
              <span className="text-[#A3A3A3] text-sm">
                /{brief?.bookings.maxCapacity || 2}
              </span>
            </div>
            <p className="text-[11px] text-[#7A7A7A] mt-1">bookings</p>
            <div className="mt-4 flex gap-1">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 transition-colors duration-500 ${
                    i < (brief?.bookings.count || 0)
                      ? "bg-[#8C7355]"
                      : "bg-[#EBE8E2]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white p-6 border border-[#EBE8E2]">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-3.5 h-3.5 text-[#8C7355] opacity-70" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#7A7A7A]">
                Revenue
              </span>
            </div>
            <div className="font-serif text-4xl text-[#1A1A1A]">
              ${brief?.bookings.revenue || 0}
            </div>
            <p className="text-[11px] text-[#7A7A7A] mt-1">deposits</p>
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-white p-6 border border-[#EBE8E2]">
          <div className="flex items-center gap-2 mb-5">
            <Clock className="w-3.5 h-3.5 text-[#8C7355] opacity-70" />
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A7A]">
              Availability
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div
              className={`p-4 border transition-colors duration-500 ${
                brief?.slots.morning
                  ? "border-[#8C7355]/30 bg-[#F9F8F6]"
                  : "border-[#EBE8E2]"
              }`}
            >
              <p className="font-serif text-[#1A1A1A] mb-1">Morning</p>
              <p className="text-[11px] text-[#7A7A7A]">9:00 AM - 1:00 PM</p>
              <p
                className={`text-[11px] mt-2 ${
                  brief?.slots.morning ? "text-[#8C7355]" : "text-[#A3A3A3]"
                }`}
              >
                {brief?.slots.morning ? "Available" : "Booked"}
              </p>
            </div>
            <div
              className={`p-4 border transition-colors duration-500 ${
                brief?.slots.afternoon
                  ? "border-[#8C7355]/30 bg-[#F9F8F6]"
                  : "border-[#EBE8E2]"
              }`}
            >
              <p className="font-serif text-[#1A1A1A] mb-1">Afternoon</p>
              <p className="text-[11px] text-[#7A7A7A]">2:00 PM - 6:00 PM</p>
              <p
                className={`text-[11px] mt-2 ${
                  brief?.slots.afternoon ? "text-[#8C7355]" : "text-[#A3A3A3]"
                }`}
              >
                {brief?.slots.afternoon ? "Available" : "Booked"}
              </p>
            </div>
          </div>
        </div>

        {/* VIP Waitlist */}
        <div className="bg-white p-6 border border-[#EBE8E2]">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-[#8C7355] opacity-70" />
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A7A]">
                Waitlist
              </span>
            </div>
            <span className="text-[11px] text-[#A3A3A3]">
              {waitlist.length} {waitlist.length === 1 ? "person" : "people"}
            </span>
          </div>

          {waitlist.length === 0 ? (
            <div className="text-center py-10">
              <Users className="w-6 h-6 text-[#EBE8E2] mx-auto mb-3" />
              <p className="text-[13px] text-[#A3A3A3]">No one on waitlist</p>
            </div>
          ) : (
            <div className="space-y-3">
              {waitlist.map((entry, i) => (
                <div
                  key={i}
                  className={`p-4 border transition-colors duration-500 ${
                    entry.priority === "HIGH"
                      ? "border-[#8C7355]/40 bg-[#F9F8F6]"
                      : "border-[#EBE8E2]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-serif text-[#1A1A1A] truncate">
                          {entry.name}
                        </span>
                        {entry.priority === "HIGH" && (
                          <span className="text-[9px] uppercase tracking-[0.1em] text-[#8C7355] border border-[#8C7355] px-1.5 py-0.5">
                            VIP
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-[#7A7A7A]">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 opacity-60" />
                          {entry.phone}
                        </span>
                        <span className="flex items-center gap-1 hidden sm:flex">
                          <Mail className="w-3 h-3 opacity-60" />
                          {entry.email}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => openWhatsAppConcierge(entry)}
                      className="flex-shrink-0 w-10 h-10 bg-[#25D366] text-white flex items-center justify-center hover:opacity-70 transition-all duration-500"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>

                  {entry.lastNotifiedAt && (
                    <p className="text-[10px] text-[#A3A3A3] mt-2">
                      Notified: {new Date(entry.lastNotifiedAt).toLocaleString()}
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
            className="flex items-center justify-center gap-2 p-4 bg-white border border-[#EBE8E2] hover:opacity-70 transition-all duration-500"
          >
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A7A]">View Site</span>
            <ArrowUpRight className="w-3 h-3 text-[#A3A3A3]" />
          </a>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setAdminKey("");
            }}
            className="flex items-center justify-center gap-2 p-4 bg-white border border-[#EBE8E2] hover:opacity-70 transition-all duration-500"
          >
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A7A]">Logout</span>
            <LogOut className="w-3 h-3 text-[#A3A3A3]" />
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-[#A3A3A3] py-4 tracking-wide">
          IVA Nail Art Admin
        </p>
      </div>
    </main>
  );
}
