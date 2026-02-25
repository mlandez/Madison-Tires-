/* ============================================
   MADISON TIRES & WHEELS — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Menu Toggle ----
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  const navCta = document.querySelector('.navbar__cta');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      if (navCta) navCta.classList.toggle('mobile-show');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('open')) {
        icon.setAttribute('data-lucide', 'x'); lucide.createIcons();
      } else {
        icon.setAttribute('data-lucide', 'menu'); lucide.createIcons();
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        if (navCta) navCta.classList.remove('mobile-show');
        const icon = mobileToggle.querySelector('i');
        icon.setAttribute('data-lucide', 'menu'); lucide.createIcons();
      });
    });

    // Close menu when tapping the overlay background
    navLinks.addEventListener('click', (e) => {
      if (e.target === navLinks) {
        navLinks.classList.remove('open');
        if (navCta) navCta.classList.remove('mobile-show');
        const icon = mobileToggle.querySelector('i');
        icon.setAttribute('data-lucide', 'menu'); lucide.createIcons();
      }
    });
  }

  // ---- Scroll Animations (Intersection Observer) ----
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything immediately
    animatedElements.forEach(el => el.classList.add('visible'));
  }

  // ---- Navbar Background on Scroll ----
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.style.background = '#080808';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.6), 0 1px 0 rgba(0,102,255,0.1)';
      } else {
        navbar.style.background = '#0A0A0A';
        navbar.style.boxShadow = 'none';
      }
    });
  }

  // Contact form handling is in contact.html inline script (Google Sheets integration)

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ---- Counter Animation for Stats ----
  const counters = document.querySelectorAll('.trust-bar__value, .stats-bar__value');

  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  function animateCounter(el) {
    const text = el.textContent;
    const match = text.match(/^([\d,]+)/);
    if (!match) return; // Skip non-numeric values like "24/7"

    const target = parseInt(match[1].replace(/,/g, ''));
    if (isNaN(target) || target === 0) return;

    const suffix = text.replace(match[1], '');
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(target * eased);

      el.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  lucide.createIcons();
});
