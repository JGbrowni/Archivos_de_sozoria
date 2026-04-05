// ============================================================
//  ilustraciones.js — Plantilla galerías Sozoria
//  Basado en ilustraciones.js original + lógica de ilustracion.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ─── Año actual en el footer ───────────────────────────────
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─── Menú hamburguesa ─────────────────────────────────────
  const menuToggle  = document.getElementById('menuToggle');
  const menuOverlay = document.getElementById('menuOverlay');
  const sideMenu    = document.getElementById('sideMenu');

  if (menuToggle && menuOverlay && sideMenu) {

    function openMenu() {
      menuToggle.classList.add('active');
      menuOverlay.classList.add('active');
      sideMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      menuToggle.classList.remove('active');
      menuOverlay.classList.remove('active');
      sideMenu.classList.remove('active');
      document.body.style.overflow = '';
    }

    function toggleMenu() {
      sideMenu.classList.contains('active') ? closeMenu() : openMenu();
    }

    menuToggle.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sideMenu.classList.contains('active')) closeMenu();
    });

    // Cerrar al hacer clic en un enlace del menú
    sideMenu.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const href = item.getAttribute('href');
        if (!href || href === '#') return;
        closeMenu();
      });
    });
  }

  // ─── Botón "Inicio de página" (#backToTop si existe) ───────
  // También funciona por el href="#top" del anchor en el HTML
  const backToTop = document.getElementById('menuHome');
  if (backToTop) {
    const href = backToTop.getAttribute('href');
    // Si el href es el placeholder, solo sube al top de la página
    if (!href || href === 'COLOCA-AQUI-TU-URL-DE-INICIO') {
      backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Cerrar el menú
        const sideMenuRef = document.getElementById('sideMenu');
        const menuToggleRef = document.getElementById('menuToggle');
        const menuOverlayRef = document.getElementById('menuOverlay');
        if (sideMenuRef) sideMenuRef.classList.remove('active');
        if (menuToggleRef) menuToggleRef.classList.remove('active');
        if (menuOverlayRef) menuOverlayRef.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }

  // ─── Lightbox de confirmación para regresar a Sozoria ─────
  const regresarSozoria = document.getElementById('regresarSozoria');
  const confirmLightbox = document.getElementById('confirmLightbox');
  const confirmYes = document.getElementById('confirmYes');
  const confirmNo = document.getElementById('confirmNo');

  function openConfirmLightbox() {
    if (!confirmLightbox) return;
    confirmLightbox.classList.add('active');
    confirmLightbox.setAttribute('aria-hidden', 'false');
  }

  function closeConfirmLightbox() {
    if (!confirmLightbox) return;
    confirmLightbox.classList.remove('active');
    confirmLightbox.setAttribute('aria-hidden', 'true');
  }

  if (regresarSozoria) {
    regresarSozoria.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu(); // cerrar el menú
      openConfirmLightbox();
    });
  }

  if (confirmNo) confirmNo.addEventListener('click', closeConfirmLightbox);
  if (confirmLightbox) {
    confirmLightbox.addEventListener('click', (e) => {
      if (e.target === confirmLightbox) closeConfirmLightbox();
    });
  }
  if (confirmYes) {
    confirmYes.addEventListener('click', () => {
      window.location.href = 'https://sozoria.netlify.app/';
    });
  }

  // ─── Orientación al cargar ────────────────────────────────
  handleOrientationChange();

}); // fin DOMContentLoaded


// ─── Detección y bloqueo de orientación horizontal en móviles
function handleOrientationChange() {
  const overlay     = document.getElementById('orientationOverlay');
  const mainContent = document.querySelector('.main-content');

  if (!overlay) return;

  const isMobile    = window.innerWidth <= 896;
  // Usar window.screen.orientation si está disponible, o el ancho vs alto como fallback
  const isLandscape = (typeof window.orientation !== 'undefined')
    ? (window.orientation === 90 || window.orientation === -90)
    : (window.innerWidth > window.innerHeight);

  if (isMobile && isLandscape) {
    overlay.style.display = 'flex';
    if (mainContent) mainContent.style.display = 'none';
    document.body.style.overflow = 'hidden';
  } else {
    overlay.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
    document.body.style.overflow = '';
  }
}

window.addEventListener('orientationchange', () => setTimeout(handleOrientationChange, 100));
window.addEventListener('resize', handleOrientationChange);
