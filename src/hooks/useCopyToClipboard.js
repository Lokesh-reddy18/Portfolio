import { useEffect, useRef, useState } from 'react';
import { isAndroidApp, onAndroidMessage, postToAndroid } from '../lib/nativeBridge';

const FEEDBACK_MS = 2000;

/**
 * Copies `text` and reports `copied` for a moment. Inside the Android app the copy goes through the
 * native clipboard, and `copied` only flips when the app confirms with a `{ type: 'copied', label }` reply.
 */
export function useCopyToClipboard(text, { label, onError } = {}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef();

  const flash = () => {
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), FEEDBACK_MS);
  };

  useEffect(() => {
    if (!isAndroidApp) return undefined;
    const unsubscribe = onAndroidMessage((message) => {
      if (message.type === 'copied' && message.label === label) flash();
    });
    return () => {
      unsubscribe();
      clearTimeout(timer.current);
    };
  }, [label]);

  const copy = async () => {
    if (postToAndroid('copy', { text, label })) return;
    try {
      await navigator.clipboard.writeText(text);
      flash();
    } catch (err) {
      onError?.(err);
    }
  };

  return [copied, copy];
}
