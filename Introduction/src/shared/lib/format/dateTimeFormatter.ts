const MONTHS_GENITIVE = [
  'січня',
  'лютого',
  'березня',
  'квітня',
  'травня',
  'червня',
  'липня',
  'серпня',
  'вересня',
  'жовтня',
  'листопада',
  'грудня',
];

const MONTHS_NOMINATIVE = [
  'січень',
  'лютий',
  'березень',
  'квітень',
  'травень',
  'червень',
  'липень',
  'серпень',
  'вересень',
  'жовтень',
  'листопад',
  'грудень',
];

export interface DateTimeComponents {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
}

/**
 * Formats a date into a human-readable Ukrainian format.
 * Example: "13 червня 2026 р. 18:01:05"
 */
export const formatHumanReadable = (date: Date): string => {
  const day = date.getDate();
  const month = MONTHS_GENITIVE[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day} ${month} ${year} р. ${hours}:${minutes}:${seconds}`;
};

/**
 * Formats date components for structured representation.
 * Example: year: "2026", month: "червень", etc.
 */
export const getDateTimeComponents = (date: Date): DateTimeComponents => {
  return {
    year: String(date.getFullYear()),
    month: MONTHS_NOMINATIVE[date.getMonth()],
    day: String(date.getDate()),
    hour: String(date.getHours()).padStart(2, '0'),
    minute: String(date.getMinutes()).padStart(2, '0'),
    second: String(date.getSeconds()).padStart(2, '0'),
  };
};
