const APP_VERSION = "v0.2.0";
const APP_BUILD_DATE = "2026-06-25";
const GAS_ENDPOINT = "";
const LOCAL_DATA_URL = "data/book.json";

const STORAGE_KEYS = {
  viewScale: "carlitos:viewScale",
  mission: "carlitos:mission",
};

const VIEW_SCALES = ["normal", "comfort", "large"];

const DEFAULT_MISSIONS = [
  {
    id: "separar",
    title: "Separar",
    tagline: "Ordenar para descubrir valor.",
    description: "Carlitos empieza mirando que materiales hay y donde debe ir cada uno.",
    orden: 4,
  },
  {
    id: "medir",
    title: "Medir",
    tagline: "Contar para tomar mejores decisiones.",
    description: "La clase pesa, anota y compara lo que recupera semana a semana.",
    orden: 6,
  },
  {
    id: "transformar",
    title: "Transformar",
    tagline: "Convertir residuos en vida nueva.",
    description: "Las cascaras y hojas secas se vuelven compost para la huerta escolar.",
    orden: 5,
  },
  {
    id: "emprender",
    title: "Emprender",
    tagline: "Crear oportunidades verdes.",
    description: "Los datos ayudan a imaginar ferias, servicios y pequenos proyectos sostenibles.",
    orden: 7,
  },
];

const app = document.querySelector("#app");

const state = {
  book: null,
  selectedOrden: null,
  selectedMission: readStorage(STORAGE_KEYS.mission, DEFAULT_MISSIONS[0].id),
  viewScale: normalizeViewScale(readStorage(STORAGE_KEYS.viewScale, "normal")),
};

document.documentElement.dataset.viewScale = state.viewScale;

loadBook();

async function loadBook(forceLocal = false) {
  app.innerHTML = `<main class="loading-view"><span class="loading-mark"></span><p>Cargando libro...</p></main>`;

  try {
    const payload = forceLocal || !GAS_ENDPOINT
      ? await fetchLocalBook()
      : await fetchGasBook(GAS_ENDPOINT);

    state.book = normalizeBook(payload);
    state.selectedOrden = firstContentItem(state.book).orden;
    state.selectedMission = normalizeMissionId(state.selectedMission, getMissions(state.book));
    renderApp();
  } catch (error) {
    app.innerHTML = `
      <main class="error-view">
        <strong>No se pudo cargar la appweb.</strong>
        <p>${escapeHtml(error.message || "Error desconocido")}</p>
      </main>
    `;
  }
}

async function fetchLocalBook() {
  const response = await fetch(LOCAL_DATA_URL, { cache: "no-store" });
  if (!response.ok) throw new Error(`No se pudo leer ${LOCAL_DATA_URL}`);
  return response.json();
}

function fetchGasBook(endpoint) {
  return new Promise((resolve, reject) => {
    const callbackName = `carlitosBook_${Date.now()}`;
    const script = document.createElement("script");
    const separator = endpoint.includes("?") ? "&" : "?";

    window[callbackName] = (payload) => {
      cleanup();
      if (!payload || payload.ok === false) {
        reject(new Error(payload && payload.error ? payload.error : "Respuesta GAS invalida"));
        return;
      }
      resolve(payload);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("No se pudo conectar con el endpoint GAS"));
    };

    script.src = `${endpoint}${separator}callback=${encodeURIComponent(callbackName)}`;
    document.body.appendChild(script);

    function cleanup() {
      delete window[callbackName];
      script.remove();
    }
  });
}

function normalizeBook(raw) {
  const items = (Array.isArray(raw.items) ? raw.items : [])
    .map((item, index) => ({
      orden: Number(item.orden || index + 1),
      tipo: item.tipo || "capitulo",
      titulo: item.titulo || `Seccion ${index + 1}`,
      subtitulo: item.subtitulo || "",
      contenido: item.contenido || "",
      actividad: item.actividad || "",
      indicador: item.indicador || "",
      asset: item.asset || "",
      estado: item.estado || "borrador",
    }))
    .sort((a, b) => a.orden - b.orden);

  return {
    title: raw.title || "Carlitos y los residuos que se convierten en oportunidad",
    subtitle: raw.subtitle || "",
    heroImage: raw.heroImage || getAssetByType(items, "portada"),
    characterSheet: raw.characterSheet || getAssetByType(items, "personaje"),
    closingImage: raw.closingImage || getAssetByType(items, "cierre"),
    sourceLabel: raw.sourceLabel || "Datos locales",
    rightsNote: raw.rightsNote || "",
    summary: raw.summary || {},
    metrics: Array.isArray(raw.metrics) ? raw.metrics : [],
    missions: Array.isArray(raw.missions) ? raw.missions : DEFAULT_MISSIONS,
    items,
  };
}

function renderApp() {
  const book = state.book;
  const selected = selectedItem();
  const chapters = book.items.filter((item) => item.tipo !== "portada");
  const missions = getMissions(book);
  const activeMission = missions.find((mission) => mission.id === state.selectedMission) || missions[0];

  app.innerHTML = `
    <header class="hero" style="--hero-image: url('${escapeAttribute(book.heroImage)}')">
      <div class="hero-ambient" aria-hidden="true">
        ${renderFloatingBits()}
      </div>
      <nav class="topnav" aria-label="Navegacion principal">
        <a class="brand" href="#inicio" aria-label="Ir al inicio">Carlitos DES</a>
        <div class="topnav-actions">
          ${renderViewControl()}
          <button type="button" class="nav-button" id="reloadBtn">Actualizar</button>
        </div>
      </nav>
      <section class="hero-copy" id="inicio">
        <p class="eyebrow">Appweb educativa</p>
        <h1>${escapeHtml(book.title)}</h1>
        <p>${escapeHtml(book.subtitle)}</p>
        <div class="hero-actions">
          <a href="#misiones" class="primary-action">Empezar mision</a>
          <a href="#recorrido" class="secondary-action">Explorar escenas</a>
        </div>
        <div class="story-rail" aria-label="Ruta de aprendizaje">
          <span>Separar</span>
          <span>Medir</span>
          <span>Transformar</span>
          <span>Emprender</span>
        </div>
      </section>
    </header>

    <main>
      <section class="intro-band" aria-label="Resumen del proyecto">
        ${renderSummary(book)}
      </section>

      <section class="metrics-band" aria-label="Indicadores del prototipo">
        ${renderMetrics(book.metrics)}
      </section>

      <section class="mission-band" id="misiones">
        ${renderMissionBand(missions, activeMission)}
      </section>

      <section class="content-band" id="recorrido">
        <div class="section-heading" data-reveal>
          <p class="eyebrow">Recorrido visual</p>
          <h2>Del residuo mezclado a la oportunidad verde</h2>
          <p>Cada escena muestra una decision concreta para cuidar el ambiente y crear aprendizaje comunitario.</p>
        </div>
        <div class="chapter-grid">
          ${chapters.map((item, index) => renderChapterCard(item, index)).join("")}
        </div>
      </section>

      <section class="detail-band" id="detalle">
        ${renderDetail(selected)}
      </section>

      <section class="closing-band" style="--closing-image: url('${escapeAttribute(book.closingImage)}')">
        <div class="closing-copy" data-reveal>
          <p class="eyebrow">Cierre comunitario</p>
          <h2>La feria de las segundas vidas</h2>
          <p>El prototipo muestra como una escuela o comunidad puede pasar de separar residuos a presentar resultados, evidencias e ideas de emprendimiento verde.</p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <span>${escapeHtml(book.sourceLabel)}</span>
      <span class="version-pill">${APP_VERSION} · ${APP_BUILD_DATE}</span>
      <span>${escapeHtml(book.rightsNote)}</span>
    </footer>
  `;

  bindEvents();
  initMotion();
}

function bindEvents() {
  document.querySelector("#reloadBtn").addEventListener("click", () => loadBook(true));

  document.querySelectorAll("[data-orden]").forEach((button) => {
    button.addEventListener("click", () => {
      selectChapter(Number(button.dataset.orden), true);
    });
  });

  document.querySelectorAll("[data-mission]").forEach((button) => {
    button.addEventListener("click", () => {
      const missions = getMissions(state.book);
      const mission = missions.find((entry) => entry.id === button.dataset.mission);
      if (!mission) return;
      state.selectedMission = mission.id;
      writeStorage(STORAGE_KEYS.mission, mission.id);
      state.selectedOrden = mission.orden || state.selectedOrden;
      renderApp();
      document.querySelector("#misiones").scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    });
  });

  document.querySelectorAll("[data-view-scale]").forEach((button) => {
    button.addEventListener("click", () => {
      state.viewScale = normalizeViewScale(button.dataset.viewScale);
      document.documentElement.dataset.viewScale = state.viewScale;
      writeStorage(STORAGE_KEYS.viewScale, state.viewScale);
      updateViewScaleButtons();
    });
  });
}

function initMotion() {
  updateViewScaleButtons();
  revealOnScroll();
  animateMetrics();
  initImageParallax();
}

function selectChapter(orden, shouldScroll) {
  state.selectedOrden = orden;
  renderApp();
  if (!shouldScroll) return;
  document.querySelector("#detalle").scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

function renderViewControl() {
  const options = [
    ["normal", "Normal"],
    ["comfort", "Comoda"],
    ["large", "Grande"],
  ];

  return `
    <div class="view-control" aria-label="Modo de lectura">
      <span>Vista</span>
      ${options.map(([value, label]) => `
        <button type="button" data-view-scale="${value}" aria-pressed="${value === state.viewScale}">
          ${escapeHtml(label)}
        </button>
      `).join("")}
    </div>
  `;
}

function renderFloatingBits() {
  const bits = [
    ["leaf", 6, 14, 26, 0],
    ["paper", 22, 10, 18, 1],
    ["seed", 80, 18, 16, 2],
    ["leaf", 70, 64, 30, 3],
    ["paper", 42, 78, 20, 4],
    ["seed", 12, 70, 14, 5],
  ];

  return bits.map(([type, left, top, size, delay]) => `
    <span class="float-bit ${type}" style="--x:${left}%; --y:${top}%; --size:${size}px; --delay:${delay}s"></span>
  `).join("");
}

function renderSummary(book) {
  const entries = [
    ["Publico", book.summary.audience || "Escuelas, familias y comunidades."],
    ["Proposito", book.summary.purpose || "Aprender a separar y valorizar residuos."],
    ["Metodo", book.summary.method || "Observar, separar, registrar y medir."],
  ];

  return entries.map(([label, value], index) => `
    <article class="summary-item" data-reveal style="--reveal-delay:${index * 90}ms">
      <h2>${escapeHtml(label)}</h2>
      <p>${escapeHtml(value)}</p>
    </article>
  `).join("");
}

function renderMetrics(metrics) {
  if (!metrics.length) return "";
  return metrics.map((metric, index) => {
    const count = metricNumber(metric.value);
    const countAttr = count === null ? "" : ` data-count="${count}"`;
    return `
      <article class="metric" data-reveal style="--reveal-delay:${index * 90}ms">
        <strong${countAttr}>${escapeHtml(metric.value)}</strong>
        <span>${escapeHtml(metric.label)}</span>
      </article>
    `;
  }).join("");
}

function renderMissionBand(missions, activeMission) {
  return `
    <div class="mission-copy" data-reveal>
      <p class="eyebrow">Misiones verdes</p>
      <h2>${escapeHtml(activeMission.title)} con Carlitos</h2>
      <p>${escapeHtml(activeMission.description)}</p>
      <span class="mission-tagline">${escapeHtml(activeMission.tagline)}</span>
    </div>
    <div class="mission-actions" aria-label="Seleccionar mision verde">
      ${missions.map((mission, index) => `
        <button
          type="button"
          class="mission-button${mission.id === activeMission.id ? " active" : ""}"
          data-mission="${escapeAttribute(mission.id)}"
          style="--reveal-delay:${index * 80}ms"
        >
          <span>${escapeHtml(mission.title)}</span>
          <small>${escapeHtml(mission.tagline)}</small>
        </button>
      `).join("")}
    </div>
  `;
}

function renderChapterCard(item, index) {
  const active = item.orden === state.selectedOrden ? " active" : "";
  return `
    <article class="chapter-card${active}" data-reveal style="--reveal-delay:${index * 70}ms">
      <div class="chapter-media">
        <img src="${escapeAttribute(item.asset)}" alt="${escapeAttribute(item.titulo)}" loading="lazy">
        <span class="chapter-number">${String(item.orden).padStart(2, "0")}</span>
      </div>
      <div class="chapter-copy">
        <p class="type-label">${escapeHtml(item.tipo)}</p>
        <h3>${escapeHtml(item.titulo)}</h3>
        <p>${escapeHtml(item.subtitulo)}</p>
        <button type="button" data-orden="${item.orden}">Ver detalle</button>
      </div>
    </article>
  `;
}

function renderDetail(item) {
  if (!item) {
    return `<div class="detail-empty">No hay capitulo seleccionado.</div>`;
  }

  const contentItems = state.book.items.filter((entry) => entry.tipo !== "portada");
  const selectedIndex = Math.max(0, contentItems.findIndex((entry) => entry.orden === item.orden));
  const progress = Math.round(((selectedIndex + 1) / contentItems.length) * 100);

  return `
    <div class="detail-media" data-reveal>
      <img src="${escapeAttribute(item.asset)}" alt="${escapeAttribute(item.titulo)}" loading="lazy">
    </div>
    <article class="detail-copy" data-reveal style="--reveal-delay:120ms">
      <div class="detail-progress" style="--progress:${progress}%">
        <span>Paso ${selectedIndex + 1} de ${contentItems.length}</span>
        <i></i>
      </div>
      <p class="eyebrow">${escapeHtml(item.tipo)} ${escapeHtml(item.orden)}</p>
      <h2>${escapeHtml(item.titulo)}</h2>
      <p class="subtitle">${escapeHtml(item.subtitulo)}</p>
      <p>${escapeHtml(item.contenido)}</p>
      <div class="action-grid">
        <section>
          <h3>Actividad</h3>
          <p>${escapeHtml(item.actividad)}</p>
        </section>
        <section>
          <h3>Indicador</h3>
          <p>${escapeHtml(item.indicador)}</p>
        </section>
      </div>
    </article>
  `;
}

function revealOnScroll() {
  const items = Array.from(document.querySelectorAll("[data-reveal], .mission-button"));
  if (!items.length) return;

  if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
    items.forEach((item) => item.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16 });

  items.forEach((item) => observer.observe(item));
}

function animateMetrics() {
  if (prefersReducedMotion()) return;
  document.querySelectorAll("[data-count]").forEach((node) => {
    const target = Number(node.dataset.count);
    if (!Number.isFinite(target)) return;
    const duration = 850;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}

function initImageParallax() {
  const media = document.querySelector(".detail-media");
  if (!media || prefersReducedMotion()) return;

  media.addEventListener("pointermove", (event) => {
    const rect = media.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
    media.style.setProperty("--tilt-x", `${y}deg`);
    media.style.setProperty("--tilt-y", `${x}deg`);
  });

  media.addEventListener("pointerleave", () => {
    media.style.setProperty("--tilt-x", "0deg");
    media.style.setProperty("--tilt-y", "0deg");
  });
}

function updateViewScaleButtons() {
  document.querySelectorAll("[data-view-scale]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.viewScale === state.viewScale));
  });
}

function firstContentItem(book) {
  return book.items.find((item) => item.tipo === "capitulo") || book.items[0] || { orden: 1 };
}

function selectedItem() {
  return state.book.items.find((item) => item.orden === state.selectedOrden) || firstContentItem(state.book);
}

function getAssetByType(items, type) {
  const item = items.find((entry) => entry.tipo === type && entry.asset);
  return item ? item.asset : "";
}

function getMissions(book) {
  return (book.missions || DEFAULT_MISSIONS).map((mission, index) => ({
    id: mission.id || `mision-${index + 1}`,
    title: mission.title || `Mision ${index + 1}`,
    tagline: mission.tagline || "",
    description: mission.description || "",
    orden: Number(mission.orden || firstContentItem(book).orden),
  }));
}

function normalizeMissionId(id, missions) {
  return missions.some((mission) => mission.id === id) ? id : missions[0].id;
}

function normalizeViewScale(value) {
  return VIEW_SCALES.includes(value) ? value : "normal";
}

function metricNumber(value) {
  const cleaned = String(value).replace(/[^\d.-]/g, "");
  if (!cleaned) return null;
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : null;
}

function readStorage(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // LocalStorage can be disabled in private browsing; the app still works.
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
