export type BrandColor = {
  hex: string;
  role: string;
  name: string;
  description: string;
};

export type BrandVisualSection = {
  id: string;
  code: string;
  label: string;
  title: string;
  group: string;
  status: "presente" | "pendiente";
  body: string;
  items: string[];
};

export type BrandVisualIdentity = {
  colors: BrandColor[];
  hexList: string[];
  sections: BrandVisualSection[];
};

export type BrandRestriction = {
  id: number;
  text: string;
};

export type BrandTypography = {
  content: string;
};

export type BrandAsset = {
  id: string;
  type: "logo" | "producto" | "interior" | "exterior" | "fachada" | "otro";
  variant?: "original" | "white-knockout" | "black-knockout" | "extra";
  name: string;
  description: string;
  tags: string[];
  preview?: string;
};

const drivenVisualIdentity: BrandVisualIdentity = {
  colors: [
    {
      hex: "#1F2A24",
      role: "brand-primary",
      name: "Verde oscuro",
      description: "Primario de marca: outdoor sobrio, robusto y argentino. Base para fondos sólidos y contraste con producto.",
    },
    {
      hex: "#000000",
      role: "brand-black",
      name: "Negro operativo",
      description: "Footer, barras de beneficios, placas de servicio y contraste fuerte.",
    },
    {
      hex: "#A07D5D",
      role: "brand-secondary",
      name: "Marrón tabaco",
      description: "Acento de tierra, cuero, ruta y taller. Usar moderado para textura utilitaria.",
    },
    {
      hex: "#F5C518",
      role: "brand-accent",
      name: "Amarillo industrial",
      description: "CTA y señalética de acción. Energético, no fluor, nunca baño total.",
    },
    {
      hex: "#F4EFE9",
      role: "bg-light",
      name: "Beige outdoor",
      description: "Fondos claros para catálogo, producto y espacios respirables.",
    },
    {
      hex: "#FFFFFF",
      role: "white",
      name: "Blanco ecommerce",
      description: "Fotos de producto, superficies limpias y lectura de specs.",
    },
    {
      hex: "#1A1A1A",
      role: "text",
      name: "Texto carbón",
      description: "Texto principal y etiquetas de alta lectura.",
    },
    {
      hex: "#4BB98C",
      role: "success",
      name: "Verde confirmación",
      description: "Estado positivo, validación y señales de compra resuelta.",
    },
    {
      hex: "#DD7774",
      role: "alert",
      name: "Rojo alerta suave",
      description: "Avisos y pendientes, sin urgencia falsa ni FOMO agresivo.",
    },
  ],
  hexList: ["#1F2A24", "#000000", "#A07D5D", "#F5C518", "#F4EFE9", "#FFFFFF", "#1A1A1A", "#4BB98C", "#DD7774"],
  sections: [
    {
      id: "colores",
      code: "COLOR",
      label: "Colores",
      title: "Colores",
      group: "Cromática",
      status: "presente",
      body: "Paleta outdoor utilitaria: verde oscuro, negro, tabaco, beige y amarillo industrial para acción. Debe sentirse robusta, no tech ni lujo.",
      items: ["Verde oscuro como ADN de marca.", "Amarillo industrial solo para CTAs y señalética.", "Beige/off-white para fondos de producto.", "Evitar azul corporativo, neón, fluor y gris frío."],
    },
    {
      id: "degradados",
      code: "DEG",
      label: "Degradados",
      title: "Degradados",
      group: "Cromática",
      status: "presente",
      body: "Driven usa color sólido. El exceso de gradiente es anti-marca y debe evitarse salvo sombra funcional muy sutil.",
      items: ["Fondo sólido verde, negro, beige o blanco.", "Sombras suaves solo para separar producto.", "No usar gradientes decorativos, bokeh ni sombras dramáticas."],
    },
    {
      id: "atmosfera",
      code: "ATM",
      label: "Atmósfera",
      title: "Atmósfera",
      group: "Atmósfera y narrativa",
      status: "presente",
      body: "Outdoor argentino genuino: ruta, ripio, taller, garage, fogón y campamento. Robusto y real, no aspiracional de estudio.",
      items: ["Uso real utilitario", "Producto con polvo, barro o señales honestas de uso cuando aplique", "Luz natural o de taller", "Contraste medio y saturación natural"],
    },
    {
      id: "tension",
      code: "TENS",
      label: "Tensión narrativa",
      title: "Tensión narrativa",
      group: "Atmósfera y narrativa",
      status: "presente",
      body: "La tensión principal es fallo barato vs equipo que te banca. Cada pieza debe resolver una duda de confianza, uso o respaldo.",
      items: ["Equipo barato falla → Driven responde", "Salir improvisado → salir preparado", "Dependencia → autosuficiencia", "Marketing vacío → prueba en uso real"],
    },
    {
      id: "narrativas",
      code: "NARR",
      label: "Narrativas probadas",
      title: "Narrativas probadas",
      group: "Atmósfera y narrativa",
      status: "presente",
      body: "Narrativas canónicas: equipo probado, salida preparada, garage autosuficiente, respaldo argentino y Comunidad Driven.",
      items: ["Te banca en el uso real", "Equipate antes de salir", "Del garage a la ruta", "2 años de garantía oficial", "Comunidad Driven"],
    },
    {
      id: "registros",
      code: "REG",
      label: "Registros visuales",
      title: "Registros visuales",
      group: "Mirada visual",
      status: "presente",
      body: "Registros compatibles: product hero outdoor, uso real, taller/garage, catálogo técnico y UGC utilitario.",
      items: ["Product hero 1:1 sobre fondo claro", "Lifestyle real en ruta/ripio/campamento", "Garage/taller con manos y herramientas", "UGC práctico con anotaciones sobrias"],
    },
    {
      id: "angulos",
      code: "ANG",
      label: "Ángulos de cámara",
      title: "Ángulos de cámara",
      group: "Mirada visual",
      status: "presente",
      body: "Ángulos orientados a lectura de producto y prueba de robustez.",
      items: ["Hero producto centrado 1:1", "Frontal sobre fondo claro", "Detalle macro de manijas, soldaduras, materiales y textura", "Gran angular en contexto real 4x4/campamento/taller"],
    },
    {
      id: "sujetos",
      code: "SUJ",
      label: "Tipos de sujeto",
      title: "Tipos de sujeto",
      group: "Mirada visual",
      status: "presente",
      body: "El producto manda. Las personas aparecen como usuarios reales, no modelos profesionales ni influencers de stock.",
      items: ["Producto físico real", "Manos usándolo", "Persona real exigente con rostro opcional", "Vehículo, taller, fogón, ripio o campamento como contexto"],
    },
    {
      id: "elementos",
      code: "ELEM",
      label: "Elementos visuales",
      title: "Elementos visuales",
      group: "Composición",
      status: "presente",
      body: "Elementos canónicos vinculados al respaldo y al uso: garantía, envío, cuotas, comunidad, producto y prueba.",
      items: ["Banner top de beneficios", "Sello 2 años garantía", "Envío a todo el país", "Cuotas", "Comunidad Driven", "Estrella del Sur", "Argentine Adventure", "Íconos lineales simples"],
    },
    {
      id: "reglas",
      code: "REGL",
      label: "Reglas de composición",
      title: "Reglas de composición",
      group: "Composición",
      status: "presente",
      body: "Composición de catálogo robusto: producto claro, densidad media y servicio visible sin saturar.",
      items: ["Hero 1:1 con producto centrado", "Grid catálogo estricto de 3-4 columnas", "Más blanco/beige que recargado", "Texto corto y funcional", "Precio/stock solo con dato validado", "No usar modelos profesionales ni estilo lujo"],
    },
  ],
};

const vermouthVisualIdentity: BrandVisualIdentity = {
  colors: [
    { hex: "#3A4A42", role: "brand-primary", name: "Verde botella", description: "Base sobria para ritual, mesa y origen pergaminense." },
    { hex: "#8A4B31", role: "brand-secondary", name: "Vermouth", description: "Tono cálido de bebida y madera." },
    { hex: "#F7F1E6", role: "bg-light", name: "Papel aperitivo", description: "Fondos cálidos, manteles, etiquetas y piezas editoriales." },
    { hex: "#C7A56D", role: "accent", name: "Medalla", description: "Acento moderado para confirmación, nunca dorado ostentoso." },
  ],
  hexList: ["#3A4A42", "#8A4B31", "#F7F1E6", "#C7A56D"],
  sections: [
    { id: "colores", code: "COLOR", label: "Colores", title: "Colores", group: "Cromática", status: "presente", body: "Paleta editorial cálida y sobria.", items: ["Verde botella", "Vermouth", "Papel aperitivo", "Medalla moderada"] },
    { id: "degradados", code: "DEG", label: "Degradados", title: "Degradados", group: "Cromática", status: "pendiente", body: "Usar fondos planos o sombras naturales.", items: ["Sin retro filter", "Sin dorado excesivo"] },
    { id: "atmosfera", code: "ATM", label: "Atmósfera", title: "Atmósfera", group: "Atmósfera y narrativa", status: "presente", body: "Mesa, sobremesa, aperitivo y espera.", items: ["Luz de tarde", "Mantel", "Copa baja", "Pomelo"] },
  ],
};

export const visualIdentities: Record<string, BrandVisualIdentity> = {
  DRV: drivenVisualIdentity,
  VPM: vermouthVisualIdentity,
};

export const brandRestrictions: Record<string, BrandRestriction[]> = {
  DRV: [
    { id: 1, text: "No inventar precios, stock, descuentos, envíos, garantía, cuotas ni marcas representadas." },
    { id: 2, text: "No prometer atención humana inmediata en web o WhatsApp; el WhatsApp informado es bot." },
    { id: 3, text: "No usar FOMO artificial: 'Comprá YA', 'Última oportunidad', 'No te lo perdás', 'Apurate'." },
    { id: 4, text: "No usar 'no' en botones o microcopy de CTA; reescribir en positivo." },
    { id: 5, text: "No usar superlativos vacíos como 'la mejor', 'increíble', 'espectacular' o 'revolucionario'." },
    { id: 6, text: "No hablar mal de competencia, importados genéricos, Temu, Shein o productos chinos." },
    { id: 7, text: "No usar stock genérico con sonrisas, modelos profesionales o escenas aspiracionales falsas." },
    { id: 8, text: "No usar lifestyle gym/urbano fitness, tech corporativo, lujo minimalista o editorial de estudio." },
    { id: 9, text: "No usar azul corporativo, neón, fluor ni gris frío como estética dominante." },
    { id: 10, text: "No usar serif elegante, iconografía decorativa, sparkles, brillitos, gradientes ni sombras dramáticas." },
    { id: 11, text: "No publicar Facundo Arana como referente hasta confirmación explícita de Damián." },
    { id: 12, text: "No publicar certificaciones ISO/UL/IEC sin validar alcance exacto por producto." },
    { id: 13, text: "No publicar cobertura de garantía, devoluciones, tarjetas, plazos de envío o vigencia de promos sin validación." },
    { id: 14, text: "No mostrar logos de competencia, marketplaces, bancos o marcas externas si no están provistos por el cliente." },
    { id: 15, text: "No convertir piezas B2B en piezas para consumidor final; separar mensaje mayorista de mensaje retail." },
    { id: 16, text: "No usar precio o stock hero sin dato SAP vigente." },
    { id: 17, text: "No ocultar el producto detrás de tipografía, stickers o mocks decorativos." },
    { id: 18, text: "No decir 'camping' como eje de marca cuando el brief pida marca; sí puede usarse en SEO/categoría." },
    { id: 19, text: "No mezclar idiomas ni usar español neutro no argentino; Driven habla con vos." },
    { id: 20, text: "No publicar datos internos: SAP, Route53, sync de fotos, márgenes, volúmenes o infraestructura." },
  ],
  VPM: [
    { id: 1, text: "No usar tono aspiracional de lujo ni prometer exclusividad." },
    { id: 2, text: "No gritar la medalla como titular principal." },
    { id: 3, text: "No usar símbolos oficiales de fútbol ni marcas de competencia." },
  ],
};

export const brandTypography: Record<string, BrandTypography> = {
  DRV: {
    content: `═══ RECETA gpt-image-2 ═══
Display: condensed industrial sans estilo Oswald, siempre mayúsculas, peso 600-800, directo y robusto
Body: Inter / system-ui sans, peso 400-500, lectura clara, sin tono tech corporativo
Accent: small mono uppercase, peso 600, tracking tight, etiquetas técnicas y beneficios de servicio
Split-headline: 1 línea de acción en display + prueba/beneficio en body; evitar frases largas y FOMO
Mood: outdoor argentino genuino, ruta/taller/campamento, calidad real, respaldo local, sin lujo ni stock
Spacing: line-height compacto, tracking 0, densidad media, aire suficiente para producto 1:1
═══

═══ RECETA motion ═══
display: Oswald 700
display_emphasis: Oswald 800
body: Inter 400
accent: JetBrains Mono 600
italic_display: false
letter_spacing_display: 0em
letter_spacing_body: 0em
numeric_features: tnum
role_overrides:
  HEADLINE: { family: display, weight: 800, align: left, casing: uppercase, line_height: 0.94 }
  SUBHEAD:  { family: body, weight: 500, align: left, casing: none, line_height: 1.08 }
  CTA:      { family: display, weight: 800, align: center, casing: none, line_height: 1.00 }
  LABEL:    { family: accent, weight: 600, align: left, casing: uppercase, line_height: 1.00 }
═══`,
  },
  VPM: {
    content: `═══ RECETA gpt-image-2 ═══
Display: condensed serif/sans editorial, peso alto pero sobrio
Body: serif humanista, peso 400, lectura de mesa y ritual
Accent: mono small uppercase para datos concretos
Mood: aperitivo sereno, Pergamino, oficio y espera
═══`,
  },
};

export const brandAssets: Record<string, BrandAsset[]> = {
  DRV: [
    { id: "drv-logo-original", type: "logo", variant: "original", name: "Logo Driven", description: "Logo primario pendiente de reemplazo por archivo real.", tags: ["#LOGO", "#ORIGINAL"], preview: "#1F2A24" },
    { id: "drv-logo-white", type: "logo", variant: "white-knockout", name: "Logo white", description: "Variante knockout para fondos oscuros pendiente.", tags: ["#LOGO", "#WHITE"], preview: "#000000" },
    { id: "drv-logo-black", type: "logo", variant: "black-knockout", name: "Logo black", description: "Variante negra para fondos claros pendiente.", tags: ["#LOGO", "#BLACK"], preview: "#FFFFFF" },
    { id: "drv-big-boy", type: "producto", variant: "extra", name: "Compresor Big Boy", description: "Producto héroe 4x4/garage para confianza, rescate y robustez.", tags: ["#PRODUCTO", "#BIGBOY", "#4X4", "#GARAGE"], preview: "#1F2A24" },
    { id: "drv-flamate", type: "producto", variant: "extra", name: "Anafe Flamate", description: "Producto outdoor/camping para lifestyle aventurero y cocina real.", tags: ["#PRODUCTO", "#FLAMATE", "#OUTDOOR"], preview: "#A07D5D" },
    { id: "drv-red-force", type: "producto", variant: "extra", name: "Pava Red Force", description: "Línea térmica/cocina para piezas de salida preparada.", tags: ["#PRODUCTO", "#REDFORCE", "#TERMICOS"], preview: "#DD7774" },
    { id: "drv-bidon-15l", type: "producto", variant: "extra", name: "Bidón 15L premiado", description: "Producto con premio Estrella del Sur; usar como prueba social cuando el asset esté cargado.", tags: ["#PRODUCTO", "#PREMIO", "#BIDON"], preview: "#F5C518" },
    { id: "drv-argentine-adventure", type: "otro", variant: "extra", name: "Argentine Adventure", description: "Referencia sponsor pendiente de logo/asset autorizado.", tags: ["#SPONSOR", "#4X4", "#COMUNIDAD"], preview: "#000000" },
    { id: "drv-estrella-sur", type: "otro", variant: "extra", name: "Estrella del Sur", description: "Premio del Instituto Argentino del Envase para Bidón 15L; asset pendiente.", tags: ["#PREMIO", "#VALIDACION"], preview: "#F5C518" },
    { id: "drv-ruta-ripio", type: "exterior", variant: "extra", name: "Ruta / ripio", description: "Contexto outdoor argentino genuino para overlanding.", tags: ["#RUTA", "#RIPIO", "#PATAGONIA"], preview: "#A07D5D" },
    { id: "drv-garage", type: "interior", variant: "extra", name: "Garage / taller", description: "Contexto de hobbista DIY, herramientas y autosuficiencia.", tags: ["#GARAGE", "#TALLER", "#DIY"], preview: "#1A1A1A" },
    { id: "drv-campamento", type: "exterior", variant: "extra", name: "Campamento real", description: "Fogón, lona, producto en uso y salida preparada, sin stock aspiracional.", tags: ["#CAMPAMENTO", "#FOGON", "#USO-REAL"], preview: "#F4EFE9" },
  ],
  VPM: [
    { id: "vpm-bottle", type: "producto", variant: "extra", name: "Botella Pedro y Mateo", description: "Asset pendiente de reemplazo por foto real.", tags: ["#PRODUCTO", "#BOTELLA"], preview: "#3A4A42" },
  ],
};

export function getVisualIdentity(code: string) {
  return visualIdentities[code.toUpperCase()] ?? drivenVisualIdentity;
}

export function getRestrictions(code: string) {
  return brandRestrictions[code.toUpperCase()] ?? [];
}

export function getTypography(code: string) {
  return brandTypography[code.toUpperCase()] ?? { content: "" };
}

export function getAssets(code: string) {
  return brandAssets[code.toUpperCase()] ?? [];
}
