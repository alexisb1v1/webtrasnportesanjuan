import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

// Configuración de Firebase - Oficial del Proyecto
const firebaseConfig = {
  apiKey: "AIzaSyCVAk8zHCEcT00PiNPsGpCDPOhHA-5kFog",
  storageBucket: "transportesanjuan-263fb.firebasestorage.app",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

document.addEventListener('DOMContentLoaded', () => {
  // 1. CONTROL DE NAVEGACIÓN DRAWER (MÓVIL)
  const menuToggle = document.querySelector('.menu-toggle');
  const closeDrawer = document.getElementById('closeDrawer');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openMenu() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Evita scroll de fondo
  }

  function closeMenu() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Habilita de nuevo el scroll
  }

  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (closeDrawer) closeDrawer.addEventListener('click', closeMenu);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMenu);

  // Cerrar el menú al hacer clic en cualquier enlace interno
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Lógica interactiva del Tab Bar en móviles (Botonera Inferior)
  const tabItems = document.querySelectorAll('.tab-item');
  if (tabItems.length > 0) {
    tabItems.forEach(tab => {
      tab.addEventListener('click', () => {
        tabItems.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });

    // Cambiar tab activo según el scroll en la página (ScrollSpy estético)
    window.addEventListener('scroll', () => {
      let scrollPosition = window.scrollY + 200;
      
      const sections = ['inicio', 'nosotros', 'servicios', 'contacto'];
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            tabItems.forEach(t => {
              t.classList.remove('active');
              if (t.getAttribute('href') === `#${id}`) {
                t.classList.add('active');
              }
            });
          }
        }
      });
    });
  }


  // 2. SIMULACIÓN INTERACTIVA DE FORMULARIO DE CONTACTO
  const contactForm = document.getElementById('contactForm');
  const btnSubmitForm = document.getElementById('btnSubmitForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // UI en estado "Enviando..."
      const btnText = btnSubmitForm.querySelector('.btn-text');
      const btnSpinner = btnSubmitForm.querySelector('.btn-spinner');
      
      btnSubmitForm.disabled = true;
      btnText.style.display = 'none';
      btnSpinner.style.display = 'flex';
      formFeedback.className = 'form-feedback';
      formFeedback.innerText = '';

      // Simular petición AJAX
      setTimeout(() => {
        // UI en estado "Éxito"
        btnSubmitForm.disabled = false;
        btnText.style.display = 'inline';
        btnSpinner.style.display = 'none';

        formFeedback.classList.add('success');
        formFeedback.innerText = '¡Gracias! Tu mensaje ha sido enviado con éxito. Nos comunicaremos contigo pronto.';
        
        // Limpiar campos del formulario
        contactForm.reset();

        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
          formFeedback.style.display = 'none';
          setTimeout(() => {
            formFeedback.className = 'form-feedback';
            formFeedback.innerText = '';
            formFeedback.style.display = '';
          }, 300);
        }, 5000);

      }, 1500);
    });
  }


  // 3. CARGAR GALERÍA DE FIREBASE
  loadGallery();
});

// Referencias DOM para la Galería
const loadingMsg = document.getElementById('gallery-loading');
const albumCarousel = document.getElementById('album-carousel');
const photoContainer = document.getElementById('photo-container');
const photoGrid = document.getElementById('photo-grid');
const currentAlbumTitle = document.getElementById('current-album-title');
const backButton = document.getElementById('back-to-albums');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const closeLightbox = document.getElementById('closeLightboxBtn');

// Control del Lightbox modal
function closeLightboxFunc() {
  lightbox.style.display = "none";
  document.body.style.overflow = ''; // Restaurar scroll
  lightboxVideo.pause();
  lightboxVideo.src = "";
  lightboxVideo.style.display = "none";
  lightboxImg.style.display = "none";
}

if (closeLightbox) {
  closeLightbox.addEventListener('click', closeLightboxFunc);
}

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightboxFunc();
    }
  });
}

if (backButton) {
  backButton.addEventListener('click', () => {
    photoContainer.style.display = 'none';
    backButton.style.display = 'none';
    albumCarousel.style.display = 'flex';
  });
}

// Carga principal de carpetas
async function loadGallery() {
  const listRef = ref(storage, 'Galeria/');

  try {
    const res = await listAll(listRef);

    if (res.prefixes.length === 0) {
      loadingMsg.innerHTML = '<p class="error-msg"><i class="fa-solid fa-folder-open"></i> No se encontraron álbumes multimedia.</p>';
      return;
    }

    loadingMsg.style.display = 'none';
    albumCarousel.style.display = 'flex';
    albumCarousel.innerHTML = '';

    // Generar las tarjetas de álbumes en base a las carpetas en Firebase
    res.prefixes.forEach((folderRef) => {
      const folderName = folderRef.name;

      const albumCard = document.createElement('div');
      albumCard.className = 'album-card';
      albumCard.innerHTML = `
        <div class="album-icon"><i class="fa-solid fa-folder"></i></div>
        <div class="album-title">${folderName}</div>
      `;

      albumCard.addEventListener('click', () => loadAlbumPhotos(folderRef));
      albumCarousel.appendChild(albumCard);
    });

  } catch (error) {
    console.error("Error cargando galería:", error);
    loadingMsg.innerHTML = '<p class="error-msg"><i class="fa-solid fa-circle-exclamation"></i> Error al conectar con la galería. Verifica tu configuración.</p>';
  }
}

// Carga de fotos de la carpeta seleccionada
async function loadAlbumPhotos(folderRef) {
  albumCarousel.style.display = 'none';
  photoContainer.style.display = 'block';
  backButton.style.display = 'inline-flex';
  photoGrid.innerHTML = '<div class="gallery-loading-wrapper"><i class="fa-solid fa-circle-notch fa-spin"></i><p>Obteniendo fotos y videos...</p></div>';
  currentAlbumTitle.innerText = folderRef.name;

  try {
    const res = await listAll(folderRef);
    photoGrid.innerHTML = ''; // Limpiar mensaje de carga

    if (res.items.length === 0) {
      photoGrid.innerHTML = '<div class="gallery-loading-wrapper"><i class="fa-solid fa-folder-open"></i><p>Este álbum no contiene fotos ni videos por el momento.</p></div>';
      return;
    }

    // Iterar y renderizar cada archivo de manera asincrónica
    for (const itemRef of res.items) {
      const url = await getDownloadURL(itemRef);
      const metadata = await getMetadata(itemRef);
      const contentType = metadata.contentType;

      let element;
      let isVideo = contentType && contentType.startsWith('video/');

      if (isVideo) {
        element = document.createElement('video');
        element.src = url;
        element.muted = true;
        element.playsInline = true;
        element.className = 'grid-item video-thumb';
        
        // Reproducción de vista previa al pasar el mouse
        element.addEventListener('mouseover', () => {
          element.play().catch(err => console.log("Autoplay interactivo evitado."));
        });
        element.addEventListener('mouseout', () => {
          element.pause();
          element.currentTime = 0;
        });
      } else {
        element = document.createElement('img');
        element.src = url;
        element.className = 'grid-item';
        element.loading = "lazy";
        element.alt = itemRef.name;
      }

      // Evento de clic para abrir el Lightbox interactivo
      element.addEventListener('click', () => {
        lightbox.style.display = "flex";
        document.body.style.overflow = 'hidden'; // Bloquear scroll de la página

        if (isVideo) {
          lightboxImg.style.display = "none";
          lightboxVideo.style.display = "block";
          lightboxVideo.src = url;
          lightboxVideo.play();
          document.getElementById('caption').innerText = `Video: ${itemRef.name}`;
        } else {
          lightboxVideo.style.display = "none";
          lightboxVideo.pause();
          lightboxImg.style.display = "block";
          lightboxImg.src = url;
          document.getElementById('caption').innerText = itemRef.name;
        }
      });

      photoGrid.appendChild(element);
    }

  } catch (error) {
    console.error("Error cargando fotos del álbum:", error);
    photoGrid.innerHTML = '<div class="gallery-loading-wrapper"><i class="fa-solid fa-circle-xmark"></i><p>Ocurrió un error al cargar las fotos. Por favor reintenta.</p></div>';
  }
}