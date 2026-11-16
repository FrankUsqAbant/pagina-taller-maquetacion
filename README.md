<div align="center">

# Frank Abanto — Portafolio Frontend

**Diseño interfaces que combinan precisión técnica y estética contemporánea.**

[![Sitio en vivo](https://img.shields.io/badge/🌐_Ver_sitio_en_vivo-3b82f6?style=for-the-badge)](https://frankusqabant.github.io/pagina-taller-maquetacion/portafolio-cv/)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-22c55e?style=for-the-badge)](LICENSE)

<a href="https://frankusqabant.github.io/pagina-taller-maquetacion/portafolio-cv/">
  <img src="docs/hero.png" alt="Hero del portafolio de Frank Abanto — Frontend Developer" width="100%">
</a>

</div>

## Sobre el proyecto

Portafolio personal en **HTML, CSS y JavaScript vanilla** — sin frameworks, sin build step, sin dependencias. La pieza central del hero es una credencial colgante con física de péndulo que sigue al cursor.

## Características

- **Credencial interactiva** — se inclina siguiendo el cursor, con spotlight dinámico
- **Carrusel continuo** — desplazamiento infinito a 30 px/s, con pausa al pasar el cursor, al enfocar con teclado, fuera de pantalla y al cambiar de pestaña
- **Accesibilidad** — foco visible, `aria-*` correctos, navegación por teclado, landmarks semánticos
- **`prefers-reduced-motion`** — desactiva animaciones y convierte el carrusel en tira desplazable
- **Rendimiento** — 247 KB totales, CLS 0, FCP ~200 ms
- **Responsive** — verificado de 320 px a 1920 px sin desbordes

## Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white)

## Agregar un proyecto

Los proyectos viven en un array en `portafolio-cv/script.js`. Basta con añadir un objeto — el carrusel se reconstruye solo:

```js
{
  title: 'Nombre del proyecto',
  image: 'assets/projects/mi-proyecto.webp',
  alt: 'Descripción de la imagen',
  tags: ['React', 'Tailwind CSS'],
  description: 'Una línea explicando qué hace y por qué importa.',
  url: 'https://mi-proyecto.pages.dev',
  repo: 'https://github.com/FrankUsqAbant/mi-proyecto', // opcional
}
```

## Contacto

[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/51975713580)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/frankabanto/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/FrankUsqAbant)

## Licencia

Distribuido bajo la licencia **MIT**. Consulta [LICENSE](LICENSE) para más detalles.

---

<div align="center">
<sub>© 2026 Frank Abanto · Frontend Developer · Cajamarca, PE</sub>
</div>
