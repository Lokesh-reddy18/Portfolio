import { isAndroidApp, postToAndroid } from '../lib/nativeBridge';
import { ShareIcon } from './icons';
import Ripple from './Ripple';

// Only rendered inside the Android app: WebView has no Web Share API, so the app opens its native share sheet.
const ShareButton = () => {
  if (!isAndroidApp) return null;

  const share = () =>
    postToAndroid('share', {
      url: `${window.location.origin}/`,
      title: document.title,
    });

  return (
    <Ripple
      onClick={share}
      aria-label="Share this portfolio"
      className="grid place-items-center w-11 h-11 rounded-full bg-surface-high text-on-surface-variant hover:text-primary transition-colors"
    >
      <ShareIcon />
    </Ripple>
  );
};

export default ShareButton;
