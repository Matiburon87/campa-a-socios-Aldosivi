import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { scrollToTop } from './hooks.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { BackToTop, PrevNext } from './components/PageNav.jsx';
import { forms } from './data/forms.js';
import { SECTIONS, groupById, sectionById, sectionsOf } from './navigation.js';

const FormPage = Object.assign(
  lazy(() => import('./forms/FormPage.jsx')),
  { preload: () => import('./forms/FormPage.jsx') }
);

/** Prefetch every remaining chunk once the browser is idle, so later navigation is instant. */
function usePrefetchWhenIdle() {
  useEffect(() => {
    const run = () => [...SECTIONS.map((s) => s.Component), FormPage].forEach((c) => c.preload().catch(() => {}));
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(run, { timeout: 4000 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(run, 2500);
    return () => clearTimeout(id);
  }, []);
}

function SectionSkeleton() {
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

/** "#kpi" → { section: 'kpi' }, "#formulario/ex-socios" → { form: 'ex-socios' }, anything else → Inicio. */
const parseHash = () => {
  const h = window.location.hash.replace(/^#\/?/, '');
  const m = h.match(/^formulario\/([\w-]+)$/);
  if (m && forms.some((f) => f.slug === m[1])) return { form: m[1] };
  return { section: sectionById(h) ? h : SECTIONS[0].id };
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
    const s = route.section && sectionById(route.section);
    document.title = f
      ? `Formulario ${f.n}: ${f.shortName} — Club Atlético Aldosivi`
      : s && s.id !== 'inicio'
        ? `${s.label} — Centro Estratégico de Socios · Aldosivi`
        : 'Centro Estratégico de Socios — Club Atlético Aldosivi';
  }, [route]);

  // Last section visited in each area, so switching areas returns to where you were.
  const lastInGroup = useRef({});
  useEffect(() => {
    if (route.section) lastInGroup.current[sectionById(route.section).group] = route.section;
  }, [route.section]);

  // Accessibility: announce section changes and, when asked, move focus to the new content.
  const mainRef = useRef(null);
  const focusContentNext = useRef(false);
  const [announcement, setAnnouncement] = useState('');
  const firstRender = useRef(true);

  useEffect(() => {
    if (!route.section) return;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const s = sectionById(route.section);
    setAnnouncement(s.id === 'inicio' ? 'Inicio' : `${groupById(s.group).label}: ${s.label}`);
    if (focusContentNext.current) {
      focusContentNext.current = false;
      mainRef.current?.focus({ preventScroll: true });
    }
  }, [route.section]);

  if (route.form) {
    return (
      <Suspense fallback={<FormSkeleton />}>
        <FormPage key={route.form} slug={route.form} />
      </Suspense>
    );
  }

  const active = route.section;
  const go = (id, { focusContent = false } = {}) => {
    if (id !== active) {
      focusContentNext.current = focusContent;
      window.location.hash = id;
      scrollToTop();
    }
  };
  const goGroup = (groupId) => go(lastInGroup.current[groupId] ?? sectionsOf(groupId)[0].id);
  const preload = (id) => sectionById(id)?.Component.preload().catch(() => {});

  const skipToContent = (e) => {
    // A plain href="#…" would be taken as a route by the hash router, so focus the panel directly.
    e.preventDefault();
    mainRef.current?.focus();
  };

  const section = sectionById(active);
  const { Component } = section;

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenido"
        onClick={skipToContent}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-gold-400 focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-brand-900 focus:shadow-xl"
      >
        Saltar al contenido
      </a>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
      <Header active={active} onChange={go} onGroup={goGroup} onPreload={preload} />
      <main
        key={active}
        ref={mainRef}
        id="contenido"
        aria-label={section.label}
        tabIndex={-1}
        className="mx-auto w-full max-w-7xl flex-grow animate-fade-up scroll-mt-40 px-4 py-8 outline-none sm:px-6 lg:px-8"
      >
        <Suspense fallback={<SectionSkeleton />}>
          <Component onNavigate={go} />
        </Suspense>
        {active !== 'inicio' && <PrevNext active={active} onChange={go} />}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
