/* ==========================================================================
   SLAM SALON — Video Interactions (Unmute + Modal)
   ========================================================================== */

(function () {
  'use strict';

  
  // UNMUTE / MUTE TOGGLE — works for all .unmute-btn elements

  document.querySelectorAll('.unmute-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var container = btn.closest('.showcase__card-media')
                   || btn.closest('.clients__card-media');
      if (!container) return;
      var video = container.querySelector('video');
      if (!video) return;

      if (video.muted) {
        // Mute all other videos first
        document.querySelectorAll('video').forEach(function (v) { v.muted = true; });
        document.querySelectorAll('.unmute-btn').forEach(function (b) { b.textContent = 'Unmute'; });
        // Unmute this one
        video.muted = false;
        btn.textContent = 'Mute';
      } else {
        video.muted = true;
        btn.textContent = 'Unmute';
      }
    });
  });


  // VIDEO MODAL
 
  var modal = document.getElementById('video-modal');
  var modalClose = document.getElementById('modal-close');
  var modalVideo = modal ? modal.querySelector('.modal__video') : null;

  if (!modal) return;

  // Open modal when clicking a card
  document.querySelectorAll('.showcase__card, .clients__card').forEach(function (card) {
    card.addEventListener('click', function () {
      var video = card.querySelector('video');
      if (video && modalVideo) {
        modalVideo.src = video.src;
        modal.classList.add('open');
        modalVideo.play();
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.src = "";
    }
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  var backdrop = modal.querySelector('.modal__backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.showcase__card, .clients__card, .showcase__header, .contact__grid');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('reveal', 'active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Run once on load

  // --- Booking Form Handling ---
  const bookingForm = document.getElementById('booking-form');
  const successMsg = document.getElementById('form-success');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      
      // Visual feedback
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      // Simulate API call
      setTimeout(() => {
        bookingForm.reset();
        if (successMsg) successMsg.style.display = 'block';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Request Booking';
        }
        
        // Hide success message after 5s
        setTimeout(() => {
          if (successMsg) successMsg.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }
})();
