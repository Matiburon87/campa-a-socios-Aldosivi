import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import { useScrolled } from '../hooks.js';

/** Previous / next section links shown at the end of every tab. */
export function PrevNext({ tabs, active, onChange }) {
  const i = tabs.findIndex((t) => t.id === active);
  const prev = tabs[i - 1];
  const next = tabs[i + 1];

  return (
    <nav className="mt-12 grid gap-3 sm:grid-cols-2" aria-label="Navegación entre secciones">
      {prev ? (
        <button onClick={() => onChange(prev.id)} className="card group flex items-center gap-3 p-4 text-left transition hover:border-brand-100 hover:shadow-lg">
          <ArrowLeft className="h-5 w-5 text-ink-3 transition group-hover:-translate-x-1" />
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">Anterior</span>
            <span className="font-display font-bold text-ink">{prev.label}</span>
          </span>
        </button>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next && (
        <button
          onClick={() => onChange(next.id)}
          className="card group flex items-center justify-end gap-3 p-4 text-right transition hover:border-brand-100 hover:shadow-lg"
        >
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">Siguiente</span>
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
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver arriba"
      className={`fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold-400 bg-brand-800 text-gold-400 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700 ${
        show ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
