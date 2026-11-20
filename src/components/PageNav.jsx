import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import { scrollToTop, useScrolled } from '../hooks.js';
import { SECTIONS, groupById } from '../navigation.js';

const where = (s, dir) => (s.id === 'inicio' ? dir : `${dir} · ${groupById(s.group).label}`);

/** Previous / next section links shown at the end of every section, following the reading order. */
export function PrevNext({ active, onChange }) {
  const i = SECTIONS.findIndex((t) => t.id === active);
  const prev = SECTIONS[i - 1];
  const next = SECTIONS[i + 1];

  return (
    <nav className="mt-12 grid gap-3 sm:grid-cols-2" aria-label="Navegación entre secciones">
      {prev ? (
        <button onClick={() => onChange(prev.id, { focusContent: true })} className="card group flex items-center gap-3 p-4 text-left transition hover:border-brand-100 hover:shadow-lg">
          <ArrowLeft className="h-5 w-5 text-ink-3 transition group-hover:-translate-x-1" />
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">{where(prev, 'Anterior')}</span>
            <span className="font-display font-bold text-ink">{prev.label}</span>
          </span>
        </button>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next && (
        <button
          onClick={() => onChange(next.id, { focusContent: true })}
          className="card group flex items-center justify-end gap-3 p-4 text-right transition hover:border-brand-100 hover:shadow-lg"
        >
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">{where(next, 'Siguiente')}</span>
            <span className="font-display font-bold text-ink">{next.label}</span>
          </span>
          <ArrowRight className="h-5 w-5 text-ink-3 transition group-hover:translate-x-1" />
        </button>
      )}
    </nav>
  );
}

export function BackToTop() {
  const show = useScrolled(600);
  return (
    <button
      onClick={() => scrollToTop()}
      aria-label="Volver arriba"
      className={`fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold-400 bg-brand-800 text-gold-400 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700 ${
        show ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
