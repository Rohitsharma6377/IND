export function now() {
  return Date.now();
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
