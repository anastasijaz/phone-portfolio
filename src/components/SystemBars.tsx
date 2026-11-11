import { BatteryFull, Signal, Wifi } from 'lucide-react';
import { useClock } from '../hooks/useClock';

export function StatusBar() {
  const now = useClock();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-50 flex h-8 items-center justify-between px-6 text-on-surface" aria-hidden>
      <span className="type-label-large tabular-nums">{time}</span>
      {/* Punch-hole camera (only visible inside the desktop frame) */}
      <span className="absolute left-1/2 top-2 hidden h-[14px] w-[14px] -translate-x-1/2 rounded-full bg-black sm:block" />
      <span className="flex items-center gap-1.5">
        <Signal size={15} strokeWidth={2.5} />
        <Wifi size={15} strokeWidth={2.5} />
        <BatteryFull size={18} strokeWidth={2} className="rotate-0" />
      </span>
    </div>
  );
}

interface NavBarProps {
  onBack: () => void;
  onHome: () => void;
  onRecents: () => void;
  /** transparent over the wallpaper, solid while an app is open */
  solid: boolean;
}

/** Classic Android three-button navigation: back, home, recents. */
export function NavBar({ onBack, onHome, onRecents, solid }: NavBarProps) {
  const btn =
    'state-layer flex h-10 w-16 items-center justify-center rounded-full text-on-surface-variant';
  return (
    <nav
      aria-label="System navigation"
      className={`absolute inset-x-0 bottom-0 z-50 flex h-12 items-center justify-around px-8 transition-colors duration-300 ${
        solid ? 'bg-surface-container' : 'bg-transparent'
      }`}
    >
      <button type="button" className={btn} onClick={onBack} aria-label="Back" title="Back">
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
          <path d="M14 2.5 L14 15.5 L3.5 9 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </button>
      <button type="button" className={btn} onClick={onHome} aria-label="Home" title="Home">
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
          <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
      <button type="button" className={btn} onClick={onRecents} aria-label="Recent apps" title="Recent apps">
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
          <rect x="3" y="3" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </nav>
  );
}
