import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Props {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  id?: string;
}

/** M3 switch: 52×32 track, handle grows from 16 to 24dp when on and shows a check icon. */
export function MaterialSwitch({ checked, onChange, label, id }: Props) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-8 w-[52px] shrink-0 items-center rounded-full border-2 transition-colors duration-200 ${
        checked ? 'border-transparent bg-brand-gradient' : 'border-outline bg-surface-container-highest'
      }`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 35 }}
        className={`flex items-center justify-center rounded-full ${
          checked ? 'ml-[22px] h-6 w-6 bg-white' : 'ml-[6px] h-4 w-4 bg-outline'
        }`}
      >
        {checked && <Check size={16} strokeWidth={3} aria-hidden className="text-primary" />}
      </motion.span>
    </button>
  );
}
