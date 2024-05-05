export function formatDateToRelativeTime(dateString) {
  const date = new Date(dateString);

  // Get the current time in milliseconds
  const now = Date.now();

  // Calculate the difference in milliseconds between the given date and now
  const diff = now - date.getTime();

  // Define thresholds for different time units (in milliseconds)
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Calculate the time unit based on the difference
  if (diff < 0) {
    return "Invalid date"; // Handle invalid future dates
  } else if (diff < minute) {
    return `just now`;
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    // Since the difference is greater than a day, return "a day ago"
    return "a day ago";
  }
}
