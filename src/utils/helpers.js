export function uniqueId() {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
}

export function scrollToTop() {
  return window.scrollTo(0, 0);
}
