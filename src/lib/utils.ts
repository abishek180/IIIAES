export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

const dayFmt = new Intl.DateTimeFormat("en-IN", { day: "2-digit", timeZone: "Asia/Kolkata" });
const monthFmt = new Intl.DateTimeFormat("en-IN", { month: "short", timeZone: "Asia/Kolkata" });

/** Format an ISO date (YYYY-MM-DD) as "12 Jan 2027". */
export function formatDate(iso: string) {
  return dateFmt.format(new Date(`${iso}T00:00:00+05:30`));
}

export function dateParts(iso: string) {
  const d = new Date(`${iso}T00:00:00+05:30`);
  return { day: dayFmt.format(d), month: monthFmt.format(d) };
}

export function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}
