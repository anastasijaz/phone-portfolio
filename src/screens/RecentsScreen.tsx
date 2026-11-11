import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { getProject } from '../data/projects';
import { Button } from '../components/Buttons';
import { Pressable } from '../components/Pressable';
import { routeHref } from '../hooks/useHashRoute';
import { useApp } from '../lib/app-context';

const appInfo = (path: string) => {
  const key = path.split('/')[0];
  if (key === 'settings') {
    return { name: 'Settings', subtitle: 'Profile, CV and contact', icon: Settings, colors: { bg: '#524344', fg: '#ffeeee' } };
  }
  const p = getProject(key);
  return p ? { name: p.name, subtitle: p.tagline, icon: p.icon, colors: p.iconColors } : null;
};

/** Android "Recents" overview: recently opened apps as cards. */
export function RecentsScreen() {
  const { recents, clearRecents } = useApp();
  const items = recents.map((path) => ({ path, info: appInfo(path) })).filter((x) => x.info);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-label="Recent apps"
      className="absolute inset-0 z-30 flex flex-col bg-surface-container-highest pt-8"
    >
      {items.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="type-body-large text-on-surface-variant">No recent items</p>
        </div>
      ) : (
        <>
          <div className="no-scrollbar flex flex-1 snap-x snap-mandatory items-center gap-4 overflow-x-auto px-[15%]">
            {items.map(({ path, info }, i) => {
              const Icon = info!.icon;
              return (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.3, ease: [0.2, 0, 0, 1] }}
                  className="flex h-[70%] w-[70%] shrink-0 snap-center flex-col gap-3"
                >
                  <div className="flex items-center gap-2 px-1">
                    <span className="flex h-7 w-7 items-center justify-center rounded-[9px]" style={{ background: info!.colors.bg, color: info!.colors.fg }} aria-hidden>
                      <Icon size={16} />
                    </span>
                    <span className="type-title-small truncate">{info!.name}</span>
                  </div>
                  <Pressable
                    href={routeHref(path)}
                    aria-label={`Open ${info!.name}`}
                    className="flex flex-1 flex-col overflow-hidden rounded-shape-xl bg-surface text-left text-on-surface shadow-elev-3"
                  >
                    <span className="block h-1/3 w-full" style={{ background: info!.colors.bg }} aria-hidden />
                    <span className="flex flex-col gap-2 p-4">
                      <span className="type-title-large">{info!.name}</span>
                      <span className="type-body-medium text-on-surface-variant">{info!.subtitle}</span>
                    </span>
                  </Pressable>
                </motion.div>
              );
            })}
          </div>
          <div className="flex justify-center pb-6 pt-2">
            <Button variant="tonal" onClick={clearRecents}>
              Clear all
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );
}
