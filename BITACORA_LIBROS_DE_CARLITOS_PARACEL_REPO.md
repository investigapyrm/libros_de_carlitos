# Bitacora - Libros de Carlitos

## 2026-06-26 12:04

### Proyecto

* Nombre: Libros de Carlitos - Carlitos y el Desarrollo Sostenible
* Cliente o institucion: PARACEL / FACEN-UNA / investigapyrm
* Ruta local: `C:\Users\Diego\OneDrive - PARACEL S.A\MONITOREO_IMPACTO_SOCIAL_PARACEL\PROYECTO_CARLITOS\libros_de_carlitos`
* Repositorio: `https://github.com/investigapyrm/libros_de_carlitos.git`
* URL publica objetivo: `https://investigapyrm.github.io/libros_de_carlitos/#iniciativas`
* Fuente documental: `J:\Mi unidad\carlitos\propuesta_tecnica_carlitos_paracel_sostenibilidad.pdf`
* Responsable: Codex, a solicitud de Diego
* Version: `v0.5.0`

### Objetivo de la intervencion

* Ajustar la seccion `#iniciativas` de la appweb a los datos de la propuesta tecnica-editorial Paracel-FACEN sobre la serie `Carlitos y el Desarrollo Sostenible`.

### Diagnostico inicial

* El repositorio estaba limpio y sincronizado con `origin/main`.
* La app ya tenia una seccion `Empresas e iniciativas`, pero todavia era generica.
* El PDF fuente existia en la ruta indicada y tenia texto extraible.
* La extraccion de texto presento mojibake heredado; se corrigio editorialmente al incorporar el contenido.
* No existia bitacora propia dentro del repo, por lo que se creo este archivo.

### Acciones realizadas

* Se actualizo la app a `v0.5.0`.
* Se incorporaron datos del PDF:
  * institucion de origen FACEN-UNA;
  * equipo de autores;
  * linea de enfoque;
  * 31 programas socioambientales;
  * mas del 30% de contenido asociado a sustentabilidad forestal-industrial;
  * antologia de 10 cuentos infantiles;
  * texto tecnico de 5 capitulos;
  * propuesta de valor para area de influencia, inversion social, educacion ambiental, medicion por encuestas y reportes de sostenibilidad.
* Se agrego renderizado especifico para:
  * metadatos institucionales;
  * pilares estrategicos;
  * cuentos propuestos;
  * capitulos tecnicos;
  * propuesta de valor y co-branding responsable.
* Se actualizo el cache-busting de `index.html`.
* Se actualizo `README.md`.
* Se mantuvo advertencia editorial/legal antes de publicar como version final.

### Archivos modificados

* `data/book.json`
* `app.js`
* `styles.css`
* `index.html`
* `README.md`
* `BITACORA_LIBROS_DE_CARLITOS_PARACEL_REPO.md`
* `G:\Mi unidad\MANUAL_MAESTRO_FORMATOS_FUNCIONES_APPWEB\APRENDIZAJE_CARLITOS_FICHA_INICIATIVAS_EMPRESAS_AMBIENTALES_2026-06-25.md`

### Comandos o scripts ejecutados

* `git status --branch --short`
* `rg --files`
* `pdftotext -layout -enc UTF-8`
* `pdfinfo`
* `node --check app.js`
* `node -e "JSON.parse(require('fs').readFileSync('data/book.json','utf8'))"`
* `git diff --check`
* `python -m http.server 8787 --bind 127.0.0.1`
* `Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8787/`
* `Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8787/app.js?v=0.5.0`
* `Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8787/styles.css?v=0.5.0`
* `Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8787/data/book.json`
* Prueba funcional headless `_tmp_v050_iniciativas_check.js`.
* `npx --yes playwright screenshot --full-page http://127.0.0.1:8787/#iniciativas _preview_v050_iniciativas.png`
* `npx --yes playwright screenshot --viewport-size="390,1400" --full-page http://127.0.0.1:8787/#iniciativas _preview_v050_iniciativas_mobile.png`

### Resultados verificados

* HTTP local responde `200`.
* `app.js?v=0.5.0` responde `200`.
* `styles.css?v=0.5.0` responde `200`.
* `data/book.json` responde `200`.
* `app.js` no presenta errores de sintaxis.
* `data/book.json` parsea correctamente.
* `git diff --check` no detecto errores de whitespace.
* Prueba funcional resulto `libros Carlitos v0.5.0 iniciativas check OK`.
* La prueba verifico en navegador:
  * `Serie Carlitos y el Desarrollo Sostenible`;
  * `FACEN-UNA`;
  * `31`;
  * `30%`;
  * `Antologia de 10 cuentos infantiles`;
  * `El bosque magico que atrapa el calor`;
  * `Texto tecnico por capitulos`;
  * `Sostenibilidad Forestal y Captura de Carbono`;
  * `Medicion de impacto educativo`;
  * `v0.5.0`.
* La prueba verifico 10 tarjetas de cuentos, 5 capitulos tecnicos y al menos 4 metadatos institucionales.
* Capturas local desktop y movil revisadas visualmente sin solapes criticos.

### Pruebas realizadas

* Validacion de sintaxis.
* Validacion de JSON.
* Validacion HTTP local.
* Prueba headless de contenido y conteos de componentes.
* Revision visual de captura desktop de `#iniciativas`.
* Revision visual de captura movil de `#iniciativas`.

### Errores o incidentes

* El PDF extraido mostro mojibake (`TÃ©cnica`, `aÃ±os`, etc.). Se incorporaron los datos en castellano limpio y sin caracteres corruptos.

### Soluciones aplicadas

* Se estructuro la seccion `#iniciativas` como propuesta tecnica-editorial y no como propaganda.
* Se mantuvieron textos prudentes: propuesta, casos, enfoque, medicion y validacion pendiente.
* Se evito incorporar logos, marcas graficas o afirmaciones ambientales no verificadas fuera de lo indicado en el PDF.

### Pendientes

* Verificar URL publica con cache-busting luego del push.
* Confirmar autorizaciones editoriales y legales antes de publicar como version final.
* Si corresponde, actualizar Google Sheets/GAS para que estos campos tambien existan en la fuente online.

### Riesgos

* Publicar como version final sin autorizacion de autores, personaje, marcas, imagenes o casos institucionales.
* Confundir propuesta editorial con evidencia auditada de sostenibilidad.
* Mantener el PDF como unica fuente si luego hay una version institucional revisada.

### Recomendaciones

* Usar esta version como prototipo para conversacion con Paracel y FACEN-UNA.
* Solicitar validacion tecnica de contenidos ambientales y forestales.
* Solicitar revision legal/editorial antes de difusion formal.
* Mantener version visible y evidencia de verificacion publica en cada hito.
