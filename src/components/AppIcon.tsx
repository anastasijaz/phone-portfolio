import type { LucideIcon } from 'lucide-react';
import { Pressable } from './Pressable';

interface Props {
  label: string;
  icon: LucideIcon;
  image?: string;
  colors: { bg: string; fg: string };
  href?: string;
  onClick?: () => void;
  showLabel?: boolean;
  ariaLabel?: string;
}

/**
 * Android launcher icon: a 56px rounded-square tile (25% corner radius) in one solid color,
 * a centered white glyph, a subtle shadow, and the label underneath.
 */
export function AppIcon({ label, icon: Icon, image, colors, href, onClick, showLabel = true, ariaLabel }: Props) {
  return (
    <Pressable
      href={href}
      onClick={onClick}
      aria-label={ariaLabel ?? `Open ${label}`}
      className="group flex w-full flex-col items-center gap-1.5 rounded-shape-m px-1 py-1.5 text-on-surface"
    >
      <span
        className="flex h-14 w-14 items-center justify-center rounded-[14px] shadow-[0_1px_2px_rgb(92_74_68/0.2),0_4px_10px_rgb(92_74_68/0.16)] transition-transform duration-200 group-active:scale-95"
        style={{ background: colors.bg, color: colors.fg }}
      >
        {image ? (
          <img src={image} alt="" className="h-full w-full rounded-[14px] object-cover" />
        ) : (
          <Icon size={26} strokeWidth={2.2} aria-hidden />
        )}
      </span>
      {showLabel && <span className="type-label-medium w-full truncate text-center text-on-surface">{label}</span>}
    </Pressable>
  );
}
