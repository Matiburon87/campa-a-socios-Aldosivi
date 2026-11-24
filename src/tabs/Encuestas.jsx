import { ArrowRight, FileText, Globe, PencilLine, Scale, Split, Trash2, Users } from 'lucide-react';
import { PageHero, SectionTitle } from '../components/ui.jsx';
import { forms, paradoxBlocks } from '../data/content.js';
import { forms as formDefs } from '../data/forms.js';
import { ago, clearDraft, useDrafts } from '../forms/drafts.js';

const blockIcons = { users: Users, scale: Scale, globe: Globe };

function DraftStatus({ status, onDiscard }) {
  const pct = Math.round((status.answered / status.total) * 100);
  return (
    <div className="space-y-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 font-bold text-amber-800">
          <PencilLine className="h-3.5 w-3.5" /> Borrador en curso
          {status.name && <span className="font-medium">· {status.name}</span>}
        </span>
        <span className="text-amber-800">
          {status.answered}/{status.total} respondidas{status.savedAt && ` · ${ago(status.savedAt)}`}
        </span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-amber-100"
        role="progressbar"
        aria-label="Progreso del borrador"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full rounded-full bg-amber-500" style={{ width: `${pct}%` }} />
      </div>
      <button onClick={onDiscard} className="flex items-center gap-1 font-semibold text-amber-800 underline-offset-2 hover:underline">
        <Trash2 className="h-3.5 w-3.5" /> Descartar borrador
      </button>
    </div>
  );
}

export default function Encuestas() {
  const [drafts, refreshDrafts] = useDrafts();
  const discard = (n) => {
    const f = formDefs.find((x) => x.n === n);
    if (window.confirm(`¿Descartar el borrador del formulario #${n}? Se borran las respuestas cargadas y no se pueden recuperar.`)) {
      clearDraft(f);
      refreshDrafts();
    }
  };

  return (
    <div className="space-y-8">
      <PageHero chip="Listos para mostrar e imprimir" title="Los 4 formularios oficiales de encuesta y la matriz de la paradoja">
        Cada formulario se completa en pantalla (durante la llamada o el chat), guarda el borrador solo, copia las respuestas para
        la planilla y se puede imprimir o guardar como PDF.
      </PageHero>

      <div className="grid gap-6 md:grid-cols-2">
        {forms.map((f) => {
          const gold = f.accent === 'gold';
          return (
            <article
              key={f.n}
              className="card group flex flex-col justify-between gap-5 p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl font-display text-lg font-black ${
                      gold ? 'bg-gold-400 text-brand-900' : 'bg-brand-800 text-gold-400'
                    }`}
                  >
                    {f.n}
                  </span>
                  <span className={`chip normal-case ${gold ? 'bg-amber-50 text-amber-800' : 'bg-brand-50 text-ink-2'}`}>
                    {f.badge}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-ink">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
              {drafts[f.n] && <DraftStatus status={drafts[f.n]} onDiscard={() => discard(f.n)} />}
              <div className="flex gap-2">
                <a href={f.href} className="btn-primary flex-1">
                  <ArrowRight className="h-4 w-4 text-gold-400" /> {drafts[f.n] ? 'Continuar' : 'Completar'} formulario #{f.n}
                </a>
                {f.pdf && (
                  <a href={f.pdf} target="_blank" rel="noreferrer" className="btn-gold">
                    <FileText className="h-4 w-4" /> PDF
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <section className="card space-y-6 p-6 sm:p-8">
        <SectionTitle
          icon={Split}
          title="Matriz de análisis del sondaje y paradoja del plan"
          subtitle="Cómo se traducen las respuestas de los 4 formularios en acciones concretas cada lunes."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {paradoxBlocks.map((b) => {
            const Icon = blockIcons[b.icon];
            return (
              <div key={b.title} className="flex flex-col gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-ink">
                  <Icon className="h-4 w-4" /> {b.title}
                </div>
                <p className="text-sm text-slate-700">
                  <strong>Hallazgo:</strong> {b.finding}
                </p>
                <div className="mt-auto rounded-xl border-l-4 border-gold-400 bg-surface p-3 text-sm text-ink">
                  <strong>Acción:</strong> {b.action}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
