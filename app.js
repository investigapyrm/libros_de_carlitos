const GAS_ENDPOINT = "";
const LOCAL_DATA_URL = "data/book.json";

const app = document.querySelector("#app");

const state = {
  book: null,
  selectedOrden: null,
};

loadBook();

async function loadBook(forceLocal = false) {
  app.innerHTML = `<main class="loading-view"><p>Cargando libro...</p></main>`;

  try {
    const payload = forceLocal || !GAS_ENDPOINT
      ? await fetchLocalBook()
      : await fetchGasBook(GAS_ENDPOINT);

    state.book = normalizeBook(payload);
    state.selectedOrden = firstContentItem(state.book).orden;
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
    items,
  };
}

function renderApp() {
  const book = state.book;
  const selected = selectedItem();
  const chapters = book.items.filter((item) => item.tipo !== "portada");

  app.innerHTML = `
    <header class="hero" style="--hero-image: url('${escapeAttribute(book.heroImage)}')">
      <nav class="topnav" aria-label="Navegacion principal">
        <span class="brand">Carlitos DES</span>
        <button type="button" id="reloadBtn">Actualizar</button>
      </nav>
      <section class="hero-copy">
        <p class="eyebrow">Appweb educativa</p>
        <h1>${escapeHtml(book.title)}</h1>
        <p>${escapeHtml(book.subtitle)}</p>
        <div class="hero-actions">
          <a href="#recorrido" class="primary-action">Explorar recorrido</a>
          <a href="#detalle" class="secondary-action">Ver capitulo</a>
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

      <section class="content-band" id="recorrido">
        <div class="section-heading">
          <p class="eyebrow">Recorrido visual</p>
          <h2>Del residuo mezclado a la oportunidad verde</h2>
        </div>
        <div class="chapter-grid">
          ${chapters.map(renderChapterCard).join("")}
        </div>
      </section>

      <section class="detail-band" id="detalle">
        ${renderDetail(selected)}
      </section>

      <section class="closing-band" style="--closing-image: url('${escapeAttribute(book.closingImage)}')">
        <div>
          <p class="eyebrow">Cierre comunitario</p>
          <h2>La feria de las segundas vidas</h2>
          <p>El prototipo muestra como una escuela o comunidad puede pasar de separar residuos a presentar resultados, evidencias e ideas de emprendimiento verde.</p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <span>${escapeHtml(book.sourceLabel)}</span>
      <span>${escapeHtml(book.rightsNote)}</span>
    </footer>
  `;

  document.querySelector("#reloadBtn").addEventListener("click", () => loadBook(true));
  document.querySelectorAll("[data-orden]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedOrden = Number(button.dataset.orden);
      renderApp();
      document.querySelector("#detalle").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderSummary(book) {
  const entries = [
    ["Publico", book.summary.audience || "Escuelas, familias y comunidades."],
    ["Proposito", book.summary.purpose || "Aprender a separar y valorizar residuos."],
    ["Metodo", book.summary.method || "Observar, separar, registrar y medir."],
  ];

  return entries.map(([label, value]) => `
    <article class="summary-item">
      <h2>${escapeHtml(label)}</h2>
      <p>${escapeHtml(value)}</p>
    </article>
  `).join("");
}

function renderMetrics(metrics) {
  if (!metrics.length) return "";
  return metrics.map((metric) => `
    <article class="metric">
      <strong>${escapeHtml(metric.value)}</strong>
      <span>${escapeHtml(metric.label)}</span>
    </article>
  `).join("");
}

function renderChapterCard(item) {
  const active = item.orden === state.selectedOrden ? " active" : "";
  return `
    <article class="chapter-card${active}">
      <img src="${escapeAttribute(item.asset)}" alt="${escapeAttribute(item.titulo)}">
      <div>
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

  return `
    <div class="detail-media">
      <img src="${escapeAttribute(item.asset)}" alt="${escapeAttribute(item.titulo)}">
    </div>
    <article class="detail-copy">
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
