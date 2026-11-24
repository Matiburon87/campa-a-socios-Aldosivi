import { ArrowRight, Calculator, ChevronRight, ClipboardList, LayoutGrid, Megaphone, MessageCircle, PencilLine, Zap } from 'lucide-react';
import { PageHero, SectionTitle } from '../components/ui.jsx';
import GoalProgress from '../components/GoalProgress.jsx';
import { headlineStats } from '../data/content.js';
import { forms as formDefs, formHref } from '../data/forms.js';
import { useDrafts } from '../forms/drafts.js';
import { GROUPS, sectionsOf } from '../navigation.js';

const toneClass = { white: 'text-ink', gold: 'text-amber-700', mint: 'text-ink-3' };

const TASKS = [
  { to: 'whatsapp', icon: MessageCircle, title: 'Escribir a un socio por WhatsApp', desc: 'Elegí la prioridad, completá el nombre y envialo.' },
  { to: 'diagnostico', icon: Calculator, title: 'Simular la recuperación de mora', desc: 'Proyectá ingresos según la tasa de adhesión.' },
  { to: 'prensa', icon: Megaphone, title: 'Copiar un posteo o la gacetilla', desc: 'Textos oficiales listos para redes y medios.' },
];

function SectionLink({ onClick, icon: Icon, title, desc, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-brand-50 ${className}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-ink-3 transition group-hover:bg-brand-800 group-hover:text-gold-400">
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-ink">{title}</span>
        <span className="block text-xs leading-snug text-slate-500">{desc}</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-ink-3" aria-hidden="true" />
    </button>
  );
}

export default function Inicio({ onNavigate }) {
  const [drafts] = useDrafts();
  const go = (id) => onNavigate(id, { focusContent: true });

  return (
    <div className="space-y-8">
      <PageHero chip="Panel general" title="Centro Estratégico de Socios">
        Todo lo que necesita el equipo para pasar de <strong className="text-white">5.100 a 10.000 socios</strong>: el diagnóstico y el
        plan, las herramientas para contactar a cada socio y el material de comunicación. Empezá por una tarea o recorré las secciones.
      </PageHero>

      {/* Campaign status */}
      <section className="card space-y-6 p-6 sm:p-8" aria-labelledby="estado-titulo">
        <SectionTitle
          id="estado-titulo"
          icon={LayoutGrid}
          title="Estado de la campaña"
          subtitle="Las cifras que guían todo el plan."
          right={
            <button onClick={() => go('plan')} className="btn-soft !py-2 !text-xs">
              Ver el plan completo <ArrowRight className="h-4 w-4" />
            </button>
          }
        />
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {headlineStats.map((s) => (
            <div key={s.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{s.label}</dt>
              <dd className={`font-display text-2xl font-extrabold tabular-nums ${toneClass[s.tone]}`}>{s.value}</dd>
            </div>
          ))}
        </dl>
        <GoalProgress />
      </section>

      {/* Quick actions */}
      <section className="space-y-4" aria-labelledby="tareas-titulo">
        <SectionTitle id="tareas-titulo" icon={Zap} title="¿Qué necesitás hacer?" subtitle="Accesos directos a las tareas más frecuentes." />
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="card flex flex-col gap-4 p-5 lg:col-span-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 font-display font-bold text-ink">
                <ClipboardList className="h-5 w-5 text-ink-3" aria-hidden="true" /> Cargar una encuesta
              </h3>
              <button onClick={() => go('encuestas')} className="text-xs font-semibold text-ink-3 underline-offset-2 hover:underline">
                Detalle de los formularios
              </button>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {formDefs.map((f) => {
                const d = drafts[f.n];
                return (
                  <li key={f.slug}>
                    <a
                      href={formHref(f.slug)}
                      className="group flex h-full items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-brand-700 hover:bg-brand-50"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-800 font-display font-black text-gold-400">
                        {f.n}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-ink">{f.shortName}</span>
                        {d ? (
                          <span className="flex items-center gap-1 text-xs font-semibold text-amber-700">
                            <PencilLine className="h-3 w-3" aria-hidden="true" /> Borrador {d.answered}/{d.total}
                          </span>
                        ) : (
                          <span className="block text-xs text-slate-500">Nuevo formulario</span>
                        )}
                      </span>
                      <span className="shrink-0 text-xs font-bold text-ink-3 group-hover:underline">{d ? 'Continuar' : 'Completar'}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="card flex flex-col p-2 lg:col-span-2">
            {TASKS.map((t) => (
              <SectionLink key={t.to} onClick={() => go(t.to)} icon={t.icon} title={t.title} desc={t.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* Site map */}
      <section className="space-y-4" aria-labelledby="mapa-titulo">
        <SectionTitle id="mapa-titulo" icon={LayoutGrid} title="Cómo está organizado" subtitle="Tres áreas, de la estrategia a la publicación." />
        <div className="grid gap-6 md:grid-cols-3">
          {GROUPS.filter((g) => g.id !== 'inicio').map((g, i) => (
            <article key={g.id} className="card flex flex-col gap-2 p-5">
              <div className="flex items-center gap-3 px-1">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-400 font-display text-sm font-black text-brand-900">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display font-bold text-ink">{g.label}</h3>
                  <p className="text-xs text-slate-500">{g.blurb}</p>
                </div>
              </div>
              <div className="-mx-1 border-t border-slate-100 pt-2">
                {sectionsOf(g.id).map((s) => (
                  <SectionLink key={s.id} onClick={() => go(s.id)} icon={s.icon} title={s.label} desc={s.desc} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
