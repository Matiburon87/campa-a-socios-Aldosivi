import { useState } from 'react';
import { AlertTriangle, Calculator, CheckCircle2, Target, TrendingUp } from 'lucide-react';
import { PageHero, SectionTitle } from '../components/ui.jsx';
import { useCountUp } from '../hooks.js';
import { CUOTA, INVERSION, SOCIOS_MORA, headlineStats, problems, solutions } from '../data/content.js';

const ars = (n) => '$' + n.toLocaleString('es-AR');

export default function Diagnostico() {
  const [pct, setPct] = useState(50);
  const recovered = Math.round(SOCIOS_MORA * (pct / 100));
  const monthly = recovered * CUOTA;
  const annual = monthly * 12;
  const roi = Math.round(monthly / INVERSION);
  const breakeven = Math.ceil(INVERSION / CUOTA);
  const shownRecovered = useCountUp(recovered);
  const shownMonthly = useCountUp(monthly);
  const shownAnnual = useCountUp(annual);

  return (
    <div className="space-y-8">
      <PageHero
        chip="Hallazgo estratégico principal"
        title="1.200 socios activos con mora de 1 a 5 meses + 300 ex-socios objetivo"
        aside={
          <div className="min-w-[220px] rounded-2xl border-2 border-gold-400 bg-white p-5 text-center text-brand-900 shadow-md">
            <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Recuperación mensual</div>
            <div className="font-display text-3xl font-black">
              $22.8M <span className="text-xs font-medium text-slate-500">/ mes</span>
            </div>
            <div className="mt-1 text-xs font-bold text-brand-700">Con 50% adhesión al débito</div>
          </div>
        }
      >
        El mayor impacto de caja inmediato es facilitar la regularización con <strong className="text-white">pago 100% online</strong>{' '}
        (débito automático CBU/tarjeta), complementado con atención presencial en el{' '}
        <strong className="text-white">Predio Deportivo de Punta Mogotes</strong> y la{' '}
        <strong className="text-white">Tienda Oficial de calle Olavarría</strong>.
      </PageHero>

      {/* Mobile-visible stats (header stats are hidden below xl) */}
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:hidden">
        {headlineStats.map((s) => (
          <div key={s.label} className="card p-4">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{s.label}</dt>
            <dd className="font-display text-2xl font-extrabold text-brand-900">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-5">
        <Target className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
        <div className="space-y-1 text-sm">
          <div className="font-bold text-brand-900">Enfoque operativo: contacto 1 a 1 personalizado y autogestión web</div>
          <p className="leading-relaxed text-slate-700">
            El socio que dejó de abonar por olvido o incomodidad vuelve cuando el club le ofrece resolverlo desde el celular en 2
            minutos, o cuando se acerca al Predio de Punta Mogotes o a la Tienda de calle Olavarría.
          </p>
        </div>
      </div>

      <section className="card space-y-6 p-6 sm:p-8">
        <SectionTitle
          icon={Calculator}
          title="Simulador de recuperación de socios con mora"
          subtitle="Mové el porcentaje de socios recuperados para proyectar el ingreso mensual y anual."
          right={
            <span className="chip border border-brand-100 bg-brand-50 normal-case text-brand-800">
              Cuota débito web: {ars(CUOTA)} / mes
            </span>
          }
        />

        <div className="grid items-center gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="pct" className="text-sm font-semibold text-slate-700">
                  Tasa de adhesión / recuperación
                </label>
                <span className="rounded-lg bg-gold-400 px-3 py-0.5 font-display text-xl font-black tabular-nums text-brand-900">
                  {pct}%
                </span>
              </div>
              <input
                id="pct"
                type="range"
                min="10"
                max="90"
                step="5"
                value={pct}
                onChange={(e) => setPct(Number(e.target.value))}
                className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200"
              />
              <div className="flex flex-wrap gap-2">
                {[
                  [10, 'Pesimista'],
                  [50, 'Meta plan'],
                  [90, 'Óptimo'],
                ].map(([v, l]) => (
                  <button
                    key={v}
                    onClick={() => setPct(v)}
                    aria-pressed={pct === v}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                      pct === v
                        ? 'border-brand-800 bg-brand-800 text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-brand-700 hover:text-brand-800'
                    }`}
                  >
                    {v}% · {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-medium text-slate-500">Inversión total campaña (6 meses)</div>
                <div className="font-display text-xl font-extrabold text-brand-900">{ars(INVERSION)}</div>
                <div className="mt-1 text-xs font-semibold text-brand-700">Se recupera con {breakeven} socios adheridos</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-medium text-slate-500">Retorno sobre inversión (ROI mensual)</div>
                <div className="flex items-center gap-2 font-display text-xl font-extrabold text-brand-700">
                  <TrendingUp className="h-5 w-5" /> {roi}x costo total
                </div>
                <div className="mt-1 text-xs text-slate-500">Impacto neto desde el primer mes</div>
              </div>
            </div>
          </div>

          <div className="hero-gradient space-y-4 rounded-2xl border-2 border-gold-400 p-6 text-center text-white shadow-xl">
            <div className="text-xs font-extrabold uppercase tracking-wider text-gold-400">Impacto de caja proyectado</div>
            <div>
              <div className="text-xs text-emerald-100/80">Socios recuperados</div>
              <div className="font-display text-3xl font-black tabular-nums">
                {shownRecovered.toLocaleString('es-AR')}
                <span className="text-sm font-semibold text-emerald-200/80"> / {SOCIOS_MORA.toLocaleString('es-AR')}</span>
              </div>
              <div
                className="mx-auto mt-2 flex h-2 max-w-[220px] overflow-hidden rounded-full bg-white/15"
                role="img"
                aria-label={`${recovered} de ${SOCIOS_MORA} socios recuperados`}
              >
                <div className="rounded-full bg-gold-400 transition-[width] duration-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
            <div className="border-y border-white/10 py-3">
              <div className="text-xs text-emerald-100/80">Ingreso mensual recurrente</div>
              <div className="font-display text-2xl font-black tabular-nums text-gold-400">{ars(shownMonthly)}</div>
            </div>
            <div>
              <div className="text-xs text-emerald-100/80">Ingreso anualizado</div>
              <div className="font-display text-xl font-bold tabular-nums text-emerald-200">{ars(shownAnnual)}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <ListCard
          tone="red"
          icon={AlertTriangle}
          title="Los 3 problemas que generaban caídas"
          items={problems}
        />
        <ListCard
          tone="green"
          icon={CheckCircle2}
          title="Nuevo ecosistema de canales de pago y atención"
          items={solutions}
        />
      </div>
    </div>
  );
}

function ListCard({ tone, icon: Icon, title, items }) {
  const red = tone === 'red';
  return (
    <section className={`card space-y-4 border-l-4 p-6 ${red ? 'border-l-red-500' : 'border-l-brand-700'}`}>
      <h3
        className={`flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-wide ${
          red ? 'text-red-700' : 'text-brand-900'
        }`}
      >
        <Icon className="h-5 w-5" /> {title}
      </h3>
      <ol className="space-y-3">
        {items.map(([t, d], i) => (
          <li key={t} className="flex gap-3 text-sm">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                red ? 'bg-red-50 text-red-700' : 'bg-brand-50 text-brand-800'
              }`}
            >
              {i + 1}
            </span>
            <span className="text-slate-600">
              <strong className="text-slate-900">{t}.</strong> {d}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
