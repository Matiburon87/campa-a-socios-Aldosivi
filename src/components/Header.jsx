import { ChevronRight, FileText } from 'lucide-react';
import { LINKS } from '../data/content.js';
import { useScrolled } from '../hooks.js';
import { GROUPS, sectionById, sectionsOf } from '../navigation.js';
import ThemeToggle from './ThemeToggle.jsx';

/**
 * Two-level navigation: the area (Inicio / Estrategia / Operación / Comunicación)
 * and, below it, the sections of the current area.
 */
export default function Header({ active, onChange, onGroup, onPreload }) {
  const scrolled = useScrolled(40);
  const current = sectionById(active);
  const siblings = sectionsOf(current.group);
  const group = GROUPS.find((g) => g.id === current.group);

  return (
    <header className="sticky top-0 z-40 shadow-lg">
      <div
        className={`border-b border-gold-400/70 text-white transition-[background-color] duration-300 ${
          scrolled ? 'bg-brand-900/95 backdrop-blur-md' : 'bg-brand-900'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[padding] duration-300 sm:px-6 lg:px-8 ${
            scrolled ? 'py-2' : 'py-3.5'
          }`}
        >
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              onChange('inicio');
            }}
            className="flex min-w-0 items-center gap-3 rounded-lg"
            aria-label="Ir al inicio"
          >
            <div
              className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 p-0.5 shadow-[0_0_18px_rgba(250,204,21,0.35)] transition-all duration-300 ${
                scrolled ? 'h-10 w-10' : 'h-12 w-12'
              }`}
            >
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-brand-800 p-[14%]">
                <img src="escudo-aldosivi.png" alt="" className="h-full w-full object-contain" />
              </div>
            </div>
            <div className="min-w-0">
              <span className="block truncate text-[11px] font-bold uppercase tracking-wide text-gold-400">
                Campaña <span className="hidden sm:inline">de socios</span> 2026-2027
              </span>
              <span className="block truncate font-display text-lg font-extrabold tracking-tight sm:text-xl">
                <span className="sm:hidden">Aldosivi</span>
                <span className="hidden sm:inline">Club Atlético Aldosivi</span>{' '}
                <span className="hidden font-semibold text-emerald-100/80 md:inline">· Centro Estratégico</span>
              </span>
            </div>
          </a>

          <div className="flex items-center gap-2">
            <a href={LINKS.pdfExSocios} target="_blank" rel="noreferrer" className="btn-gold !px-3 !py-2 !text-xs" title="Manual PDF de recuperación de ex-socios">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Manual PDF</span>
              <span className="sm:hidden">PDF</span>
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Level 1: areas */}
        <nav className="border-t border-white/5 bg-brand-950/60" aria-label="Áreas">
          <ul className="mx-auto grid max-w-7xl grid-cols-4 gap-1 px-2 py-1.5 sm:flex sm:px-6 lg:px-8">
            {GROUPS.map((g) => {
              const on = g.id === current.group;
              const Icon = g.icon;
              return (
                <li key={g.id}>
                  <button
                    onClick={() => onGroup(g.id)}
                    onMouseEnter={() => onPreload?.(sectionsOf(g.id)[0].id)}
                    onFocus={() => onPreload?.(sectionsOf(g.id)[0].id)}
                    aria-current={on ? 'true' : undefined}
                    title={g.blurb}
                    className={`flex w-full flex-col items-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold transition sm:flex-row sm:gap-2 sm:px-4 sm:text-sm ${
                      on ? 'bg-gold-400 text-brand-900 shadow' : 'text-emerald-100/85 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {g.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Level 2: sections of the current area */}
      {siblings.length > 1 && (
        <nav className="border-b border-slate-200 bg-surface/95 backdrop-blur" aria-label={`Secciones de ${group.label}`}>
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 sm:px-6 lg:px-8">
            <span className="hidden shrink-0 items-center gap-1 text-xs font-bold uppercase tracking-wide text-slate-500 md:flex">
              {group.label} <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <ul className="-mx-1 flex gap-1.5 overflow-x-auto px-1 scrollbar-none">
              {siblings.map((s) => {
                const on = s.id === active;
                const Icon = s.icon;
                return (
                  <li key={s.id} className="shrink-0">
                    <button
                      ref={on ? (el) => el?.scrollIntoView({ block: 'nearest', inline: 'nearest' }) : undefined}
                      onClick={() => onChange(s.id)}
                      onMouseEnter={() => onPreload?.(s.id)}
                      onFocus={() => onPreload?.(s.id)}
                      aria-current={on ? 'page' : undefined}
                      className={`seg flex items-center gap-2 !py-1.5 ${on ? 'seg-on' : 'seg-off'}`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {s.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
