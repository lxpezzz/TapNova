import { products, type Product, type ProductImage, type ProductPrice, type ProductVariant } from './products';
import DetailImage from '../../public/images/cta/cta-product-detail.webp';
import InteractionImage from '../assets/qr-nfc/qr-nfc-experience.webp';
import { posavasosModelPrices } from './order-options';

export interface FamilyModel extends ProductVariant {
  description: string;
  price: ProductPrice;
}

export interface ProductFamily {
  product: Product;
  price: ProductPrice;
  introduction: string;
  modelsIntroduction: string;
  models: FamilyModel[];
  singleOption?: boolean;
  selection?: { heading: string; description: string; destinationLabel: string };
  galleryTitle?: string;
  uses: string[];
  customization: { title: string; text: string }[];
  galleryIntroduction: string;
  gallery: (ProductImage & { caption: string })[];
  closing: { title: string; text: string; button: string; href: string };
}

const product = products.find(({ id }) => id === 'posavasos-personalizados');
if (!product?.image) throw new Error('Faltan los datos o la imagen principal de posavasos.');

// Los modelos y el configurador comparten las tarifas confirmadas.
// Las fotografías de los modelos se añadirán cuando se identifiquen.
export const posavasosFamily: ProductFamily = {
  product,
  price: product.price,
  introduction: 'Un gesto en la mesa para abrir tu carta, facilitar una reseña o seguir en contacto.',
  modelsIntroduction: 'Dos maneras de llevar la identidad de tu local a la mesa.',
  models: [
    {
      id: 'minimalista',
      name: 'Minimalista',
      description: 'Un diseño limpio y directo, con lo esencial para que el cliente identifique y utilice el punto de contacto.',
      price: posavasosModelPrices.minimalista,
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Mayor personalización visual para dar más presencia a la identidad de tu negocio. El diseño y las opciones se concretan según tu pedido.',
      price: posavasosModelPrices.premium,
    },
  ],
  uses: ['Reseñas', 'Carta', 'Reservas', 'Instagram', 'Promociones', 'Contacto'],
  customization: [
    {
      title: 'Tu logo y tu diseño.',
      text: 'Partimos del logo y de la identidad de tu negocio. La forma de aplicarlos y las posibilidades de personalización dependen del modelo y del acabado acordado.',
    },
    {
      title: 'El enlace que necesitas.',
      text: 'El QR puede abrir tu carta, reseñas, reservas o un enlace de tu local. Las opciones con NFC se confirman según el modelo; su lectura requiere un móvil compatible.',
    },
    {
      title: 'Las opciones, antes del pedido.',
      text: 'Materiales, acabados, cantidades y condiciones se concretan en la propuesta. Si no tienes el logo preparado, podemos revisar el material que tengas y qué hace falta adaptar.',
    },
  ],
  galleryIntroduction: 'Ejemplos de presentación de posavasos. El diseño final se concreta para tu negocio.',
  gallery: [
    {
      src: DetailImage,
      alt: 'Detalle de un posavasos con código QR y la marca TapNova',
      caption: 'La marca, en los detalles.',
    },
    {
      src: InteractionImage,
      alt: 'Un cliente utiliza el móvil junto a un posavasos con QR en una mesa de restaurante',
      caption: 'De la mesa al móvil.',
    },
  ],
  closing: {
    title: 'Tu próxima conexión empieza en la mesa.',
    text: 'Cuéntanos cómo es tu local y qué quieres facilitar a tus clientes. Concretamos el modelo, la personalización y las condiciones contigo.',
    button: 'Quiero estos posavasos',
    href: '/#contacto',
  },
};
