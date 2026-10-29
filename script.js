(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const menuButton = document.querySelector('.menu-button');
  const mobileNav = document.querySelector('.mobile-nav');
  const menuLabel = menuButton.querySelector('.menu-label');
  document.addEventListener('pointerdown', () => {
    document.documentElement.classList.add('pointer-input');
    document.documentElement.classList.remove('keyboard-input');
  }, {passive:true});
  document.addEventListener('keydown', () => {
    document.documentElement.classList.remove('pointer-input');
    document.documentElement.classList.add('keyboard-input');
  });
  document.querySelectorAll('button, .button, .header-cta').forEach(item => item.classList.add('pressable'));
  function closeMenu(returnFocus = false) {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuLabel.textContent = 'Menu';
    if (returnFocus) menuButton.focus();
  }
  menuButton.hidden = false;
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuLabel.textContent = open ? 'Menu' : 'Tutup';
    mobileNav.hidden = open;
  });
  mobileNav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) closeMenu(true); });
  document.addEventListener('click', event => {
    if (!mobileNav.hidden && !event.target.closest('.mobile-nav, .menu-button')) closeMenu();
  });
  matchMedia('(min-width:701px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  const heroModel = document.querySelector('.hero-model');
  const heroControls = document.querySelector('.view-controls');
  const heroButtons = [...heroControls.querySelectorAll('button')];
  const heroImages = { back: document.querySelector('#hero-back'), front: document.querySelector('#hero-front') };
  const heroStatus = document.createElement('p');
  heroStatus.className = 'hero-status';
  heroStatus.setAttribute('role', 'status');
  heroStatus.hidden = true;
  heroControls.after(heroStatus);
  heroImages.back.classList.add('is-active');
  heroImages.front.hidden = false;
  heroImages.front.setAttribute('aria-hidden', 'true');
  heroControls.hidden = false;
  let requestedSide = 'back';
  heroControls.addEventListener('click', async event => {
    const button = event.target.closest('[data-hero-view]');
    if (!button) return;
    requestedSide = button.dataset.heroView;
    const side = requestedSide;
    const image = heroImages[side];
    if (!image.complete) {
      heroStatus.textContent = 'Memuat tampilan kaus…';
      heroStatus.hidden = false;
    }
    try { await image.decode(); } catch {
      if (requestedSide === side) {
        heroStatus.textContent = 'Gambar belum bisa dimuat. Pilih sisinya untuk mencoba lagi.';
        heroStatus.hidden = false;
      }
      return;
    }
    if (requestedSide !== side) return;
    heroStatus.hidden = true;
    if (event.detail === 0) heroModel.classList.add('instant');
    Object.entries(heroImages).forEach(([key, item]) => {
      item.classList.toggle('is-active', key === side);
      item.setAttribute('aria-hidden', String(key !== side));
    });
    heroButtons.forEach(item => item.setAttribute('aria-pressed', String(item.dataset.heroView === side)));
    requestAnimationFrame(() => requestAnimationFrame(() => heroModel.classList.remove('instant')));
  });

  const tabs = [...document.querySelectorAll('[data-design]')];
  let selectedDesign = 'front';
  const panels = { front: document.querySelector('#panel-front'), back: document.querySelector('#panel-back') };
  function selectDesign(tab, animate) {
    const side = tab.dataset.design;
    if (side === selectedDesign) return;
    selectedDesign = side;
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    Object.entries(panels).forEach(([key, panel]) => {
      panel.hidden = key !== side;
      document.querySelector('#description-' + key).hidden = key !== side;
    });
    if (animate && !reduceMotion.matches) {
      panels[side].getAnimations().forEach(animation => animation.cancel());
      panels[side].animate([{opacity:.3,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}], {duration:240,easing:'cubic-bezier(.23,1,.32,1)'});
    }
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', event => selectDesign(tab, event.detail > 0));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault(); tabs[next].focus(); selectDesign(tabs[next], false);
    });
  });

  const dialog = document.querySelector('.art-dialog');
  const openArt = document.querySelector('[data-open-art]');
  if (typeof dialog.showModal === 'function') {
    openArt.hidden = false;
    openArt.addEventListener('click', event => {
      const source = panels[selectedDesign].querySelector('img');
      const fullImage = dialog.querySelector('img');
      fullImage.src = source.src; fullImage.alt = source.alt;
      dialog.querySelector('h2').textContent = selectedDesign === 'front' ? 'Captain Save-A-Ho — grafis depan' : 'Hypergamy — grafis belakang';
      dialog.classList.toggle('instant', event.detail === 0);
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    });
    dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
    dialog.querySelector('[data-close-art]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
  }

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      revealObserver.unobserve(entry.target);
      if (reduceMotion.matches || !entry.target.animate) return;
      entry.target.animate([{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}], {duration:700,easing:'cubic-bezier(.23,1,.32,1)'});
    }), {threshold:.1});
    document.querySelectorAll('[data-reveal]').forEach(item => revealObserver.observe(item));
    const navLinks = [...document.querySelectorAll('.nav a')];
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.classList.contains('hero') ? 'top' : entry.target.id;
        navLinks.forEach(link => { if (link.hash === '#' + id) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current'); });
      });
    }, {rootMargin:'-15% 0px -65% 0px'});
    document.querySelectorAll('.hero, #about, #work, #details').forEach(section => sectionObserver.observe(section));
  }
  document.querySelectorAll('[data-year]').forEach(item => item.textContent = new Date().getFullYear());
  document.documentElement.classList.add('js');
})();
