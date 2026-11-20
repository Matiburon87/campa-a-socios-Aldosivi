import { FileText, FolderOpen } from 'lucide-react';
import { forms, LINKS } from '../data/content.js';

const shortNames = { 1: 'Socios Activos', 2: 'Leads / No-Socios', 3: 'Ex-Socios', 4: 'Regularización Deudores' };

export default function DocsBar() {
  return (
    <div className="border-b border-slate-200 bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 text-xs sm:px-6 lg:px-8">
        <span className="flex items-center gap-1.5 font-bold text-ink-2">
          <FolderOpen className="h-4 w-4" /> Formularios
        </span>
        <div className="flex flex-wrap gap-1.5">
          {forms.map((f) => (
            <a
              key={f.n}
              href={f.href}
              className="rounded-md border border-slate-200 bg-surface px-2.5 py-1 font-semibold text-ink-2 transition hover:border-brand-800 hover:bg-brand-800 hover:text-white"
            >
              {f.n}. {shortNames[f.n]}
            </a>
          ))}
          <a
            href={LINKS.pdfExSocios}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md bg-brand-800 px-2.5 py-1 font-bold text-gold-400 transition hover:bg-brand-700"
          >
            <FileText className="h-3.5 w-3.5" /> Manual PDF
          </a>
        </div>
      </div>
    </div>
  );
}
