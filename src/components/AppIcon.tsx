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

/** Rounded-square launcher icon with a soft shadow and a label underneath. */
export function AppIcon({ label, icon: Icon, image, colors, href, onClick, showLabel = true, ariaLabel }: Props) {
  return (
    <Pressable
      href={href}
      onClick={onClick}
      aria-label={ariaLabel ?? `Open ${label}`}
      className="group flex w-full flex-col items-center gap-1.5 rounded-shape-l px-1 py-2 text-on-surface"
    >
      <span
        className="flex h-14 w-14 items-center justify-center rounded-[18px] shadow-[0_2px_4px_rgb(0_0_0/0.12),0_6px_14px_rgb(0_0_0/0.14)] transition-transform duration-200 group-active:scale-95"
        style={{ background: colors.bg, color: colors.fg }}
      >
        {image ? (
          <img src={image} alt="" className="h-full w-full rounded-[18px] object-cover" />
        ) : (
          <Icon size={28} strokeWidth={2} aria-hidden />
        )}
      </span>
      {showLabel && <span className="type-label-medium w-full truncate text-center">{label}</span>}
    </Pressable>
  );
}
