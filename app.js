const APP_VERSION = "v0.6.0";
const APP_BUILD_DATE = "2026-06-29";
const GAS_ENDPOINT = "";
const LOCAL_DATA_URL = "data/book.json";
const LOCAL_STORY_URL = "data/story-dia-nino.json";
const PAGE_FLIP_SCRIPT_URL = "https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.min.js";

const STORAGE_KEYS = {
  viewScale: "carlitos:viewScale",
  mission: "carlitos:mission",
  storyPage: "carlitos:storyPage:diaNino2026",
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
  {
    id: "conectar",
    title: "Conectar",
    tagline: "Unir empresas, escuela y comunidad.",
    description: "Las iniciativas ambientales se cuentan mejor cuando muestran evidencias, aliados e impactos.",
    orden: 8,
  },
];

const app = document.querySelector("#app");

const state = {
  book: null,
  storybook: null,
  selectedOrden: null,
  selectedMission: readStorage(STORAGE_KEYS.mission, DEFAULT_MISSIONS[0].id),
  selectedStoryPage: Number(readStorage(STORAGE_KEYS.storyPage, "0")) || 0,
  pageFlip: null,
  pageFlipLoading: null,
  viewScale: normalizeViewScale(readStorage(STORAGE_KEYS.viewScale, "normal")),
};

document.documentElement.dataset.viewScale = state.viewScale;

loadBook();

async function loadBook(forceLocal = false) {
  app.innerHTML = `<main class="loading-view"><span class="loading-mark"></span><p>Cargando libro...</p></main>`;

  try {
    const [payload, storybookPayload] = await Promise.all([
      forceLocal || !GAS_ENDPOINT ? fetchLocalBook() : fetchGasBook(GAS_ENDPOINT),
      fetchLocalStorybook(),
    ]);

    state.book = normalizeBook(payload);
    state.storybook = normalizeStorybook(storybookPayload);
    state.selectedOrden = firstContentItem(state.book).orden;
    state.selectedMission = normalizeMissionId(state.selectedMission, getMissions(state.book));
    state.selectedStoryPage = clampStoryPage(state.selectedStoryPage);
    renderApp();
    scrollToHashTarget();
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

async function fetchLocalStorybook() {
  try {
    const response = await fetch(LOCAL_STORY_URL, { cache: "no-store" });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    return null;
  }
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
      objetivo: item.objetivo || "",
      preguntaGuia: item.preguntaGuia || "",
      aprendizajes: normalizeStringList(item.aprendizajes),
      desarrollo: normalizeStringList(item.desarrollo),
      pasos: normalizeStringList(item.pasos),
      materiales: normalizeStringList(item.materiales),
      evidencias: normalizeStringList(item.evidencias),
      paraDocente: item.paraDocente || "",
      paraComunidad: item.paraComunidad || "",
      cuidado: item.cuidado || "",
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
    enterpriseFocus: raw.enterpriseFocus || null,
    metrics: Array.isArray(raw.metrics) ? raw.metrics : [],
    missions: Array.isArray(raw.missions) ? raw.missions : DEFAULT_MISSIONS,
    items,
  };
}

function normalizeStorybook(raw) {
  if (!raw || !Array.isArray(raw.pages) || !raw.pages.length) return null;

  const pages = raw.pages.map((page, index) => ({
    kicker: page.kicker || `Pagina ${index + 1}`,
    title: page.title || `Pagina ${index + 1}`,
    body: page.body || "",
    image: page.image || "",
    futureImage: page.futureImage || "",
    tone: page.tone || "",
  }));

  return {
    id: raw.id || "cuento-dia-nino",
    title: raw.title || "Carlitos y el bosque que guarda abrazos",
    subtitle: raw.subtitle || "",
    eyebrow: raw.eyebrow || "Libro digital interactivo",
    audience: raw.audience || "",
    status: raw.status || "",
    sourceLabel: raw.sourceLabel || "",
    activityTitle: raw.activityTitle || "Actividad",
    activityText: raw.activityText || "",
    pages,
  };
}

function renderApp() {
  const book = state.book;
  const selected = selectedItem();
  const chapters = book.items.filter((item) => item.tipo !== "portada");
  const missions = getMissions(book);
  const activeMission = missions.find((mission) => mission.id === state.selectedMission) || missions[0];

  app.innerHTML = `
    <header class="hero" id="inicio" style="--hero-image: url('${escapeAttribute(book.heroImage)}')">
      <div class="hero-ambient" aria-hidden="true">
        ${renderFloatingBits()}
      </div>
      <nav class="topnav" aria-label="Navegacion principal">
        <a class="brand" href="#inicio" data-nav-target="inicio" aria-label="Ir al inicio">Carlitos DES</a>
        <div class="topnav-actions">
          ${renderViewControl()}
          <button type="button" class="nav-button" id="reloadBtn">Actualizar</button>
        </div>
      </nav>
      <section class="hero-copy">
        <p class="eyebrow">Appweb educativa</p>
        <h1>${escapeHtml(book.title)}</h1>
        <p>${escapeHtml(book.subtitle)}</p>
        <div class="hero-actions">
          <a href="#misiones" class="primary-action" data-nav-target="misiones">Empezar mision</a>
          ${state.storybook ? `<a href="#cuento-dia-nino" class="secondary-action" data-nav-target="cuento-dia-nino">Leer cuento</a>` : ""}
          <a href="#iniciativas" class="secondary-action" data-nav-target="iniciativas">Ver iniciativas</a>
          <a href="#recorrido" class="secondary-action" data-nav-target="recorrido">Ver contenidos</a>
        </div>
        <div class="story-rail" aria-label="Ruta de aprendizaje">
          ${missions.map((mission) => `
            <button type="button" data-mission-jump="${escapeAttribute(mission.id)}">
              ${escapeHtml(mission.title)}
            </button>
          `).join("")}
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

      ${state.storybook ? renderStorybook(state.storybook) : ""}

      ${book.enterpriseFocus ? `
        <section class="enterprise-band" id="iniciativas">
          ${renderEnterpriseFocus(book.enterpriseFocus)}
        </section>
      ` : ""}

      <section class="mission-band" id="misiones">
        ${renderMissionBand(missions, activeMission)}
      </section>

      <section class="content-band" id="recorrido">
        <div class="section-heading" data-reveal>
          <p class="eyebrow">Recorrido didactico</p>
          <h2>Del residuo mezclado a las iniciativas que cuidan</h2>
          <p>Cada seccion combina relato, actividad, evidencia y una decision concreta para conectar escuela, comunidad, emprendimientos y empresas responsables.</p>
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
          <p>El prototipo muestra como una escuela o comunidad puede pasar de separar residuos a presentar resultados, evidencias, alianzas e iniciativas productivas con beneficio ambiental y social.</p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <span>${escapeHtml(book.sourceLabel)}</span>
      <span class="version-pill">${APP_VERSION} | ${APP_BUILD_DATE}</span>
      <span>${escapeHtml(book.rightsNote)}</span>
    </footer>
  `;

  bindEvents();
  initMotion();
}

function bindEvents() {
  document.querySelector("#reloadBtn").addEventListener("click", () => loadBook(true));

  document.querySelectorAll("[data-nav-target]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      navigateTo(link.dataset.navTarget);
    });
  });

  document.querySelectorAll("[data-mission-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      const missions = getMissions(state.book);
      const mission = missions.find((entry) => entry.id === button.dataset.missionJump);
      if (!mission) return;
      selectMission(mission, "detalle");
    });
  });

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
      selectMission(mission, "detalle");
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

  document.querySelectorAll("[data-story-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.storyAction === "next") selectStoryPage(state.selectedStoryPage + 1);
      if (button.dataset.storyAction === "prev") selectStoryPage(state.selectedStoryPage - 1);
    });
  });

  document.querySelectorAll("[data-story-page]").forEach((button) => {
    button.addEventListener("click", () => {
      selectStoryPage(Number(button.dataset.storyPage));
    });
  });

  document.querySelectorAll(".storybook-page-visual img").forEach((image) => {
    image.addEventListener("error", () => {
      image.hidden = true;
      image.closest(".storybook-page")?.classList.add("image-missing");
    }, { once: true });
  });

  document.removeEventListener("keydown", handleStorybookKeyboard);
  document.addEventListener("keydown", handleStorybookKeyboard);
}

function initMotion() {
  updateViewScaleButtons();
  revealOnScroll();
  animateMetrics();
  initImageParallax();
  initStorybook();
}

function selectChapter(orden, shouldScroll) {
  state.selectedOrden = orden;
  renderApp();
  if (!shouldScroll) return;
  navigateTo("detalle");
}

function selectMission(mission, targetId) {
  state.selectedMission = mission.id;
  state.selectedOrden = mission.orden || state.selectedOrden;
  writeStorage(STORAGE_KEYS.mission, mission.id);
  renderApp();
  navigateTo(targetId || "detalle");
}

function selectStoryPage(index, syncFlip = true) {
  if (!state.storybook) return;
  const nextPage = clampStoryPage(index);
  state.selectedStoryPage = nextPage;
  writeStorage(STORAGE_KEYS.storyPage, String(nextPage));
  updateStorybookUI();

  if (syncFlip && state.pageFlip && typeof state.pageFlip.flip === "function") {
    try {
      state.pageFlip.flip(nextPage, "bottom");
    } catch (error) {
      // The fallback reader already updated the visible page.
    }
  }
}

function initStorybook() {
  const root = document.querySelector("#storybookFlip");
  if (!root || !state.storybook) return;

  destroyPageFlip();
  updateStorybookUI();

  if (prefersReducedMotion() || window.matchMedia("(max-width: 760px)").matches) return;

  loadPageFlipScript()
    .then(() => {
      if (!window.St || typeof window.St.PageFlip !== "function") return;

      const pages = root.querySelectorAll(".storybook-page");
      if (!pages.length) return;

      try {
        state.pageFlip = new window.St.PageFlip(root, {
          width: 430,
          height: 610,
          size: "stretch",
          minWidth: 290,
          maxWidth: 520,
          minHeight: 430,
          maxHeight: 720,
          showCover: false,
          usePortrait: true,
          mobileScrollSupport: false,
          maxShadowOpacity: 0.2,
          flippingTime: 760,
          startPage: state.selectedStoryPage,
          drawShadow: true,
        });

        root.classList.remove("fallback");
        root.classList.add("is-pageflip");
        state.pageFlip.loadFromHTML(pages);
        state.pageFlip.on("flip", (event) => {
          selectStoryPage(Number(event.data), false);
        });
      } catch (error) {
        root.classList.add("fallback");
        root.classList.remove("is-pageflip");
        destroyPageFlip();
      }
    })
    .catch(() => {
      root.classList.add("fallback");
    });
}

function loadPageFlipScript() {
  if (window.St && window.St.PageFlip) return Promise.resolve();
  if (state.pageFlipLoading) return state.pageFlipLoading;

  state.pageFlipLoading = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${PAGE_FLIP_SCRIPT_URL}"]`);
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = PAGE_FLIP_SCRIPT_URL;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return state.pageFlipLoading;
}

function destroyPageFlip() {
  if (state.pageFlip && typeof state.pageFlip.destroy === "function") {
    try {
      state.pageFlip.destroy();
    } catch (error) {
      // The DOM is recreated during render; a failed destroy is not fatal.
    }
  }
  state.pageFlip = null;
}

function updateStorybookUI() {
  if (!state.storybook) return;
  const currentIndex = clampStoryPage(state.selectedStoryPage);
  const currentPage = state.storybook.pages[currentIndex];
  const total = state.storybook.pages.length;
  const progress = Math.round(((currentIndex + 1) / total) * 100);
  const reader = document.querySelector(".storybook-reader");

  document.querySelectorAll("[data-story-page-view]").forEach((page) => {
    page.classList.toggle("is-active", Number(page.dataset.storyPageView) === currentIndex);
  });

  document.querySelectorAll("[data-story-page]").forEach((button) => {
    button.setAttribute("aria-pressed", String(Number(button.dataset.storyPage) === currentIndex));
  });

  document.querySelectorAll("[data-story-action='prev']").forEach((button) => {
    button.disabled = currentIndex === 0;
  });

  document.querySelectorAll("[data-story-action='next']").forEach((button) => {
    button.disabled = currentIndex === total - 1;
  });

  setText("[data-story-status]", `Pagina ${currentIndex + 1} de ${total}`);
  setText("[data-story-kicker]", currentPage.kicker);
  setText("[data-story-title]", currentPage.title);
  setText("[data-story-body]", currentPage.body);
  setText("[data-story-tone]", currentPage.tone);

  if (reader) {
    reader.style.setProperty("--story-progress", `${progress}%`);
  }
}

function handleStorybookKeyboard(event) {
  if (!state.storybook || event.altKey || event.ctrlKey || event.metaKey) return;
  const active = document.activeElement;
  if (active && ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName)) return;

  const reader = document.querySelector(".storybook-reader");
  if (!reader || !isElementMostlyVisible(reader)) return;

  if (event.key === "ArrowRight") {
    event.preventDefault();
    selectStoryPage(state.selectedStoryPage + 1);
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    selectStoryPage(state.selectedStoryPage - 1);
  }
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

function renderStorybook(storybook) {
  const currentIndex = clampStoryPage(state.selectedStoryPage);
  const currentPage = storybook.pages[currentIndex] || storybook.pages[0];
  const progress = Math.round(((currentIndex + 1) / storybook.pages.length) * 100);

  return `
    <section class="storybook-band" id="cuento-dia-nino" aria-label="Cuento digital de Dia del Nino">
      <div class="storybook-heading" data-reveal>
        <p class="eyebrow">${escapeHtml(storybook.eyebrow)}</p>
        <h2>${escapeHtml(storybook.title)}</h2>
        <p>${escapeHtml(storybook.subtitle)}</p>
        <div class="storybook-meta">
          <span>${escapeHtml(storybook.audience)}</span>
          <span>${escapeHtml(storybook.status)}</span>
        </div>
      </div>

      <div class="storybook-reader" data-reveal style="--reveal-delay:120ms">
        <div class="storybook-toolbar" aria-label="Controles del cuento">
          <button type="button" class="storybook-control" data-story-action="prev">Anterior</button>
          <div class="storybook-progress" style="--story-progress:${progress}%">
            <span data-story-status>Pagina ${currentIndex + 1} de ${storybook.pages.length}</span>
            <i></i>
          </div>
          <button type="button" class="storybook-control" data-story-action="next">Siguiente</button>
        </div>

        <div class="storybook-layout">
          <div class="storybook-stage">
            <div class="storybook-flip fallback" id="storybookFlip">
              ${storybook.pages.map((page, index) => renderStorybookPage(page, index, currentIndex)).join("")}
            </div>
          </div>

          <aside class="storybook-side">
            <span class="storybook-side-kicker" data-story-kicker>${escapeHtml(currentPage.kicker)}</span>
            <h3 data-story-title>${escapeHtml(currentPage.title)}</h3>
            <p data-story-body>${escapeHtml(currentPage.body)}</p>
            <div class="storybook-tone" data-story-tone>${escapeHtml(currentPage.tone)}</div>
            <div class="storybook-index" aria-label="Indice del cuento">
              ${storybook.pages.map((page, index) => `
                <button
                  type="button"
                  data-story-page="${index}"
                  aria-pressed="${index === currentIndex}"
                  aria-label="Ir a ${escapeAttribute(page.kicker)}"
                >
                  ${index + 1}
                </button>
              `).join("")}
            </div>
            <div class="storybook-activity">
              <strong>${escapeHtml(storybook.activityTitle)}</strong>
              <p>${escapeHtml(storybook.activityText)}</p>
            </div>
            <small>${escapeHtml(storybook.sourceLabel)}</small>
          </aside>
        </div>
      </div>
    </section>
  `;
}

function renderStorybookPage(page, index, currentIndex) {
  const isActive = index === currentIndex ? " is-active" : "";
  return `
    <article class="storybook-page${isActive}" data-story-page-view="${index}">
      <div class="storybook-page-visual">
        ${page.image ? `<img src="${escapeAttribute(page.image)}" data-future-image="${escapeAttribute(page.futureImage)}" alt="${escapeAttribute(page.title)}" loading="lazy">` : ""}
      </div>
      <div class="storybook-page-copy">
        <span>${escapeHtml(page.kicker)}</span>
        <h3>${escapeHtml(page.title)}</h3>
        <p>${escapeHtml(page.body)}</p>
      </div>
    </article>
  `;
}

function renderEnterpriseFocus(focus) {
  const metadata = Array.isArray(focus.metadata) ? focus.metadata : [];
  const pillars = Array.isArray(focus.pillars) ? focus.pillars : [];
  const cases = Array.isArray(focus.cases) ? focus.cases : [];
  const anthology = Array.isArray(focus.anthology) ? focus.anthology : [];
  const technicalChapters = Array.isArray(focus.technicalChapters) ? focus.technicalChapters : [];
  const valueProposition = Array.isArray(focus.valueProposition) ? focus.valueProposition : [];

  return `
    <div class="enterprise-inner">
      <div class="enterprise-copy" data-reveal>
        <p class="eyebrow">${escapeHtml(focus.eyebrow || "Empresas e iniciativas")}</p>
        <h2>${escapeHtml(focus.title || "Iniciativas que cuidan ambiente y comunidad")}</h2>
        <p>${escapeHtml(focus.intro || "")}</p>
        ${focus.disclaimer ? `<span class="enterprise-note">${escapeHtml(focus.disclaimer)}</span>` : ""}
      </div>
      <div class="enterprise-content">
        ${metadata.length ? `
          <div class="enterprise-meta-grid">
            ${metadata.map((item, index) => renderEnterpriseMeta(item, index)).join("")}
          </div>
        ` : ""}
        ${pillars.length ? `
          <div class="enterprise-grid">
            ${pillars.map((item, index) => renderEnterpriseCard(item, index)).join("")}
          </div>
        ` : ""}
        ${anthology.length ? renderEnterpriseCollection(
          "Propuesta A",
          "Antologia de 10 cuentos infantiles (4 a 10 anos)",
          anthology,
          renderEnterpriseStory,
        ) : ""}
        ${technicalChapters.length ? renderEnterpriseCollection(
          "Propuesta B",
          "Texto tecnico por capitulos (7mo grado al 3er ano de la Media)",
          technicalChapters,
          renderEnterpriseTechnicalChapter,
        ) : ""}
        ${valueProposition.length ? renderEnterpriseCollection(
          "Valor para Paracel",
          "Co-branding, inversion social y medicion educativa",
          valueProposition,
          renderEnterpriseValuePoint,
        ) : ""}
        ${cases.length ? `
          <div class="enterprise-case-grid">
            ${cases.map((item, index) => renderEnterpriseCase(item, index)).join("")}
          </div>
        ` : ""}
      </div>
    </div>
  `;
}

function renderEnterpriseMeta(item, index) {
  return `
    <article class="enterprise-meta" data-reveal style="--reveal-delay:${index * 60}ms">
      <span>${escapeHtml(item.label || "")}</span>
      <strong>${escapeHtml(item.value || "")}</strong>
    </article>
  `;
}

function renderEnterpriseCard(item, index) {
  return `
    <article class="enterprise-card" data-reveal style="--reveal-delay:${index * 70}ms">
      <span>${escapeHtml(item.tag || "Eje")}</span>
      <h3>${escapeHtml(item.title || "")}</h3>
      <p>${escapeHtml(item.text || "")}</p>
    </article>
  `;
}

function renderEnterpriseCollection(eyebrow, title, items, renderer) {
  return `
    <section class="enterprise-collection" data-reveal>
      <div class="enterprise-collection-head">
        <span>${escapeHtml(eyebrow)}</span>
        <h3>${escapeHtml(title)}</h3>
      </div>
      <div class="enterprise-collection-list">
        ${items.map((item, index) => renderer(item, index)).join("")}
      </div>
    </section>
  `;
}

function renderEnterpriseStory(item, index) {
  return `
    <article class="enterprise-story" data-reveal style="--reveal-delay:${index * 45}ms">
      <b>${String(index + 1).padStart(2, "0")}</b>
      <div>
        <strong>${escapeHtml(item.title || "")}</strong>
        <span>${escapeHtml(item.concept || "")}</span>
        <p>${escapeHtml(item.focus || "")}</p>
      </div>
    </article>
  `;
}

function renderEnterpriseTechnicalChapter(item, index) {
  return `
    <article class="enterprise-technical" data-reveal style="--reveal-delay:${index * 55}ms">
      <b>Capitulo ${index + 1}</b>
      <h4>${escapeHtml(item.title || "")}</h4>
      <p><strong>Contenido:</strong> ${escapeHtml(item.content || "")}</p>
      <p><strong>Caso Paracel:</strong> ${escapeHtml(item.case || "")}</p>
    </article>
  `;
}

function renderEnterpriseValuePoint(item, index) {
  return `
    <article class="enterprise-value" data-reveal style="--reveal-delay:${index * 60}ms">
      <strong>${escapeHtml(item.title || "")}</strong>
      <p>${escapeHtml(item.text || "")}</p>
    </article>
  `;
}

function renderEnterpriseCase(item, index) {
  return `
    <article class="enterprise-case" data-reveal style="--reveal-delay:${index * 80}ms">
      <strong>${escapeHtml(item.title || "")}</strong>
      <p>${escapeHtml(item.text || "")}</p>
    </article>
  `;
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
      ${renderInlineCallout("Objetivo", item.objetivo)}
      ${renderInlineCallout("Pregunta guia", item.preguntaGuia)}
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
    <div class="detail-full" data-reveal style="--reveal-delay:180ms">
      ${renderParagraphSection("Guia narrativa", item.desarrollo)}
      ${renderListSection("Aprendizajes esperados", item.aprendizajes)}
      ${renderListSection("Pasos para hacer", item.pasos)}
      ${renderListSection("Materiales", item.materiales)}
      ${renderListSection("Evidencias", item.evidencias)}
      ${renderNoteGrid(item)}
    </div>
  `;
}

function renderInlineCallout(label, value) {
  if (!value) return "";
  return `
    <div class="inline-callout">
      <strong>${escapeHtml(label)}</strong>
      <span>${escapeHtml(value)}</span>
    </div>
  `;
}

function renderParagraphSection(title, paragraphs) {
  if (!paragraphs.length) return "";
  return `
    <section class="detail-block detail-block-wide">
      <h3>${escapeHtml(title)}</h3>
      ${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    </section>
  `;
}

function renderListSection(title, entries) {
  if (!entries.length) return "";
  return `
    <section class="detail-block">
      <h3>${escapeHtml(title)}</h3>
      <ul>
        ${entries.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderNoteGrid(item) {
  const notes = [
    ["Para docentes", item.paraDocente],
    ["Para comunidad", item.paraComunidad],
    ["Cuidado", item.cuidado],
  ].filter(([, value]) => value);

  if (!notes.length) return "";

  return `
    <section class="detail-notes">
      ${notes.map(([title, value]) => `
        <article>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(value)}</p>
        </article>
      `).join("")}
    </section>
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
  document.querySelectorAll("[data-count]").forEach((node) => {
    const target = Number(node.dataset.count);
    if (!Number.isFinite(target)) return;
    node.textContent = String(target);
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

function scrollToHashTarget() {
  const id = decodeURIComponent(window.location.hash.replace("#", ""));
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  requestAnimationFrame(() => {
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: "auto", block: "start" });
    }, 250);
  });
}

function navigateTo(id, behavior = "smooth") {
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;

  updateHash(id);
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : behavior,
    block: "start",
  });
}

function updateHash(id) {
  const nextHash = `#${encodeURIComponent(id)}`;
  if (window.location.hash === nextHash) return;
  window.history.pushState(null, "", nextHash);
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

function clampStoryPage(index) {
  if (!state.storybook || !state.storybook.pages.length) return 0;
  const number = Number(index);
  if (!Number.isFinite(number)) return 0;
  return Math.min(Math.max(Math.round(number), 0), state.storybook.pages.length - 1);
}

function normalizeViewScale(value) {
  return VIEW_SCALES.includes(value) ? value : "normal";
}

function normalizeStringList(value) {
  if (Array.isArray(value)) {
    return value
      .map((entry) => String(entry || "").trim())
      .filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }

  return [];
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

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value || "";
}

function isElementMostlyVisible(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.min(rect.bottom, windowHeight);
  return visibleBottom - visibleTop > Math.min(rect.height * 0.28, 180);
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
