import { useEffect, useRef, useState } from 'react';
import { ClipboardCheck, FileText, MessageCircle, Send, ShieldAlert, Star, Trash2 } from 'lucide-react';
import { CopyButton, PageHero, SectionTitle } from '../components/ui.jsx';
import { LINKS, leadScores, shortcuts } from '../data/content.js';

const WELCOME = {
  from: 'club',
  text: '👋 ¡Hola! Elegí un atajo para previsualizar cómo reciben la información los socios y simpatizantes por WhatsApp.',
  time: '10:00',
};

const now = () => new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

const PLACEHOLDER_RE = /\[[A-Za-z_]+\]/g;

/** Local Mar del Plata numbers (e.g. "223 555 1234") → wa.me format 549XXXXXXXXXX. */
function toWaNumber(raw) {
  let d = raw.replace(/\D/g, '');
  if (!d) return '';
  if (d.startsWith('54')) d = d.slice(2);
  if (d.startsWith('9')) d = d.slice(1);
  if (d.startsWith('0')) d = d.slice(1);
  // "223 15 555 1234" → drop the local mobile prefix 15 after the area code (2-4 digits)
  if (d.length === 12) {
    const k = [2, 3, 4].find((i) => d.slice(i, i + 2) === '15');
    if (k !== undefined) d = d.slice(0, k) + d.slice(k + 2);
  }
  return '549' + d;
}

function Field({ label, value, onChange, disabled, ...rest }) {
  return (
    <label className={`block text-xs font-semibold text-slate-600 ${disabled ? 'opacity-40' : ''}`}>
      {label}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="mt-1 w-full rounded-lg border border-slate-200 bg-surface px-3 py-2 text-sm font-normal text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-700 focus:ring-2 focus:ring-brand-100 disabled:cursor-not-allowed"
        {...rest}
      />
    </label>
  );
}

function TemplatePreview({ text }) {
  const parts = text.split(/(\[[A-Za-z_]+\])/g);
  return (
    <pre className="whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-surface p-4 font-sans text-sm leading-relaxed text-slate-700">
      {parts.map((p, i) =>
        /^\[[A-Za-z_]+\]$/.test(p) ? (
          <mark key={i} className="rounded bg-amber-100 px-1 font-semibold text-amber-800">
            {p}
          </mark>
        ) : (
          p
        )
      )}
    </pre>
  );
}

export default function WhatsApp() {
  const [score, setScore] = useState(5);
  const [chat, setChat] = useState([WELCOME]);
  const chatRef = useRef(null);
  const [vars, setVars] = useState({ nombre: '', mes: '', tel: '' });
  const current = leadScores.find((s) => s.score === score);
  const filled = current.template
    .replaceAll('[Nombre]', vars.nombre.trim() || '[Nombre]')
    .replaceAll('[MES_ULTIMO_PAGO]', vars.mes.trim() || '[MES_ULTIMO_PAGO]');
  const pending = (filled.match(PLACEHOLDER_RE) || []).length;
  const waLink = `https://wa.me/${toWaNumber(vars.tel)}?text=${encodeURIComponent(filled)}`;

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [chat]);

  const send = (sc) => {
    setChat((c) => [...c, { from: 'me', text: sc.key, time: now() }]);
    setTimeout(() => setChat((c) => [...c, { from: 'club', text: sc.text, time: now() }]), 350);
  };

  return (
    <div className="space-y-8">
      <PageHero
        chip="Documento oficial en templates"
        title="Campaña de recuperación de ex-socios (WhatsApp directo 1 a 1)"
        aside={
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={LINKS.pdfExSocios} target="_blank" rel="noreferrer" className="btn-gold">
              <FileText className="h-4 w-4 text-red-700" /> Abrir PDF (8 págs)
            </a>
            <a href={LINKS.formExSocios} className="btn-ghost">
              <ClipboardCheck className="h-4 w-4 text-gold-400" /> Formulario ex-socios
            </a>
          </div>
        }
      >
        Manual operativo con diagnóstico de motivos de baja, segmentación A/B/C/D, secuencias de mensajes Día 1, Día 3 y Día 10,
        flujo diario y matriz de objeciones.
      </PageHero>

      <div className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-5">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-700" />
        <div className="space-y-1.5 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-extrabold text-red-800">Regla de oro anti-ban (Meta WhatsApp 2026)</span>
            <span className="rounded-md bg-red-100 px-2 py-0.5 font-mono text-xs font-semibold text-red-800">
              Máx 10 msg/hora · 40/día por línea
            </span>
          </div>
          <p className="leading-relaxed text-red-950/80">
            Contacto 1 a 1 artesanal, <strong>no broadcast frío</strong>. Cada mensaje incluye nombre de pila, dato contextual
            real y link de pago web (<code>aldosivi.com.ar/socio</code>). Enviar en lotes de 5 para evitar detección automática.
          </p>
        </div>
      </div>

      <section className="card space-y-6 p-6 sm:p-8">
        <SectionTitle
          icon={Star}
          title="Scoring de prioridad (1 a 5) y plantillas 1 a 1"
          subtitle="Elegí un nivel de prioridad para cargar el script personalizado y copiarlo con un clic."
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {leadScores.map((s) => {
            const on = s.score === score;
            return (
              <button
                key={s.score}
                onClick={() => setScore(s.score)}
                aria-pressed={on}
                className={`space-y-1 rounded-xl border-2 p-3.5 text-left transition ${
                  on
                    ? 'border-gold-400 bg-brand-800 text-white shadow-md'
                    : 'border-transparent bg-slate-50 text-slate-700 hover:border-brand-100 hover:bg-brand-50'
                } ${s.score === 1 ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className={`font-display text-sm font-black ${on ? 'text-white' : 'text-ink'}`}>SCORE {s.score}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                      on ? 'bg-gold-400 text-brand-900' : 'bg-brand-100 text-ink-2'
                    }`}
                  >
                    {s.sla}
                  </span>
                </div>
                <div className={`text-sm font-bold ${on ? 'text-gold-400' : 'text-slate-900'}`}>{s.label}</div>
                <div className={`text-[11px] ${on ? 'text-emerald-100' : 'text-slate-500'}`}>{s.sub}</div>
              </button>
            );
          })}
        </div>

        <div key={score} className="animate-fade-up space-y-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
          <div>
            <div className="font-display font-bold text-ink">{current.title}</div>
            <div className="text-sm text-slate-600">{current.desc}</div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Nombre de pila" value={vars.nombre} onChange={(v) => setVars({ ...vars, nombre: v })} placeholder="Ej: Martín" />
            <Field
              label="Mes último pago"
              value={vars.mes}
              onChange={(v) => setVars({ ...vars, mes: v })}
              placeholder="Ej: agosto"
              disabled={!current.template.includes('[MES_ULTIMO_PAGO]')}
            />
            <Field
              label="Celular (opcional)"
              value={vars.tel}
              onChange={(v) => setVars({ ...vars, tel: v.replace(/[^\d+ ]/g, '') })}
              placeholder="Ej: 223 555 1234"
              inputMode="tel"
            />
          </div>

          <TemplatePreview text={filled} />

          <div className="flex flex-wrap items-center gap-2">
            <CopyButton text={filled} label="Copiar mensaje" />
            <a href={waLink} target="_blank" rel="noreferrer" className="btn !bg-[#0f7a6d] !py-2 !text-xs text-white hover:!bg-[#0c6359]">
              <MessageCircle className="h-4 w-4" /> Abrir en WhatsApp
            </a>
            {pending > 0 && (
              <span className="text-xs font-medium text-amber-700">
                {pending} dato{pending > 1 ? 's' : ''} sin completar
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3">
          <div className="text-xs font-extrabold uppercase tracking-wider text-ink">Atajos rápidos WhatsApp Business</div>
          {shortcuts.map((sc) => (
            <button
              key={sc.key}
              onClick={() => send(sc)}
              className="card flex w-full items-center justify-between gap-3 p-3.5 text-left transition hover:border-brand-100 hover:bg-brand-50"
            >
              <div>
                <div className="font-mono text-sm font-bold text-ink-2">{sc.key}</div>
                <div className="text-xs text-slate-500">{sc.hint}</div>
              </div>
              <Send className="h-4 w-4 shrink-0 text-ink-3" />
            </button>
          ))}
        </div>

        <section className="card flex flex-col overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between bg-brand-800 px-5 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <MessageCircle className="h-5 w-5 text-gold-400" />
              </div>
              <div>
                <div className="text-sm font-bold">Aldosivi Socios · Oficial</div>
                <div className="text-[11px] text-emerald-200">en línea · respuesta artesanal 1 a 1</div>
              </div>
            </div>
            <button
              onClick={() => setChat([WELCOME])}
              className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-semibold hover:bg-white/20"
            >
              <Trash2 className="h-3.5 w-3.5" /> Limpiar
            </button>
          </div>
          <div
            ref={chatRef}
            className="h-80 space-y-3 overflow-y-auto bg-[#efeae2] p-4 dark:bg-[#0b141a]"
            style={{ backgroundImage: 'radial-gradient(rgba(20,83,45,0.06) 1px, transparent 1px)', backgroundSize: '16px 16px' }}
          >
            {chat.map((m, i) => (
              <div
                key={i}
                className={`animate-fade-up max-w-[85%] rounded-xl px-3.5 py-2 text-sm shadow-sm ${
                  m.from === 'me'
                    ? 'ml-auto rounded-tr-none bg-[#d9fdd3] font-mono font-bold text-brand-900 dark:bg-[#005c4b] dark:text-white'
                    : 'rounded-tl-none bg-surface text-slate-800 dark:bg-[#202c33]'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>
                <div className="mt-1 text-right text-[10px] font-normal text-slate-500">{m.time}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
