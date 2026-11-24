# Campaña de Socios — Club Atlético Aldosivi

Centro estratégico y dashboard de la campaña 2026-2027, hecho con **Vite + React + Tailwind CSS**.

## Desarrollo

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build   # genera dist/
npm run preview
```

## Estructura

- `src/App.jsx` — layout y navegación por pestañas (con `#hash` en la URL)
- `src/tabs/` — una pestaña por archivo (Diagnóstico, KPIs, Encuestas, WhatsApp, Plan, Video, Prensa)
- `src/data/content.js` — todos los textos, cifras y plantillas
- `src/components/` — header, footer, toasts y componentes de UI compartidos
- `src/data/forms.js` + `src/forms/FormPage.jsx` — los 4 formularios de encuesta, en `#formulario/<slug>`
- `public/` — escudo, PDF de ex-socios y redirecciones desde las URLs viejas `formulario-*.html`
- `estrategia/` — documentos de estrategia en Markdown
