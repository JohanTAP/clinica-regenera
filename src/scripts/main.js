// Archivo principal de JavaScript para Clínica Regenera

// Variable global para rastrear cuándo se cargó la página
let pageLoadTime = Date.now();

// ⚠️ La funcionalidad del menú de navegación ahora está implementada directamente en Navbar.astro
// para evitar conflictos de manejadores de eventos

// Funcionalidad de desplazamiento suave
function setupSmoothScroll() {
  const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');
  const scrollContainer = document.querySelector('.scroll-container');

  if (scrollContainer) {
    smoothScrollLinks.forEach(link => {
      const href = link.getAttribute('href');

      // Solo prevenir el comportamiento por defecto para enlaces internos que usan #
      if (href && href.startsWith("#")) {
        link.addEventListener('click', function (event) {
          event.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            scrollContainer.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
            });
          }
        });
      }
    });
  }
}

// Funcionalidad del modal
function setupModal() {
  const openModalButton = document.getElementById('openModalButton');
  const modal = document.getElementById('modal');
  const closeModalButton = document.getElementById('closeModal');
  const modalContent = modal?.querySelector('.modal__content');
  const footer = document.querySelector('.container-fluid.bg-footer');

  if (modal && openModalButton) {
    let lastModalTime = 0;

    const showModal = () => {
      modal.style.display = 'flex';
      modal.setAttribute('aria-modal', 'true');
      // Eliminamos el focus en la X
    };

    const hideModal = () => {
      modal.style.display = 'none';
      modal.setAttribute('aria-modal', 'false');
      // Eliminamos el retorno del foco que causaba el desplazamiento
    };

    openModalButton.addEventListener('click', showModal);

    if (closeModalButton) {
      closeModalButton.addEventListener('click', hideModal);

      // Añadir soporte para cerrar con tecla ESC
      modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          hideModal();
        }
      });

      // Añadir soporte para cerrar haciendo clic fuera del modal
      modal.addEventListener('click', (e) => {
        // Si el clic fue directamente en el fondo del modal (no en su contenido)
        if (e.target === modal && modalContent && !modalContent.contains(e.target)) {
          hideModal();
        }
      });
    }

    // Detectar cuando el footer está visible
    if (footer) {
      const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const now = Date.now();
          // Si el footer es visible y ha pasado tiempo suficiente
          if (entry.isIntersecting && now - lastModalTime > 2000 && now - pageLoadTime > 1500) {
            showModal();
            lastModalTime = now;
          }
        });
      }, {
        threshold: 0.2
      });

      // Empezar a observar el footer
      footerObserver.observe(footer);
    }
  }
}

// Funcionalidad de reproducción de videos
function setupVideoPlayback() {
  const videoContainers = document.querySelectorAll('.carousel__video');

  videoContainers.forEach(container => {
    const playButton = container.querySelector('.carousel__play-button');
    const video = container.querySelector('video');
    const thumbnail = container.querySelector('img');

    if (playButton && video && thumbnail) {
      playButton.addEventListener('click', function () {
        // Ocultar la imagen de fondo y el botón
        thumbnail.classList.add('hidden');
        playButton.classList.add('hidden');

        // Mostrar y reproducir el video
        video.classList.remove('hidden');
        video.play();
      });
    }
  });
}

// Inicializar todas las funcionalidades cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  // setupNavbar(); // Comentado para evitar conflictos con Navbar.astro
  setupSmoothScroll();
  setupModal();
  setupVideoPlayback();
});

// También aseguramos la inicialización para Astro View Transitions
document.addEventListener('astro:page-load', () => {
  // setupNavbar(); // Comentado para evitar conflictos con Navbar.astro
  setupSmoothScroll();
  setupModal();
  setupVideoPlayback();

  // Actualizar la variable pageLoadTime para el nuevo estado de la página
  pageLoadTime = Date.now();
});