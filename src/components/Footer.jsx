import { Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="hero-gradient mt-16 border-t-4 border-gold-400 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <img src="escudo-aldosivi.png" alt="" className="h-10 w-10 object-contain" />
          <div>
            <div className="font-display text-sm font-bold">Club Atlético Aldosivi — Mar del Plata</div>
            <div className="text-xs text-emerald-200/80">
              Autogestión 24/7 en aldosivi.com/socio · Predio Deportivo Punta Mogotes · Tienda Oficial calle Olavarría
            </div>
          </div>
        </div>
        <span className="chip shrink-0 bg-gold-400 !px-4 !py-1.5 text-xs normal-case text-brand-900">
          <Code2 className="h-4 w-4" /> Creado por Maty_Asaro_Dev y Marcos Knudsen
        </span>
      </div>
    </footer>
  );
}
