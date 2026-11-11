import { useState } from 'react';
import { Delete, Linkedin, Mail, Phone } from 'lucide-react';
import { contact, profile } from '../data/settings';
import { AppScreen } from '../components/AppScreen';
import { Button, IconButton } from '../components/Buttons';
import { Pressable } from '../components/Pressable';

const keys: [string, string][] = [
  ['1', ''], ['2', 'ABC'], ['3', 'DEF'],
  ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
  ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
  ['*', ''], ['0', '+'], ['#', ''],
];

const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(contact.emailSubject)}`;

/** Phone app: her number as the only contact, plus a working dial pad. */
export function DialerScreen() {
  const [typed, setTyped] = useState<string | null>(null);
  // Until the visitor types, the display shows her number and the call button dials it.
  const display = typed ?? contact.phoneDisplay;
  const dialHref = `tel:${typed ? typed.replace(/[^\d+*#]/g, '') : contact.phoneHref}`;

  const press = (k: string) => setTyped((t) => (t ?? '') + k);
  const del = () => setTyped((t) => (t && t.length > 1 ? t.slice(0, -1) : null));

  return (
    <AppScreen title="Phone" transition="push">
      <div className="flex min-h-full flex-col px-4 pb-6">
        {/* The only contact */}
        <section aria-label="Contact" className="flex items-center gap-4 rounded-shape-xl bg-surface-container-low p-4">
          <img src={profile.photo} alt="" className="h-14 w-14 rounded-full bg-primary-container object-cover" />
          <div className="min-w-0 flex-1">
            <p className="type-title-medium truncate">{profile.name}</p>
            <p className="type-body-medium truncate text-on-surface-variant">Mobile · {contact.phoneDisplay}</p>
          </div>
          <IconButton icon={Mail} label={`Email ${profile.firstName}`} href={mailto} variant="tonal" />
          <IconButton icon={Phone} label={`Call ${profile.firstName}`} href={`tel:${contact.phoneHref}`} variant="filled" />
        </section>

        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="tonal" icon={Mail} href={mailto}>
            {contact.email}
          </Button>
          {contact.linkedin && (
            <Button variant="outlined" icon={Linkedin} href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Button>
          )}
        </div>

        <div className="flex-1" />

        {/* Display */}
        <div className="flex items-center justify-center gap-2 py-4" aria-live="polite">
          <p className={`type-headline-medium min-w-0 truncate text-center ${typed ? 'text-on-surface' : 'text-on-surface-variant'}`}>{display}</p>
          {typed && <IconButton icon={Delete} label="Delete digit" onClick={del} />}
        </div>

        {/* Keypad */}
        <div className="mx-auto grid w-full max-w-[300px] grid-cols-3 gap-x-6 gap-y-2" role="group" aria-label="Dial pad">
          {keys.map(([k, letters]) => (
            <Pressable
              key={k}
              onClick={() => press(k)}
              aria-label={k}
              className="flex h-14 flex-col items-center justify-center rounded-full bg-surface-container-high text-on-surface"
            >
              <span className="type-headline-small leading-none">{k}</span>
              {letters && <span className="type-label-small text-on-surface-variant">{letters}</span>}
            </Pressable>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <Pressable
            href={dialHref}
            aria-label={`Call ${typed ?? profile.name}`}
            className="flex h-14 w-24 items-center justify-center rounded-full bg-success text-on-success shadow-elev-1"
          >
            <Phone size={26} aria-hidden />
          </Pressable>
        </div>
      </div>
    </AppScreen>
  );
}
