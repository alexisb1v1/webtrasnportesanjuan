# Transportes San Juan S.R.L. - Landing Page

Landing page oficial de **Transportes San Juan S.R.L.**, empresa con más de 30 años de trayectoria líder en movilidad y seguridad en Pucallpa (Ucayali). Este sitio está diseñado para proporcionar información sobre la empresa, misión, visión, sus servicios de transporte urbano e interurbano, rutas en tiempo real y una galería dinámica de imágenes y videos integrada con Firebase Storage.

---

## 🚀 Características
- **Diseño Premium y Responsive**: Adaptado para una visualización óptima en ordenadores, tabletas y dispositivos móviles.
- **Navegación Móvil**: Menú lateral (Drawer) interactivo y barra de navegación inferior optimizada para móviles.
- **Galería Dinámica**: Carrusel de álbumes y visualización interactiva de contenido multimedia (fotos y videos) consumidos directamente desde **Firebase Storage**.
- **Visualizador Lightbox**: Modal para expandir imágenes y videos de la galería con soporte interactivo.
- **Mapa de Rutas**: Mapa integrado para visualizar rutas autorizadas en la ciudad de Pucallpa.
- **Formulario de Contacto**: Formulario adaptivo para la recepción de consultas, sugerencias y reclamos.

---

## 🛠️ Tecnologías Utilizadas
- **HTML5** & **CSS3** (Estilos a medida, animaciones suaves y variables CSS)
- **Vanilla JavaScript** (Lógica interactiva nativa)
- **Firebase SDK 9 (Web)** (Módulo Firebase Storage para la carga dinámica de galerías)
- **FontAwesome 6** (Iconografía de alta calidad)
- **Google Fonts** (Fuentes tipográficas Montserrat e Inter)

---

## 🔧 Configuración para Desarrollo Local

Dado que el proyecto utiliza el SDK de Firebase para poblar la galería multimedia, se requiere configurar las credenciales locales de la base de datos de almacenamiento.

### 1. Requisitos de Configuración
Para evitar subir claves de API sensibles al repositorio de GitHub, la configuración de Firebase está separada del archivo principal. Sigue estos pasos para configurarlo localmente:

1. En la raíz del proyecto, localiza el archivo `firebase-config.example.js`.
2. Crea una copia de este archivo y renombrala a `firebase-config.js` (este archivo está configurado en `.gitignore` para que Git lo ignore automáticamente).
3. Abre `firebase-config.js` y coloca tus credenciales del proyecto de Firebase:
   ```javascript
   window.firebaseConfig = {
     apiKey: "TU_API_KEY_DE_FIREBASE",
     storageBucket: "TU_STORAGE_BUCKET_DE_FIREBASE.appspot.com",
   };
   ```

### 2. Ejecutar el Proyecto
Puedes ejecutar el proyecto de dos formas:

- **Doble Clic Directo**: Puedes abrir el archivo `index.html` directamente en tu navegador preferido. Gracias al uso de variables globales (`window.firebaseConfig`), el sitio cargará Firebase y todas las imágenes sin lanzar errores de CORS bajo el protocolo `file://`.
- **Servidor Local**: Si utilizas un servidor de desarrollo como *Live Server* en VS Code, puedes levantarlo en `http://localhost:5500` o similar.

> [!NOTE]
> Recuerda configurar las restricciones de dominio de tu API Key en la consola de Google Cloud/Firebase para permitir peticiones tanto desde tus entornos de desarrollo (`localhost`, `127.0.0.1`, `file://`) como desde tu dominio de producción.

---

## 📁 Estructura del Proyecto

```text
├── content/                     # Recursos visuales (Logos, imágenes estáticas)
├── diseño/                      # Documentación del diseño e interfaces
├── .gitignore                   # Archivos excluidos del control de versiones
├── cors.json                    # Configuración de CORS para Firebase Storage
├── firebase-config.js           # Configuración privada de Firebase (Ignorado por Git)
├── firebase-config.example.js   # Plantilla de ejemplo para Firebase
├── gallery.css                  # Estilos correspondientes a la Galería
├── index.html                   # Estructura principal del sitio
├── README.md                    # Documentación del proyecto (Este archivo)
├── script.js                    # Lógica interactiva y conexión a Firebase
└── styles.css                   # Estilos principales de la Landing Page
```
