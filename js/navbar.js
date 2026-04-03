/* ==========================================================================
   SLAM SALON — Navbar Interactions
   ========================================================================== */

(function () {
  'use strict';

  const hamburger = document.getElementById('navbar-hamburger');
  const mobileMenu = document.getElementById('navbar-mobile-menu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
  const navbar = document.querySelector('.navbar');

  // --- Hamburger Toggle ---
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Scroll shadow enhancement & Active link highlighting ---
  if (navbar) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link');

    window.addEventListener('scroll', function () {
      // Shadow
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Active highlighting
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }
})();
