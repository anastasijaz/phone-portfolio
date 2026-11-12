import { useState, type FormEvent, type ReactNode } from 'react';
import { AudioWaveform, createLucideIcon, GalleryVerticalEnd, Image, Mic, ScanSearch, Sparkles } from 'lucide-react';
import { Pressable } from './Pressable';
import { googleSearch } from '../config/links';
import { useClock } from '../hooks/useClock';
import googleLogo from '../assets/icons/google.svg';

/** Generic radiating "asterisk" glyph for the Claude tile (not the official logo artwork) */
const SparkIcon = createLucideIcon('Spark', [
  ['path', { d: 'M12 3v18', key: 'v' }],
  ['path', { d: 'M3 12h18', key: 'h' }],
  ['path', { d: 'm5.6 5.6 12.8 12.8', key: 'd1' }],
  ['path', { d: 'm18.4 5.6-12.8 12.8', key: 'd2' }],
]);

/** Date line at the top of the home screen, e.g. "Thu, 12 Nov" */
export function DateLine() {
  const now = useClock(60000);
  const weekday = now.toLocaleDateString('en-GB', { weekday: 'short' });
  const month = now.toLocaleDateString('en-GB', { month: 'short' });
  return (
    <p className="shrink-0 px-1 text-[22px] font-bold leading-7 text-white">
      <time dateTime={now.toISOString().slice(0, 10)}>
        {weekday}, {now.getDate()} {month}
      </time>
    </p>
  );
}

/** Dark-teal clock card: "Clock" label and the time, ticking every second. */
export function ClockCard() {
  const now = useClock(1000);
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return (
    <section aria-label="Clock" className="flex min-w-0 flex-col justify-between rounded-[28px] bg-[#0b1f1c] px-4 pb-4 pt-4 text-white">
      <span className="type-label-large text-[#8fd3c2]">Clock</span>
      <time dateTime={now.toISOString()} className="block tabular-nums">
        <span className="block text-[50px] font-normal leading-none tracking-tight">
          {hh}:{mm}
        </span>
        <span className="mt-1 block text-[20px] leading-6 text-[#8fd3c2]" aria-hidden>
          :{ss}
        </span>
      </time>
    </section>
  );
}

export interface TileLink {
  href: string;
  /** Called instead of opening the link (e.g. while it is still a placeholder) */
  onBlocked?: () => void;
}

const linkProps = ({ href, onBlocked }: TileLink) =>
  onBlocked ? { onClick: onBlocked } : { href, target: '_blank', rel: 'noopener noreferrer' };

const tileClass = 'flex flex-col items-center justify-center gap-1 rounded-[20px] bg-[#3a3a3a] text-white';

function TileLabel({ children }: { children: ReactNode }) {
  return <span className="type-label-medium text-white">{children}</span>;
}

/**
 * 2×2 shortcut panel next to the clock: Claude, Claude voice, Photos, Projects.
 * The first three open in a new tab; Projects goes to home screen page 3.
 */
export function ClaudePanel({ claude, voice, photos, onProjects }: { claude: TileLink; voice: TileLink; photos: TileLink; onProjects: () => void }) {
  return (
    <section aria-label="Claude shortcuts" className="grid min-w-0 grid-cols-2 grid-rows-2 gap-2 rounded-[28px] bg-[#2a2a2a] p-2">
      <Pressable {...linkProps(claude)} aria-label="Claude (opens in a new tab)" className={tileClass}>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#141414]">
          <SparkIcon size={24} strokeWidth={2.8} color="#d97757" aria-hidden />
        </span>
      </Pressable>
      <Pressable {...linkProps(voice)} aria-label={voice.onBlocked ? 'Claude voice (link not set yet)' : 'Claude voice (opens in a new tab)'} className={tileClass}>
        <AudioWaveform size={28} strokeWidth={2.2} aria-hidden />
      </Pressable>
      <Pressable {...linkProps(photos)} aria-label="Photos (opens in a new tab)" className={tileClass}>
        <Image size={22} strokeWidth={2.2} aria-hidden />
        <TileLabel>Photos</TileLabel>
      </Pressable>
      <Pressable onClick={onProjects} aria-label="Projects: go to my projects page" className={tileClass}>
        <GalleryVerticalEnd size={22} strokeWidth={2.2} aria-hidden />
        <TileLabel>Projects</TileLabel>
      </Pressable>
    </section>
  );
}

/** Pixel home screen search bar: G logo, text field, decorative Lens / mic / AI icons. Opens results in a new tab. */
export function GoogleSearchBar() {
  const [q, setQ] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    window.open(googleSearch(query), '_blank', 'noopener,noreferrer');
    setQ('');
  };
  return (
    <form role="search" onSubmit={submit} className="flex h-14 shrink-0 items-center gap-3 rounded-full bg-[#2f2616] pl-4 pr-4 text-[#efe3cf]">
      <img src={googleLogo} alt="" className="h-6 w-6 shrink-0" draggable={false} />
      <label htmlFor="home-search" className="sr-only">
        Search Google
      </label>
      <input
        id="home-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search"
        autoComplete="off"
        enterKeyHint="search"
        className="type-body-large min-w-0 flex-1 bg-transparent text-white placeholder:text-[#c9bca6] focus:outline-none"
      />
      {/* Decorative, like the Pixel search bar */}
      <span className="flex shrink-0 items-center gap-3.5" aria-hidden>
        <ScanSearch size={22} />
        <Mic size={22} />
        <Sparkles size={22} />
      </span>
    </form>
  );
}
