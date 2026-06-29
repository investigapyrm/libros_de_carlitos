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
* `git commit -m "Ajusta iniciativas a propuesta Paracel FACEN"`
* `git push origin main`
* `Invoke-WebRequest -UseBasicParsing https://investigapyrm.github.io/libros_de_carlitos/?v=0.5.0&commit=70b3ac1`
* `Invoke-WebRequest -UseBasicParsing https://investigapyrm.github.io/libros_de_carlitos/app.js?v=0.5.0&commit=70b3ac1`
* `Invoke-WebRequest -UseBasicParsing https://investigapyrm.github.io/libros_de_carlitos/data/book.json?v=0.5.0&commit=70b3ac1`
* Prueba publica headless `_tmp_public_v050_check.js`.

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
* Commit creado y empujado: `70b3ac10d84c4671654fb40f902cdea0318a40b6`.
* GitHub Pages responde `200` en `https://investigapyrm.github.io/libros_de_carlitos/?v=0.5.0&commit=70b3ac1#iniciativas`.
* La URL publica sirve HTML con `app.js?v=0.5.0` y `styles.css?v=0.5.0`.
* La URL publica sirve `app.js` con `APP_VERSION = "v0.5.0"`.
* La URL publica sirve `data/book.json` con `FACEN-UNA`, `31`, `30%` y `El bosque magico que atrapa el calor`.
* La prueba publica resulto `public libros Carlitos v0.5.0 iniciativas OK`.
* Captura publica de `#iniciativas` revisada visualmente con la seccion tecnica-editorial renderizada.

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

## 2026-06-29 18:38

### Proyecto

* Nombre: Libros de Carlitos - Cuento para Dia del Nino
* Cliente o institucion: PARACEL / FACEN-UNA / investigapyrm
* Ruta local: `C:\Users\Diego\OneDrive - PARACEL S.A\MONITOREO_IMPACTO_SOCIAL_PARACEL\PROYECTO_CARLITOS\libros_de_carlitos`
* Repositorio: `https://github.com/investigapyrm/libros_de_carlitos.git`
* Fuente documental: `J:\Mi unidad\carlitos\propuesta_tecnica_carlitos_paracel_sostenibilidad.pdf`
* Rama de trabajo: `feature/cuento-dia-del-nino-2026`
* Responsable: Codex
* Version: borrador editorial interno

### Objetivo de la intervencion

* Considerar y avanzar una pieza narrativa de Carlitos para compartir por el Dia del Nino en Paraguay, 16 de agosto.
* Alinear el cuento con la propuesta tecnica-editorial Paracel-FACEN ya integrada al repositorio.

### Diagnostico inicial

* El repositorio estaba limpio y sincronizado con `origin/main`.
* La app ya contenia la propuesta tecnica-editorial Paracel-FACEN en `data/book.json`.
* El PDF fuente propone una antologia de 10 cuentos infantiles, incluyendo `El bosque magico que atrapa el calor`.
* Para Dia del Nino conviene una pieza breve, afectiva y compartible, no una ficha tecnica ni una comunicacion corporativa directa.

### Acciones realizadas

* Se creo la rama `feature/cuento-dia-del-nino-2026`.
* Se redacto el borrador `Carlitos y el bosque que guarda abrazos`.
* Se adapto el enfoque del cuento 1 de la antologia: clima, captura de carbono y plantaciones planificadas.
* Se mantuvo una distincion explicita entre bosque nativo protegido y plantacion planificada.
* Se agrego actividad breve para aula/comunidad: `Regalos que crecen`.
* Se agregaron criterios de revision legal, editorial y tecnica antes de difundir.
* Se agregaron prompts visuales para portada, escena interior y cierre.
* Se actualizo `README.md` con el avance editorial.

### Archivos modificados

* `README.md`
* `BITACORA_LIBROS_DE_CARLITOS_PARACEL_REPO.md`
* `docs/CUENTO_DIA_DEL_NINO_CARLITOS_BOSQUE_GUARDA_ABRAZOS_2026-06-29.md`
* `G:\Mi unidad\MANUAL_MAESTRO_FORMATOS_FUNCIONES_APPWEB\APRENDIZAJE_CARLITOS_CUENTO_DIA_DEL_NINO_2026-06-29.md`

### Comandos o scripts ejecutados

* `git status --branch --short`
* `pdftotext "J:\Mi unidad\carlitos\propuesta_tecnica_carlitos_paracel_sostenibilidad.pdf" -`
* `git switch -c feature/cuento-dia-del-nino-2026`
* `git diff --check`

### Resultados verificados

* El PDF fuente fue leido y contiene la antologia de 10 cuentos infantiles.
* El cuento creado se alinea con `El bosque magico que atrapa el calor`, ODS 13, captura de CO2 y sostenibilidad forestal.
* El borrador evita logos, marcas graficas y afirmaciones ambientales absolutas.
* El documento incluye actividad, criterios de revision y prompts visuales.

### Pruebas realizadas

* Revision estructural del documento Markdown.
* Verificacion de whitespace con `git diff --check`.

### Errores o incidentes

* No se detectaron errores tecnicos.
* Queda pendiente validacion humana editorial, tecnica, legal e institucional.

### Soluciones aplicadas

* Se eligio un cuento afectivo y didactico para Dia del Nino, no una pieza promocional.
* Se uso lenguaje prudente: propuesta, cuidado, medicion, planificacion y evidencia.
* Se separo claramente el borrador interno de una publicacion final.

### Pendientes

* Revisar si el cuento debe mencionar explicitamente a Paracel o mantenerse sin marcas visibles.
* Validar derechos de uso de Carlitos, autoria e imagenes.
* Revisar tecnicamente la explicacion de captura de carbono.
* Decidir formato final: pagina web, PDF ilustrado, carrusel, lectura breve o pieza imprimible.

### Riesgos

* Difundir sin autorizacion formal del personaje o autores.
* Presentar plantaciones como reemplazo de bosque nativo.
* Convertir el cuento en propaganda si se agregan marcas o afirmaciones no verificadas.

### Recomendaciones

* Usar este borrador como base de revision con autores y equipo socioambiental.
* Preparar una version corta para lectura en voz alta y una version ilustrada para web/PDF.
* Mantener la pieza final sin logos ni marcas si todavia no hay autorizacion expresa.

## 2026-06-29 18:45

### Proyecto

* Nombre: Libros de Carlitos - Prompts para cuento de Dia del Nino
* Cliente o institucion: PARACEL / FACEN-UNA / investigapyrm
* Ruta local: `C:\Users\Diego\OneDrive - PARACEL S.A\MONITOREO_IMPACTO_SOCIAL_PARACEL\PROYECTO_CARLITOS\libros_de_carlitos`
* Repositorio: `https://github.com/investigapyrm/libros_de_carlitos.git`
* Fuente documental: `J:\Mi unidad\carlitos\propuesta_tecnica_carlitos_paracel_sostenibilidad.pdf`
* Rama de trabajo: `feature/cuento-dia-del-nino-2026`
* Responsable: Codex
* Version: paquete inicial de prompts visuales

### Objetivo de la intervencion

* Crear contenido inicial y una lista de prompts para que GPT Imagen en linea pueda producir las ilustraciones del cuento de Dia del Nino.
* Dejar el paquete documentado, trazable y separado de una publicacion final.

### Diagnostico inicial

* Ya existia el borrador del cuento `Carlitos y el bosque que guarda abrazos`.
* Faltaba una secuencia visual mas operativa para generar portada, laminas interiores y piezas de difusion.
* La produccion visual requiere controles explicitos: no texto legible, no logos, no marcas, no sustitucion de bosque nativo por plantacion.

### Acciones realizadas

* Se creo un documento especifico para GPT Imagen en linea.
* Se definio concepto editorial inicial: titulo, subtitulo, frase guia, sinopsis, publico e idea ambiental central.
* Se agrego prompt maestro y prompt negativo general.
* Se estructuro una secuencia de 12 laminas con prompts y nombres recomendados de archivos.
* Se agregaron prompts adicionales para redes, historia vertical, banner web y contraportada.
* Se agrego orden recomendado de generacion y control de calidad visual.
* Se agregaron textos iniciales para publicacion, docente y revision institucional.
* Se actualizo `README.md` para que el paquete sea visible desde la documentacion principal.

### Archivos modificados

* `README.md`
* `BITACORA_LIBROS_DE_CARLITOS_PARACEL_REPO.md`
* `docs/CONTENIDO_INICIAL_PROMPTS_GPT_IMAGEN_CUENTO_DIA_DEL_NINO_2026-06-29.md`
* `G:\Mi unidad\MANUAL_MAESTRO_FORMATOS_FUNCIONES_APPWEB\APRENDIZAJE_CARLITOS_CUENTO_DIA_DEL_NINO_2026-06-29.md`

### Comandos o scripts ejecutados

* `git status --branch --short`
* `Get-Content docs\CONTENIDO_INICIAL_PROMPTS_GPT_IMAGEN_CUENTO_DIA_DEL_NINO_2026-06-29.md -Tail 30`
* `Get-Date -Format "yyyy-MM-dd HH:mm"`

### Resultados verificados

* El documento de prompts existe y quedo completo hasta la seccion de textos iniciales.
* El README referencia el nuevo documento junto con el borrador narrativo.
* El paquete diferencia bosque nativo protegido y plantacion planificada.
* El paquete indica usar modo seguro si no existe autorizacion formal para el personaje Carlitos.

### Pruebas realizadas

* Lectura de inicio y cierre del documento Markdown.
* Verificacion de estado Git antes de preparar el commit.

### Errores o incidentes

* No se detectaron errores tecnicos.
* No se generaron imagenes en esta intervencion; se prepararon prompts para uso en GPT Imagen en linea.

### Soluciones aplicadas

* Se separo el contenido visual operativo del cuento narrativo.
* Se definio una secuencia de laminas para evitar generacion aislada y desordenada.
* Se incorporaron restricciones de derechos, marcas y texto dentro de imagenes.

### Pendientes

* Generar imagenes piloto: portada, lamina 05 y lamina 12.
* Validar consistencia de Carlitos entre imagenes generadas.
* Revisar las imagenes con criterios legal, editorial, tecnico ambiental e institucional.
* Optimizar los archivos finales para web/PDF/redes.

### Riesgos

* Que GPT Imagen genere texto falso, marcas o simbolos institucionales no autorizados.
* Que Carlitos cambie demasiado entre laminas si no se usan referencias visuales.
* Que la plantacion planificada se interprete como reemplazo del bosque nativo.

### Recomendaciones

* Generar pocas imagenes piloto antes de producir toda la serie.
* Mantener una carpeta separada para imagenes candidatas y otra para imagenes aprobadas.
* Registrar cada lote generado con fecha, prompt usado y observaciones de calidad.
