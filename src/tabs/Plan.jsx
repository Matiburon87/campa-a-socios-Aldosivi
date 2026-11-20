import { Coins, UsersRound } from 'lucide-react';
import { PageHero, SectionTitle } from '../components/ui.jsx';
import { budget, fronts, team } from '../data/content.js';

const ars = (n) => '$' + n.toLocaleString('es-AR');
const CURRENT = 5100;
const TARGET = 10000;
const SIX_MONTH_GOAL = fronts.reduce((a, f) => a + f.goal, 0);

export default function Plan() {
  const total = budget.reduce((a, [, v]) => a + v, 0);
  const pctNow = (CURRENT / TARGET) * 100;
  const pctAfter = ((CURRENT + SIX_MONTH_GOAL) / TARGET) * 100;

  return (
    <div className="space-y-8">
      <PageHero
        chip="Meta Comisión Directiva: 10.000 socios"
        title="Plan operativo en 4 frentes orgánicos y presupuesto mínimo"
        aside={
          <div className="rounded-2xl border-2 border-gold-400 bg-surface px-5 py-3 text-center font-display text-ink">
            <div className="text-[10px] font-bold uppercase text-slate-500">Meta 6 meses</div>
            <div className="text-2xl font-black">+{SIX_MONTH_GOAL.toLocaleString('es-AR')} socios</div>
          </div>
        }
      >
        De 5.100 socios actuales a 10.000 consolidando pagos web, eventos en el Predio de Punta Mogotes y presencia en la Tienda de
        calle Olavarría.
      </PageHero>

      <section className="card space-y-3 p-6">
        <div className="flex flex-wrap items-end justify-between gap-2 text-sm">
          <span className="font-semibold text-slate-700">Camino a los 10.000 socios</span>
          <span className="text-slate-500">
            Hoy <strong className="text-ink">5.100</strong> → en 6 meses{' '}
            <strong className="text-ink">{(CURRENT + SIX_MONTH_GOAL).toLocaleString('es-AR')}</strong>
          </span>
        </div>
        <div className="relative h-4 overflow-hidden rounded-full bg-slate-100">
          <div className="absolute inset-y-0 left-0 rounded-full bg-gold-300" style={{ width: `${pctAfter}%` }} />
          <div className="absolute inset-y-0 left-0 rounded-full bg-brand-800" style={{ width: `${pctNow}%` }} />
        </div>
        <div className="flex gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-brand-800" /> Actual ({Math.round(pctNow)}%)</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-gold-300" /> Con plan 6 meses ({Math.round(pctAfter)}%)</span>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {fronts.map((f, i) => (
          <div key={f.title} className="card space-y-3 p-5">
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-800 font-display text-sm font-black text-gold-400">
                {i + 1}
              </span>
              <span className="font-display text-xl font-black text-ink">+{f.goal}</span>
            </div>
            <div className="font-bold text-ink">{f.title}</div>
            <p className="text-sm text-slate-600">{f.desc}</p>
            <div className="text-xs font-bold text-ink-3">CPA {f.cpa}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="card space-y-4 p-6">
          <SectionTitle icon={UsersRound} title="Equipo mínimo operativo" subtitle="10 a 12 personas" />
          <ul className="space-y-2">
            {team.map(([role, detail, hours]) => (
              <li key={role} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm">
                <span>
                  <strong className="text-slate-900">{role}</strong>
                  <span className="block text-xs text-slate-500">{detail}</span>
                </span>
                <span className="shrink-0 rounded-md bg-brand-50 px-2 py-0.5 text-xs font-bold text-ink-2">{hours}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card space-y-4 p-6">
          <SectionTitle icon={Coins} title="Presupuesto optimizado 6 meses" subtitle="-30% de ahorro vs. plan original" />
          <div className="space-y-3">
            {budget.map(([item, value, saving]) => (
              <div key={item} className="space-y-1">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-slate-700">{item}</span>
                  <span className="shrink-0 font-semibold tabular-nums text-slate-900">{ars(value)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-brand-700" style={{ width: `${(value / total) * 100}%` }} />
                  </div>
                  <span className="w-20 text-right text-[11px] font-semibold text-ink-3">{saving}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-xl bg-brand-50 px-4 py-3 font-display font-extrabold text-ink">
            <span>Total campaña</span>
            <span className="tabular-nums">{ars(total)}</span>
          </div>
        </section>
      </div>
    </div>
  );
}
