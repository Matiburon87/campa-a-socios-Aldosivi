import { useState } from 'react';
import { Gauge, Sheet, Table2 } from 'lucide-react';
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

      <section className="card overflow-hidden">
        <div className="p-6 pb-0">
          <SectionTitle
            icon={Gauge}
            title="Indicadores clave de rendimiento"
            subtitle="Actualización diaria / semanal"
          />
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wide text-slate-500">
              <tr className="border-b border-slate-100">
                <th className="px-6 py-3 font-semibold">Indicador</th>
                <th className="px-6 py-3 font-semibold">Fórmula / fuente</th>
                <th className="px-6 py-3 font-semibold">Meta (6 meses)</th>
                <th className="px-6 py-3 font-semibold">Umbral de alerta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {kpis.map((k) => (
                <tr key={k.name} className="transition hover:bg-brand-50/50">
                  <td className="px-6 py-3.5 font-semibold text-brand-900">{k.name}</td>
                  <td className="px-6 py-3.5">
                    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">{k.formula}</code>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="chip bg-brand-50 normal-case text-brand-800">{k.goal}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="chip bg-red-50 normal-case text-red-700">{k.alert}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <ul className="divide-y divide-slate-100 md:hidden">
          {kpis.map((k) => (
            <li key={k.name} className="space-y-2 px-6 py-4">
              <div className="font-semibold text-brand-900">{k.name}</div>
              <code className="block rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">{k.formula}</code>
              <div className="flex flex-wrap gap-2">
                <span className="chip bg-brand-50 normal-case text-brand-800">Meta: {k.goal}</span>
                <span className="chip bg-red-50 normal-case text-red-700">Alerta: {k.alert}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="card space-y-5 p-6 sm:p-8">
        <SectionTitle
          icon={Sheet}
          title="Explorador de columnas de la planilla"
          subtitle="Elegí una pestaña para inspeccionar sus campos."
        />
        <Segmented
          value={sheet}
          onChange={setSheet}
          options={Object.entries(sheetTabs).map(([value, t]) => ({ value, label: t.label }))}
        />
        <div key={sheet} className="animate-fade-up space-y-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
          <div>
            <div className="font-display font-bold text-brand-900">{data.title}</div>
            <div className="text-sm text-slate-600">{data.desc}</div>
          </div>
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {data.columns.map((c, i) => (
              <li
                key={c}
                className="flex items-center gap-2.5 rounded-lg border border-brand-100 bg-white p-2.5 text-xs text-slate-700 shadow-sm"
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
