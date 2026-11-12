import { BatteryFull, Signal, Wifi } from 'lucide-react';
import { useClock } from '../hooks/useClock';

/** Android status bar: clock left, signal / Wi-Fi / battery right, punch-hole camera centered. */
export function StatusBar({ punchHole, dark = false }: { punchHole: boolean; dark?: boolean }) {
  const now = useClock();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  return (
    <>
      {punchHole && (
        <span
          className="pointer-events-none absolute left-1/2 top-[8px] z-50 h-[16px] w-[16px] -translate-x-1/2 rounded-full bg-[#0b0b0c] shadow-[inset_0_0_0_3px_#1d1d20]"
          data-punch-hole
          aria-hidden
        />
      )}
    <div
      className={`pointer-events-none absolute inset-x-0 top-[var(--status-gap)] z-50 flex h-9 items-center justify-between px-7 text-on-surface ${dark ? "home-dark" : ""}`}
      data-status-row
      aria-hidden
    >
      <span className="type-label-large tabular-nums">{time}</span>
      <span className="flex items-center gap-1.5">
        <Signal size={15} strokeWidth={2.6} />
        <Wifi size={15} strokeWidth={2.6} />
        <BatteryFull size={19} strokeWidth={2.2} />
      </span>
    </div>
    </>
  );
}

interface NavBarProps {
  onBack: () => void;
  onHome: () => void;
  onRecents: () => void;
  /** transparent over the wallpaper, solid while an app is open */
  solid: boolean;
  /** light icons over the dark home screen */
  dark?: boolean;
}

/**
 * Android 3-button system navigation (back, home, recents): a 48px bar with the three
 * buttons centered and evenly spaced, 24px glyphs drawn with a 2px stroke as on stock Android.
 */
export function NavBar({ onBack, onHome, onRecents, solid, dark = false }: NavBarProps) {
  const btn = 'state-layer flex h-12 w-[88px] items-center justify-center rounded-full text-on-surface';
  return (
    <nav
      aria-label="System navigation"
      className={`absolute inset-x-0 bottom-0 z-50 flex h-[calc(48px+var(--nav-gap))] items-center justify-center pb-[var(--nav-gap)] transition-colors duration-300 ${
        solid ? 'bg-surface' : 'bg-transparent'
      } ${dark ? 'home-dark' : ''
      }`}
    >
      <button type="button" className={btn} onClick={onBack} aria-label="Back" title="Back">
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
          <path d="M16.5 5.5v13L6.5 12z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </button>
      <button type="button" className={btn} onClick={onHome} aria-label="Home" title="Home">
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
      <button type="button" className={btn} onClick={onRecents} aria-label="Recent apps" title="Recent apps">
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
          <rect x="6" y="6" width="12" height="12" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </nav>
  );
}
