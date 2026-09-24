/* Lumina — small, dependency-light interactions for the landing page. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.remove('no-js');

  function createIcons() {
    if (!window.lucide || typeof window.lucide.createIcons !== 'function') return;
    try {
      window.lucide.createIcons({ icons: window.lucide.icons, attrs: { 'stroke-width': 1.7 } });
    } catch (error) {
      try { window.lucide.createIcons(); } catch (fallbackError) { /* Optional icons. */ }
    }
  }
  createIcons();

  var motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reducedMotion = Boolean(motionQuery && motionQuery.matches);
  var revealItems = document.querySelectorAll('.animate-on-scroll');

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  }

  var header = document.querySelector('.site-header');
  var scrollTicking = false;
  function updateHeader() {
    scrollTicking = false;
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', function () {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(updateHeader);
  }, { passive: true });
  updateHeader();

  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  function setMenu(open) {
    if (!menuToggle || !mobileMenu) return;
    mobileMenu.classList.toggle('hidden', !open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
    menuToggle.innerHTML = open ? '<i data-lucide="x" class="h-5 w-5"></i>' : '<i data-lucide="menu" class="h-5 w-5"></i>';
    createIcons();
    if (open) {
      var firstLink = mobileMenu.querySelector('a');
      if (firstLink) firstLink.focus({ preventScroll: true });
    } else {
      menuToggle.focus({ preventScroll: true });
    }
  }
  if (menuToggle) menuToggle.addEventListener('click', function () {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });
  document.querySelectorAll('[data-menu-close]').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menuToggle && menuToggle.getAttribute('aria-expanded') === 'true') setMenu(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024 && menuToggle && menuToggle.getAttribute('aria-expanded') === 'true') setMenu(false);
  }, { passive: true });

  var billingButtons = document.querySelectorAll('[data-billing]');
  var prices = document.querySelectorAll('[data-monthly][data-yearly]');
  billingButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var period = button.getAttribute('data-billing');
      billingButtons.forEach(function (option) {
        var active = option === button;
        option.classList.toggle('active', active);
        option.setAttribute('aria-pressed', String(active));
      });
      prices.forEach(function (price) {
        price.textContent = price.getAttribute(period === 'yearly' ? 'data-yearly' : 'data-monthly');
      });
      document.querySelectorAll('.pricing-card').forEach(function (card) {
        var billing = card.querySelector('.plan-billing');
        var name = card.querySelector('.plan-name');
        if (!billing || !name || name.textContent.trim() === 'Essentials' || card.querySelector('.custom-price')) return;
        billing.textContent = period === 'yearly' ? 'Billed annually — save 20%' : 'Billed monthly';
      });
    });
  });

  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  /* Initialize a published Unicorn scene when its project ID is supplied. */
  if (window.UnicornStudio && document.querySelector('[data-us-project]')) {
    window.UnicornStudio.init().catch(function () { /* CSS aura remains as fallback. */ });
  }
})();
