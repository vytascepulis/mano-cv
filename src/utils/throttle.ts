export function throttle(fn: () => void, wait: number) {
  let lastTime = 0;
  return function () {
    const now = new Date().getTime();
    if (now - lastTime >= wait) {
      lastTime = now;
      fn();
    }
  };
}
