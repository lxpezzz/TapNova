# TapNova · Master Blueprint de Decisiones Estratégicas y Técnicas

Documento de consolidación y adopción integral de las decisiones acordadas en la conversación previa [`1a40b19a-73a9-43b1-a8de-aa0395a4c203`](conversation://1a40b19a-73a9-43b1-a8de-aa0395a4c203) para el proyecto **TapNova** ([`D:/.TAPNOVA/v1`](file:///D:/.TAPNOVA/v1)).

---

## 1. Decisiones de Diseño & Dirección de Arte

### 1.1. Filosofía de Marca: *Quiet Luxury* (Lujo Silencioso)
- **Referentes estéticos**: Bang & Olufsen, Apple, Leica, Rimowa.
- **Posicionamiento**: TapNova no compite como un simple proveedor de pegatinas QR ni como una agencia de captación agresiva; se posiciona como una **firma exclusiva de ingeniería de sala, materiales nobles y reputación digital de alta gama** para restauración media-alta y alta.
- **Eliminación de fricción comercial**:
  - Prohibido el lenguaje de telemarketing o urgencia artificial (*"¡Pide tu presupuesto ya en 24h!"* o *"Plazas limitadas"*).
  - Eliminación absoluta de cualquier mención a **«muestras gratuitas»**. El hardware en madera maciza de nogal, titanio cepillado y piel tiene alto valor intrínseco; regalarlo devalúa la percepción de producto. Toda llamada a la acción se canaliza hacia **«Solicitar propuesta personalizada y simulación de grabado»**.

### 1.2. Hero Section: La Supernova Refinada
- **Evolución**: Sustitución del antiguo "agujero negro" (que generaba un disco negro opaco invasivo) por una **supernova cósmica translúcida** ([`src/components/OrganicHalo.astro`](file:///D:/.TAPNOVA/v1/src/components/OrganicHalo.astro)).
- **Jerarquía visual**:
  - El **Portacuentas en piel y titanio** es indiscutiblemente el **protagonista central**.
  - La supernova actúa exclusivamente como un **halo de estudio cósmico** detrás del producto.
  - Composición espectral: Corona viva de plasma en tonos ámbar estelar (`#FEED7A`, `#FF9D24`) y orquídea nebulosa (`#DF91F7`), rayos de difracción anamórficos (*diffraction spikes*) en cruz y micro-anillos relativistas concéntricos con rotación suave.
  - Sincronización en scroll con GSAP ScrollTrigger para abrir sutilmente el portacuentas mientras los anillos se expanden suavemente.

### 1.3. Product Showcase Interactivo (`ProductShowcase.astro`)
- **Organización por zonas de local**: 5 soportes clasificados estratégicamente según el flujo de la sala.
- **Doble interactividad**:
  1. *Tabs Dock superior*: Selección directa de producto con indicador dinámico de progreso.
  2. *Autoplay temporizado con pausa inteligente*: Rotación automática entre productos cada varios segundos, pausándose cuando el usuario interactúa.
  3. *Scroll Scrub*: Vinculación suave con el desplazamiento de la página.

### 1.4. Final CTA & Pie de Página («Monolithic Dark Horizon»)
- **Final CTA ([`src/components/FinalCta.astro`](file:///D:/.TAPNOVA/v1/src/components/FinalCta.astro))**:
  - Izquierda: Emblema escultórico oficial 3D con halo respirante.
  - Centro: Copia de alta categoría:  
    > **«Tu sala cuida cada detalle. Tu reputación en Google también debería.»**  
    > *«Diseñamos y grabamos cada soporte para integrarse con la categoría y el interiorismo de tu espacio. Hablemos de tu restaurante sin compromisos ni presiones comerciales.»*
  - Formulario ultra-minimalista de un único campo discreto (`quiet-input`) + acceso directo a WhatsApp de sala y correo corporativo.
- **Footer ([`src/components/Footer.astro`](file:///D:/.TAPNOVA/v1/src/components/Footer.astro))**:
  - Arquitectura horizontal oscura monolítica con fondo OLED `rgba(5, 5, 8, 0.95)`, eliminando cortes abruptos en blanco.
  - 4 columnas limpias: *Soportes de Sala*, *Crecimiento Digital*, *Contacto Directo* y *Marco Legal* con garantía oficial de 2 años.

---

## 2. Catálogo Oficial de Hardware

TapNova articula su hardware en **5 soportes físicos especializados**, diseñados para cubrir los momentos clave de interacción del comensal:

| Soporte | Zona del Local | Materiales & Acabados | Tecnología Integrada | Función Estratégica |
| :--- | :--- | :--- | :--- | :--- |
| **01 · Portacuentas Inteligente** | **Zona 01: La Mesa** | Piel suave negra de alta resistencia con costuras reforzadas + Placa de aleación de titanio cepillado antihuellas grabado a láser. | Doble tecnología: Chip NFC 13.56 MHz (ISO 14443A) bajo el lomo + QR óptico de alta resolución grabado en titanio. | Convierte el momento natural del cobro en una valoración de 5 estrellas en 2 segundos antes de que el cliente abandone el local. |
| **02 · Expositor de Nogal Macizo** | **Zona 02: Barra, Recepción & Caja** | Bloque macizo mecanizado de madera noble de nogal, pulido a mano y tratado con aceite natural hidrófugo. | Antena NFC de campo medio (lectura a 3-4 cm) + Marcaje láser indeleble. Ángulo ergonómico de 65°. | Captura valoraciones de clientes en espera, aperitivos de barra o pagos en caja con presencia sobria de mobiliario. |
| **03 · Tarjetas NFC de Sala** | **Zona 03: Equipo de Sala & Metres** | Polímero sellado ultraligero (5 g) estándar bancario ISO 7810. Acabado negro mate antireflejos con logo grabado. | Chip NFC integrado de proximidad inmediata con blindaje 100% impermeable a líquidos y desinfectantes. | Permite al camarero o sumiller transformar un elogio espontáneo del cliente en una reseña inmediata acercando la tarjeta a su móvil. |
| **04 · Pegatinas QR Epoxi** | **Zona 04: Cartas, Mamparas & Exterior** | Cúpula protectora de resina epoxi brillante con filtro anti-UV y adhesivo de grado industrial 3M permanente. | Código QR vectorizado de contraste óptico extremo, legible con luz solar o penumbra. | Soporte exterior indestructible para terrazas, cartas físicas o cristaleras, resistente a lluvia, sol directo y lavados diarios. |
| **05 · Posavasos Inteligentes** | **Zona 05: Terrazas & Coctelería** | Cuerpo compuesto rígido bicapa, hidrófugo y antideslizante con barrera térmica. | Cápsula interna sellada 100% estanca con chip NFC central + micro-QR secundario. | Interacción táctil sin esfuerzo en mesas altas, vermuterías y cócteles donde no se entrega portacuentas tradicional. |

---

## 3. Estructura de Precios, Packs y Servicios

La sección de precios ([`src/components/PricingSection.astro`](file:///D:/.TAPNOVA/v1/src/components/PricingSection.astro)) separa estrictamente el **Equipamiento Físico** (pago único en propiedad, activo del local) del **Crecimiento Digital** (servicios de valor añadido):

### 3.1. Modo A: Packs Recomendados (Llave en Mano)
1. **Pack 01 · Barra & Terraza — 290 €** *(Ahorro de 50 € sobre PVP 340 €)*:
   - 1 Expositor de nogal macizo.
   - 50 Posavasos inteligentes NFC impermeables.
   - 10 Pegatinas QR en resina epoxi.
   - Configuración inicial y optimización de la ficha de Google Maps.
2. **Pack 02 · Restaurante Sala — El Más Elegido — 890 €** *(Ahorro de 260 € sobre PVP 1.150 €)*:
   - 12 Portacuentas en piel suave y titanio grabado a láser con logo del local.
   - 2 Expositores de nogal macizo para barra y recepción.
   - 5 Tarjetas NFC de bolsillo para el equipo de sala.
   - **1er mes de posicionamiento SEO Local en Google Maps incluido de regalo**.
   - Garantía oficial de chips y hardware de 2 años.
3. **Pack 03 · Digitalización Total 360° — 1.790 €** *(Ahorro de 460 € sobre PVP 2.250 €)*:
   - 20 Portacuentas de piel y titanio (sala completa equipada).
   - 3 Expositores de nogal macizo + 8 Tarjetas NFC para metres y sala.
   - 100 Posavasos inteligentes + 25 Pegatinas QR epoxi.
   - Página Web Gastronómica a medida con carta interactiva y reservas.
   - 3 meses de posicionamiento SEO Local incluidos.

> **Puente Interactivo UX**: Cada pack incluye el botón *«Personalizar este pack en el configurador →»*, que conmuta instantáneamente al configurador cargando las cantidades del pack.

### 3.2. Modo B: Configurador a Medida (Tiempo Real)
- **Portacuentas Piel & Titanio**: Slider de 0 a 40 mesas con escalado automático de descuentos por volumen:
  - *1 a 9 unidades*: **79 € / ud**
  - *10 a 19 unidades*: **69 € / ud** *(13% dto. Sala Mediana)*
  - *20+ unidades*: **59 € / ud** *(25% dto. Sala Grande)*
- **Expositores de Nogal Macizo**: Steppers unitarios a **69 € / ud**.
- **Tarjetas NFC de Sala**: Steppers unitarios a **15 € / ud** *(o 5 uds por 60 €)*.
- **Posavasos Inteligentes**: Selector en píldoras: 0 uds | 50 uds (**120 €**) | 100 uds (**190 €**).
- **Pegatinas QR Epoxi**: Selector en píldoras: 0 uds | 10 uds (**35 €**) | 25 uds (**65 €**).
- **Crecimiento Digital (Toggles independientes)**:
  - *Posicionamiento SEO Local en Google Maps*: **89 € / mes** *(sin permanencia, auditoría y optimización continua)*.
  - *Página Web Gastronómica con Reservas*: **790 €** *(diseño premium a medida, pago único de proyecto)*.
- **Ticket en vivo & Enlace Dinámico**: Desglose transparente con diferenciación de pago único vs cuota recurrente, cálculo del ahorro acumulado y botón dinámico que genera el mensaje formateado para WhatsApp de sala.

---

## 4. Estructura Legal y Regulatoria (España & UE)

Se han implementado rutas dedicadas que mantienen exactamente la misma atmósfera cósmica con fondo transparente y tarjetas en *double-bezel dark glass*, cumpliendo al 100% con la normativa vigente:

### 4.1. Aviso Legal ([`src/pages/aviso-legal.astro`](file:///D:/.TAPNOVA/v1/src/pages/aviso-legal.astro))
- **Normativa**: Conforme al artículo 10 de la **Ley 34/2002 (LSSI-CE)**.
- **Contenidos regulados**:
  - Datos identificativos del titular (**TapNova Technologies, S.L.**, CIF B-XXXXXXXX, domicilio en Paseo de la Castellana 95, Madrid).
  - Condiciones de uso y adquisición de soportes físicos de hardware y servicios digitales.
  - Régimen de propiedad industrial e intelectual sobre el diseño de los soportes, marca y código fuente.
  - Exención y delimitación de responsabilidad frente a algoritmos o políticas de plataformas de terceros (Google Maps / Google Business Profile).

### 4.2. Política de Privacidad ([`src/pages/politica-de-privacidad.astro`](file:///D:/.TAPNOVA/v1/src/pages/politica-de-privacidad.astro))
- **Normativa**: Riguroso cumplimiento del **Reglamento General de Protección de Datos (RGPD UE 2016/679)** y la **Ley Orgánica 3/2018 (LOPDGDD)**.
- **Tratamientos tipificados**:
  - Formularios de contacto y solicitudes comerciales mediante base de legitimación de consentimiento expreso y aplicación de medidas precontractuales (Art. 6.1.b RGPD).
  - Plazos tasados de conservación de datos y prohibición de cesión a terceros sin base legal.
  - Ejercicio formal de derechos **ARSULIPO** (Acceso, Rectificación, Supresión, Limitación, Portabilidad, Oposición) ante el delegado de protección de datos (`privacidad@tapnova.es`).

### 4.3. Política de Cookies ([`src/pages/politica-de-cookies.astro`](file:///D:/.TAPNOVA/v1/src/pages/politica-de-cookies.astro))
- **Normativa**: Cumplimiento del **artículo 22.2 de la LSSI-CE** y las **Directrices de la AEPD (Agencia Española de Protección de Datos)** actualizadas.
- **Detalle técnico**:
  - Clasificación entre *Cookies Técnicas Necesarias* (sesión, seguridad y fluidez de animaciones) y *Cookies Analíticas / Rendimiento*.
  - Tabla de especificación con nombre de cookie, finalidad, proveedor y período de caducidad.
  - Instrucciones claras para la revocación o configuración directa en el navegador.

### 4.4. Banner Flotante de Consentimiento ([`src/components/CookieBanner.astro`](file:///D:/.TAPNOVA/v1/src/components/CookieBanner.astro))
- **Diseño**: Cápsula ergonómica flotante en *dark glass* (`backdrop-filter: blur(28px)`) fijada en la esquina inferior.
- **Cumplimiento AEPD obligatorio**:
  1. Botón principal: **«Aceptar todas»**.
  2. Botón de rechazo visible e igual de accesible: **«Solo necesarias»** (sin técnicas de patrones oscuros).
  3. Enlace accesible a la **Política de Cookies**.
  4. Persistencia en `localStorage` con expiración programada para no reaparecer si ya ha sido configurado.
