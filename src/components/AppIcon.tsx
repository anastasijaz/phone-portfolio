import type { LucideIcon } from 'lucide-react';
import { Pressable } from './Pressable';

interface Props {
  label: string;
  /** Glyph drawn in `colors.fg` on a solid `colors.bg` circle (your own apps) */
  icon?: LucideIcon;
  colors?: { bg: string; fg: string };
  /** Official logo (SVG/PNG URL) drawn on a white circle (Google, LinkedIn, Lovable ...) */
  logo?: string;
  /** A full-bleed image that fills the circle */
  image?: string;
  href?: string;
  /** Open in a new tab with rel="noopener noreferrer" */
  external?: boolean;
  onClick?: () => void;
  showLabel?: boolean;
  ariaLabel?: string;
}

/** Pixel-launcher style icon: a 56px circle with a soft shadow and the label underneath. */
export function AppIcon({ label, icon: Icon, colors, logo, image, href, external, onClick, showLabel = true, ariaLabel }: Props) {
  const circle = 'flex h-14 w-14 items-center justify-center overflow-hidden rounded-full shadow-[0_1px_2px_rgb(92_74_68/0.2),0_4px_10px_rgb(92_74_68/0.14)] transition-transform duration-200 group-active:scale-95';

  return (
    <Pressable
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      aria-label={ariaLabel ?? `Open ${label}`}
      className="group flex w-full flex-col items-center gap-1.5 rounded-shape-m px-1 py-1.5 text-on-surface"
    >
      {logo ? (
        <span className={`${circle} bg-white`}>
          <img src={logo} alt="" draggable={false} className="h-[30px] w-[30px] object-contain" />
        </span>
      ) : image ? (
        <span className={circle}>
          <img src={image} alt="" draggable={false} className="h-full w-full object-cover" />
        </span>
      ) : (
        <span className={circle} style={{ background: colors?.bg, color: colors?.fg }}>
          {Icon && <Icon size={26} strokeWidth={2.2} aria-hidden />}
        </span>
      )}
      {showLabel && <span className="type-label-medium w-full truncate text-center text-on-surface">{label}</span>}
    </Pressable>
  );
}
