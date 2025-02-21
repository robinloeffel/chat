export const ticked = (callback: () => void) => {
  globalThis.requestAnimationFrame(() => {
    globalThis.requestAnimationFrame(callback);
  });
};
