import type { ListEntry } from '../data/types';
import { about, education, experience, skills } from '../data/settings';
import { AppScreen } from '../components/AppScreen';

function EntryList({ entries }: { entries: ListEntry[] }) {
  return (
    <ol className="flex flex-col gap-3 px-4 pb-10 pt-2">
      {entries.map((e) => {
        const Icon = e.icon;
        return (
          <li key={e.title + e.subtitle} className="rounded-shape-xl bg-surface-container-low p-4">
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-container text-on-primary-container" aria-hidden>
                <Icon size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="type-title-medium">{e.title}</h3>
                <p className="type-body-medium text-on-surface-variant">{e.subtitle}</p>
                {e.meta && <p className="type-label-medium mt-1 text-primary">{e.meta}</p>}
                {e.details && (
                  <ul className="mt-2 flex flex-col gap-1">
                    {e.details.map((d) => (
                      <li key={d} className="type-body-medium flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function ExperienceScreen() {
  return (
    <AppScreen title="Experience" transition="push">
      <EntryList entries={experience} />
    </AppScreen>
  );
}

export function EducationScreen() {
  return (
    <AppScreen title="Education" transition="push">
      <EntryList entries={education} />
    </AppScreen>
  );
}

export function SkillsScreen() {
  return (
    <AppScreen title="Skills" transition="push">
      <div className="flex flex-col gap-3 px-4 pb-10 pt-2">
        {skills.map((g) => (
          <section key={g.title} className="rounded-shape-xl bg-surface-container-low p-4">
            <h3 className="type-title-small mb-3 text-primary">{g.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.skills.map((s) => (
                <li key={s} className="type-label-large inline-flex h-8 items-center rounded-shape-s border border-outline-variant px-3 text-on-surface-variant">
                  {s}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </AppScreen>
  );
}

export function AboutScreen() {
  return (
    <AppScreen title="About me" transition="push">
      <div className="flex flex-col gap-4 px-4 pb-10 pt-2">
        <p className="type-body-large rounded-shape-xl bg-surface-container-low p-5">{about.intro}</p>
        <h3 className="type-title-small px-4 text-primary">Hobbies</h3>
        <ul className="overflow-hidden rounded-shape-xl bg-surface-container-low">
          {about.hobbies.map((h, i) => {
            const Icon = h.icon;
            return (
              <li key={h.title} className={`flex min-h-[72px] items-center gap-4 px-4 py-3 ${i > 0 ? 'border-t border-outline-variant' : ''}`}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tertiary-container text-on-tertiary-container" aria-hidden>
                  <Icon size={20} />
                </span>
                <span>
                  <span className="type-body-large block">{h.title}</span>
                  <span className="type-body-medium block text-on-surface-variant">{h.subtitle}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </AppScreen>
  );
}
