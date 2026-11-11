import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { FileText, Heart, Mail, RotateCcw, X } from 'lucide-react';
import { whyTinder, type WhyCard } from '../data/whyTinder';
import { contact } from '../data/settings';
import { AppScreen } from '../components/AppScreen';
import { IconButton } from '../components/Buttons';
import { Pressable } from '../components/Pressable';
import { routeHref } from '../hooks/useHashRoute';

type Dir = 1 | -1;
const SWIPE_DISTANCE = 110;
const SWIPE_VELOCITY = 500;

const cardVariants = {
  enter: { scale: 0.95, y: 10, opacity: 0 },
  center: { scale: 1, y: 0, opacity: 1, transition: { duration: 0.25, ease: [0.2, 0, 0, 1] } },
  exit: (dir: Dir) => ({ x: dir * 460, rotate: dir * 18, opacity: 0, transition: { duration: 0.32, ease: [0.2, 0, 0, 1] } }),
};

/** The card face: a gradient "photo" area with the icon, then the text. */
function CardFace({ card }: { card: WhyCard }) {
  const Icon = card.icon;
  return (
    <div className="surface-card flex h-full flex-col overflow-hidden rounded-[28px] shadow-elev-3">
      <div className="bg-brand-gradient relative flex h-[38%] min-h-[140px] shrink-0 items-center justify-center overflow-hidden">
        <span className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-[var(--brand-salmon)] opacity-50" aria-hidden />
        <span className="absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-white opacity-20" aria-hidden />
        <Icon size={64} strokeWidth={1.6} aria-hidden className="relative drop-shadow" />
        <span className="type-label-medium absolute bottom-3 left-4 rounded-full bg-black/20 px-2.5 py-1 uppercase tracking-wider text-white">
          {card.eyebrow}
        </span>
      </div>
      <div className="no-scrollbar flex-1 overflow-y-auto p-5">
        <h2 className="type-headline-small text-on-surface">{card.title}</h2>
        <p className="type-body-large mt-2 text-on-surface">{card.body}</p>
        {card.bullets && (
          <ul className="mt-3 flex flex-col gap-1.5">
            {card.bullets.map((b) => (
              <li key={b} className="type-body-medium flex gap-2 text-on-surface">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        )}
        {card.tags && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
            {card.tags.map((t) => (
              <li key={t} className="type-label-medium rounded-full border border-outline-variant px-3 py-1 text-on-surface-variant">
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/** The top card: draggable left/right with LIKE / NOPE stamps, like a dating app. */
function SwipeCard({ card, onSwipe }: { card: WhyCard; onSwipe: (dir: Dir) => void }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-14, 14]);
  const likeOpacity = useTransform(x, [20, SWIPE_DISTANCE], [0, 1]);
  const nopeOpacity = useTransform(x, [-SWIPE_DISTANCE, -20], [1, 0]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) onSwipe(1);
    else if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) onSwipe(-1);
  };

  return (
    <motion.div
      className="absolute inset-0 z-10 cursor-grab touch-pan-y active:cursor-grabbing"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={onDragEnd}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      aria-roledescription="card"
      aria-label={`${card.eyebrow}: ${card.title}`}
    >
      <CardFace card={card} />
      <motion.span
        style={{ opacity: likeOpacity }}
        className="type-title-large pointer-events-none absolute left-5 top-6 -rotate-12 rounded-lg border-4 border-[var(--md-success)] px-3 py-1 font-bold uppercase tracking-widest text-[var(--md-success)]"
        aria-hidden
      >
        Like
      </motion.span>
      <motion.span
        style={{ opacity: nopeOpacity }}
        className="type-title-large pointer-events-none absolute right-5 top-6 rotate-12 rounded-lg border-4 border-[var(--brand-red)] px-3 py-1 font-bold uppercase tracking-widest text-[var(--brand-red)]"
        aria-hidden
      >
        Nope
      </motion.span>
    </motion.div>
  );
}

function MatchCard({ onRestart }: { onRestart: () => void }) {
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(whyTinder.match.emailSubject)}`;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
      className="bg-brand-gradient absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-[28px] p-6 text-center shadow-elev-3"
      role="status"
    >
      <span className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[var(--brand-salmon)] opacity-50" aria-hidden />
      <span className="absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-white opacity-20" aria-hidden />
      <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/25">
        <Heart size={40} fill="currentColor" aria-hidden />
      </span>
      <h2 className="type-headline-medium relative font-semibold">{whyTinder.match.title}</h2>
      <p className="type-body-large relative max-w-[280px] text-white/90">{whyTinder.match.body}</p>
      <div className="relative mt-2 flex w-full max-w-[260px] flex-col gap-2">
        <Pressable href={mailto} className="type-label-large flex h-11 items-center justify-center gap-2 rounded-full bg-white text-[var(--brand-red)] shadow-elev-1">
          <Mail size={18} aria-hidden /> Send me an email
        </Pressable>
        <Pressable href={routeHref('settings/cv')} className="type-label-large flex h-11 items-center justify-center gap-2 rounded-full border border-white/70 text-white">
          <FileText size={18} aria-hidden /> Open my CV
        </Pressable>
        <button type="button" onClick={onRestart} className="type-label-large mt-1 text-white/90 underline-offset-4 hover:underline">
          Swipe again
        </button>
      </div>
    </motion.div>
  );
}

/** "Why Tinder": a swipe deck of reasons, ending in a match card with contact links. */
export function WhyTinderApp() {
  const cards = whyTinder.cards.filter((c) => !c.hidden);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<Dir>(1);
  const done = index >= cards.length;

  const swipe = useCallback(
    (d: Dir) => {
      if (index >= cards.length) return;
      setDir(d);
      setIndex((i) => i + 1);
    },
    [index, cards.length],
  );
  const restart = () => {
    setDir(1);
    setIndex(0);
  };

  // Arrow keys swipe on desktop
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') swipe(1);
      if (e.key === 'ArrowLeft') swipe(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [swipe]);

  const next = cards[index + 1];

  return (
    <AppScreen
      title={whyTinder.appName}
      actions={<IconButton icon={RotateCcw} label="Start over" onClick={restart} disabled={index === 0} />}
    >
      <div className="flex min-h-full flex-col px-4 pb-4">
        <p className="type-body-medium text-on-surface-variant">{whyTinder.intro}</p>

        {/* Progress, like the photo indicators on a profile */}
        <div className="mt-3 flex gap-1" aria-label={`Card ${Math.min(index + 1, cards.length)} of ${cards.length}`} role="progressbar" aria-valuemin={0} aria-valuemax={cards.length} aria-valuenow={index}>
          {cards.map((c, i) => (
            <span key={c.id} className={`h-1 flex-1 rounded-full transition-colors ${i < index ? 'bg-primary' : i === index ? 'bg-[var(--brand-salmon)]' : 'bg-surface-container-highest'}`} />
          ))}
        </div>

        {/* Deck */}
        <div className="relative mt-3 min-h-[440px] flex-1">
          {next && !done && (
            <div className="absolute inset-0 scale-[0.95] opacity-70" aria-hidden>
              <CardFace card={next} />
            </div>
          )}
          <AnimatePresence custom={dir}>
            {!done && <SwipeCard key={cards[index].id} card={cards[index]} onSwipe={swipe} />}
          </AnimatePresence>
          {done && <MatchCard onRestart={restart} />}
        </div>

        {/* Nope / Like */}
        <div className="mt-4 flex items-center justify-center gap-8">
          <Pressable
            onClick={() => swipe(-1)}
            disabled={done}
            aria-label="Nope, next card"
            className="surface-card flex h-16 w-16 items-center justify-center rounded-full text-[var(--brand-red)] shadow-elev-2"
          >
            <X size={30} strokeWidth={2.6} aria-hidden />
          </Pressable>
          <Pressable
            onClick={() => swipe(1)}
            disabled={done}
            aria-label="Like, next card"
            className="bg-brand-gradient flex h-16 w-16 items-center justify-center rounded-full shadow-elev-2"
          >
            <Heart size={30} fill="currentColor" aria-hidden />
          </Pressable>
        </div>
        {done && (
          <div className="sr-only" aria-live="polite">
            All cards seen.
          </div>
        )}
      </div>
    </AppScreen>
  );
}

