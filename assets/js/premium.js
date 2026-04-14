/* ============================================================
   PREMIUM.JS — Daniel Toledo Portfolio
   ============================================================ */

(function () {
  'use strict';

  /* ── Navbar scroll ── */
  const nav = document.getElementById('nav');
  let lastY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 50);
    lastY = y;
  }, { passive: true });

  /* ── Mobile menu ── */
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -56px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Staggered siblings ── */
  function stagger(selector, baseDelay, step) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.transitionDelay = `${baseDelay + i * step}ms`;
    });
  }

  stagger('.stack-cat',      0,   90);
  stagger('.project-card',   0,  110);
  stagger('.service-card',   0,   90);
  stagger('.about__pill',    0,   70);

  /* ── Active nav link on scroll ── */
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__link');

  if ('IntersectionObserver' in window && navAnchors.length) {
    const sectionIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.classList.remove('active'));
          const target = document.querySelector(
            `.nav__link[href="#${entry.target.id}"]`
          );
          if (target) target.classList.add('active');
        }
      });
    }, { threshold: 0.45 });

    sections.forEach(s => sectionIO.observe(s));
  }

  /* ── Mouse parallax on hero orbs (desktop only) ── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const orbs = document.querySelectorAll('.hero__orb');

    let raf;
    let tx = 0, ty = 0;

    window.addEventListener('mousemove', e => {
      tx = (e.clientX / window.innerWidth  - 0.5) * 28;
      ty = (e.clientY / window.innerHeight - 0.5) * 28;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        orbs.forEach((orb, i) => {
          const f = i === 0 ? 1 : i === 1 ? -0.65 : 0.45;
          orb.style.transform = `translate(${tx * f}px, ${ty * f}px)`;
        });
      });
    }, { passive: true });
  }

  /* ── Cursor glow (desktop only) ── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.setAttribute('aria-hidden', 'true');
    Object.assign(glow.style, {
      position:     'fixed',
      pointerEvents:'none',
      zIndex:       '9999',
      width:        '380px',
      height:       '380px',
      borderRadius: '50%',
      background:   'radial-gradient(circle, rgba(99,102,241,0.07), transparent 70%)',
      transform:    'translate(-50%, -50%)',
      top:          '0',
      left:         '0',
      transition:   'opacity 0.4s ease',
      willChange:   'left, top',
    });
    document.body.appendChild(glow);

    let cx = -999, cy = -999;
    let glowRaf;

    window.addEventListener('mousemove', e => {
      cx = e.clientX;
      cy = e.clientY;
      cancelAnimationFrame(glowRaf);
      glowRaf = requestAnimationFrame(() => {
        glow.style.left = cx + 'px';
        glow.style.top  = cy + 'px';
      });
    }, { passive: true });

    document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
  }

  /* ── Smooth scroll polyfill for older Safari ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

})();
