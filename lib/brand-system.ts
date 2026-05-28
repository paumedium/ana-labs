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
      hex: "#111827",
      role: "brand-primary",
      name: "Ink operativo",
      description: "Base sobria para fondos, navegación y texto de alto contraste.",
    },
    {
      hex: "#FACC15",
      role: "brand-accent",
      name: "Amarillo oferta",
      description: "Acento para precios, alertas comerciales y CTAs; usar contenido, no dominante.",
    },
    {
      hex: "#FFFFFF",
      role: "bg-light",
      name: "Blanco catálogo",
      description: "Fondos de producto, espacios negativos y superficies limpias.",
    },
    {
      hex: "#E5E7EB",
      role: "neutral",
      name: "Gris sistema",
      description: "Separadores, fondos secundarios y bloques de información.",
    },
    {
      hex: "#2563EB",
      role: "support",
      name: "Azul acción",
      description: "Soporte para links, highlights digitales y estados informativos.",
    },
    {
      hex: "#22C55E",
      role: "success",
      name: "Verde stock",
      description: "Señales de disponibilidad, confirmación y compra resuelta.",
    },
  ],
  hexList: ["#111827", "#FACC15", "#FFFFFF", "#E5E7EB", "#2563EB"],
  sections: [
    {
      id: "colores",
      code: "COLOR",
      label: "Colores",
      title: "Colores",
      group: "Cromática",
      status: "presente",
      body: "Paleta inicial pensada para ecommerce: contraste alto, fondos limpios, acento comercial claro y señales de disponibilidad.",
      items: ["Usar amarillo como acento de conversión, no como baño total.", "Mantener fondos de producto blancos o grises.", "Evitar gradientes complejos hasta tener assets reales."],
    },
    {
      id: "degradados",
      code: "DEG",
      label: "Degradados",
      title: "Degradados",
      group: "Cromática",
      status: "pendiente",
      body: "Degradados pendientes de validar. Por ahora se recomienda fondo plano o transición suave gris → blanco para no competir con el producto.",
      items: ["Linear #FFFFFF → #E5E7EB", "Dark commerce #111827 → #1F2937", "Evitar bokeh, orbes o gradientes decorativos."],
    },
    {
      id: "atmosfera",
      code: "ATM",
      label: "Atmósfera",
      title: "Atmósfera",
      group: "Atmósfera y narrativa",
      status: "presente",
      body: "La atmósfera base es práctica y comercial: producto claro, uso concreto, luz neutra y sensación de compra resuelta.",
      items: ["Daylight neutro 5600K", "Ecommerce limpio", "Escena cotidiana solo cuando ayuda a entender uso"],
    },
    {
      id: "tension",
      code: "TENS",
      label: "Tensión narrativa",
      title: "Tensión narrativa",
      group: "Atmósfera y narrativa",
      status: "presente",
      body: "La tensión principal es duda → decisión. Cada pieza debe resolver una objeción concreta: utilidad, stock, precio, compatibilidad o canal de compra.",
      items: ["No sé si me sirve → veo uso real", "No sé si hay stock → consulto disponibilidad", "No sé si conviene → comparo beneficio"],
    },
    {
      id: "narrativas",
      code: "NARR",
      label: "Narrativas probadas",
      title: "Narrativas probadas",
      group: "Atmósfera y narrativa",
      status: "presente",
      body: "Narrativas iniciales para arrancar sin catálogo real: producto héroe, cómo elegir, stock disponible, oportunidad clara y pedido mayorista.",
      items: ["Producto héroe", "Tres datos antes de decidir", "Consultá disponibilidad", "Quiero precio mayorista"],
    },
    {
      id: "registros",
      code: "REG",
      label: "Registros visuales",
      title: "Registros visuales",
      group: "Mirada visual",
      status: "presente",
      body: "Registros compatibles: product hero limpio, ecommerce editorial, UGC con anotaciones, catálogo B2B y oferta disciplinada.",
      items: ["Product hero showroom", "UGC práctico con flechas manuscritas", "Brand-dominant flat solo para campañas de oferta"],
    },
    {
      id: "angulos",
      code: "ANG",
      label: "Ángulos de cámara",
      title: "Ángulos de cámara",
      group: "Mirada visual",
      status: "presente",
      body: "Los ángulos deben favorecer lectura de producto: frontal para catálogo, 3/4 para volumen, macro para detalle y mano en uso para contexto.",
      items: ["Frontal catálogo", "Three-quarter product", "Macro detalle", "Uso en mano"],
    },
    {
      id: "sujetos",
      code: "SUJ",
      label: "Tipos de sujeto",
      title: "Tipos de sujeto",
      group: "Mirada visual",
      status: "presente",
      body: "Sujeto principal: producto real. Sujetos secundarios: mano usando producto, caja/envío, pantalla de catálogo o cliente consultando por WhatsApp.",
      items: ["Producto físico", "Mano humana", "Pantalla de catálogo", "Caja de envío"],
    },
    {
      id: "elementos",
      code: "ELEM",
      label: "Elementos visuales",
      title: "Elementos visuales",
      group: "Composición",
      status: "presente",
      body: "Elementos canónicos: etiqueta de precio, check de stock, icono de WhatsApp, carrito, caja de envío, ruler/medida y callout de beneficio.",
      items: ["Etiqueta de precio", "Check stock", "Carrito", "WhatsApp", "Caja", "Medida"],
    },
    {
      id: "reglas",
      code: "REGL",
      label: "Reglas de composición",
      title: "Reglas de composición",
      group: "Composición",
      status: "presente",
      body: "Producto protagonista, texto breve y CTA visible. No convertir la pieza en catálogo lleno; una idea comercial por pieza.",
      items: ["Producto ocupa 45-60% del cuadro", "CTA no domina", "Precio solo si está validado", "Máximo 2 callouts"],
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
    { id: 1, text: "No inventar precios, stock, descuentos, envíos, garantía ni marcas representadas." },
    { id: 2, text: "No usar claims absolutos como 'el mejor', 'más barato' o 'calidad premium' sin prueba." },
    { id: 3, text: "No generar fondos caóticos que compitan con el producto." },
    { id: 4, text: "No ocultar el producto detrás de tipografía, stickers o mocks decorativos." },
    { id: 5, text: "No usar urgencias falsas: 'solo hoy', 'última oportunidad', 'queda uno' sin dato validado." },
    { id: 6, text: "No mostrar logos de marketplaces, bancos o marcas externas si no están provistos por el cliente." },
    { id: 7, text: "No prometer entrega inmediata si el canal logístico no está validado." },
    { id: 8, text: "No convertir piezas B2B en piezas para consumidor final; separar mensaje mayorista de mensaje retail." },
    { id: 9, text: "No usar estética lujo premium si la promesa real es utilidad, claridad y resolución." },
    { id: 10, text: "No usar imágenes genéricas de producto que parezcan otro rubro; cada pieza debe poder recibir asset real." },
    { id: 11, text: "No poner más de dos beneficios principales por pieza." },
    { id: 12, text: "No publicar CTA de WhatsApp hasta validar número real." },
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
Display: heavy geometric sans, peso 800-900, alto contraste, lectura ecommerce
Body: clean humanist sans, peso 400-500, contornos limpios
Accent: small mono uppercase, peso 600, tracking tight, etiquetas técnicas
Split-headline: 1 idea principal en display + beneficio secundario en body sans
Mood: directo, práctico, comercial disciplinado, sin lujo ni dramatismo
Spacing: line-height compacto, tracking 0, aire perimetral generoso
═══

═══ RECETA motion ═══
display: Inter 800
display_emphasis: Inter 900
body: Inter 400
accent: JetBrains Mono 600
italic_display: false
letter_spacing_display: 0em
letter_spacing_body: 0em
numeric_features: tnum
role_overrides:
  HEADLINE: { family: display, weight: 900, align: left, casing: none, line_height: 0.94 }
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
    { id: "drv-logo-original", type: "logo", variant: "original", name: "Logo Driven", description: "Logo base pendiente de reemplazo por archivo real.", tags: ["#LOGO", "#ORIGINAL"], preview: "#111827" },
    { id: "drv-logo-white", type: "logo", variant: "white-knockout", name: "Logo white", description: "Variante knockout pendiente.", tags: ["#LOGO", "#WHITE"], preview: "#E5E7EB" },
    { id: "drv-logo-black", type: "logo", variant: "black-knockout", name: "Logo black", description: "Variante negra pendiente.", tags: ["#LOGO", "#BLACK"], preview: "#FFFFFF" },
    { id: "drv-product-hero", type: "producto", variant: "extra", name: "Producto héroe", description: "Slot para primer producto real de campaña.", tags: ["#PRODUCTO", "#HERO"], preview: "#FACC15" },
    { id: "drv-catalog", type: "otro", variant: "extra", name: "Pantalla catálogo", description: "Referencia de web/catálogo para piezas de conversión.", tags: ["#CATALOGO", "#WEB"], preview: "#2563EB" },
    { id: "drv-package", type: "otro", variant: "extra", name: "Caja / envío", description: "Asset de confianza logística pendiente.", tags: ["#ENVIO", "#CAJA"], preview: "#22C55E" },
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
