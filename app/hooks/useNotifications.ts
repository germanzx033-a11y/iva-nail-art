"use client";

import { useState, useEffect, useCallback } from "react";
import { usePWA } from "../components/PWAProvider";

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: "booking" | "reminder" | "promo" | "loyalty" | "general";
  timestamp: number;
  read: boolean;
  data?: Record<string, unknown>;
}

const STORAGE_KEY = "iva-notifications";

export function useNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const { notificationPermission, requestNotifications, sendNotification } = usePWA();

  // Load notifications from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setNotifications(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  }, []);

  // Save notifications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    } catch (error) {
      console.error("Failed to save notifications:", error);
    }
  }, [notifications]);

  const addNotification = useCallback((
    notification: Omit<AppNotification, "id" | "timestamp" | "read">
  ) => {
    const newNotif: AppNotification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev].slice(0, 50)); // Keep last 50

    // Send push notification if permission granted
    if (notificationPermission === "granted") {
      sendNotification(notification.title, {
        body: notification.body,
        tag: notification.type,
        data: notification.data,
      });
    }

    return newNotif.id;
  }, [notificationPermission, sendNotification]);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const scheduleReminder = useCallback((
    title: string,
    body: string,
    delayMs: number,
    data?: Record<string, unknown>
  ) => {
    const timeoutId = setTimeout(() => {
      addNotification({
        title,
        body,
        type: "reminder",
        data,
      });
    }, delayMs);

    return () => clearTimeout(timeoutId);
  }, [addNotification]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    scheduleReminder,
    requestPermission: requestNotifications,
    permissionStatus: notificationPermission,
  };
}

export default useNotifications;
