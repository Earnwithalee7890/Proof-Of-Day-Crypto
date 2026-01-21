// Notification and toast types
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationConfig {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface Toast {
  id: string;
  type: NotificationType;
  content: string;
  createdAt: number;
  expiresAt?: number;
}

export interface NotificationState {
  notifications: NotificationConfig[];
  toasts: Toast[];
}

export interface NotificationActions {
  addNotification: (config: Omit<NotificationConfig, 'id'>) => string;
  removeNotification: (id: string) => void;
  showToast: (type: NotificationType, content: string, duration?: number) => string;
  dismissToast: (id: string) => void;
  clearAll: () => void;
}
