import {
  differenceInCalendarMonths,
  differenceInCalendarYears,
  differenceInWeeks,
  format,
} from "date-fns";
import { enGB } from "date-fns/locale";

import { Dictionary } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";

/**
 * Returns a pluralized string based on the count and unit from the dictionary
 * @param count - The number to check for pluralization
 * @param dictionary - The dictionary containing singular/plural forms
 * @param unit - The time unit key to look up in the dictionary (year/month/week)
 * @returns A formatted string with the count and pluralized unit (e.g. "2 years", "1 month")
 */
const getPluralization = (
  count: number,
  dictionary: Dictionary,
  unit: keyof Dictionary["time"],
): string => {
  const isPlural = count > 1 ? "plural" : "singular";
  return `${count} ${dictionary.time[unit][isPlural]}`;
};

/**
 * Calculates and formats the difference between two dates in a localized format
 * @param date1 - The start date
 * @param date2 - The end date
 * @returns A formatted string representing the time difference (e.g. "2 years and 3 months", "6 months", "3 weeks")
 */
const formatDateDiff = async (
  date1: Date | string,
  date2: Date | string,
): Promise<string> => {
  const dictionary = await getDictionary();

  const yearsDiff = differenceInCalendarYears(date2, date1);
  if (yearsDiff >= 1) {
    const monthsDiff = differenceInCalendarMonths(date2, date1) % 12; // Get remaining months after full years
    const yearStr = getPluralization(yearsDiff, dictionary, "year");
    const monthStr =
      monthsDiff >= 1
        ? ` ${getPluralization(monthsDiff, dictionary, "month")}`
        : "";
    return `${yearStr} and ${monthStr}`;
  }

  const monthsDiff = differenceInCalendarMonths(date2, date1);
  if (monthsDiff >= 1) {
    return getPluralization(monthsDiff, dictionary, "month");
  }

  const weeksDiff = differenceInWeeks(date2, date1);
  return getPluralization(weeksDiff, dictionary, "week");
};

/**
 * Formats a date into a localized month and year string (e.g. "Jan 2024")
 * @param date - The date to format, can be a Date object or date string
 * @returns A formatted string with the month and year in the specified locale
 */
const formatDateToMonthYear = (date: Date | string) => {
  return format(date, "MMM yyyy", { locale: enGB });
};

const formatDateToDayMonthYear = (date: Date | string) => {
  return format(date, "PPP", { locale: enGB });
};

export { formatDateDiff, formatDateToDayMonthYear, formatDateToMonthYear };
