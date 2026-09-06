import type { CatalogProduct, ProductColorOption } from '../../data/catalogData';

interface ClientProduct extends Omit<CatalogProduct, 'image'> {
  image: { src: string } | string;
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  basePrice: number;
  price: number;
  colorName: string | null;
  colorHex: string | null;
  quantity: number;
}

declare global {
  interface Window {
    __tapnovaCatalogController?: AbortController;
  }
}

const CART_STORAGE_KEY = 'tapnova_b2b_cart_v1';
const VAT_RATE = 0.21;
const WHATSAPP_NUMBER = '34910000000';
const CLOSE_ANIMATION_MS = 250;

const byId = <T extends HTMLElement>(id: string, scope: Document | HTMLElement = document) =>
  scope.querySelector<T>(`#${id}`);

const all = <T extends HTMLElement>(selector: string, scope: Document | HTMLElement = document) =>
  Array.from(scope.querySelectorAll<T>(selector));

const formatEuro = (amount: number, fixedDecimals = true) =>
  `${amount.toLocaleString('es-ES', fixedDecimals
    ? { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    : { maximumFractionDigits: 2 })} €`;

const discountFor = (quantity: number) => quantity >= 10 ? 0.3 : quantity >= 5 ? 0.2 : 0;

const unitPriceFor = (basePrice: number, quantity: number) =>
  Number((basePrice * (1 - discountFor(quantity))).toFixed(2));

const imageSource = (product: ClientProduct) =>
  typeof product.image === 'string' ? product.image : product.image.src;

const colorBackground = (color: ProductColorOption) => {
  if (color.id === 'negro-aluminio') return 'linear-gradient(135deg, #1e1e24 50%, #9ca3af 50%)';
  if (color.id === 'camel-laton') return 'linear-gradient(135deg, #af7a48 50%, #d4af37 50%)';
  return color.hex;
};

function initProductCatalog() {
  const root = byId<HTMLElement>('b2b-marketplace');
  if (!root || root.dataset.initialized === 'true') return;

  root.dataset.initialized = 'true';
  window.__tapnovaCatalogController?.abort();
  const controller = new AbortController();
  const listenerOptions = { signal: controller.signal };
  window.__tapnovaCatalogController = controller;

  const refs = {
    search: byId<HTMLInputElement>('catalog-search-input', root),
    clearSearch: byId<HTMLButtonElement>('clear-search-btn', root),
    resetSearch: byId<HTMLButtonElement>('reset-search-btn', root),
    visibleCount: byId('visible-count', root),
    emptyState: byId('empty-search-state', root),
    sectionsWrap: byId('catalog-sections-wrap', root),
    productBackdrop: byId('product-modal-backdrop', root),
    productClose: byId<HTMLButtonElement>('modal-close-btn', root),
    productImage: byId<HTMLImageElement>('modal-product-img', root),
    productTitle: byId('modal-product-title', root),
    productSubtitle: byId('modal-subtitle', root),
    unitPrice: byId('modal-unit-price-display', root),
    basePrice: byId('modal-base-strikethrough', root),
    discount: byId('modal-discount-tag', root),
    discountText: byId('modal-discount-tag-text', root),
    swatchesGroup: byId('modal-swatches-group', root),
    swatches: byId('modal-color-swatches-container', root),
    activeColor: byId('modal-active-color-label', root),
    colorBadge: byId('modal-stage-color-badge', root),
    colorDot: byId<HTMLElement>('modal-stage-color-dot', root),
    colorName: byId('modal-stage-color-name', root),
    tiers: byId('modal-volume-tiers-container', root),
    quantity: byId('modal-qty-val', root),
    quantityTotal: byId('modal-qty-total-hint', root),
    quantityMinus: byId<HTMLButtonElement>('modal-qty-minus', root),
    quantityPlus: byId<HTMLButtonElement>('modal-qty-plus', root),
    materials: byId('modal-materials-val', root),
    technology: byId('modal-tech-val', root),
    addToCart: byId<HTMLButtonElement>('modal-add-to-cart-btn', root),
    addToCartText: byId('modal-cta-text', root),
    cartBackdrop: byId('b2b-cart-backdrop', root),
    cartClose: byId<HTMLButtonElement>('cart-drawer-close-btn', root),
    cartEmpty: byId('cart-empty-state', root),
    cartItems: byId('cart-items-container', root),
    cartFooter: byId('cart-drawer-footer', root),
    cartCount: byId('cart-drawer-count-badge', root),
    cartSubtotal: byId('cart-subtotal-val', root),
    cartVat: byId('cart-iva-val', root),
    cartTotal: byId('cart-total-val', root),
    cartWhatsapp: byId<HTMLAnchorElement>('cart-send-whatsapp-btn', root),
    floatingCart: byId<HTMLButtonElement>('desktop-floating-cart-btn', root),
    floatingCount: byId('desktop-cart-badge-count', root),
    floatingTotal: byId('desktop-cart-total-display', root)
  };

  const cards = all<HTMLElement>('[data-product-card]', root);
  const sections = all<HTMLElement>('.catalog-category-section', root);
  const categoryControls = all<HTMLButtonElement>('[data-category]', root);

  let activeCategory = 'todos';
  let searchQuery = '';
  let selectedProduct: ClientProduct | null = null;
  let selectedColor: ProductColorOption | null = null;
  let modalQuantity = 1;
  let cart: CartItem[] = [];
  let touchOrigin: { x: number; y: number } | null = null;
  let touchMoved = false;

  const setText = (element: HTMLElement | null, value: string) => {
    if (element) element.textContent = value;
  };

  const setBodyLock = () => {
    const isOpen = (overlay: HTMLElement | null) =>
      Boolean(overlay && !overlay.hidden && overlay.classList.contains('is-open'));
    const locked = isOpen(refs.productBackdrop) || isOpen(refs.cartBackdrop);
    document.body.style.overflow = locked ? 'hidden' : '';
    document.body.classList.toggle('product-sheet-open', locked);
  };

  const openOverlay = (overlay: HTMLElement | null) => {
    if (!overlay) return;
    overlay.hidden = false;
    requestAnimationFrame(() => {
      overlay.classList.add('is-open');
      setBodyLock();
    });
  };

  const closeOverlay = (overlay: HTMLElement | null) => {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    window.setTimeout(() => {
      overlay.hidden = true;
      setBodyLock();
    }, CLOSE_ANIMATION_MS);
  };

  const saveCart = () => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // El catálogo sigue operativo aunque el navegador bloquee localStorage.
    }
    renderCart();
  };

  const loadCart = () => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      cart = stored ? JSON.parse(stored) : [];
      cart.forEach((item) => {
        item.basePrice ||= item.price;
        item.price = unitPriceFor(item.basePrice, item.quantity);
      });
    } catch {
      cart = [];
    }
  };

  const whatsappUrl = (subtotal: number, vat: number, total: number) => {
    const lines = cart.map((item) => {
      const finish = item.colorName ? ` (Acabado: ${item.colorName})` : '';
      return `• ${item.quantity}x ${item.name}${finish} — ${formatEuro(item.price)} / ud = ${formatEuro(item.price * item.quantity)}`;
    });
    const message = [
      '¡Hola TapNova! 👋 Quisiera solicitar presupuesto para el siguiente pedido de mi restaurante:',
      '', '📦 PRODUCTOS SELECCIONADOS:', ...lines, '', '📊 RESUMEN ORIENTATIVO:',
      `- Subtotal (Base imponible): ${formatEuro(subtotal)}`,
      `- IVA estimado (21%): ${formatEuro(vat)}`,
      `- Total estimado: ${formatEuro(total)}`, '',
      'ℹ️ Total orientativo. Solicito confirmación de disponibilidad, simulación con el logotipo de mi restaurante y plazos de entrega. ¡Muchas gracias!'
    ].join('\n');
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  function renderCart() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const vat = subtotal * VAT_RATE;
    const total = subtotal + vat;
    const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    setText(refs.floatingCount, String(quantity));
    setText(refs.floatingTotal, formatEuro(total));
    setText(refs.cartCount, String(quantity));
    setText(refs.cartSubtotal, formatEuro(subtotal));
    setText(refs.cartVat, formatEuro(vat));
    setText(refs.cartTotal, formatEuro(total));

    const navBadge = byId('mobile-nav-cart-badge');
    if (navBadge) {
      navBadge.textContent = String(quantity);
      navBadge.classList.toggle('has-items', quantity > 0);
    }
    window.dispatchEvent(new CustomEvent('tapnova:cart-updated', { detail: { count: quantity } }));

    if (refs.cartWhatsapp) refs.cartWhatsapp.href = cart.length ? whatsappUrl(subtotal, vat, total) : '#';
    if (!refs.cartItems || !refs.cartEmpty || !refs.cartFooter) return;
    refs.cartEmpty.hidden = cart.length > 0;
    refs.cartFooter.hidden = cart.length === 0;
    refs.cartItems.replaceChildren(...cart.map(createCartItem));
  }

  function createCartItem(item: CartItem) {
    const card = document.createElement('div');
    card.className = 'cart-item-card';
    card.dataset.itemId = item.id;
    const variant = item.colorName
      ? `<span class="cart-item-variant"><span class="cart-variant-dot" style="background-color:${item.colorHex || '#555'}"></span><span>${item.colorName}</span></span>`
      : '';
    card.innerHTML = `
      <img src="${item.imageSrc}" alt="${item.imageAlt}" class="cart-item-img">
      <div class="cart-item-details"><h4 class="cart-item-name" title="${item.name}">${item.name}</h4>${variant}<span class="cart-item-unit-price">${formatEuro(item.price)} / ud</span></div>
      <div class="cart-item-actions">
        <button type="button" class="cart-item-delete-btn" data-cart-action="delete" data-id="${item.id}" aria-label="Eliminar ${item.name}">✕</button>
        <div class="cart-item-stepper"><button type="button" class="cart-stepper-btn" data-cart-action="dec" data-id="${item.id}" aria-label="Disminuir unidad">−</button><span class="cart-stepper-qty">${item.quantity}</span><button type="button" class="cart-stepper-btn" data-cart-action="inc" data-id="${item.id}" aria-label="Aumentar unidad">+</button></div>
        <span class="cart-item-subtotal">${formatEuro(item.price * item.quantity)}</span>
      </div>`;
    return card;
  }

  function filterCatalog() {
    let visible = 0;
    cards.forEach((card) => {
      const matchesCategory = activeCategory === 'todos' || card.dataset.categoryId === activeCategory;
      const matchesSearch = !searchQuery || (card.dataset.searchTerms || '').includes(searchQuery);
      const show = matchesCategory && matchesSearch;
      card.classList.toggle('is-filtered-out', !show);
      if (show) visible++;
    });
    sections.forEach((section) => {
      const matchesCategory = activeCategory === 'todos' || section.dataset.sectionCategory === activeCategory;
      const hasProducts = section.querySelector('[data-product-card]:not(.is-filtered-out)');
      section.style.display = matchesCategory && hasProducts ? 'block' : 'none';
    });
    setText(refs.visibleCount, String(visible));
    if (refs.emptyState) refs.emptyState.hidden = visible > 0;
    if (refs.clearSearch) refs.clearSearch.hidden = searchQuery.length === 0;
  }

  const centerCategory = (control: HTMLElement) => {
    const track = control.closest<HTMLElement>('.mobile-category-scroll-track');
    if (!track) return;
    const left = control.offsetLeft - track.clientWidth / 2 + control.offsetWidth / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    if (!refs.sectionsWrap) return;
    const offset = window.innerWidth <= 960 ? 125 : 90;
    const top = refs.sectionsWrap.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  function selectCategory(category: string, scroll = true) {
    activeCategory = category;
    categoryControls.forEach((control) => {
      const active = control.dataset.category === category;
      control.classList.toggle('active', active);
      control.setAttribute('aria-selected', String(active));
      if (active && control.classList.contains('mobile-cat-pill')) centerCategory(control);
    });
    filterCatalog();
    if (scroll) scrollToCatalog();
  }

  const updateColorBadge = (color: ProductColorOption | null) => {
    if (!refs.colorBadge) return;
    refs.colorBadge.hidden = !color;
    if (!color) return;
    if (refs.colorDot) refs.colorDot.style.background = colorBackground(color);
    setText(refs.colorName, color.name);
  };

  function renderColors(product: ClientProduct) {
    if (!refs.swatches) return;
    refs.swatches.replaceChildren();
    const colors = product.colors || [];
    if (refs.swatchesGroup) refs.swatchesGroup.hidden = colors.length === 0;
    colors.forEach((color, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `modal-color-chip${index === 0 ? ' is-selected' : ''}`;
      button.dataset.colorIndex = String(index);
      button.title = color.name;
      button.setAttribute('aria-label', `Seleccionar acabado ${color.name}`);
      button.innerHTML = `<span class="color-chip-dot"><svg class="color-check-icon" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span class="color-chip-name">${color.name}</span>`;
      button.querySelector<HTMLElement>('.color-chip-dot')!.style.background = colorBackground(color);
      refs.swatches?.append(button);
    });
    selectedColor = colors[0] || null;
    setText(refs.activeColor, selectedColor?.name || '—');
    updateColorBadge(selectedColor);
  }

  function updateModalPrice() {
    if (!selectedProduct) return;
    const discount = discountFor(modalQuantity);
    const unitPrice = unitPriceFor(selectedProduct.price, modalQuantity);
    const total = unitPrice * modalQuantity;
    setText(refs.unitPrice, formatEuro(unitPrice, false));
    setText(refs.quantity, String(modalQuantity));
    setText(refs.quantityTotal, `Total: ${formatEuro(total, false)}`);
    setText(refs.addToCartText, `Añadir ${modalQuantity} al carrito · ${formatEuro(total, false)}`);
    if (refs.basePrice) {
      refs.basePrice.hidden = discount === 0;
      refs.basePrice.textContent = formatEuro(selectedProduct.price, false);
    }
    if (refs.discount) refs.discount.hidden = discount === 0;
    setText(refs.discountText, `-${Math.round(discount * 100)}% dto.`);
    all<HTMLButtonElement>('.volume-tier-chip', refs.tiers || root).forEach((chip) => {
      const tier = Number(chip.dataset.tier);
      const active = tier === 10 ? modalQuantity >= 10 : tier === 5 ? modalQuantity >= 5 && modalQuantity < 10 : modalQuantity < 5;
      chip.classList.toggle('active', active);
    });
  }

  function openProduct(product: ClientProduct) {
    selectedProduct = product;
    modalQuantity = 1;
    setText(refs.productTitle, product.name);
    setText(refs.productSubtitle, product.subtitle);
    setText(refs.materials, product.materials);
    setText(refs.technology, product.tech);
    if (refs.productImage) {
      refs.productImage.src = imageSource(product);
      refs.productImage.alt = product.imageAlt;
    }
    ([1, 5, 10] as const).forEach((quantity) => {
      setText(byId(`tier-val-${quantity}`, root), `${formatEuro(unitPriceFor(product.price, quantity), false)} / ud`);
    });
    renderColors(product);
    updateModalPrice();
    openOverlay(refs.productBackdrop);
  }

  const productFromCard = (card: HTMLElement) => {
    try {
      return JSON.parse(card.dataset.productJson || '') as ClientProduct;
    } catch {
      return null;
    }
  };

  function addSelectedProduct() {
    if (!selectedProduct) return;
    const id = `${selectedProduct.id}__${selectedColor?.name || 'default'}`;
    const existing = cart.find((item) => item.id === id);
    if (existing) {
      existing.quantity += modalQuantity;
      existing.price = unitPriceFor(existing.basePrice, existing.quantity);
    } else {
      cart.push({
        id, productId: selectedProduct.id, name: selectedProduct.name,
        subtitle: selectedProduct.subtitle, imageSrc: imageSource(selectedProduct),
        imageAlt: selectedProduct.imageAlt, basePrice: selectedProduct.price,
        price: unitPriceFor(selectedProduct.price, modalQuantity),
        colorName: selectedColor?.name || null, colorHex: selectedColor?.hex || null,
        quantity: modalQuantity
      });
    }
    saveCart();
    closeOverlay(refs.productBackdrop);
    openOverlay(refs.cartBackdrop);
  }

  function updateCartItem(action: string, id: string) {
    const item = cart.find((entry) => entry.id === id);
    if (!item) return;
    if (action === 'delete' || (action === 'dec' && item.quantity === 1)) {
      cart = cart.filter((entry) => entry.id !== id);
    } else {
      item.quantity += action === 'inc' ? 1 : -1;
      item.price = unitPriceFor(item.basePrice, item.quantity);
    }
    saveCart();
  }

  function handleHash() {
    const hash = location.hash.slice(1).trim();
    if (!hash) return;
    if (categoryControls.some((control) => control.dataset.category === hash)) return selectCategory(hash);
    const target = byId(hash, root) || byId(`categoria-${hash}`, root);
    if (!target) return;
    const offset = window.innerWidth <= 960 ? 125 : 90;
    window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset), behavior: 'smooth' });
  }

  root.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const category = target.closest<HTMLButtonElement>('[data-category]');
    if (category) return selectCategory(category.dataset.category || 'todos');
    const cartAction = target.closest<HTMLElement>('[data-cart-action]');
    if (cartAction?.dataset.cartAction && cartAction.dataset.id) return updateCartItem(cartAction.dataset.cartAction, cartAction.dataset.id);
    const color = target.closest<HTMLButtonElement>('[data-color-index]');
    if (color && selectedProduct) {
      selectedColor = selectedProduct.colors[Number(color.dataset.colorIndex)] || null;
      all('.modal-color-chip', refs.swatches || root).forEach((chip) => chip.classList.toggle('is-selected', chip === color));
      setText(refs.activeColor, selectedColor?.name || '—');
      return updateColorBadge(selectedColor);
    }
    const tier = target.closest<HTMLButtonElement>('[data-tier]');
    if (tier) {
      modalQuantity = Number(tier.dataset.tier) || 1;
      return updateModalPrice();
    }
    const card = target.closest<HTMLElement>('[data-product-card]');
    if (card && !touchMoved) {
      const product = productFromCard(card);
      if (product) openProduct(product);
    }
    touchMoved = false;
  }, listenerOptions);

  root.addEventListener('keydown', (event) => {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key !== 'Enter' && keyboardEvent.key !== ' ') return;
    const card = (keyboardEvent.target as HTMLElement).closest<HTMLElement>('[data-product-card]');
    if (!card) return;
    keyboardEvent.preventDefault();
    const product = productFromCard(card);
    if (product) openProduct(product);
  }, listenerOptions);

  root.addEventListener('touchstart', (event) => {
    const touch = (event as TouchEvent).touches[0];
    touchOrigin = touch ? { x: touch.clientX, y: touch.clientY } : null;
    touchMoved = false;
  }, { ...listenerOptions, passive: true });
  root.addEventListener('touchmove', (event) => {
    const touch = (event as TouchEvent).touches[0];
    if (!touch || !touchOrigin) return;
    touchMoved = Math.abs(touch.clientX - touchOrigin.x) > 8 || Math.abs(touch.clientY - touchOrigin.y) > 8;
  }, { ...listenerOptions, passive: true });

  refs.search?.addEventListener('input', () => {
    searchQuery = refs.search?.value.trim().toLowerCase() || '';
    filterCatalog();
  }, listenerOptions);
  refs.clearSearch?.addEventListener('click', () => {
    if (!refs.search) return;
    refs.search.value = '';
    searchQuery = '';
    filterCatalog();
    refs.search.focus();
  }, listenerOptions);
  refs.resetSearch?.addEventListener('click', () => {
    if (refs.search) refs.search.value = '';
    searchQuery = '';
    selectCategory('todos');
  }, listenerOptions);
  refs.quantityMinus?.addEventListener('click', () => {
    if (modalQuantity > 1) modalQuantity--;
    updateModalPrice();
  }, listenerOptions);
  refs.quantityPlus?.addEventListener('click', () => {
    modalQuantity++;
    updateModalPrice();
  }, listenerOptions);
  refs.addToCart?.addEventListener('click', addSelectedProduct, listenerOptions);
  refs.productClose?.addEventListener('click', () => closeOverlay(refs.productBackdrop), listenerOptions);
  refs.cartClose?.addEventListener('click', () => closeOverlay(refs.cartBackdrop), listenerOptions);
  refs.floatingCart?.addEventListener('click', () => openOverlay(refs.cartBackdrop), listenerOptions);
  [refs.productBackdrop, refs.cartBackdrop].forEach((overlay) => {
    overlay?.addEventListener('click', (event) => {
      if (event.target === overlay) closeOverlay(overlay);
    }, listenerOptions);
  });

  window.addEventListener('tapnova:open-cart', () => openOverlay(refs.cartBackdrop), listenerOptions);
  window.addEventListener('hashchange', handleHash, listenerOptions);
  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (refs.productBackdrop?.classList.contains('is-open')) closeOverlay(refs.productBackdrop);
    else if (refs.cartBackdrop?.classList.contains('is-open')) closeOverlay(refs.cartBackdrop);
  }, listenerOptions);

  loadCart();
  renderCart();
  filterCatalog();
  handleHash();
  if (location.hash === '#cart' || new URLSearchParams(location.search).get('cart') === 'open') openOverlay(refs.cartBackdrop);
}

initProductCatalog();
document.addEventListener('astro:page-load', initProductCatalog);
