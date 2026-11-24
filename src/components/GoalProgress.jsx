import { META_6M, META_CD, SOCIOS_ACTUALES } from '../data/content.js';

const fmt = (n) => n.toLocaleString('es-AR');

/** "Camino a los 10.000 socios": current members vs. members after the 6-month plan. */
export default function GoalProgress({ className = '' }) {
  const after = SOCIOS_ACTUALES + META_6M;
  const pctNow = (SOCIOS_ACTUALES / META_CD) * 100;
  const pctAfter = (after / META_CD) * 100;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex flex-wrap items-end justify-between gap-2 text-sm">
        <span className="font-semibold text-slate-700">Camino a los {fmt(META_CD)} socios</span>
        <span className="text-slate-500">
          Hoy <strong className="text-ink">{fmt(SOCIOS_ACTUALES)}</strong> → en 6 meses <strong className="text-ink">{fmt(after)}</strong>
        </span>
      </div>
      <div
        className="relative h-4 overflow-hidden rounded-full bg-slate-100"
        role="img"
        aria-label={`${fmt(SOCIOS_ACTUALES)} socios hoy (${Math.round(pctNow)}% de la meta); ${fmt(after)} con el plan a 6 meses (${Math.round(pctAfter)}%).`}
      >
        <div className="absolute inset-y-0 left-0 rounded-full bg-gold-300" style={{ width: `${pctAfter}%` }} />
        <div className="absolute inset-y-0 left-0 rounded-full bg-brand-800" style={{ width: `${pctNow}%` }} />
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-800" /> Actual ({Math.round(pctNow)}%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-gold-300" /> Con plan 6 meses ({Math.round(pctAfter)}%)
        </span>
      </div>
    </div>
  );
}
