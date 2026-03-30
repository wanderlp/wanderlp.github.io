/* ============================================================
   script.js — Wanderson López · @wanderlp
   Lightbox y utilidades de interacción
   ============================================================ */

(function () {
  'use strict';

  /* ---- Lightbox ---- */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBack  = document.getElementById('lightboxBackdrop');

  // Abre el lightbox con la imagen correspondiente
  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  // Cierra el lightbox
  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    lightboxImg.src = '';
    lightboxImg.alt = '';
    document.body.style.overflow = '';
  }

  // Delegar clicks en los botones de la galería
  document.querySelectorAll('.photo-grid-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Usa la imagen real (assets/) si existe; si no, usa el placeholder del <img>
      var realSrc = btn.getAttribute('data-src');
      var alt     = btn.getAttribute('data-alt') || '';
      var imgEl   = btn.querySelector('.gallery-img');

      // Intenta cargar la imagen real; si falla, usa el placeholder visible
      var testImg = new Image();
      testImg.onload  = function () { openLightbox(realSrc, alt); };
      testImg.onerror = function () { openLightbox(imgEl.src, alt); };
      testImg.src = realSrc;
    });
  });

  // Cierra con el botón X
  lightboxClose.addEventListener('click', closeLightbox);

  // Cierra al hacer click en el backdrop
  lightboxBack.addEventListener('click', closeLightbox);

  // Cierra con la tecla Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hasAttribute('hidden')) {
      closeLightbox();
    }
  });

})();
