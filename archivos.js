// ─── Inicialización principal ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

    // ─── Intro del Cohete (4 segundos) ───────────────────────────────────────
    const rocketIntro = document.getElementById('rocketIntro');
    const introFlash  = document.getElementById('introFlash');
    const mainContent = document.getElementById('content');
    const INTRO_MS    = 4000; // duración total del intro
    const FLASH_START = 3400; // cuándo lanza el destello (ms desde inicio)

    if (rocketIntro && mainContent) {
        // Lanzar el destello justo antes de terminar
        setTimeout(() => {
            if (introFlash) introFlash.classList.add('flash-active');
        }, FLASH_START);

        // Fade-out del intro
        setTimeout(() => {
            rocketIntro.classList.add('fade-out');
        }, INTRO_MS - 100);

        // Ocultar el div completamente y revelar el contenido
        setTimeout(() => {
            rocketIntro.classList.add('hidden');
            mainContent.classList.remove('content--hidden');
            mainContent.classList.add('content--visible');

            // Stagger letra por letra en todos los dispositivos
            const letters = document.querySelectorAll('.title-animated .letter');
            letters.forEach((letter, i) => {
                letter.style.animationDelay = `${0.5 + i * 0.06}s`;
            });
        }, INTRO_MS + 500);
    }


    const background = document.getElementById('background-silhouette');
    if (background) {
        document.body.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth  / 2 - e.clientX) / 50;
            const y = (window.innerHeight / 2 - e.clientY) / 50;
            background.style.transform = `translateX(${x}px) translateY(${y}px) scale(1.05)`;
        });
    }

    // ─── Botón de regreso + lightbox de confirmación espacial ────────────────
    const backButton      = document.getElementById('backButton');
    const confirmLightbox = document.getElementById('confirmLightbox');
    const confirmYes      = document.getElementById('confirmYes');
    const confirmNo       = document.getElementById('confirmNo');

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

    if (backButton)      backButton.addEventListener('click', openConfirmLightbox);
    if (confirmNo)       confirmNo.addEventListener('click', closeConfirmLightbox);
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

    // ─── Año actual en el footer ──────────────────────────────────────────────
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ─── Orientación al cargar ────────────────────────────────────────────────
    handleOrientationChange();

    // ─── Botón Cósmico - redirección Archivos de Sozoria ─────────────────────
    const sozoriaBtn = document.getElementById('sozoriaBtn');
    if (sozoriaBtn) {
        sozoriaBtn.addEventListener('click', () => {
            window.location.href = '../secciones/sozoria-archives.html';
        });
    }

    // ─── Botón "Comenzar exploración" → mostrar 4 archivos ───────────────────
    const btnComenzar    = document.getElementById('btnComenzar');
    const introContent   = document.getElementById('content');
    const archivosSection = document.getElementById('archivosSection');

    if (btnComenzar && introContent && archivosSection) {
        btnComenzar.addEventListener('click', () => {
            // 1. Animar salida del intro
            introContent.classList.add('content--exit');

            // 2. Tras la animación de salida, revelar la sección
            setTimeout(() => {
                introContent.style.display = 'none';
                archivosSection.classList.add('archivos--visible');

                // 3. Stagger de cada tarjeta
                const cards = archivosSection.querySelectorAll('.archivo-card');
                cards.forEach((card, i) => {
                    setTimeout(() => {
                        card.classList.add('card--visible');
                    }, 200 + i * 120);
                });
            }, 650);
        });

        // Clic en tarjeta → ir a la página
        archivosSection.querySelectorAll('.archivo-card').forEach(card => {
            card.addEventListener('click', () => {
                const url = card.dataset.url;
                if (url) window.location.href = url;
            });
            // Evitar que el botón interno dispare doble evento
            const btn = card.querySelector('.archivo-btn');
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const url = card.dataset.url;
                    if (url) window.location.href = url;
                });
            }
        });
    }

    // ─── Control de secciones (sólo si existe #main-container) ───────────────
    const container = document.getElementById('main-container');
    if (container) {
        const sections = container.querySelectorAll('section');
        let currentIndex = 0;
        // Aquí va tu lógica de secciones si la necesitas
    }

}); // fin DOMContentLoaded


// ─── Bloqueo de orientación horizontal en móviles ────────────────────────────
function handleOrientationChange() {
    const overlay      = document.getElementById('orientationOverlay');
    const mainContent  = document.querySelector('.main-content');

    if (!overlay) return;

    // Detectar si es móvil y está en horizontal
    const isMobile    = window.innerWidth <= 896;
    const isLandscape = (window.orientation === 90 || window.orientation === -90)
                        || (window.innerWidth > window.innerHeight);

    if (isMobile && isLandscape) {
        overlay.style.display = 'flex';
        if (mainContent) mainContent.style.display = 'none';
    } else {
        overlay.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';
    }
}

// Escuchar cambios de orientación y resize
window.addEventListener('orientationchange', () => setTimeout(handleOrientationChange, 100));
window.addEventListener('resize', handleOrientationChange);
