export const LINKS = {
  pdfExSocios: 'templates/campana_recuperacion_ex_socios_aldosivi.pdf',
  formActivos: '#formulario/socios-activos',
  formLeads: '#formulario/leads-potenciales',
  formExSocios: '#formulario/ex-socios',
  formDeudores: '#formulario/deudores-regularizacion',
};

export const CUOTA = 38000;
export const SOCIOS_MORA = 1200;
export const INVERSION = 950000;
export const SOCIOS_ACTUALES = 5100;
export const META_CD = 10000;

/** Target share of members in arrears that adopt automatic debit (%), and what it yields. */
export const META_ADHESION = 50;
export const META_RECUPERO = Math.round((SOCIOS_MORA * META_ADHESION) / 100);
export const RECUPERO_MENSUAL = META_RECUPERO * CUOTA;

/** 22800000 → "$22,8M". */
export const millones = (n) => `$${(n / 1e6).toLocaleString('es-AR', { maximumFractionDigits: 1 })}M`;

export const headlineStats = [
  { label: 'Socios activos', value: '5.100', tone: 'white' },
  { label: 'Mora (1-5 meses)', value: '1.200', tone: 'gold' },
  { label: 'Meta campaña', value: '1.100', tone: 'gold' },
  { label: 'Meta CD', value: '10.000', tone: 'mint' },
];

export const problems = [
  ['Dependencia del pago presencial', 'Muchos socios creían que solo podían abonar yendo físicamente en horario comercial.'],
  ['Baja adhesión al débito automático', 'Menos del 25% del padrón estaba adherido a débito automático, generando mora por simple olvido.'],
  ['Falta de seguimiento 1 a 1', 'Al acumularse 2 o 3 cuotas sin pagar, no existía un contacto cercano con facilidades de pago web.'],
];

export const solutions = [
  ['Medios de pago 100% web (aldosivi.com/socio)', 'Alta, renovación y pago online en 2 minutos desde el celular con carné digital inmediato.'],
  ['Atención en Predio Punta Mogotes y Tienda calle Olavarría', 'Puntos estratégicos de cercanía para el hincha marplatense.'],
  ['Incentivo débito automático ($38.000/mes)', 'Primer mes bonificado y ahorro anual de $108.000 frente al pago manual.'],
];

export const kpis = [
  { name: 'Socios nuevos totales', formula: '=SOCIOS!B:B (Web + Predio + Tienda Olavarría)', goal: '1.100 socios', alert: '< 150 / mes' },
  { name: 'Leads totales captados', formula: '=LEADS!B:B', goal: '3.000 leads', alert: '< 400 / mes' },
  { name: 'Conversión lead → socio', formula: 'Socios Nuevos / Leads Totales', goal: '37%', alert: '< 25%' },
  { name: '% Adhesión débito automático', formula: 'COUNTIF(SOCIOS!F:F,"Débito")/COUNT(A:A)', goal: '75%', alert: '< 60%' },
  { name: 'CPA (costo por adquisición)', formula: 'PRESUPUESTO!Total_Gastado / Socios_Nuevos', goal: '< $8.000 ARS', alert: '> $12.000 ARS' },
  { name: 'Ex-socios recuperados', formula: 'COUNTIF(WHATSAPP_1A1!G:G,"Ex-socio")', goal: '300 reactivados', alert: '< 50 / mes' },
  { name: 'NPS satisfacción del socio', formula: 'PROMEDIO(SONDAJE_ACTIVOS!O:O)', goal: '> 50 puntos', alert: '< 30 puntos' },
];

export const sheetTabs = {
  leads: {
    label: '📈 LEADS',
    title: 'Pestaña 2: LEADS (Funnel Diario)',
    desc: 'Seguimiento de cada contacto desde Web, QR en Predio Punta Mogotes, QR en Tienda Olavarría y Redes.',
    columns: ['Fecha', 'ID Lead', 'Origen (Web / QR Predio / QR Tienda Olavarría / WA)', 'Nombre', 'Teléfono', 'Zona MDP', 'Categoría', 'Click Pago Web', 'Pago OK', 'Alta Confirmada', 'Responsable'],
  },
  socios: {
    label: '👥 SOCIOS',
    title: 'Pestaña 3: SOCIOS (Padrón Activo)',
    desc: 'Control de medios de pago web, débito automático y retención.',
    columns: ['N° Socio', 'Fecha Alta', 'Nombre', 'Categoría', 'Canal Pago (Web Online / Débito / Predio / Tienda Olavarría)', 'Estado', 'Meses Mora', 'Ex-Socio Reactivado'],
  },
  wa1a1: {
    label: '📲 WHATSAPP 1 A 1',
    title: 'Pestaña 10: WHATSAPP 1 A 1 (Recuperación Ex-Socios y Mora)',
    desc: 'Columnas A-R según manual PDF de Recuperación de Ex-Socios.',
    columns: ['[A] Fecha contacto', '[B] Nombre', '[C] Teléfono', '[D] N° socio ant.', '[E] Segmento (A/B/C/D)', '[F] Motivo baja', '[G] Antigüedad', '[H] Última cuota', '[I] Mensaje enviado', '[K] Respuesta (Positiva/Neutral/Negativa)', '[N] Resultado'],
  },
  sondaje: {
    label: '🎲 SONDAJE',
    title: 'Pestaña 11: SONDAJE (4 Formularios de Encuesta)',
    desc: 'Consolidación de respuestas de los 4 formularios oficiales.',
    columns: ['Fecha', 'Formulario (#1 Activos / #2 Leads / #3 Ex-Socios / #4 Deudores)', 'Nombre', 'Barrio', 'NPS (0-10)', 'Barrera Principal', 'Medio Pago Preferido (Web/Predio/Tienda)', 'Acción Derivada'],
  },
  presupuesto: {
    label: '💰 PRESUPUESTO',
    title: 'Pestaña 4: PRESUPUESTO ($950.000 Total 6 Meses)',
    desc: 'Control de inversión y retorno (CPA meta < $8.000).',
    columns: ['Mes', 'Rubro', 'Presupuesto Planeado', 'Ejecutado Real', 'Desvío', 'Socios Recuperados/Nuevos', 'CPA Real'],
  },
  config: {
    label: '⚙️ CONFIG',
    title: 'Pestaña 12: CONFIG (Parámetros Institucionales)',
    desc: 'Valores de cuota, puntos de atención y reglas anti-ban.',
    columns: ['Cuota Débito Web: $38.000', 'Familiar: $34.200', 'Cadete: $27.000', 'Jubilado: $22.000', 'Puntos: Web Online / Predio Punta Mogotes / Tienda Calle Olavarría'],
  },
};

export const forms = [
  {
    n: 1,
    badge: '13 preguntas + escala NPS',
    title: 'Encuesta para Socios Activos',
    desc: 'Evalúa antigüedad, frecuencia de asistencia al Minella y al Predio de Punta Mogotes, uso real de beneficios, percepción de la cuota, canales de comunicación y cálculo del NPS (0 a 10).',
    href: LINKS.formActivos,
    accent: 'brand',
  },
  {
    n: 2,
    badge: '12 preguntas de captación',
    title: 'Encuesta para Leads Potenciales y No-Socios',
    desc: 'Releva edad, barrio en Mar del Plata, barreras de entrada ("no sabía que se paga por web", "precio"), disposición de pago mensual, disparador de alta y preferencia entre Web, Predio o Tienda Olavarría.',
    href: LINKS.formLeads,
    accent: 'brand',
  },
  {
    n: 3,
    badge: 'Segmentos A, B y C',
    title: 'Encuesta de Recuperación de Ex-Socios',
    desc: 'Diseñada en conjunto con el PDF de Recuperación de Ex-Socios: identifica el motivo puntual de la baja (económico, mudanza, poco uso) y ofrece las promos "Volvé a ser parte", "Extrañamos tu bandera" y "Volvé sin riesgo".',
    href: LINKS.formExSocios,
    pdf: LINKS.pdfExSocios,
    accent: 'gold',
  },
  {
    n: 4,
    badge: 'Mora 1 a 5 meses (1.200 socios)',
    title: 'Regularización y Medios de Pago Web',
    desc: 'Permite al socio con cuotas pendientes adherirse al débito automático web ($38.000 con 1er mes gratis) o solicitar un plan de facilidades en cuotas sin perder su antigüedad ni su número de socio.',
    href: LINKS.formDeudores,
    accent: 'brand',
  },
];

export const paradoxBlocks = [
  {
    icon: 'users',
    title: 'Bloque 1 · Fidelización y uso',
    finding: 'Socios de más de 5 años abonan su cuota pero desconocen los descuentos comerciales.',
    action: 'Enviar catálogo digital por WhatsApp e invitación a eventos en el Predio Deportivo de Punta Mogotes.',
  },
  {
    icon: 'scale',
    title: 'Bloque 2 · La paradoja del precio',
    finding: 'El hincha percibe la cuota como cara pero gasta más comprando entradas sueltas por partido.',
    action: 'Demostrar que el débito web ($38.000) ahorra $108.000/año + 1er mes gratis + recupero en comercios.',
  },
  {
    icon: 'globe',
    title: 'Bloque 3 · Canales sin fricción',
    finding: 'El 38% no se asociaba pensando que debía hacer trámites presenciales engorrosos.',
    action: 'Comunicar que hoy el pago es 100% online por web, o presencial en Predio Punta Mogotes y Tienda calle Olavarría.',
  },
];

export const leadScores = [
  {
    score: 5,
    label: 'Lead caliente',
    sub: 'Inició trámite web',
    sla: '< 10 min',
    title: 'SCORE 5: Lead caliente (SLA: inmediato < 10 minutos)',
    desc: 'El usuario inició el trámite en la web o consultó cómo pagar.',
    template:
      '¡Hola [Nombre]! 🦈 Vimos que empezaste tu trámite de socio y te faltó el último paso.\n\nRecordá que podés abonar 100% online por medios web en 1 minuto con débito automático ($38.000/mes) y tenés el PRIMER MES GRATIS: aldosivi.com/socio 👈\n\nSi preferís hacerlo presencial, te esperamos en el Predio Deportivo de Punta Mogotes o en la Tienda de calle Olavarría.',
  },
  {
    score: 4,
    label: 'Socio inactivo',
    sub: 'Segmento D (>3m sin pago)',
    sla: '< 1 hora',
    title: 'SCORE 4: Socio inactivo >3m sin pago (Segmento D — SLA < 1 hora)',
    desc: 'Socio con mora que aún no fue dado de baja del padrón.',
    template:
      'Hola [Nombre]! 🦈\nTe escribimos porque vimos que tu cuota está pendiente desde [MES_ULTIMO_PAGO]. Sabemos que a veces se complica.\n\nHoy ya podés ponerte al día por medios web desde el celular con nuestra propuesta "Te acompañamos":\n- Débito automático $38.000/mes (19% off)\n- Primer mes GRATIS (en el 2do débito)\n- Facilidades de pago sin perder tu antigüedad\n\nEscribime "ACTUALIZAR" y te paso el link directo.',
  },
  {
    score: 3,
    label: 'Ex-socio reciente',
    sub: 'Segmento A (<6 meses)',
    sla: '< 4 horas',
    title: 'SCORE 3: Ex-socio baja reciente <6 meses (Segmento A — SLA < 4 horas)',
    desc: 'Aún tiene fresco el vínculo con el club. Objetivo: reactivación rápida.',
    template:
      'Hola [Nombre]! 🦈\nTe escribimos porque te extrañamos en la tribuna.\nTu carné de socio sigue registrado y queremos que vuelvas con la promo "Volvé a ser parte":\n- 50% OFF en cuota de reactivación\n- Primer mes GRATIS con débito automático web ($38.000/mes)\n- Carné digital activo en 2 minutos\n\nEscribinos por acá o acercate al Predio de Punta Mogotes o la Tienda de calle Olavarría.',
  },
  {
    score: 2,
    label: 'Ex-socio media',
    sub: 'Segmento B (6-18 meses)',
    sla: '< 24 horas',
    title: 'SCORE 2: Ex-socio baja media 6-18 meses (Segmento B — SLA < 24 horas)',
    desc: 'Se desenganchó de la rutina. Objetivo: reconexión emocional + nuevos canales.',
    template:
      'Hola [Nombre]! 🦈\nMucho cambió desde que te fuiste. Ahora ser socio del Tiburón es mucho más fácil:\n- Pago y gestión 100% online por medios web en 2 minutos\n- Atención en Predio Deportivo Punta Mogotes y Tienda calle Olavarría\n- Débito auto $38.000/mes (ahorrás $108k/año) + 20 descuentos en MDP\n\n¿Te animás a probar el primer mes gratis? Respondé este mensaje y te pasamos el link.',
  },
  {
    score: 1,
    label: 'Baja antigua',
    sub: 'Segmento C (>18 meses)',
    sla: '< 48 horas',
    title: 'SCORE 1: Ex-socio baja antigua >18 meses (Segmento C — SLA < 48 horas)',
    desc: 'Desconocimiento de la oferta actual. Promo "Volvé sin riesgo".',
    template:
      'Hola [Nombre]! 🦈\nTe escribimos porque sabemos que llevás a Aldosivi en el corazón.\nQueremos invitarte a probar el club hoy sin compromiso con la promo "Volvé sin riesgo":\n- Primer mes GRATIS con acceso a eventos en el Predio de Punta Mogotes y descuentos en MDP.\n- Todo digital desde la web o en nuestra Tienda de calle Olavarría.\n\nEscribime "PROBAR" y te activamos el pase.',
  },
];

export const shortcuts = [
  {
    key: '/alta',
    hint: 'Alta web en 2 min + Predio y Tienda Olavarría',
    text: '¡Hola! 🦈 Asociarte a Aldosivi toma 2 minutos y podés pagar 100% online por medios web:\n👉 aldosivi.com/socio\n\nTambién podés acercarte al Predio Deportivo de Punta Mogotes o a la Tienda Oficial de calle Olavarría.\n🎁 Con débito auto ($38.000/mes) tenés el PRIMER MES GRATIS.',
  },
  {
    key: '/precios',
    hint: 'Categorías en débito auto + 1er mes gratis',
    text: 'Valores vigentes con Débito Automático Web:\n\n🦈 Socio Activo: $38.000/mes (Ahorrás $108k/año)\n🦈 Pack Familiar: $34.200 c/u (10% OFF)\n🦈 Cadete: $27.000/mes\n🦈 Jubilado: $22.000/mes\n\n🎁 Primer mes GRATIS adhiriendo antes del 31/10.',
  },
  {
    key: '/deudores',
    hint: 'Regularización online o en Predio/Tienda',
    text: '¡Hola [Nombre]! 🦈 Vimos que tenés cuotas pendientes. Hoy podés regularizar 100% online por medios web sin moverte de tu casa, o en el Predio de Punta Mogotes / Tienda calle Olavarría.\n\nAdhiriendo a débito auto ($38k) tenés el primer mes GRATIS y plan de facilidades. Escribime ACTUALIZAR.',
  },
  {
    key: '/ubicacion',
    hint: 'Web 24hs, Predio Punta Mogotes y Tienda Olavarría',
    text: '📍 Canales Oficiales de Atención y Pago:\n\n🌐 100% Online Web (24 hs): aldosivi.com/socio\n🏟️ Predio Deportivo de Punta Mogotes\n🛍️ Tienda Oficial: Calle Olavarría, Mar del Plata',
  },
];

export const fronts = [
  { title: 'Recuperación mora', goal: 600, desc: 'WhatsApp 1 a 1 + adhesión a débito automático web.', cpa: '~$1.200 (sin pauta)' },
  { title: 'Actividades Predio', goal: 500, desc: 'Asados, entrenamientos abiertos y visitas en Punta Mogotes.', cpa: '~$800' },
  { title: 'Ex-socios (PDF)', goal: 500, desc: 'Reenganche por segmentos A, B y C con 1er mes bonificado.', cpa: '~$1.000' },
  { title: 'Web & Tienda Olavarría', goal: 500, desc: 'Autogestión web 24/7 + QR en Tienda Oficial calle Olavarría.', cpa: '~$1.000' },
];

/** Socios sumados en 6 meses si se cumplen los 4 frentes. */
export const META_6M = fronts.reduce((a, f) => a + f.goal, 0);

export const team = [
  ['Coordinador/a general', 'Estrategia, CD, KPIs', '15-20 h/sem'],
  ['Comunicador/a digital', 'Reels, TikTok, Web', '20 h/sem'],
  ['Admin datos & pagos web', 'WhatsApp 1a1, Padrón', '15-20 h/sem'],
  ['Operador Predio & Tienda', 'Punta Mogotes y Olavarría', '10 h/sem'],
  ['Voluntarios (6 a 8)', 'Rotativos con QR de alta web', '2-4 h c/u'],
];

export const budget = [
  ['Gráfica QR (Predio y Tienda Olavarría)', 130000, '-$120.000'],
  ['Pauta segmentada redes', 80000, '-$120.000'],
  ['Merchandising & kits bienvenida', 100000, '-$80.000'],
  ['Viáticos voluntarios & producción', 140000, '-$40.000'],
  ['Actividades sociales + contingencia', 400000, '-$43.500'],
];

export const videoScripts = [
  {
    id: 'reel-a',
    label: 'Reel A · ¿Por qué no sos socio?',
    title: 'Reel A — "¿Por qué todavía no sos socio?" (Pago web en 2 minutos)',
    type: 'Instagram Reel / TikTok',
    duration: '60 segundos',
    music: 'Urbano / dinámico',
    locutor: 'Voz joven marplatense',
    scenes: [
      { time: '0:00-0:10', visual: 'Popular de Aldosivi llena en el Minella. Texto: "¿TODAVÍA NO SOS SOCIO?"', audio: '"Dos entradas sueltas por mes te salen más caras que ser socio activo todo el mes."' },
      { time: '0:10-0:30', visual: 'Celular mostrando el alta online en aldosivi.com/socio sin moverse de casa.', audio: '"Ya no tenés que moverte de tu casa: hoy pagás por medios web en 2 minutos, o pasás por el Predio de Punta Mogotes o la Tienda de calle Olavarría."' },
      { time: '0:30-0:60', visual: 'Carné digital en pantalla + comercios adheridos.', audio: '"Adherite al débito automático por $38.000 y tenés el primer mes GRATIS. Aldosivi sos vos."' },
    ],
  },
  {
    id: 'reel-b',
    label: 'Reel B · Tu cuota en el Predio',
    title: 'Reel B — "Tu cuota en el Predio Deportivo de Punta Mogotes"',
    type: 'Instagram Reel / TikTok',
    duration: '60 segundos',
    music: 'Acústico emotivo',
    locutor: 'Voz institucional cercana',
    scenes: [
      { time: '0:00-0:20', visual: 'Amanecer en el Predio Deportivo de Punta Mogotes con juveniles entrenando.', audio: '"Cada cuota que abonás por la web o en el Predio sostiene el futuro de nuestras inferiores en Punta Mogotes."' },
      { time: '0:20-0:60', visual: 'Escudo de Aldosivi y link aldosivi.com/socio.', audio: '"Con débito automático ahorrás $108.000 al año y hacés crecer al club. Sumate hoy."' },
    ],
  },
  {
    id: 'reel-c',
    label: 'Reel C · Volvé al Tiburón',
    title: 'Reel C — "Volvé a ser parte" (Recuperación de ex-socios)',
    type: 'Instagram Reel / TikTok',
    duration: '60 segundos',
    music: 'Rock épico',
    locutor: 'Socio histórico',
    scenes: [
      { time: '0:00-0:30', visual: 'Previa con amigos en el puerto y carné digital nuevo.', audio: '"Mucho cambió desde que te fuiste. Ahora reactivás tu carné 100% online por web o en la Tienda de Olavarría."' },
      { time: '0:30-0:60', visual: 'Tribuna festejando. Promo 50% OFF ingreso + 1er mes gratis.', audio: '"Te extrañamos en la tribuna. Volvé a ser parte del Tiburón."' },
    ],
  },
  {
    id: 'manifiesto',
    label: 'Video Manifiesto (3 min)',
    title: 'Video Manifiesto 3 minutos — "Aldosivi sos vos"',
    type: 'YouTube / Web / Prensa',
    duration: '3:00 minutos',
    music: 'Orquestal emotiva',
    locutor: 'Relator marplatense',
    scenes: [
      { time: '0:00-1:00', visual: 'El puerto, el mar y el Predio Deportivo de Punta Mogotes.', audio: '"Aldosivi es el orgullo de Mar del Plata. Es nuestro lugar en Punta Mogotes y en cada barrio."' },
      { time: '1:00-3:00', visual: 'Socios mostrando su carné digital en el celular y entrando a la cancha.', audio: '"Asociate en 2 minutos por la web, en el Predio o en la Tienda de calle Olavarría. Aldosivi sos vos."' },
    ],
  },
];

export const pressCopies = [
  {
    id: 'feed',
    title: 'Post feed (Instagram / Facebook)',
    text: `🦈 Sos del Tiburón. Hacete socio AHORA desde donde estés.

Ya no hace falta hacer filas: hoy te asociás y pagás 100% online por medios web en 2 MINUTOS:
🌐 Entrás a aldosivi.com/socio
💳 Adherís con tarjeta o débito automático
📱 Recibís tu carné digital al instante

¿Preferís atención presencial? Te esperamos en:
🏟️ Predio Deportivo de Punta Mogotes
🛍️ Tienda Oficial de la calle Olavarría

🎁 PROMO DÉBITO AUTOMÁTICO ($38.000/mes): Primer mes 100% GRATIS y ahorrás $108.000 al año.

Volvé a ser parte. Aldosivi sos vos. 🦈💚💛`,
  },
  {
    id: 'press',
    title: 'Gacetilla de prensa oficial',
    text: `COMUNICADO OFICIAL — CLUB ATLÉTICO ALDOSIVI

ALDOSIVI LANZA SU PLATAFORMA DE PAGO WEB Y CAMPAÑA DE SOCIOS 2026-2027

Mar del Plata — El Club Atlético Aldosivi presenta su nueva campaña integral de captación y recuperación de socios bajo el lema "Volvé a ser parte. Aldosivi sos vos".

A partir de ahora, los hinchas pueden asociarse, regularizar su situación y abonar sus cuotas 100% online por medios web en menos de dos minutos a través de aldosivi.com/socio, obteniendo su carné digital instantáneo. Asimismo, la atención presencial se brinda en el Predio Deportivo de Punta Mogotes y en la Tienda Oficial de la calle Olavarría.

Quienes se adhieran al débito automático ($38.000 mensuales) contarán con el primer mes 100% bonificado y acceso a más de 20 descuentos en comercios de Mar del Plata.`,
  },
];
