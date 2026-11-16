/**
 * Frank Abanto — Minimalist Interactivity & Liquid Distortion
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Cargar la hoja de Google Fonts de forma no bloqueante (media="print" -> "all")
  const fontStylesheet = document.getElementById('font-stylesheet');
  if (fontStylesheet) {
    const activateFonts = () => { fontStylesheet.media = 'all'; };
    if (fontStylesheet.sheet) activateFonts();
    else fontStylesheet.addEventListener('load', activateFonts, { once: true });
  }

  // 1. Física interactiva y Spotlight para la Credencial Colgante (ID Badge)
  const badgeAssembly = document.getElementById('badge-assembly');
  const idBadge = document.getElementById('id-badge');
  const badgeGlow = document.getElementById('badge-glow');

  if (badgeAssembly && idBadge && badgeGlow) {
    let mouseX = 0;
    let targetAngle = 0;
    let currentAngle = 0;
    let isInteracting = false;
    let animId = null;

    const updatePhysics = () => {
      // Amortiguación suave del péndulo
      currentAngle += (targetAngle - currentAngle) * 0.12;
      badgeAssembly.style.transform = `rotate(${currentAngle.toFixed(2)}deg)`;

      if (isInteracting || Math.abs(currentAngle - targetAngle) > 0.05) {
        animId = requestAnimationFrame(updatePhysics);
      } else {
        badgeAssembly.style.transform = '';
        badgeAssembly.style.animation = 'badge-idle-sway 6s ease-in-out infinite alternate';
      }
    };

    idBadge.addEventListener('mouseenter', () => {
      isInteracting = true;
      badgeAssembly.style.animation = 'none'; // Pausar idle sway para dar control al cursor
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(updatePhysics);
    });

    idBadge.addEventListener('mousemove', (e) => {
      const rect = idBadge.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;

      // Ángulo de inclinación según posición horizontal del cursor (máx ±9 grados)
      targetAngle = ((x - centerX) / centerX) * 8.5;

      // Mover el foco de iluminación (Spotlight Glow) sobre la credencial
      badgeGlow.style.background = `radial-gradient(circle 240px at ${x}px ${y}px, rgba(59, 130, 246, 0.65), rgba(99, 102, 241, 0.35), transparent 75%)`;
      badgeGlow.style.opacity = '1';
    });

    idBadge.addEventListener('mouseleave', () => {
      isInteracting = false;
      targetAngle = 0;
      badgeGlow.style.background = '';
      badgeGlow.style.opacity = '';
    });
  }

  // 2. Envío de formulario (FormSubmit AJAX)
  const form = document.querySelector('.clean-form');
  const feedback = document.getElementById('form-feedback');

  if (form) {
    const btn = form.querySelector('.btn-submit');
    const btnLabel = btn ? btn.textContent : '';
    const showFeedback = (message, isError) => {
      if (!feedback) return;
      feedback.textContent = message;
      feedback.classList.toggle('is-error', Boolean(isError));
      feedback.classList.remove('none');
      clearTimeout(showFeedback.timer);
      showFeedback.timer = setTimeout(() => feedback.classList.add('none'), 6000);
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Enviando...';
      }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === 'true' || data.success === true) {
            form.reset();
            autoGrow();
            showFeedback('✓ Mensaje recibido. Te responderé a la brevedad.', false);
          } else {
            showFeedback(data.message || 'No se pudo enviar. Escríbeme por WhatsApp.', true);
          }
        })
        .catch(() => {
          showFeedback('Conexión no disponible. Por favor, utiliza el botón de WhatsApp.', true);
        })
        .finally(() => {
          if (btn) {
            btn.disabled = false;
            btn.textContent = btnLabel;
          }
        });
    });
  }

  // 2b. El textarea crece con el texto, sin arrastre manual
  const messageField = document.getElementById('comments');
  const autoGrow = () => {
    if (!messageField) return;
    messageField.style.height = 'auto';
    messageField.style.height = `${messageField.scrollHeight}px`;
  };
  if (messageField) {
    messageField.addEventListener('input', autoGrow);
    autoGrow();
  }

  // 3. Año dinámico en el footer
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 4. Carrusel de proyectos
  // Para agregar un proyecto nuevo basta con añadir un objeto a este array.
  const projects = [
    {
      title: 'Clientes Ops ⚡',
      image: 'assets/projects/clientes-ops.webp',
      alt: 'Clientes Ops',
      tags: ['React', 'TypeScript', 'Supabase', 'Vitest'],
      description:
        'Consola operativa para prospección comercial, cotizaciones interactivas con cálculo automático, contratos con firma digital y compilación a APK Android nativo.',
      url: 'https://clientes-ops.pages.dev',
      repo: 'https://github.com/FrankUsqAbant/clientes-ops',
    },
    {
      title: 'Hostal Aguilar',
      image: 'assets/projects/hostal-aguilar.webp',
      alt: 'Hostal Aguilar',
      tags: ['React 19', 'Tailwind 4', 'Supabase', 'Cloudflare'],
      description:
        "Web con concepto de identidad 'La luz encendida'. Muestra la hora real de Cajamarca con cielo dinámico según el momento del día, selector de habitaciones y panel administrable.",
      url: 'https://hostal-aguilar.pages.dev/',
      repo: 'https://github.com/FrankUsqAbant/hostal-aguilar',
    },
    {
      title: 'Clavez Originals',
      image: 'assets/projects/chavez-originals.webp',
      alt: 'Clavez Originals',
      tags: ['React', 'Tailwind CSS', 'Supabase', 'WhatsApp API'],
      description:
        'Tienda web de calzado deportivo y urbano. Catálogo visual interactivo, filtrado ágil por categorías y generación automática de pedidos estructurados para WhatsApp.',
      url: 'https://chavez-originals.pages.dev/',
    },
    {
      title: 'JIRÉH · Panadería y Pastelería',
      image: 'assets/projects/jireh-pasteleria.webp',
      alt: 'JIRÉH Panadería y Pastelería',
      tags: ['React', 'Vite', 'Tailwind CSS', 'Cloudflare'],
      description:
        'Plataforma web gastronómica con catálogo dinámico de tortas a medida, personalizador interactivo "Arma tu torta" y canal directo de cotizaciones para eventos.',
      url: 'https://jireh-pasteleria.pages.dev/',
    },
  ];

  const track = document.getElementById('projects-track');

  if (track && projects.length) {
    const cardMarkup = (project, index, isClone) => {
      const tab = isClone ? ' tabindex="-1"' : '';
      return `
      <article class="clean-project-card">
        <div class="project-display">
          <img src="${project.image}" alt="${project.alt}" width="1100" height="688" loading="${index < 2 ? 'eager' : 'lazy'}" decoding="async">
          <div class="project-overlay-link" aria-hidden="true">
            <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="overlay-button" tabindex="-1">
              Abrir Proyecto ↗
            </a>
          </div>
        </div>
        <div class="project-details">
          <div class="project-tags">
            ${project.tags.map((tag) => `<span>${tag}</span>`).join('')}
          </div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-info">${project.description}</p>
          <div class="project-links-row">
            <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="link-live"${tab}>Visitar sitio web ↗</a>
            ${
              project.repo
                ? `<a href="${project.repo}" target="_blank" rel="noopener noreferrer" class="link-code"${tab}>Código en GitHub</a>`
                : ''
            }
          </div>
        </div>
      </article>
    `;
    };

    const carousel = track.closest('.projects-carousel');
    const toggleBtn = document.getElementById('projects-toggle');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderSet = (isClone) => projects.map((project, index) => cardMarkup(project, index, isClone)).join('');

    if (reduceMotion) {
      // Sin animación: el carrusel queda como tira desplazable
      track.innerHTML = renderSet(false);
      if (carousel) carousel.classList.add('is-static');
      if (toggleBtn) toggleBtn.hidden = true;
      return;
    }

    // Se duplica la lista para que el bucle sea continuo y sin saltos
    track.innerHTML = renderSet(false) + renderSet(true);
    Array.from(track.children)
      .slice(projects.length)
      .forEach((clone) => clone.setAttribute('aria-hidden', 'true'));

    const GAP = 24; // 1.5rem, debe coincidir con el gap del CSS
    const SPEED = 30; // píxeles por segundo: lento y constante

    const setDuration = () => {
      const width = track.getBoundingClientRect().width;
      if (!width) return;
      const distance = width / 2 + GAP / 2;
      track.style.setProperty('--marquee-duration', `${(distance / SPEED).toFixed(1)}s`);
    };

    let userPaused = false;
    let hoverPaused = false;
    let offscreen = false;

    const applyState = () => {
      const paused = userPaused || hoverPaused || offscreen || document.hidden;
      track.classList.toggle('is-paused', paused);
      if (toggleBtn) {
        toggleBtn.textContent = userPaused ? 'Reanudar' : 'Pausar';
        toggleBtn.setAttribute('aria-pressed', String(userPaused));
      }
    };

    setDuration();
    track.classList.add('is-animated');
    applyState();

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        userPaused = !userPaused;
        applyState();
      });
    }

    if (carousel) {
      carousel.addEventListener('mouseenter', () => {
        hoverPaused = true;
        applyState();
      });
      carousel.addEventListener('mouseleave', () => {
        hoverPaused = false;
        applyState();
      });
      carousel.addEventListener('focusin', () => {
        hoverPaused = true;
        applyState();
      });
      carousel.addEventListener('focusout', () => {
        hoverPaused = false;
        applyState();
      });
    }

    document.addEventListener('visibilitychange', applyState);

    // Detiene la animación cuando la sección no está a la vista
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(
        ([entry]) => {
          offscreen = !entry.isIntersecting;
          applyState();
        },
        { threshold: 0 }
      ).observe(track);
    }

    let resizeFrame = null;
    window.addEventListener('resize', () => {
      if (resizeFrame) return;
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = null;
        setDuration();
      });
    });
  }
});
