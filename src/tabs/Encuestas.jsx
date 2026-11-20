import { ExternalLink, FileText, Globe, Scale, Split, Users } from 'lucide-react';
import { PageHero, SectionTitle } from '../components/ui.jsx';
import { forms, paradoxBlocks } from '../data/content.js';

const blockIcons = { users: Users, scale: Scale, globe: Globe };

export default function Encuestas() {
  return (
    <div className="space-y-8">
      <PageHero chip="Listos para mostrar e imprimir" title="Los 4 formularios oficiales de encuesta y la matriz de la paradoja">
        Cada formulario es un documento completo e interactivo (HTML / PDF imprimible) con todas sus preguntas y opciones.
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
                  <span className={`chip normal-case ${gold ? 'bg-amber-50 text-amber-800' : 'bg-brand-50 text-brand-800'}`}>
                    {f.badge}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-brand-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
              <div className="flex gap-2">
                <a href={f.href} target="_blank" rel="noreferrer" className="btn-primary flex-1">
                  <ExternalLink className="h-4 w-4 text-gold-400" /> Abrir formulario #{f.n}
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
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-brand-900">
                  <Icon className="h-4 w-4" /> {b.title}
                </div>
                <p className="text-sm text-slate-700">
                  <strong>Hallazgo:</strong> {b.finding}
                </p>
                <div className="mt-auto rounded-xl border-l-4 border-gold-400 bg-white p-3 text-sm text-brand-900">
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
