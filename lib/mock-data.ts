export type Brand = {
  code: string;
  name: string;
  slug: string;
  slogan?: string;
  crs: number;
  assets: number;
  users: number;
  socials: {
    web?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    linkedin?: string;
    whatsapp?: string;
  };
  parent?: string;
};

export type BrandUser = {
  email: string;
  role: "admin" | "cliente" | "operador";
  status: "activo" | "sin confirmar";
  invited: string;
  lastAccess: string;
};

export type BrandDimension = {
  n: string;
  title: string;
  category: string;
  status: "completa" | "pendiente";
  required: "obligatoria" | "opcional" | "critica";
  summary: string;
  fields: { label: string; value: string | string[] }[];
  pending?: string[];
};

export type CreativePiece = {
  id: number;
  kind: "cover" | "motion" | "carrusel" | "ugc";
  status: "aprobado" | "para revision" | "observado" | "borrador" | "para publicar";
  format: "Feed 4:5" | "Story 9:16" | "Carrusel";
  title: string;
  headline: string;
  subhead: string;
  copy: string;
  caption: string;
  visualCue: string;
  palette: string;
  tags: string[];
  pipeline: { title: string; body: string }[];
};

export type Idea = {
  id: string;
  status: "usada" | "disponible";
  title: string;
  category: string;
  skill: string;
  trigger: string;
  phrases: string[];
  anchor: string;
  notes: string;
};

export type Requirement = {
  id: number;
  date: string;
  status: "pendiente" | "resuelto";
  title: string;
  detail: string;
  asset?: string;
};

export type Publication = {
  id: number;
  date: string;
  day: number;
  time: string;
  channel: "Instagram" | "Facebook" | "LinkedIn" | "TikTok";
  format: "Feed 4:5" | "Story 9:16" | "Carrusel";
  status: "programada" | "publicada" | "borrador";
  title: string;
  creativeId: number;
};

export type AuditItem = {
  code: string;
  title: string;
  status: "critico" | "pendiente" | "aplicado";
  category: "Marca" | "Contenido" | "SEO" | "Performance" | "Conversión";
  note: string;
};

export const brands: Brand[] = [
  {
    code: "VPM",
    name: "Vermouth Pedro y Mateo",
    slug: "vermouth-pedro-y-mateo",
    slogan: "Pedro y Mateo. El antes.",
    parent: "Casa Sarria",
    crs: 12,
    assets: 18,
    users: 3,
    socials: {
      instagram: "https://instagram.com/vermouthpedroymateo",
      whatsapp: "https://wa.me/5492477329612",
    },
  },
  {
    code: "DRV",
    name: "Driven",
    slug: "driven",
    slogan: "Equipate para todo",
    crs: 4,
    assets: 9,
    users: 1,
    socials: {
      web: "https://driven.com.ar",
      instagram: "https://instagram.com/driven.ar",
      facebook: "https://facebook.com/driven.ar",
      tiktok: "https://tiktok.com/@driven.ar",
    },
  },
];

export const brandUsers: Record<string, BrandUser[]> = {
  VPM: [
    { email: "anapaula@driven.com.ar", role: "admin", status: "activo", invited: "hoy", lastAccess: "hoy" },
    { email: "eduardo@casasarria.com", role: "cliente", status: "sin confirmar", invited: "pendiente", lastAccess: "-" },
    { email: "paumedium@gmail.com", role: "operador", status: "activo", invited: "ayer", lastAccess: "hoy" },
  ],
  DRV: [
    { email: "paumedium@gmail.com", role: "admin", status: "activo", invited: "may 2026", lastAccess: "hoy" },
  ],
};

export const brandDimensions: Record<string, BrandDimension[]> = {
  VPM: [
    {
      n: "01",
      title: "Identidad corporativa",
      category: "Identidad y propósito",
      status: "completa",
      required: "obligatoria",
      summary: "Pedro y Mateo es el vermouth Torino Rosso premium de Casa Sarria, hecho en Pergamino.",
      fields: [
        { label: "Nombre comercial", value: "Pedro y Mateo" },
        { label: "Casa paraguas", value: "Casa Sarria" },
        { label: "Slogan principal", value: "Pedro y Mateo. El antes." },
        { label: "Fundación", value: "2024, lanzamiento oficial en Expo Vinos" },
        { label: "Antigüedad calculada", value: "2 años al 2026" },
        { label: "Sede", value: "Marcelino Ugarte 1122, Pergamino, Buenos Aires" },
        { label: "Gerente general", value: "Eduardo Sarrio" },
        { label: "Sector", value: "Bebidas alcohólicas, vermouth Torino Rosso premium artesanal" },
        { label: "Alcance geográfico", value: "Pergamino, radio 200 km y CABA/GBA curado por anillos de crecimiento." },
      ],
    },
    {
      n: "02",
      title: "Propósito",
      category: "Identidad y propósito",
      status: "completa",
      required: "obligatoria",
      summary: "Devolverle al aperitivo el lugar del antes: un rato cuidado entre la rutina y lo que importa.",
      fields: [
        { label: "Misión", value: "Hacer vermouth como se hacía antes: con tiempo, oficio y una receta que no se apura." },
        { label: "Visión", value: "Ser el vermouth argentino que define el antes y consolida a Casa Sarria como casa de bebidas hecha en Pergamino." },
        { label: "Valores", value: ["Paciencia", "Identidad pergaminense", "Validación externa", "Capacidad medida", "Portafolio integrado"] },
      ],
    },
    {
      n: "03",
      title: "Posicionamiento estratégico",
      category: "Identidad y propósito",
      status: "completa",
      required: "obligatoria",
      summary: "Producto premiado, local y sereno: 49 días, 12 botánicos, doble medalla nacional.",
      fields: [
        { label: "Propuesta de valor", value: "El vermouth del antes: el rato que separa la rutina de lo que importa." },
        {
          label: "Mapa de posición",
          value:
            "                 Identidad territorial alta\n" +
            "                         ↑\n" +
            "         Pedro y Mateo   │   Vermouths argentinos curados\n" +
            "                         │\n" +
            "Producto de método  ←────┼────→ Producto de moda\n" +
            "                         │\n" +
            "   Industriales masivos  │   Importados premium\n" +
            "                         ↓\n" +
            "                 Identidad territorial baja",
        },
        { label: "Momentos de uso", value: ["Previa de partido", "Aperitivo antes de cenar", "Sobremesa de domingo", "Coctelería de autor", "Regalo de vinoteca premium"] },
        { label: "Claim", value: "Pedro y Mateo. El antes." },
      ],
    },
    {
      n: "04",
      title: "Arquitectura de marca",
      category: "Mercado y público",
      status: "completa",
      required: "opcional",
      summary: "Casa Sarria funciona como paraguas familiar para Session Beer, Pedro y Mateo y Granero Sur.",
      fields: [
        { label: "Paraguas", value: "Casa Sarria" },
        { label: "Marcas", value: ["Session Beer: marca insignia con 10 años de operación", "Pedro y Mateo: vermouth Torino Rosso", "Granero Sur: whisky, lanzamiento previsto julio 2026"] },
      ],
    },
    {
      n: "05",
      title: "Público objetivo + buyer personas",
      category: "Mercado y público",
      status: "completa",
      required: "critica",
      summary: "Tres públicos centrales: cliente final premium, bar de coctelería y vinoteca premium.",
      fields: [
        { label: "Martín, cliente final premium", value: "35-55 años. Busca una elección propia, argentina y validada para servir cuando recibe gente." },
        { label: "Federico, dueño de bar", value: "28-45 años. Necesita diferenciar su carta y monetizar la previa con una propuesta de uso clara." },
        { label: "Carla, vinoteca premium", value: "40-60 años. Quiere un hallazgo argentino con historia, continuidad y margen." },
        { label: "Cambio emocional", value: ["De servir lo de siempre a tener una elección propia", "De carta igual a propuesta única", "De catálogo repetitivo a hallazgo local premiado"] },
      ],
    },
    {
      n: "06",
      title: "Diferenciadores",
      category: "Diferenciación y operación",
      status: "completa",
      required: "obligatoria",
      summary: "Método, medallas, Pergamino y un paquete comercial listo para bares.",
      fields: [
        { label: "Producto", value: "49 días de maceración, 12 botánicos, Torino Rosso." },
        { label: "Validación", value: "Doble medalla de plata Copa Argentina de Destilados 2025 + 2026." },
        { label: "Servicio", value: "Kit para bares: receta, carta sugerida, sticker, capacitación y consignación." },
        { label: "Operación", value: "Logística reutilizable con Session Beer y base en Pergamino." },
      ],
    },
    {
      n: "07",
      title: "Cobertura y operación",
      category: "Diferenciación y operación",
      status: "completa",
      required: "opcional",
      summary: "Crecimiento por anillos: Pergamino, radio 200 km, luego CABA/GBA curado.",
      fields: [
        { label: "Anillo 1", value: "Junio-septiembre 2026: Pergamino completo, 5 bares objetivo, 180-200 botellas/mes." },
        { label: "Anillo 2", value: "Octubre 2026-marzo 2027: Junín, San Nicolás, Salto, Arrecifes, Colón, Rojas y San Pedro." },
        { label: "Anillo 3", value: "Abril 2027 en adelante: CABA y GBA norte, circuito curado." },
      ],
    },
    {
      n: "08",
      title: "Oferta comercial",
      category: "Comercial y digital",
      status: "completa",
      required: "obligatoria",
      summary: "Botella única de 700 cm3, venta física y propuesta de consignación para bares nuevos.",
      fields: [
        { label: "Producto", value: "Vermouth Pedro y Mateo Torino Rosso, botella 700 cm3." },
        { label: "PVP", value: "$10.500 por botella, referencial mayo 2026; verificar vigencia." },
        { label: "Mayorista", value: "$8.000 por botella para bar y vinoteca, referencial mayo 2026." },
        { label: "Condiciones", value: "Transferencia o efectivo; pago dentro de 30 días; consignación con retiro si no rota en 60 días para bares nuevos." },
      ],
    },
    {
      n: "09",
      title: "Cifras clave",
      category: "Comercial y digital",
      status: "completa",
      required: "opcional",
      summary: "Producción actual de 100 botellas/mes y plan de crecimiento 8x-12x en 18 meses.",
      fields: [
        { label: "Actual", value: "100 botellas mensuales con capacidad ociosa." },
        { label: "Meta 18 meses", value: "800-1.200 botellas mensuales si se consolidan los tres anillos." },
        { label: "Reconocimientos", value: "Doble medalla de plata Copa Argentina de Destilados 2025 + 2026." },
      ],
    },
    {
      n: "10",
      title: "Canales y activos digitales",
      category: "Comercial y digital",
      status: "completa",
      required: "obligatoria",
      summary: "Presencia digital deliberadamente mínima: Instagram para relato, WhatsApp para venta.",
      fields: [
        { label: "Instagram", value: "@vermouthpedroymateo" },
        { label: "WhatsApp", value: "+54 9 2477 329612" },
        { label: "No aplica", value: "Sitio web, e-commerce, Facebook, TikTok, LinkedIn y YouTube no están activos para la marca; la operación digital se concentra en Instagram y WhatsApp." },
      ],
      pending: ["Confirmar si existirá Instagram paraguas de Casa Sarria."],
    },
    {
      n: "11",
      title: "CTAs validados",
      category: "Expresión y voz",
      status: "completa",
      required: "obligatoria",
      summary: "Invitación serena, sin venta dura ni urgencias falsas.",
      fields: [
        { label: "Frases", value: ["Pedro y Mateo. El antes.", "49 días. 12 botánicos. Una receta que no se toca.", "Hecho en Pergamino, premiado en Argentina."] },
        { label: "CTAs", value: ["Pedilo en las vinotecas premium de Pergamino.", "Servilo con hielo grande y pomelo.", "Sumalo a tu carta - escribinos."] },
        { label: "Nunca usar", value: ["El mejor vermouth de Argentina", "Experiencia premium", "Para los que saben", "Última oportunidad"] },
      ],
    },
    {
      n: "12",
      title: "Personalidad, arquetipo y tono",
      category: "Expresión y voz",
      status: "completa",
      required: "obligatoria",
      summary: "Sabio + hombre común: oficio, calma, humor seco y mesa cotidiana.",
      fields: [
        { label: "Arquetipo principal", value: "Sage / Sabio: método, datos concretos y validación externa." },
        { label: "Arquetipo secundario", value: "Everyman / Hombre común: mesa compartida, cercanía, sin pretensión." },
        { label: "Tono", value: ["Sereno", "Sugerido", "Pergaminense", "Honesto", "Con humor seco", "Sin pretensión"] },
        { label: "Directiva clave", value: "La medalla aparece como firma silenciosa, no como grito de venta." },
      ],
    },
  ],
};

export const creativePieces: Record<string, CreativePiece[]> = {
  VPM: [
    {
      id: 642,
      kind: "cover",
      status: "aprobado",
      format: "Feed 4:5",
      title: "El antes del partido",
      headline: "Antes que el grito.",
      subhead: "Pedro y Mateo con hielo grande y pomelo.",
      copy: "La cerveza llega después. Este es el rato anterior.",
      caption: "Hay rituales que empiezan antes de que pase algo. Pedro y Mateo, Pergamino.",
      visualCue: "Mesa de madera, hielera baja, pomelo cortado, luz de tarde y una radio de fondo.",
      palette: "#3A4A42",
      tags: ["Mundial", "Pergamino", "Pomelo"],
      pipeline: [
        { title: "Idea", body: "Usar la previa del partido sin logos ni camisetas oficiales." },
        { title: "Ancla en ficha", body: "DIM-03 momento de uso: previa de partido. DIM-12 tono sereno." },
        { title: "Restricción", body: "Sin símbolos FIFA/AFA ni épica futbolera." },
      ],
    },
    {
      id: 641,
      kind: "cover",
      status: "para publicar",
      format: "Story 9:16",
      title: "49 días",
      headline: "49 días.",
      subhead: "12 botánicos. Una receta que no se toca.",
      copy: "Hay esperas que hacen el trabajo.",
      caption: "No todo lo bueno pide velocidad.",
      visualCue: "Primer plano de botella sobre mesa oscura, calendario marcado y sombras de copa.",
      palette: "#6B3027",
      tags: ["Método", "Maceración"],
      pipeline: [
        { title: "Idea", body: "Convertir el dato técnico en motivo editorial." },
        { title: "Ancla en ficha", body: "DIM-06 diferenciadores: 49 días y 12 botánicos." },
        { title: "Salida", body: "Story 9:16 + versión feed con copy mínimo." },
      ],
    },
    {
      id: 639,
      kind: "carrusel",
      status: "para revision",
      format: "Carrusel",
      title: "Doble plata",
      headline: "Lo dijeron a ciegas.",
      subhead: "Copa Argentina de Destilados 2025 + 2026.",
      copy: "La medalla no es el tema. Es la confirmación.",
      caption: "Dos años seguidos. Sin levantar la voz.",
      visualCue: "Certificado, copa baja, etiqueta visible, fondo de barra con luz cálida.",
      palette: "#77715E",
      tags: ["Medallas", "Prueba social"],
      pipeline: [
        { title: "Idea", body: "Tratar la medalla como prueba, no como slogan." },
        { title: "Ancla en ficha", body: "DIM-02 validación externa. DIM-12 no gritar la medalla." },
        { title: "Pendiente", body: "Confirmar material visual real de las medallas." },
      ],
    },
    {
      id: 635,
      kind: "ugc",
      status: "borrador",
      format: "Story 9:16",
      title: "Bar de Pergamino",
      headline: "No te dejo una botella.",
      subhead: "Te dejo un trago que el equipo puede contar.",
      copy: "Pedro y Mateo con pomelo. Media hora de capacitación. Sesenta días para probar.",
      caption: "Para bares que quieren una previa con nombre propio.",
      visualCue: "Encargado de bar apoyado en barra, preparando pomelo y tónica sin mirar a cámara.",
      palette: "#264653",
      tags: ["B2B", "HORECA"],
      pipeline: [
        { title: "Concepto UGC", body: "Dueño de bar explicando riesgo cero, sin tono vendedor." },
        { title: "Ancla en ficha", body: "DIM-05 Federico. DIM-08 consignación." },
        { title: "Próximo paso", body: "Grabar 2 tomas verticales en barra real." },
      ],
    },
    {
      id: 631,
      kind: "cover",
      status: "observado",
      format: "Feed 4:5",
      title: "Vinoteca premium",
      headline: "Conseguilo donde sepan recomendarlo.",
      subhead: "Pergamino. 49 días. Doble plata.",
      copy: "Para cuando alguien pide algo distinto y conviene tener una respuesta.",
      caption: "Pedro y Mateo ya tiene historia para ser contado.",
      visualCue: "Mano de vinoteca tomando botella desde una estantería baja, etiqueta visible.",
      palette: "#54483D",
      tags: ["Vinoteca", "B2B"],
      pipeline: [
        { title: "Idea", body: "Hablarle a Carla, la persona compradora de vinoteca." },
        { title: "Observación", body: "Falta lista real de puntos de venta para cerrar CTA." },
        { title: "Ancla en ficha", body: "DIM-05 Carla. DIM-11 CTA validado." },
      ],
    },
    {
      id: 628,
      kind: "motion",
      status: "aprobado",
      format: "Story 9:16",
      title: "La mesa espera",
      headline: "La mesa ya sabe.",
      subhead: "Vos servís el antes.",
      copy: "Copa baja, hielo grande, pomelo. El resto llega solo.",
      caption: "A veces alcanza con preparar bien el comienzo.",
      visualCue: "Secuencia lenta: hielo, vermouth, pomelo, mano dejando la copa sobre mantel viejo.",
      palette: "#8A4B31",
      tags: ["Motion", "Ritual"],
      pipeline: [
        { title: "Idea", body: "Motion simple, sin rostros ni celebración obvia." },
        { title: "Ancla en ficha", body: "DIM-12 ritual cotidiano elevado por oficio." },
        { title: "Salida", body: "4 cortes de 2 segundos para reel vertical." },
      ],
    },
  ],
};

export const ideas: Record<string, Idea[]> = {
  VPM: [
    {
      id: "I1",
      status: "usada",
      title: "Antes que el grito",
      category: "Mundial",
      skill: "S3 - momento de uso",
      trigger: "Aprovechar la previa del Mundial 2026 sin usar símbolos oficiales.",
      phrases: ["Antes que el grito.", "La cerveza llega después.", "El partido todavía no empezó."],
      anchor: "DIM-03: previa de partido + DIM-12: tono sereno, sin épica.",
      notes: "Convierte la ocasión masiva en un ritual adulto y cuidado.",
    },
    {
      id: "I2",
      status: "disponible",
      title: "La medalla como firma",
      category: "Prueba social",
      skill: "S9 - cifras clave",
      trigger: "Doble medalla de plata 2025 + 2026 como confirmación silenciosa.",
      phrases: ["Lo dijeron a ciegas.", "Dos años seguidos.", "La medalla no es el tema. Es la confirmación."],
      anchor: "DIM-02: validación externa + DIM-11: frases aprobadas.",
      notes: "Evita el tono triunfalista y conserva la humildad pergaminense.",
    },
    {
      id: "I3",
      status: "disponible",
      title: "Pedro y Mateo con pomelo",
      category: "Oferta",
      skill: "S8 - propuesta comercial",
      trigger: "Trago de la casa para bares nuevos del Anillo 1.",
      phrases: ["No te dejo una botella.", "Te dejo un trago que se puede contar.", "Pomelo, hielo grande, media hora de capacitación."],
      anchor: "DIM-05: Federico + DIM-08: consignación y kit comercial.",
      notes: "Idea orientada a B2B: bares de Pergamino y radio cercano.",
    },
    {
      id: "I4",
      status: "disponible",
      title: "Pergamino no se esconde",
      category: "Territorio",
      skill: "S12 - tono",
      trigger: "Usar el origen como dato de criterio, no como postal turística.",
      phrases: ["Hecho en Pergamino, premiado en Argentina.", "El lugar también macera.", "No hace falta parecer de otro lado."],
      anchor: "DIM-01: sede + DIM-12: pergaminense sin glorificar.",
      notes: "Puede convertirse en carrusel institucional de Casa Sarria.",
    },
  ],
};

export const requirements: Record<string, Requirement[]> = {
  VPM: [
    {
      id: 1,
      date: "26-may, 09:40",
      status: "pendiente",
      title: "Confirmar puntos de venta",
      detail: "Necesitamos lista de vinotecas premium de Pergamino para cerrar CTAs y publicaciones.",
      asset: "PV",
    },
    {
      id: 2,
      date: "26-may, 09:10",
      status: "pendiente",
      title: "Subir fotos de producto en uso",
      detail: "Prioridad: botella servida, copa con pomelo, barra real, medallas y etiqueta en alta.",
      asset: "IMG",
    },
    {
      id: 3,
      date: "25-may, 21:35",
      status: "pendiente",
      title: "Validar precio vigente",
      detail: "El PVP $10.500 y mayorista $8.000 figuran como referenciales mayo 2026.",
      asset: "$",
    },
    {
      id: 4,
      date: "25-may, 19:20",
      status: "resuelto",
      title: "Cargar ficha de marca inicial",
      detail: "Ficha 12 dimensiones cargada localmente desde respuestas de Eduardo y estrategia Casa Sarria.",
      asset: "OK",
    },
  ],
};

export const publications: Record<string, Publication[]> = {
  VPM: [
    { id: 606, date: "2026-06-03", day: 3, time: "18:00", channel: "Instagram", format: "Feed 4:5", status: "programada", title: "Antes que el grito", creativeId: 642 },
    { id: 604, date: "2026-06-05", day: 5, time: "11:30", channel: "Instagram", format: "Story 9:16", status: "borrador", title: "49 días", creativeId: 641 },
    { id: 598, date: "2026-06-10", day: 10, time: "19:00", channel: "Instagram", format: "Carrusel", status: "programada", title: "Lo dijeron a ciegas", creativeId: 639 },
    { id: 592, date: "2026-06-13", day: 13, time: "20:15", channel: "Instagram", format: "Story 9:16", status: "borrador", title: "Bar de Pergamino", creativeId: 635 },
    { id: 585, date: "2026-06-18", day: 18, time: "10:00", channel: "LinkedIn", format: "Feed 4:5", status: "programada", title: "Vinotecas premium", creativeId: 631 },
    { id: 579, date: "2026-06-21", day: 21, time: "12:00", channel: "Instagram", format: "Story 9:16", status: "publicada", title: "La mesa espera", creativeId: 628 },
  ],
};

export const auditItems: Record<string, AuditItem[]> = {
  VPM: [
    { code: "M1", title: "Ficha de marca 12 dimensiones cargada", status: "aplicado", category: "Marca", note: "La base estratégica ya existe y alimenta ideas/copy." },
    { code: "M2", title: "Faltan assets visuales reales", status: "critico", category: "Marca", note: "Sin fotos y logo en alta, las piezas quedan como mockups tipográficos." },
    { code: "M3", title: "Precios marcados como referenciales", status: "pendiente", category: "Marca", note: "Validar vigencia antes de publicar piezas comerciales." },
    { code: "C1", title: "4 ideas iniciales listas", status: "aplicado", category: "Contenido", note: "Cubren Mundial, medallas, bares y territorio." },
    { code: "C2", title: "Falta calendario de campaña Anillo 1", status: "pendiente", category: "Contenido", note: "Se recomienda plan semanal junio-septiembre 2026." },
    { code: "S1", title: "Sin sitio web público de Casa Sarria", status: "pendiente", category: "SEO", note: "Por ahora Instagram + WhatsApp. SEO queda limitado." },
    { code: "P1", title: "Sin integraciones de publicación", status: "pendiente", category: "Performance", note: "La UI simula agenda; falta conectar Buffer/Zernio/Meta." },
    { code: "X1", title: "Formulario de requerimientos sin backend", status: "critico", category: "Conversión", note: "Debe enviar email o guardar en base para uso real con clientes." },
  ],
};

export function getBrand(code: string): Brand | undefined {
  return brands.find((b) => b.code.toLowerCase() === code.toLowerCase());
}

export function getBrandUsers(code: string): BrandUser[] {
  return brandUsers[code.toUpperCase()] ?? [];
}

export function getBrandDimensions(code: string): BrandDimension[] {
  return brandDimensions[code.toUpperCase()] ?? [];
}

export function getCreativePieces(code: string): CreativePiece[] {
  return creativePieces[code.toUpperCase()] ?? [];
}

export function getIdeas(code: string): Idea[] {
  return ideas[code.toUpperCase()] ?? [];
}

export function getRequirements(code: string): Requirement[] {
  return requirements[code.toUpperCase()] ?? [];
}

export function getPublications(code: string): Publication[] {
  return publications[code.toUpperCase()] ?? [];
}

export function getAuditItems(code: string): AuditItem[] {
  return auditItems[code.toUpperCase()] ?? [];
}

export const stats = {
  requerimientosActivas: Object.values(requirements).flat().filter((r) => r.status !== "resuelto").length,
  usuariosTotal: Object.values(brandUsers).flat().length,
  crsTotal: brands.reduce((sum, brand) => sum + brand.crs, 0),
};
