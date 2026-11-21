import { useState } from 'react';
import { AlertTriangle, Gauge, Sheet, Table2 } from 'lucide-react';

const FUNNEL = [
  { label: 'Leads captados', value: 3000 },
  { label: 'Socios nuevos', value: 1100 },
];

function Funnel() {
  const max = FUNNEL[0].value;
  return (
    <div className="space-y-3">
      {FUNNEL.map((s) => (
        <div key={s.label} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-emerald-100/80">{s.label}</span>
            <span className="font-bold tabular-nums">{s.value.toLocaleString('es-AR')}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gold-400" style={{ width: `${(s.value / max) * 100}%` }} />
          </div>
        </div>
      ))}
      <div className="pt-1 text-xs text-emerald-100/80">
        Conversión <span className="font-display text-lg font-black text-gold-400">{Math.round((FUNNEL[1].value / max) * 100)}%</span>
      </div>
    </div>
  );
}
import { PageHero, Segmented, SectionTitle } from '../components/ui.jsx';
import { kpis, sheetTabs } from '../data/content.js';

export default function Kpis() {
  const [sheet, setSheet] = useState('leads');
  const data = sheetTabs[sheet];

  return (
    <div className="space-y-8">
      <PageHero
        chip="Hoja maestra consolidada"
        title="Tablero de control de KPIs y funnel de conversión"
        aside={
          <div className="flex items-center gap-2 rounded-xl border border-gold-400/40 bg-white/10 px-4 py-2 text-sm font-bold text-gold-400">
            <Table2 className="h-4 w-4" /> 12 pestañas operativas
          </div>
        }
      >
        Estructura integral en Google Sheets con seguimiento diario de altas web, Predio Punta Mogotes y Tienda Olavarría.
      </PageHero>

      <section className="space-y-4">
        <SectionTitle icon={Gauge} title="Indicadores clave de rendimiento" subtitle="Meta a 6 meses · actualización diaria / semanal" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k, i) => (
            <article
              key={k.name}
              className={`card flex flex-col gap-3 p-5 transition hover:-translate-y-0.5 hover:shadow-lg ${
                i === 0 ? 'border-t-4 border-t-gold-400' : ''
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{k.name}</div>
              <div className="font-display text-2xl font-black text-ink">{k.goal}</div>
              <code className="block break-words rounded-md bg-slate-50 px-2 py-1.5 text-[11px] leading-snug text-slate-500">
                {k.formula}
              </code>
              <div className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-red-700">
                <AlertTriangle className="h-3.5 w-3.5" /> Alerta si {k.alert}
              </div>
            </article>
          ))}
          <article className="hero-gradient flex flex-col justify-between gap-4 rounded-2xl p-5 text-white shadow-card">
            <div className="text-xs font-semibold uppercase tracking-wide text-gold-400">Embudo meta</div>
            <Funnel />
          </article>
        </div>
      </section>

      <section className="card space-y-5 p-6 sm:p-8">
        <SectionTitle
          icon={Sheet}
          title="Explorador de columnas de la planilla"
          subtitle="Elegí una pestaña para inspeccionar sus campos."
        />
        <Segmented
          label="Pestaña de la planilla"
          value={sheet}
          onChange={setSheet}
          options={Object.entries(sheetTabs).map(([value, t]) => ({ value, label: t.label }))}
        />
        <div key={sheet} className="animate-fade-up space-y-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
          <div>
            <div className="font-display font-bold text-ink">{data.title}</div>
            <div className="text-sm text-slate-600">{data.desc}</div>
          </div>
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {data.columns.map((c, i) => (
              <li
                key={c}
                className="flex items-center gap-2.5 rounded-lg border border-brand-100 bg-surface p-2.5 text-xs text-slate-700 shadow-sm"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-800 text-[11px] font-bold text-gold-400">
                  {i + 1}
                </span>
                {c}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
