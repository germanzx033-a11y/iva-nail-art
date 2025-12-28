"use client";

/**
 * IVA Nail Art - Smart Notifications System
 * 24h reminders, touch-up suggestions, personalized promos
 */

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  Calendar,
  Sparkles,
  Gift,
  Clock,
  AlertCircle,
  Check,
  ChevronRight,
  Settings,
  Trash2,
} from "lucide-react";

interface Notification {
  id: string;
  type: "reminder" | "touchup" | "promo" | "reward" | "general";
  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    url?: string;
    onClick?: () => void;
  };
  priority: "low" | "medium" | "high";
}

interface SmartNotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  scheduleAppointmentReminder: (appointmentDate: Date, service: string) => void;
  checkTouchupNeeded: (lastAppointment: Date) => void;
}

const SmartNotificationsContext = createContext<SmartNotificationsContextType | undefined>(undefined);

// Smart notification logic
const TOUCHUP_DAYS = 21; // Suggest touch-up after 3 weeks
const REMINDER_HOURS = 24; // Remind 24 hours before

// Sample promos for personalization
const PROMOS = [
  {
    title: "Weekend Special!",
    body: "20% off all gel services this Saturday. Limited spots available!",
    priority: "high" as const,
  },
  {
    title: "New Season, New Looks",
    body: "Check out our new Spring collection. Book now for exclusive early access!",
    priority: "medium" as const,
  },
  {
    title: "Refer a Friend Bonus",
    body: "Get 100 bonus points for every friend you refer this month!",
    priority: "low" as const,
  },
];

export function SmartNotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("iva-notifications");
    if (saved) {
      const parsed = JSON.parse(saved);
      setNotifications(
        parsed.map((n: Notification) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }))
      );
    } else {
      // Add welcome notification for new users
      addNotification({
        type: "general",
        title: "Welcome to IVA Nail Art!",
        body: "Enable notifications to get appointment reminders and exclusive offers.",
        priority: "medium",
        action: {
          label: "Enable Notifications",
          onClick: () => {
            if ("Notification" in window) {
              Notification.requestPermission();
            }
          },
        },
      });
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("iva-notifications", JSON.stringify(notifications));
    }
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false,
    };

    setNotifications((prev) => [newNotification, ...prev].slice(0, 50));

    // Send browser notification if permitted
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(notification.title, {
        body: notification.body,
        icon: "/icons/icon-192.png",
        tag: newNotification.id,
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.removeItem("iva-notifications");
  };

  const scheduleAppointmentReminder = (appointmentDate: Date, service: string) => {
    const reminderTime = new Date(appointmentDate.getTime() - REMINDER_HOURS * 60 * 60 * 1000);
    const now = new Date();

    if (reminderTime > now) {
      const delay = reminderTime.getTime() - now.getTime();

      setTimeout(() => {
        addNotification({
          type: "reminder",
          title: "Appointment Tomorrow!",
          body: `Your ${service} appointment is tomorrow at ${appointmentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}. See you soon!`,
          priority: "high",
          action: {
            label: "View Details",
            url: "/my-account?tab=appointments",
          },
        });
      }, Math.min(delay, 2147483647)); // Max setTimeout value
    }
  };

  const checkTouchupNeeded = (lastAppointment: Date) => {
    const daysSince = Math.floor((new Date().getTime() - lastAppointment.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSince >= TOUCHUP_DAYS) {
      addNotification({
        type: "touchup",
        title: "Time for a Touch-up?",
        body: `It's been ${daysSince} days since your last visit. Book your next appointment to keep your nails looking perfect!`,
        priority: "medium",
        action: {
          label: "Book Now",
          url: "/#services",
        },
      });
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <SmartNotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
        scheduleAppointmentReminder,
        checkTouchupNeeded,
      }}
    >
      {children}
    </SmartNotificationsContext.Provider>
  );
}

export function useSmartNotifications() {
  const context = useContext(SmartNotificationsContext);
  if (!context) {
    throw new Error("useSmartNotifications must be used within SmartNotificationsProvider");
  }
  return context;
}

// Notification Bell Component
export function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useSmartNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "reminder":
        return Calendar;
      case "touchup":
        return Clock;
      case "promo":
        return Gift;
      case "reward":
        return Sparkles;
      default:
        return Bell;
    }
  };

  const getTypeColor = (type: Notification["type"]) => {
    switch (type) {
      case "reminder":
        return "bg-blue-100 text-blue-600";
      case "touchup":
        return "bg-orange-100 text-orange-600";
      case "promo":
        return "bg-purple-100 text-purple-600";
      case "reward":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-[#F9F8F6] rounded-full transition-colors"
      >
        <Bell className="w-5 h-5 text-[#7A7A7A]" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-[#722F37] text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white rounded-2xl shadow-xl border border-[#EBE8E2] z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-[#EBE8E2] flex items-center justify-between">
                <h3 className="font-medium text-[#1A1A1A]">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-[#722F37] hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <Bell className="w-10 h-10 text-[#EBE8E2] mx-auto mb-3" />
                    <p className="text-[#7A7A7A] text-sm">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notification) => {
                    const Icon = getIcon(notification.type);
                    return (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 border-b border-[#EBE8E2] last:border-0 hover:bg-[#F9F8F6] transition-colors ${
                          !notification.read ? "bg-[#722F37]/5" : ""
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getTypeColor(notification.type)}`}>
                            <Icon className="w-5 h-5" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className={`text-sm ${!notification.read ? "font-medium" : ""} text-[#1A1A1A]`}>
                                {notification.title}
                              </p>
                              <button
                                onClick={() => removeNotification(notification.id)}
                                className="p-1 text-[#7A7A7A] hover:text-[#722F37] transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>

                            <p className="text-xs text-[#7A7A7A] mt-0.5 line-clamp-2">
                              {notification.body}
                            </p>

                            <div className="flex items-center justify-between mt-2">
                              <span className="text-[10px] text-[#7A7A7A]">
                                {formatTime(notification.timestamp)}
                              </span>

                              {notification.action && (
                                <a
                                  href={notification.action.url || "#"}
                                  onClick={(e) => {
                                    if (notification.action?.onClick) {
                                      e.preventDefault();
                                      notification.action.onClick();
                                    }
                                    markAsRead(notification.id);
                                    setIsOpen(false);
                                  }}
                                  className="text-xs text-[#722F37] hover:underline flex items-center gap-1"
                                >
                                  {notification.action.label}
                                  <ChevronRight className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="px-4 py-3 border-t border-[#EBE8E2] flex items-center justify-between">
                  <a
                    href="/my-account?tab=settings"
                    className="text-xs text-[#7A7A7A] hover:text-[#1A1A1A] flex items-center gap-1"
                  >
                    <Settings className="w-3 h-3" />
                    Settings
                  </a>
                  <button
                    onClick={() => {
                      if (confirm("Clear all notifications?")) {
                        setIsOpen(false);
                      }
                    }}
                    className="text-xs text-[#7A7A7A] hover:text-[#722F37] flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear all
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Demo trigger for testing notifications
export function NotificationDemo() {
  const { addNotification, scheduleAppointmentReminder, checkTouchupNeeded } = useSmartNotifications();

  const triggerReminder = () => {
    addNotification({
      type: "reminder",
      title: "Appointment Tomorrow!",
      body: "Your Signature Gel Manicure appointment is tomorrow at 2:00 PM. See you soon!",
      priority: "high",
      action: {
        label: "View Details",
        url: "/my-account",
      },
    });
  };

  const triggerTouchup = () => {
    addNotification({
      type: "touchup",
      title: "Time for a Touch-up?",
      body: "It's been 3 weeks since your last visit. Book your next appointment to keep your nails looking perfect!",
      priority: "medium",
      action: {
        label: "Book Now",
        url: "/#services",
      },
    });
  };

  const triggerPromo = () => {
    addNotification({
      type: "promo",
      title: "Weekend Special!",
      body: "20% off all gel services this Saturday. Limited spots available!",
      priority: "high",
      action: {
        label: "Book Now",
        url: "/#services",
      },
    });
  };

  const triggerReward = () => {
    addNotification({
      type: "reward",
      title: "You've Earned a Reward!",
      body: "Congratulations! You have 150 points - enough for a free nail art upgrade. Claim it at your next visit!",
      priority: "medium",
      action: {
        label: "View Rewards",
        url: "/my-account?tab=rewards",
      },
    });
  };

  return (
    <div className="p-4 bg-[#F9F8F6] rounded-xl">
      <p className="text-sm text-[#7A7A7A] mb-3">Test Notifications:</p>
      <div className="flex flex-wrap gap-2">
        <button onClick={triggerReminder} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs">
          Reminder
        </button>
        <button onClick={triggerTouchup} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs">
          Touch-up
        </button>
        <button onClick={triggerPromo} className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs">
          Promo
        </button>
        <button onClick={triggerReward} className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">
          Reward
        </button>
      </div>
    </div>
  );
}
