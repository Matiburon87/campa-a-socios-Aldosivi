---
tipo: kpi-dashboard
fecha: "2025-08-19"
estado: "plantilla-lista-para-usar"
herramienta: "Google Sheets (compartido equipo)"
club: "Club Atlético Aldosivi"
---

# 📊 KPI Dashboard — Campaña Socios Aldosivi

> Hoja maestra única. Actualización: Diaria (Admin) / Semanal completa (Lunes reunión)

## ESTRUCTURA DEL SHEET (Pestañas)

```
📊 DASHBOARD (Resumen ejecutivo - SOLO LECTURA)
📈 LEADS (Funnel completo día a día)
👥 SOCIOS (Altas confirmadas, categorías, débito, churn, ex-socios)
💰 PRESUPUESTO (Gastos reales vs plan)
👨‍👩‍👧‍👦 VOLUNTARIOS (Turnos, horas, rendimiento)
📱 DIGITAL (Métricas IG/FB/TikTok/WA/Web)
📰 PRENSA (Notas, alcance, valor equivalente)
🏪 COMERCIOS (Convenios, activaciones, uso)
🎯 OBJETIVOS (Metas vs Real - Semanal/Mensual)
📲 WHATSAPP 1 A 1 (Comunicación personalizada socios/ex-socios)
🎲 SONDAJE (Módulo de encuestas - Google Forms)  ← NUEVO
⚙️ CONFIG (Parámetros, fórmulas, listas válidas)
```

---

## PESTAÑA 1: 📊 DASHBOARD (Resumen Ejecutivo)

### KPIs Principales

| KPI | Fórmula / Fuente | Meta 6 Meses | Alerta Si |
|-----|------------------|--------------|-----------|
| **Socios Nuevos Totales** | `=SOCIOS!B:B` | 1.100 | < 150/mes |
| **Leads Totales** | `=LEADS!B:B` | 3.000 | < 400/mes |
| **Conversión Lead → Socio** | `Socios/Leads` | 37% | < 25% |
| **% Débito Automático** | `COUNTIF(SOCIOS!F:F,"Débito")/COUNT(SOCIOS!A:A)` | 75% | < 60% |
| **CPA (Costo por Adquisición)** | `PRESUPUESTO!Total_Gastado / Socios_Nuevos` | < $8.000 | > $12.000 |
| **Churn 30 días** | `Bajas_30d / Altas_30d` | < 10% | > 15% |
| **Referidos Activos** | `COUNTIF(SOCIOS!K:K,TRUE)` | 200 | < 20/mes |
| **Ex-socios Recontactados** | `COUNTIF(WHATSAPP_1A1!G:G,"Ex-socio")` | 300 | < 50/mes |
| **Actividades Sociales Realizadas** | `COUNT(ACTIVIDADES!A:A)` | 24 (2/mes) | < 1/mes |
| **Beneficios Comercios Activos** | `COUNTIF(COMERCIOS!K:K,"Activo")` | 50 | < 30 |

### Gráficos Auto-actualizables

1. Línea: Socios nuevos acumulados vs Meta (semanal)
2. Barras apiladas: Altas por canal (Web / Estadio / Sede / Barrial / Referido / Escuela / Ex-socio recontactado)
3. Pastel: Distribución por categoría (Activo / Cadete / Jubilado / Familiar)
4. Línea: % Débito automático evolutivo
5. Barras: CPA por mes vs Meta
6. Mapa calor: Leads por barrio / zona
7. Funnel: Leads → Click Pago → Pago OK → Alta Confirmada → Día 30 Activo
8. **Ex-socios recontactados vs Altas por reactivación** (nuevo)

---

## PESTAÑA 2: 📈 LEADS (Funnel Diario)

### Columnas

| Columna | Nombre | Tipo | Validación |
|---------|--------|------|------------|
| A | Fecha | Date | =HOY() |
| B | ID Lead | Texto | `LEAD-YYYYMMDD-###` (auto) |
| C | Origen | Lista | Web / QR Estadio / QR Sede / QR Barrial / QR Comercio / WhatsApp / Referido / Escuela / Prensa / Orgánico IG / Orgánico FB / Orgánico TikTok / Ads Meta / Recontacto Ex-socio / Actividad Social / Otro |
| D | Medio | Lista | QR Flyer / QR Poster / Link Bio / Story / Reel / TikTok / WhatsApp Bot / Broadcast / Voluntario / Formulario Papel / Web Directo / Llamada Personal / Otro |
| E | Campaña | Texto | `SEP-LANZAMIENTO` / `OCT-REFERIDOS` / `NOV-ADS` / `DIC-NAVIDAD` / `ENE-VERANO` / `FEB-CIERRE` |
| F | Nombre | Texto | — |
| G | Teléfono | Texto | Formato: `+54 9 223 XXX XXXX` |
| H | Email | Texto | — |
| I | Barrio/Zona | Lista | Centro / Peralta Ramos / Playa / Norte / Sur / Oeste / Batán / Fuera MDP / No dijo |
| J | Edad | Número | 13-99 |
| K | Categoría Interés | Lista | Activo / Cadete / Jubilado / Familiar / Menor / Vitalicio / Adherente / No sabe |
| L | Click Pago | Checkbox | TRUE/FALSE |
| M | Pago OK | Checkbox | TRUE/FALSE |
| N | Alta Confirmada | Checkbox | TRUE/FALSE |
| O | N° Socio | Texto | — |
| P | Débito Auto | Checkbox | TRUE/FALSE |
| Q | Referido Por | Texto | N° socio referidor / "Orgánico" |
| R | Estado | Lista | Nuevo / En Proceso / Pagado / Alta OK / Caído / Duplicado / Spam |
| S | Notas | Texto | — |
| T | Último Contacto | Date | — |
| U | Próxima Acción | Lista | Llamar / WA / Email / Esperar Pago / Enviar Carné / Onboarding / Cerrar |
| V | Responsable | Lista | Coordinador / Admin / Comunicador / Operador / Voluntario |

### Fórmulas Clave

```excel
// ID Auto (fila 2, arrastrar)
="LEAD-"&TEXT(A2,"YYYYMMDD")&"-"&TEXT(ROW()-1,"000")

// Conversión por origen (en DASHBOARD)
=COUNTIFS(LEADS!C:C,"Web",LEADS!N:N,TRUE)/COUNTIF(LEADS!C:C,"Web")

// Leads esta semana
=COUNTIFS(LEADS!A:A,">="&HOY()-7,LEADS!A:A,"<="&HOY())

// Leads ex-socios recontactados esta semana
=COUNTIFS(LEADS!A:A,">="&HOY()-7,LEADS!C:C,"Recontacto Ex-socio")
```

---

## PESTAÑA 3: 👥 SOCIOS (Altas Confirmadas + Ex-socios)

### Columnas

| Columna | Nombre | Tipo | Validación |
|---------|--------|------|------------|
| A | Fecha Alta | Date | — |
| B | N° Socio | Texto | Único |
| C | Nombre Completo | Texto | — |
| D | DNI | Texto | `NN.NNN.NNN` |
| E | Categoría | Lista | Activo / Cadete / Jubilado / Familiar / Menor / Vitalicio / Adherente |
| F | Forma Pago | Lista | Débito Auto / Tarjeta / Transferencia / Efectivo / Mixto |
| G | Precio Mensual | Número | — |
| H | Cuota Ingreso | Número | — |
| I | Origen Lead | Texto | =VLOOKUP en LEADS |
| J | Referido Por | Texto | N° socio / "Orgánico" |
| K | Es Referido | Checkbox | TRUE/FALSE |
| L | Barrio/Zona | Lista | (Misma que LEADS) |
| M | Edad | Número | — |
| N | Teléfono | Texto | — |
| O | Email | Texto | — |
| P | WhatsApp Opt-in | Checkbox | TRUE/FALSE |
| Q | Grupo WA Unido | Checkbox | TRUE/FALSE |
| R | Carné Digital Entregado | Checkbox | TRUE/FALSE |
| S | Guía Beneficios Entregada | Checkbox | TRUE/FALSE |
| T | Onboarding Día 7 OK | Checkbox | TRUE/FALSE |
| U | Onboarding Día 15 OK | Checkbox | TRUE/FALSE |
| V | Onboarding Día 30 OK | Checkbox | TRUE/FALSE |
| W | Activo Día 30 | Checkbox | TRUE/FALSE |
| X | Activo Día 60 | Checkbox | TRUE/FALSE |
| Y | Activo Día 90 | Checkbox | TRUE/FALSE |
| Z | Fecha Baja | Date | — |
| AA | Motivo Baja | Lista | Económico / Insatisfecho / Mudanza / Otro club / No uso / Desconocido |
| AB | Valor Vida Estimado (LTV) | Fórmula | `=G2*12*3` |
| AC | Último Pago | Date | — |
| AD | Próximo Vencimiento | Date | — |
| AE | Tipo Comunicación Preferida | Lista | WhatsApp / Llamada / Email / Presencial / Ninguna | NUEVO |
| AF | Ex-socio Reactivado | Checkbox | TRUE/FALSE | NUEVO |

---

## PESTAÑA 4: 💰 PRESUPUESTO

### Columnas

| Columna | Nombre | Tipo | Validación |
|---------|--------|------|------------|
| A | Fecha | Date | — |
| B | Concepto | Texto | — |
| C | Categoría | Lista | Material Gráfico / Stands Eventos / Digital Ads / Merch Bienvenida / Viáticos / Prensa Producción / Contingencia / Sponsors Ingreso / Actividades Sociales |
| D | Proveedor | Texto | — |
| E | Monto (ARS) | Número | — |
| F | Pagado | Checkbox | TRUE/FALSE |
| G | Factura/Recibo | Texto | — |
| H | Mes Campaña | Lista | Sep / Oct / Nov / Dic / Ene / Feb |
| I | Aprobado Por | Lista | Coordinador / CD / Tesorero |
| J | Notas | Texto | — |

---

## PESTAÑA 5: 👨‍👩‍👧‍👦 VOLUNTARIOS

### Columnas

| Columna | Nombre | Tipo | Validación |
|---------|--------|------|------------|
| A | Nombre | Texto | — |
| B | Teléfono | Texto | — |
| C | Email | Texto | — |
| D | Barrio/Zona | Lista | (Misma) |
| E | Disponibilidad | Lista | Finde partidos / Entre semana / Eventos barriales / Escuela / Sede / Digital / Lo que haga falta |
| F | Rol | Lista | Captador Stand / Captador Barrial / Escuela / Logística / Digital / Fotógrafo / Chofer / Coordinador Turno / Activador Comercios |
| G | Fecha Inicio | Date | — |
| H | Estado | Lista | Activo / Pausa / Baja / Standby |
| I | Horas Acumuladas | Número | =SUMIF en TURNOS |
| J | Eventos Asistidos | Número | — |
| K | Leads Capturados | Número | =COUNTIFS(LEADS!V:V,Nombre) |
| L | Altas Logradas | Número | =COUNTIFS(LEADS!V:V,Nombre,LEADS!N:N,TRUE) |
| M | Conversión Personal | Fórmula | =L/K |
| N | Certificado Entregado | Checkbox | — |
| O | Notas | Texto | — |

---

## PESTAÑA 6: 📱 DIGITAL

### Instagram / Facebook (Meta Business Suite)

| Semana | Alcance | Interacciones | Seguidores Nuevos | Reels Views | Profile Visits | Clicks Web | Costo Ads | Leads Ads |
|--------|---------|---------------|-------------------|-------------|----------------|------------|-----------|-----------|

### TikTok

| Semana | Vistas Totales | Seguidores | Compartidos | Comentarios | Clicks Perfil | Leads Orgánicos |
|--------|----------------|------------|-------------|-------------|---------------|-----------------|

### Web / Landing (GA4)

| Semana | Sesiones | Usuarios | Páginas/Sesión | Tasa Rebote | Conversiones (Click Pago) | Valor Conversión |
|--------|----------|----------|----------------|-------------|---------------------------|------------------|

### WhatsApp Business

| Semana | Chats Nuevos | Bienvenidas Enviadas | Respuestas Rápidas Usadas | Broadcast Enviados | Entregados | Leídos | Opt-outs |
|--------|--------------|----------------------|---------------------------|--------------------|------------|--------|----------|
|        |              |                      |                           |                    |            |        |          |

---

## PESTAÑA 7: 📰 PRENSA

| Fecha | Medio | Tipo | Formato | Tema | Vocero | Alcance Estimado | Valor Equiv. (ARS) | Link / Recorte |
|-------|-------|------|---------|------|--------|------------------|-------------------|----------------|

**Total Valor Equivalente Prensa (Earned Media)**: `=SUM(G:G)` → Meta 6 meses: > $1.000.000

---

## PESTAÑA 8: 🏪 COMERCIOS CONVENIOS

| Comercio | Rubro | Barrio | % Descuento | Contacto | Teléfono | Estado | Logo Recibido | POPs Entregados | Activaciones/Mes | Uso Estimado |
|----------|-------|--------|-------------|----------|----------|--------|---------------|-----------------|------------------|--------------|

**Metas**: 20 activos Mes 1 → 35 Mes 3 → 50 Mes 6

---

## PESTAÑA 9: 🎯 OBJETIVOS (Metas vs Real)

| Horizonte | KPI | Meta | Real | % Cumplimiento | Tendencia | Acción Correctiva |
|-----------|-----|------|------|----------------|-----------|-------------------|
| **Semana 1** | Leads | 150 | | | | |
| | Altas | 40 | | | | |
| | % Débito | 60% | | | | |
| | Ex-socios recontactados | 30 | | | | |
| **Mes 1 (Sep)** | Socios Nuevos | 200 | | | | |
| | Leads | 500 | | | | |
| | Actividades Sociales | 2 | | | | |
| **Mes 2 (Oct)** | Socios Acum | 700 | | | | |
| **Mes 3 (Nov)** | Socios Acum | 1.000 | | | | |
| **Mes 6 (Feb)** | **TOTAL** | **1.100** | | | | |

---

## PESTAÑA 10: 📲 WHATSAPP 1 A 1 (Comunicación Personalizada)

> **NUEVO** — Basado en tu feedback: individualizar al socio/ex-socio con mensajes WhatsApp personalizados para comunicación constante importante.  
> Objetivo: Reenganchar ex-socios + Fidelizar socios actuales + Captación personalizada.

### Estructura: Una fila por socio/ex-socio contactado

| Columna | Nombre | Tipo | Validación |
|---------|--------|------|------------|
| A | Fecha Contacto | Date | — |
| B | Nombre | Texto | — |
| C | Teléfono | Texto | +54 9 223 XXX XXXX |
| D | Tipo | Lista | Socio Activo / Ex-socio / Lead Caliente / Socio Inactivo (>3 meses sin pago) |
| E | N° Socio (si tiene) | Texto | — |
| F | Última Actividad Club | Texto | "Asistió partido 15/08" / "Alta 10/08" / "Baja 05/2024" / "Nunca asistió" |
| G | Motivo Baja (si ex-socio) | Lista | Económico / Mudanza / Insatisfecho / Otro club / No uso / Desconocido |
| H | Tipo Mensaje | Lista | Reenganche / Invitación Evento / Aviso Importante / Beneficio Nuevo / Referido / Recuperación Ex-socio / Agradecimiento |
| I | Medio | Lista | WhatsApp Personal / WhatsApp Business / Llamada / Email / Presencial |
| J | Mensaje Enviado | Texto | — |
| K | Respuesta Recibida | Checkbox | TRUE/FALSE |
| L | Tipo Respuesta | Lista | Positiva / Neutral / Negativa / Sin respuesta |
| M | Acción Derivada | Lista | Alta / Reactivación / Evento / Beneficio / Llamar de nuevo / Ninguna |
| N | Resultado | Lista | Alta Exitosa / Reactivación Exitosa / Asistencia Evento / Sin Cambio / Baja Confirmada |
| O | Valor Estimado | Número | LTV si reactiva / Valor eventos / — |
| P | Responsable | Lista | Coordinador / Admin / Comunicador / Operador / Voluntario |
| Q | Próxima Acción | Lista | Llamar en X días / Enviar beneficio / Invitar evento / Ninguna |
| R | Notas | Texto | — |

### Mensajes Tipo por Segmento

| Segmento | Tipo Mensaje | Template |
|----------|--------------|----------|
| **Ex-socio (baja <6 meses)** | Reenganche | "Hola [Nombre]! Te extrañamos en la tribuna. Tu carné sigue vigente hasta [FECHA]. ¿Te gustaría volver? Tenés promo: 50% off cuota ingreso si reactivás antes del 31/10. Escribinos." |
| **Ex-socio (baja >6 meses)** | Reactivación | "Hola [Nombre]! Mucho cambió desde que te fuiste. Ahora tenés débito auto $38k, 20+ descuentos en MDP, carné digital, grupo WhatsApp. ¿Te animás a probar el primer mes gratis? Link: [URL]?ref=exsocio" |
| **Socio activo (>1 año)** | Beneficio nuevo / Evento | "Hola [Nombre]! 🦈 Como socio activo, te avisamos primero: el sábado entrenamiento abierto + charla con [Ídolo]. Cupos limitados, reservá por acá. Además: nuevo descuento 20% en [Comercio Barrio] para tu zona." |
| **Socio inactivo (>3 meses sin pago)** | Recuperación | "Hola [Nombre]! Te escribimos porque tu cuota está pendiente desde [MES]. Sabemos que a veces se complica. Si querés actualizar con débito auto $38k (ahorrás $108k/año) y ponerte al día, te hacemos facilidades. Escribinos." |
| **Lead caliente (click pago pero no pagó)** | Cierre | "Hola [Nombre]! Vimos que empezaste el trámite para ser socio pero no lo terminaste. Te dejamos el link directo: [URL]. Primer mes gratis hasta 31/10. Dudas, acá estamos." |
| **Socio referente** | Referidos | "Hola [Nombre]! Ya trajiste a [X] amigos este mes. ¡Vas por el premio! 🎁 Si traés 3 nuevos socios este mes, te regalamos la camiseta retro 1995. Seguí así, tiburón." |
| **Todos (comunicación importante)** | Aviso institucional | "Hola [Nombre]! Comunicado importante Aldosivi Socios: [AVISO]. Para más info: [LINK]. Ante dudas, respondé este mensaje. — Equipo Aldosivi Socios" |

### KPIs WhatsApp 1 a 1

| KPI | Meta | Cómo Medir |
|-----|------|------------|
| **Tasa respuesta** | >30% | (Respuestas / Enviados) x 100 |
| **Reactivación ex-socios** | 15% | (Ex-socios que vuelven / Ex-socios contactados) x 100 |
| **Conversión lead caliente → alta** | 25% | (Altas / Leads calientes contactados) x 100 |
| **Asistencia eventos (invitados por WA)** | 40% | (Asistentes / Invitados) x 100 |
| **NPS por WA** | >7 | Encuesta post-evento / post-contacto |

---

## 🎲 PESTAÑA 11: 🎲 SONDAJE SÍMON (Módulo de Encuestas — Google Forms)

> **Encuestas del panel?** Esto es un módulo nuevo para el dashboard que integra el **encuestador de socios activos** y de **leads potenciales**.  
> **¿Cómo funciona?**  
> - **Activos:** WhatsApp 1 a 1 individual. Meta 300-500 resp.  
> - **Leads:** Web autogestión + WhatsApp + eventos. Meta 200-400 resp.  
> - **Frecuencia:** Un mes completo (25/08/2026 - 25/09/2026), revisión al lunes de reunión.  
> - **Fuente de registro:** las respuestas se cargan manualmente en esta pestaña (o exportados de Google Forms como CSV y convertidos a tabla).

### ESTRUCTURA (2 pestañas internas)

#### PESTAÑA 11.1: SONDAJE_ACTIVOS

| Columna | Nombre | Tipo | Validación |
|---------|--------|------|------------|
| A | Fecha Recepción | Date | =HOY() |
| B | ID Sondaje | Texto | `SONDA-YYYYMMDD-###` (auto) |
| C | Tipo Sondaje | Lista | `Socio_Activo` |
| D | Origen Sondaje | Lista | WhatsApp / WebAutogen / Evento / QR / Telegram |
| E | Nombre | Texto | — |
| F | Teléfono | Texto | `+54 9 223 XXX XXXX` |
| G | Edad | Número | 13-99 |
| H | Tiempo Socio | Lista | Menos de 1 año / 1-3 años / 3-5 años / Más de 5 años |
| I | Frecuencia Asistencia | Lista | Casi nunca / 1/mes / 2-3/mes / +4/mes |
| J | Beneficios Usados | Lista | Entradas / convenios / carné / actividades / espacio / voto / ninguno / otros |
| K | Beneficios No Usados | Texto | Libre (3 líneas) |
| L | Satisfacción Precio | Lista | Justo / Regular / Caro / Muy caro |
| M | ¿Qué mejorar? | Lista | Precio / actividades / convenios / comunicación / atención / trámites |
| N | Canal Preferido | Lista | WhatsApp / Llamada / Email / Facebook / Instagram / TikTok |
| O | NPS (0-10) | Número | 0-10 (entero) |
| P | ¿Te gustaría que ofrezcamos algo más? | Texto | Libre (2 líneas) |
| Q | Incluir info de actividades | Checkbox | Sí (invitaciones) / No (no quiero) |
| R | Estado | Lista | N/A / Procesado / Alerta respuesta / Activo / Inactivo / Ex-socio |
| S | Notas | Texto | — |
| T | Último Contacto | Date | — |
| U | Próxima Acción | Lista | Seguimiento / Beneficio / Evento / Promoción / Ninguna |

#### PESTAÑA 11.2: SONDAJE_LEADS

| Columna | Nombre | Tipo | Validación |
|---------|--------|------|------------|
| A | Fecha Recepción | Date | =HOY() |
| B | ID Sondaje | Texto | `SONDA-YYYYMMDD-###` (auto) |
| C | Tipo Sondaje | Lista | `Lead_Potencial` |
| D | Origen Sondaje | Lista | WebAutogen / WhatsApp / Evento / QR / Telegram |
| E | Nombre | Texto | — |
| F | Teléfono | Texto | `+54 9 223 XXX XXXX` |
| G | Edad | Número | 13-99 |
| H | Zona | Lista | Centro / Peralta Ramos / Playa / Norte / Sur / Oeste / Batán / Fuera MDP / No dijo |
| I | ¿Qué te gusta del club? | Texto | Libre (2 líneas) |
| J | Barrera para sociar | Lista | No tiempo / precio / no sé cómo / otro club / horario/distancia / temporada / otra |
| K | ¿Qué te gustaría tener? | Lista | Entradas / convenios / actividades / carné / voto / historia del club / ninguno / otros |
| L | Precio apto (mes) | Lista | No estoy seguro / hasta $20k / 21-30k / 31-40k / 41-50k / +51k |
| M | Hechito que te haría sí | Texto | Libre (3 líneas) |
| N | Canal preferido | Lista | WhatsApp / Llamada / Email / Facebook / Instagram / TikTok |
| O | ¿Aún te interesa probar? | Lista | Sí / Quizás / No |
| P | Método menos trabajoso | Lista | Formulario online / Mercado Pago / Presencial / Llamada |
| Q | ¿Qué práctica te gustaría que ofrezcamos? | Texto | Libre (2 líneas) |
| R | Puntuación (IA) | Número | 1-5 (por DeepSeek / operador) |
| S | Estado | Lista | N/A / Procesado / En proceso / Alta OK / Caído / Duplicado / Spam |
| T | Próxima Acción | Lista | Llamada / WA / Email / Esperar pago / Enviar carné / Onboarding / Cerrar |
| U | Responsable | Lista | Coordinador / Admin / Comunicador / Operador / Voluntario |

### Métricas del módulo (para el DASHBOARD)

| Métrica | Dónde se calcula | Meta |
|---------|------------------|------|
| NPS promedio (activos) | `PROMEDIO(SONDAJE_ACTIVOS!O:O)` | > 50 |
| % activos con 3+ beneficios usados | `CONTAR.SI(SONDAJE_ACTIVOS!J:J,">=3")/CONTARA(SONDAJE_ACTIVOS!J:J)` | > 45% |
| % "no sé cómo hacerme" (leads) | `CONTAR.SI(SONDAJE_LEADS!J:J,"No sé cómo hacerme")` | < 15% |
| Canal preferido WhatsApp (leads) | `CONTAR.SI(SONDAJE_LEADS!N:N,"WhatsApp")/CONTARA(SONDAJE_LEADS!N:N)` | > 40% |
| Hechito más mencionado (leads) | `MAX(CONTAR.SI(SONDAJE_LEADS!M:M, *respuesta))` | Ver reporte diario |
| Respuestas totales | `CONTARA(SONDAJE_ACTIVOS!A:A)+CONTARA(SONDAJE_LEADS!A:A)` | 300-400 |

### Integración con el plan estratégico

Las respuestas se cruzan con el plan en `Plan-Campaña-Socios-Aldosivi.md` y `KPIs-Dashboard-Socios.md` para ajustar:

| Bloque de respuestas | Descripción | Acción plan |
|---------------------|-------------|-------------|
| NPS < 30 · % barreras alto | Plan de oferta débil | Revisar oferta: convenios + actividades + carné digital |
| Respuesta de WhatsApp alta | Canal preferido | Usar WhatsApp 1 a 1 (respecto a anti-ban: 10/h, 40/día) |
| % "No sé cómo hacerme" > 15% | Brecha de trámites | Landing + formulario 2 min + asesoría telefónica |
| Preferencias de actividades | Entretenimiento activo | Respetar el calendario 2 actividades/mes |
| Puntuación de precio "Caro/Muy caro" | Precio por debajo del valor | Demostrar valor: débito auto + $108k/año + convenios |
| Hechito mencionado | Incitador de venta | Agregar al mensaje de cierre y landing |

> 📈 **¿Qué hace este módulo?** Las encuestas se convierten en decisiones: mix de comunicación, precio, canal, tipo de actividades, mensaje de cierre. Es el "síntoma" del plan estratégico y se actualiza cada lunes de reunión.

---

## PESTAÑA 12: ⚙️ CONFIG

### Listas Validación

```text
Origen_Lead: Web,QR Estadio,QR Sede,QR Barrial,QR Comercio,WhatsApp,Referido,Escuela,Prensa,Orgánico IG,Orgánico FB,Orgánico TikTok,Ads Meta,Recontacto Ex-socio,Actividad Social,Otro
Medio_Lead: QR Flyer,QR Poster,Link Bio,Story,Reel,TikTok,WhatsApp Bot,Broadcast,Voluntario,Formulario Papel,Web Directo,Llamada Personal,Otro
Campaña: SEP-LANZAMIENTO,OCT-REFERIDOS,NOV-ADS,DIC-NAVIDAD,ENE-VERANO,FEB-CIERRE
Barrio: Centro,Peralta Ramos,Playa,Norte,Sur,Oeste,Batán,Fuera MDP,No dijo
Categoria_Interes: Activo,Cadete,Jubilado,Familiar,Menor,Vitalicio,Adherente,No sabe
Estado_Lead: Nuevo,En Proceso,Pagado,Alta OK,Caído,Duplicado,Spam
Proxima_Accion: Llamar,WA,Email,Esperar Pago,Enviar Carné,Onboarding,Cerrar
Responsable: Coordinador,Admin,Comunicador,Operador,Voluntario
Categoria_Socio: Activo,Cadete,Jubilado,Familiar,Menor,Vitalicio,Adherente
Forma_Pago: Débito Auto,Tarjeta,Transferencia,Efectivo,Mixto
Motivo_Baja: Económico,Insatisfecho,Mudanza,Otro club,No uso,Desconocido
Disponibilidad_Vol: Finde partidos,Entre semana,Eventos barriales,Escuela,Sede,Digital,Lo que haga falta
Rol_Vol: Captador Stand,Captador Barrial,Escuela,Logística,Digital,Fotógrafo,Chofer,Coordinador Turno,Activador Comercios
Estado_Vol: Activo,Pausa,Baja,Standby
Tipo_Comunicacion_Preferida: WhatsApp,Llamada,Email,Presencial,Ninguna
Tipo_Mensaje_WA: Reenganche,Invitación Evento,Aviso Importante,Beneficio Nuevo,Referido,Recuperación Ex-socio,Agradecimiento
Tipo_Actividad: Entrenamiento Abierto,Charla Ídolo,Visita Museo,Asado Socios,Partido Amistoso,Tour Estadio,Cine,Peña,Otra
Tipo_Respuesta_WA: Positiva,Neutral,Negativa,Sin respuesta
Resultado_WA: Alta Exitosa,Reactivación Exitosa,Asistencia Evento,Sin Cambio,Baja Confirmada
```

### Parámetros

| Parámetro | Valor |
|-----------|-------|
| `meta_socios_6m` | 1100 |
| `meta_leads_6m` | 3000 |
| `meta_conversion` | 0.37 |
| `meta_debito_pct` | 0.75 |
| `meta_cpa` | 8000 |
| `meta_churn_30` | 0.10 |
| `meta_referidos` | 200 |
| `meta_exsocios_reactivados` | 300 |
| `meta_actividades_mes` | 2 |
| `meta_comercios_activos_mes1` | 20 |
| `valor_hora_voluntario` | 2500 |
| `promo_primer_mes_gratis_fin` | 2025-10-31 |

---

## INSTRUCCIONES USO

### Admin (Diario - 15 min)
1. Abrir Sheet → LEADS: ingresar leads del día (Web, WA, QR papel, Voluntarios, Actividades)
2. Marcar `Click Pago`, `Pago OK`, `Alta Confirmada`
3. Si `Alta Confirmada` = TRUE → Copiar a SOCIOS
4. Actualizar `Último Contacto` y `Próxima Acción`
5. WhatsApp 1 a 1: Registrar cada contacto en pestaña `WHATSAPP_1A1`
6. Cargar respuestas de encuestas en `SONDAJE` (activos: WhatsApp, leads: Web/Eventos)

### Coordinador (Weekly - Lunes 30 min)
1. Revisar DASHBOARD: semáforos, tendencias, alertas
2. Revisar WHATSAPP_1A1: tasas respuesta, reactivaciones, próximas acciones
3. Revisar ACTIVIDADES: próxima actividad, cupos, material
4. Revisar SONDAJE: estado de encuestas, métricas clave, NPS, principales hallazgos
5. Decidir ajustes para la semana

### Coordinador (Mensual - 1 hora) → Sondaje activos
1. Continuar con la encuesta activa
2. Revisar `SONDAJE_ACTIVOS` y `SONDAJE_LEADS`
3. Actualizar `SONDAJE_STRATEGY` para el siguiente mes
4. Reportar al CD con hallazgos y ajustes de plan

---

*Plantilla lista. Crear Sheet esta semana, testear miércoles 20/08, operar desde viernes 22/08.*
