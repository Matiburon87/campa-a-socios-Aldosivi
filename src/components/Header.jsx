import { FileText } from 'lucide-react';
import { headlineStats, LINKS } from '../data/content.js';

const toneClass = { white: 'text-white', gold: 'text-gold-400', mint: 'text-emerald-200' };

export default function Header({ tabs, active, onChange }) {
  return (
    <header className="sticky top-0 z-40 border-b border-gold-400/70 bg-brand-900 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 p-0.5 shadow-[0_0_18px_rgba(250,204,21,0.35)]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-brand-800 p-1">
              <img src="escudo-aldosivi.png" alt="Escudo Club Atlético Aldosivi" className="h-full w-full object-contain" />
            </div>
          </div>
          <div className="min-w-0">
            <span className="chip bg-gold-400 !py-0 text-[10px] text-brand-900">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-800 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-800" />
              </span>
              Campaña 2026-2027
            </span>
            <h1 className="truncate font-display text-base font-extrabold tracking-tight sm:text-lg">
              Club Atlético Aldosivi{' '}
              <span className="hidden font-semibold text-gold-400 sm:inline">· Centro Estratégico</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <dl className="hidden items-center gap-5 border-r border-white/10 pr-5 xl:flex">
            {headlineStats.map((s) => (
              <div key={s.label} className="text-right">
                <dt className="text-[10px] font-semibold uppercase tracking-wide text-emerald-200/80">{s.label}</dt>
                <dd className={`font-display text-base font-extrabold ${toneClass[s.tone]}`}>{s.value}</dd>
              </div>
            ))}
          </dl>
          <a href={LINKS.pdfExSocios} target="_blank" rel="noreferrer" className="btn-gold !px-3 !py-2 !text-xs">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">PDF Ex-Socios</span>
            <span className="sm:hidden">PDF</span>
          </a>
        </div>
      </div>

      <nav className="border-t border-white/5 bg-brand-950/60">
        <div
          className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 scrollbar-none sm:px-6 lg:px-8"
          role="tablist"
        >
          {tabs.map(({ id, label, icon: Icon }) => {
            const on = id === active;
            return (
              <button
                key={id}
                ref={on ? (el) => el?.scrollIntoView({ block: 'nearest', inline: 'center' }) : undefined}
                role="tab"
                aria-selected={on}
                onClick={() => onChange(id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                  on ? 'bg-gold-400 text-brand-900 shadow' : 'text-emerald-100/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
