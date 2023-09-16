import { format } from 'date-fns/esm'
import { es } from 'date-fns/esm/locale'

export function generateRandomId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function formatDate(date: Date | number, _format: string) {
  return format(date, _format, { locale: es })
}
