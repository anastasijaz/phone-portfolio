import { useState, type FormEvent } from 'react';
import { createLucideIcon, Mic, Search } from 'lucide-react';
import { Pressable } from './Pressable';
import { googleSearch } from '../config/links';
import googleLogo from '../assets/icons/google.svg';

/** Generic radiating "spark" glyph for the Claude tile (not the official logo artwork) */
const SparkIcon = createLucideIcon('Spark', [
  ['path', { d: 'M12 3v18', key: 'v' }],
  ['path', { d: 'M3 12h18', key: 'h' }],
  ['path', { d: 'm5.6 5.6 12.8 12.8', key: 'd1' }],
  ['path', { d: 'm18.4 5.6-12.8 12.8', key: 'd2' }],
]);

interface TileLink {
  href: string;
  /** Called instead of opening the link (e.g. while it is still a placeholder) */
  onBlocked?: () => void;
}

const tileLinkProps = ({ href, onBlocked }: TileLink) =>
  onBlocked
    ? { onClick: onBlocked }
    : { href, target: '_blank', rel: 'noopener noreferrer' };

/** Pixel-style shortcut widget: a Claude tile and a voice tile side by side. */
export function ClaudeWidget({ claude, voice }: { claude: TileLink; voice: TileLink }) {
  return (
    <section aria-label="Claude shortcuts" className="surface-card flex shrink-0 gap-2 rounded-[28px] p-2 shadow-elev-1">
      <Pressable
        {...tileLinkProps(claude)}
        aria-label="Claude (opens in a new tab)"
        className="flex h-16 flex-1 items-center gap-3 rounded-[22px] bg-[#d97757] px-4 text-white"
      >
        <SparkIcon size={26} strokeWidth={2.4} aria-hidden />
        <span className="type-title-medium">Claude</span>
      </Pressable>
      <Pressable
        {...tileLinkProps(voice)}
        aria-label="Claude voice"
        className="flex h-16 w-24 shrink-0 flex-col items-center justify-center gap-0.5 rounded-[22px] bg-surface-container-highest text-on-surface"
      >
        <Mic size={22} aria-hidden />
        <span className="type-label-medium">Voice</span>
      </Pressable>
    </section>
  );
}

/** Pixel home screen search bar: Google G, a text field, opens the results in a new tab. */
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
    <form role="search" onSubmit={submit} className="surface-card flex h-12 shrink-0 items-center gap-3 rounded-full pl-4 pr-2 shadow-elev-1">
      <img src={googleLogo} alt="" className="h-5 w-5" draggable={false} />
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
        className="type-body-large min-w-0 flex-1 bg-transparent text-on-surface placeholder:text-on-surface-variant focus:outline-none"
      />
      <button type="submit" aria-label="Search" className="state-layer flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant">
        <Search size={20} aria-hidden />
      </button>
    </form>
  );
}
