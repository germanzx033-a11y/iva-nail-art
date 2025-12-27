"use client";

/**
 * IVA-PULSE: Advanced Admin Dashboard
 * EDITORIAL LUXURY - Complete Management System
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  TrendingUp,
  TrendingDown,
  Star,
  Gift,
  Crown,
  BarChart3,
  PieChart,
  Settings,
  Bell,
  CheckCircle,
  XCircle,
  Eye,
  Heart,
  Sparkles,
  FileText,
} from "lucide-react";
import dynamic from "next/dynamic";

const WhatsAppScripts = dynamic(() => import("../components/WhatsAppScripts"), { ssr: false });

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
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "waitlist" | "analytics" | "notifications" | "scripts">("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);

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

      // Mock analytics data
      setAnalytics({
        weeklyRevenue: 1850,
        weeklyChange: 12.5,
        monthlyBookings: 48,
        monthlyChange: 8.3,
        avgRating: 4.9,
        totalReviews: 127,
        topServices: [
          { name: "Custom Nail Art", count: 18, revenue: 1530 },
          { name: "Gel Manicure", count: 15, revenue: 825 },
          { name: "Luxury Pedicure", count: 10, revenue: 650 },
          { name: "Gel Extensions", count: 5, revenue: 600 },
        ],
        loyaltyMembers: 89,
        referrals: 23,
        conversionRate: 78.5,
      });

      // Mock notifications
      setNotifications([
        { id: "1", type: "booking", message: "New booking from Sarah M. for Dec 27", time: "2 min ago", read: false },
        { id: "2", type: "review", message: "New 5-star review from Emily R.", time: "1 hour ago", read: false },
        { id: "3", type: "loyalty", message: "Jessica T. reached Gold tier!", time: "3 hours ago", read: true },
        { id: "4", type: "referral", message: "Amanda L. referred a new client", time: "Yesterday", read: true },
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

  const unreadCount = notifications.filter(n => !n.read).length;

  // =============================================
  // LOGIN SCREEN
  // =============================================

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#F9F8F6] flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          {/* Logo */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-[#722F37] to-[#8B3A44] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white font-serif text-3xl">IVA</span>
            </div>
            <h1 className="font-serif text-3xl text-[#1A1A1A] mb-2">Admin Portal</h1>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#7A7A7A]">Management Dashboard</p>
          </div>

          {/* Login Form */}
          <div className="bg-white p-8 rounded-2xl border border-[#EBE8E2] shadow-lg">
            <div className="mb-6">
              <label className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A7A] block mb-3">
                <Shield className="w-3.5 h-3.5 inline mr-2 opacity-60" />
                Admin Key
              </label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-4 py-3 border border-[#EBE8E2] rounded-xl focus:outline-none focus:border-[#722F37] transition-colors"
                placeholder="Enter admin key"
              />
            </div>

            <button
              onClick={() => {
                triggerHaptic("medium");
                setIsAuthenticated(true);
              }}
              disabled={!adminKey}
              className="w-full py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white text-sm uppercase tracking-wider font-medium rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              Access Dashboard
            </button>
          </div>

          <p className="text-center text-[#A3A3A3] text-[11px] mt-8 tracking-wide">
            Secured access only
          </p>
        </motion.div>
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
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#722F37] to-[#8B3A44] rounded-xl flex items-center justify-center">
              <span className="text-white font-serif text-lg">IVA</span>
            </div>
            <div>
              <h1 className="font-serif text-xl text-[#1A1A1A]">Dashboard</h1>
              <p className="text-[11px] text-[#7A7A7A] tracking-wide">
                {brief?.formattedDate || "Loading..."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-[#F1EFE9] rounded-xl transition-colors"
            >
              <Bell className="w-5 h-5 text-[#7A7A7A]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#722F37] text-white text-[10px] rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Refresh */}
            <button
              onClick={() => {
                triggerHaptic("light");
                fetchBrief();
              }}
              disabled={isLoading}
              className="p-2 hover:bg-[#F1EFE9] rounded-xl transition-colors"
            >
              <RefreshCw className={`w-5 h-5 text-[#7A7A7A] ${isLoading ? "animate-spin" : ""}`} />
            </button>

            {/* Logout */}
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setAdminKey("");
              }}
              className="p-2 hover:bg-[#F1EFE9] rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5 text-[#7A7A7A]" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: "dashboard", label: "Overview", icon: BarChart3 },
              { id: "waitlist", label: "Waitlist", icon: Users },
              { id: "scripts", label: "Scripts", icon: FileText },
              { id: "analytics", label: "Analytics", icon: PieChart },
              { id: "notifications", label: "Activity", icon: Bell },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-[#722F37] border-b-2 border-[#722F37]"
                    : "text-[#7A7A7A] hover:text-[#1A1A1A]"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 right-6 z-50 w-80 bg-white rounded-xl shadow-xl border border-[#EBE8E2]"
          >
            <div className="p-4 border-b border-[#EBE8E2]">
              <h3 className="font-serif text-lg text-[#1A1A1A]">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map(notif => (
                <div
                  key={notif.id}
                  className={`p-4 border-b border-[#EBE8E2] last:border-0 ${!notif.read ? "bg-[#F9F8F6]" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      notif.type === "booking" ? "bg-blue-100 text-blue-600" :
                      notif.type === "review" ? "bg-yellow-100 text-yellow-600" :
                      notif.type === "loyalty" ? "bg-purple-100 text-purple-600" :
                      "bg-green-100 text-green-600"
                    }`}>
                      {notif.type === "booking" ? <Calendar className="w-4 h-4" /> :
                       notif.type === "review" ? <Star className="w-4 h-4" /> :
                       notif.type === "loyalty" ? <Crown className="w-4 h-4" /> :
                       <Gift className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#1A1A1A]">{notif.message}</p>
                      <p className="text-xs text-[#7A7A7A] mt-1">{notif.time}</p>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-[#722F37] rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-white border border-red-200 rounded-xl p-4 flex items-center gap-3 mb-6">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <p className="text-red-600 text-[13px]">{error}</p>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Status Toggle & Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              {/* Status Card */}
              <div className="bg-white p-6 rounded-xl border border-[#EBE8E2]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isResting ? "bg-[#F1EFE9] text-[#7A7A7A]" : "bg-green-100 text-green-600"
                    }`}>
                      {isResting ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
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
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      isResting ? "bg-[#7A7A7A]" : "bg-green-500"
                    }`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                      isResting ? "left-0.5" : "left-6"
                    }`} />
                  </button>
                </div>
              </div>

              {/* Today's Bookings */}
              <div className="bg-white p-6 rounded-xl border border-[#EBE8E2]">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-[#B76E79]" />
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#7A7A7A]">Today</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-4xl text-[#1A1A1A]">{brief?.bookings.count || 0}</span>
                  <span className="text-[#A3A3A3]">/{brief?.bookings.maxCapacity || 2}</span>
                </div>
                <p className="text-[11px] text-[#7A7A7A] mt-1">bookings</p>
              </div>

              {/* Revenue */}
              <div className="bg-white p-6 rounded-xl border border-[#EBE8E2]">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-4 h-4 text-[#B76E79]" />
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#7A7A7A]">Revenue</span>
                </div>
                <div className="font-serif text-4xl text-[#1A1A1A]">${brief?.bookings.revenue || 0}</div>
                <p className="text-[11px] text-[#7A7A7A] mt-1">deposits today</p>
              </div>

              {/* Waitlist */}
              <div className="bg-white p-6 rounded-xl border border-[#EBE8E2]">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-[#B76E79]" />
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#7A7A7A]">Waitlist</span>
                </div>
                <div className="font-serif text-4xl text-[#1A1A1A]">{brief?.waitlist.count || 0}</div>
                <p className="text-[11px] text-[#7A7A7A] mt-1">
                  {brief?.waitlist.highPriority || 0} VIP
                </p>
              </div>
            </div>

            {/* Time Slots & Weekly Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Time Slots */}
              <div className="bg-white p-6 rounded-xl border border-[#EBE8E2]">
                <div className="flex items-center gap-2 mb-5">
                  <Clock className="w-4 h-4 text-[#B76E79]" />
                  <span className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A7A]">Today&apos;s Availability</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border-2 transition-colors ${
                    brief?.slots.morning ? "border-green-200 bg-green-50" : "border-[#EBE8E2]"
                  }`}>
                    <p className="font-serif text-[#1A1A1A] mb-1">Morning</p>
                    <p className="text-[11px] text-[#7A7A7A]">9:00 AM - 1:00 PM</p>
                    <div className="flex items-center gap-2 mt-2">
                      {brief?.slots.morning ? (
                        <><CheckCircle className="w-4 h-4 text-green-600" /><span className="text-xs text-green-600">Available</span></>
                      ) : (
                        <><XCircle className="w-4 h-4 text-red-500" /><span className="text-xs text-red-500">Booked</span></>
                      )}
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl border-2 transition-colors ${
                    brief?.slots.afternoon ? "border-green-200 bg-green-50" : "border-[#EBE8E2]"
                  }`}>
                    <p className="font-serif text-[#1A1A1A] mb-1">Afternoon</p>
                    <p className="text-[11px] text-[#7A7A7A]">2:00 PM - 6:00 PM</p>
                    <div className="flex items-center gap-2 mt-2">
                      {brief?.slots.afternoon ? (
                        <><CheckCircle className="w-4 h-4 text-green-600" /><span className="text-xs text-green-600">Available</span></>
                      ) : (
                        <><XCircle className="w-4 h-4 text-red-500" /><span className="text-xs text-red-500">Booked</span></>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Performance */}
              {analytics && (
                <div className="bg-white p-6 rounded-xl border border-[#EBE8E2]">
                  <div className="flex items-center gap-2 mb-5">
                    <TrendingUp className="w-4 h-4 text-[#B76E79]" />
                    <span className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A7A]">Weekly Performance</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] text-[#7A7A7A] mb-1">Revenue</p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl text-[#1A1A1A]">${analytics.weeklyRevenue}</span>
                        <span className={`text-xs flex items-center gap-1 ${analytics.weeklyChange >= 0 ? "text-green-600" : "text-red-500"}`}>
                          {analytics.weeklyChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {analytics.weeklyChange}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#7A7A7A] mb-1">Bookings</p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl text-[#1A1A1A]">{analytics.monthlyBookings}</span>
                        <span className={`text-xs flex items-center gap-1 ${analytics.monthlyChange >= 0 ? "text-green-600" : "text-red-500"}`}>
                          {analytics.monthlyChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {analytics.monthlyChange}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#7A7A7A] mb-1">Rating</p>
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif text-2xl text-[#1A1A1A]">{analytics.avgRating}</span>
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#7A7A7A] mb-1">Reviews</p>
                      <span className="font-serif text-2xl text-[#1A1A1A]">{analytics.totalReviews}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Top Services */}
            {analytics && (
              <div className="bg-white p-6 rounded-xl border border-[#EBE8E2]">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B76E79]" />
                    <span className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A7A]">Top Services This Month</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {analytics.topServices.map((service, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#F9F8F6] rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-gradient-to-br from-[#B76E79] to-[#722F37] rounded-lg flex items-center justify-center text-white text-xs font-medium">
                          {i + 1}
                        </span>
                        <span className="font-medium text-[#1A1A1A]">{service.name}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-sm text-[#7A7A7A]">{service.count} bookings</span>
                        <span className="font-serif text-[#722F37]">${service.revenue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="/" target="_blank" className="flex items-center justify-center gap-2 p-4 bg-white rounded-xl border border-[#EBE8E2] hover:shadow-md transition-shadow">
                <Eye className="w-4 h-4 text-[#7A7A7A]" />
                <span className="text-sm text-[#7A7A7A]">View Site</span>
              </a>
              <button className="flex items-center justify-center gap-2 p-4 bg-white rounded-xl border border-[#EBE8E2] hover:shadow-md transition-shadow">
                <Crown className="w-4 h-4 text-[#7A7A7A]" />
                <span className="text-sm text-[#7A7A7A]">Loyalty ({analytics?.loyaltyMembers})</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-4 bg-white rounded-xl border border-[#EBE8E2] hover:shadow-md transition-shadow">
                <Heart className="w-4 h-4 text-[#7A7A7A]" />
                <span className="text-sm text-[#7A7A7A]">Referrals ({analytics?.referrals})</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-4 bg-white rounded-xl border border-[#EBE8E2] hover:shadow-md transition-shadow">
                <Settings className="w-4 h-4 text-[#7A7A7A]" />
                <span className="text-sm text-[#7A7A7A]">Settings</span>
              </button>
            </div>
          </div>
        )}

        {/* Waitlist Tab */}
        {activeTab === "waitlist" && (
          <div className="bg-white rounded-xl border border-[#EBE8E2]">
            <div className="p-6 border-b border-[#EBE8E2]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#B76E79]" />
                  <h2 className="font-serif text-xl text-[#1A1A1A]">VIP Waitlist</h2>
                </div>
                <span className="text-sm text-[#7A7A7A]">{waitlist.length} people</span>
              </div>
            </div>

            {waitlist.length === 0 ? (
              <div className="text-center py-16">
                <Users className="w-12 h-12 text-[#EBE8E2] mx-auto mb-3" />
                <p className="text-[#7A7A7A]">No one on waitlist</p>
              </div>
            ) : (
              <div className="divide-y divide-[#EBE8E2]">
                {waitlist.map((entry, i) => (
                  <div key={i} className="p-5 hover:bg-[#F9F8F6] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#B76E79]/20 to-[#722F37]/20 rounded-full flex items-center justify-center">
                          <span className="font-serif text-lg text-[#722F37]">{entry.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-[#1A1A1A]">{entry.name}</span>
                            {entry.priority === "HIGH" && (
                              <span className="text-[9px] uppercase tracking-wider text-[#722F37] bg-[#722F37]/10 px-2 py-0.5 rounded-full">VIP</span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-[12px] text-[#7A7A7A]">
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {entry.phone}</span>
                            <span className="flex items-center gap-1 hidden sm:flex"><Mail className="w-3 h-3" /> {entry.email}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => openWhatsAppConcierge(entry)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-xl hover:bg-[#128C7E] transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm hidden sm:inline">Contact</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && analytics && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl border border-[#EBE8E2]">
                <p className="text-[11px] uppercase tracking-wider text-[#7A7A7A] mb-2">Conversion Rate</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl text-[#1A1A1A]">{analytics.conversionRate}%</span>
                </div>
                <p className="text-xs text-green-600 mt-1">+5.2% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-[#EBE8E2]">
                <p className="text-[11px] uppercase tracking-wider text-[#7A7A7A] mb-2">Loyalty Members</p>
                <span className="font-serif text-3xl text-[#1A1A1A]">{analytics.loyaltyMembers}</span>
                <p className="text-xs text-green-600 mt-1">+12 this month</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-[#EBE8E2]">
                <p className="text-[11px] uppercase tracking-wider text-[#7A7A7A] mb-2">Referrals</p>
                <span className="font-serif text-3xl text-[#1A1A1A]">{analytics.referrals}</span>
                <p className="text-xs text-green-600 mt-1">$460 revenue</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-[#EBE8E2]">
                <p className="text-[11px] uppercase tracking-wider text-[#7A7A7A] mb-2">Avg. Ticket</p>
                <span className="font-serif text-3xl text-[#1A1A1A]">$85</span>
                <p className="text-xs text-green-600 mt-1">+$8 from last month</p>
              </div>
            </div>

            {/* Revenue Chart Placeholder */}
            <div className="bg-white p-6 rounded-xl border border-[#EBE8E2]">
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-6">Revenue Trend</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {[65, 80, 75, 90, 85, 95, 100].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-to-t from-[#722F37] to-[#B76E79] rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[10px] text-[#7A7A7A]">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Breakdown */}
            <div className="bg-white p-6 rounded-xl border border-[#EBE8E2]">
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-6">Service Breakdown</h3>
              <div className="space-y-4">
                {analytics.topServices.map((service, i) => {
                  const percentage = (service.revenue / analytics.weeklyRevenue) * 100;
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#1A1A1A]">{service.name}</span>
                        <span className="text-[#7A7A7A]">${service.revenue} ({Math.round(percentage)}%)</span>
                      </div>
                      <div className="h-2 bg-[#F1EFE9] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-full bg-gradient-to-r from-[#722F37] to-[#B76E79] rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Scripts Tab */}
        {activeTab === "scripts" && (
          <div className="bg-white rounded-xl border border-[#EBE8E2] overflow-hidden">
            <WhatsAppScripts language="en" />
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-xl border border-[#EBE8E2]">
            <div className="p-6 border-b border-[#EBE8E2]">
              <h2 className="font-serif text-xl text-[#1A1A1A]">Recent Activity</h2>
            </div>
            <div className="divide-y divide-[#EBE8E2]">
              {notifications.map(notif => (
                <div key={notif.id} className={`p-5 ${!notif.read ? "bg-[#F9F8F6]" : ""}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      notif.type === "booking" ? "bg-blue-100 text-blue-600" :
                      notif.type === "review" ? "bg-yellow-100 text-yellow-600" :
                      notif.type === "loyalty" ? "bg-purple-100 text-purple-600" :
                      "bg-green-100 text-green-600"
                    }`}>
                      {notif.type === "booking" ? <Calendar className="w-5 h-5" /> :
                       notif.type === "review" ? <Star className="w-5 h-5" /> :
                       notif.type === "loyalty" ? <Crown className="w-5 h-5" /> :
                       <Gift className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-[#1A1A1A]">{notif.message}</p>
                      <p className="text-sm text-[#7A7A7A] mt-1">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-[11px] text-[#A3A3A3] py-8 tracking-wide">
          IVA Nail Art Admin Dashboard
        </p>
      </div>
    </main>
  );
}
