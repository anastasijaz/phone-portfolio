import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Download, FileWarning, Share2 } from 'lucide-react';
import { cv, profile } from '../data/settings';
import { AppScreen } from '../components/AppScreen';
import { Button, IconButton } from '../components/Buttons';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

/** Full-screen PDF preview of the CV with share + download in the top app bar. */
export default function CvViewer() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(320);
  const [pages, setPages] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  };

  const absoluteUrl = new URL(cv.file, window.location.origin).toString();

  const share = async () => {
    try {
      // Prefer sharing the actual file (Android share sheet), then the link, then copy.
      if (navigator.canShare) {
        const blob = await fetch(cv.file).then((r) => r.blob());
        const file = new File([blob], cv.downloadName, { type: 'application/pdf' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: `${profile.name} CV` });
          return;
        }
      }
      if (navigator.share) {
        await navigator.share({ title: `${profile.name} CV`, url: absoluteUrl });
        return;
      }
      await navigator.clipboard.writeText(absoluteUrl);
      showToast('Link to CV copied');
    } catch (err) {
      if ((err as DOMException)?.name !== 'AbortError') showToast('Could not share, try download instead');
    }
  };

  return (
    <AppScreen
      title="CV"
      transition="push"
      label={`${profile.name} CV`}
      overlay={
        toast && (
          <div role="status" className="type-body-medium absolute inset-x-4 bottom-4 z-30 rounded-shape-xs bg-inverse-surface px-4 py-3 text-inverse-on-surface shadow-elev-3">
            {toast}
          </div>
        )
      }
      actions={
        <>
          <IconButton icon={Share2} label="Share CV" onClick={share} />
          <IconButton icon={Download} label="Download CV" href={cv.file} download={cv.downloadName} />
        </>
      }
    >
      <div ref={wrapRef} className="flex flex-col gap-3 bg-surface-container-highest px-3 py-3">
        <Document
          file={cv.file}
          onLoadSuccess={({ numPages }) => setPages(numPages)}
          loading={<p className="type-body-medium py-20 text-center text-on-surface-variant">Loading CV…</p>}
          error={
            <div className="flex flex-col items-center gap-3 px-6 py-20 text-center text-on-surface-variant">
              <FileWarning size={32} aria-hidden />
              <p className="type-body-medium">The CV preview could not be loaded.</p>
              <Button variant="tonal" icon={Download} href={cv.file} download={cv.downloadName}>
                Download PDF
              </Button>
            </div>
          }
          className="flex flex-col items-center gap-3"
        >
          {Array.from({ length: pages }, (_, i) => (
            <Page
              key={i}
              pageNumber={i + 1}
              width={width - 24}
              className="overflow-hidden rounded-shape-s shadow-elev-2"
              renderAnnotationLayer
              renderTextLayer
            />
          ))}
        </Document>
        {pages > 0 && (
          <p className="type-body-small pb-4 text-center text-on-surface-variant">
            {pages} page{pages > 1 ? 's' : ''} · updated {cv.updated}
          </p>
        )}
      </div>
    </AppScreen>
  );
}
