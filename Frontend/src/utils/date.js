import {format, getISOWeek, parse} from "date-fns";
import {ru} from "date-fns/locale/ru";

export const today = new Date()

export const currentWeek = getISOWeek(today)

export const currentDayOfWeek = today.getDay()

export const currentTime = format(today, "HH:mm")

export const isEvenWeek = !(currentWeek % 2)

export const toDateString = (stringFormat, date) => {
    return format(date, stringFormat, { locale: ru })
}