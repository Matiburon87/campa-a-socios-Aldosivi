---
tipo: whatsapp-1a1-centro-operativo
club: "Club Atlético Aldosivi"
fecha: "2026-08-19"
estado: "Operativo - para implementar"
periodo: "Agosto 2026 - Febrero 2027"
responsable: "Admin + Comunicador + DeepSeek"
destinatarios: "Socios, ex-socios, leads, deudores (segmentados 1 a 1)"
---

# 🤖 WHATSAPP 1 A 1 — CENTRO OPERATIVO & SCORING DE LEADS

> **Objetivo:** Convertir cada contacto en venta social, sin broadcast frío, sin riesgo de ban.
> **Regla anti-ban:** 10 mensajes/hora, 40/día por número. Rotar 2 números. DeepSeek solo prepara texto.
> **Meta operativa:** 2.100 nuevos socios en 6 meses · CPA < $1.500/socio · Tasa respuesta > 30%.

---

## 1. ESCALADO DE PRIORIDAD (Scoring de Leads)

Cada lead/contacto se **puntuá de 0 a 5** según intención, disposición y costo de contacto. El operador va de mayor a menor puntuación.

| Puntaje | Perfil | Descripción | Tiempo de respuesta | Acción prioritaria |
|---------|--------|-------------|---------------------|--------------------|
| **5** | Lead caliente | Clickeó pago, abrió web, preguntó precio, llamó o escribió "quiero" | < 10 min | Cierre directo: "Te dejo el link, listo para el primer mes gratis" |
| **4** | Socio inactivo | Alta hace >3 meses sin pago, pero aún en sistema | < 1 hora | Recuperación: "Te hacemos débito $38k + 1er mes gratis para ponerte al día" |
| **3** | Ex-socio reciente | Baja < 6 meses, carné vigente | < 4 horas | Reenganche: "Te extrañamos. Volvé con facilitadas + 1er mes gratis" |
| **3** | Deudor 1-2 meses | Cuota pendiente 1-2 meses, sin comunicación | < 24 horas | WhatsApp 1 a 1: "Vimos tu cuota pendiente. ¿Te interesa regularizar?" |
| **2** | Deudor 3-5 meses | Pendiente 3-5 meses, posible baja inminente | < 48 horas | Llamada + WhatsApp: "Tenés facilidades. Escribime 'ACTUALIZAR'" |
| **2** | Socio activo potencial | Usa 1-2 beneficios, interesa más, no ha pagado | < 2 días | Onboarding: "¿Te animás a probar la actividad este sábado?" |
| **1** | Lead frío | Descargo, quizás vieron el video, no respondió a 3 mensajes | < 7 días | Broadcast/actividad social + seguimiento semanal (no spam) |

> **Regla de oro:** Ningún lead pasa 48h sin respuesta si tiene puntaje ≥3.

---

## 2. PLANTILLAS DE MENSAJE (sin cambios masivos, con personalización por nombre)

Se usan los scripts base + **[Nombre] + dato específico + contexto real**. No se reutiliza el mismo mensaje para dos segmentsos distintos.

### 2.1 Lead caliente (5)
> ¡Hola **[Nombre]**! 🦈 Vimos que empezaste el trámite y no lo completaste. Tenés 2 minutos para terminarlo.  
> Con débito auto: **$38.000/mes** y el **primer mes GRATIS** hasta 31/10/2026.  
> Link: [aldosivi.com.ar/socio] · Dudas, acá estamos.  
> — Equipo Aldosivi Socios

### 2.2 Socio inactivo (4)
> ¡Hola **[Nombre]**! 🦈 Te escribimos porque tu cuota está pendiente desde [mes]. Sabemos que a veces se complica.  
> Si querés actualizar con débito auto $38.000 (ahorrás $108k/año) y ponerte al día, te hacemos facilidades.  
> ¿Escribime "ACTUALIZAR" y te activo? 🦈

### 2.3 Ex-socio reciente (3)
> ¡Hola **[Nombre]**! Te extrañamos en la tribuna. 🦈 Tu carné sigue vigente hasta [fecha].  
> Volvé con débito auto $38.000/mes + **primer mes GRATIS** hasta el 31/10/2026.  
> ¿Te gustaría volver? Escribime "VOLVER".  
> — Equipo Aldosivi Socios

### 2.4 Deudor 1-2 meses (3)
> ¡Hola **[Nombre]**! 🦈 Vimos que tu cuota está pendiente. No es un fallo, es un problema temporal.  
> Te hacemos débito auto $38.000 + 1er mes gratis para ponerte al día.  
> ¿Te animás a ponerte al día? Escribime "ACTUALIZAR" y te resolvimos todo.  
> — Equipo Aldosivi Socios

### 2.5 Deudor 3-5 meses (2)
> ¡Hola **[Nombre]**! 🦈 Te escribimos porque tu cuota está pendiente desde [mes].  
> Tenés facilidades: débito auto $38.000 + 1er mes gratis.  
> Si querés, te llamamos a la hora que preferís. Escribime "LLAMAR" o escribime "ACTUALIZAR".  
> — Equipo Aldosivi Socios

### 2.6 Socio activo (participación)
> ¡Hola **[Nombre]**! 🦈 Como socio activo, te avisamos primero: el sábado **entrenamiento abierto + charla con [ídolo]**.  
> Cupos limitados. Reservá por acá: [link]  
> Además: nuevo descuento [X]% en [comercio de tu zona].  
> ¿Vos confesás en ese sábado?  
> — Equipo Aldosivi Socios

### 2.7 Duda general / no pagó
> ¡Hola **[Nombre]**! 🦈 ¿Qué te interesó del mensaje?  
> ¿Valoración de precio? ¿Dudas técnicas? ¿Pero cómo funciona el débito auto?  
> Te respondemos en 5 min.  
> — Equipo Aldosivi Socios

### 2.8 Cierre (si respondió positivo)
> ¡Genial **[Nombre]**! 🦈 Listo para el primer mes gratis.  
> Te enviamos el link para cerrar: [aldosivi.com.ar/socio]  
> ¿Preferís que te asesoremos paso a paso? Respondé "SI".  
> — Equipo Aldosivi Socios

---

## 3. FLUJO CON DEEPSEEK (IA EN EL LADO, NO CIERRA VENTAS)

DeepSeek **no cierra venta**. Solo prepara, clasifica y da estructura. El operador aprobó el mensaje antes de enviar.

### 3.1 Prompts para DeepSeek
1. **Scoring**: `Clasifica este mensaje de WhatsApp según intención: "[texto del Lead]". Responde con: score 1-5, intención (duda/pago/actividad), si necesita llamada humana, y 1 mejora sugerida.`
2. **Drafting**: `Escribe 3 variantes de un mensaje WhatsApp 1 a 1 para un socio inactivo de 2 años que dejó de pagar. Tono: cercano, sin presión, menciona débito auto + 1er mes gratis.`
3. **Respuesta al Lead**: `Responde a este mensaje de WhatsApp: "[respuesta del Lead]". Mantén tono cariñoso, relevante y con un CTA claro (pagar/debito/activar).`

### 3.2 Flujo diario
1. Lead entra (Web/Form/WhatsApp/QR) → Admin carga en la sheet.
2. DeepSeek asigna **score 1-5** + intención + **próximo paso**.
3. Comunicador/Admin eligen el mensaje base y lo personalizan con nombre + dato.
4. Operador aprobó → se envía (respetando 10/h, 40/día, 2 números rotando).
5. Respuesta del Lead → DeepSeek sintetiza + mención al operador: "Necesita confirmación de datos / querer pagar / duda".
6. Métrica: tasa respuesta, conversión, tiempo de respuesta.

---

## 4. REGLAS ANTI-BAN (críticas)

| Regla | Valor | Cómo aplicar |
|-------|-------|--------------|
| Límite horario | 10 mensajes/hora | 2 números rotando. Usar 10:00-11:00 | 15:00-16:00 | 18:00-19:00 | 20:00-21:00 |
| Rango diario | 40 mensajes/día | Cargar en Google Sheets → programar envío por bloques |
| Bloqueo | 24h si >50 seguidos | Respetar el límite. Probar si el Lead responde antes de enviar más |
| Verificación | Meta no verificó | No enviar broadcast frío. Solo 1 a 1 + broadcast a socios activos optados |
| Rotación | 2 números | N1: deudores 1-2 meses + leads calientes. N2: ex-socios + socios inactivos + dudas generales |
| Registro | Necesario | Cada mensaje en la pestaña `WHATSAPP_1A1` del Google Sheets |

---

## 5. CICLO OPERATIVO (diario/semanal)

### Diario (Admin, 30 min)
1. Importar leads nuevos al día.
2. Actualizar puntajes en la pestaña `LEADS` (puntaje, estado, próximo paso).
3. Preparar 50 mensajes para el siguiente bloque (rotación de 2 números).
4. Verificar que no se superó el límite de 40/día.
5. Registrar respuestas del día en `WHATSAPP_1A1`.

### Semanal (Comunicador, 30 min)
1. Revisar KPIs de WhatsApp 1 a 1 (tasa respuesta, conversión, tiempo de respuesta).
2. Ajustar prompts de DeepSeek según respuestas frecuentes.
3. Actualizar plantillas con datos recientes (actividades, promos, convenios).
4. Reporte al Coordinador para ajustes de mix.

---

## 6. METRICAS CLAVE (rindimiento)

| KPI | Meta | Cómo medir | Responsable |
|-----|------|------------|-------------|
| Tasa respuesta whatssapp | > 30% | (Respuestas / Enviados) × 100 | Admin |
| Conversión lead caliente → alta | 25% | (Altas / Leads calientes contactados) × 100 | Coordinador |
| Conversión socio inactivo → recuperación | 20% | (Recuperados / Contacts inactivos) × 100 | Admin |
| Conversión ex-socio → reactivación | 15% | (Reactivados / Contacts ex-socios) × 100 | Admin |
| Puntaje promedio por segmento | > 3.5 (activos) / > 2.5 (leads) | Promedio de puntuación en `LEADS` | Admin |
| Tiempo de respuesta | < 10 min (calientes) / < 24h (otros) | Registrar hora de envío vs hora de respuesta | Admin |

---

## 7. INTEGRACIÓN CON GOOGLE SHEETS

Pestaña `WHATSAPP_1A1` (existente en `KPIs-Dashboard-Socios.md`) ya registra: fecha, nombre, teléfono, tipo, n° socio, motivo baja, tipo mensaje, medio, mensaje enviado, respuesta recibida, tipo respuesta, acción derivada, resultado, responsable, próxima acción.

> **Nota:** Conectar DeepSeek a Google Sheets requiere un webhook o script (Python/Apps Script). El flujo manual queda registrado, y la IA solo mejora la calidad de los textos. El escalado automático lo hacemos en la Fase 3.

---

*Documento vivo. Actualización: cada lunes de reunión, alineado a `Plan-Campaña-Socios-Aldosivi.md` y `KPIs-Dashboard-Socios.md`.*  
*Fuente: panel admin (19/08/2026) · memoria de campaña · perfil consumidor MDP.*
