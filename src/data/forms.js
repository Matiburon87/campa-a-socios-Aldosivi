/**
 * The 4 official survey forms, as data.
 *
 * Question types:
 *  - single: one option (radio)          - multi: several options (checkbox)
 *  - text:   open answer (textarea)      - nps:   0-10 scale
 *  - offer:  single choice rendered as cards with a description
 * Options may use **bold** markup. `half: true` puts two consecutive questions side by side.
 * `tone`: 'mint' (highlighted), 'amber' / 'brand' (left accent border).
 * `defaults` lists option indexes pre-selected, as in the original printed forms.
 */
export const forms = [
  {
    slug: 'socios-activos',
    n: 1,
    chip: 'Formulario oficial #1',
    title: 'Encuesta de satisfacción y fidelización — Socios activos',
    subtitle: 'Módulo de sondaje directo WhatsApp 1 a 1 & autogestión web',
    shortName: 'Socios Activos',
    meta: [
      ['Destinatarios', 'Socios activos (padrón actual)'],
      ['Canal de envío', 'WhatsApp 1 a 1 personalizado'],
      ['Meta mensual', '300 a 500 respuestas (NPS > 50)'],
    ],
    intro: {
      title: 'Mensaje de bienvenida (lógica de inicio)',
      text: '"¡Hola **[Nombre]**! 🦈 Soy del equipo de Socios de Aldosivi. Te escribimos solo para saber cómo estamos construyendo el club cada día y cómo mejorar tus beneficios. Tarda apenas 1 minuto. ¿Te parece bien?"',
      consent: ['SÍ, quiero participar (continúa a pregunta 1)', 'NO, gracias (cierre cordial sin insistencia)'],
    },
    fields: [
      { label: 'Nombre y apellido', placeholder: 'Ej: Juan Pérez' },
      { label: 'N° de socio / DNI', placeholder: 'Ej: Socio #14520' },
      { label: 'Teléfono WhatsApp', placeholder: '+54 9 223 XXX-XXXX', type: 'tel' },
    ],
    questions: [
      { type: 'single', q: '¿Cuánto tiempo llevás siendo socio del Tiburón?', cols: 4, options: ['Menos de 1 año', '1 a 3 años', '3 a 5 años', 'Más de 5 años'] },
      { type: 'single', q: '¿Con qué frecuencia asistís a actividades del club (partidos, predio de Punta Mogotes, eventos sociales)?', cols: 4, options: ['Casi nunca / nada', '1 vez al mes', '2 a 3 veces al mes', 'Más de 4 veces al mes'] },
      {
        type: 'multi', q: '¿Qué actividades disfrutás más?', hint: 'Marcá todas las que apliquen', cols: 2,
        options: ['Partidos de local en el estadio', 'Entrenamientos abiertos en Predio Punta Mogotes', 'Actividades sociales (asados, peñas, encuentros)', 'Visita al Predio Deportivo / tour / museo', 'Voto en asambleas / espacios institucionales', 'Tienda Oficial calle Olavarría / instalaciones'],
      },
      { type: 'single', q: '¿Creés que el club hoy te devuelve en valor y servicios lo que pagás de cuota?', cols: 5, options: ['Totalmente de acuerdo', 'Parcialmente de acuerdo', 'Neutro', 'Poco de acuerdo', 'En desacuerdo'] },
      {
        type: 'multi', q: '¿Cuáles de los beneficios actuales USÁS de verdad?', hint: 'Marcá todos', cols: 3,
        options: ['Entradas a partidos / descuentos', 'Convenios comercios (20+ en MDP)', 'Carné digital en el celular', 'Acceso a actividades sociales', 'Instalaciones en Punta Mogotes', 'Voto en asambleas'],
      },
      { type: 'text', q: '¿Qué beneficios NO usás y por qué?', hint: 'Opcional — texto abierto', placeholder: 'Ej: Descuentos en comercios que no sabía cómo presentar el carné, horarios de actividades...' },
      { type: 'single', q: 'Considerando los beneficios y accesos, sentís que el precio de la cuota es:', cols: 4, options: ['Justo / accesible', 'Regular', 'Caro', 'Muy caro'] },
      {
        type: 'single', q: '¿Qué deberíamos MEJORAR primero desde el club?', hint: 'Seleccionar 1 prioridad', cols: 3,
        options: ['Cuota más justa / planes familiares', 'Más actividades sociales en el predio', 'Mejor atención / trámites 100% web', 'Más convenios en comercios de MDP', 'Comunicación más personalizada 1 a 1', 'Otro'],
      },
      { type: 'multi', half: true, q: '¿Cómo te hiciste socio originalmente?', cols: 1, options: ['Por familia / tradición / amigos', 'Web oficial / autogestión online', 'Predio Punta Mogotes / Tienda Olavarría', 'Redes sociales / prensa local'] },
      { type: 'single', half: true, q: '¿Qué canal preferís para enterarte de novedades?', cols: 2, options: ['WhatsApp directo', 'Instagram Stories', 'Llamada', 'Facebook / email'] },
      { type: 'nps', tone: 'mint', q: 'Métrica NPS: ¿Qué tan probable es que recomiendes asociarse a Aldosivi a un amigo o familiar?', badge: 'KPI crítico (meta > 50)' },
      { type: 'text', q: '¿Te gustaría que el club te ofrezca algo más? ¿Qué sumarías?', placeholder: 'Espacio abierto para propuestas del socio...' },
      {
        type: 'multi', q: 'Permiso de contacto y suscripción a beneficios:', cols: 2, defaults: [0, 1],
        options: ['Sí, enviarme invitaciones a actividades sociales en el Predio', 'Sí, recibir el catálogo de descuentos en comercios de MDP', 'Quiero adherirme al débito automático ($38.000/mes) por web', 'No deseo recibir más notificaciones'],
      },
    ],
  },
  {
    slug: 'leads-potenciales',
    n: 2,
    chip: 'Formulario oficial #2',
    title: 'Encuesta de captación — Leads potenciales e hinchas no-socios',
    subtitle: 'Detección de barreras de entrada y activación de alta web en 2 minutos',
    shortName: 'Leads / No-Socios',
    meta: [
      ['Destinatarios', 'Hinchas y simpatizantes no-socios'],
      ['Canal de captura', 'Web autogestión / QR / redes / eventos'],
      ['Meta mensual', '200 a 400 respuestas / mes'],
    ],
    intro: {
      title: 'Introducción para el hincha',
      text: '"¿Sos de Aldosivi? 🦈 Queremos saber qué necesitás para sumarte como socio hoy. Recordá que ahora podés asociarte y pagar **100% online por la web en 2 minutos**, o acercarte al **Predio Deportivo de Punta Mogotes** o la **Tienda Oficial de la calle Olavarría**."',
    },
    fields: [
      { label: 'Nombre', placeholder: 'Tu nombre' },
      { label: 'WhatsApp de contacto', placeholder: '+54 9 223 XXX-XXXX', type: 'tel' },
      { label: 'Email (opcional)', placeholder: 'nombre@email.com', type: 'email' },
    ],
    questions: [
      { type: 'single', half: true, q: '¿En qué rango de edad estás?', cols: 2, options: ['Menos de 13', '13–17 (cadete)', '18–30 años', '31–45 años', '46–60 años', 'Más de 60 (jubilado)'] },
      { type: 'single', half: true, q: '¿En qué zona de Mar del Plata vivís?', cols: 2, options: ['Puerto / Punta Mogotes', 'Peralta Ramos / Sur', 'Centro / Güemes / Olavarría', 'Norte / Oeste / Batán', 'Fuera de Mar del Plata'] },
      {
        type: 'multi', q: '¿Qué es lo que más te identifica o te gusta de Aldosivi?', cols: 3,
        options: ['La identidad del Puerto y Mar del Plata', 'La fiesta en la tribuna y su gente', 'El crecimiento del Predio Deportivo', 'El apoyo a las divisiones inferiores', 'La historia y los colores del Tiburón'],
      },
      {
        type: 'multi', tone: 'amber', q: '¿Qué te impide hacerte socio AHORA MISMO?', hint: 'Marcá todas las barreras reales', cols: 2,
        options: ['El precio de la cuota me resulta alto', 'No sabía que ahora se puede hacer y pagar 100% online por web', 'No sé bien qué beneficios o descuentos ofrece el club', 'No tengo tiempo por trabajo / horarios de partido', 'Vivo lejos o solo voy en temporada de verano', 'Otro motivo'],
      },
      {
        type: 'multi', q: '¿Qué beneficio te gustaría tener como socio?', hint: 'Marcá los que más te sirvan', cols: 3,
        options: ['Entradas a partidos aseguradas', '20+ descuentos en comercios de MDP', 'Actividades sociales y asados en el Predio', 'Carné digital inmediato en el teléfono', 'Descuentos en Tienda Oficial calle Olavarría', 'Voto y participación en el club'],
      },
      { type: 'single', half: true, q: '¿Cuánto estarías dispuesto a abonar por mes?', cols: 2, options: ['Hasta $22.000 (jub/cad)', '$25.000 a $32.000', '$34.200 (pack familiar)', '$38.000 (débito auto)'] },
      { type: 'text', half: true, q: '¿Cuál es el "empujoncito" que te haría decir que SÍ hoy?', placeholder: 'Ej: Primer mes gratis en débito, promo grupo familiar, trámite por WhatsApp...' },
      { type: 'single', q: '¿Por qué canal preferís que te pasemos el link directo de alta o te asesoremos?', cols: 4, defaults: [0], options: ['WhatsApp 1 a 1', 'Instagram Direct', 'Llamada telefónica', 'Email'] },
      {
        type: 'multi', tone: 'mint', q: 'Si te avisamos de estas promos vigentes, ¿cuál te interesa activar ahora?', cols: 2,
        options: ['🎁 **Primer mes 100% GRATIS** con débito automático ($38.000/mes)', '👨‍👩‍👧‍👦 **Categoría familiar:** 10% OFF para cada integrante ($34.200 c/u)', '🎓 **Cadete ($27.000) o jubilado ($22.000)** en débito automático', '🎉 Invitación a actividades sociales en el Predio de Punta Mogotes'],
      },
      { type: 'single', half: true, q: '¿Te interesa probar ser socio con el 1er mes bonificado?', cols: 1, options: ['**Sí, quiero asociarme:** contactarme por WhatsApp', 'Quizás, quiero recibir el detalle de beneficios', 'Por ahora no, más adelante'] },
      { type: 'multi', half: true, q: '¿Qué medio de pago o gestión te resulta más cómodo?', cols: 1, defaults: [0], options: ['**100% online por la web** (tarjeta / Mercado Pago / CBU)', 'Presencial en **Predio Deportivo de Punta Mogotes**', 'Presencial en **Tienda Oficial calle Olavarría**'] },
      { type: 'text', q: '¿Qué actividad, descuento o beneficio te gustaría que el club sume primero?', placeholder: 'Contanos tu sugerencia...' },
    ],
  },
  {
    slug: 'ex-socios',
    n: 3,
    chip: 'Formulario oficial #3 · Reenganche',
    title: 'Encuesta y reactivación de ex-socios — "Volvé a ser parte"',
    subtitle: 'Instrumento de diagnóstico de bajas y oferta personalizada por segmento (A, B y C)',
    shortName: 'Ex-Socios',
    pdf: true,
    meta: [
      ['Segmentos', 'A (<6m) · B (6-18m) · C (>18m)'],
      ['Canal', 'WhatsApp 1 a 1 + llamada'],
      ['Objetivo', '300 ex-socios recuperados'],
    ],
    intro: {
      title: 'Fundamento de contacto artesanal',
      text: '"Hola **[Nombre]**! 🦈 Te escribimos porque te extrañamos en la tribuna. Mucho cambió desde que te fuiste: hoy podés reactivar tu carné **100% online por medios web en 2 minutos** o en el **Predio Deportivo de Punta Mogotes** y la **Tienda de calle Olavarría**. Queremos escucharte para darte una solución a tu medida."',
    },
    fields: [
      { label: 'Nombre y apellido', placeholder: 'Nombre del ex-socio' },
      { label: 'N° socio anterior', placeholder: 'N° de padrón' },
      { label: 'Teléfono WhatsApp', placeholder: '+54 9 223 XXX-XXXX', type: 'tel' },
      { label: 'Segmento de baja', type: 'select', options: ['Seg. A: baja reciente (<6 meses)', 'Seg. B: baja media (6 a 18 meses)', 'Seg. C: baja antigua (>18 meses)'] },
    ],
    questions: [
      { type: 'single', q: '¿Hace cuánto tiempo dejaste de ser socio activo?', cols: 3, options: ['Menos de 6 meses (segmento A)', 'Entre 6 y 18 meses (segmento B)', 'Más de 18 meses (segmento C)'] },
      {
        type: 'single', tone: 'brand', q: '¿Cuál fue el motivo principal por el que te diste de baja o dejaste de abonar?', cols: 2,
        options: ['**Económico (40-50%):** "Se me complicó con el valor de la cuota"', '**Fricción de pago:** "Me quedaba incómodo ir a pagar presencialmente"', '**Poco uso (10-15%):** "Casi no iba a la cancha ni usaba beneficios"', '**Insatisfacción (10-15%):** "Sentía que el club no me daba beneficios"', '**Mudanza (10-15%):** "Me fui a vivir fuera de Mar del Plata"', 'Otro motivo personal'],
      },
      {
        type: 'multi', q: '¿Sabías que ahora el club renovó por completo sus canales de pago y beneficios?', cols: 2,
        options: ['Alta y pago **100% online por web** en 2 minutos', 'Atención en **Predio Deportivo de Punta Mogotes** y **Tienda calle Olavarría**', 'Débito automático a $38.000/mes (ahorro de $108.000 al año)', 'Más de 20 descuentos en comercios de Mar del Plata'],
      },
      {
        type: 'offer', tone: 'mint', q: '¿Con cuál de estas propuestas exclusivas de reenganche te gustaría volver hoy?', cols: 3, defaults: [0],
        options: [
          { title: 'Promo "Volvé a ser parte"', desc: '50% OFF en reactivación + 1er mes GRATIS con débito automático + carné digital en 2 min.' },
          { title: 'Promo "Extrañamos tu bandera"', desc: '1er mes GRATIS + acceso a 20+ comercios de MDP + invitación sin cargo a evento social en el Predio.' },
          { title: 'Promo "Volvé sin riesgo"', desc: 'Probá 30 días GRATIS con carné digital activo. Si te convence seguís, si no te das de baja sin costo.' },
        ],
      },
      { type: 'single', half: true, q: '¿Te gustaría asistir a un evento de reencuentro en el Predio de Punta Mogotes?', cols: 1, options: ['Sí, me sumo a un asado / peña de socios', 'Sí, quiero ir a un entrenamiento abierto con mi familia', 'Prefiero ir directamente al próximo partido en el Minella'] },
      { type: 'single', half: true, q: '¿Cómo preferís completar tu reactivación?', cols: 1, defaults: [0], options: ['Que me envíen el **link de pago web directo** por WhatsApp', 'Acercarme al **Predio Deportivo de Punta Mogotes**', 'Acercarme a la **Tienda Oficial de calle Olavarría**'] },
      { type: 'text', q: 'Comentario o mensaje que quieras dejarle al club:', placeholder: 'Contanos qué te gustaría ver en esta nueva etapa de Aldosivi...' },
    ],
  },
  {
    slug: 'deudores-regularizacion',
    n: 4,
    chip: 'Formulario oficial #4 · Regularización',
    title: 'Facilidades y adhesión a medios web — Socios con cuotas pendientes',
    subtitle: 'Programa "Te acompañamos, no te damos de baja" · Recuperación de padrón (1 a 5 meses)',
    shortName: 'Regularización Deudores',
    meta: [
      ['Universo', '1.200 socios (mora 1 a 5 meses)'],
      ['Meta objetivo', '600 socios regularizados ($22.8M/mes)'],
      ['Canales de pago', 'Web online / Predio / Tienda Olavarría'],
    ],
    intro: {
      title: 'Tono de ayuda institucional (sin intimación)',
      text: '"Hola **[Nombre]**! 🦈 Sabemos que a veces se complica acercarse a pagar o recordar los vencimientos. Hoy ya no necesitás moverte de tu casa: podés ponerte al día **100% por medios web**, o si preferís atención presencial, te esperamos en el **Predio Deportivo de Punta Mogotes** o en la **Tienda Oficial de la calle Olavarría**."',
    },
    fields: [
      { label: 'Nombre del socio', placeholder: 'Nombre y apellido' },
      { label: 'N° de socio', placeholder: 'Ej: #18200' },
      { label: 'Meses pendientes', type: 'select', options: ['Bloque 1: 1 a 2 meses (~400 socios)', 'Bloque 2: 3 a 5 meses (~800 socios)'] },
      { label: 'WhatsApp', placeholder: '+54 9 223 XXX-XXXX', type: 'tel' },
    ],
    questions: [
      {
        type: 'single', q: '¿Cuál fue el motivo principal por el que quedaron cuotas pendientes?', cols: 2,
        options: ['**Olvido o falta de tiempo** para ir a pagar en persona', '**Vencimiento o cambio de plástico** de mi tarjeta anterior', '**Dificultad económica** temporal en estos meses', 'No sabía cómo abonar por la nueva plataforma web'],
      },
      {
        type: 'offer', tone: 'mint', q: '¿Qué opción de regularización te resulta más cómoda para mantener tu antigüedad?', cols: 2, defaults: [0],
        options: [
          { title: 'Opción A: adhesión a débito automático ($38.000/mes)', desc: 'Ahorrás $108.000 al año (19% OFF respecto a ventanilla) + **1er mes BONIFICADO** (se descuenta del 2do débito).' },
          { title: 'Opción B: plan "Te acompañamos" (deuda 3-5 meses)', desc: 'Plan de facilidades personalizado en hasta 3 cuotas sin interés + mantenimiento de tu número de socio histórico.' },
        ],
      },
      {
        type: 'single', q: '¿Por dónde preferís realizar el pago o la adhesión?', cols: 3, defaults: [0],
        options: ['🌐 **100% online por medios web** (link por WhatsApp / aldosivi.com.ar/socio)', '🏟️ Presencial en el **Predio Deportivo de Punta Mogotes**', '🛍️ Presencial en la **Tienda Oficial de calle Olavarría**'],
      },
      { type: 'single', q: '¿Te gustaría sumar a tu grupo familiar con 10% de descuento adicional ($34.200 c/u)?', cols: 3, options: ['Sí, quiero consultar por el pack familiar', 'Solo regularizar mi carné individual', 'Necesito que me llame un operador en 5 minutos'] },
      { type: 'text', q: 'Observaciones / horario preferido para que te contactemos:', placeholder: 'Ej: Prefiero que me escriban por WhatsApp después de las 15 hs...' },
    ],
  },
];

export const formHref = (slug) => `#formulario/${slug}`;
