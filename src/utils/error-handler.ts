import type { NotificationComponent } from '@/types/notification';
import { AxiosError } from 'axios';

type ErrorHandlerOptions = {
  silent?: boolean;
  context?: string;
};

/**
 * Handles API errors by logging them and showing notifications.
 *
 * @param error - The error object, which can be of any type.
 * @param options - Optional settings for error handling.
 * @param options.silent - If true, suppresses notifications and logging. Default is false.
 * @param options.context - Additional context information to be included in the error message.
 *
 * Logs the error message to the console if in development mode and not silent.
 * Constructs an error message based on the type of error and context provided.
 * Displays a notification with the error message unless silent is true.
 */

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
