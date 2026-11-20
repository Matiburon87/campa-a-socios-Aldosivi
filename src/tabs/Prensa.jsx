import { Megaphone } from 'lucide-react';
import { CopyButton, PageHero, TextBlock } from '../components/ui.jsx';
import { pressCopies } from '../data/content.js';

export default function Prensa() {
  return (
    <div className="space-y-8">
      <PageHero chip="Kit de prensa y redes" title="Copys oficiales para redes y gacetilla de prensa">
        Actualizado: medios web, Predio Punta Mogotes y Tienda Olavarría.
      </PageHero>

      <div className="grid gap-6 md:grid-cols-2">
        {pressCopies.map((c) => (
          <section key={c.id} className="card flex flex-col gap-4 p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-brand-900">
                <Megaphone className="h-4 w-4 text-brand-700" /> {c.title}
              </h3>
              <CopyButton text={c.text} />
            </div>
            <TextBlock text={c.text} className="max-h-96 flex-1 overflow-y-auto bg-slate-50" />
            <div className="flex justify-between text-xs text-slate-400">
              <span>{c.text.split(/\s+/).length} palabras</span>
              <span className={c.id === 'feed' && c.text.length > 2200 ? 'font-semibold text-red-600' : ''}>
                {c.text.length.toLocaleString('es-AR')} caracteres{c.id === 'feed' && ' · límite Instagram 2.200'}
              </span>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
