import { useCallback, useState, type ReactNode, type PointerEvent, type MouseEventHandler } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface PressableProps {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  /** Renders an <a> instead of a <button> */
  href?: string;
  target?: string;
  rel?: string;
  download?: string | boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  title?: string;
  role?: string;
  'aria-label'?: string;
  'aria-checked'?: boolean;
  'aria-current'?: 'page' | undefined;
}

/**
 * Material ripple + state layer. Every tappable surface in the UI uses this.
 * Ripple color follows `currentColor`, so it adapts to the content color.
 */
export function Pressable({ children, className = '', href, onClick, disabled, type = 'button', ...rest }: PressableProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const onPointerDown = useCallback((e: PointerEvent<HTMLElement>) => {
    if (disabled) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    // The phone frame can be scaled down; work in the element's own (unscaled) pixels.
    const s = rect.width / el.offsetWidth || 1;
    const size = Math.hypot(el.offsetWidth, el.offsetHeight) * 2;
    const x = (e.clientX - rect.left) / s - size / 2;
    const y = (e.clientY - rect.top) / s - size / 2;
    setRipples((rs) => [...rs, { id: performance.now() + Math.random(), x, y, size }]);
  }, [disabled]);

  const rippleNodes = ripples.map((r) => (
    <span
      key={r.id}
      aria-hidden
      className="ripple"
      style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
      onAnimationEnd={() => setRipples((rs) => rs.filter((x) => x.id !== r.id))}
    />
  ));

  const cls = `state-layer select-none ${disabled ? 'pointer-events-none opacity-40' : 'cursor-pointer'} ${className}`;

  if (href !== undefined) {
    return (
      <a href={href} className={cls} onPointerDown={onPointerDown} onClick={onClick} {...rest}>
        {rippleNodes}
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onPointerDown={onPointerDown} onClick={onClick} disabled={disabled} {...rest}>
      {rippleNodes}
      {children}
    </button>
  );
}
