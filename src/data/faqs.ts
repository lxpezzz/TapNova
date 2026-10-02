export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  questions: Faq[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: 'general',
    title: 'General / TapNova',
    questions: [
      {
        id: 'que-es-tapnova',
        question: '¿Qué es exactamente TapNova?',
        answer: 'TapNova conecta productos físicos y soluciones digitales para hostelería. Creamos piezas personalizadas con QR y NFC y trabajamos la presencia de tu local en Google y en tu web para facilitar el contacto con tus clientes.',
      },
      {
        id: 'productos-personalizados',
        question: '¿Los productos se personalizan para cada negocio?',
        answer: 'Sí. Trabajamos la personalización para que las piezas reflejen la identidad de tu negocio. Las opciones de diseño, acabado y formato se concretan según el producto y el pedido.',
      },
      {
        id: 'usos-qr-nfc',
        question: '¿Qué puedo hacer con los códigos QR y NFC?',
        answer: 'Puedes llevar a tus clientes a la carta, las reseñas, las reservas, tu web o tus formas de contacto. Elegimos el destino según lo que quieras facilitar y las herramientas que utilice tu negocio.',
      },
      {
        id: 'para-quien',
        question: '¿TapNova es solo para restaurantes?',
        answer: 'También trabajamos para bares, cafeterías, hoteles y otros negocios de hostelería. La propuesta se adapta a cómo atiendes a tus clientes y a los momentos en los que tiene sentido conectar con ellos.',
      },
      {
        id: 'servicios-por-separado',
        question: '¿Tengo que contratar productos, web y SEO Local juntos?',
        answer: 'Puedes consultarnos por el producto o servicio que necesites. Revisamos tu situación y concretamos una propuesta; no hace falta plantear todo el ecosistema de una vez.',
      },
    ],
  },
  {
    id: 'posavasos',
    title: 'Posavasos personalizados',
    questions: [
      {
        id: 'posavasos-funcion',
        question: '¿Para qué sirve un posavasos con QR o NFC?',
        answer: 'Además de estar presente en la mesa, puede ofrecer un acceso sencillo a tu carta, tus reseñas, tus reservas o tu web. Es una forma de acercar esa información en un momento cotidiano del servicio.',
      },
      {
        id: 'posavasos-logo',
        question: '¿Puede llevar el logo de mi local?',
        answer: 'Sí, la personalización puede partir de tu logo y de la identidad de tu negocio. La forma de aplicarlos depende del modelo y del acabado que se acuerde.',
      },
      {
        id: 'posavasos-materiales',
        question: '¿Qué materiales y acabados puedo elegir?',
        answer: 'Las opciones se confirman para cada pedido. Cuéntanos el estilo del local y el uso que tendrán las piezas para valorar un material y un acabado adecuados.',
      },
      {
        id: 'posavasos-limpieza',
        question: '¿Cómo se limpian y se cuidan?',
        answer: 'El cuidado depende del material y del acabado. Antes de elegir, consulta las indicaciones del modelo; no todos admiten el mismo contacto con agua, calor o productos de limpieza.',
      },
      {
        id: 'posavasos-destino',
        question: '¿El posavasos puede abrir directamente mi carta?',
        answer: 'Sí, el QR o NFC puede enlazar a una carta disponible en internet. Revisamos la dirección y cómo se ve en el móvil antes de concretar el destino del producto.',
      },
    ],
  },
  {
    id: 'portacuentas',
    title: 'Portacuentas',
    questions: [
      {
        id: 'portacuentas-funcion',
        question: '¿Qué aporta un portacuentas con QR y NFC?',
        answer: 'Aprovecha el momento de entregar la cuenta para facilitar una reseña, una próxima reserva o el acceso a tu web. El cliente decide si quiere continuar desde su móvil.',
      },
      {
        id: 'portacuentas-personalizacion',
        question: '¿Se puede personalizar para mi restaurante?',
        answer: 'Sí. Podemos plantear la personalización alrededor de tu logo y del estilo del local. Los detalles de diseño y acabado se confirman según el modelo elegido.',
      },
      {
        id: 'portacuentas-resenas',
        question: '¿Puede llevar al cliente a dejar una reseña en Google?',
        answer: 'Puede enlazar al lugar donde tus clientes dejan reseñas de tu negocio. Facilita el acceso, pero la reseña y su valoración siempre dependen de la experiencia y de la decisión del cliente.',
      },
      {
        id: 'portacuentas-pagos',
        question: '¿El QR sirve también para cobrar la cuenta?',
        answer: 'Tener un QR no convierte el portacuentas en un sistema de pago. Si quieres enlazar a una herramienta de cobro, hay que revisar la solución que utilizas y acordar ese uso antes del pedido.',
      },
      {
        id: 'portacuentas-formato',
        question: '¿Cómo sé qué formato me conviene?',
        answer: 'Cuéntanos cómo entregas la cuenta y qué necesitas colocar en el portacuentas. El formato, las dimensiones y la presentación se concretan antes de confirmar el pedido.',
      },
    ],
  },
  {
    id: 'expositores',
    title: 'Expositores QR + NFC',
    questions: [
      {
        id: 'expositores-ubicacion',
        question: '¿Dónde tiene sentido colocar un expositor?',
        answer: 'En una mesa, la barra, la recepción o un punto visible donde el cliente pueda detenerse y usar el móvil. La ubicación debe facilitar la lectura sin estorbar el servicio.',
      },
      {
        id: 'expositores-destino',
        question: '¿Qué puede abrir el expositor en el móvil?',
        answer: 'Puede enlazar a tu carta, tus reseñas, tu web, las reservas o un contacto. Elegimos el destino según el lugar donde estará y la acción que quieras facilitar.',
      },
      {
        id: 'expositores-diseno',
        question: '¿El diseño puede seguir la estética de mi local?',
        answer: 'Sí, la personalización se plantea teniendo en cuenta la identidad del negocio. Las opciones de materiales, tamaño y acabado se revisan según el modelo y el pedido.',
      },
      {
        id: 'expositores-exterior',
        question: '¿Puedo utilizarlo en una terraza o en el exterior?',
        answer: 'Depende del material, del acabado y de la exposición al agua o al sol. Indícanos dónde lo colocarás para confirmar si el modelo es adecuado antes de pedirlo.',
      },
      {
        id: 'expositores-varios',
        question: '¿Puedo tener expositores con distintos destinos?',
        answer: 'Puedes plantear usos distintos para mesas, barra o recepción. Los enlaces y la identificación de cada pieza se acuerdan al preparar el pedido para que cada una dirija al lugar correcto.',
      },
    ],
  },
  {
    id: 'tarjetas',
    title: 'Tarjetas NFC / QR',
    questions: [
      {
        id: 'tarjetas-funcion',
        question: '¿Para qué puedo usar una tarjeta NFC o QR?',
        answer: 'Para acercar un enlace a tus clientes: tu web, contacto, reservas o reseñas. El formato y las opciones disponibles se confirman en la propuesta del pedido.',
      },
      {
        id: 'tarjetas-uso',
        question: '¿Cómo se utiliza una tarjeta NFC?',
        answer: 'El cliente acerca un móvil compatible a la zona NFC y abre el enlace que aparece. La posición de lectura y los ajustes pueden variar según el teléfono.',
      },
      {
        id: 'tarjetas-qr',
        question: '¿Conviene que la tarjeta tenga también un QR?',
        answer: 'El QR ofrece otra forma de acceder al enlace con la cámara, especialmente cuando el móvil no puede leer NFC. La combinación disponible se confirma según la tarjeta elegida.',
      },
      {
        id: 'tarjetas-personalizacion',
        question: '¿Se puede personalizar con mi marca?',
        answer: 'Puedes consultarnos una tarjeta con la identidad de tu negocio. El diseño, el formato y las posibilidades de personalización se concretan antes de confirmar el pedido.',
      },
      {
        id: 'tarjetas-contactos',
        question: '¿La tarjeta guarda automáticamente un contacto en el móvil?',
        answer: 'No por el simple hecho de llevar NFC o QR. Eso depende de la página o herramienta a la que enlace, y el cliente debe realizar o aceptar la acción correspondiente.',
      },
    ],
  },
  {
    id: 'qr-nfc',
    title: 'QR + NFC',
    questions: [
      {
        id: 'qr-nfc-diferencia',
        question: '¿Qué diferencia hay entre QR y NFC?',
        answer: 'El QR se lee con la cámara del móvil. El NFC se lee acercando un teléfono compatible a la pieza. Ambos pueden llevar al cliente a un enlace sin tener que escribir una dirección.',
      },
      {
        id: 'qr-nfc-app',
        question: '¿Mis clientes necesitan instalar una aplicación?',
        answer: 'Para abrir un enlace normal no necesitan una aplicación de TapNova. Muchos móviles leen QR con la cámara y NFC al acercarlos; el funcionamiento depende del teléfono y sus ajustes.',
      },
      {
        id: 'qr-nfc-internet',
        question: '¿Hace falta conexión a internet?',
        answer: 'Para abrir una web, consultar una carta online o acceder a Google se necesita conexión. Leer el QR o NFC permite obtener el enlace, pero no sustituye la conexión del móvil.',
      },
      {
        id: 'qr-nfc-cambiar',
        question: '¿Puedo cambiar el destino después de recibir el producto?',
        answer: 'Depende de cómo se prepare el enlace. Un QR impreso mantiene su dirección; si esa dirección lleva a una página gestionable, su contenido puede cambiar. Confirmamos las posibilidades antes del pedido.',
      },
      {
        id: 'qr-nfc-varias-opciones',
        question: '¿Un mismo QR puede dar acceso a varias opciones?',
        answer: 'Puede abrir una página que reúna carta, reseñas, reservas u otros enlaces. Esa página y sus opciones deben definirse como parte de la solución; no están incluidas automáticamente en cualquier producto.',
      },
      {
        id: 'qr-nfc-no-funciona',
        question: '¿Qué reviso si un cliente no puede abrir el enlace?',
        answer: 'Comprueba la conexión, que el QR esté visible y que la dirección siga funcionando. Para NFC, revisa la compatibilidad y los ajustes del móvil, y prueba a acercarlo a otra zona de la pieza.',
      },
    ],
  },
  {
    id: 'personalizacion-pedidos',
    title: 'Personalización y pedidos',
    questions: [
      {
        id: 'pedido-empezar',
        question: '¿Qué necesitáis para preparar una propuesta?',
        answer: 'El tipo de negocio, las piezas que te interesan, una cantidad orientativa, tu logo si lo tienes y qué quieres que abra el QR o NFC. Con eso podemos concretar las opciones y el presupuesto.',
      },
      {
        id: 'pedido-cantidades',
        question: '¿Hay una cantidad mínima de pedido?',
        answer: 'La cantidad mínima depende del producto y de la personalización. Indícanos cuántas piezas necesitas para confirmar las condiciones del pedido concreto.',
      },
      {
        id: 'pedido-plazo',
        question: '¿Cuánto tarda un pedido personalizado?',
        answer: 'Depende del producto, la cantidad, el diseño y la disponibilidad. El plazo se confirma con la propuesta; si tienes una fecha importante, cuéntanosla desde el principio.',
      },
      {
        id: 'pedido-precio',
        question: '¿Cómo se calcula el precio?',
        answer: 'Se tienen en cuenta el producto, la cantidad, los acabados y la personalización, junto con los servicios que se acuerden. El presupuesto detalla el alcance antes de confirmar el pedido.',
      },
      {
        id: 'pedido-sin-logo',
        question: '¿Puedo consultar un pedido si no tengo el logo preparado?',
        answer: 'Sí, puedes contarnos qué necesitas y enviarnos lo que tengas. Revisamos si el archivo sirve para el producto o si hace falta preparar algún material; ese trabajo se concreta en la propuesta.',
      },
      {
        id: 'pedido-envio',
        question: '¿Cómo se concretan el envío y sus costes?',
        answer: 'Dependen del destino y de las características del pedido. La entrega, los costes asociados y cualquier condición aplicable se confirman en la propuesta.',
      },
    ],
  },
  {
    id: 'seo-local',
    title: 'SEO Local',
    questions: [
      {
        id: 'seo-que-es',
        question: '¿Qué es el SEO Local?',
        answer: 'Es el trabajo de mejorar cómo aparece tu negocio cuando alguien busca un local cerca o en tu zona. Incluye revisar información, ficha de Google, fotografías y otros aspectos que ayudan a entender y elegir tu negocio.',
      },
      {
        id: 'seo-primero',
        question: '¿Puedo aparecer el primero en Google?',
        answer: 'Nadie puede garantizarte esa posición. Los resultados cambian según la búsqueda, la ubicación de la persona y otros negocios. Trabajamos las mejoras que están a nuestro alcance sin prometer un puesto concreto.',
      },
      {
        id: 'seo-tiempo',
        question: '¿Cuánto tiempo tarda en notarse?',
        answer: 'Depende del punto de partida, de la competencia y de las mejoras que se hagan. Algunos cambios se reflejan antes que otros; la visibilidad se revisa con el tiempo y no tiene un plazo ni un resultado garantizados.',
      },
      {
        id: 'seo-ficha-existente',
        question: '¿Podéis revisar una ficha de Google que ya tengo?',
        answer: 'Sí. Revisamos cómo se presenta el local, sus datos, reseñas y fotografías, y lo comparamos con otros negocios cercanos. Después te explicamos qué recomendamos mejorar y por qué.',
      },
      {
        id: 'seo-publicidad',
        question: '¿SEO Local y anuncios de Google son lo mismo?',
        answer: 'No. Los anuncios son espacios de pago; el SEO Local trabaja la presencia del negocio en los resultados que no dependen de pagar por cada anuncio. Una campaña publicitaria sería un alcance distinto que habría que valorar.',
      },
      {
        id: 'seo-resenas',
        question: '¿Los productos con QR sustituyen el trabajo de SEO Local?',
        answer: 'No. Pueden facilitar que un cliente acceda a tus reseñas o a tu información, pero el SEO Local también revisa cómo se presenta y se entiende tu negocio. Son herramientas que pueden complementarse.',
      },
    ],
  },
  {
    id: 'paginas-web',
    title: 'Páginas web',
    questions: [
      {
        id: 'web-incluye',
        question: '¿Qué incluye una página web de TapNova?',
        answer: 'La web se plantea alrededor de tu local: presentación, carta, horarios, ubicación y formas de reservar o contactar, según lo que necesites. Las páginas, contenidos y funciones incluidos se concretan en la propuesta.',
      },
      {
        id: 'web-modificar',
        question: '¿Podré modificar información de mi web?',
        answer: 'Depende de cómo se plantee el proyecto. Antes de empezar acordamos cómo actualizarás la carta, los horarios u otros datos: mediante una herramienta de edición o con un servicio de cambios, según la solución elegida.',
      },
      {
        id: 'web-movil',
        question: '¿La página funcionará bien en móvil?',
        answer: 'Sí, el diseño se adapta al móvil para que la información, la carta y las formas de contacto sean fáciles de usar. También revisamos su presentación en otros tamaños de pantalla.',
      },
      {
        id: 'web-reservas',
        question: '¿Puede conectarse con mi sistema de reservas?',
        answer: 'Revisamos qué herramienta utilizas y cómo permite recibir reservas desde la web. Puede resolverse con un enlace o con una integración, pero su compatibilidad y alcance se confirman antes de empezar.',
      },
      {
        id: 'web-dominio',
        question: '¿El dominio y el alojamiento están incluidos?',
        answer: 'Se especifican en la propuesta, junto con los costes y responsabilidades de renovación. Si ya tienes dominio o alojamiento, revisamos cómo aprovecharlos dentro del proyecto.',
      },
      {
        id: 'web-material',
        question: '¿Qué información tengo que aportar para la web?',
        answer: 'Tu carta, horarios, ubicación, formas de contacto y reserva, logo y fotografías disponibles. Revisamos el material contigo y concretamos si hace falta preparar textos, imágenes u otros contenidos.',
      },
    ],
  },
];

export const miniFaqIds = {
  home: ['que-es-tapnova', 'productos-personalizados', 'usos-qr-nfc'],
  seo: ['seo-que-es', 'seo-primero', 'seo-tiempo'],
  web: ['web-incluye', 'web-modificar', 'web-movil'],
} as const;

export function getMiniFaqs(page: keyof typeof miniFaqIds): Faq[] {
  const questions = faqCategories.flatMap((category) => category.questions);
  return miniFaqIds[page].map((id) => {
    const question = questions.find((faq) => faq.id === id);
    if (!question) throw new Error(`No se encuentra la FAQ: ${id}`);
    return question;
  });
}
