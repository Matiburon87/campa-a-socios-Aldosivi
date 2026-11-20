import { useEffect, useRef, useState } from 'react';
import { ClipboardCheck, FileText, MessageCircle, Send, ShieldAlert, Star, Trash2 } from 'lucide-react';
import { CopyButton, PageHero, SectionTitle, TextBlock } from '../components/ui.jsx';
import { LINKS, leadScores, shortcuts } from '../data/content.js';

const WELCOME = {
  from: 'club',
  text: '👋 ¡Hola! Elegí un atajo para previsualizar cómo reciben la información los socios y simpatizantes por WhatsApp.',
  time: '10:00',
};

const now = () => new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

export default function WhatsApp() {
  const [score, setScore] = useState(5);
  const [chat, setChat] = useState([WELCOME]);
  const chatRef = useRef(null);
  const current = leadScores.find((s) => s.score === score);

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
            <a href={LINKS.formExSocios} target="_blank" rel="noreferrer" className="btn-ghost">
              <ClipboardCheck className="h-4 w-4 text-gold-400" /> Formulario ex-socios
            </a>
          </div>
        }
      >
        Manual operativo con diagnóstico de motivos de baja, segmentación A/B/C/D, secuencias de mensajes Día 1, Día 3 y Día 10,
        flujo diario y matriz de objeciones.
      </PageHero>

      <div className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-5">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
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
                  <span className={`font-display text-sm font-black ${on ? 'text-white' : 'text-brand-900'}`}>SCORE {s.score}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                      on ? 'bg-gold-400 text-brand-900' : 'bg-brand-100 text-brand-800'
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="font-display font-bold text-brand-900">{current.title}</div>
              <div className="text-sm text-slate-600">{current.desc}</div>
            </div>
            <CopyButton text={current.template} label="Copiar mensaje" />
          </div>
          <TextBlock text={current.template} />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3">
          <div className="text-xs font-extrabold uppercase tracking-wider text-brand-900">Atajos rápidos WhatsApp Business</div>
          {shortcuts.map((sc) => (
            <button
              key={sc.key}
              onClick={() => send(sc)}
              className="card flex w-full items-center justify-between gap-3 p-3.5 text-left transition hover:border-brand-100 hover:bg-brand-50"
            >
              <div>
                <div className="font-mono text-sm font-bold text-brand-800">{sc.key}</div>
                <div className="text-xs text-slate-500">{sc.hint}</div>
              </div>
              <Send className="h-4 w-4 shrink-0 text-brand-700" />
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
            className="h-80 space-y-3 overflow-y-auto bg-[#efeae2] p-4"
            style={{ backgroundImage: 'radial-gradient(rgba(20,83,45,0.06) 1px, transparent 1px)', backgroundSize: '16px 16px' }}
          >
            {chat.map((m, i) => (
              <div
                key={i}
                className={`animate-fade-up max-w-[85%] rounded-xl px-3.5 py-2 text-sm shadow-sm ${
                  m.from === 'me'
                    ? 'ml-auto rounded-tr-none bg-[#d9fdd3] font-mono font-bold text-brand-900'
                    : 'rounded-tl-none bg-white text-slate-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>
                <div className="mt-1 text-right text-[10px] font-normal text-slate-400">{m.time}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
