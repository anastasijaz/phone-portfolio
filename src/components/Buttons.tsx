import type { LucideIcon } from 'lucide-react';
import { Pressable, type PressableProps } from './Pressable';

type Variant = 'filled' | 'tonal' | 'outlined' | 'text';

const variants: Record<Variant, string> = {
  filled: 'bg-primary text-on-primary hover:shadow-elev-1',
  tonal: 'bg-secondary-container text-on-secondary-container hover:shadow-elev-1',
  outlined: 'border border-outline text-primary',
  text: 'text-primary px-3',
};

interface ButtonProps extends PressableProps {
  variant?: Variant;
  icon?: LucideIcon;
  trailingIcon?: LucideIcon;
}

/** M3 common button: 40dp tall, full-round corners. */
export function Button({ variant = 'filled', icon: Icon, trailingIcon: Trailing, className = '', children, ...rest }: ButtonProps) {
  return (
    <Pressable
      {...rest}
      className={`type-label-large inline-flex h-10 items-center justify-center gap-2 rounded-full px-6 transition-shadow ${
        Icon ? 'pl-4' : ''
      } ${Trailing ? 'pr-4' : ''} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={18} aria-hidden />}
      {children}
      {Trailing && <Trailing size={18} aria-hidden />}
    </Pressable>
  );
}

interface IconButtonProps extends PressableProps {
  icon: LucideIcon;
  label: string;
  variant?: 'standard' | 'filled' | 'tonal';
  size?: number;
}

/** M3 icon button: 40dp target, 24dp icon. */
export function IconButton({ icon: Icon, label, variant = 'standard', size = 24, className = '', ...rest }: IconButtonProps) {
  const v =
    variant === 'filled'
      ? 'bg-primary text-on-primary'
      : variant === 'tonal'
        ? 'bg-secondary-container text-on-secondary-container'
        : 'text-on-surface-variant';
  return (
    <Pressable {...rest} aria-label={label} title={label} className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${v} ${className}`}>
      <Icon size={size} aria-hidden />
    </Pressable>
  );
}
