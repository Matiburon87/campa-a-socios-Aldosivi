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

const TABS = [
  { id: 'diagnostico', label: 'Diagnóstico & ROI', icon: BarChart3, Component: Diagnostico },
  { id: 'kpi', label: 'KPI Dashboard', icon: Gauge, Component: Kpis },
  { id: 'encuestas', label: 'Encuestas & Paradoja', icon: ClipboardList, Component: Encuestas },
  { id: 'whatsapp', label: 'WhatsApp 1 a 1', icon: MessageCircle, Component: WhatsApp },
  { id: 'plan', label: 'Plan & Meta 10.000', icon: Target, Component: Plan },
  { id: 'video', label: 'Guiones Video', icon: Film, Component: Video },
  { id: 'prensa', label: 'Prensa & Redes', icon: Megaphone, Component: Prensa },
];

const fromHash = () => {
  const id = window.location.hash.replace('#', '');
  return TABS.some((t) => t.id === id) ? id : TABS[0].id;
};

export default function App() {
  const [active, setActive] = useState(fromHash);

  useEffect(() => {
    const onHash = () => setActive(fromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

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
