import { useEffect, useState } from 'react';
import { BarChart3, ClipboardList, Film, Gauge, Megaphone, MessageCircle, Target } from 'lucide-react';
import Header from './components/Header.jsx';
import DocsBar from './components/DocsBar.jsx';
import Footer from './components/Footer.jsx';
import { BackToTop, PrevNext } from './components/PageNav.jsx';
import Diagnostico from './tabs/Diagnostico.jsx';
import Kpis from './tabs/Kpis.jsx';
import Encuestas from './tabs/Encuestas.jsx';
import WhatsApp from './tabs/WhatsApp.jsx';
import Plan from './tabs/Plan.jsx';
import Video from './tabs/Video.jsx';
import Prensa from './tabs/Prensa.jsx';
import FormPage from './forms/FormPage.jsx';
import { forms } from './data/forms.js';

const TABS = [
  { id: 'diagnostico', label: 'Diagnóstico & ROI', icon: BarChart3, Component: Diagnostico },
  { id: 'kpi', label: 'KPI Dashboard', icon: Gauge, Component: Kpis },
  { id: 'encuestas', label: 'Encuestas & Paradoja', icon: ClipboardList, Component: Encuestas },
  { id: 'whatsapp', label: 'WhatsApp 1 a 1', icon: MessageCircle, Component: WhatsApp },
  { id: 'plan', label: 'Plan & Meta 10.000', icon: Target, Component: Plan },
  { id: 'video', label: 'Guiones Video', icon: Film, Component: Video },
  { id: 'prensa', label: 'Prensa & Redes', icon: Megaphone, Component: Prensa },
];

/** "#kpi" → { tab: 'kpi' }, "#formulario/ex-socios" → { form: 'ex-socios' } */
const parseHash = () => {
  const h = window.location.hash.replace(/^#\/?/, '');
  const m = h.match(/^formulario\/([\w-]+)$/);
  if (m && forms.some((f) => f.slug === m[1])) return { form: m[1] };
  return { tab: TABS.some((t) => t.id === h) ? h : TABS[0].id };
};

export default function App() {
  const [route, setRoute] = useState(parseHash);

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const f = route.form && forms.find((x) => x.slug === route.form);
    document.title = f
      ? `Formulario ${f.n}: ${f.shortName} — Club Atlético Aldosivi`
      : 'Centro Estratégico de Socios — Club Atlético Aldosivi';
  }, [route]);

  if (route.form) return <FormPage key={route.form} slug={route.form} />;

  const active = route.tab;
  const go = (id) => {
    if (id !== active) {
      window.location.hash = id;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const { Component } = TABS.find((t) => t.id === active);

  return (
    <div className="flex min-h-screen flex-col">
      <Header tabs={TABS} active={active} onChange={go} />
      <DocsBar />
      <main key={active} className="mx-auto w-full max-w-7xl flex-grow animate-fade-up px-4 py-8 sm:px-6 lg:px-8">
        <Component />
        <PrevNext tabs={TABS} active={active} onChange={go} />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
