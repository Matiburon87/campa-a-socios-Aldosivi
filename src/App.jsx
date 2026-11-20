import { Suspense, lazy, useEffect, useState } from 'react';
import { BarChart3, ClipboardList, Film, Gauge, Megaphone, MessageCircle, Target } from 'lucide-react';
import Header from './components/Header.jsx';
import DocsBar from './components/DocsBar.jsx';
import Footer from './components/Footer.jsx';
import { BackToTop, PrevNext } from './components/PageNav.jsx';
import { forms } from './data/forms.js';

/**
 * Each tab is its own chunk. `load` is kept so a tab can be prefetched
 * (hover/focus on its button, or when the browser is idle) before it is opened.
 */
const lazyTab = (load) => Object.assign(lazy(load), { preload: load });

const TABS = [
  { id: 'diagnostico', label: 'Diagnóstico & ROI', icon: BarChart3, Component: lazyTab(() => import('./tabs/Diagnostico.jsx')) },
  { id: 'kpi', label: 'KPI Dashboard', icon: Gauge, Component: lazyTab(() => import('./tabs/Kpis.jsx')) },
  { id: 'encuestas', label: 'Encuestas & Paradoja', icon: ClipboardList, Component: lazyTab(() => import('./tabs/Encuestas.jsx')) },
  { id: 'whatsapp', label: 'WhatsApp 1 a 1', icon: MessageCircle, Component: lazyTab(() => import('./tabs/WhatsApp.jsx')) },
  { id: 'plan', label: 'Plan & Meta 10.000', icon: Target, Component: lazyTab(() => import('./tabs/Plan.jsx')) },
  { id: 'video', label: 'Guiones Video', icon: Film, Component: lazyTab(() => import('./tabs/Video.jsx')) },
  { id: 'prensa', label: 'Prensa & Redes', icon: Megaphone, Component: lazyTab(() => import('./tabs/Prensa.jsx')) },
];

const FormPage = lazyTab(() => import('./forms/FormPage.jsx'));

/** Prefetch every remaining chunk once the browser is idle, so later navigation is instant. */
function usePrefetchWhenIdle() {
  useEffect(() => {
    const run = () => [...TABS.map((t) => t.Component), FormPage].forEach((c) => c.preload().catch(() => {}));
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(run, { timeout: 4000 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(run, 2500);
    return () => clearTimeout(id);
  }, []);
}

function TabSkeleton() {
  return (
    <div className="animate-pulse space-y-8" aria-busy="true" aria-label="Cargando sección">
      <div className="h-40 rounded-3xl bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-slate-200" />
        ))}
      </div>
      <div className="h-64 rounded-2xl bg-slate-200" />
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="min-h-screen bg-canvas" aria-busy="true" aria-label="Cargando formulario">
      <div className="h-14 bg-brand-900" />
      <div className="mx-auto my-8 max-w-[900px] animate-pulse space-y-4 px-4">
        <div className="h-48 rounded-2xl bg-slate-200" />
        <div className="h-24 rounded-xl bg-slate-200" />
        <div className="h-24 rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}

/** "#kpi" → { tab: 'kpi' }, "#formulario/ex-socios" → { form: 'ex-socios' } */
const parseHash = () => {
  const h = window.location.hash.replace(/^#\/?/, '');
  const m = h.match(/^formulario\/([\w-]+)$/);
  if (m && forms.some((f) => f.slug === m[1])) return { form: m[1] };
  return { tab: TABS.some((t) => t.id === h) ? h : TABS[0].id };
};

export default function App() {
  const [route, setRoute] = useState(parseHash);
  usePrefetchWhenIdle();

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

  if (route.form) {
    return (
      <Suspense fallback={<FormSkeleton />}>
        <FormPage key={route.form} slug={route.form} />
      </Suspense>
    );
  }

  const active = route.tab;
  const go = (id) => {
    if (id !== active) {
      window.location.hash = id;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const preload = (id) => TABS.find((t) => t.id === id)?.Component.preload().catch(() => {});

  const { Component } = TABS.find((t) => t.id === active);

  return (
    <div className="flex min-h-screen flex-col">
      <Header tabs={TABS} active={active} onChange={go} onPreload={preload} />
      <DocsBar />
      <main key={active} className="mx-auto w-full max-w-7xl flex-grow animate-fade-up px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={<TabSkeleton />}>
          <Component />
        </Suspense>
        <PrevNext tabs={TABS} active={active} onChange={go} />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
