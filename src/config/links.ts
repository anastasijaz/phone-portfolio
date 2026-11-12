/* ------------------------------------------------------------------
   Every external link in the app. Change them here.

   Values written in CAPITALS (PERSONAL_EMAIL, VOICE_URL, ...) are
   placeholders. Until you replace them, tapping that icon shows
   "not set yet" instead of opening a broken page.

   No street address anywhere: Maps only shows the city.
   ------------------------------------------------------------------ */

/** Your personal email. Gmail and Messages open a new message to it. */
export const PERSONAL_EMAIL = 'zlaticanastasija@gmail.com';

/** Drive icon */
export const CV_URL = 'https://claude.ai/artifact/2Ku1jADPXmixjPGue9JE1V';

/** Claude widget: the Claude tile and the voice tile */
export const CLAUDE_URL = 'https://claude.ai';
export const VOICE_URL = 'VOICE_URL';

/** Substack: replace with your own profile, e.g. https://yourname.substack.com */
export const SUBSTACK_URL = 'https://substack.com';

/** Apps without a link yet */
export const SPOTIFY_URL = 'SPOTIFY_URL';
/** Chrome in the dock */
export const PORTFOLIO_URL = 'PORTFOLIO_URL';
/** Phone in the dock, e.g. "tel:+49..." */
export const PHONE_LINK = 'PHONE_LINK';

/** Project links */
export const MELT_URL = 'https://id-preview--52fda359-3a0f-4108-8cee-c2e0b8cac1d0.lovable.app/discover';
export const HOREICH_URL = 'https://horeich.de';
export const HOREICH_SOFTWARE_URL = 'https://horeich.de/plattform/';
export const HOREICH_FIGMA_URL = 'https://www.figma.com/design/37kg0EFeniDBIfTlZiaT4y/Horeich-Webseite?node-id=0-1&p=f&t=BZSFdHhhPG1HEq93-0';
export const ZOLLHOF_FIGMA_URL = 'https://www.figma.com/design/3jElX2Z1xb8Sf0nMkcy4bF/N%C3%BCrnberger-Versicherung?node-id=0-1&t=NB15SlDdIDJ2VB01-1';
export const MARIE_FIGMA_URL = 'https://www.figma.com/design/uDDJj1QvlsrtnYelgBIj8G/Menopause-App?node-id=0-1&t=DSYbCg75pC7rdpVk-1';

const gmailCompose = `https://mail.google.com/mail/?view=cm&to=${PERSONAL_EMAIL}`;
const meetNew = 'https://meet.google.com/new';

export const links = {
  google: 'https://www.google.com',
  gmail: gmailCompose,
  drive: CV_URL,
  maps: 'https://www.google.com/maps/search/?api=1&query=Erlangen,+Germany',
  photos: 'https://photos.google.com',
  meet: meetNew,
  playStore: 'https://play.google.com',
  linkedin: 'https://www.linkedin.com/in/anastasija-zlatic/',
  lovable: 'https://lovable.dev/dashboard',
  substack: SUBSTACK_URL,
  spotify: SPOTIFY_URL,
  claude: CLAUDE_URL,
  voice: VOICE_URL,
  // Dock
  phone: PHONE_LINK,
  messages: gmailCompose,
  chrome: PORTFOLIO_URL,
  camera: meetNew,
  // Projects
  melt: MELT_URL,
  horeich: HOREICH_URL,
};

/** Google search for the home screen search bar */
export const googleSearch = (query: string) => `https://www.google.com/search?q=${encodeURIComponent(query)}`;

/** true while a link still contains a CAPITALS placeholder like PERSONAL_EMAIL or VOICE_URL */
export const isLinkPlaceholder = (url: string) => /(^|[^A-Za-z])[A-Z]+(_[A-Z]+)*_(EMAIL|URL|LINK)\b/.test(url);
