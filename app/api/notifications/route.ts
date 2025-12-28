import { NextRequest, NextResponse } from "next/server";

// In production, use a proper database like Vercel KV or Postgres
const notifications: Map<string, NotificationData[]> = new Map();

interface NotificationData {
  id: string;
  title: string;
  body: string;
  type: string;
  timestamp: number;
  read: boolean;
}

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-user-id") || "anonymous";
  const userNotifications = notifications.get(userId) || [];

  return NextResponse.json({
    notifications: userNotifications,
    unreadCount: userNotifications.filter((n) => !n.read).length,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = request.headers.get("x-user-id") || "anonymous";

    const notification: NotificationData = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: body.title,
      body: body.body,
      type: body.type || "general",
      timestamp: Date.now(),
      read: false,
    };

    const userNotifications = notifications.get(userId) || [];
    userNotifications.unshift(notification);
    notifications.set(userId, userNotifications.slice(0, 50)); // Keep last 50

    return NextResponse.json({ success: true, notification });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = request.headers.get("x-user-id") || "anonymous";
    const userNotifications = notifications.get(userId) || [];

    if (body.markAllRead) {
      notifications.set(
        userId,
        userNotifications.map((n) => ({ ...n, read: true }))
      );
    } else if (body.notificationId) {
      notifications.set(
        userId,
        userNotifications.map((n) =>
          n.id === body.notificationId ? { ...n, read: true } : n
        )
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
