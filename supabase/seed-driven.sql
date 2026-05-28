-- Ana Labs seed inicial: DRV / Driven
-- Aplicar después de supabase/schema.sql desde Supabase SQL Editor.

insert into public.brands (code, name, slug, slogan, crs, assets_count, users_count, socials, status)
values (
  'DRV',
  'Driven',
  'driven',
  'Equipate para todo',
  12,
  12,
  2,
  '{"web":"https://driven.com.ar","instagram":"https://instagram.com/driven.ar","facebook":"https://facebook.com/driven.ar","whatsapp":"https://wa.me/5491126082642"}'::jsonb,
  'active'
)
on conflict (code) do update set
  name = excluded.name,
  slug = excluded.slug,
  slogan = excluded.slogan,
  crs = excluded.crs,
  assets_count = excluded.assets_count,
  users_count = excluded.users_count,
  socials = excluded.socials,
  updated_at = now();

insert into public.brand_members (brand_id, email, role, status, invited_label, last_access_label)
values
  ((select id from public.brands where code = 'DRV'), 'paumedium@gmail.com', 'admin', 'activo', 'seed', 'hoy'),
  ((select id from public.brands where code = 'DRV'), 'info@driven.com.ar', 'cliente', 'sin confirmar', 'seed', '-')
on conflict (brand_id, email) do update set
  role = excluded.role,
  status = excluded.status,
  invited_label = excluded.invited_label,
  last_access_label = excluded.last_access_label;

insert into public.brand_fichas (brand_id, content, format_meta, active_version)
values (
  (select id from public.brands where code = 'DRV'),
  $ana_ficha$
FICHA DE MARCA INTEGRAL — DRIVEN
Equipate para todo
12 dimensiones — Generado por Ana Labs — 2026-05-28
Fuentes: driven.com.ar, brand profile Driven enviado por Ana, datos legales VECHER S.A., pauta estratégica Claude 2026-05-28

═══════════════════════════════════════
1. IDENTIDAD CORPORATIVA
═══════════════════════════════════════
Nombre comercial: Driven
Razón social: VECHER S.A. (CUIT 30-71072698-8)
Slogan: "Equipate para todo"
Slogans secundarios: "Vamos más allá" · "Equipamiento Superior" · "Equipamiento para quienes no se quedan quietos"
Fundación: (Información pendiente — requiere insumo del cliente)
Sede: José Vela 1450, Pergamino, Buenos Aires, Argentina
Gerente General: Damián (dueño — apellido pendiente validar)
Referente público / embajador: Facundo Arana aparece en análisis de Instagram; uso pendiente de confirmación con Damián.
Sector: Equipamiento outdoor, 4x4, herramientas y motores.
Alcance geográfico: Argentina — venta online y distribución a comercios, con envíos a todo el país.
Datos legales que no publicar: stock real gestionado por SAP, infraestructura interna, márgenes, volúmenes y condiciones comerciales privadas.

═══════════════════════════════════════
2. PROPÓSITO
═══════════════════════════════════════
Misión: Dar equipamiento outdoor, 4x4, herramientas y motores que bancan el uso real, con respaldo argentino y garantía oficial. (propuesta — pendiente validar)

Visión: Consolidar a Driven como marca argentina de referencia para usuarios exigentes que buscan equiparse con productos robustos, probados y respaldados localmente. (propuesta — pendiente validar)

Problema que resuelve: Evita que el usuario dependa de equipamiento barato o sin respaldo que puede fallar en una salida, taller, ruta o situación exigente.

Valores:
  - Calidad real — productos pensados para usar, no solo para verse bien en vidriera.
  - Respaldo argentino — servicio, garantía y base física en Argentina.
  - Autosuficiencia — equipa a personas que quieren resolver por sí mismas.
  - Claridad comercial — producto, beneficio y condición sin vueltas.
  - Comunidad — vínculo con personas que salen, viajan, arreglan y prueban el equipo en uso.

Qué nunca debería comunicar: superlativos vacíos, miedo, FOMO artificial, ataques a la competencia o promesas de atención humana inmediata en web/WhatsApp.

═══════════════════════════════════════
3. POSICIONAMIENTO ESTRATÉGICO
═══════════════════════════════════════
Definición: Marca argentina de equipamiento outdoor, 4x4, herramientas y motores con calidad real probada en uso, garantía oficial de 2 años y respaldo local.

Propuesta de valor: "Driven equipa a personas exigentes con productos robustos, probados y respaldados en Argentina para salir, trabajar y resolver con confianza."

Propuesta por unidad:
  - Outdoor y camping: equipamiento práctico para cocinar, hidratarse, iluminar, dormir y armar campamento.
  - 4x4 y overlanding: compresores, eslingas, bidones, cables puente, criques y accesorios para travesías reales.
  - Garage y herramientas: motores, compresores, iluminación y herramientas para mantenimiento DIY.
  - Distribución a comercios: catálogo y productos para puntos de venta / revendedores. (condiciones pendiente validar)

Elevator pitch: "Driven es una marca argentina de equipamiento outdoor, 4x4, herramientas y motores. No vende objetos de vidriera: vende equipo probado para uso real, con 2 años de garantía oficial y respaldo en el país. Para gente que sale a la ruta, arma campamento, trabaja en el garage o necesita que el equipo responda cuando importa."

Claim principal: "Equipate para todo"

Claims secundarios:
  - "Te banca en el uso real"
  - "Calidad de verdad, hecha para usar"
  - "Vamos más allá"
  - "Equipamiento para quienes no se quedan quietos"
  - "Listo para la ruta, el campamento o el taller"

Posición competitiva:
                 Respaldo local / garantía
                         ↑
            Driven       │   Marcas técnicas premium
                         │
Uso real        ←────────┼────────→ Lifestyle aspiracional
                         │
 Importado genérico      │   Marcas outdoor de moda
                         ↓
                 Sin respaldo / compra riesgosa

Competidores / alternativas: importados genéricos, productos baratos de marketplace, marcas de ferretería/outdoor locales y compras oportunistas en plataformas internacionales. Listado específico pendiente validar.
Compite por: calidad, confianza, respaldo local y especialización en uso real. No compite por precio más bajo.

═══════════════════════════════════════
4. ARQUITECTURA DE MARCA (Opcional)
═══════════════════════════════════════
Estructura: marca única con líneas de producto. No hay sub-marcas como unidades separadas.

Líneas / nombres de producto:
  - Big Boy: compresores.
  - Flamate: cocinas y anafes.
  - Red Force: pavas.
  - Bidón 15L: producto premiado por Instituto Argentino del Envase.

Productos a comunicar separados:
  - Garage / 4x4: compresores, eslingas, cables puente, criques, bidones.
  - Térmicos: termos, mates, pavas, botellas térmicas, bolsos térmicos.
  - Outdoor: cocina, agua, camping, iluminación, carpas, bolsas de dormir.
  - Indumentaria y accesorios: prendas, bolsos, organización y accesorios de salida.

Nombres internos que no usar públicamente:
  - SAP, Route53, dashboards de sincronización y herramientas internas.
  - Decir "Comunidad Driven" cuando corresponda; evitar "Equipo Driven" si no está validado.

Puntos de servicio:
  - Web: driven.com.ar
  - Instagram: @driven.ar
  - Facebook: facebook.com/driven.ar
  - WhatsApp: +54 9 11 2608-2642 (bot)
  - Email: info@driven.com.ar

═══════════════════════════════════════
5. PÚBLICO OBJETIVO + BUYER PERSONAS
═══════════════════════════════════════
Segmentos:
  - Overlanders y usuarios 4x4 — travesías, ruta, Patagonia, Ruta 40, salidas técnicas.
  - Lifestyle aventurero — camping de fin de semana, experiencia cómoda y estética utilitaria.
  - Hobbistas de garage — mantenimiento DIY, herramientas, organización, autonomía.
  - Comercios / distribuidores — canal B2B con catálogo y condiciones pendientes de validar.

[Persona 1] Overlander Pro
  Perfil: Persona de 35-55 años, ingreso medio-alto/alto, hace travesías 4x4 técnicas y usa el equipo lejos de centros urbanos.
  Dolor: Quedarse tirado lejos o descubrir que un equipo barato falla cuando más lo necesita.
  Anhelo: Llegar y volver sin contratiempos, con equipo confiable y probado.
  Cambio emocional: Incertidumbre en ruta → tranquilidad operativa
  Diferenciador que le importa: Confiabilidad probada, garantía oficial, servicio local y presencia en Argentine Adventure.
  Objeciones:
    "¿Aguanta uso real?" → 2 años de garantía oficial + producto probado en contexto exigente.
    "¿Hay repuesto o servicio?" → Respaldo local y base física en Argentina.
    "¿Es serio o puro marketing?" → Premio Estrella del Sur, sponsor Argentine Adventure y comunidad real.
  Compra o contrata: compresor Big Boy, eslingas, bidones, cables puente, criques y duchas.
  Canal de decisión: Instagram @driven.ar, YouTube overlanding, grupos Facebook 4x4 y recomendación.

[Persona 2] Lifestyle Aventurero
  Perfil: Persona de 28-45 años, ingreso medio/medio-alto, hace camping de fin de semana y quiere verse preparado sin complicarse.
  Dolor: Improvisar, olvidarse algo importante, pasar frío o sentirse principiante.
  Anhelo: Disfrutar sin renegar y tener una salida prolija, cómoda y posteable.
  Cambio emocional: Improvisado → preparado
  Diferenciador que le importa: Practicidad, estética utilitaria genuina y facilidad de uso.
  Objeciones:
    "¿Es fácil de usar?" → Comunicar uso simple: disfrutá más, armá menos.
    "¿Vale la pena?" → Calidad real, duración y respaldo.
    "¿Queda bien?" → Mostrar estética outdoor honesta, no moda artificial.
  Compra o contrata: anafe Flamate, mate, termo, pava Red Force, sillas, mesas, bolsas de dormir y linternas.
  Canal de decisión: Instagram, TikTok outdoor pendiente validar y recomendación de amigos.

[Persona 3] Hobbista del Garage
  Perfil: Persona de 30-55 años, ingreso medio/medio-alto, tiene taller en casa, hace mantenimiento DIY y disfruta resolver solo.
  Dolor: Comprar una herramienta que se rompe al primer uso o no sirve para la tarea real.
  Anhelo: Tener un garage equipado como profesional y no depender de otros para resolver.
  Cambio emocional: Dependiente → autosuficiente
  Diferenciador que le importa: Robustez, especificación técnica clara, garantía y calidad superior al importado sin respaldo.
  Objeciones:
    "¿Se rompe rápido?" → Reforzado, hecho para usar y con garantía oficial.
    "¿Me sirve para lo mío?" → Mostrar especificación técnica, medidas y situación de uso.
    "¿Aguanta?" → Evidencia visual de uso real, materiales y prueba.
  Compra o contrata: compresores chicos/medianos, criques, cables puente, iluminación de taller y organización.
  Canal de decisión: YouTube mecánica DIY, reels how-to, Instagram y amigos mecánicos.

Resumen de campos estratégicos:
  Persona 1: dolor=fallo lejos de asistencia | anhelo=llegar y volver | cambio=incertidumbre → tranquilidad
  Persona 2: dolor=improvisar y renegar | anhelo=salida cómoda y preparada | cambio=improvisado → preparado
  Persona 3: dolor=herramienta débil | anhelo=garage autónomo | cambio=dependiente → autosuficiente

Beneficios tangibles:
  - 2 años de garantía oficial.
  - Envíos a todo el país.
  - Hasta 6 cuotas sin interés. (tarjetas y condiciones pendiente validar)
  - 10% OFF primera compra por newsletter. (vigencia pendiente validar)
  - Base física en Pergamino y respaldo local.

Beneficios intangibles:
  - Confianza antes de salir.
  - Tranquilidad de tener respaldo en Argentina.
  - Sensación de estar preparado sin vender humo.
  - Pertenencia a una comunidad de usuarios reales.

═══════════════════════════════════════
6. DIFERENCIADORES
═══════════════════════════════════════
Operativos:
  - Marca argentina con base física en Pergamino.
  - Servicio y postventa local.
  - Venta online con envíos a todo el país.
  - Distribución a comercios. (condiciones pendiente validar)

Tecnológicos / digitales:
  - Web ecommerce driven.com.ar en Tiendanube.
  - Instagram @driven.ar como canal de comunidad y conversión.
  - WhatsApp bot +54 9 11 2608-2642.
  - Gestión de stock por SAP; no publicar stock sin confirmación.

De servicio:
  - 2 años de garantía oficial.
  - Respaldo argentino frente a importados sin postventa.
  - Comunidad Driven como vínculo de cercanía.
  - Sponsor Argentine Adventure como validación de uso real.

De producto / oferta:
  - Productos robustos/reforzados para ruta, campamento y taller.
  - Líneas reconocibles: Big Boy, Flamate, Red Force y Bidón 15L.
  - Premio Estrella del Sur del Instituto Argentino del Envase por el Bidón 15L.
  - Certificaciones tipo ISO/UL/IEC mencionadas como evidencia técnica; alcance exacto pendiente validar.

Catálogo de assets disponibles:
  - [logos: pendiente subir 3/3 (original + white + black) | producto: pendiente descargar desde web | interior: NO aplica | exterior: pendiente validar | fachada: pendiente validar | otro: sponsor / premio pendiente]

═══════════════════════════════════════
7. COBERTURA Y OPERACIÓN (Opcional)
═══════════════════════════════════════
Cobertura: Argentina, con envíos a todo el país.

Base:
  Pergamino (base / operación) — José Vela 1450, Pergamino, Buenos Aires — teléfono público pendiente validar.

Canales de atención:
  - Web: driven.com.ar
  - Instagram: @driven.ar
  - Facebook: facebook.com/driven.ar
  - WhatsApp: +54 9 11 2608-2642 (bot)
  - Email: info@driven.com.ar

Horarios: (Información pendiente — requiere insumo del cliente)
Tiempos de respuesta: (Información pendiente — requiere insumo del cliente)
Condiciones de entrega / retiro: envíos a todo el país; plazos por zona AMBA, Interior y Patagonia pendiente validar.
Zonas donde no opera: (Información pendiente — requiere insumo del cliente)
Retiro / local al público: (Información pendiente — requiere insumo del cliente)

═══════════════════════════════════════
8. OFERTA COMERCIAL
═══════════════════════════════════════
Servicios:
  - Compresores Big Boy: compresores para 4x4, garage y uso exigente.
    Condiciones: especificaciones por SKU, presión, alimentación, accesorios y disponibilidad pendiente cargar.
    Normativa: certificaciones técnicas pendiente validar por producto.
    Tarifa: precio variable por SKU; no publicar sin dato SAP vigente.
  - Bidones de combustible: bidones para travesía y uso outdoor, incluyendo Bidón 15L premiado.
    Condiciones: capacidad, material, uso permitido y disponibilidad pendiente cargar.
    Tarifa: precio variable por SKU; no publicar sin dato SAP vigente.
  - Criques, cables puente, eslingas y amarres: equipamiento de rescate, emergencia y garage.
    Condiciones: carga máxima, compatibilidad y uso seguro pendiente cargar.
  - Cocinas portátiles Flamate, pavas Red Force, termos, mates y botellas térmicas: equipamiento para cocina outdoor y camping.
    Condiciones: combustible, seguridad, capacidad y accesorios pendiente cargar.
  - Camping, iluminación, organización e indumentaria: carpas, bolsas de dormir, duchas, mesas, sillas, bolsos, mochilas y accesorios.
    Condiciones: medidas, materiales, talles y disponibilidad pendiente cargar.

Procedimientos:
  - Producto nuevo: cargar SKU, nombre, precio vigente, foto 1:1, specs, beneficio principal, garantía aplicable y URL de compra.
  - Oferta: cargar vigencia exacta, precio, condición y stock validado desde SAP.
  - Garantía: cobertura exacta, requisitos, proceso y exclusiones pendiente validar.
  - Devolución: días, condiciones, quién paga el retorno y si se devuelve dinero o crédito pendiente validar.
  - Compra B2B: mínimos, condiciones, lista y logística pendiente validar.

Promos vigentes:
  - 10% OFF primera compra al suscribirse al newsletter. Vigencia pendiente validar.
  - Hasta 6 cuotas sin interés. Tarjetas y condiciones pendiente validar.

Marcas representadas: Big Boy, Flamate y Red Force son líneas/nombres de producto Driven; marcas externas pendiente validar.

═══════════════════════════════════════
9. CIFRAS CLAVE (Opcional)
═══════════════════════════════════════
  - Garantía oficial: 2 años.
  - Cuotas: hasta 6 cuotas sin interés. (condiciones pendiente validar)
  - Primera compra: 10% OFF por newsletter. (vigencia pendiente validar)
  - Cobertura: envíos a todo el país.
  - Premio: Estrella del Sur del Instituto Argentino del Envase por el Bidón 15L.
  - Sponsor: Argentine Adventure.
  - Certificaciones: ISO/UL/IEC mencionadas; alcance exacto pendiente validar.
  - Años de trayectoria: (Información pendiente — requiere insumo del cliente)
  - Cantidad de clientes / ventas / sucursales: (Información pendiente — requiere insumo del cliente)

Cifras internas que no publicar: márgenes, volúmenes de venta, stock real de SAP y datos de infraestructura.

═══════════════════════════════════════
10. CANALES Y ACTIVOS DIGITALES
═══════════════════════════════════════
Presencia digital:
  Teléfono: +54 9 11 2608-2642 (WhatsApp bot)
  WhatsApp: +54 9 11 2608-2642 (bot, no prometer humano inmediato)
  Instagram: @driven.ar
  Facebook: facebook.com/driven.ar
  TikTok: (Información pendiente — requiere insumo del cliente)
  LinkedIn: (Información pendiente — requiere insumo del cliente)
  Web: https://driven.com.ar
  Tienda online: https://driven.com.ar (Tiendanube, theme Recife)
  Portal clientes: (Información pendiente — requiere insumo del cliente)

Soporte y atención:
  Email contacto: info@driven.com.ar
  Email especializado: (Información pendiente — requiere insumo del cliente)
  Tiempo respuesta RRSS: (Información pendiente — requiere insumo del cliente)
  Tiempo respuesta email: (Información pendiente — requiere insumo del cliente)
  CRM/herramientas: SAP para stock; Route53 y sync de fotos son internos y no comunicables.

Canales que convierten mejor:
  - Instagram: canal de comunidad y alta conversión.
  - Web: cierre de compra.
  - WhatsApp: bot para derivación, no atención humana inmediata.

Handles exactos en piezas:
  @driven.ar · driven.com.ar

═══════════════════════════════════════
11. CTAS VALIDADOS
═══════════════════════════════════════
  - Equipate
  - Comprá acá
  - Probalo
  - Sumalo
  - Mirá más
  - Conocé
  - Llevalo
  - Sumate
  - Sumate a la Comunidad Driven

CTAs prohibidos:
  - Comprá YA
  - Última oportunidad
  - No te lo perdás
  - Apurate
  - Cualquier CTA con "no" en botones o microcopy.

CTA principal: Equipate
CTA para ventas: Comprá acá
CTA para awareness: Conocé / Mirá más
CTA para clientes actuales: Sumate a la Comunidad Driven

═══════════════════════════════════════
12. PERSONALIDAD, ARQUETIPO Y TONO
═══════════════════════════════════════
Arquetipo Mark/Pearson: Explorer
Justificación: Driven habla a personas que buscan libertad, salida, ruta, campamento y autosuficiencia. Su promesa es equipar para ir más allá con confianza real.

Arquetipos secundarios: Creator / Hero
Justificación secundaria: Creator aparece en la autosuficiencia del garage y el armado propio; Hero aparece en la resistencia del equipo y la capacidad de resolver en condiciones exigentes.

Manifestación del arquetipo en la marca:
Driven se expresa en ruta, ripio, campamento, taller y situaciones donde el usuario pone el equipo a prueba. La marca no necesita verse lujosa: necesita verse preparada. La imagen debe mostrar producto real, manos, materiales, polvo, metal, fuego, agua, carga, uso y contexto argentino genuino.

Personalidad narrativa: Persona directa, práctica, de 35-45 años, usa el equipo de verdad, habla con vos, sabe de producto sin ponerse soberbia y transmite confianza sin vender humo.

Tono de voz:
  - Directo — dice qué es, para qué sirve y por qué conviene.
  - Experto — aporta especificación o evidencia cuando hace falta.
  - Cercano — habla en español argentino con vos, sin solemnidad.
  - Funcional-emocional — 70% utilidad, 30% confianza/tranquilidad.
  - Seguro — no exagera ni necesita gritar urgencia.

Directivas para generación de contenido:
  - Siempre: reforzar calidad real + respaldo argentino.
  - Siempre: mostrar producto, uso real o beneficio concreto.
  - Siempre: recordar garantía/servicio local cuando aplique y esté validado.
  - Siempre: separar comunicación B2C, B2B y comunidad.
  - Nunca: inventar precios, stock, envíos, plazos, cuotas o cobertura de garantía.
  - Nunca: usar superlativos vacíos, lujo minimalista, modelos profesionales o stock genérico.
  - Nunca: prometer atención humana inmediata en web/WhatsApp.

Palabras clave de marca:
  equipate, te banca, uso real, calidad de verdad, hecho para usar, robusto, reforzado, confiable, respaldo argentino, comunidad, vamos más allá, probado

Lo que la marca NO es:
  - NO es lifestyle aspiracional vacío / SI es outdoor argentino genuino
  - NO es lujo minimalista / SI es equipamiento robusto y usable
  - NO es promo agresiva / SI es compra con motivo claro
  - NO es tech corporativo / SI es ruta, taller, campamento y comunidad

Vocabulario visual canónico (Opcional — base inicial hasta cargar assets reales):
  Léxico narrativo recurrente — palabras-imagen que activan el ADN visual de la marca en cualquier brief de creatividad:
  - Anchors propios: producto héroe, sello 2 años garantía, Comunidad Driven, Argentine Adventure, Estrella del Sur, Big Boy, Flamate, Red Force, Bidón 15L
  - Geografía: ruta argentina, ripio, Patagonia, Ruta 40, Pergamino, campamento, taller, garage
  - Texturas: metal, plástico mate, lona, polvo, barro, goma, fuego, madera, cartón de envío
  - Luces: luz natural, luz de taller, fogón, daylight neutro, contraste medio
  - Iconografía: garantía, envío, cuotas, comunidad, herramienta, ruta, check de respaldo
  - Ángulos: producto frontal 1:1, detalle macro de materiales, gran angular en uso real, mano usando producto

Datos pendientes que bloquean copy con promesas:
  - Cobertura exacta de garantía.
  - Días y condiciones de devolución.
  - Quién paga retorno y si se devuelve dinero o crédito.
  - Plazos de envío por zona.
  - Qué tarjetas aplican para 6 cuotas.
  - Vigencia del 10% OFF.
  - URLs de Términos y Condiciones / Privacidad.
  - Confirmación de Facundo Arana como referente comunicable.
$ana_ficha$,
  '{}'::jsonb,
  1
)
on conflict (brand_id) do update set
  content = excluded.content,
  format_meta = excluded.format_meta,
  active_version = excluded.active_version,
  updated_at = now();

insert into public.brand_ficha_versions (brand_id, version, content, format_meta)
select brand_id, 1, content, format_meta
from public.brand_fichas
where brand_id = (select id from public.brands where code = 'DRV')
on conflict (brand_id, version) do update set
  content = excluded.content,
  format_meta = excluded.format_meta;

insert into public.creatives (id, brand_id, kind, status, format, title, headline, subhead, copy, caption, visual_cue, palette, tags, pipeline)
values
  (701, (select id from public.brands where code = 'DRV'), 'cover', 'para revision', 'Feed 4:5', 'Big Boy uso real', 'EQUIPATE PARA TODO.', 'Te banca en el uso real.', 'Una pieza base para presentar producto real, respaldo argentino y CTA sin prometer stock/precio.', 'Compresor Big Boy como producto héroe: ruta, garage y respaldo local. Falta cargar foto real, precio vigente y URL.', 'Compresor protagonista sobre fondo verde oscuro, textura de ruta/garage, sello 2 años garantía y CTA Equipate.', '#1F2A24', array['Producto','4x4','Garantía'], '[{"title":"Idea","body":"Crear template de producto héroe para Big Boy y línea 4x4."},{"title":"Ancla en ficha","body":"DIM-03 posicionamiento: calidad real + respaldo argentino. DIM-05 Overlander Pro."},{"title":"Pendiente","body":"Reemplazar placeholder por foto real, precio SAP y URL de compra."}]'::jsonb),
  (702, (select id from public.brands where code = 'DRV'), 'carrusel', 'borrador', 'Carrusel', 'Elegí con datos', 'ELEGÍ CON DATOS.', 'Uso, specs y respaldo.', 'Uso real, especificación clara y garantía validada. Tres datos para comprar mejor.', 'Carrusel educativo para bajar objeciones sin atacar competencia ni inventar promesas.', 'Tres placas: uso real, detalle técnico, respaldo local; estética beige/verde con producto recortado.', '#A07D5D', array['Educativo','Specs','Objeción'], '[{"title":"Idea","body":"Bajar objeción ¿aguanta uso real? con datos simples."},{"title":"Ancla en ficha","body":"DIM-05 Overlander Pro + Hobbista del Garage."},{"title":"Pendiente","body":"Definir producto/categoría y specs exactas."}]'::jsonb),
  (703, (select id from public.brands where code = 'DRV'), 'ugc', 'borrador', 'Story 9:16', 'Uso en garage', 'LISTO PARA USAR.', 'Probalo en tu taller.', 'UGC simple: una mano muestra el producto en garage real y remarca robustez sin promesas no validadas.', 'Para hobbistas del garage: especificación visible, uso real y CTA corto.', 'Celular vertical, mano usando producto en taller, anotaciones sobrias en amarillo industrial.', '#F5C518', array['UGC','Garage','Uso real'], '[{"title":"Concepto UGC","body":"Convertir el uso real en prueba de robustez."},{"title":"Ancla en ficha","body":"DIM-05 Hobbista del Garage: de dependiente a autosuficiente."},{"title":"Pendiente","body":"Cargar producto real y validar specs."}]'::jsonb)
on conflict (id) do update set
  status = excluded.status,
  title = excluded.title,
  headline = excluded.headline,
  subhead = excluded.subhead,
  copy = excluded.copy,
  caption = excluded.caption,
  visual_cue = excluded.visual_cue,
  palette = excluded.palette,
  tags = excluded.tags,
  pipeline = excluded.pipeline,
  updated_at = now();

insert into public.ideas (id, brand_id, status, title, category, skill, trigger, phrases, anchor, notes, sort_order)
values
  ('D1', (select id from public.brands where code = 'DRV'), 'usada', 'Big Boy uso real', '4x4', 'S8 - oferta comercial', 'Crear primera cover de producto para Big Boy: compresor, ruta, garage y respaldo local.', array['EQUIPATE PARA TODO.','Te banca en el uso real.','Listo para la ruta.'], 'DIM-03 calidad real + DIM-05 Overlander Pro', 'Funciona como molde editable hasta cargar foto real, precio SAP y URL.', 1),
  ('D2', (select id from public.brands where code = 'DRV'), 'disponible', 'Elegí con datos', 'Objeción', 'S5 - buyer persona', 'Atacar la duda ¿aguanta uso real? con specs, materiales, garantía y contexto.', array['ELEGÍ CON DATOS.','Uso, specs y respaldo.','Hecho para usar.'], 'DIM-05 Overlander Pro + Hobbista del Garage', 'Ideal para carrusel educativo por producto/categoría.', 2),
  ('D3', (select id from public.brands where code = 'DRV'), 'disponible', 'Comunidad Driven', 'Comunidad', 'S12 - tono', 'Mostrar que la marca vive en usuarios reales: ruta, campamento, garage, salida y prueba.', array['SUMATE A LA COMUNIDAD.','Vamos más allá.','Probado en uso real.'], 'DIM-12 Explorer + DIM-06 comunidad/respaldo', 'Usar sin modelos profesionales ni stock genérico.', 3)
on conflict (brand_id, id) do update set
  status = excluded.status,
  title = excluded.title,
  category = excluded.category,
  skill = excluded.skill,
  trigger = excluded.trigger,
  phrases = excluded.phrases,
  anchor = excluded.anchor,
  notes = excluded.notes,
  sort_order = excluded.sort_order;

insert into public.requirements (id, brand_id, date_label, status, title, detail, asset)
values
  (101, (select id from public.brands where code = 'DRV'), '28-may, 00:15', 'pendiente', 'Validar datos comerciales críticos', 'Cobertura de garantía, devoluciones, plazos por zona, tarjetas de 6 cuotas, vigencia 10% OFF, TyC/Privacidad y Facundo Arana.', '8'),
  (102, (select id from public.brands where code = 'DRV'), '28-may, 00:15', 'pendiente', 'Subir logos Driven', 'Faltan logo original, logo white-knockout, logo black-knockout e isotipo si existe.', 'LOGO'),
  (103, (select id from public.brands where code = 'DRV'), '28-may, 00:15', 'pendiente', 'Subir assets de producto', 'Prioridad: Big Boy, Flamate, Red Force, Bidón 15L, Argentine Adventure y Estrella del Sur.', 'IMG'),
  (104, (select id from public.brands where code = 'DRV'), '28-may, 00:15', 'pendiente', 'Importar catálogo/SAP', 'Sin SKU, precio, stock y URL no se deben publicar piezas comerciales con promesas concretas.', 'SAP')
on conflict (id) do update set
  brand_id = excluded.brand_id,
  status = excluded.status,
  title = excluded.title,
  detail = excluded.detail,
  asset = excluded.asset;

select setval(pg_get_serial_sequence('public.requirements','id'), greatest((select max(id) from public.requirements), 1));

insert into public.publications (id, brand_id, creative_id, date, day, time, channel, format, status, title)
values
  (701, (select id from public.brands where code = 'DRV'), 701, '2026-06-03', 3, '10:00', 'Instagram', 'Feed 4:5', 'borrador', 'Big Boy uso real'),
  (702, (select id from public.brands where code = 'DRV'), 702, '2026-06-06', 6, '12:00', 'Instagram', 'Carrusel', 'borrador', 'Elegí con datos')
on conflict (id) do update set
  creative_id = excluded.creative_id,
  date = excluded.date,
  day = excluded.day,
  time = excluded.time,
  channel = excluded.channel,
  format = excluded.format,
  status = excluded.status,
  title = excluded.title;

insert into public.audit_items (code, brand_id, title, status, category, note)
values
  ('M1', (select id from public.brands where code = 'DRV'), 'Ficha Driven 12D actualizada', 'aplicado', 'Marca', 'Ya incluye razón social, sede, canales, arquetipo Explorer y buyer personas.'),
  ('M2', (select id from public.brands where code = 'DRV'), 'Promesas comerciales pendientes', 'critico', 'Marca', 'Garantía exacta, devoluciones, plazos, tarjetas, vigencia 10% OFF y Facundo Arana siguen pendientes.'),
  ('C1', (select id from public.brands where code = 'DRV'), 'Ideas alineadas a outdoor real', 'aplicado', 'Contenido', 'Big Boy, uso real, datos técnicos y Comunidad Driven.'),
  ('P1', (select id from public.brands where code = 'DRV'), 'Falta catálogo/SAP', 'critico', 'Performance', 'Sin SKU, precios, stock y URLs no se publican campañas con promesa comercial.'),
  ('X1', (select id from public.brands where code = 'DRV'), 'Assets críticos pendientes', 'pendiente', 'Conversión', 'Logo 3 variantes + productos héroe + premios/sponsor.')
on conflict (brand_id, code) do update set
  title = excluded.title,
  status = excluded.status,
  category = excluded.category,
  note = excluded.note;
