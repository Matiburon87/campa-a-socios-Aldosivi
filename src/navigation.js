import { lazy } from 'react';
import { BarChart3, ClipboardList, Compass, Film, Gauge, House, Megaphone, MessageCircle, Target, Wrench } from 'lucide-react';

/**
 * Each section is its own chunk. `load` is kept so a section can be prefetched
 * (hover/focus on its button, or when the browser is idle) before it is opened.
 */
const lazySection = (load) => Object.assign(lazy(load), { preload: load });

/** Top-level areas. Sections are grouped by what the reader is trying to do. */
export const GROUPS = [
  { id: 'inicio', label: 'Inicio', icon: House, blurb: 'Resumen de la campaña y accesos rápidos.' },
  {
    id: 'estrategia',
    label: 'Estrategia',
    icon: Compass,
    blurb: 'Dónde estamos, a dónde vamos y cómo lo medimos.',
  },
  {
    id: 'operacion',
    label: 'Operación',
    icon: Wrench,
    blurb: 'Herramientas para el contacto diario con socios.',
  },
  {
    id: 'comunicacion',
    label: 'Comunicación',
    icon: Megaphone,
    blurb: 'Material listo para producir y publicar.',
  },
];

/** Flat, ordered list of sections. Ids are the URL hash, kept stable so old links keep working. */
export const SECTIONS = [
  {
    id: 'inicio',
    group: 'inicio',
    label: 'Inicio',
    icon: House,
    desc: 'Resumen de la campaña y accesos rápidos.',
    Component: lazySection(() => import('./tabs/Inicio.jsx')),
  },
  {
    id: 'diagnostico',
    group: 'estrategia',
    label: 'Diagnóstico & ROI',
    icon: BarChart3,
    desc: 'Situación de la mora, problemas detectados y simulador de recuperación.',
    Component: lazySection(() => import('./tabs/Diagnostico.jsx')),
  },
  {
    id: 'plan',
    group: 'estrategia',
    label: 'Plan & Meta 10.000',
    icon: Target,
    desc: 'Los 4 frentes, el equipo mínimo y el presupuesto a 6 meses.',
    Component: lazySection(() => import('./tabs/Plan.jsx')),
  },
  {
    id: 'kpi',
    group: 'estrategia',
    label: 'Tablero de KPIs',
    icon: Gauge,
    desc: 'Indicadores, umbrales de alerta y columnas de la planilla maestra.',
    Component: lazySection(() => import('./tabs/Kpis.jsx')),
  },
  {
    id: 'encuestas',
    group: 'operacion',
    label: 'Formularios',
    icon: ClipboardList,
    desc: 'Los 4 formularios de sondeo, sus borradores y cómo leer los resultados.',
    Component: lazySection(() => import('./tabs/Encuestas.jsx')),
  },
  {
    id: 'whatsapp',
    group: 'operacion',
    label: 'WhatsApp 1 a 1',
    icon: MessageCircle,
    desc: 'Mensajes por prioridad listos para enviar, reglas anti-ban y atajos.',
    Component: lazySection(() => import('./tabs/WhatsApp.jsx')),
  },
  {
    id: 'video',
    group: 'comunicacion',
    label: 'Guiones de video',
    icon: Film,
    desc: 'Reels y manifiesto, escena por escena.',
    Component: lazySection(() => import('./tabs/Video.jsx')),
  },
  {
    id: 'prensa',
    group: 'comunicacion',
    label: 'Prensa & Redes',
    icon: Megaphone,
    desc: 'Copys para redes y gacetilla de prensa listos para copiar.',
    Component: lazySection(() => import('./tabs/Prensa.jsx')),
  },
];

export const sectionById = (id) => SECTIONS.find((s) => s.id === id);
export const groupById = (id) => GROUPS.find((g) => g.id === id);
export const sectionsOf = (groupId) => SECTIONS.filter((s) => s.group === groupId);
