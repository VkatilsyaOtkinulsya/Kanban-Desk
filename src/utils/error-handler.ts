import type { NotificationComponent } from '@/types/notification';
import { AxiosError } from 'axios';

type ErrorHandlerOptions = {
  silent?: boolean;
  context?: string;
};

export function handleApiError(error: unknown, options: ErrorHandlerOptions = {}): void {
  const { silent = false, context = '' } = options;

  if (import.meta.env.DEV && !silent) {
    console.error(`${context}`, error);
  }

  if (silent) return;

  let message = 'Извините, что-то пошло не так!';

  if (error instanceof AxiosError) {
    message = context || 'Ошибка при запросе к серверу';
    message += `: ${error.response?.data?.message || error.message}`;
  } else if (error instanceof Error) {
    message += `${context}: ${error.message}`;
  }

  showNotification(message, 'error');
}

let notificationComponent: NotificationComponent | null;

export function registerNotificationComponent(component: NotificationComponent) {
  notificationComponent = component;
}

export function showNotification(message: string, type: 'error' | 'success' = 'error') {
  if (notificationComponent) {
    notificationComponent.show(message, type);
  } else {
    console.warn('Notification component is not registered');
    console[type === 'error' ? 'error' : 'log'](message);
  }
}
