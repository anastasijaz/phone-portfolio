import { useState } from 'react';
import { ArrowLeft, ExternalLink, ImageOff } from 'lucide-react';
import { horeich } from '../data/horeich';
import { AppScreen } from '../components/AppScreen';
import { Button } from '../components/Buttons';
import { useApp } from '../lib/app-context';
import { isLinkPlaceholder } from '../config/links';

function Shot({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="min-w-0 flex-1">
      <figcaption className="type-label-medium mb-1.5 uppercase tracking-wider text-on-surface-variant">{label}</figcaption>
      {failed ? (
        <div className="flex aspect-[3/4] flex-col items-center justify-center gap-1.5 rounded-shape-l border border-dashed border-outline bg-surface-container-highest p-3 text-center text-on-surface-variant">
          <ImageOff size={22} aria-hidden />
          <span className="type-label-small">[PLACEHOLDER]</span>
          <span className="type-body-small break-all">public{src}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="aspect-[3/4] w-full rounded-shape-l border border-outline-variant bg-surface-container-highest object-cover object-top"
        />
      )}
    </figure>
  );
}

/** Horeich.de redesign: before/after, what I improved, live site. */
export function HoreichApp() {
  const { backTo } = useApp();
  const Icon = horeich.icon;
  // "Back" always lands on the Projects page (page 3)
  const backToProjects = () => backTo('projects');

  return (
    <AppScreen title="Horeich.de" collapseTitle>
      <div className="flex flex-col gap-4 px-4 pb-10">
        <header className="flex items-center gap-4 pt-2">
          <span
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full shadow-elev-2"
            style={{ background: horeich.iconColors.bg, color: horeich.iconColors.fg }}
            aria-hidden
          >
            <Icon size={30} strokeWidth={2.6} />
          </span>
          <div className="min-w-0">
            <h2 className="type-headline-small">{horeich.title}</h2>
            <p className="type-body-medium text-on-surface-variant">{horeich.line}</p>
          </div>
        </header>
        <p className="type-body-medium text-on-surface-variant">{horeich.about}</p>

        <section className="surface-card rounded-shape-xl p-4" aria-labelledby="horeich-shots">
          <h3 id="horeich-shots" className="type-title-medium mb-3">
            Before and after
          </h3>
          <div className="flex gap-3">
            <Shot label="Before" {...horeich.screenshots.before} />
            <Shot label="After" {...horeich.screenshots.after} />
          </div>
          <p className="type-body-small mt-3 text-on-surface-variant">Screenshots will be uploaded by Anastasija.</p>
        </section>

        <section className="surface-card rounded-shape-xl p-4" aria-labelledby="horeich-improved">
          <h3 id="horeich-improved" className="type-title-medium mb-2">
            What I improved
          </h3>
          <ul className="flex flex-col gap-1.5">
            {horeich.improvements.map((b) => (
              <li key={b} className="type-body-medium flex gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-2 pt-1">
          <Button
            variant="filled"
            icon={ExternalLink}
            href={horeich.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            disabled={isLinkPlaceholder(horeich.liveUrl)}
          >
            Live site
          </Button>
          <Button variant="outlined" icon={ArrowLeft} onClick={backToProjects}>
            Back
          </Button>
        </div>
      </div>
    </AppScreen>
  );
}
