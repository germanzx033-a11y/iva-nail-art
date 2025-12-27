"use client";

/**
 * IVA Nail Art - Premium Client Dashboard
 * Ultra-luxurious design with glass morphism & animations
 */

import { useState, useEffect } from "react";
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
  X,
  Crown,
  Gem,
  Zap,
  TrendingUp,
  Share2,
  Copy,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

// Animated background particles - using fixed values to avoid hydration mismatch
const ORBS_CONFIG = [
  { width: 280, height: 320, left: "10%", top: "5%", x: 30, y: -20, duration: 18 },
  { width: 200, height: 180, left: "80%", top: "15%", x: -40, y: 25, duration: 22 },
  { width: 350, height: 280, left: "25%", top: "60%", x: 20, y: -35, duration: 16 },
  { width: 150, height: 220, left: "70%", top: "75%", x: -25, y: 40, duration: 20 },
  { width: 250, height: 200, left: "5%", top: "40%", x: 35, y: -15, duration: 24 },
  { width: 180, height: 260, left: "90%", top: "50%", x: -30, y: 30, duration: 19 },
];

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {ORBS_CONFIG.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.width,
            height: orb.height,
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? "rgba(183, 110, 121, 0.15)" : "rgba(114, 47, 55, 0.1)"
            }, transparent)`,
            left: orb.left,
            top: orb.top,
          }}
          animate={{
            x: [0, orb.x, 0],
            y: [0, orb.y, 0],
            scale: [1, 1.2, 1],
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

// Sparkle animation component
function SparkleEffect({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
      }}
    >
      <Sparkles className="w-4 h-4 text-yellow-400" />
    </motion.div>
  );
}

// Gradient text component
function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-[#D4A574] via-[#B76E79] to-[#722F37] bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

// Premium nail design cards with gradient fallbacks
const NAIL_DESIGNS = [
  { id: "1", name: "Rose Gold Chrome", gradient: "from-[#E8B4B8] via-[#EDD1B0] to-[#B76E79]", emoji: "✨" },
  { id: "2", name: "3D White Florals", gradient: "from-[#F5F5F5] via-[#E8E8E8] to-[#D4D0C8]", emoji: "🌸" },
  { id: "3", name: "Burgundy Velvet", gradient: "from-[#722F37] via-[#8B3A44] to-[#5A252C]", emoji: "🍷" },
  { id: "4", name: "Glazed Donut", gradient: "from-[#F5E6D3] via-[#E8D5C4] to-[#DEC4B0]", emoji: "🍩" },
  { id: "5", name: "Holographic", gradient: "from-[#A8E6CF] via-[#DCEDC1] to-[#FFD3B6]", emoji: "🌈" },
  { id: "6", name: "Midnight Blue", gradient: "from-[#1A1A2E] via-[#16213E] to-[#0F3460]", emoji: "🌙" },
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
  { id: "1", name: "Free Nail Art Upgrade", points: 100, icon: Sparkles, color: "from-purple-500 to-pink-500" },
  { id: "2", name: "$15 Off Any Service", points: 150, icon: Zap, color: "from-amber-500 to-orange-500" },
  { id: "3", name: "Free Paraffin Treatment", points: 200, icon: Gem, color: "from-cyan-500 to-blue-500" },
  { id: "4", name: "VIP Priority Booking", points: 300, icon: Crown, color: "from-yellow-500 to-amber-500" },
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
    silver: { next: 500, nextTier: "Gold", color: "from-gray-400 to-gray-300", icon: "🥈" },
    gold: { next: 1000, nextTier: "Platinum", color: "from-yellow-500 to-amber-400", icon: "🥇" },
    platinum: { next: 2000, nextTier: "Diamond", color: "from-purple-400 to-pink-400", icon: "💎" },
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
    { id: "appointments", label: "My Appointments", icon: Calendar },
    { id: "designs", label: "Saved Looks", icon: Heart },
    { id: "rewards", label: "Rewards", icon: Gift },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#0A0A0A] to-[#16213E]">
        <FloatingOrbs />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Premium Header */}
        <header className="relative">
          {/* Navigation Bar */}
          <div className="border-b border-white/10 backdrop-blur-xl bg-white/5">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span className="font-serif text-xl">IVA</span>
              </Link>
              <div className="flex items-center gap-4">
                <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#B76E79] rounded-full" />
                </button>
                <button className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Hero Section with Profile */}
          <div className="relative py-12 px-6">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#B76E79]/30 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-to-tr from-[#722F37]/30 to-transparent rounded-full blur-3xl" />

            <SparkleEffect className="top-20 right-[20%]" />
            <SparkleEffect className="top-32 right-[30%]" />
            <SparkleEffect className="top-16 right-[40%]" />

            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-end gap-8">
                {/* Avatar Section */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative"
                >
                  <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl bg-gradient-to-br from-[#B76E79] to-[#722F37] p-1 shadow-2xl shadow-[#B76E79]/30">
                    <div className="w-full h-full rounded-3xl bg-gradient-to-br from-[#1A1A2E] to-[#0A0A0A] flex items-center justify-center">
                      <span className="text-5xl lg:text-6xl font-serif bg-gradient-to-r from-[#D4A574] to-[#B76E79] bg-clip-text text-transparent">
                        {user.initials}
                      </span>
                    </div>
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-[#B76E79] to-[#722F37] rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Camera className="w-5 h-5" />
                  </button>
                  {/* Tier Badge */}
                  <div className="absolute -top-2 -right-2 text-2xl">{tierConfig[tier].icon}</div>
                </motion.div>

                {/* User Info */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex-1"
                >
                  <h1 className="text-3xl lg:text-4xl font-serif mb-2">
                    Welcome back, <GradientText>{user.name.split(" ")[0]}</GradientText>
                  </h1>
                  <p className="text-white/60 mb-4">Member since {user.memberSince}</p>

                  {/* Tier & Points */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${tierConfig[tier].color} text-white font-medium text-sm`}>
                      <Award className="w-4 h-4" />
                      <span className="capitalize">{tier} Member</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                      <Gem className="w-4 h-4 text-[#B76E79]" />
                      <span className="font-medium">{userPoints}</span>
                      <span className="text-white/60 text-sm">points</span>
                    </div>
                  </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-3 gap-4"
                >
                  {[
                    { label: "Visits", value: user.totalVisits, icon: Calendar },
                    { label: "Points", value: userPoints, icon: Gem },
                    { label: "Spent", value: `$${user.totalSpent}`, icon: TrendingUp },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <stat.icon className="w-5 h-5 mx-auto mb-2 text-[#B76E79]" />
                      <p className="text-2xl font-serif">{stat.value}</p>
                      <p className="text-xs text-white/50">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Progress to Next Tier */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-white/70">Progress to {tierConfig[tier].nextTier}</span>
                  <span className="text-sm font-medium">{userPoints} / {tierConfig[tier].next} points</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(userPoints / tierConfig[tier].next) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full rounded-full bg-gradient-to-r ${tierConfig[tier].color}`}
                  />
                </div>
                <p className="text-xs text-white/50 mt-2">
                  {tierConfig[tier].next - userPoints} more points to unlock {tierConfig[tier].nextTier} benefits
                </p>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="sticky top-0 z-20 border-y border-white/10 backdrop-blur-xl bg-black/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-[#B76E79] to-[#722F37] text-white shadow-lg shadow-[#722F37]/30"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Next Appointment - Featured Card */}
                {user.nextAppointment && (
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#B76E79]/20 to-[#722F37]/20 border border-[#B76E79]/30 p-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#B76E79]/20 rounded-full blur-3xl" />
                    <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#B76E79] to-[#722F37] flex items-center justify-center shadow-xl">
                        <Calendar className="w-10 h-10" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[#B76E79] text-sm font-medium mb-1">UPCOMING APPOINTMENT</p>
                        <h3 className="text-2xl font-serif mb-2">{user.nextAppointment.service}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-white/70">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(user.nextAppointment.date)}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {user.nextAppointment.time}
                          </span>
                          {user.nextAppointment.design && (
                            <span className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4" />
                              {user.nextAppointment.design}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="px-6 py-3 bg-white text-[#722F37] rounded-xl font-medium hover:bg-white/90 transition-colors">
                          Reschedule
                        </button>
                        <button className="px-6 py-3 border border-white/30 rounded-xl hover:bg-white/10 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Grid Layout */}
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Available Rewards */}
                  <div className="lg:col-span-2 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-serif flex items-center gap-2">
                        <Gift className="w-5 h-5 text-[#B76E79]" />
                        Available Rewards
                      </h3>
                      <button
                        onClick={() => setActiveTab("rewards")}
                        className="text-sm text-[#B76E79] hover:underline"
                      >
                        View All →
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {REWARDS.slice(0, 4).map((reward) => {
                        const canRedeem = userPoints >= reward.points;
                        const Icon = reward.icon;
                        return (
                          <div
                            key={reward.id}
                            className={`relative overflow-hidden rounded-2xl p-4 border transition-all ${
                              canRedeem
                                ? "bg-white/10 border-white/20 hover:border-[#B76E79]/50"
                                : "bg-white/5 border-white/10 opacity-60"
                            }`}
                          >
                            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${reward.color} opacity-20 rounded-full blur-2xl`} />
                            <div className="relative flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reward.color} flex items-center justify-center`}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium mb-1">{reward.name}</p>
                                <p className="text-sm text-white/50">{reward.points} points</p>
                              </div>
                              {canRedeem && (
                                <button className="px-3 py-1.5 bg-white/20 rounded-lg text-xs font-medium hover:bg-white/30 transition-colors">
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
                  <div className="rounded-3xl bg-gradient-to-br from-[#B76E79]/20 to-[#722F37]/30 border border-[#B76E79]/30 p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#B76E79] to-[#722F37] flex items-center justify-center">
                        <Share2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-serif mb-2">Refer & Earn</h3>
                      <p className="text-white/60 text-sm mb-6">
                        Share your code & get 100 points for each friend who books!
                      </p>
                      <div className="relative mb-4">
                        <input
                          type="text"
                          value="SARAH100"
                          readOnly
                          className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-center font-mono text-lg tracking-wider"
                        />
                      </div>
                      <button
                        onClick={copyReferralCode}
                        className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                          copiedCode
                            ? "bg-green-500 text-white"
                            : "bg-white text-[#722F37] hover:bg-white/90"
                        }`}
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy Code
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Saved Designs */}
                <div className="rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-serif flex items-center gap-2">
                      <Heart className="w-5 h-5 text-[#B76E79]" />
                      Your Saved Looks
                    </h3>
                    <button
                      onClick={() => setActiveTab("designs")}
                      className="text-sm text-[#B76E79] hover:underline"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {NAIL_DESIGNS.map((design) => (
                      <motion.div
                        key={design.id}
                        onHoverStart={() => setHoveredDesign(design.id)}
                        onHoverEnd={() => setHoveredDesign(null)}
                        className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${design.gradient}`} />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                          <span className="text-3xl mb-2">{design.emoji}</span>
                          <p className="text-xs text-center font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            {design.name}
                          </p>
                        </div>
                        <motion.div
                          initial={false}
                          animate={{ scale: hoveredDesign === design.id ? 1 : 0 }}
                          className="absolute top-2 right-2"
                        >
                          <Heart className="w-5 h-5 text-white fill-white" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: Calendar, label: "Book Appointment", href: "/", gradient: "from-[#B76E79] to-[#722F37]" },
                    { icon: Heart, label: "Browse Gallery", href: "/#gallery", gradient: "from-pink-500 to-rose-500" },
                    { icon: Gift, label: "Send Gift Card", href: "#", gradient: "from-purple-500 to-indigo-500" },
                    { icon: Star, label: "Leave Review", href: "#", gradient: "from-amber-500 to-orange-500" },
                  ].map((action, i) => (
                    <Link
                      key={i}
                      href={action.href}
                      className="group relative overflow-hidden rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />
                      <div className="relative flex flex-col items-center text-center">
                        <div className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <action.icon className="w-7 h-7" />
                        </div>
                        <span className="font-medium">{action.label}</span>
                      </div>
                    </Link>
                  ))}
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
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-serif">Your Appointments</h2>
                  <Link
                    href="/"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#B76E79] to-[#722F37] rounded-xl font-medium hover:shadow-lg hover:shadow-[#722F37]/30 transition-all"
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
                      className={`rounded-2xl p-6 border transition-all ${
                        apt.status === "upcoming"
                          ? "bg-gradient-to-r from-[#B76E79]/10 to-[#722F37]/10 border-[#B76E79]/30"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          apt.status === "upcoming"
                            ? "bg-gradient-to-br from-[#B76E79] to-[#722F37]"
                            : apt.status === "completed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-white/10"
                        }`}>
                          {apt.status === "completed" ? (
                            <Check className="w-7 h-7" />
                          ) : (
                            <Calendar className="w-7 h-7" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-medium text-lg">{apt.service}</h3>
                            {apt.status === "upcoming" && (
                              <span className="px-2 py-0.5 bg-[#B76E79] rounded-full text-xs">Upcoming</span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(apt.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {apt.time}
                            </span>
                            {apt.design && (
                              <span className="flex items-center gap-1 text-[#B76E79]">
                                <Sparkles className="w-4 h-4" />
                                {apt.design}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-serif">${apt.price}</p>
                          {apt.status === "completed" && (
                            <button className="mt-2 text-sm text-[#B76E79] hover:underline flex items-center gap-1">
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
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-serif">Your Saved Looks</h2>
                  <Link href="/#gallery" className="text-sm text-[#B76E79] hover:underline flex items-center gap-1">
                    Browse Gallery
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {NAIL_DESIGNS.map((design, i) => (
                    <motion.div
                      key={design.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${design.gradient}`} />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <span className="text-5xl mb-3 group-hover:scale-110 transition-transform">{design.emoji}</span>
                        <p className="font-medium text-center opacity-0 group-hover:opacity-100 transition-opacity">
                          {design.name}
                        </p>
                      </div>

                      {/* Heart Button */}
                      <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white/30">
                        <Heart className="w-5 h-5 fill-white" />
                      </button>

                      {/* Book Button */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
                        <button className="w-full py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-medium hover:bg-white/30 transition-colors">
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
                <div className="mb-8">
                  <h2 className="text-2xl font-serif mb-2">Your Rewards</h2>
                  <p className="text-white/60">
                    You have <span className="text-[#B76E79] font-medium">{userPoints} points</span> available to redeem
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {REWARDS.map((reward, i) => {
                    const canRedeem = userPoints >= reward.points;
                    const Icon = reward.icon;
                    return (
                      <motion.div
                        key={reward.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative overflow-hidden rounded-3xl p-6 border transition-all ${
                          canRedeem
                            ? "bg-white/10 border-white/20"
                            : "bg-white/5 border-white/10 opacity-60"
                        }`}
                      >
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${reward.color} opacity-20 rounded-full blur-3xl`} />
                        <div className="relative flex items-start gap-5">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reward.color} flex items-center justify-center shadow-lg`}>
                            <Icon className="w-8 h-8" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium mb-1">{reward.name}</h3>
                            <p className="text-white/50 text-sm mb-3">{reward.points} points required</p>
                            <button
                              disabled={!canRedeem}
                              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                                canRedeem
                                  ? "bg-white text-black hover:bg-white/90"
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
                <div className="rounded-3xl bg-gradient-to-br from-[#B76E79]/20 to-[#722F37]/20 border border-[#B76E79]/30 p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B76E79] to-[#722F37] flex items-center justify-center">
                          <Share2 className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-xl font-serif">Share the Love</h3>
                          <p className="text-white/60 text-sm">Earn 100 points for each successful referral</p>
                        </div>
                      </div>
                      <p className="text-white/70">
                        When your friends book their first appointment using your code, you both get rewarded!
                        They get 15% off and you earn 100 bonus points.
                      </p>
                    </div>
                    <div className="lg:w-80">
                      <p className="text-sm text-white/60 mb-2">Your referral code</p>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value="SARAH100"
                          readOnly
                          className="flex-1 px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-center font-mono text-lg tracking-wider"
                        />
                        <button
                          onClick={copyReferralCode}
                          className={`px-5 py-3 rounded-xl font-medium transition-all ${
                            copiedCode
                              ? "bg-green-500 text-white"
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
                <h2 className="text-2xl font-serif mb-8">Account Settings</h2>

                <div className="space-y-6">
                  {/* Profile Section */}
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                    <h3 className="font-medium mb-6 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#B76E79]" />
                      Profile Information
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: "Full Name", value: user.name, type: "text" },
                        { label: "Email", value: user.email, type: "email" },
                        { label: "Phone", value: user.phone, type: "tel" },
                      ].map((field, i) => (
                        <div key={i}>
                          <label className="text-sm text-white/60 block mb-2">{field.label}</label>
                          <input
                            type={field.type}
                            defaultValue={field.value}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#B76E79]/50 transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notifications Section */}
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                    <h3 className="font-medium mb-6 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-[#B76E79]" />
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
                            <p className="font-medium">{item.label}</p>
                            <p className="text-sm text-white/50">{item.desc}</p>
                          </div>
                          <button className="w-14 h-8 bg-[#B76E79] rounded-full relative transition-colors">
                            <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow transition-transform" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-4 bg-gradient-to-r from-[#B76E79] to-[#722F37] rounded-xl font-medium hover:shadow-lg hover:shadow-[#722F37]/30 transition-all">
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
