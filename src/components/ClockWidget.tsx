import { useClock } from '../hooks/useClock';

/** Android-style clock widget: large time, seconds ticking, date in small text. */
export function ClockWidget() {
  const now = useClock(1000);
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const date = now.toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <section
      aria-label="Clock"
      className="surface-card relative shrink-0 overflow-hidden rounded-[28px] px-6 pb-5 pt-4 shadow-elev-1"
    >
      <span className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[var(--brand-salmon)] opacity-30" aria-hidden />
      <time dateTime={now.toISOString()} className="relative block">
        <span className="flex items-baseline gap-1 tabular-nums text-on-surface">
          <span className="text-[72px] font-light leading-none tracking-tight">
            {hh}
            <span className="text-primary">:</span>
            {mm}
          </span>
          <span className="type-title-large text-primary" aria-hidden>
            {ss}
          </span>
        </span>
        <span className="type-label-large mt-2 block text-on-surface-variant">{date}</span>
      </time>
    </section>
  );
}
