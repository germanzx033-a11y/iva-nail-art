"use client";

/**
 * IVA Nail Art - Premium Client Dashboard
 * Neuromarketing optimized with improved visibility & engagement
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Calendar,
  Star,
  Heart,
  Clock,
  Gift,
  ChevronRight,
  Award,
  Sparkles,
  Camera,
  Bell,
  Settings,
  LogOut,
  Plus,
  Check,
  Crown,
  Gem,
  Zap,
  TrendingUp,
  Share2,
  Copy,
  ExternalLink,
  Shield,
  Flame,
  Timer,
} from "lucide-react";
import Link from "next/link";

// Subtle animated background with fixed values
const ORBS_CONFIG = [
  { width: 280, height: 320, left: "10%", top: "5%", x: 30, y: -20, duration: 18 },
  { width: 200, height: 180, left: "80%", top: "15%", x: -40, y: 25, duration: 22 },
  { width: 350, height: 280, left: "25%", top: "60%", x: 20, y: -35, duration: 16 },
  { width: 150, height: 220, left: "70%", top: "75%", x: -25, y: 40, duration: 20 },
];

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C1017] via-[#0D0809] to-[#120C0E]" />
      {ORBS_CONFIG.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.width,
            height: orb.height,
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? "rgba(183, 110, 121, 0.25)" : "rgba(212, 165, 116, 0.15)"
            }, transparent 70%)`,
            left: orb.left,
            top: orb.top,
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, orb.x, 0],
            y: [0, orb.y, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Premium nail designs with beautiful gradients
const NAIL_DESIGNS = [
  { id: "1", name: "Rose Gold Chrome", gradient: "from-[#E8B4B8] via-[#EDD1B0] to-[#B76E79]", emoji: "✨" },
  { id: "2", name: "3D White Florals", gradient: "from-[#FAF8F5] via-[#F0EDE8] to-[#E8E2DB]", emoji: "🌸" },
  { id: "3", name: "Burgundy Velvet", gradient: "from-[#722F37] via-[#8B3A44] to-[#5A252C]", emoji: "🍷" },
  { id: "4", name: "Glazed Donut", gradient: "from-[#F5E6D3] via-[#E8D5C4] to-[#DEC4B0]", emoji: "🍩" },
  { id: "5", name: "Holographic", gradient: "from-[#A8E6CF] via-[#DCEDC1] to-[#FFD3B6]", emoji: "🌈" },
  { id: "6", name: "Midnight Blue", gradient: "from-[#2C3E50] via-[#34495E] to-[#1A252F]", emoji: "🌙" },
];

const APPOINTMENTS = [
  {
    id: "1",
    service: "Signature Gel + 3D Art",
    date: "2025-02-15",
    time: "2:00 PM",
    status: "upcoming" as const,
    price: 95,
    design: "Winter Florals",
  },
  {
    id: "2",
    service: "Luxury Spa Pedicure",
    date: "2025-01-28",
    time: "11:00 AM",
    status: "completed" as const,
    price: 85,
  },
  {
    id: "3",
    service: "Chrome Manicure",
    date: "2025-01-10",
    time: "3:30 PM",
    status: "completed" as const,
    price: 75,
    design: "Rose Gold",
  },
];

const REWARDS = [
  { id: "1", name: "Free Nail Art Upgrade", points: 100, icon: Sparkles, gradient: "from-pink-500 to-rose-600" },
  { id: "2", name: "$15 Off Any Service", points: 150, icon: Zap, gradient: "from-amber-400 to-orange-500" },
  { id: "3", name: "Free Paraffin Treatment", points: 200, icon: Gem, gradient: "from-cyan-400 to-blue-500" },
  { id: "4", name: "VIP Priority Booking", points: 300, icon: Crown, gradient: "from-yellow-400 to-amber-500" },
];

type Tab = "overview" | "appointments" | "designs" | "rewards" | "settings";

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [userPoints] = useState(245);
  const [tier] = useState<"silver" | "gold" | "platinum">("silver");
  const [copiedCode, setCopiedCode] = useState(false);
  const [hoveredDesign, setHoveredDesign] = useState<string | null>(null);

  const user = {
    name: "Sarah Mitchell",
    initials: "SM",
    email: "sarah@example.com",
    phone: "(347) 555-1234",
    memberSince: "June 2024",
    totalVisits: 12,
    totalSpent: 840,
    nextAppointment: APPOINTMENTS.find((a) => a.status === "upcoming"),
  };

  const tierConfig = {
    silver: { next: 500, nextTier: "Gold", gradient: "from-gray-300 to-gray-400", emoji: "🥈", label: "Silver" },
    gold: { next: 1000, nextTier: "Platinum", gradient: "from-yellow-400 to-amber-500", emoji: "🥇", label: "Gold" },
    platinum: { next: 2000, nextTier: "Diamond", gradient: "from-purple-400 to-pink-500", emoji: "💎", label: "Platinum" },
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText("SARAH100");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "designs", label: "Saved Looks", icon: Heart },
    { id: "rewards", label: "Rewards", icon: Gift },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative">
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Top Navigation */}
        <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
              <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              <span className="font-serif text-xl tracking-wide font-medium">IVA</span>
            </Link>

            <div className="flex items-center gap-3">
              <button className="relative p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-white/80" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white/80 hover:text-white text-sm font-medium">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Profile Section */}
        <section className="relative py-10 sm:py-14 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end gap-8">
              {/* Profile Avatar */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative flex-shrink-0"
              >
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-[#B76E79] to-[#722F37] p-[3px] shadow-2xl shadow-[#722F37]/40">
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#1C1017] to-[#0D0809] flex items-center justify-center">
                    <span className="text-4xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#E8B4B8] to-[#B76E79] drop-shadow-lg">
                      {user.initials}
                    </span>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 text-2xl drop-shadow-lg">{tierConfig[tier].emoji}</div>
                <button className="absolute -bottom-1 -right-1 w-9 h-9 bg-gradient-to-br from-[#B76E79] to-[#722F37] rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </motion.div>

              {/* User Info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex-1"
              >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-1 drop-shadow-sm">
                  <span className="text-white font-medium">Welcome back, </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0D0C0] via-[#E8B4B8] to-[#D4A574] font-bold">
                    {user.name.split(" ")[0]}
                  </span>
                </h1>
                <p className="text-white/60 text-sm mb-4 font-medium">Member since {user.memberSince}</p>

                {/* Tier & Points Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${tierConfig[tier].gradient} shadow-lg`}>
                    <Award className="w-4 h-4 text-white drop-shadow" />
                    <span className="font-bold text-white text-sm drop-shadow">{tierConfig[tier].label} Member</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <Gem className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-white text-lg">{userPoints}</span>
                    <span className="text-white/70 text-sm font-medium">points</span>
                  </div>
                </div>
              </motion.div>

              {/* Stats Cards */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-3 gap-3 sm:gap-4"
              >
                {[
                  { label: "Visits", value: user.totalVisits, icon: Calendar, color: "text-pink-400" },
                  { label: "Points", value: userPoints, icon: Gem, color: "text-amber-400" },
                  { label: "Spent", value: `$${user.totalSpent}`, icon: TrendingUp, color: "text-emerald-400" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="text-center p-3 sm:p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                    <p className="text-xl sm:text-2xl font-bold text-white drop-shadow">{stat.value}</p>
                    <p className="text-[10px] sm:text-xs text-white/60 font-semibold uppercase tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Progress Bar to Next Tier */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-5 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-sm text-white/90 font-semibold">Progress to {tierConfig[tier].nextTier}</span>
                </div>
                <span className="text-sm font-bold text-white">{userPoints} / {tierConfig[tier].next}</span>
              </div>
              <div className="h-3 bg-black/40 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(userPoints / tierConfig[tier].next) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full rounded-full bg-gradient-to-r ${tierConfig[tier].gradient} shadow-lg`}
                />
              </div>
              <p className="text-xs text-white/60 mt-2 font-medium">
                Only <span className="text-amber-400 font-bold">{tierConfig[tier].next - userPoints} points</span> away from unlocking {tierConfig[tier].nextTier} perks!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <nav className="sticky top-[73px] z-40 border-y border-white/10 bg-black/60 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-[#B76E79] to-[#722F37] text-white shadow-lg shadow-[#722F37]/30"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 sm:space-y-8"
              >
                {/* Next Appointment - Hero Card */}
                {user.nextAppointment && (
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#B76E79]/25 via-[#722F37]/15 to-transparent border border-[#B76E79]/40 p-6 sm:p-8">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-[#B76E79]/20 rounded-full blur-3xl" />

                    {/* Urgency Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 border border-amber-500/40 rounded-full">
                      <Timer className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-xs font-bold text-amber-300">Upcoming</span>
                    </div>

                    <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#B76E79] to-[#722F37] flex items-center justify-center shadow-xl shadow-[#722F37]/30">
                        <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[#F0D0C0] text-xs font-bold uppercase tracking-wider mb-1">Your Next Appointment</p>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 drop-shadow">{user.nextAppointment.service}</h3>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                          <span className="flex items-center gap-1.5 text-sm">
                            <Calendar className="w-4 h-4 text-[#E8B4B8]" />
                            <span className="font-semibold text-white">{formatDate(user.nextAppointment.date)}</span>
                          </span>
                          <span className="flex items-center gap-1.5 text-sm">
                            <Clock className="w-4 h-4 text-[#E8B4B8]" />
                            <span className="font-semibold text-white">{user.nextAppointment.time}</span>
                          </span>
                          {user.nextAppointment.design && (
                            <span className="flex items-center gap-1.5 text-sm">
                              <Sparkles className="w-4 h-4 text-amber-400" />
                              <span className="font-semibold text-white">{user.nextAppointment.design}</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2 lg:pt-0">
                        <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-[#722F37] rounded-xl font-bold hover:bg-white/90 transition-colors shadow-lg text-sm sm:text-base">
                          Reschedule
                        </button>
                        <button className="px-5 sm:px-6 py-2.5 sm:py-3 border border-white/40 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors text-sm sm:text-base">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Grid Layout */}
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Available Rewards */}
                  <div className="lg:col-span-2 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-5 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-white flex items-center gap-2">
                        <Gift className="w-5 h-5 text-[#E8B4B8]" />
                        Available Rewards
                      </h3>
                      <button onClick={() => setActiveTab("rewards")} className="text-sm text-[#F0D0C0] hover:text-white transition-colors font-semibold">
                        View All →
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {REWARDS.map((reward) => {
                        const canRedeem = userPoints >= reward.points;
                        const Icon = reward.icon;
                        return (
                          <div
                            key={reward.id}
                            className={`relative overflow-hidden rounded-2xl p-4 border transition-all ${
                              canRedeem
                                ? "bg-white/10 border-white/20 hover:border-[#B76E79]/50 hover:bg-white/15"
                                : "bg-white/5 border-white/10 opacity-60"
                            }`}
                          >
                            <div className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br ${reward.gradient} opacity-20 rounded-full blur-2xl`} />
                            <div className="relative flex items-start gap-3">
                              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${reward.gradient} flex items-center justify-center shadow-lg`}>
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-white text-sm mb-0.5 truncate">{reward.name}</p>
                                <p className="text-xs text-white/60 font-medium">{reward.points} points</p>
                              </div>
                              {canRedeem && (
                                <button className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold text-white transition-colors">
                                  Redeem
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Referral Card */}
                  <div className="rounded-3xl bg-gradient-to-br from-[#B76E79]/25 to-[#722F37]/30 border border-[#B76E79]/40 p-5 sm:p-6">
                    <div className="text-center">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#B76E79] to-[#722F37] flex items-center justify-center shadow-xl shadow-[#722F37]/30">
                        <Share2 className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-white mb-2">Refer & Earn</h3>
                      <p className="text-white/70 text-sm mb-5 font-medium">
                        Share your code & get <span className="text-amber-400 font-bold">100 points</span> for each friend who books!
                      </p>
                      <div className="mb-4">
                        <input
                          type="text"
                          value="SARAH100"
                          readOnly
                          className="w-full px-4 py-3 bg-black/40 border border-white/30 rounded-xl text-center font-mono text-lg tracking-widest text-white font-bold"
                        />
                      </div>
                      <button
                        onClick={copyReferralCode}
                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                          copiedCode
                            ? "bg-emerald-500 text-white"
                            : "bg-white text-[#722F37] hover:bg-white/90"
                        }`}
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-5 h-5" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-5 h-5" />
                            Copy Code
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Saved Designs */}
                <div className="rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-white flex items-center gap-2">
                      <Heart className="w-5 h-5 text-[#E8B4B8]" />
                      Your Saved Looks
                    </h3>
                    <button onClick={() => setActiveTab("designs")} className="text-sm text-[#F0D0C0] hover:text-white transition-colors font-semibold">
                      View All →
                    </button>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
                    {NAIL_DESIGNS.map((design) => (
                      <motion.div
                        key={design.id}
                        onHoverStart={() => setHoveredDesign(design.id)}
                        onHoverEnd={() => setHoveredDesign(null)}
                        className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${design.gradient}`} />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                          <span className="text-2xl sm:text-3xl mb-1 drop-shadow-lg">{design.emoji}</span>
                          <p className="text-[10px] sm:text-xs text-center font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg leading-tight">
                            {design.name}
                          </p>
                        </div>
                        <motion.div
                          initial={false}
                          animate={{ scale: hoveredDesign === design.id ? 1 : 0 }}
                          className="absolute top-1.5 right-1.5"
                        >
                          <Heart className="w-4 h-4 text-white fill-white drop-shadow" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { icon: Calendar, label: "Book Now", href: "/", gradient: "from-[#B76E79] to-[#722F37]" },
                    { icon: Heart, label: "Gallery", href: "/#gallery", gradient: "from-pink-500 to-rose-600" },
                    { icon: Gift, label: "Gift Cards", href: "#", gradient: "from-purple-500 to-indigo-600" },
                    { icon: Star, label: "Review", href: "#", gradient: "from-amber-400 to-orange-500" },
                  ].map((action, i) => (
                    <Link
                      key={i}
                      href={action.href}
                      className="group relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-15 transition-opacity`} />
                      <div className="relative flex flex-col items-center text-center">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 mb-3 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                          <action.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <span className="font-bold text-white text-sm">{action.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Social Proof Banner */}
                <div className="rounded-2xl bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-500/30 p-4 sm:p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {["👩", "👱‍♀️", "👩‍🦰", "👧"].map((emoji, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-black/40 flex items-center justify-center text-sm">
                          {emoji}
                        </div>
                      ))}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">
                        <span className="text-amber-400 font-bold">2,500+</span> happy clients trust IVA Nail Art
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        ))}
                        <span className="text-xs text-white/60 ml-1 font-medium">4.9/5 rating</span>
                      </div>
                    </div>
                    <Shield className="w-8 h-8 text-emerald-400 opacity-70" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Appointments Tab */}
            {activeTab === "appointments" && (
              <motion.div
                key="appointments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Your Appointments</h2>
                  <Link
                    href="/"
                    className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-[#B76E79] to-[#722F37] rounded-xl font-bold text-white text-sm hover:shadow-lg hover:shadow-[#722F37]/30 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Book New
                  </Link>
                </div>

                <div className="space-y-4">
                  {APPOINTMENTS.map((apt, i) => (
                    <motion.div
                      key={apt.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`rounded-2xl p-5 sm:p-6 border transition-all ${
                        apt.status === "upcoming"
                          ? "bg-gradient-to-r from-[#B76E79]/20 to-[#722F37]/10 border-[#B76E79]/40"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center ${
                          apt.status === "upcoming"
                            ? "bg-gradient-to-br from-[#B76E79] to-[#722F37] shadow-lg shadow-[#722F37]/30"
                            : "bg-emerald-500/20 text-emerald-400"
                        }`}>
                          {apt.status === "completed" ? (
                            <Check className="w-6 h-6 sm:w-7 sm:h-7" />
                          ) : (
                            <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-white text-base sm:text-lg">{apt.service}</h3>
                            {apt.status === "upcoming" && (
                              <span className="px-2.5 py-0.5 bg-[#B76E79] rounded-full text-xs font-bold text-white">Upcoming</span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-[#E8B4B8]" />
                              <span className="text-white font-medium">{formatDate(apt.date)}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-[#E8B4B8]" />
                              <span className="text-white font-medium">{apt.time}</span>
                            </span>
                            {apt.design && (
                              <span className="flex items-center gap-1.5 text-[#F0D0C0]">
                                <Sparkles className="w-4 h-4" />
                                <span className="font-medium">{apt.design}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xl sm:text-2xl font-bold text-white">${apt.price}</p>
                          {apt.status === "completed" && (
                            <button className="mt-2 text-sm text-[#F0D0C0] hover:text-white transition-colors font-semibold flex items-center gap-1 ml-auto">
                              <Star className="w-4 h-4" />
                              Leave Review
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Designs Tab */}
            {activeTab === "designs" && (
              <motion.div
                key="designs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Your Saved Looks</h2>
                  <Link href="/#gallery" className="text-sm text-[#F0D0C0] hover:text-white transition-colors font-semibold flex items-center gap-1">
                    Browse Gallery
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {NAIL_DESIGNS.map((design, i) => (
                    <motion.div
                      key={design.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${design.gradient}`} />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />

                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <span className="text-4xl sm:text-5xl mb-2 group-hover:scale-110 transition-transform drop-shadow-lg">{design.emoji}</span>
                        <p className="font-bold text-white text-center text-sm opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">
                          {design.name}
                        </p>
                      </div>

                      <button className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white/30">
                        <Heart className="w-4 h-4 text-white fill-white" />
                      </button>

                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all">
                        <button className="w-full py-2.5 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-bold text-white hover:bg-white/30 transition-colors">
                          Book This Look
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Rewards Tab */}
            {activeTab === "rewards" && (
              <motion.div
                key="rewards"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">Your Rewards</h2>
                  <p className="text-white/70 font-medium">
                    You have <span className="text-amber-400 font-bold">{userPoints} points</span> available to redeem
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mb-8 sm:mb-10">
                  {REWARDS.map((reward, i) => {
                    const canRedeem = userPoints >= reward.points;
                    const Icon = reward.icon;
                    return (
                      <motion.div
                        key={reward.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative overflow-hidden rounded-3xl p-5 sm:p-6 border transition-all ${
                          canRedeem
                            ? "bg-white/10 border-white/20"
                            : "bg-white/5 border-white/10 opacity-60"
                        }`}
                      >
                        <div className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${reward.gradient} opacity-20 rounded-full blur-3xl`} />
                        <div className="relative flex items-start gap-4 sm:gap-5">
                          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${reward.gradient} flex items-center justify-center shadow-xl`}>
                            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base sm:text-lg font-bold text-white mb-1">{reward.name}</h3>
                            <p className="text-white/60 text-sm font-medium mb-3">{reward.points} points required</p>
                            <button
                              disabled={!canRedeem}
                              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                canRedeem
                                  ? "bg-white text-[#1A1A1A] hover:bg-white/90"
                                  : "bg-white/20 text-white/50 cursor-not-allowed"
                              }`}
                            >
                              {canRedeem ? "Redeem Now" : `Need ${reward.points - userPoints} more`}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Referral Section */}
                <div className="rounded-3xl bg-gradient-to-br from-[#B76E79]/25 to-[#722F37]/20 border border-[#B76E79]/40 p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#B76E79] to-[#722F37] flex items-center justify-center shadow-xl">
                          <Share2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-serif font-bold text-white">Share the Love</h3>
                          <p className="text-white/70 text-sm font-medium">Earn 100 points for each referral</p>
                        </div>
                      </div>
                      <p className="text-white/80 text-sm sm:text-base">
                        When your friends book their first appointment using your code, you both get rewarded!
                        They get <span className="text-white font-bold">15% off</span> and you earn <span className="text-amber-400 font-bold">100 bonus points</span>.
                      </p>
                    </div>
                    <div className="lg:w-72">
                      <p className="text-sm text-white/70 mb-2 font-semibold">Your referral code</p>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value="SARAH100"
                          readOnly
                          className="flex-1 px-4 py-3 bg-black/40 border border-white/30 rounded-xl text-center font-mono text-lg tracking-widest text-white font-bold"
                        />
                        <button
                          onClick={copyReferralCode}
                          className={`px-4 sm:px-5 py-3 rounded-xl font-bold transition-all ${
                            copiedCode
                              ? "bg-emerald-500 text-white"
                              : "bg-white text-[#722F37] hover:bg-white/90"
                          }`}
                        >
                          {copiedCode ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl"
              >
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-6 sm:mb-8">Account Settings</h2>

                <div className="space-y-5 sm:space-y-6">
                  {/* Profile Section */}
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-5 sm:p-6">
                    <h3 className="font-bold text-white mb-5 sm:mb-6 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#E8B4B8]" />
                      Profile Information
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: "Full Name", value: user.name, type: "text" },
                        { label: "Email", value: user.email, type: "email" },
                        { label: "Phone", value: user.phone, type: "tel" },
                      ].map((field, i) => (
                        <div key={i}>
                          <label className="text-sm text-white/70 block mb-2 font-semibold">{field.label}</label>
                          <input
                            type={field.type}
                            defaultValue={field.value}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#B76E79]/50 transition-colors text-white font-medium"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notifications Section */}
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-5 sm:p-6">
                    <h3 className="font-bold text-white mb-5 sm:mb-6 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-[#E8B4B8]" />
                      Notification Preferences
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: "Appointment Reminders", desc: "Get notified 24 hours before" },
                        { label: "Promotional Offers", desc: "Special deals and discounts" },
                        { label: "Touch-up Reminders", desc: "Time for a refresh notification" },
                        { label: "New Designs", desc: "Latest gallery updates" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-2">
                          <div>
                            <p className="font-semibold text-white">{item.label}</p>
                            <p className="text-sm text-white/60">{item.desc}</p>
                          </div>
                          <button className="w-12 sm:w-14 h-7 sm:h-8 bg-[#B76E79] rounded-full relative transition-colors">
                            <div className="absolute right-1 top-1 w-5 sm:w-6 h-5 sm:h-6 bg-white rounded-full shadow transition-transform" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-[#B76E79] to-[#722F37] rounded-xl font-bold text-white hover:shadow-lg hover:shadow-[#722F37]/30 transition-all">
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
