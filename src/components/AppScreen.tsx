import { createContext, useContext, useRef, useState, type ReactNode, type RefObject } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { IconButton } from './Buttons';
import { useApp } from '../lib/app-context';

const ease = [0.2, 0, 0, 1] as const;

/** Scroll container of the current screen, so cards can animate as they scroll into view. */
export const ScrollRootContext = createContext<RefObject<HTMLElement> | null>(null);
export const useScrollRoot = () => useContext(ScrollRootContext);

interface Props {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  /** "open" zooms from the tap position (app launch); "push" slides in (screen inside an app) */
  transition?: 'open' | 'push';
  /** Hide the title until the user scrolls (for screens with a big header) */
  collapseTitle?: boolean;
  className?: string;
  label?: string;
  /** Rendered above the scroll area (snackbars, FABs) */
  overlay?: ReactNode;
}

/**
 * Full-screen Android app page: top app bar with back arrow, scrollable content.
 * The status bar zone (32px) is part of the page so its color extends behind the clock.
 */
export function AppScreen({ title, children, actions, transition = 'open', collapseTitle, className = '', label, overlay }: Props) {
  const { back, tapOrigin } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  // Capture the tap position once, at mount, so open and close share the same origin.
  const [origin] = useState(() => `${tapOrigin.current.x}px ${tapOrigin.current.y}px`);

  const motionProps =
    transition === 'open'
      ? {
          initial: { opacity: 0, scale: 0.86 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.92 },
          transition: { duration: 0.36, ease },
          style: { transformOrigin: origin },
        }
      : {
          initial: { opacity: 0, x: 48 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 48 },
          transition: { duration: 0.3, ease },
        };

  return (
    <motion.div
      {...motionProps}
      role="dialog"
      aria-modal="true"
      aria-label={label ?? title}
      className={`absolute inset-0 z-20 flex flex-col bg-surface text-on-surface ${className}`}
    >
      <header
        className={`relative z-10 shrink-0 pt-8 transition-colors duration-200 ${
          scrolled ? 'bg-surface-container' : 'bg-surface'
        }`}
      >
        <div className="flex h-16 items-center gap-1 px-1">
          <IconButton icon={ArrowLeft} label="Back" onClick={back} className="ml-1 text-on-surface" />
          <h1
            className={`type-title-large min-w-0 flex-1 truncate px-2 transition-opacity duration-200 ${
              collapseTitle && !scrolled ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {title}
          </h1>
          <div className="mr-1 flex items-center">{actions}</div>
        </div>
      </header>
      <ScrollRootContext.Provider value={scrollRef}>
        <div
          ref={scrollRef}
          onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 8)}
          className="no-scrollbar relative flex-1 overflow-y-auto overscroll-contain"
        >
          {children}
        </div>
      </ScrollRootContext.Provider>
      {overlay}
    </motion.div>
  );
}
