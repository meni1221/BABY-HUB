import { createContext, useContext } from "react";

export type NotificationTone = "error" | "info" | "success" | "warning";

export interface NotificationPayload {
  autoCloseMs?: number;
  message?: string;
  title: string;
  tone?: NotificationTone;
}

export interface AppNotification extends Required<NotificationPayload> {
  id: string;
}

interface NotificationContextValue {
  notify: (notification: NotificationPayload) => void;
  remove: (id: string) => void;
}

export const NotificationContext =
  createContext<NotificationContextValue | null>(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used inside NotificationProvider");
  }

  return context;
};
