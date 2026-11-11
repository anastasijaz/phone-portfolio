import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronRight, FileText, GraduationCap, Phone, Sparkles, User } from 'lucide-react';
import { contact, profile } from '../data/settings';
import { AppScreen } from '../components/AppScreen';
import { ListRow } from '../components/ListRow';
import { MaterialSwitch } from '../components/MaterialSwitch';
import { useApp } from '../lib/app-context';
import { AboutScreen, EducationScreen, ExperienceScreen, SkillsScreen } from './SettingsDetail';
import { DialerScreen } from './DialerScreen';
import { routeHref } from '../hooks/useHashRoute';
import { inertProps } from '../lib/inert';

const CvViewer = lazy(() => import('./CvViewer'));

const rows = [
  { id: 'experience', icon: Briefcase, title: 'Experience', subtitle: 'Roles and product work', tone: 'primary' },
  { id: 'education', icon: GraduationCap, title: 'Education', subtitle: "Bachelor's degree and thesis", tone: 'secondary' },
  { id: 'skills', icon: Sparkles, title: 'Skills', subtitle: 'Product, design, technical', tone: 'tertiary' },
  { id: 'about', icon: User, title: 'About me', subtitle: 'Gym, squash and padel', tone: 'primary' },
  { id: 'cv', icon: FileText, title: 'CV', subtitle: 'Preview, share or download', tone: 'secondary' },
  {
    id: 'contact',
    icon: Phone,
    title: 'Contact',
    subtitle: contact.phoneHref ? 'Call or email me' : 'Email or LinkedIn',
    tone: 'tertiary',
  },
] as const;

function SubScreen({ sub }: { sub: string }) {
  switch (sub) {
    case 'experience':
      return <ExperienceScreen />;
    case 'education':
      return <EducationScreen />;
    case 'skills':
      return <SkillsScreen />;
    case 'about':
      return <AboutScreen />;
    case 'contact':
      return <DialerScreen />;
    case 'cv':
      return (
        <Suspense fallback={null}>
          <CvViewer />
        </Suspense>
      );
    default:
      return null;
  }
}

export function SettingsApp({ sub }: { sub?: string }) {
  const { openToInternships, setOpenToInternships } = useApp();

  return (
    <>
      <AppScreen title="Settings">
        <div className="flex flex-col gap-4 px-4 pb-10" {...inertProps(!!sub)}>
          {/* Profile header */}
          <header className="flex flex-col items-center gap-3 pt-2 text-center">
            <img
              src={profile.photo}
              alt={`Photo of ${profile.name}`}
              className="h-28 w-28 rounded-full bg-primary-container object-cover shadow-elev-1"
            />
            <div>
              <h2 className="type-headline-small">{profile.name}</h2>
              <p className="type-body-medium text-on-surface-variant">
                {openToInternships ? profile.headlineOpen : profile.headlineClosed}
              </p>
            </div>
          </header>

          {/* Prominent main switch, like "Use Wi-Fi" in Android Settings */}
          <label
            htmlFor="open-switch"
            className="flex cursor-pointer items-center gap-4 rounded-shape-xl bg-primary-container px-5 py-4 text-on-primary-container"
          >
            <span className="flex-1">
              <span className="type-title-medium block">Open to internships</span>
              <span className="type-body-small block opacity-80">
                {openToInternships ? 'Visible to recruiters' : 'Not looking right now'}
              </span>
            </span>
            <MaterialSwitch id="open-switch" checked={openToInternships} onChange={setOpenToInternships} label="Open to internships" />
          </label>

          {/* Settings list */}
          <nav aria-label="Profile sections" className="overflow-hidden rounded-shape-xl surface-card">
            {rows.map((r, i) => (
              <div key={r.id} className={i > 0 ? 'border-t border-outline-variant' : ''}>
                <ListRow
                  icon={r.icon}
                  iconTone={r.tone}
                  title={r.title}
                  subtitle={r.subtitle}
                  href={routeHref(`settings/${r.id}`)}
                  trailing={<ChevronRight size={20} className="text-on-surface-variant" aria-hidden />}
                />
              </div>
            ))}
          </nav>
        </div>
      </AppScreen>

      <AnimatePresence>{sub && <SubScreen key={sub} sub={sub} />}</AnimatePresence>
    </>
  );
}
