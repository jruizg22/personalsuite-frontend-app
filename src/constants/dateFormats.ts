export const DateFormats = {
    long: { year: "numeric", month: "long", day: "numeric" } as Intl.DateTimeFormatOptions,
    short: { year: "2-digit", month: "2-digit", day: "2-digit" } as Intl.DateTimeFormatOptions,
    weekdayShort: { weekday: "short", month: "short", day: "numeric" } as Intl.DateTimeFormatOptions
};