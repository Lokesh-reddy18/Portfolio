import { useState } from 'react';

// Material-style press ripple. Renders as any element (a, button) and keeps its own children on top.
const Ripple = ({ as: Tag = 'button', className = '', children, onPointerDown, ...rest }) => {
  const [ripples, setRipples] = useState([]);

  const handlePointerDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.hypot(rect.width, rect.height) * 2;
    const ripple = { id: e.timeStamp, x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2, size };
    setRipples((current) => [...current, ripple]);
    onPointerDown?.(e);
  };

  // The ripple needs a positioned parent, but `relative` would override a caller's `fixed`/`absolute`/`sticky`.
  const hasPosition = /(^|\s)(fixed|absolute|sticky)(\s|$)/.test(className);

  return (
    <Tag
      className={`${hasPosition ? '' : 'relative'} overflow-hidden isolate ${className}`}
      onPointerDown={handlePointerDown}
      {...rest}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 rounded-full bg-current animate-ripple"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
          onAnimationEnd={() => setRipples((current) => current.filter((x) => x.id !== r.id))}
        />
      ))}
      {children}
    </Tag>
  );
};

export default Ripple;
