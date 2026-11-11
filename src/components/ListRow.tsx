import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Pressable } from './Pressable';

interface Props {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  onClick?: () => void;
  href?: string;
  /** Tinted circular icon background, like Android Settings */
  iconTone?: 'primary' | 'secondary' | 'tertiary';
}

const tones = {
  primary: 'bg-primary-container text-on-primary-container',
  secondary: 'bg-secondary-container text-on-secondary-container',
  tertiary: 'bg-tertiary-container text-on-tertiary-container',
};

/** Android Settings-style list row: leading icon, title, supporting text, optional trailing slot. */
export function ListRow({ icon: Icon, title, subtitle, trailing, onClick, href, iconTone = 'primary' }: Props) {
  const content = (
    <>
      {Icon && (
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tones[iconTone]}`}>
          <Icon size={20} aria-hidden />
        </span>
      )}
      <span className="min-w-0 flex-1 text-left">
        <span className="type-body-large block text-on-surface">{title}</span>
        {subtitle && <span className="type-body-medium block text-on-surface-variant">{subtitle}</span>}
      </span>
      {trailing}
    </>
  );
  const cls = 'flex w-full items-center gap-4 px-4 py-3 min-h-[72px] text-on-surface';
  if (!onClick && !href) return <div className={cls}>{content}</div>;
  return (
    <Pressable className={cls} onClick={onClick} href={href}>
      {content}
    </Pressable>
  );
}
