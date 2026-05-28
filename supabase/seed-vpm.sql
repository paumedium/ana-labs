-- Ana Labs seed inicial: VPM / Vermouth Pedro y Mateo
-- Aplicar después de supabase/schema.sql desde Supabase SQL Editor.

insert into public.brands (code, name, slug, slogan, parent, crs, assets_count, users_count, socials, status)
values (
  'VPM',
  'Vermouth Pedro y Mateo',
  'vermouth-pedro-y-mateo',
  'Pedro y Mateo. El antes.',
  'Casa Sarria',
  12,
  18,
  3,
  '{"instagram":"https://instagram.com/vermouthpedroymateo","whatsapp":"https://wa.me/5492477329612"}'::jsonb,
  'active'
)
on conflict (code) do update set
  name = excluded.name,
  slug = excluded.slug,
  slogan = excluded.slogan,
  parent = excluded.parent,
  crs = excluded.crs,
  assets_count = excluded.assets_count,
  users_count = excluded.users_count,
  socials = excluded.socials,
  updated_at = now();

insert into public.brand_members (brand_id, email, role, status, invited_label, last_access_label)
values
  ((select id from public.brands where code = 'VPM'), 'paumedium@gmail.com', 'admin', 'activo', 'seed', 'hoy'),
  ((select id from public.brands where code = 'VPM'), 'anapaula@driven.com.ar', 'admin', 'activo', 'seed', 'hoy'),
  ((select id from public.brands where code = 'VPM'), 'eduardo@casasarria.com', 'cliente', 'sin confirmar', 'pendiente', '-')
on conflict (brand_id, email) do update set
  role = excluded.role,
  status = excluded.status,
  invited_label = excluded.invited_label,
  last_access_label = excluded.last_access_label;

insert into public.brand_fichas (brand_id, content, format_meta, active_version)
values (
  (select id from public.brands where code = 'VPM'),
  $ana_ficha$
FICHA DE MARCA INTEGRAL — VERMOUTH PEDRO Y MATEO
Pedro y Mateo. El antes.
12 dimensiones — Generado por Ana Labs — 2026-05-25
Fuentes: ficha_marca_pedro_y_mateo respuestas (Eduardo Sarrio, mayo 2026), estrategia de crecimiento por anillos concéntricos (Casa Sarria, 2026), Instagram @vermouthpedroymateo

═══════════════════════════════════════
1. IDENTIDAD CORPORATIVA
═══════════════════════════════════════
Nombre comercial: Pedro y Mateo
Razón social: Eduardo Sarrio (persona física titular del proyecto Casa Sarria, paraguas de las marcas Session Beer, Pedro y Mateo y Granero Sur)
CUIT: 20-26662657-7
Slogan: "Pedro y Mateo. El antes."
Fundación: 2024 — lanzamiento oficial en Expo Vinos (2 años al 2026)
Casa paraguas: Casa Sarria — consolidación formal reciente, junto con Session Beer (marca insignia, 10 años de operación) y Granero Sur (whisky, lanzamiento julio 2026)
Sede: Marcelino Ugarte 1122, Pergamino, Provincia de Buenos Aires, Argentina
Gerente General: Eduardo Sarrio — el apellido familiar (origen español, Sarria/Sarrio) da nombre al paraguas Casa Sarria y constituye el ADN identitario del proyecto
Sector: Bebidas alcohólicas — vermouth Torino Rosso premium artesanal
Alcance geográfico: Pergamino + vinotecas premium locales (Anillo 1, jun-sep 2026) → radio 200 km Junín / San Nicolás / Salto / Arrecifes / Colón / Rojas / San Pedro (Anillo 2, oct 2026 - mar 2027) → CABA + GBA norte (Anillo 3, abr 2027 en adelante)

═══════════════════════════════════════
2. PROPÓSITO
═══════════════════════════════════════
Misión: Hacer vermouth como se hacía antes. Con tiempo, oficio y la convicción de que algunas cosas no se apuran. Pedro y Mateo nace en Pergamino para devolverle al ritual del aperitivo el lugar que merece: el rato que separa la rutina de lo que importa.

Visión: Ser el vermouth argentino que define el antes. La elección natural de quien entiende que el aperitivo no es trámite, es ceremonia. Que Pedro y Mateo —junto con Session Beer y Granero Sur— consolide a Casa Sarria como una casa de bebidas argentinas hecha en Pergamino y reconocida por la paciencia con la que trabaja.

Valores:
  - Paciencia — 49 días de maceración. 12 botánicos. Una receta que no se toca. La paciencia es nuestro método, no nuestra virtud.
  - Identidad pergaminense — No escondemos de dónde venimos. Pergamino es el lugar que nos enseñó a hacer las cosas sin gritar. Eso vale más que cualquier etiqueta cosmopolita.
  - Validación externa — Doble medalla de plata en la Copa Argentina de Destilados (2025 + 2026). No lo decimos nosotros, lo dicen los catadores que probaron a ciegas. Lo que se valida no se discute.
  - Capacidad medida — 100 botellas al mes con capacidad de crecer sin perder el método. No producimos para abastecer mercados, producimos para que cada botella esté a la altura.
  - Portafolio integrado — Pedro y Mateo no está solo. Es parte de Casa Sarria, junto a Session Beer y Granero Sur. Tres marcas, una misma manera de hacer las cosas.

═══════════════════════════════════════
3. POSICIONAMIENTO ESTRATÉGICO
═══════════════════════════════════════
Definición: Vermouth Torino Rosso premium artesanal hecho en Pergamino, con 49 días de maceración y 12 botánicos, premiado dos años seguidos en la Copa Argentina de Destilados.

Propuesta de valor: "Pedro y Mateo es el vermouth del antes — del rato que separa la rutina de lo que importa. Hecho como se hacía antes, con paciencia."

Propuesta por unidad:
  - Previa de partido: el rato antes del fútbol. Hielera, pomelo, picada, mesa puesta. La cerveza llega después.
  - Aperitivo de noche en casa: antes de que llegue la gente a comer. La copa que se sirve mientras se termina de armar la mesa.
  - Sobremesa larga del domingo: cuando ya se comió, queda café, pero la conversación pide otra cosa. Pedro y Mateo solo, con hielo grande.
  - En coctelería de autor: como base para spritz, negroni o el trago de la casa (Pedro y Mateo + pomelo + tónica). Donde un Carpano juega, P&M juega y suma argentinidad.
  - Regalo / vinoteca premium: el argentino premiado que sorprende. Doble medalla nacional como justificación de la elección.
  - Brunch de fin de semana: spritz suave con tónica. Aperitivo más liviano para mediodía.

Elevator pitch: "Pedro y Mateo es un vermouth Torino Rosso hecho en Pergamino. 49 días de maceración con 12 botánicos. Doble medalla de plata en la Copa Argentina de Destilados, dos años seguidos. Pero te lo cuento de otra manera: tu bar tiene un momento muerto que no estás monetizando. Es el rato anterior al partido, a la cena, al brindis. La gente entra antes y pide cualquier cosa porque no le ofreciste nada a la altura. Pedro y Mateo es para ese momento. Te lo dejo a consignación, con la receta del trago de la casa que se vende solo (Pedro y Mateo con pomelo) y te capacito al equipo en media hora. Si no rota, te lo retiro. Lo que vas a ganar es un cliente que entró por la previa y se quedó toda la noche."

Claim principal: "Pedro y Mateo. El antes."

Claims secundarios:
  - "Hay rituales que tardan más en hacerse que en disfrutarse." (mailings y piezas largas)
  - "49 días. 12 botánicos. Una receta que no se toca." (fichas técnicas y vinotecas)
  - "La cerveza es para el grito. Pedro y Mateo, para la espera." (argumento de venta para bares)
  - "Hecho en Pergamino, premiado en Argentina." (campañas con respaldo)
  - "Algunas elecciones no se hacen, se confirman." (piezas institucionales Casa Sarria)

Posición competitiva:
                 Identidad territorial alta
                         ↑
         Pedro y Mateo   │   Vermouths argentinos curados
                         │
Producto de método  ←────┼────→ Producto de moda
                         │
   Industriales masivos  │   Importados premium
                         ↓
                 Identidad territorial baja

═══════════════════════════════════════
4. ARQUITECTURA DE MARCA (Opcional)
═══════════════════════════════════════
Estructura: marca paraguas Casa Sarria con 3 marcas / líneas de producto. Una misma manera de hacer las cosas, tres categorías de bebida.

Casa Sarria:
  Función: paraguas familiar (apellido Sarria / Sarrio de origen español) — ADN identitario del proyecto.
  Diferenciador: una misma manera de hacer las cosas (paciencia + identidad pergaminense + validación externa) compartida entre las 3 marcas.

Session Beer:
  Función: cervecería — marca insignia del grupo.
  Diferenciador: 10 años de trayectoria. Palanca comercial para los otros productos (logística + clientes + reputación + flota).
  Puntos de servicio: vinotecas, bares y restaurants de Pergamino + radio 200 km.

Pedro y Mateo:
  Función: vermouth Torino Rosso premium artesanal.
  Diferenciador: 49 días de maceración, 12 botánicos, doble medalla plata Copa Argentina Destilados 2025 + 2026, identidad pergaminense, posicionamiento "el antes".
  Puntos de servicio: vinotecas premium Pergamino + canal HORECA en activación (Anillo 1).

Granero Sur:
  Función: whisky — lanzamiento julio 2026.
  Diferenciador: a definir post-lanzamiento.
  Puntos de servicio: a desarrollar.

═══════════════════════════════════════
5. PÚBLICO OBJETIVO + BUYER PERSONAS
═══════════════════════════════════════
Segmentos:
  - Cliente final premium B2C — 35-55 años, profesional con trayectoria, AMBA + interior + radio 200 km
  - Bar de coctelería B2B — dueños / encargados 28-45 años, bares de autor en Pergamino + radio 200 km
  - Vinoteca premium B2B — encargados de compras 40-60 años con formación en bebidas
  - Bar de coctelería de autor CABA B2B (Anillo 3, abr 2027 en adelante) — bartenders / encargados 30-45 años en Palermo / San Telmo / Belgrano

[Persona 1] Martín — Cliente final premium
  Perfil: Hombre o mujer, 35 a 55 años. Profesional con trayectoria (abogado, contador, médico, productor agropecuario, dueño de comercio establecido). Vive en Pergamino o ciudades del radio 200 km. Familia formada, hijos adolescentes o ya independientes. Poder adquisitivo medio-alto. Cocina, recibe gente en casa los fines de semana, tiene mantelería buena y copas que combinan. No se considera "fanático" del vermouth pero le interesa lo bien hecho y prefiere descubrir antes que repetir. Lee suplementos gastronómicos, sigue a algún sommelier en Instagram, escucha podcasts de cocina o vino.
  Dolor: Los vermouths industriales le aburren (Cinzano, Martini, Gancia siempre le supieron igual). Los importados premium (Carpano, Punt e Mes, Antica Formula) le cuestan caro y le generan distancia: "está bueno pero no es mío". Los vermouths artesanales argentinos que probó le parecieron pose sin sustancia.
  Anhelo: Una pequeña afirmación de criterio. Cuando lo sirve en su casa, dice algo de él: que conoce, que eligió, que sabe distinguir. No quiere ostentar, quiere acompañar bien. Y quiere descubrir algo de lo suyo: un argentino premiado, hecho en su región. Componente de ritual: convertir el momento del aperitivo en algo cuidado, no automático.
  Cambio emocional: "Sirvo lo de siempre porque no sé qué más probar" → "Tengo una elección propia que mis invitados me preguntan"
  Diferenciador que le importa: La doble medalla — no por la medalla en sí, sino porque le da permiso racional para comprar un producto desconocido. "Si lo premiaron dos años seguidos, no me estoy mandando una macana." Le confirma que su elección no es un capricho, es un buen criterio. Lo segundo: el origen pergaminense le permite sentirse parte de algo local que vale.
  Objeciones:
    "¿No es caro?" → Es la mitad de un Carpano y tiene dos medallas nacionales. La diferencia con un vermouth industrial es de pocos pesos por copa.
    "¿De Pergamino? ¿Qué van a saber de vermouth?" → Doble medalla de plata en la Copa Argentina de Destilados (2025 + 2026). El jurado probó a ciegas, sin saber el origen.
    "¿Dónde lo compro?" → En las vinotecas premium de Pergamino y zona. Lista de puntos de venta disponible.
    "¿Y si no me gusta?" → Se toma solo con hielo grande y pomelo. Si no te gusta el vermouth en general, no te va a gustar este. Si te gusta el vermouth, este te va a sorprender.

[Persona 2] Federico — Dueño / encargado de bar de coctelería
  Perfil: Dueño o encargado con poder de decisión sobre la carta de un bar de coctelería, restaurant con carta de tragos o bar de hotel boutique. 28 a 45 años. Conoce el rubro: vino, fue bartender o trabajó en hospitality antes de abrir su lugar. Su bar tiene entre 30 y 80 cubiertos, está en Pergamino o ciudades del radio. Trabaja con un equipo de 2-4 bartenders. Su carta tiene entre 12 y 25 tragos. Lo que vende mejor son los clásicos con vuelta de tuerca y la propuesta de la casa. Compra mayormente a representantes (Pernod, Diageo, Branca). Está cansado de que todos los bares de la zona tengan exactamente la misma carta.
  Dolor: Los industriales (Cinzano, Gancia) no le dan margen ni historia para contar al cliente. Los premium importados (Carpano, Antica Formula) son caros y no rotan tanto como necesita. Los artesanales argentinos que probó tienen problemas de continuidad o no tienen propuesta de uso clara ("acá tenés la botella, arreglate"). Le ofrecen producto sin estrategia. Y nadie le trae respuesta para el problema real: monetizar el momento de la previa, cuando el cliente entra y todavía no decidió qué cenar o qué hacer.
  Anhelo: Diferenciarse del bar de enfrente con algo que ningún otro tiene en la zona. Captar al cliente premium que sabe distinguir. Tener un trago de la casa (Pedro y Mateo con pomelo) que el bartender pueda contar con orgullo. Sumar argentinidad a la carta sin que parezca "localismo barato". Y ganar un nuevo momento de consumo: la previa.
  Cambio emocional: "Tengo lo mismo que todos los bares de la zona" → "Tengo algo único, argentino y premiado que mis clientes me preguntan"
  Diferenciador que le importa: El paquete completo — producto premiado + propuesta de trago de la casa + receta lista + sticker conmemorativo para la barra + capacitación al equipo en 30 minutos + entrega a consignación. El riesgo es cero y la historia ya viene armada. No tiene que inventar nada: le damos el negocio, no la botella.
  Objeciones:
    "Mis clientes piden Carpano / Cinzano" → Tu cliente pide lo que ofreces. Yo te traigo algo que rota, lo dejo a consignación y te capacito al equipo para que lo vendan con argumento. Si en 60 días no funciona, lo retiro.
    "¿De Pergamino? Mis clientes no van a entender" → Pergamino es el dato. La medalla es la prueba. La frase "Doble medalla nacional, dos años seguidos" cierra cualquier conversación con un cliente que sepa.
    "No tengo lugar en la carta para otro vermouth" → No te propongo otro vermouth. Te propongo un trago de la casa con identidad propia. Pedro y Mateo con pomelo. Es una sola línea en tu carta, no diez.
    "¿Y si después no me lo reponen?" → Casa Sarria tiene 10 años de trayectoria con Session Beer. Si te respondemos con cerveza, te respondemos con vermouth. No somos un proyecto de un año.

[Persona 3] Carla — Dueña / responsable de vinoteca premium
  Perfil: Dueña o encargada de compras de una vinoteca premium. 40 a 60 años. Conoce de vinos y destilados, tiene formación (sommelier, enóloga o autodidacta seria). Su clientela es el cliente final premium (Persona 1). Vende mayormente vino, pero tiene espacio para destilados premium curados. Compra a representantes y a productores chicos directamente. Le importa la historia detrás del producto porque eso es lo que vende al cliente: "este vermouth viene de…". Está siempre buscando productos con narrativa que pueda contar y diferenciar.
  Dolor: El catálogo de vermouth argentino es escaso o repetitivo. Los productores chicos suelen tener problemas de stock o calidad inestable. Los importados premium son caros y rotan lento. Le falta una opción argentina seria, con respaldo técnico, que pueda contar como hallazgo a sus clientes. Y le importa que el productor no la deje sola: que tenga material, que capacite, que esté disponible.
  Anhelo: Sumar un producto con historia propia que justifique su selección. Tener un "sorprende-clientes" para recomendar cuando alguien le pide algo distinto a Carpano. Construir relación con un productor local serio (Casa Sarria) que en el futuro le pueda dar más productos del portafolio (Session, Granero Sur).
  Cambio emocional: "No tengo un vermouth argentino digno de recomendar" → "Tengo un hallazgo local premiado que mis clientes vuelven a buscar"
  Diferenciador que le importa: La combinación de tres cosas — doble medalla (respaldo técnico para vender), origen pergaminense (historia para contar) y pertenencia a Casa Sarria como casa con trayectoria (seguridad de continuidad). El cierre lo hace el cliente recurrente que dice "no encuentro otro igual".
  Objeciones:
    "¿Tienen continuidad de stock?" → 100 botellas al mes con capacidad ociosa de crecimiento. Casa Sarria lleva 10 años produciendo Session Beer sin cortes.
    "¿Qué margen me deja?" → Margen alto, comparable o superior al de un vermouth importado premium.
    "¿Tienen material para acompañar la venta?" → Tarjetón con receta, sticker conmemorativo de la doble medalla, ficha técnica y material POP. La venta no se hace sola pero viene armada.

[Persona 4] Comprador B2B CABA — Anillo 3 (abr 2027 en adelante)
  Perfil: Bartender / encargado de compras de bar de coctelería de autor en Palermo, San Telmo o Belgrano. 30-45 años. Trabaja con cartas curadas, sigue tendencias internacionales, tiene presencia en redes y conoce el ecosistema de productores chicos argentinos. Compra por reputación y por relato.
  Diferenciador que le importa: La doble medalla lo predispone bien, pero lo que cierra la venta es la historia de Casa Sarria como casa de bebidas integrada (cerveza + vermouth + whisky), no como productor aislado. En 2027 entramos con portafolio completo, no con producto suelto.
  (Persona perfilada hipotéticamente — refinamiento pendiente al acercarse el Anillo 3)

Resumen de campos estratégicos:
  Persona 1 (Martín): dolor=industriales aburren / importados distantes | anhelo=afirmación de criterio + ritual cuidado | cambio=sirve-lo-de-siempre → tiene-elección-propia
  Persona 2 (Federico): dolor=carta igual al bar de enfrente / sin propuesta de uso | anhelo=diferenciarse + monetizar previa | cambio=lo-mismo-que-todos → algo-único-premiado
  Persona 3 (Carla): dolor=catálogo argentino repetitivo / productores inestables | anhelo=hallazgo argentino con respaldo + relación con productor serio | cambio=sin-argentino-digno → tengo-hallazgo-local

Beneficios tangibles:
  - 49 días de maceración con 12 botánicos
  - Doble medalla de plata Copa Argentina de Destilados (2025 + 2026)
  - 100 botellas/mes con capacidad ociosa de crecimiento
  - Margen comparable o superior a importado premium
  - Botella 700 cm³ a $10.500 PVP / $8.000 mayorista
  - Consignación con retiro garantizado en 60 días
  - Kit comercial integral entregado en cada bar (carta + receta + sticker + capacitación 30 min)

Beneficios intangibles:
  - Pertenencia a Casa Sarria (10 años de trayectoria con Session Beer + Granero Sur por venir)
  - Identidad pergaminense con narrativa propia (no porteño sin territorio)
  - Validación nacional (medallas) que da permiso racional para elegir
  - Ritual del "antes" — posicionamiento de un momento de consumo subexplotado
  - Producto premiado con humildad pergaminense (no pose snob)

═══════════════════════════════════════
6. DIFERENCIADORES
═══════════════════════════════════════
Operativos:
  - Planta propia con capacidad ociosa de producción
  - Logística reutilizable con la operación de Session Beer (mismo radio comercial, mismos clientes, misma flota)
  - Equipo con capacidad de dedicación adicional sin necesidad de contratar
  - Base operativa en Pergamino: cerca del cliente del Anillo 1 y 2, distancia razonable al Anillo 3 (CABA)

Tecnológicos / digitales:
  - Operación digital simple y enfocada: Instagram como canal único de comunicación pública + WhatsApp como canal único de venta y atención
  - Estructura mínima deliberada: evita ruido, mantiene cercanía con el cliente y permite que cada conversación con un bar o vinoteca sea personalizada
  - NO trabaja e-commerce ni marketplaces
  - Incorporación de CRM y sistematización de pedidos en agenda de mejoras a evaluar

De servicio:
  - Kit comercial integral entregado en cada bar: carta de tragos sugerida + tarjetón con receta del Pedro y Mateo con pomelo + sticker conmemorativo de la doble medalla + capacitación de 30 minutos al equipo del bar + prueba sin riesgo a consignación con retiro garantizado si no rota
  - Acompañamiento sostenido posventa con visita mensual de reposición y feedback

De producto / oferta:
  - Vermouth Torino Rosso premium con 49 días de maceración y 12 botánicos
  - Doble medalla de plata en la Copa Argentina de Destilados (2025 + 2026)
  - Margen unitario alto, comparable o superior al de Session Beer
  - Identidad pergaminense diferencial frente a vermouths importados europeos y frente a vermouths porteños sin territorio claro
  - Pertenencia al portafolio Casa Sarria, junto con Session Beer (cerveza, 10 años) y Granero Sur (whisky, lanzamiento julio 2026)

═══════════════════════════════════════
7. COBERTURA Y OPERACIÓN (Opcional)
═══════════════════════════════════════
Planta y depósito principal — Marcelino Ugarte 1122, Pergamino, Provincia de Buenos Aires, Argentina

Plan de cobertura por anillos concéntricos:
  Anillo 1 (jun-sep 2026): Pergamino completo — vinotecas premium consolidadas + apertura canal HORECA (5 bares objetivo)
  Anillo 2 (oct 2026 - mar 2027): radio 200 km — Junín, San Nicolás, Salto, Arrecifes, Colón, Rojas, San Pedro
  Anillo 3 (abr 2027 en adelante): CABA + GBA norte — Palermo, San Telmo, Belgrano (entrada como Casa Sarria con portfolio completo)

Distribuidores: distribución directa por equipo Casa Sarria, sin distribuidores intermedios por el momento.

═══════════════════════════════════════
8. OFERTA COMERCIAL
═══════════════════════════════════════
Servicios:
  - Vermouth Pedro y Mateo Torino Rosso: botella única de 700 cm³. Sin estuche, sin packs especiales. Presentación regular constante.
    Condiciones: PVP sugerido $10.500 por botella; precio mayorista $8.000 por botella para bar y vinoteca; transferencia o efectivo; pago dentro de 30 días; descuentos por volumen a evaluar caso por caso (precio referencial 2026 — verificar vigencia).
    Normativa: venta exclusiva a mayores de 18 años; normativa comercial/bromatológica específica pendiente validar con cliente.
    Tarifa: $10.500 PVP / $8.000 mayorista por botella de 700 cm³ (precio referencial 2026 — verificar vigencia).
  - Prueba sin riesgo para bares nuevos del Anillo 1: primera caja a consignación con retiro sin cargo si el producto no rota.
    Condiciones: retiro garantizado a los 60 días si no hay rotación; aplica a bares nuevos del Anillo 1; requiere validación comercial caso por caso.

Procedimientos:
  - Cliente final: en vinotecas premium de Pergamino y radio (presencial). Pedidos puntuales por WhatsApp +54 9 2477 329612.
  - Bares y vinotecas (B2B): contacto directo por WhatsApp comercial. Visita personal de Casa Sarria con kit comercial completo.

Marcas representadas: Casa Sarria — Session Beer, Pedro y Mateo, Granero Sur.

═══════════════════════════════════════
9. CIFRAS CLAVE (Opcional)
═══════════════════════════════════════
  - Producción actual: 100 botellas/mes con capacidad ociosa
  - Plan Anillo 1 (jun-sep 2026): 180-200 botellas/mes sostenidas
  - Plan Anillo 2 (oct 2026 - mar 2027): 400-500 botellas/mes sostenidas
  - Plan Anillo 3 (abr 2027 en adelante): 800-1.200 botellas/mes sostenidas
  - Crecimiento esperado 18 meses: de 100 → 800-1.200 botellas/mes (8x-12x)
  - Reconocimientos: Doble medalla de plata Copa Argentina de Destilados (2025 + 2026)
  - Lanzamiento oficial: 2024 (Expo Vinos)
  - Casa Sarria: 10 años de operación continua de Session Beer (paraguas familiar)

═══════════════════════════════════════
10. CANALES Y ACTIVOS DIGITALES
═══════════════════════════════════════
Presencia digital:
  Teléfono: +54 9 2477 329612
  WhatsApp: +54 9 2477 329612
  Instagram: @vermouthpedroymateo
  Facebook: No aplica — presencia digital concentrada en Instagram.
  Web: (Información pendiente — Casa Sarria opera sin sitio web por el momento. Comunicación digital concentrada en Instagram + WhatsApp)
  Tienda online: No aplica — comercialización exclusiva por canal físico y pedidos puntuales por WhatsApp.
  Portal clientes: No aplica.

Soporte y atención:
  Email contacto: No aplica — gestión integral por WhatsApp.
  Email especializado: No aplica.
  Tiempo respuesta RRSS: (Información pendiente — requiere insumo del cliente)
  Tiempo respuesta email: No aplica.
  CRM/herramientas: WhatsApp + planilla manual al día de hoy. Incorporación de CRM en agenda de mejoras a evaluar.

═══════════════════════════════════════
11. CTAs VALIDADOS
═══════════════════════════════════════
Frases / títulos que funcionan:
  - "Pedro y Mateo. El antes."
  - "Hay rituales que tardan más en hacerse que en disfrutarse."
  - "49 días. 12 botánicos. Una receta que no se toca."
  - "Algunas elecciones no se hacen, se confirman."
  - "Hecho en Pergamino, premiado en Argentina."
  - "La cerveza es para el grito. Pedro y Mateo, para la espera."
  - "Doble medalla de plata. Dos años seguidos. Lo dijeron los catadores, no nosotros."
  - "Antes que el partido. Antes que la cena. Antes que el brindis."

CTAs validados:
  - "Pedilo en las vinotecas premium de Pergamino."
  - "Conseguilo donde sepan recomendarlo."
  - "Servilo con hielo grande y pomelo."
  - "Encontranos en los bares que entienden el antes."
  - "Conocé más en Casa Sarria."
  - "Sumalo a tu carta — escribinos."

Frases descartadas (NUNCA usar):
  - "El mejor vermouth de Argentina" (queda mal con la humildad pergaminense)
  - "Experiencia premium" / "experiencia gourmet" (genérico, vacío)
  - "Vermouth artesanal con tradición italiana" (no somos italianos)
  - "Sabor inigualable / inolvidable / excepcional" (adjetivos vacíos)
  - "Innovador / disruptivo / revolucionario" (P&M no rompe nada, recupera)
  - "Para los que saben" (excluyente, snob)
  - "Lujo / sofisticación / exclusividad" (no es el territorio)
  - "Vermouth premium gourmet" (etiqueta cosmopolita falsa)
  - "Edición limitada" (no aplica, es producción regular)

═══════════════════════════════════════
12. PERSONALIDAD, ARQUETIPO Y TONO
═══════════════════════════════════════
Arquetipo Mark/Pearson: Sage (Sabio)
Justificación: Sage no busca convencer a gritos: muestra el método y deja que la prueba ciega de los catadores hable. Pedro y Mateo encarna ese arquetipo en su humildad pergaminense, su paciencia productiva y su confianza en la receta sin tocar.

Arquetipo secundario: Everyman (Hombre Común) — la accesibilidad sin pretensión, la mesa común, el aperitivo del domingo.
Justificación: la marca no se posiciona como elite ni cosmopolita. Habla desde la mesa puesta, la previa con amigos, el ritual cotidiano. El cliente premium se siente identificado, no jerarquizado por encima.

Arquetipos descartados:
  - Hero (Héroe) — demasiado épico. P&M no salva al mundo, lo acompaña en el "antes".
  - Magician (Mago) — demasiado transformación / promesa. P&M no transforma, recupera lo que ya estaba bien hecho.
  - Ruler (Gobernante) — demasiado autoridad / lujo. P&M no domina, sugiere.
  - Lover (Amante) — demasiado pasión / sensualidad. P&M es ritual contenido, no éxtasis.
  - Innocent (Inocente) — demasiado naive. P&M es marca con oficio, no ingenua.

Manifestación del arquetipo en la marca:
La marca aparece en escenas cotidianas elevadas por el oficio: mesa puesta del domingo, hielera con copas, mantel viejo pero bien planchado, copas que combinan, una conversación que toma su tiempo. Los símbolos recurrentes son el pomelo, la maceración como proceso visible, la medalla como firma al pie (no como titular), Pergamino como territorio físico (campo, pueblo, casa). Situaciones típicas que activan el arquetipo: la sobremesa larga del domingo, la previa del partido con amigos en casa, el aperitivo de noche antes que llegue la gente a comer.

Personalidad narrativa: Si Pedro y Mateo fuera una persona, sería un hombre o mujer de 50 años. Pergaminense de toda la vida. Profesional con oficio reconocido (médico de pueblo, abogado de familia, productor agropecuario establecido, escribano). Camina sin apuro pero llega temprano. Cuando habla, no levanta la voz: hace preguntas. Tiene buen humor seco. Sabe de vinos pero no impone. Su casa no es ostentosa pero todo lo que hay adentro está elegido con criterio: el mantel es viejo y se lava, las copas combinan, el vino se sirve a la temperatura que va. Recibe gente los domingos. Cuando viene un amigo de Buenos Aires, lo lleva al campo. Cuando le preguntan qué hace para divertirse, contesta "esto" señalando la mesa.

Tono de voz:
  - Serena — sin levantar la voz, sin urgencias falsas, sin signos de exclamación.
  - Sugerida — siempre antes que explicada. Si el copy se entiende sin la frase obvia, sacar la frase obvia.
  - Pergaminense — no esconde el origen ni lo glorifica. Pergamino es dato, no estandarte.
  - Honesta — usa datos concretos (49 días, 12 botánicos, 2025 + 2026) en lugar de adjetivos vacíos.
  - Con humor seco — sin chiste obvio, sin guiño excesivo. El humor está en la elección de la palabra, no en el remate.
  - Sin pretensión — habla desde la mesa común. Recibe, no exhibe.

Directivas para generación de contenido:
  - Siempre: hablar en español rioplatense con vos.
  - Siempre: mencionar Pergamino sin esconderlo y sin glorificarlo.
  - Siempre: sugerir antes que explicar. Si el copy se entiende sin la frase obvia, sacar la frase obvia.
  - Siempre: dejar al lector trabajar. No completar lo que se puede insinuar.
  - Siempre: usar datos concretos (49 días, 12 botánicos, 2025 + 2026) en lugar de adjetivos vacíos.
  - Siempre: tratar a la doble medalla como confirmación, no como argumento principal.
  - Siempre: conservar el tiempo presente — la marca está acá, ahora, sin nostalgia.
  - Siempre: aceptar el silencio. Las piezas pueden tener pocas palabras.
  - Nunca: tratar de usted ni usar lenguaje publicitario obvio.
  - Nunca: esconder el origen pergaminense.
  - Nunca: mencionar ni hablar mal de la competencia (Carpano, Cinzano, Gancia, otros).
  - Nunca: exagerar con adjetivos (el mejor, único, excepcional, increíble, inigualable).
  - Nunca: usar lenguaje aspiracional de lujo (élite, premium, exclusivo, sofisticado).
  - Nunca: gritar la medalla. Aparece como firma al pie, no como titular.
  - Nunca: apurar al lector. Sin urgencias falsas (hoy solamente, última oportunidad, no te lo pierdas).
  - Nunca: usar modismos publicitarios trillados (descubrí, atrevete, viví, sentí).
  - Nunca: hablar en imperativo de venta dura.
  - Nunca: explicar lo obvio.
  - Nunca: terminar un copy con signo de exclamación.

Palabras clave de marca:
  antes, maceración, botánicos, ritual, espera, Pergamino, pomelo, hielera, aperitivo, receta, oficio, paciencia, mesa, tarde, Casa Sarria

Lo que la marca NO es:
  - NO es un vermouth industrial / SÍ es un vermouth con receta de 49 días y 12 botánicos
  - NO es un vermouth importado pretencioso / SÍ es un argentino con doble medalla nacional
  - NO es un vermouth porteño sin territorio / SÍ es del interior, pergaminense, con identidad geográfica clara
  - NO es producto suelto / SÍ es parte de Casa Sarria, junto a Session Beer y Granero Sur
  - NO es vermouth de moda / SÍ es vermouth de método: misma receta, misma paciencia, mismo lugar

Vocabulario visual canónico: (pendiente — el moodboard editorial está por entregarse. Anchors propios + Geografía + Texturas + Luces + Iconografía + Ángulos a definir cuando lleguen las 20-30 imágenes)

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
values (
  (select id from public.brands where code = 'VPM'),
  1,
  $ana_ficha$
FICHA DE MARCA INTEGRAL — VERMOUTH PEDRO Y MATEO
Pedro y Mateo. El antes.
12 dimensiones — Generado por Ana Labs — 2026-05-25
Fuentes: ficha_marca_pedro_y_mateo respuestas (Eduardo Sarrio, mayo 2026), estrategia de crecimiento por anillos concéntricos (Casa Sarria, 2026), Instagram @vermouthpedroymateo

═══════════════════════════════════════
1. IDENTIDAD CORPORATIVA
═══════════════════════════════════════
Nombre comercial: Pedro y Mateo
Razón social: Eduardo Sarrio (persona física titular del proyecto Casa Sarria, paraguas de las marcas Session Beer, Pedro y Mateo y Granero Sur)
CUIT: 20-26662657-7
Slogan: "Pedro y Mateo. El antes."
Fundación: 2024 — lanzamiento oficial en Expo Vinos (2 años al 2026)
Casa paraguas: Casa Sarria — consolidación formal reciente, junto con Session Beer (marca insignia, 10 años de operación) y Granero Sur (whisky, lanzamiento julio 2026)
Sede: Marcelino Ugarte 1122, Pergamino, Provincia de Buenos Aires, Argentina
Gerente General: Eduardo Sarrio — el apellido familiar (origen español, Sarria/Sarrio) da nombre al paraguas Casa Sarria y constituye el ADN identitario del proyecto
Sector: Bebidas alcohólicas — vermouth Torino Rosso premium artesanal
Alcance geográfico: Pergamino + vinotecas premium locales (Anillo 1, jun-sep 2026) → radio 200 km Junín / San Nicolás / Salto / Arrecifes / Colón / Rojas / San Pedro (Anillo 2, oct 2026 - mar 2027) → CABA + GBA norte (Anillo 3, abr 2027 en adelante)

═══════════════════════════════════════
2. PROPÓSITO
═══════════════════════════════════════
Misión: Hacer vermouth como se hacía antes. Con tiempo, oficio y la convicción de que algunas cosas no se apuran. Pedro y Mateo nace en Pergamino para devolverle al ritual del aperitivo el lugar que merece: el rato que separa la rutina de lo que importa.

Visión: Ser el vermouth argentino que define el antes. La elección natural de quien entiende que el aperitivo no es trámite, es ceremonia. Que Pedro y Mateo —junto con Session Beer y Granero Sur— consolide a Casa Sarria como una casa de bebidas argentinas hecha en Pergamino y reconocida por la paciencia con la que trabaja.

Valores:
  - Paciencia — 49 días de maceración. 12 botánicos. Una receta que no se toca. La paciencia es nuestro método, no nuestra virtud.
  - Identidad pergaminense — No escondemos de dónde venimos. Pergamino es el lugar que nos enseñó a hacer las cosas sin gritar. Eso vale más que cualquier etiqueta cosmopolita.
  - Validación externa — Doble medalla de plata en la Copa Argentina de Destilados (2025 + 2026). No lo decimos nosotros, lo dicen los catadores que probaron a ciegas. Lo que se valida no se discute.
  - Capacidad medida — 100 botellas al mes con capacidad de crecer sin perder el método. No producimos para abastecer mercados, producimos para que cada botella esté a la altura.
  - Portafolio integrado — Pedro y Mateo no está solo. Es parte de Casa Sarria, junto a Session Beer y Granero Sur. Tres marcas, una misma manera de hacer las cosas.

═══════════════════════════════════════
3. POSICIONAMIENTO ESTRATÉGICO
═══════════════════════════════════════
Definición: Vermouth Torino Rosso premium artesanal hecho en Pergamino, con 49 días de maceración y 12 botánicos, premiado dos años seguidos en la Copa Argentina de Destilados.

Propuesta de valor: "Pedro y Mateo es el vermouth del antes — del rato que separa la rutina de lo que importa. Hecho como se hacía antes, con paciencia."

Propuesta por unidad:
  - Previa de partido: el rato antes del fútbol. Hielera, pomelo, picada, mesa puesta. La cerveza llega después.
  - Aperitivo de noche en casa: antes de que llegue la gente a comer. La copa que se sirve mientras se termina de armar la mesa.
  - Sobremesa larga del domingo: cuando ya se comió, queda café, pero la conversación pide otra cosa. Pedro y Mateo solo, con hielo grande.
  - En coctelería de autor: como base para spritz, negroni o el trago de la casa (Pedro y Mateo + pomelo + tónica). Donde un Carpano juega, P&M juega y suma argentinidad.
  - Regalo / vinoteca premium: el argentino premiado que sorprende. Doble medalla nacional como justificación de la elección.
  - Brunch de fin de semana: spritz suave con tónica. Aperitivo más liviano para mediodía.

Elevator pitch: "Pedro y Mateo es un vermouth Torino Rosso hecho en Pergamino. 49 días de maceración con 12 botánicos. Doble medalla de plata en la Copa Argentina de Destilados, dos años seguidos. Pero te lo cuento de otra manera: tu bar tiene un momento muerto que no estás monetizando. Es el rato anterior al partido, a la cena, al brindis. La gente entra antes y pide cualquier cosa porque no le ofreciste nada a la altura. Pedro y Mateo es para ese momento. Te lo dejo a consignación, con la receta del trago de la casa que se vende solo (Pedro y Mateo con pomelo) y te capacito al equipo en media hora. Si no rota, te lo retiro. Lo que vas a ganar es un cliente que entró por la previa y se quedó toda la noche."

Claim principal: "Pedro y Mateo. El antes."

Claims secundarios:
  - "Hay rituales que tardan más en hacerse que en disfrutarse." (mailings y piezas largas)
  - "49 días. 12 botánicos. Una receta que no se toca." (fichas técnicas y vinotecas)
  - "La cerveza es para el grito. Pedro y Mateo, para la espera." (argumento de venta para bares)
  - "Hecho en Pergamino, premiado en Argentina." (campañas con respaldo)
  - "Algunas elecciones no se hacen, se confirman." (piezas institucionales Casa Sarria)

Posición competitiva:
                 Identidad territorial alta
                         ↑
         Pedro y Mateo   │   Vermouths argentinos curados
                         │
Producto de método  ←────┼────→ Producto de moda
                         │
   Industriales masivos  │   Importados premium
                         ↓
                 Identidad territorial baja

═══════════════════════════════════════
4. ARQUITECTURA DE MARCA (Opcional)
═══════════════════════════════════════
Estructura: marca paraguas Casa Sarria con 3 marcas / líneas de producto. Una misma manera de hacer las cosas, tres categorías de bebida.

Casa Sarria:
  Función: paraguas familiar (apellido Sarria / Sarrio de origen español) — ADN identitario del proyecto.
  Diferenciador: una misma manera de hacer las cosas (paciencia + identidad pergaminense + validación externa) compartida entre las 3 marcas.

Session Beer:
  Función: cervecería — marca insignia del grupo.
  Diferenciador: 10 años de trayectoria. Palanca comercial para los otros productos (logística + clientes + reputación + flota).
  Puntos de servicio: vinotecas, bares y restaurants de Pergamino + radio 200 km.

Pedro y Mateo:
  Función: vermouth Torino Rosso premium artesanal.
  Diferenciador: 49 días de maceración, 12 botánicos, doble medalla plata Copa Argentina Destilados 2025 + 2026, identidad pergaminense, posicionamiento "el antes".
  Puntos de servicio: vinotecas premium Pergamino + canal HORECA en activación (Anillo 1).

Granero Sur:
  Función: whisky — lanzamiento julio 2026.
  Diferenciador: a definir post-lanzamiento.
  Puntos de servicio: a desarrollar.

═══════════════════════════════════════
5. PÚBLICO OBJETIVO + BUYER PERSONAS
═══════════════════════════════════════
Segmentos:
  - Cliente final premium B2C — 35-55 años, profesional con trayectoria, AMBA + interior + radio 200 km
  - Bar de coctelería B2B — dueños / encargados 28-45 años, bares de autor en Pergamino + radio 200 km
  - Vinoteca premium B2B — encargados de compras 40-60 años con formación en bebidas
  - Bar de coctelería de autor CABA B2B (Anillo 3, abr 2027 en adelante) — bartenders / encargados 30-45 años en Palermo / San Telmo / Belgrano

[Persona 1] Martín — Cliente final premium
  Perfil: Hombre o mujer, 35 a 55 años. Profesional con trayectoria (abogado, contador, médico, productor agropecuario, dueño de comercio establecido). Vive en Pergamino o ciudades del radio 200 km. Familia formada, hijos adolescentes o ya independientes. Poder adquisitivo medio-alto. Cocina, recibe gente en casa los fines de semana, tiene mantelería buena y copas que combinan. No se considera "fanático" del vermouth pero le interesa lo bien hecho y prefiere descubrir antes que repetir. Lee suplementos gastronómicos, sigue a algún sommelier en Instagram, escucha podcasts de cocina o vino.
  Dolor: Los vermouths industriales le aburren (Cinzano, Martini, Gancia siempre le supieron igual). Los importados premium (Carpano, Punt e Mes, Antica Formula) le cuestan caro y le generan distancia: "está bueno pero no es mío". Los vermouths artesanales argentinos que probó le parecieron pose sin sustancia.
  Anhelo: Una pequeña afirmación de criterio. Cuando lo sirve en su casa, dice algo de él: que conoce, que eligió, que sabe distinguir. No quiere ostentar, quiere acompañar bien. Y quiere descubrir algo de lo suyo: un argentino premiado, hecho en su región. Componente de ritual: convertir el momento del aperitivo en algo cuidado, no automático.
  Cambio emocional: "Sirvo lo de siempre porque no sé qué más probar" → "Tengo una elección propia que mis invitados me preguntan"
  Diferenciador que le importa: La doble medalla — no por la medalla en sí, sino porque le da permiso racional para comprar un producto desconocido. "Si lo premiaron dos años seguidos, no me estoy mandando una macana." Le confirma que su elección no es un capricho, es un buen criterio. Lo segundo: el origen pergaminense le permite sentirse parte de algo local que vale.
  Objeciones:
    "¿No es caro?" → Es la mitad de un Carpano y tiene dos medallas nacionales. La diferencia con un vermouth industrial es de pocos pesos por copa.
    "¿De Pergamino? ¿Qué van a saber de vermouth?" → Doble medalla de plata en la Copa Argentina de Destilados (2025 + 2026). El jurado probó a ciegas, sin saber el origen.
    "¿Dónde lo compro?" → En las vinotecas premium de Pergamino y zona. Lista de puntos de venta disponible.
    "¿Y si no me gusta?" → Se toma solo con hielo grande y pomelo. Si no te gusta el vermouth en general, no te va a gustar este. Si te gusta el vermouth, este te va a sorprender.

[Persona 2] Federico — Dueño / encargado de bar de coctelería
  Perfil: Dueño o encargado con poder de decisión sobre la carta de un bar de coctelería, restaurant con carta de tragos o bar de hotel boutique. 28 a 45 años. Conoce el rubro: vino, fue bartender o trabajó en hospitality antes de abrir su lugar. Su bar tiene entre 30 y 80 cubiertos, está en Pergamino o ciudades del radio. Trabaja con un equipo de 2-4 bartenders. Su carta tiene entre 12 y 25 tragos. Lo que vende mejor son los clásicos con vuelta de tuerca y la propuesta de la casa. Compra mayormente a representantes (Pernod, Diageo, Branca). Está cansado de que todos los bares de la zona tengan exactamente la misma carta.
  Dolor: Los industriales (Cinzano, Gancia) no le dan margen ni historia para contar al cliente. Los premium importados (Carpano, Antica Formula) son caros y no rotan tanto como necesita. Los artesanales argentinos que probó tienen problemas de continuidad o no tienen propuesta de uso clara ("acá tenés la botella, arreglate"). Le ofrecen producto sin estrategia. Y nadie le trae respuesta para el problema real: monetizar el momento de la previa, cuando el cliente entra y todavía no decidió qué cenar o qué hacer.
  Anhelo: Diferenciarse del bar de enfrente con algo que ningún otro tiene en la zona. Captar al cliente premium que sabe distinguir. Tener un trago de la casa (Pedro y Mateo con pomelo) que el bartender pueda contar con orgullo. Sumar argentinidad a la carta sin que parezca "localismo barato". Y ganar un nuevo momento de consumo: la previa.
  Cambio emocional: "Tengo lo mismo que todos los bares de la zona" → "Tengo algo único, argentino y premiado que mis clientes me preguntan"
  Diferenciador que le importa: El paquete completo — producto premiado + propuesta de trago de la casa + receta lista + sticker conmemorativo para la barra + capacitación al equipo en 30 minutos + entrega a consignación. El riesgo es cero y la historia ya viene armada. No tiene que inventar nada: le damos el negocio, no la botella.
  Objeciones:
    "Mis clientes piden Carpano / Cinzano" → Tu cliente pide lo que ofreces. Yo te traigo algo que rota, lo dejo a consignación y te capacito al equipo para que lo vendan con argumento. Si en 60 días no funciona, lo retiro.
    "¿De Pergamino? Mis clientes no van a entender" → Pergamino es el dato. La medalla es la prueba. La frase "Doble medalla nacional, dos años seguidos" cierra cualquier conversación con un cliente que sepa.
    "No tengo lugar en la carta para otro vermouth" → No te propongo otro vermouth. Te propongo un trago de la casa con identidad propia. Pedro y Mateo con pomelo. Es una sola línea en tu carta, no diez.
    "¿Y si después no me lo reponen?" → Casa Sarria tiene 10 años de trayectoria con Session Beer. Si te respondemos con cerveza, te respondemos con vermouth. No somos un proyecto de un año.

[Persona 3] Carla — Dueña / responsable de vinoteca premium
  Perfil: Dueña o encargada de compras de una vinoteca premium. 40 a 60 años. Conoce de vinos y destilados, tiene formación (sommelier, enóloga o autodidacta seria). Su clientela es el cliente final premium (Persona 1). Vende mayormente vino, pero tiene espacio para destilados premium curados. Compra a representantes y a productores chicos directamente. Le importa la historia detrás del producto porque eso es lo que vende al cliente: "este vermouth viene de…". Está siempre buscando productos con narrativa que pueda contar y diferenciar.
  Dolor: El catálogo de vermouth argentino es escaso o repetitivo. Los productores chicos suelen tener problemas de stock o calidad inestable. Los importados premium son caros y rotan lento. Le falta una opción argentina seria, con respaldo técnico, que pueda contar como hallazgo a sus clientes. Y le importa que el productor no la deje sola: que tenga material, que capacite, que esté disponible.
  Anhelo: Sumar un producto con historia propia que justifique su selección. Tener un "sorprende-clientes" para recomendar cuando alguien le pide algo distinto a Carpano. Construir relación con un productor local serio (Casa Sarria) que en el futuro le pueda dar más productos del portafolio (Session, Granero Sur).
  Cambio emocional: "No tengo un vermouth argentino digno de recomendar" → "Tengo un hallazgo local premiado que mis clientes vuelven a buscar"
  Diferenciador que le importa: La combinación de tres cosas — doble medalla (respaldo técnico para vender), origen pergaminense (historia para contar) y pertenencia a Casa Sarria como casa con trayectoria (seguridad de continuidad). El cierre lo hace el cliente recurrente que dice "no encuentro otro igual".
  Objeciones:
    "¿Tienen continuidad de stock?" → 100 botellas al mes con capacidad ociosa de crecimiento. Casa Sarria lleva 10 años produciendo Session Beer sin cortes.
    "¿Qué margen me deja?" → Margen alto, comparable o superior al de un vermouth importado premium.
    "¿Tienen material para acompañar la venta?" → Tarjetón con receta, sticker conmemorativo de la doble medalla, ficha técnica y material POP. La venta no se hace sola pero viene armada.

[Persona 4] Comprador B2B CABA — Anillo 3 (abr 2027 en adelante)
  Perfil: Bartender / encargado de compras de bar de coctelería de autor en Palermo, San Telmo o Belgrano. 30-45 años. Trabaja con cartas curadas, sigue tendencias internacionales, tiene presencia en redes y conoce el ecosistema de productores chicos argentinos. Compra por reputación y por relato.
  Diferenciador que le importa: La doble medalla lo predispone bien, pero lo que cierra la venta es la historia de Casa Sarria como casa de bebidas integrada (cerveza + vermouth + whisky), no como productor aislado. En 2027 entramos con portafolio completo, no con producto suelto.
  (Persona perfilada hipotéticamente — refinamiento pendiente al acercarse el Anillo 3)

Resumen de campos estratégicos:
  Persona 1 (Martín): dolor=industriales aburren / importados distantes | anhelo=afirmación de criterio + ritual cuidado | cambio=sirve-lo-de-siempre → tiene-elección-propia
  Persona 2 (Federico): dolor=carta igual al bar de enfrente / sin propuesta de uso | anhelo=diferenciarse + monetizar previa | cambio=lo-mismo-que-todos → algo-único-premiado
  Persona 3 (Carla): dolor=catálogo argentino repetitivo / productores inestables | anhelo=hallazgo argentino con respaldo + relación con productor serio | cambio=sin-argentino-digno → tengo-hallazgo-local

Beneficios tangibles:
  - 49 días de maceración con 12 botánicos
  - Doble medalla de plata Copa Argentina de Destilados (2025 + 2026)
  - 100 botellas/mes con capacidad ociosa de crecimiento
  - Margen comparable o superior a importado premium
  - Botella 700 cm³ a $10.500 PVP / $8.000 mayorista
  - Consignación con retiro garantizado en 60 días
  - Kit comercial integral entregado en cada bar (carta + receta + sticker + capacitación 30 min)

Beneficios intangibles:
  - Pertenencia a Casa Sarria (10 años de trayectoria con Session Beer + Granero Sur por venir)
  - Identidad pergaminense con narrativa propia (no porteño sin territorio)
  - Validación nacional (medallas) que da permiso racional para elegir
  - Ritual del "antes" — posicionamiento de un momento de consumo subexplotado
  - Producto premiado con humildad pergaminense (no pose snob)

═══════════════════════════════════════
6. DIFERENCIADORES
═══════════════════════════════════════
Operativos:
  - Planta propia con capacidad ociosa de producción
  - Logística reutilizable con la operación de Session Beer (mismo radio comercial, mismos clientes, misma flota)
  - Equipo con capacidad de dedicación adicional sin necesidad de contratar
  - Base operativa en Pergamino: cerca del cliente del Anillo 1 y 2, distancia razonable al Anillo 3 (CABA)

Tecnológicos / digitales:
  - Operación digital simple y enfocada: Instagram como canal único de comunicación pública + WhatsApp como canal único de venta y atención
  - Estructura mínima deliberada: evita ruido, mantiene cercanía con el cliente y permite que cada conversación con un bar o vinoteca sea personalizada
  - NO trabaja e-commerce ni marketplaces
  - Incorporación de CRM y sistematización de pedidos en agenda de mejoras a evaluar

De servicio:
  - Kit comercial integral entregado en cada bar: carta de tragos sugerida + tarjetón con receta del Pedro y Mateo con pomelo + sticker conmemorativo de la doble medalla + capacitación de 30 minutos al equipo del bar + prueba sin riesgo a consignación con retiro garantizado si no rota
  - Acompañamiento sostenido posventa con visita mensual de reposición y feedback

De producto / oferta:
  - Vermouth Torino Rosso premium con 49 días de maceración y 12 botánicos
  - Doble medalla de plata en la Copa Argentina de Destilados (2025 + 2026)
  - Margen unitario alto, comparable o superior al de Session Beer
  - Identidad pergaminense diferencial frente a vermouths importados europeos y frente a vermouths porteños sin territorio claro
  - Pertenencia al portafolio Casa Sarria, junto con Session Beer (cerveza, 10 años) y Granero Sur (whisky, lanzamiento julio 2026)

═══════════════════════════════════════
7. COBERTURA Y OPERACIÓN (Opcional)
═══════════════════════════════════════
Planta y depósito principal — Marcelino Ugarte 1122, Pergamino, Provincia de Buenos Aires, Argentina

Plan de cobertura por anillos concéntricos:
  Anillo 1 (jun-sep 2026): Pergamino completo — vinotecas premium consolidadas + apertura canal HORECA (5 bares objetivo)
  Anillo 2 (oct 2026 - mar 2027): radio 200 km — Junín, San Nicolás, Salto, Arrecifes, Colón, Rojas, San Pedro
  Anillo 3 (abr 2027 en adelante): CABA + GBA norte — Palermo, San Telmo, Belgrano (entrada como Casa Sarria con portfolio completo)

Distribuidores: distribución directa por equipo Casa Sarria, sin distribuidores intermedios por el momento.

═══════════════════════════════════════
8. OFERTA COMERCIAL
═══════════════════════════════════════
Servicios:
  - Vermouth Pedro y Mateo Torino Rosso: botella única de 700 cm³. Sin estuche, sin packs especiales. Presentación regular constante.
    Condiciones: PVP sugerido $10.500 por botella; precio mayorista $8.000 por botella para bar y vinoteca; transferencia o efectivo; pago dentro de 30 días; descuentos por volumen a evaluar caso por caso (precio referencial 2026 — verificar vigencia).
    Normativa: venta exclusiva a mayores de 18 años; normativa comercial/bromatológica específica pendiente validar con cliente.
    Tarifa: $10.500 PVP / $8.000 mayorista por botella de 700 cm³ (precio referencial 2026 — verificar vigencia).
  - Prueba sin riesgo para bares nuevos del Anillo 1: primera caja a consignación con retiro sin cargo si el producto no rota.
    Condiciones: retiro garantizado a los 60 días si no hay rotación; aplica a bares nuevos del Anillo 1; requiere validación comercial caso por caso.

Procedimientos:
  - Cliente final: en vinotecas premium de Pergamino y radio (presencial). Pedidos puntuales por WhatsApp +54 9 2477 329612.
  - Bares y vinotecas (B2B): contacto directo por WhatsApp comercial. Visita personal de Casa Sarria con kit comercial completo.

Marcas representadas: Casa Sarria — Session Beer, Pedro y Mateo, Granero Sur.

═══════════════════════════════════════
9. CIFRAS CLAVE (Opcional)
═══════════════════════════════════════
  - Producción actual: 100 botellas/mes con capacidad ociosa
  - Plan Anillo 1 (jun-sep 2026): 180-200 botellas/mes sostenidas
  - Plan Anillo 2 (oct 2026 - mar 2027): 400-500 botellas/mes sostenidas
  - Plan Anillo 3 (abr 2027 en adelante): 800-1.200 botellas/mes sostenidas
  - Crecimiento esperado 18 meses: de 100 → 800-1.200 botellas/mes (8x-12x)
  - Reconocimientos: Doble medalla de plata Copa Argentina de Destilados (2025 + 2026)
  - Lanzamiento oficial: 2024 (Expo Vinos)
  - Casa Sarria: 10 años de operación continua de Session Beer (paraguas familiar)

═══════════════════════════════════════
10. CANALES Y ACTIVOS DIGITALES
═══════════════════════════════════════
Presencia digital:
  Teléfono: +54 9 2477 329612
  WhatsApp: +54 9 2477 329612
  Instagram: @vermouthpedroymateo
  Facebook: No aplica — presencia digital concentrada en Instagram.
  Web: (Información pendiente — Casa Sarria opera sin sitio web por el momento. Comunicación digital concentrada en Instagram + WhatsApp)
  Tienda online: No aplica — comercialización exclusiva por canal físico y pedidos puntuales por WhatsApp.
  Portal clientes: No aplica.

Soporte y atención:
  Email contacto: No aplica — gestión integral por WhatsApp.
  Email especializado: No aplica.
  Tiempo respuesta RRSS: (Información pendiente — requiere insumo del cliente)
  Tiempo respuesta email: No aplica.
  CRM/herramientas: WhatsApp + planilla manual al día de hoy. Incorporación de CRM en agenda de mejoras a evaluar.

═══════════════════════════════════════
11. CTAs VALIDADOS
═══════════════════════════════════════
Frases / títulos que funcionan:
  - "Pedro y Mateo. El antes."
  - "Hay rituales que tardan más en hacerse que en disfrutarse."
  - "49 días. 12 botánicos. Una receta que no se toca."
  - "Algunas elecciones no se hacen, se confirman."
  - "Hecho en Pergamino, premiado en Argentina."
  - "La cerveza es para el grito. Pedro y Mateo, para la espera."
  - "Doble medalla de plata. Dos años seguidos. Lo dijeron los catadores, no nosotros."
  - "Antes que el partido. Antes que la cena. Antes que el brindis."

CTAs validados:
  - "Pedilo en las vinotecas premium de Pergamino."
  - "Conseguilo donde sepan recomendarlo."
  - "Servilo con hielo grande y pomelo."
  - "Encontranos en los bares que entienden el antes."
  - "Conocé más en Casa Sarria."
  - "Sumalo a tu carta — escribinos."

Frases descartadas (NUNCA usar):
  - "El mejor vermouth de Argentina" (queda mal con la humildad pergaminense)
  - "Experiencia premium" / "experiencia gourmet" (genérico, vacío)
  - "Vermouth artesanal con tradición italiana" (no somos italianos)
  - "Sabor inigualable / inolvidable / excepcional" (adjetivos vacíos)
  - "Innovador / disruptivo / revolucionario" (P&M no rompe nada, recupera)
  - "Para los que saben" (excluyente, snob)
  - "Lujo / sofisticación / exclusividad" (no es el territorio)
  - "Vermouth premium gourmet" (etiqueta cosmopolita falsa)
  - "Edición limitada" (no aplica, es producción regular)

═══════════════════════════════════════
12. PERSONALIDAD, ARQUETIPO Y TONO
═══════════════════════════════════════
Arquetipo Mark/Pearson: Sage (Sabio)
Justificación: Sage no busca convencer a gritos: muestra el método y deja que la prueba ciega de los catadores hable. Pedro y Mateo encarna ese arquetipo en su humildad pergaminense, su paciencia productiva y su confianza en la receta sin tocar.

Arquetipo secundario: Everyman (Hombre Común) — la accesibilidad sin pretensión, la mesa común, el aperitivo del domingo.
Justificación: la marca no se posiciona como elite ni cosmopolita. Habla desde la mesa puesta, la previa con amigos, el ritual cotidiano. El cliente premium se siente identificado, no jerarquizado por encima.

Arquetipos descartados:
  - Hero (Héroe) — demasiado épico. P&M no salva al mundo, lo acompaña en el "antes".
  - Magician (Mago) — demasiado transformación / promesa. P&M no transforma, recupera lo que ya estaba bien hecho.
  - Ruler (Gobernante) — demasiado autoridad / lujo. P&M no domina, sugiere.
  - Lover (Amante) — demasiado pasión / sensualidad. P&M es ritual contenido, no éxtasis.
  - Innocent (Inocente) — demasiado naive. P&M es marca con oficio, no ingenua.

Manifestación del arquetipo en la marca:
La marca aparece en escenas cotidianas elevadas por el oficio: mesa puesta del domingo, hielera con copas, mantel viejo pero bien planchado, copas que combinan, una conversación que toma su tiempo. Los símbolos recurrentes son el pomelo, la maceración como proceso visible, la medalla como firma al pie (no como titular), Pergamino como territorio físico (campo, pueblo, casa). Situaciones típicas que activan el arquetipo: la sobremesa larga del domingo, la previa del partido con amigos en casa, el aperitivo de noche antes que llegue la gente a comer.

Personalidad narrativa: Si Pedro y Mateo fuera una persona, sería un hombre o mujer de 50 años. Pergaminense de toda la vida. Profesional con oficio reconocido (médico de pueblo, abogado de familia, productor agropecuario establecido, escribano). Camina sin apuro pero llega temprano. Cuando habla, no levanta la voz: hace preguntas. Tiene buen humor seco. Sabe de vinos pero no impone. Su casa no es ostentosa pero todo lo que hay adentro está elegido con criterio: el mantel es viejo y se lava, las copas combinan, el vino se sirve a la temperatura que va. Recibe gente los domingos. Cuando viene un amigo de Buenos Aires, lo lleva al campo. Cuando le preguntan qué hace para divertirse, contesta "esto" señalando la mesa.

Tono de voz:
  - Serena — sin levantar la voz, sin urgencias falsas, sin signos de exclamación.
  - Sugerida — siempre antes que explicada. Si el copy se entiende sin la frase obvia, sacar la frase obvia.
  - Pergaminense — no esconde el origen ni lo glorifica. Pergamino es dato, no estandarte.
  - Honesta — usa datos concretos (49 días, 12 botánicos, 2025 + 2026) en lugar de adjetivos vacíos.
  - Con humor seco — sin chiste obvio, sin guiño excesivo. El humor está en la elección de la palabra, no en el remate.
  - Sin pretensión — habla desde la mesa común. Recibe, no exhibe.

Directivas para generación de contenido:
  - Siempre: hablar en español rioplatense con vos.
  - Siempre: mencionar Pergamino sin esconderlo y sin glorificarlo.
  - Siempre: sugerir antes que explicar. Si el copy se entiende sin la frase obvia, sacar la frase obvia.
  - Siempre: dejar al lector trabajar. No completar lo que se puede insinuar.
  - Siempre: usar datos concretos (49 días, 12 botánicos, 2025 + 2026) en lugar de adjetivos vacíos.
  - Siempre: tratar a la doble medalla como confirmación, no como argumento principal.
  - Siempre: conservar el tiempo presente — la marca está acá, ahora, sin nostalgia.
  - Siempre: aceptar el silencio. Las piezas pueden tener pocas palabras.
  - Nunca: tratar de usted ni usar lenguaje publicitario obvio.
  - Nunca: esconder el origen pergaminense.
  - Nunca: mencionar ni hablar mal de la competencia (Carpano, Cinzano, Gancia, otros).
  - Nunca: exagerar con adjetivos (el mejor, único, excepcional, increíble, inigualable).
  - Nunca: usar lenguaje aspiracional de lujo (élite, premium, exclusivo, sofisticado).
  - Nunca: gritar la medalla. Aparece como firma al pie, no como titular.
  - Nunca: apurar al lector. Sin urgencias falsas (hoy solamente, última oportunidad, no te lo pierdas).
  - Nunca: usar modismos publicitarios trillados (descubrí, atrevete, viví, sentí).
  - Nunca: hablar en imperativo de venta dura.
  - Nunca: explicar lo obvio.
  - Nunca: terminar un copy con signo de exclamación.

Palabras clave de marca:
  antes, maceración, botánicos, ritual, espera, Pergamino, pomelo, hielera, aperitivo, receta, oficio, paciencia, mesa, tarde, Casa Sarria

Lo que la marca NO es:
  - NO es un vermouth industrial / SÍ es un vermouth con receta de 49 días y 12 botánicos
  - NO es un vermouth importado pretencioso / SÍ es un argentino con doble medalla nacional
  - NO es un vermouth porteño sin territorio / SÍ es del interior, pergaminense, con identidad geográfica clara
  - NO es producto suelto / SÍ es parte de Casa Sarria, junto a Session Beer y Granero Sur
  - NO es vermouth de moda / SÍ es vermouth de método: misma receta, misma paciencia, mismo lugar

Vocabulario visual canónico: (pendiente — el moodboard editorial está por entregarse. Anchors propios + Geografía + Texturas + Luces + Iconografía + Ángulos a definir cuando lleguen las 20-30 imágenes)

$ana_ficha$,
  '{}'::jsonb
)
on conflict (brand_id, version) do nothing;

insert into public.creatives (id, brand_id, kind, status, format, title, headline, subhead, copy, caption, visual_cue, palette, tags, pipeline)
values
  (642, (select id from public.brands where code = 'VPM'), 'cover', 'aprobado', 'Feed 4:5', 'El antes del partido', 'Antes que el grito.', 'Pedro y Mateo con hielo grande y pomelo.', 'La cerveza llega después. Este es el rato anterior.', 'Hay rituales que empiezan antes de que pase algo. Pedro y Mateo, Pergamino.', 'Mesa de madera, hielera baja, pomelo cortado, luz de tarde y una radio de fondo.', '#3A4A42', array['Mundial','Pergamino','Pomelo'], '[{"title":"Idea","body":"Usar la previa del partido sin logos ni camisetas oficiales."},{"title":"Ancla en ficha","body":"DIM-03 momento de uso: previa de partido. DIM-12 tono sereno."},{"title":"Restricción","body":"Sin símbolos FIFA/AFA ni épica futbolera."}]'::jsonb),
  (641, (select id from public.brands where code = 'VPM'), 'cover', 'para publicar', 'Story 9:16', '49 días', '49 días.', '12 botánicos. Una receta que no se toca.', 'Hay esperas que hacen el trabajo.', 'No todo lo bueno pide velocidad.', 'Primer plano de botella sobre mesa oscura, calendario marcado y sombras de copa.', '#6B3027', array['Método','Maceración'], '[{"title":"Idea","body":"Convertir el dato técnico en motivo editorial."},{"title":"Ancla en ficha","body":"DIM-06 diferenciadores: 49 días y 12 botánicos."},{"title":"Salida","body":"Story 9:16 + versión feed con copy mínimo."}]'::jsonb),
  (639, (select id from public.brands where code = 'VPM'), 'carrusel', 'para revision', 'Carrusel', 'Doble plata', 'Lo dijeron a ciegas.', 'Copa Argentina de Destilados 2025 + 2026.', 'La medalla no es el tema. Es la confirmación.', 'Dos años seguidos. Sin levantar la voz.', 'Certificado, copa baja, etiqueta visible, fondo de barra con luz cálida.', '#77715E', array['Medallas','Prueba social'], '[{"title":"Idea","body":"Tratar la medalla como prueba, no como slogan."},{"title":"Ancla en ficha","body":"DIM-02 validación externa. DIM-12 no gritar la medalla."},{"title":"Pendiente","body":"Confirmar material visual real de las medallas."}]'::jsonb),
  (635, (select id from public.brands where code = 'VPM'), 'ugc', 'borrador', 'Story 9:16', 'Bar de Pergamino', 'No te dejo una botella.', 'Te dejo un trago que el equipo puede contar.', 'Pedro y Mateo con pomelo. Media hora de capacitación. Sesenta días para probar.', 'Para bares que quieren una previa con nombre propio.', 'Encargado de bar apoyado en barra, preparando pomelo y tónica sin mirar a cámara.', '#264653', array['B2B','HORECA'], '[{"title":"Concepto UGC","body":"Dueño de bar explicando riesgo cero, sin tono vendedor."},{"title":"Ancla en ficha","body":"DIM-05 Federico. DIM-08 consignación."},{"title":"Próximo paso","body":"Grabar 2 tomas verticales en barra real."}]'::jsonb),
  (631, (select id from public.brands where code = 'VPM'), 'cover', 'observado', 'Feed 4:5', 'Vinoteca premium', 'Conseguilo donde sepan recomendarlo.', 'Pergamino. 49 días. Doble plata.', 'Para cuando alguien pide algo distinto y conviene tener una respuesta.', 'Pedro y Mateo ya tiene historia para ser contado.', 'Mano de vinoteca tomando botella desde una estantería baja, etiqueta visible.', '#54483D', array['Vinoteca','B2B'], '[{"title":"Idea","body":"Hablarle a Carla, la persona compradora de vinoteca."},{"title":"Observación","body":"Falta lista real de puntos de venta para cerrar CTA."},{"title":"Ancla en ficha","body":"DIM-05 Carla. DIM-11 CTA validado."}]'::jsonb),
  (628, (select id from public.brands where code = 'VPM'), 'motion', 'aprobado', 'Story 9:16', 'La mesa espera', 'La mesa ya sabe.', 'Vos servís el antes.', 'Copa baja, hielo grande, pomelo. El resto llega solo.', 'A veces alcanza con preparar bien el comienzo.', 'Secuencia lenta: hielo, vermouth, pomelo, mano dejando la copa sobre mantel viejo.', '#8A4B31', array['Motion','Ritual'], '[{"title":"Idea","body":"Motion simple, sin rostros ni celebración obvia."},{"title":"Ancla en ficha","body":"DIM-12 ritual cotidiano elevado por oficio."},{"title":"Salida","body":"4 cortes de 2 segundos para reel vertical."}]'::jsonb)
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
  ('I1', (select id from public.brands where code = 'VPM'), 'usada', 'Antes que el grito', 'Mundial', 'S3 - momento de uso', 'Aprovechar la previa del Mundial 2026 sin usar símbolos oficiales.', array['Antes que el grito.','La cerveza llega después.','El partido todavía no empezó.'], 'DIM-03: previa de partido + DIM-12: tono sereno, sin épica.', 'Convierte la ocasión masiva en un ritual adulto y cuidado.', 1),
  ('I2', (select id from public.brands where code = 'VPM'), 'disponible', 'La medalla como firma', 'Prueba social', 'S9 - cifras clave', 'Doble medalla de plata 2025 + 2026 como confirmación silenciosa.', array['Lo dijeron a ciegas.','Dos años seguidos.','La medalla no es el tema. Es la confirmación.'], 'DIM-02: validación externa + DIM-11: frases aprobadas.', 'Evita el tono triunfalista y conserva la humildad pergaminense.', 2),
  ('I3', (select id from public.brands where code = 'VPM'), 'disponible', 'Pedro y Mateo con pomelo', 'Oferta', 'S8 - propuesta comercial', 'Trago de la casa para bares nuevos del Anillo 1.', array['No te dejo una botella.','Te dejo un trago que se puede contar.','Pomelo, hielo grande, media hora de capacitación.'], 'DIM-05: Federico + DIM-08: consignación y kit comercial.', 'Idea orientada a B2B: bares de Pergamino y radio cercano.', 3),
  ('I4', (select id from public.brands where code = 'VPM'), 'disponible', 'Pergamino no se esconde', 'Territorio', 'S12 - tono', 'Usar el origen como dato de criterio, no como postal turística.', array['Hecho en Pergamino, premiado en Argentina.','El lugar también macera.','No hace falta parecer de otro lado.'], 'DIM-01: sede + DIM-12: pergaminense sin glorificar.', 'Puede convertirse en carrusel institucional de Casa Sarria.', 4)
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
  (1, (select id from public.brands where code = 'VPM'), '26-may, 09:40', 'pendiente', 'Confirmar puntos de venta', 'Necesitamos lista de vinotecas premium de Pergamino para cerrar CTAs y publicaciones.', 'PV'),
  (2, (select id from public.brands where code = 'VPM'), '26-may, 09:10', 'pendiente', 'Subir fotos de producto en uso', 'Prioridad: botella servida, copa con pomelo, barra real, medallas y etiqueta en alta.', 'IMG'),
  (3, (select id from public.brands where code = 'VPM'), '25-may, 21:35', 'pendiente', 'Validar precio vigente', 'El PVP .500 y mayorista .000 figuran como referenciales mayo 2026.', '$'),
  (4, (select id from public.brands where code = 'VPM'), '25-may, 19:20', 'resuelto', 'Cargar ficha de marca inicial', 'Ficha 12 dimensiones cargada localmente desde respuestas de Eduardo y estrategia Casa Sarria.', 'OK')
on conflict (id) do update set
  status = excluded.status,
  title = excluded.title,
  detail = excluded.detail,
  asset = excluded.asset;

select setval(pg_get_serial_sequence('public.requirements','id'), greatest((select max(id) from public.requirements), 1));

insert into public.publications (id, brand_id, creative_id, date, day, time, channel, format, status, title)
values
  (606, (select id from public.brands where code = 'VPM'), 642, '2026-06-03', 3, '18:00', 'Instagram', 'Feed 4:5', 'programada', 'Antes que el grito'),
  (604, (select id from public.brands where code = 'VPM'), 641, '2026-06-05', 5, '11:30', 'Instagram', 'Story 9:16', 'borrador', '49 días'),
  (598, (select id from public.brands where code = 'VPM'), 639, '2026-06-10', 10, '19:00', 'Instagram', 'Carrusel', 'programada', 'Lo dijeron a ciegas'),
  (592, (select id from public.brands where code = 'VPM'), 635, '2026-06-13', 13, '20:15', 'Instagram', 'Story 9:16', 'borrador', 'Bar de Pergamino'),
  (585, (select id from public.brands where code = 'VPM'), 631, '2026-06-18', 18, '10:00', 'LinkedIn', 'Feed 4:5', 'programada', 'Vinotecas premium'),
  (579, (select id from public.brands where code = 'VPM'), 628, '2026-06-21', 21, '12:00', 'Instagram', 'Story 9:16', 'publicada', 'La mesa espera')
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
  ('M1', (select id from public.brands where code = 'VPM'), 'Ficha de marca 12 dimensiones cargada', 'aplicado', 'Marca', 'La base estratégica ya existe y alimenta ideas/copy.'),
  ('M2', (select id from public.brands where code = 'VPM'), 'Faltan assets visuales reales', 'critico', 'Marca', 'Sin fotos y logo en alta, las piezas quedan como mockups tipográficos.'),
  ('M3', (select id from public.brands where code = 'VPM'), 'Precios marcados como referenciales', 'pendiente', 'Marca', 'Validar vigencia antes de publicar piezas comerciales.'),
  ('C1', (select id from public.brands where code = 'VPM'), '4 ideas iniciales listas', 'aplicado', 'Contenido', 'Cubren Mundial, medallas, bares y territorio.'),
  ('C2', (select id from public.brands where code = 'VPM'), 'Falta calendario de campaña Anillo 1', 'pendiente', 'Contenido', 'Se recomienda plan semanal junio-septiembre 2026.'),
  ('S1', (select id from public.brands where code = 'VPM'), 'Sin sitio web público de Casa Sarria', 'pendiente', 'SEO', 'Por ahora Instagram + WhatsApp. SEO queda limitado.'),
  ('P1', (select id from public.brands where code = 'VPM'), 'Sin integraciones de publicación', 'pendiente', 'Performance', 'La UI simula agenda; falta conectar Buffer/Zernio/Meta.'),
  ('X1', (select id from public.brands where code = 'VPM'), 'Formulario de requerimientos conectado a DB', 'aplicado', 'Conversión', 'El formulario guarda requerimientos en Supabase para uso real con clientes.')
on conflict (brand_id, code) do update set
  title = excluded.title,
  status = excluded.status,
  category = excluded.category,
  note = excluded.note;
