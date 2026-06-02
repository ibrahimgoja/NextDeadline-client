export function matchId(a, b) {
  return String(a) === String(b);
}

const pad = (n) => String(n).padStart(2, '0');

export function formatDate(date, pattern) {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return '';
  if (pattern === 'MMM d, yyyy') return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  if (pattern === 'MMM d') return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (pattern === 'MMM d, h:mm a') return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
  if (pattern === 'MMMM yyyy') return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  if (pattern === 'yyyy-MM-dd') return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  if (pattern === "yyyy-MM-dd'T'HH:mm") return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  if (pattern === 'MMM d, yyyy h:mm a') {
    return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
  }
  return d.toLocaleDateString();
}

export function isPast(date) { return new Date(date) < new Date(); }
export function isAfter(date, ref) { return new Date(date) > new Date(ref); }
export function isBefore(date, ref) { return new Date(date) < new Date(ref); }
export function addDays(date, n) { const d = new Date(date); d.setDate(d.getDate() + n); return d; }
export function addMonths(date, n) { const d = new Date(date); d.setMonth(d.getMonth() + n); return d; }
export function subMonths(date, n) { return addMonths(date, -n); }
export function isSameMonth(a, b) {
  const da = new Date(a), db = new Date(b);
  return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth();
}
export function isToday(date) {
  const d = new Date(date), n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate();
}
export function isValid(date) { return !Number.isNaN(new Date(date).getTime()); }
export function startOfMonth(date) { const d = new Date(date); return new Date(d.getFullYear(), d.getMonth(), 1); }
export function endOfMonth(date) { const d = new Date(date); return new Date(d.getFullYear(), d.getMonth() + 1, 0); }
export function startOfWeek(date) { const d = new Date(date); d.setDate(d.getDate() - d.getDay()); d.setHours(0, 0, 0, 0); return d; }
export function endOfWeek(date) { const d = new Date(date); d.setDate(d.getDate() + (6 - d.getDay())); d.setHours(23, 59, 59, 999); return d; }
export function eachDayOfInterval({ start, end }) {
  const days = [];
  const d = new Date(start);
  d.setHours(0, 0, 0, 0);
  while (d <= new Date(end)) { days.push(new Date(d)); d.setDate(d.getDate() + 1); }
  return days;
}
