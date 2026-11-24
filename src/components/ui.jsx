import { Copy } from 'lucide-react';
import { useCopy } from './Toast.jsx';

export function PageHero({ chip, title, children, aside }) {
  return (
    <section className="hero-gradient relative overflow-hidden rounded-3xl p-6 text-white shadow-lg sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-400/10 blur-2xl" />
      <img
        src="escudo-aldosivi.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 right-4 hidden h-48 w-48 object-contain opacity-[0.06] lg:block"
      />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl space-y-3">
          {chip && <span className="chip bg-gold-400 text-brand-900">{chip}</span>}
          <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{title}</h2>
          {children && <div className="text-sm leading-relaxed text-emerald-100/90 sm:text-[15px]">{children}</div>}
        </div>
        {aside && <div className="shrink-0">{aside}</div>}
      </div>
    </section>
  );
}

export function SectionTitle({ id, icon: Icon, title, subtitle, right }) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        {Icon && (
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-ink-3">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <div>
          <h3 id={id} className="font-display text-lg font-bold text-ink">{title}</h3>
          {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
        </div>
      </div>
      {right}
    </div>
  );
}

export function Segmented({ options, value, onChange, label }) {
  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`seg ${value === o.value ? 'seg-on' : 'seg-off'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function CopyButton({ text, variant = 'btn-primary', label = 'Copiar' }) {
  const copy = useCopy();
  return (
    <button onClick={() => copy(text)} className={`${variant} !py-2 !text-xs`}>
      <Copy className="h-4 w-4" />
      {label}
    </button>
  );
}

export function TextBlock({ text, className = '' }) {
  return (
    <pre
      className={`whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-surface p-4 font-sans text-sm leading-relaxed text-slate-700 ${className}`}
    >
      {text}
    </pre>
  );
}
