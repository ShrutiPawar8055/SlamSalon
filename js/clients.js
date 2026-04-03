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

  if (!modal) return;

  function closeModal() {
    modal.classList.remove('open');
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
})();
