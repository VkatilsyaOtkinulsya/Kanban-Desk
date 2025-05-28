import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export function useGreeting(userName: string) {
  const formatdate = (date: Date): string => {
    return format(date, 'EEEE, d MMMM', { locale: ru })
  }

  const getGreeting = (date: Date): string => {
    const hours = date.getHours()
    if (hours < 6) {
      return `Доброй ночи, ${userName}`
    }
    if (hours < 12) {
      return `Доброе утро, ${userName}`
    }
    if (hours < 18) {
      return `Добрый день, ${userName}`
    }
    return `Добрый вечер, ${userName}`
  }

  return {
    formatdate,
    getGreeting,
  }
}

export function formatTime(date: Date): string {
  return format(date, 'HH:mm')
}
