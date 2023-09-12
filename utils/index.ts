export function generateRandomId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
