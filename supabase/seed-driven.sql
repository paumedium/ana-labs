-- Ana Labs seed inicial: DRV / Driven
-- Aplicar después de supabase/schema.sql desde Supabase SQL Editor.

insert into public.brands (code, name, slug, slogan, crs, assets_count, users_count, socials, status)
values (
  'DRV',
  'Driven',
  'driven',
  'Equipate para todo',
  4,
  9,
  1,
  '{"web":"https://driven.com.ar","instagram":"https://instagram.com/driven.ar","facebook":"https://facebook.com/driven.ar","tiktok":"https://tiktok.com/@driven.ar"}'::jsonb,
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
  ((select id from public.brands where code = 'DRV'), 'anapaula@driven.com.ar', 'admin', 'activo', 'seed', 'hoy')
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
12 dimensiones — Generado por Ana Labs — 2026-05-27
Fuentes: datos existentes en Ana Labs mock-data.ts, dominio informado driven.com.ar, Supabase Driven pendiente de importación

═══════════════════════════════════════
1. IDENTIDAD CORPORATIVA
═══════════════════════════════════════
Nombre comercial: Driven
Razón social: (Información pendiente — requiere insumo del cliente)
Slogan: "Equipate para todo"
Fundación: (Información pendiente — requiere insumo del cliente)
Sede: Argentina (ciudad y provincia pendientes de validar)
Gerente General: (Información pendiente — requiere insumo del cliente)
Sector: ecommerce / retail / distribución de productos y equipamiento (pendiente validar con cliente)
Alcance geográfico: operación digital con alcance nacional potencial; cobertura real pendiente de importar desde Supabase Driven.

═══════════════════════════════════════
2. PROPÓSITO
═══════════════════════════════════════
Misión: Ayudar a las personas a resolver sus compras de equipamiento con una experiencia simple, clara y confiable, reduciendo fricción entre necesidad, producto y entrega. (propuesta — pendiente validar)

Visión: Convertirse en una marca digital de referencia para quienes buscan productos útiles, seleccionados y fáciles de comprar, con una operación ordenada detrás de cada venta. (propuesta — pendiente validar)

Valores:
  - Claridad — información de producto, precio y disponibilidad sin vueltas.
  - Utilidad — cada producto debe resolver una necesidad concreta.
  - Confianza — compra simple, canales visibles y seguimiento responsable.
  - Ritmo comercial — campañas activas, oferta clara y respuesta rápida.

═══════════════════════════════════════
3. POSICIONAMIENTO ESTRATÉGICO
═══════════════════════════════════════
Definición: Driven es una marca comercial digital orientada a productos útiles y equipamiento, con comunicación directa y foco en conversión. (pendiente validar)

Propuesta de valor: "Driven simplifica la compra de equipamiento: productos claros, oferta directa y una experiencia pensada para resolver."

Propuesta por unidad:
  - Ecommerce / tienda digital: compra directa, catálogo navegable y foco en disponibilidad.
  - Campañas comerciales: productos destacados, bundles, lanzamientos y promociones de temporada.
  - Atención por canales digitales: consultas rápidas, derivación a WhatsApp y seguimiento comercial.

Elevator pitch: "Driven vende equipamiento útil para personas que quieren resolver una compra sin perder tiempo. La marca debe comunicar con claridad qué ofrece, por qué conviene y cómo comprar, usando piezas visuales simples, orientadas a producto y con CTAs directos."

Claim principal: "Equipate para todo"

Claims secundarios:
  - "Lo que necesitás, listo para salir."
  - "Productos útiles. Compra simple."
  - "Elegí, consultá y resolvé."
  - "Equipamiento claro para planes reales."

Posición competitiva:
                 Compra guiada / clara
                         ↑
              Driven     │   Tiendas digitales curadas
                         │
Oferta útil       ←──────┼──────→ Oferta aspiracional
                         │
 Catálogos masivos       │   Marcas lifestyle premium
                         ↓
                 Compra dispersa / genérica

═══════════════════════════════════════
4. ARQUITECTURA DE MARCA (Opcional)
═══════════════════════════════════════
Estructura: marca única en esta primera carga.

Unidades posibles a validar:
  - Tienda online: catálogo, producto destacado y compra directa.
  - Mayorista / distribuidores: condiciones comerciales, listas y atención B2B. (pendiente validar)
  - Contenido / social commerce: reels, covers, carruseles y UGC orientados a producto.

Puntos de servicio:
  - Web: driven.com.ar (pendiente validar URL final activa)
  - Instagram: @driven.ar (pendiente validar)
  - Facebook / TikTok: canales informados en mock-data.ts, pendientes de validar.

═══════════════════════════════════════
5. PÚBLICO OBJETIVO + BUYER PERSONAS
═══════════════════════════════════════
Segmentos:
  - Comprador final digital — personas que buscan resolver una compra concreta con poca fricción.
  - Comprador recurrente / fan de categoría — personas que siguen novedades, promociones y lanzamientos.
  - Comprador B2B / revendedor — negocios o emprendedores que necesitan catálogo, precio y disponibilidad. (pendiente validar)

[Persona 1] Cliente que quiere resolver rápido
  Perfil: Hombre o mujer, 25-45 años, compra online desde el celular, compara precios y necesita entender rápido si el producto le sirve.
  Dolor: Se pierde en catálogos largos, fichas poco claras o publicaciones que muestran estética pero no explican uso.
  Anhelo: Encontrar el producto correcto, entender el beneficio y comprar sin vueltas.
  Cambio emocional: Duda y comparación eterna → decisión clara y compra resuelta
  Diferenciador que le importa: Producto explicado en lenguaje simple, foto clara, precio visible y CTA directo.
  Objeciones:
    "No sé si esto me sirve" → Mostrar uso concreto, medida, compatibilidad y situación real.
    "Capaz lo consigo más barato" → Comunicar valor total: disponibilidad, atención y compra simple.
    "No confío en la tienda" → Mostrar canales, políticas y señales de operación real.

[Persona 2] Comprador de oportunidad
  Perfil: 20-40 años, sigue redes, reacciona a ofertas y productos destacados, compra cuando entiende que hay conveniencia.
  Dolor: Ve muchas promociones iguales y no sabe cuál vale la pena.
  Anhelo: Encontrar una oportunidad concreta sin sentir que está cayendo en una promo vacía.
  Cambio emocional: Promoción genérica → hallazgo útil con motivo para comprar hoy
  Diferenciador que le importa: Oferta simple, producto protagonista y urgencia controlada.
  Objeciones:
    "¿Es una oferta real?" → Mostrar precio anterior / condición / beneficio con datos verificables.
    "Lo pienso después" → CTA corto y recordatorio visual de utilidad.
    "No era lo que buscaba" → Segmentar por situación de uso, no solo por producto.

[Persona 3] Revendedor / comprador B2B
  Perfil: Emprendedor, comercio o revendedor que necesita catálogo confiable, margen, stock y respuesta rápida. (pendiente validar)
  Dolor: Pierde tiempo pidiendo listas, condiciones o stock en canales desordenados.
  Anhelo: Tener proveedor claro, rápido y con material que facilite vender.
  Cambio emocional: Proveedor incierto → catálogo ordenado y respuesta comercial
  Diferenciador que le importa: Lista clara, condiciones visibles, assets de producto y atención por WhatsApp.
  Objeciones:
    "No sé si hay stock" → Confirmar disponibilidad antes de prometer.
    "No tengo material para vender" → Entregar fotos, copies y argumentos por producto.
    "Necesito condiciones" → Documentar mínimos, descuentos y logística. (pendiente validar)

Resumen de campos estratégicos:
  Persona 1: dolor=catálogo confuso | anhelo=resolver rápido | cambio=duda → decisión clara
  Persona 2: dolor=promos iguales | anhelo=oportunidad útil | cambio=scroll → compra con motivo
  Persona 3: dolor=proveedor desordenado | anhelo=catálogo confiable | cambio=incertidumbre → operación clara

Beneficios tangibles:
  - Catálogo digital editable y escalable.
  - CTAs claros hacia web, WhatsApp o canal de compra.
  - Creatividades por producto, oferta y temporada.

Beneficios intangibles:
  - Sensación de compra resuelta.
  - Confianza por claridad operativa.
  - Marca directa, útil y sin sobrepromesa.

═══════════════════════════════════════
6. DIFERENCIADORES
═══════════════════════════════════════
Operativos:
  - Marca preparada para comunicación de catálogo, ofertas y productos destacados.
  - Enfoque en conversión: cada pieza debe explicar qué comprar y por qué ahora.

Tecnológicos / digitales:
  - Presencia web informada: driven.com.ar (pendiente validar).
  - Canales sociales informados: Instagram, Facebook y TikTok (pendiente validar).
  - Base de datos histórica en Supabase Driven pendiente de importación.

De servicio:
  - Atención digital como parte central del recorrido de compra.
  - Potencial de derivación a WhatsApp para consultas y cierre. (pendiente validar)

De producto / oferta:
  - Catálogo por categorías, productos héroe y campañas comerciales.
  - Promociones y bundles posibles una vez importado el inventario real.

Catálogo de assets disponibles:
  - [logos: pendiente | producto: pendiente | lifestyle: pendiente | UGC: pendiente | catálogo: pendiente]

═══════════════════════════════════════
7. COBERTURA Y OPERACIÓN (Opcional)
═══════════════════════════════════════
Cobertura: (Información pendiente — requiere importación de Supabase Driven o validación del cliente)

Canales operativos iniciales:
  - Web: driven.com.ar (pendiente validar)
  - Instagram: @driven.ar (pendiente validar)
  - WhatsApp: (Información pendiente — requiere insumo del cliente)

Horarios: (Información pendiente — requiere insumo del cliente)

═══════════════════════════════════════
8. OFERTA COMERCIAL
═══════════════════════════════════════
Servicios:
  - Venta online de productos / equipamiento: catálogo digital con producto, precio, descripción, disponibilidad y CTA.
    Condiciones: categorías, stock, medios de pago, envíos, cambios y garantías pendientes de validar.
    Normativa: políticas comerciales y legales pendientes de cargar.
    Tarifa: precios pendientes de importar desde catálogo real.
  - Campañas por producto destacado: covers, carruseles y piezas UGC para explicar uso, beneficio y oferta.
    Condiciones: requiere foto real, precio, SKU y disponibilidad.
  - Comunicación mayorista / B2B: lista, condiciones comerciales y assets para revendedores. (pendiente validar)
    Condiciones: mínimo de compra, margen y logística pendientes de validar.

Procedimientos:
  - Producto nuevo: cargar nombre, precio, foto, beneficio principal, objeción típica y CTA.
  - Oferta: cargar precio vigente, fecha de inicio/fin y condición exacta.
  - Requerimiento de campaña: cargar producto protagonista, objetivo comercial, canal y deadline.

Marcas representadas: (Información pendiente — requiere insumo del cliente)

═══════════════════════════════════════
9. CIFRAS CLAVE (Opcional)
═══════════════════════════════════════
  - Productos activos: (Información pendiente — requiere importación de catálogo)
  - Categorías: (Información pendiente — requiere importación de catálogo)
  - Ticket promedio: (Información pendiente — requiere insumo del cliente)
  - Canales activos: web, Instagram, Facebook, TikTok (pendiente validar)

═══════════════════════════════════════
10. CANALES Y ACTIVOS DIGITALES
═══════════════════════════════════════
Presencia digital:
  Teléfono: (Información pendiente — requiere insumo del cliente)
  WhatsApp: (Información pendiente — requiere insumo del cliente)
  Instagram: @driven.ar (pendiente validar)
  Facebook: driven.ar (pendiente validar)
  Web: driven.com.ar (pendiente validar)
  Tienda online: driven.com.ar (pendiente validar)
  Portal clientes: (Información pendiente — requiere insumo del cliente)

Soporte y atención:
  Email contacto: (Información pendiente — requiere insumo del cliente)
  Email especializado: (Información pendiente — requiere insumo del cliente)
  Tiempo respuesta RRSS: (Información pendiente — requiere insumo del cliente)
  Tiempo respuesta email: (Información pendiente — requiere insumo del cliente)
  CRM/herramientas: Supabase Driven pendiente de importación.

═══════════════════════════════════════
11. CTAS VALIDADOS
═══════════════════════════════════════
  - Comprá online
  - Consultá disponibilidad
  - Pedilo por WhatsApp
  - Ver catálogo
  - Quiero precio mayorista
  - Armá tu pedido
  - Ver productos destacados
  - Escribinos

═══════════════════════════════════════
12. PERSONALIDAD, ARQUETIPO Y TONO
═══════════════════════════════════════
Arquetipo Mark/Pearson: Everyman
Justificación: La marca debe sentirse útil, cercana y orientada a resolver compras reales, no a construir distancia aspiracional. (pendiente validar)

Manifestación del arquetipo en la marca:
Driven aparece como una marca directa: muestra producto, uso y motivo de compra. La pieza ideal no promete transformación abstracta; deja claro qué se puede resolver con ese producto. La estética debe combinar producto protagonista, información limpia y señales de compra confiable.

Personalidad narrativa: Persona práctica, de 30-40 años, habla claro, recomienda sin exagerar, muestra el producto en uso y responde rápido. No se pone solemne ni técnica cuando puede explicar simple.

Tono de voz:
  - Directo — dice qué es, para qué sirve y cómo comprar.
  - Útil — prioriza beneficio concreto sobre adjetivo aspiracional.
  - Cercano — usa lenguaje cotidiano y evita jerga.
  - Comercial disciplinado — puede vender, pero sin gritar ni saturar.

Directivas para generación de contenido:
  - Siempre: mostrar producto, uso o beneficio concreto.
  - Siempre: incluir CTA claro y accionable.
  - Siempre: distinguir B2C y B2B cuando el brief lo requiera.
  - Nunca: inventar precios, stock, envíos, descuentos o marcas representadas.
  - Nunca: usar tono lujo premium si el diferencial es utilidad y resolución.

Palabras clave de marca:
  equipate, resolvé, catálogo, producto, disponibilidad, oferta, compra simple, útil

Lo que la marca NO es:
  - NO es aspiracional vacío / SI es compra útil y directa
  - NO es catálogo caótico / SI es selección clara
  - NO es promo agresiva / SI es oportunidad explicada

Vocabulario visual canónico (Opcional — base inicial pendiente de assets reales):
  Léxico narrativo recurrente — palabras-imagen que activan el ADN visual de la marca en cualquier brief de creatividad:
  - Anchors propios: producto héroe, etiqueta de precio, caja de envío, pantalla de catálogo, mano usando producto
  - Geografía: contexto cotidiano argentino, interior de casa, comercio, viaje corto, plan de fin de semana
  - Texturas: plástico mate, metal, tela técnica, cartón de envío, fondo limpio
  - Luces: luz de ecommerce clara, daylight neutro, sombra suave
  - Iconografía: carrito, WhatsApp, etiqueta, check de stock, rayo de oferta
  - Ángulos: producto frontal, 3/4, detalle macro, uso en mano
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
on conflict (brand_id, version) do nothing;

insert into public.creatives (id, brand_id, kind, status, format, title, headline, subhead, copy, caption, visual_cue, palette, tags, pipeline)
values
  (701, (select id from public.brands where code = 'DRV'), 'cover', 'para revision', 'Feed 4:5', 'Producto héroe', 'Equipate para todo.', 'Producto claro. Compra simple.', 'Una pieza base para mostrar producto, beneficio y CTA sin humo.', 'Driven necesita que cada publicación responda rápido: qué es, para qué sirve y cómo comprar.', 'Producto protagonista sobre fondo limpio, etiqueta de precio discreta, icono de WhatsApp y CTA directo.', '#1D3557', array['Producto','Ecommerce','Base'], '[{"title":"Idea","body":"Crear template de producto héroe para cargar catálogo real de Driven."},{"title":"Ancla en ficha","body":"DIM-03 posicionamiento: compra clara. DIM-12 tono directo y útil."},{"title":"Pendiente","body":"Reemplazar producto mock por foto real, precio y disponibilidad."}]'::jsonb),
  (702, (select id from public.brands where code = 'DRV'), 'carrusel', 'borrador', 'Carrusel', 'Cómo elegir', 'No compres a ciegas.', 'Tres datos antes de decidir.', 'Uso, medida y disponibilidad. Si esos tres datos están claros, la compra avanza.', 'Carrusel educativo para bajar dudas y ordenar el catálogo.', 'Tres placas limpias: uso real, detalle técnico, CTA final hacia catálogo.', '#2A9D8F', array['Educativo','Catálogo','Conversión'], '[{"title":"Idea","body":"Bajar objeción de compra explicando criterios simples."},{"title":"Ancla en ficha","body":"DIM-05 cliente que quiere resolver rápido."},{"title":"Pendiente","body":"Definir categoría inicial del catálogo."}]'::jsonb),
  (703, (select id from public.brands where code = 'DRV'), 'ugc', 'borrador', 'Story 9:16', 'Consulta por WhatsApp', '¿Hay stock?', 'Te lo confirmamos antes de comprar.', 'UGC simple: alguien muestra el producto, pregunta disponibilidad y cierra por WhatsApp.', 'Para productos donde la duda frena la compra.', 'Persona grabando con celular, producto en mano, overlay manuscrito con pregunta real.', '#E9C46A', array['UGC','WhatsApp','Objeción'], '[{"title":"Concepto UGC","body":"Convertir una duda común en mecanismo de confianza."},{"title":"Ancla en ficha","body":"DIM-05 objeción: no sé si hay stock."},{"title":"Pendiente","body":"Cargar teléfono/WhatsApp real."}]'::jsonb)
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
  ('D1', (select id from public.brands where code = 'DRV'), 'usada', 'Producto héroe base', 'Producto', 'S8 - oferta comercial', 'Crear primera cover de producto para que Driven no arranque vacío.', array['Equipate para todo.','Producto claro. Compra simple.','Lo que necesitás, listo para salir.'], 'DIM-03 posicionamiento + DIM-12 tono directo', 'Funciona como molde editable hasta importar catálogo real.', 1),
  ('D2', (select id from public.brands where code = 'DRV'), 'disponible', 'No compres a ciegas', 'Objeción', 'S5 - buyer persona', 'Atacar la duda de compra con datos simples: uso, medida y disponibilidad.', array['No compres a ciegas.','Tres datos antes de decidir.','Si está claro, se compra mejor.'], 'DIM-05 Persona 1 · cliente que quiere resolver rápido', 'Ideal para carrusel educativo por categoría.', 2),
  ('D3', (select id from public.brands where code = 'DRV'), 'disponible', 'Quiero precio mayorista', 'B2B', 'S11 - CTA validado', 'Abrir puerta B2B sin inventar condiciones comerciales todavía.', array['Quiero precio mayorista.','Armá tu pedido.','Catálogo claro para vender mejor.'], 'DIM-05 Persona 3 · revendedor / comprador B2B', 'Se completa cuando llegue el Supabase Driven con listas y condiciones.', 3)
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
  (101, (select id from public.brands where code = 'DRV'), '27-may, 22:45', 'pendiente', 'Importar datos reales de Supabase Driven', 'Faltan tablas/export del Supabase original para traer catálogo, productos, usuarios y reglas comerciales.', 'DB'),
  (102, (select id from public.brands where code = 'DRV'), '27-may, 22:45', 'pendiente', 'Validar ficha 12D base', 'La ficha inicial está marcada con pendientes para no inventar datos factuales.', '12D'),
  (103, (select id from public.brands where code = 'DRV'), '27-may, 22:45', 'pendiente', 'Subir assets de producto', 'Cargar logo, fotos de productos héroe, precios vigentes y URLs de compra.', 'IMG')
on conflict (id) do update set
  brand_id = excluded.brand_id,
  status = excluded.status,
  title = excluded.title,
  detail = excluded.detail,
  asset = excluded.asset;

select setval(pg_get_serial_sequence('public.requirements','id'), greatest((select max(id) from public.requirements), 1));

insert into public.publications (id, brand_id, creative_id, date, day, time, channel, format, status, title)
values
  (701, (select id from public.brands where code = 'DRV'), 701, '2026-06-03', 3, '10:00', 'Instagram', 'Feed 4:5', 'borrador', 'Producto héroe base'),
  (702, (select id from public.brands where code = 'DRV'), 702, '2026-06-06', 6, '12:00', 'Instagram', 'Carrusel', 'borrador', 'No compres a ciegas')
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
  ('M1', (select id from public.brands where code = 'DRV'), 'Ficha 12D base creada', 'aplicado', 'Marca', 'Existe una ficha editable para empezar a trabajar sin esperar el import.'),
  ('M2', (select id from public.brands where code = 'DRV'), 'Datos factuales pendientes', 'critico', 'Marca', 'Razón social, contacto, cobertura, precios, catálogo y condiciones deben venir del cliente o Supabase Driven.'),
  ('C1', (select id from public.brands where code = 'DRV'), 'Primeras ideas creadas', 'aplicado', 'Contenido', 'Producto héroe, objeción de compra y B2B mayorista.'),
  ('P1', (select id from public.brands where code = 'DRV'), 'Falta catálogo real', 'critico', 'Performance', 'Sin productos reales no se puede medir conversión ni publicar campañas reales.'),
  ('X1', (select id from public.brands where code = 'DRV'), 'Requerimientos activos', 'pendiente', 'Conversión', 'El tablero ya muestra qué falta pedir para completar la marca.')
on conflict (brand_id, code) do update set
  title = excluded.title,
  status = excluded.status,
  category = excluded.category,
  note = excluded.note;
