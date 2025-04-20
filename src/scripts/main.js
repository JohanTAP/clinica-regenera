// Archivo principal de JavaScript para Clínica Regenera

// Funcionalidad del menú de navegación
function setupNavbar() {
  const navbarToggler = document.getElementById('navbarToggler');
  const navbarMenu = document.getElementById('navbarMenu');

  if (navbarToggler && navbarMenu) {
    // Asegurarse de que el evento click se maneje correctamente
    navbarToggler.addEventListener('click', function (e) {
      e.preventDefault(); // Prevenir comportamiento por defecto
      navbarMenu.classList.toggle('show');
      console.log('Toggle clicked, menu has class show:', navbarMenu.classList.contains('show')); // Log para depuración
    });

    // Cerrar el menú al hacer click en enlaces
    const navLinks = navbarMenu.querySelectorAll('.navbar__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Solo cerrar en modo móvil (cuando toggler es visible)
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
          navbarMenu.classList.remove('show');
        }
      });
    });

    // Cerrar el menú al hacer click fuera de él
    document.addEventListener('click', function (event) {
      const isClickInsideNavbar = navbarMenu.contains(event.target) || navbarToggler.contains(event.target);
      if (!isClickInsideNavbar && navbarMenu.classList.contains('show')) {
        navbarMenu.classList.remove('show');
      }
    });
  }
}

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
  const scrollContainer = document.querySelector('.scroll-container');

  if (modal && openModalButton) {
    let lastScrollTime = 0;

    const showModal = () => {
      modal.style.display = 'flex';
    };

    const hideModal = () => {
      modal.style.display = 'none';
    };

    openModalButton.addEventListener('click', showModal);

    if (closeModalButton) {
      closeModalButton.addEventListener('click', hideModal);
    }

    if (scrollContainer) {
      // Mostrar modal cuando llegue al final de la página
      const checkScroll = () => {
        const now = Date.now();
        if ((scrollContainer.scrollTop + scrollContainer.clientHeight) >= scrollContainer.scrollHeight && now - lastScrollTime > 2000) {
          showModal();
          lastScrollTime = now;
        }
      };

      scrollContainer.addEventListener('scroll', checkScroll);
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
  console.log('DOM fully loaded, initializing navigation...'); // Log para depuración
  setupNavbar();
  setupSmoothScroll();
  setupModal();
  setupVideoPlayback();
});

// También aseguramos la inicialización para Astro View Transitions
document.addEventListener('astro:page-load', () => {
  console.log('Astro page loaded, initializing navigation...'); // Log para depuración
  setupNavbar();
  setupSmoothScroll();
  setupModal();
  setupVideoPlayback();
});