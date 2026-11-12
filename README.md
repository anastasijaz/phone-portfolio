# Anastasija Zlatic · Phone Portfolio

A single-page portfolio that looks and works like an Android phone (Material Design 3, Pixel style).
Built with Vite, React, TypeScript, Tailwind CSS, Framer Motion, Lucide icons and react-pdf.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build
```

Requires Node 20.19+ or 22.12+ (needed by Vite 8).

Always open the site through `npm run dev` (or `npm run preview` after a build). Opening `index.html` straight from the file explorer or "Open in browser" in your editor shows a blank page: browsers block the app's scripts on `file://` pages.

## Where things live

| What | File |
| --- | --- |
| Projects (home screen apps and their case-study cards) | `src/data/projects.ts` |
| Name, tagline, contact, CV, experience, education, skills, hobbies | `src/data/settings.ts` |
| Career timeline widget | `src/data/timeline.ts` |
| "Why Tinder" swipe cards | `src/data/whyTinder.ts` |
| Every external link (Gmail, Maps, LinkedIn, Melt prototype, horeich.de ...) | `src/config/links.ts` |
| Horeich.de redesign page | `src/data/horeich.ts` (screenshots in `public/assets/horeich/`) |
| App logos (official SVGs) | `src/assets/icons/` |
| Colors, type scale, shapes, elevation (Material 3 tokens) | `src/index.css` |
| Images, videos, CV | `public/` |

## Home screen layout

The home screen has three pages. Swipe sideways, tap the dots, or use the arrow keys on desktop:

1. **Home** (`#/`): clock, Claude shortcut widget, and Google, Gmail, Drive, Maps, Photos, Calendar, Meet, Play Store, LinkedIn, Lovable, Substack, Spotify and Settings. Calendar jumps to page 2; the others open their link from `src/config/links.ts` in a new tab.
2. **Calendar** (`#/calendar`): the career timeline. Tapping an entry opens its details at `#/calendar/<id>`; Back returns to the timeline.
3. **Projects** (`#/projects`): Why Tinder, then the project apps and Horeich.de (order: `PROJECT_ORDER` in `src/screens/HomeScreen.tsx`).

The dock (Phone, Messages, Chrome, Camera) and the Google search bar show on every page. The home screen is dark; app pages use the cream palette.

**Back** goes one step back through what the visitor actually did. Someone who arrives on a direct link and presses Back goes to the natural parent: a timeline entry → Calendar, a project → Projects, a Settings page → Settings.

**Before sharing the site**, replace the placeholders in `src/config/links.ts`: `PERSONAL_EMAIL`, `VOICE_URL`, `SUBSTACK_URL`, `SPOTIFY_URL`, `PORTFOLIO_URL` and `PHONE_LINK`. Until then those icons show "link isn't set yet" instead of opening a broken page.

You should never need to touch the components to change content.

**Find what still needs filling in:** search the project for `[PLACEHOLDER`. Everything that needs your input is marked that way, both in the data files and on screen.

## Deep links

Every screen has its own URL, so you can link straight to a project in an application:

- `#/calendar`, `#/calendar/<entry id>`, `#/projects`
- `#/zollhof`, `#/melt`, `#/gaming-robot`, `#/thesis`, `#/marie`, `#/horeich`, `#/why-tinder`
- `#/settings`, `#/settings/experience`, `#/settings/education`, `#/settings/skills`, `#/settings/about`
- `#/settings/contact` (Phone dialer) and `#/settings/cv` (CV preview)

## Add a project

1. Open `src/data/projects.ts`.
2. Copy an existing project object and paste it where you want it to appear. The order in the list is the order of the icons on the home screen.
3. Change at least:
   - `id`: unique, lowercase, no spaces (it becomes the link `#/<id>`).
   - `name`, `iconLabel` (short, shown under the icon), `tagline`, `status`, `role`, `period`, `tags`, `intro`.
   - `icon`: any icon from [lucide.dev/icons](https://lucide.dev/icons). Import it at the top of the file, e.g. `import { Rocket } from 'lucide-react'`. You can use an image instead: put a square image in `public/images/` and set `iconImage: '/images/my-icon.png'`.
   - `iconColors`: one solid tile color (`bg`) and the glyph color (`fg`, white).
   - `categories`: which home screen filter pills show it: `mobile`, `web`, `social`, `health`, `internal` (one or more).
4. Fill in the six cards under `sections`: `problem`, `research`, `interviews`, `prototype`, `results`, `next`. Each card has a `body` and can also have `bullets`, `quotes`, `metrics` and `media`. Set `title` on a card to rename it (e.g. "Research question" for the thesis).
5. Optional: add the project to the timeline in `src/data/timeline.ts` with `link: '<id>'`.

### Media in cards

```ts
media: [
  { type: 'image', src: '/images/zollhof-flow.png', alt: 'Onboarding flow', caption: 'Onboarding' },
  { type: 'video', src: '/videos/zollhof-demo-1.mp4', poster: '/images/zollhof-cover.png', caption: 'Demo' },
  { type: 'figma', title: 'Zollhof prototype', embedUrl: 'https://embed.figma.com/proto/...' },
]
```

- **Figma:** in Figma, click *Share* → *Copy embed code*, then paste only the `src="..."` URL from the iframe into `embedUrl`. Make sure the file's link sharing is set to "Anyone with the link can view".
- **Videos:** keep them small (720p H.264 MP4, ideally under 10 MB). For example:
  `ffmpeg -i input.mov -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart public/videos/zollhof-demo-1.mp4`
- Missing images, videos or Figma links show a clearly marked placeholder instead of breaking.

## Edit the "Why Tinder" app

The first app on the home screen (`#/why-tinder`) is a swipe deck: each card is one reason you want the internship, and after the last card visitors see a "match" card with your email and CV.

Open `src/data/whyTinder.ts` and edit the `cards` list. Each card has an `eyebrow` (small label), a `title`, a `body`, and optional `bullets` and `tags`. Cards appear in list order; add, remove or reorder them freely (each needs a unique `id`). The text on the final card is under `match`.

## Update the CV

Replace `public/cv.pdf` with your new CV and keep the same file name. That's it.
To use a different file name, change `cv.file` in `src/data/settings.ts`. Also update `cv.updated` (shown under the preview) and `cv.downloadName` (the file name people get when they download it).

## Other common edits

- **Photo:** put your photo in `public/images/` (square, at least 400×400) and set `profile.photo` in `src/data/settings.ts`.
- **Phone and email:** `contact` in `src/data/settings.ts`. The phone number is currently left empty, so the Phone screen leads with email and LinkedIn. To show a number, fill in `phoneDisplay` (what visitors see) and `phoneHref` (what gets dialed: digits and a leading `+` only).
- **"Open to internships" switch:** the default is `openToInternshipsDefault` in `src/data/settings.ts`. A visitor's choice is saved in their browser (localStorage key `az:open-to-internships`), so a change to the default only applies to people who haven't flipped the switch yet. The headline text for on and off is `profile.headlineOpen` and `profile.headlineClosed`.
- **Timeline:** `src/data/timeline.ts`. Entries are sorted newest first automatically. Each has an `id` (its detail page is `#/calendar/<id>`), `details` (what you did, shown in the detail view), an optional `project` to link to, and a `category` (`hackathon`, `university`, `work`, `project`) that sets its color; the colors are the `--cat-*` variables in `src/index.css`.
- **Colors:** the `--brand-*` variables at the top of `src/index.css` (cream background, coral gradient, salmon accent, card border, text).

## Deploy

The site is fully static, and hash links (`#/...`) need no server rewrites.

**Vercel:** import the repository at vercel.com. It detects Vite automatically (`vercel.json` is included). Build command `npm run build`, output directory `dist`.

**Netlify:** import the repository at app.netlify.com. `netlify.toml` already sets the build command `npm run build` and the publish directory `dist`. You can also drag the `dist/` folder onto Netlify's deploy page.

## Accessibility and motion

- All tappable elements are real buttons or links with labels, and they're keyboard reachable. **Esc** acts as Android Back on desktop.
- Animations respect `prefers-reduced-motion`: movement is turned off and ripples become a short fade.
- The site uses one light, cream-based color scheme on all devices.
