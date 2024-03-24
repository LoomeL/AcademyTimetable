import { addDays, format, getISOWeek } from 'date-fns'
import { ru } from 'date-fns/locale/ru'

export const today = addDays(new Date(), -1)

export const currentWeek = getISOWeek(today)

export const currentDayOfWeek = today.getDay()

export const currentTime = format(today, 'HH:mm')

export const isEvenWeek = !(currentWeek % 2)

export const toDateString = (stringFormat, date) => {
  return format(date, stringFormat, { locale: ru })
}
