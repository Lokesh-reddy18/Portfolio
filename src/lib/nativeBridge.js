// The Android app injects `window.AndroidBridge` (a WebMessageListener) before the page loads, and only
// for this site's origin. In a normal browser it's undefined and every helper here is a no-op.
const bridge = typeof window !== 'undefined' ? window.AndroidBridge : undefined;

export const isAndroidApp = Boolean(bridge);

const listeners = new Set();

if (bridge) {
  bridge.onmessage = (event) => {
    let message;
    try {
      message = JSON.parse(event.data);
    } catch {
      return;
    }
    listeners.forEach((listener) => listener(message));
  };
}

/** Sends `{ type, ...payload }` to the app. Returns false when not running inside it. */
export function postToAndroid(type, payload = {}) {
  if (!bridge) return false;
  bridge.postMessage(JSON.stringify({ type, ...payload }));
  return true;
}

/** Subscribes to messages from the app; returns an unsubscribe function for useEffect cleanup. */
export function onAndroidMessage(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
