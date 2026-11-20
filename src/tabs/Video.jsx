import { useState } from 'react';
import { Clapperboard, Clock, Mic, Music, Tv } from 'lucide-react';
import { PageHero, Segmented } from '../components/ui.jsx';
import { videoScripts } from '../data/content.js';

export default function Video() {
  const [id, setId] = useState(videoScripts[0].id);
  const s = videoScripts.find((v) => v.id === id);

  return (
    <div className="space-y-8">
      <PageHero chip="Producción audiovisual" title="Guiones técnicos: reels y manifiesto">
        Piezas enfocadas en pago web en 2 minutos, vida social en el Predio de Punta Mogotes y pertenencia.
      </PageHero>

      <section className="card space-y-6 p-6 sm:p-8">
        <Segmented value={id} onChange={setId} options={videoScripts.map((v) => ({ value: v.id, label: v.label }))} />

        <div key={id} className="animate-fade-up space-y-5">
          <div className="space-y-3 border-b border-slate-100 pb-4">
            <h3 className="font-display text-xl font-bold text-brand-900">{s.title}</h3>
            <div className="flex flex-wrap gap-2">
              <Meta icon={Tv}>{s.type}</Meta>
              <Meta icon={Clock}>{s.duration}</Meta>
              <Meta icon={Music}>{s.music}</Meta>
              <Meta icon={Mic}>{s.locutor}</Meta>
            </div>
          </div>

          <ol className="relative space-y-4 border-l-2 border-brand-100 pl-6">
            {s.scenes.map((sc) => (
              <li key={sc.time} className="relative">
                <span className="absolute -left-[33px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-brand-800 ring-2 ring-brand-100" />
                <span className="mb-2 inline-block rounded-md bg-brand-800 px-2 py-0.5 font-mono text-[11px] font-bold text-gold-400">
                  {sc.time}
                </span>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-700">
                    <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                      <Clapperboard className="h-3.5 w-3.5" /> Visual
                    </div>
                    {sc.visual}
                  </div>
                  <div className="rounded-xl border border-brand-100 bg-brand-50 p-3.5 text-sm text-brand-900">
                    <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-brand-600">
                      <Mic className="h-3.5 w-3.5" /> Locución
                    </div>
                    {sc.audio}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}

function Meta({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
      <Icon className="h-3.5 w-3.5" /> {children}
    </span>
  );
}
