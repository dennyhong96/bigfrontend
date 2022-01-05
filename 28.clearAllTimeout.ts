function clearAllTimeout() {
  let timeoutId = setTimeout(() => null, 0);
  while (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId--;
  }
}
