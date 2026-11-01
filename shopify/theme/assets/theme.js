/* Fikir Social Café — interacción del tema (sin dependencias) */
(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* Menú móvil */
  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-menu-toggle]');
    if (!toggle) return;
    const nav = $('#mobile-nav');
    const open = !nav.hasAttribute('open');
    nav.toggleAttribute('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  /* Selector de idioma */
  $$('[data-localization] select').forEach((select) => {
    select.addEventListener('change', () => select.form.submit());
  });

  /* Selectores de cantidad */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-qty]');
    if (!btn) return;
    const input = btn.parentElement.querySelector('input');
    const step = btn.dataset.qty === 'plus' ? 1 : -1;
    const min = Number(input.min || 0);
    input.value = Math.max(min, Number(input.value || 0) + step);
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  /* Cajón del carrito */
  const drawer = $('#cart-drawer');
  const openDrawer = () => {
    if (!drawer) return (window.location.href = window.fikir.routes.cart);
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    $('[data-drawer-close]', drawer)?.focus();
  };
  const closeDrawer = () => {
    drawer?.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-drawer-open]')) { e.preventDefault(); openDrawer(); }
    if (e.target.closest('[data-drawer-close]')) closeDrawer();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

  const renderSections = (sections) => {
    if (!sections) return;
    if (sections['cart-drawer']) {
      const html = new DOMParser().parseFromString(sections['cart-drawer'], 'text/html');
      const fresh = $('#cart-drawer-inner', html);
      const current = $('#cart-drawer-inner');
      if (fresh && current) current.replaceWith(fresh);
    }
    if (sections['cart-count']) {
      const html = new DOMParser().parseFromString(sections['cart-count'], 'text/html');
      const count = $('[data-cart-count]', html);
      $$('[data-cart-count]').forEach((el) => {
        el.textContent = count ? count.textContent : '0';
        el.dataset.count = count ? count.dataset.count : '0';
      });
    }
  };

  /* Añadir al carrito */
  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('form[data-product-form]');
    if (!form) return;
    e.preventDefault();
    const button = $('[type="submit"]', form);
    const status = $('[data-form-status]', form);
    button.disabled = true;
    const body = new FormData(form);
    body.append('sections', 'cart-drawer,cart-count');
    body.append('sections_url', window.location.pathname);
    try {
      const res = await fetch(window.fikir.routes.cart_add + '.js', { method: 'POST', body, headers: { Accept: 'application/json' } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.description || window.fikir.strings.error);
      renderSections(data.sections);
      if (status) status.textContent = '';
      openDrawer();
    } catch (err) {
      if (status) status.textContent = err.message;
    } finally {
      button.disabled = false;
    }
  });

  /* Cambiar cantidades en el cajón */
  const changeLine = async (line, quantity) => {
    const res = await fetch(window.fikir.routes.cart_change + '.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ line, quantity, sections: ['cart-drawer', 'cart-count'], sections_url: window.location.pathname })
    });
    const data = await res.json();
    renderSections(data.sections);
  };
  document.addEventListener('change', (e) => {
    const input = e.target.closest('[data-line-qty]');
    if (input && input.closest('#cart-drawer')) changeLine(Number(input.dataset.lineQty), Number(input.value));
  });
  document.addEventListener('click', (e) => {
    const remove = e.target.closest('[data-line-remove]');
    if (remove && remove.closest('#cart-drawer')) { e.preventDefault(); changeLine(Number(remove.dataset.lineRemove), 0); }
  });

  /* Producto: variantes, galería y suscripción */
  $$('[data-product]').forEach((root) => {
    const variants = JSON.parse($('[data-variants]', root).textContent);
    const form = $('form[data-product-form]', root);
    const idInput = $('input[name="id"]', form);
    const priceEl = $('[data-price]', root);
    const button = $('[type="submit"]', form);
    const help = $('[data-grind-help]', root);
    const grindHelp = help ? JSON.parse(help.dataset.grindHelp) : {};

    const selected = () => $$('fieldset[data-option] input:checked', root).map((i) => i.value);
    const update = () => {
      const values = selected();
      const variant = variants.find((v) => v.options.every((o, i) => o === values[i]));
      if (help) {
        const grind = values.find((v) => grindHelp[v]);
        help.textContent = grind ? grindHelp[grind] : '';
      }
      if (!variant) { button.disabled = true; return; }
      idInput.value = variant.id;
      const plan = $('[name="selling_plan"]', form);
      const planPrice = plan && !plan.disabled ? variant.plans?.[plan.value] : null;
      priceEl.textContent = planPrice || variant.price;
      button.disabled = !variant.available;
      button.textContent = variant.available ? window.fikir.strings.add : window.fikir.strings.sold_out;
      const url = new URL(window.location.href);
      url.searchParams.set('variant', variant.id);
      window.history.replaceState({}, '', url);
    };
    $$('fieldset[data-option] input', root).forEach((i) => i.addEventListener('change', update));

    $$('input[name="purchase_type"]', root).forEach((radio) => {
      radio.addEventListener('change', () => {
        const plan = $('[name="selling_plan"]', form);
        if (plan) plan.disabled = radio.value !== 'subscription' || !radio.checked;
        update();
      });
    });
    $('[name="selling_plan"]', form)?.addEventListener('change', update);

    $$('[data-thumb]', root).forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const main = $('[data-main-image]', root);
        main.src = thumb.dataset.thumb;
        main.srcset = thumb.dataset.srcset || '';
        main.alt = thumb.querySelector('img').alt;
        $$('[data-thumb]', root).forEach((t) => t.setAttribute('aria-current', String(t === thumb)));
      });
    });
    update();

    /* Barra fija de compra en móvil: aparece cuando el botón principal sale de la pantalla */
    const sticky = $('[data-sticky-buy]', root);
    if (sticky && 'IntersectionObserver' in window) {
      const stickyPrice = $('[data-sticky-price]', sticky);
      new IntersectionObserver(([entry]) => {
        const show = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        sticky.classList.toggle('is-visible', show);
        document.body.classList.toggle('has-sticky-buy', show);
        sticky.setAttribute('aria-hidden', String(!show));
        if (stickyPrice) stickyPrice.textContent = priceEl.textContent;
      }).observe(button);
      $('[data-sticky-add]', sticky).addEventListener('click', () => {
        if (button.disabled) { button.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
        form.requestSubmit ? form.requestSubmit(button) : button.click();
      });
    }
  });
})();
