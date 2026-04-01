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

  // --- Scroll shadow enhancement ---
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }
})();
