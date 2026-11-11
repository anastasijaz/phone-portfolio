import { useState } from 'react';
import { ExternalLink, Figma, ImageOff, VideoOff } from 'lucide-react';
import type { Media } from '../data/types';
import { isPlaceholder } from '../lib/app-context';
import { Button } from './Buttons';

function Placeholder({ icon: Icon, title, hint }: { icon: typeof Figma; title: string; hint: string }) {
  return (
    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-shape-l border border-dashed border-outline bg-surface-container-highest p-6 text-center text-on-surface-variant">
      <Icon size={28} aria-hidden />
      <p className="type-title-small text-on-surface">{title}</p>
      <p className="type-body-small">{hint}</p>
    </div>
  );
}

function Caption({ text }: { text?: string }) {
  return text ? <figcaption className="type-body-small mt-2 text-on-surface-variant">{text}</figcaption> : null;
}

function Video({ src, poster, caption }: { src: string; poster?: string; caption?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure>
      {failed ? (
        <Placeholder icon={VideoOff} title="[PLACEHOLDER] Demo video" hint={`Add the compressed video at public${src}`} />
      ) : (
        <video
          className="aspect-video w-full rounded-shape-l bg-black object-contain"
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
        />
      )}
      <Caption text={caption} />
    </figure>
  );
}

function Image({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure>
      {failed ? (
        <Placeholder icon={ImageOff} title="[PLACEHOLDER] Image" hint={`Add the image at public${src}`} />
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="w-full rounded-shape-l bg-surface-container-highest object-cover" />
      )}
      <Caption text={caption} />
    </figure>
  );
}

function FigmaEmbed({ embedUrl, title, caption }: { embedUrl: string; title: string; caption?: string }) {
  if (isPlaceholder(embedUrl) || !embedUrl) {
    return (
      <figure>
        <Placeholder icon={Figma} title={`[PLACEHOLDER] ${title}`} hint="In Figma: Share → Copy embed code, then paste the iframe src into src/data/projects.ts" />
        <Caption text={caption} />
      </figure>
    );
  }
  return (
    <figure>
      <iframe
        title={title}
        src={embedUrl}
        loading="lazy"
        allowFullScreen
        className="h-[460px] w-full rounded-shape-l border border-outline-variant bg-surface-container-highest"
      />
      <Caption text={caption} />
    </figure>
  );
}

function LinkOut({ href, label, caption }: { href: string; label: string; caption?: string }) {
  if (isPlaceholder(href) || !href) {
    return (
      <figure>
        <Placeholder icon={ExternalLink} title={`[PLACEHOLDER] ${label}`} hint="Paste the prototype link into src/data/projects.ts" />
        <Caption text={caption} />
      </figure>
    );
  }
  return (
    <figure>
      <Button variant="filled" icon={ExternalLink} href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </Button>
      <Caption text={caption} />
    </figure>
  );
}

export function MediaItem({ media }: { media: Media }) {
  switch (media.type) {
    case 'video':
      return <Video {...media} />;
    case 'image':
      return <Image {...media} />;
    case 'figma':
      return <FigmaEmbed {...media} />;
    case 'link':
      return <LinkOut {...media} />;
  }
}
