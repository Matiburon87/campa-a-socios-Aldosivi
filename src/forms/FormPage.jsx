import { Fragment, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ClipboardCopy, FileText, MessageSquareQuote, Printer, RotateCcw } from 'lucide-react';
import { forms, formHref } from '../data/forms.js';
import { LINKS } from '../data/content.js';
import { useCopy } from '../components/Toast.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import { initialState, isAnswered, loadDraft, saveDraft } from './drafts.js';

/* ---------- helpers ---------- */

/** Renders **bold** markup as <strong>. */
export function rich(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
    p.startsWith('**') && p.endsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : <Fragment key={i}>{p}</Fragment>
  );
}
const plain = (t) => (typeof t === 'string' ? t : t.title).replace(/\*\*/g, '');


function npsInfo(v) {
  if (v === null) return null;
  if (v <= 6) return { label: 'Detractor', action: 'Activar llamado personal', cls: 'bg-red-50 text-red-800 border-red-200' };
  if (v <= 8) return { label: 'Pasivo', action: 'Invitar a evento', cls: 'bg-amber-50 text-amber-800 border-amber-200' };
  return { label: 'Promotor', action: 'Activar programa referidos (1 mes gratis)', cls: 'bg-brand-50 text-ink-2 border-brand-100' };
}

function summary(form, state) {
  const lines = [`FORMULARIO #${form.n} — ${form.title}`, `Fecha: ${new Date().toLocaleDateString('es-AR')}`, ''];
  form.fields.forEach((f, i) => lines.push(`${f.label}: ${state.fields[i] || '—'}`));
  if (form.intro.consent) lines.push(`Participa: ${form.intro.consent[state.consent] ?? '—'}`);
  lines.push('');
  form.questions.forEach((q, i) => {
    const a = state.answers[i];
    let txt = '—';
    if (q.type === 'multi') txt = a.length ? a.map((k) => plain(q.options[k])).join('; ') : '—';
    else if (q.type === 'text') txt = a.trim() || '—';
    else if (q.type === 'nps') txt = a === null ? '—' : `${a} (${npsInfo(a).label})`;
    else if (a !== null) txt = plain(q.options[a]);
    lines.push(`${i + 1}. ${plain(q.q)}`, `   → ${txt}`);
  });
  return lines.join('\n');
}

/* ---------- page ---------- */

export default function FormPage({ slug }) {
  const form = forms.find((f) => f.slug === slug) ?? forms[0];
  const [state, setState] = useState(() => loadDraft(form));
  const copy = useCopy();

  // The parent mounts this page with key={slug}, so state is fresh per form.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    saveDraft(form, state);
  }, [form, state]);

  const setAnswer = (i, v) => setState((s) => ({ ...s, answers: s.answers.map((a, j) => (j === i ? v : a)) }));
  const setField = (i, v) => setState((s) => ({ ...s, fields: s.fields.map((a, j) => (j === i ? v : a)) }));

  const answered = form.questions.filter((q, i) => isAnswered(q, state.answers[i])).length;
  const progress = Math.round((answered / form.questions.length) * 100);

  // Group consecutive `half` questions into 2-column rows.
  const rows = useMemo(() => {
    const out = [];
    form.questions.forEach((q, i) => {
      const last = out[out.length - 1];
      if (q.half && last?.half && last.items.length === 1) last.items.push(i);
      else out.push({ half: !!q.half, items: [i] });
    });
    return out;
  }, [form]);

  return (
    <div className="min-h-screen bg-canvas pb-16 print:bg-surface print:pb-0">
      <Toolbar
        form={form}
        progress={progress}
        onCopy={() => copy(summary(form, state), '¡Respuestas copiadas!')}
        onReset={() => {
          // Clearing also wipes the saved draft, so ask first unless there is nothing to lose.
          const untouched = JSON.stringify(state) === JSON.stringify(initialState(form));
          if (untouched || window.confirm('¿Borrar todas las respuestas de este formulario? El borrador guardado se pierde.')) {
            setState(initialState(form));
          }
        }}
      />

      <article className="mx-auto my-8 max-w-[900px] overflow-hidden rounded-2xl border border-brand-100 bg-surface shadow-card print:my-0 print:max-w-none print:rounded-none print:border-0 print:shadow-none sm:mx-auto">
        <Banner form={form} />

        <div className="space-y-6 p-5 sm:p-8">
          <div className="space-y-2 rounded-r-xl border-l-4 border-brand-700 bg-brand-50 p-5 text-sm">
            <div className="flex items-center gap-2 font-bold text-ink">
              <MessageSquareQuote className="h-4 w-4 text-ink-3" /> {form.intro.title}
            </div>
            <p className="italic leading-relaxed text-slate-700">{rich(form.intro.text)}</p>
            {form.intro.consent && (
              <div className="flex flex-wrap gap-2 pt-2">
                {form.intro.consent.map((c, i) => (
                  <Choice key={c} type="radio" name="consent" checked={state.consent === i} onChange={() => setState((s) => ({ ...s, consent: i }))} pill>
                    {c}
                  </Choice>
                ))}
              </div>
            )}
          </div>

          <div className={`grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 ${form.fields.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {form.fields.map((f, i) => (
              <label key={f.label} className="block text-xs font-bold text-slate-700">
                {f.label}
                {f.type === 'select' ? (
                  <select value={state.fields[i]} onChange={(e) => setField(i, e.target.value)} className="form-input">
                    <option value="">Seleccionar…</option>
                    {f.options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={f.type ?? 'text'}
                    value={state.fields[i]}
                    onChange={(e) => setField(i, e.target.value)}
                    placeholder={f.placeholder}
                    className="form-input"
                  />
                )}
              </label>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 print:hidden">
            <span>
              {answered} de {form.questions.length} preguntas respondidas
            </span>
            <span className="text-slate-500">El borrador se guarda automáticamente en este navegador</span>
          </div>

          <div className="space-y-4">
            {rows.map((row) => (
              <div key={row.items[0]} className={row.half ? 'grid gap-4 sm:grid-cols-2' : ''}>
                {row.items.map((i) => (
                  <Question key={i} n={i + 1} q={form.questions[i]} value={state.answers[i]} onChange={(v) => setAnswer(i, v)} />
                ))}
              </div>
            ))}
          </div>

          <FormFooter />
        </div>
      </article>
    </div>
  );
}

/* ---------- pieces ---------- */

function Toolbar({ form, progress, onCopy, onReset }) {
  return (
    <div className="sticky top-0 z-40 bg-brand-900 text-white shadow-md print:hidden">
      <div
        className="absolute inset-x-0 bottom-0 h-1 bg-white/10"
        role="progressbar"
        aria-label="Progreso del formulario"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full bg-gold-400 transition-[width] duration-300" style={{ width: `${progress}%` }} />
      </div>
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <a href="#encuestas" className="btn-ghost !px-3 !py-2 !text-xs">
            <ArrowLeft className="h-4 w-4 text-gold-400" /> <span className="hidden sm:inline">Formularios</span>
          </a>
          <nav className="flex gap-1 overflow-x-auto text-xs scrollbar-none" aria-label="Formularios">
            {forms.map((f) => (
              <a
                key={f.slug}
                href={formHref(f.slug)}
                aria-current={f.slug === form.slug ? 'page' : undefined}
                className={`whitespace-nowrap rounded-md px-2.5 py-1.5 font-semibold transition ${
                  f.slug === form.slug ? 'bg-gold-400 text-brand-900' : 'text-emerald-100 hover:bg-white/10'
                }`}
              >
                {f.n}. <span className="hidden md:inline">{f.shortName}</span>
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-1.5">
          {form.pdf && (
            <a href={LINKS.pdfExSocios} target="_blank" rel="noreferrer" className="btn-ghost hidden !px-3 !py-2 !text-xs sm:inline-flex" title="PDF Ex-Socios">
              <FileText className="h-4 w-4 text-gold-400" /> <span className="hidden lg:inline">PDF</span>
            </a>
          )}
          <button onClick={onReset} className="btn-ghost !px-3 !py-2 !text-xs" title="Limpiar respuestas">
            <RotateCcw className="h-4 w-4" /> <span className="hidden lg:inline">Limpiar</span>
          </button>
          <button onClick={onCopy} className="btn-ghost !px-3 !py-2 !text-xs" title="Copiar respuestas como texto">
            <ClipboardCopy className="h-4 w-4" /> <span className="hidden lg:inline">Copiar</span>
          </button>
          <button onClick={() => window.print()} className="btn-gold !px-3 !py-2 !text-xs">
            <Printer className="h-4 w-4" /> <span className="hidden sm:inline">Imprimir / PDF</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

function Banner({ form }) {
  return (
    <div className="hero-gradient p-6 text-white sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <span className="chip bg-gold-400 text-brand-900">{form.chip}</span>
          <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{form.title}</h1>
          <p className="text-sm text-emerald-100">{form.subtitle} · Club Atlético Aldosivi</p>
        </div>
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-gold-400 bg-white/10 p-[14%]">
          <img src="escudo-aldosivi.png" alt="Escudo Club Atlético Aldosivi" className="h-full w-full object-contain" />
        </div>
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-xs sm:grid-cols-4">
        {[['Club', 'Club Atlético Aldosivi'], ...form.meta].map(([k, v]) => (
          <div key={k}>
            <dt className="text-[10px] font-bold uppercase tracking-wide text-gold-300">{k}</dt>
            <dd className="font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const toneCls = {
  mint: 'border-brand-700/30 bg-brand-50/60',
  amber: 'border-l-4 border-l-amber-500',
  brand: 'border-l-4 border-l-brand-700',
};
const colsCls = { 1: '', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'grid-cols-2 sm:grid-cols-4', 5: 'grid-cols-2 sm:grid-cols-5' };

function Question({ n, q, value, onChange }) {
  const done = isAnswered(q, value);
  return (
    <fieldset
      className={`space-y-3 rounded-xl border border-slate-200 bg-surface p-5 transition break-inside-avoid hover:border-brand-700/40 hover:shadow-sm ${
        toneCls[q.tone] ?? ''
      }`}
    >
      <legend className="contents">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                done ? 'bg-gold-400 text-brand-900' : 'bg-brand-800 text-gold-300'
              }`}
            >
              {n}
            </span>
            <h3 className={`text-sm font-bold ${q.tone === 'mint' ? 'text-ink' : 'text-slate-900'}`}>
              {q.q} {q.hint && <span className="text-xs font-normal text-slate-500">({q.hint})</span>}
            </h3>
          </div>
          {q.badge && <span className="shrink-0 rounded bg-brand-800 px-2 py-0.5 text-[10px] font-bold text-gold-300">{q.badge}</span>}
        </div>
      </legend>

      <div className="sm:pl-8">
        {q.type === 'text' && (
          <textarea
            rows={2}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={q.placeholder}
            className="form-input mt-0 resize-y bg-slate-50"
            aria-label={q.q}
          />
        )}

        {q.type === 'nps' && <Nps value={value} onChange={onChange} />}

        {q.type === 'offer' && (
          <div className={`grid gap-3 ${colsCls[q.cols]}`}>
            {q.options.map((o, k) => {
              const on = value === k;
              return (
                <label
                  key={o.title}
                  className={`cursor-pointer space-y-1 rounded-xl border-2 bg-surface p-3.5 text-xs transition ${
                    on ? 'border-brand-700 shadow-md' : 'border-brand-100 hover:border-brand-700/50'
                  }`}
                >
                  <span className="flex items-center gap-2 font-bold text-ink">
                    <input type="radio" checked={on} onChange={() => onChange(k)} className="accent-brand-700" />
                    {o.title}
                  </span>
                  <span className="block pl-5 text-[11px] leading-relaxed text-slate-600">{rich(o.desc)}</span>
                </label>
              );
            })}
          </div>
        )}

        {(q.type === 'single' || q.type === 'multi') && (
          <div className={`grid gap-x-4 gap-y-2 ${colsCls[q.cols] ?? ''}`}>
            {q.options.map((o, k) => {
              const multi = q.type === 'multi';
              const checked = multi ? value.includes(k) : value === k;
              return (
                <Choice
                  key={k}
                  type={multi ? 'checkbox' : 'radio'}
                  checked={checked}
                  onChange={() =>
                    onChange(multi ? (checked ? value.filter((x) => x !== k) : [...value, k].sort((a, b) => a - b)) : k)
                  }
                >
                  {rich(o)}
                </Choice>
              );
            })}
          </div>
        )}
      </div>
    </fieldset>
  );
}

function Choice({ type, checked, onChange, children, pill }) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-2 text-xs transition ${
        pill
          ? `rounded-lg border bg-surface px-3 py-1.5 font-semibold ${checked ? 'border-brand-700 text-ink' : 'border-slate-300 text-slate-600'}`
          : `rounded-md px-1.5 py-1 ${checked ? 'bg-brand-50 text-ink' : 'text-slate-700 hover:bg-slate-50'}`
      }`}
    >
      <input type={type} checked={checked} onChange={onChange} className="mt-0.5 shrink-0 accent-brand-700" />
      <span>{children}</span>
    </label>
  );
}

function Nps({ value, onChange }) {
  const info = npsInfo(value);
  const tone = (n) =>
    n <= 6 ? 'border-red-200 bg-red-50 text-red-700' : n <= 8 ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-11 sm:gap-1" role="radiogroup" aria-label="Puntaje NPS de 0 a 10">
        {Array.from({ length: 11 }, (_, n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            onClick={() => onChange(value === n ? null : n)}
            className={`rounded-md border py-2 text-xs font-bold transition hover:brightness-95 ${
              value === n ? 'scale-105 border-brand-700 bg-brand-700 text-gold-300 shadow' : tone(n)
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-between gap-1 text-[10px] text-slate-500">
        <span>0-6: Detractores (activar llamado personal)</span>
        <span>7-8: Pasivos (invitar a evento)</span>
        <span>9-10: Promotores (referidos 1 mes gratis)</span>
      </div>
      {info && (
        <div className={`rounded-lg border px-3 py-2 text-xs font-semibold ${info.cls}`}>
          {info.label} → {info.action}
        </div>
      )}
    </div>
  );
}

function FormFooter() {
  return (
    <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t-2 border-brand-800/20 pt-6 text-xs text-slate-600 sm:flex-row">
      <div className="flex items-center gap-3">
        <img src="escudo-aldosivi.png" alt="" className="h-8 w-8 object-contain" />
        <div>
          <div className="font-bold text-ink">Club Atlético Aldosivi — Campaña oficial de socios 2026-2027</div>
          <div className="text-[11px] text-slate-500">
            Atención y pagos: <strong>100% online (aldosivi.com/socio)</strong> · Presencial: <strong>Predio Deportivo de Punta Mogotes</strong> y{' '}
            <strong>Tienda Oficial calle Olavarría</strong>
          </div>
        </div>
      </div>
      <span className="shrink-0 rounded-full bg-brand-800 px-3 py-1 text-[11px] font-bold text-gold-300">Firma creador: Maty_Asaro_Dev</span>
    </div>
  );
}
