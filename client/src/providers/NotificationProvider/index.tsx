import { Box, Notification, Portal, Stack } from "@mantine/core";
import { ReactNode, useCallback, useMemo, useState } from "react";
import {
  TbAlertTriangle,
  TbCircleCheck,
  TbInfoCircle,
  TbX,
} from "react-icons/tb";
import { useLanguage } from "../LanguageProvider/context";
import {
  AppNotification,
  NotificationContext,
  NotificationPayload,
  NotificationTone,
} from "./context";

const DEFAULT_AUTO_CLOSE_MS = 4500;

const toneConfig: Record<
  NotificationTone,
  { color: string; icon: ReactNode; role: "alert" | "status" }
> = {
  error: { color: "red", icon: <TbX />, role: "alert" },
  info: { color: "blue", icon: <TbInfoCircle />, role: "status" },
  success: { color: "teal", icon: <TbCircleCheck />, role: "status" },
  warning: { color: "yellow", icon: <TbAlertTriangle />, role: "alert" },
};

const createNotificationId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { isRtl } = useLanguage();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const remove = useCallback((id: string) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notification) => notification.id !== id)
    );
  }, []);

  const notify = useCallback(
    ({
      autoCloseMs = DEFAULT_AUTO_CLOSE_MS,
      message = "",
      title,
      tone = "info",
    }: NotificationPayload) => {
      const id = createNotificationId();

      setNotifications((currentNotifications) => [
        ...currentNotifications,
        { autoCloseMs, id, message, title, tone },
      ]);

      if (autoCloseMs > 0) {
        window.setTimeout(() => remove(id), autoCloseMs);
      }
    },
    [remove]
  );

  const value = useMemo(() => ({ notify, remove }), [notify, remove]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Portal>
        <Box
          aria-live="polite"
          pos="fixed"
          style={{
            insetBlockStart: 16,
            insetInlineEnd: isRtl ? "auto" : 16,
            insetInlineStart: isRtl ? 16 : "auto",
            width: "min(420px, calc(100vw - 32px))",
            zIndex: 1000,
          }}
        >
          <Stack gap="xs">
            {notifications.map((notification) => {
              const config = toneConfig[notification.tone];

              return (
                <Notification
                  color={config.color}
                  icon={config.icon}
                  key={notification.id}
                  onClose={() => remove(notification.id)}
                  role={config.role}
                  title={notification.title}
                  withBorder
                >
                  {notification.message}
                </Notification>
              );
            })}
          </Stack>
        </Box>
      </Portal>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
