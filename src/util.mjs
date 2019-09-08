export const dateFormatter = new Intl.DateTimeFormat();

const durations = [
  [604800, "w"],
  [86400, "d"],
  [3600, "h"],
  [60, "m"],
  [1, "s"]
];

export function formatDuration(seconds) {
  let out = [];
  for (const d of durations) {
    const n = Math.floor(seconds / d[0]);
    if (n > 0) {
      out.push(`${n}${d[1]}`);
      seconds -= n * d[0];
    }
  }

  return out.join(" ");
}
