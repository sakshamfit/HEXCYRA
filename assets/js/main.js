/*!
 * NEXCYRA — Independent Creative Studio
 * Vanilla JS: header scroll state, hero stagger, scroll reveals,
 * IntersectionObserver nav highlighting, mobile menu, accordions.
 */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var motionQuery =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;
  var reducedMotion = motionQuery ? motionQuery.matches : false;

  if (motionQuery) {
    var onMotionChange = function (event) {
      reducedMotion = event.matches;
    };
    if (typeof motionQuery.addEventListener === 'function') {
      motionQuery.addEventListener('change', onMotionChange);
    } else if (typeof motionQuery.addListener === 'function') {
      motionQuery.addListener(onMotionChange); // older Safari
    }
  }

  var SCROLL_THRESHOLD = 100;
  var HERO_STAGGER = 105; // ms between hero elements
  var menuOpen = false;

  /* ------------------------------------------------------------------ *
   * Icons (Lucide, loaded from unpkg)
   * lucide v1 ships `createIcons({ icons })` and throws on a bare call,
   * lucide v0 accepted `createIcons()`. Support both, never explode.
   * ------------------------------------------------------------------ */
  function createIcons() {
    var lucide = window.lucide;
    if (!lucide || typeof lucide.createIcons !== 'function') return;

    try {
      if (lucide.icons && typeof lucide.icons === 'object') {
        lucide.createIcons({ icons: lucide.icons, attrs: { 'stroke-width': 2 } });
      } else {
        lucide.createIcons();
      }
    } catch (error) {
      try {
        lucide.createIcons();
      } catch (fallbackError) {
        /* Icons stay as empty placeholders — layout is unaffected. */
      }
    }
  }
  createIcons();

  /* ------------------------------------------------------------------ *
   * Header: transparent -> bg-[#111213]/90 + backdrop-blur-md past 100px
   * ------------------------------------------------------------------ */
  var header = document.getElementById('site-header');
  var headerTicking = false;

  function paintHeader() {
    headerTicking = false;
    if (!header) return;
    var scrolled = window.scrollY > SCROLL_THRESHOLD || menuOpen;
    header.classList.toggle('bg-[#111213]/90', scrolled);
    header.classList.toggle('backdrop-blur-md', scrolled);
    header.classList.toggle('border-white/15', scrolled);
    header.classList.toggle('shadow-[0_20px_60px_-40px_rgba(0,0,0,0.95)]', scrolled);
    header.classList.toggle('border-transparent', !scrolled);
  }

  function onScroll() {
    if (headerTicking) return;
    headerTicking = true;
    window.requestAnimationFrame(paintHeader);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /* ------------------------------------------------------------------ *
   * Mobile menu: fixed inset-0 z-40, toggles body overflow-hidden
   * ------------------------------------------------------------------ */
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  function setMenu(open) {
    if (!mobileMenu || !menuToggle) return;
    menuOpen = open;

    mobileMenu.classList.toggle('hidden', !open);
    mobileMenu.classList.toggle('flex', open);
    document.body.classList.toggle('overflow-hidden', open);

    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');

    var iconOpen = menuToggle.querySelector('[data-icon="open"]');
    var iconClose = menuToggle.querySelector('[data-icon="close"]');
    if (iconOpen) iconOpen.classList.toggle('hidden', open);
    if (iconClose) iconClose.classList.toggle('hidden', !open);

    if (open) {
      var firstLink = mobileMenu.querySelector('a');
      if (firstLink) firstLink.focus({ preventScroll: true });
    } else {
      menuToggle.focus({ preventScroll: true });
    }
    paintHeader();
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      setMenu(!menuOpen);
    });
  }

  document.querySelectorAll('[data-menu-close]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (menuOpen) setMenu(false);
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menuOpen) setMenu(false);
  });

  window.addEventListener('resize', function () {
    if (menuOpen && window.innerWidth >= 1024) setMenu(false);
  });

  /* ------------------------------------------------------------------ *
   * Hero: translate-y-6 -> 0 / opacity 0 -> 1, 105ms stagger
   * ------------------------------------------------------------------ */
  var heroElements = Array.prototype.slice.call(document.querySelectorAll('[data-hero]'));

  function revealHero() {
    heroElements.forEach(function (element, index) {
      var custom = element.getAttribute('data-hero-delay');
      element.style.transitionDelay = (custom ? parseInt(custom, 10) : index * HERO_STAGGER) + 'ms';
      element.classList.add('is-visible');
    });
  }

  if (reducedMotion || !heroElements.length) {
    heroElements.forEach(function (element) {
      element.classList.add('is-visible');
    });
  } else {
    window.requestAnimationFrame(function () {
      window.setTimeout(revealHero, 90);
    });
  }

  /* ------------------------------------------------------------------ *
   * Scroll reveals: [data-reveal] -> translateY(22px) to 0, opacity 0 to 1
   * ------------------------------------------------------------------ */
  var revealElements = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));

  function showReveal(element) {
    var delay = element.getAttribute('data-reveal-delay');
    if (delay) element.style.transitionDelay = parseInt(delay, 10) + 'ms';
    element.classList.add('is-visible');
  }

  if ('IntersectionObserver' in window && !reducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          showReveal(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(showReveal);
  }

  /* ------------------------------------------------------------------ *
   * Navigation highlighting — rootMargin '-35% 0px -55% 0px'
   * ------------------------------------------------------------------ */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav-link]'));
  var watchedSections = ['home', 'services', 'work', 'process', 'project-index', 'journal', 'contact'];
  var activeId = null;

  function setActiveNav(sectionId) {
    if (sectionId === activeId) return;
    activeId = sectionId;

    navLinks.forEach(function (link) {
      var isActive = link.getAttribute('data-nav-link') === sectionId;
      var bar = link.querySelector('[data-nav-bar]');

      link.classList.toggle('text-[#f4f2ed]', isActive);
      link.classList.toggle('text-white/45', !isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
      if (bar) {
        bar.classList.toggle('scale-x-100', isActive);
        bar.classList.toggle('scale-x-0', !isActive);
      }
    });
  }

  if ('IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );

    watchedSections.forEach(function (id) {
      var section = document.getElementById(id);
      if (section) navObserver.observe(section);
    });
  }

  /* ------------------------------------------------------------------ *
   * Accordions — icon swaps plus <-> minus, panel toggles hidden
   * ------------------------------------------------------------------ */
  function paintAccordionItem(button, isOpen) {
    var item = button.closest('[data-accordion-item]');
    if (!item) return;

    var panel = item.querySelector('[data-accordion-panel]');
    var plus = button.querySelector('[data-icon="plus"]');
    var minus = button.querySelector('[data-icon="minus"]');

    button.setAttribute('aria-expanded', String(isOpen));

    if (panel) {
      panel.classList.toggle('hidden', !isOpen);
      panel.classList.toggle('is-open', isOpen);
    }
    if (plus) plus.classList.toggle('hidden', isOpen);
    if (minus) minus.classList.toggle('hidden', !isOpen);

    item.classList.toggle('is-open', isOpen);
  }

  /* Process: only one open item at a time. */
  var processButtons = Array.prototype.slice.call(document.querySelectorAll('.process-button'));

  processButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var wasOpen = button.getAttribute('aria-expanded') === 'true';
      processButtons.forEach(function (other) {
        paintAccordionItem(other, false);
      });
      if (!wasOpen) paintAccordionItem(button, true);
    });
  });

  /* FAQ: each item toggles independently. */
  document.querySelectorAll('.faq-button').forEach(function (button) {
    button.addEventListener('click', function () {
      var isOpen = button.getAttribute('aria-expanded') === 'true';
      paintAccordionItem(button, !isOpen);
    });
  });

  /* ------------------------------------------------------------------ *
   * Footer year
   * ------------------------------------------------------------------ */
  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  paintHeader();
})();
