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

## 2026-06-29 19:04

### Proyecto

* Nombre: Libros de Carlitos - Vista de libro digital interactivo
* Cliente o institucion: PARACEL / FACEN-UNA / investigapyrm
* Ruta local: `C:\Users\Diego\OneDrive - PARACEL S.A\MONITOREO_IMPACTO_SOCIAL_PARACEL\PROYECTO_CARLITOS\libros_de_carlitos`
* Repositorio: `https://github.com/investigapyrm/libros_de_carlitos.git`
* URL local de prueba: `http://127.0.0.1:8792/#cuento-dia-nino`
* Rama de trabajo: `feature/cuento-dia-del-nino-2026`
* Responsable: Codex
* Version: `v0.6.0`

### Objetivo de la intervencion

* Preparar una vista dentro de la appweb para alojar el cuento de Dia del Nino con formato de libro digital interactivo.
* Investigar codigo libre en GitHub que pueda aprovecharse sin cambiar la arquitectura estatica HTML/CSS/JS compatible con GitHub Pages.

### Diagnostico inicial

* La app ya tenia visor editorial general y documentos del cuento, pero no una experiencia especifica de lectura tipo libro.
* Las imagenes definitivas del cuento todavia no existen; usar imagenes del prototipo anterior podia introducir elementos no deseados.
* La solucion debia funcionar aunque una libreria externa no cargara.

### Acciones realizadas

* Se investigo `Nodlik/StPageFlip`, libreria MIT para efecto de paso de pagina, sin dependencias y usable por script en navegador.
* Se creo `data/story-dia-nino.json` con 12 paginas del cuento y rutas esperadas de imagenes definitivas.
* Se agrego la vista `#cuento-dia-nino` a la app.
* Se agregaron controles `Anterior` y `Siguiente`, indice numerico, barra de progreso, panel de lectura y actividad `Regalos que crecen`.
* Se integro `StPageFlip` como mejora progresiva desde CDN fijo `page-flip@2.0.7`.
* Se mantuvo fallback HTML/CSS si el CDN falla, si el usuario prefiere reducir movimiento o si se usa movil.
* Se ajusto cache-busting de `index.html` a `v0.6.0`.
* Se documento la investigacion en `docs/INVESTIGACION_LIBRERIAS_LIBRO_DIGITAL_INTERACTIVO_2026-06-29.md`.

### Archivos modificados

* `index.html`
* `app.js`
* `styles.css`
* `README.md`
* `BITACORA_LIBROS_DE_CARLITOS_PARACEL_REPO.md`
* `data/story-dia-nino.json`
* `docs/INVESTIGACION_LIBRERIAS_LIBRO_DIGITAL_INTERACTIVO_2026-06-29.md`
* `G:\Mi unidad\MANUAL_MAESTRO_FORMATOS_FUNCIONES_APPWEB\APRENDIZAJE_CARLITOS_CUENTO_DIA_DEL_NINO_2026-06-29.md`

### Comandos o scripts ejecutados

* `Invoke-WebRequest` para verificar CDN `page-flip@2.0.7`.
* `node --check app.js`
* `node -e "JSON.parse(... data/book.json ...); JSON.parse(... data/story-dia-nino.json ...)"`
* `git diff --check`
* `python -m http.server 8792 --bind 127.0.0.1`
* `npx playwright screenshot --wait-for-timeout=5000 "http://127.0.0.1:8792/?v=0.6.0-test#cuento-dia-nino" "tmp_storybook_desktop_v2.png"`
* `npx playwright screenshot --viewport-size="390,844" --wait-for-timeout=3000 "http://127.0.0.1:8792/?v=0.6.0-mobile#cuento-dia-nino" "tmp_storybook_mobile.png"`

### Resultados verificados

* La app carga localmente con HTTP `200` en `http://127.0.0.1:8792/`.
* `app.js` no presenta errores de sintaxis.
* `data/book.json` y `data/story-dia-nino.json` parsean correctamente.
* La vista `#cuento-dia-nino` aparece en escritorio y movil.
* En escritorio se activa el formato de libro; en movil queda una vista simple por pagina.
* Al faltar imagenes definitivas, se muestra placeholder visual sin logos, banderas ni imagenes ajenas.

### Pruebas realizadas

* Validacion sintactica JavaScript.
* Validacion JSON.
* Verificacion de whitespace con `git diff --check`.
* Captura Playwright de escritorio.
* Captura Playwright movil.
* Revision visual de las capturas.

### Errores o incidentes

* El primer comando Playwright movil fallo por formato de `--viewport-size`; se corrigio usando `--viewport-size="390,844"`.
* La primera captura mostro una imagen provisoria del prototipo anterior con elementos no deseados para el cuento; se reemplazaron las rutas por las imagenes definitivas esperadas y se activo placeholder visual.

### Soluciones aplicadas

* Integracion por mejora progresiva: lector propio primero, PageFlip solo si esta disponible.
* Version fija de CDN para evitar cambios inesperados.
* Fallback visual si las imagenes definitivas no existen.
* Separacion de datos del cuento en JSON.

### Pendientes

* Generar y aprobar las 12 imagenes definitivas del cuento.
* Reemplazar placeholders por imagenes finales optimizadas.
* Revisar si el CDN externo es aceptable para publicacion final o si se debe copiar la libreria a `assets/vendor/` conservando licencia MIT.
* Probar la URL publica de GitHub Pages cuando la rama se fusione o publique.

### Riesgos

* Dependencia de CDN en aulas sin conexion.
* Derechos pendientes sobre personaje, autores, imagenes y marcas.
* El efecto de pagina puede ser menos conveniente en pantallas pequenas; por eso se fuerza fallback movil.

### Recomendaciones

* Si se requiere offline o PWA, alojar localmente la libreria `page-flip.browser.min.js` y su licencia.
* Mantener el contenido del cuento en JSON para futuras versiones o traducciones.
* Generar primero tres imagenes piloto antes de completar toda la serie visual.

## 2026-06-29 19:24

### Proyecto

* Nombre: Libros de Carlitos - Integracion de imagenes del cuento Dia del Nino
* Cliente o institucion: PARACEL / FACEN-UNA / investigapyrm
* Ruta local: `C:\Users\Diego\OneDrive - PARACEL S.A\MONITOREO_IMPACTO_SOCIAL_PARACEL\PROYECTO_CARLITOS\libros_de_carlitos`
* Repositorio: `https://github.com/investigapyrm/libros_de_carlitos.git`
* Fuente de imagenes: `J:\Mi unidad\carlitos\cuento_dia_Del_niño`
* URL local de prueba: `http://127.0.0.1:8792/#cuento-dia-nino`
* Rama de trabajo: `feature/cuento-dia-del-nino-2026`
* Responsable: Codex
* Version: `v0.6.1`

### Objetivo de la intervencion

* Aprovechar las imagenes generadas para el cuento de Dia del Nino y armar las paginas del libro dentro de la appweb.
* Ajustar la vista para que el libro abarque casi toda la pantalla, especialmente en la seccion `#cuento-dia-nino`.

### Diagnostico inicial

* La carpeta fuente contenia 10 imagenes PNG generadas el 2026-06-29.
* El JSON del cuento tenia 12 paginas previstas, por lo que las dos ultimas quedaban sin imagen real.
* En escritorio la vista anterior funcionaba, pero se sentia como una tarjeta dentro de la pagina y no como libro de pantalla completa.
* En movil habia que evitar grandes bloques vacios y mantener lectura clara.

### Acciones realizadas

* Se copiaron las 10 imagenes desde `J:\Mi unidad\carlitos\cuento_dia_Del_niño` a `assets/generated/` con nombres normalizados.
* Se corrigio el orden natural de archivos para evitar que `(10)` quedara antes de `(8)` y `(9)`.
* Se creo una hoja de contacto temporal para revisar la secuencia visual y luego se elimino.
* Se ajusto `data/story-dia-nino.json` de 12 a 10 paginas visuales reales.
* Se fusiono el cierre narrativo en la ultima pagina disponible.
* Se actualizo `APP_VERSION` y cache-busting a `v0.6.1`.
* Se redisenaron los estilos del lector para modo full-bleed: imagen grande, texto sobre/bajo pagina, controles claros y progreso.
* Se mantuvo `StPageFlip` solo como mejora progresiva para pantallas muy anchas; en escritorio comun y movil se prioriza el lector propio a pantalla completa.

### Archivos modificados

* `index.html`
* `app.js`
* `styles.css`
* `README.md`
* `BITACORA_LIBROS_DE_CARLITOS_PARACEL_REPO.md`
* `data/story-dia-nino.json`
* `assets/generated/dia_nino_carlitos_bosque_abrazos_portada_16x9.png`
* `assets/generated/dia_nino_carlitos_bosque_abrazos_lamina_02_pregunta_regalo_crece.png`
* `assets/generated/dia_nino_carlitos_bosque_abrazos_lamina_03_regalar_sombra.png`
* `assets/generated/dia_nino_carlitos_bosque_abrazos_lamina_04_camino_vivero.png`
* `assets/generated/dia_nino_carlitos_bosque_abrazos_lamina_05_bosque_nativo_plantacion.png`
* `assets/generated/dia_nino_carlitos_bosque_abrazos_lamina_06_calor_invisible.png`
* `assets/generated/dia_nino_carlitos_bosque_abrazos_lamina_07_medir_cuidar.png`
* `assets/generated/dia_nino_carlitos_bosque_abrazos_lamina_08_camara_trampa_biodiversidad.png`
* `assets/generated/dia_nino_carlitos_bosque_abrazos_lamina_09_tarjetas_cuidado.png`
* `assets/generated/dia_nino_carlitos_bosque_abrazos_lamina_10_plantar_promesa.png`
* `G:\Mi unidad\MANUAL_MAESTRO_FORMATOS_FUNCIONES_APPWEB\APRENDIZAJE_CARLITOS_CUENTO_DIA_DEL_NINO_2026-06-29.md`

### Comandos o scripts ejecutados

* `Get-ChildItem -LiteralPath "J:\Mi unidad\carlitos\cuento_dia_Del_niño" -File`
* `Copy-Item` con nombres normalizados en `assets/generated/`
* `node --check app.js`
* `node -e "JSON.parse(require('fs').readFileSync('data/story-dia-nino.json','utf8'))"`
* `npx playwright screenshot --wait-for-timeout=3000 "http://127.0.0.1:8792/?v=0.6.1-final#cuento-dia-nino" ...`
* `npx playwright screenshot --viewport-size="390,844" --wait-for-timeout=2000 "http://127.0.0.1:8792/?v=0.6.1-mobile-clean2#cuento-dia-nino" ...`

### Resultados verificados

* Las 10 imagenes se copiaron al repositorio con nombres consistentes.
* Las imagenes tienen resoluciones entre `941x1672` y `1916x821`.
* La vista de escritorio muestra el libro grande, con la ilustracion ocupando casi todo el escenario.
* La vista movil muestra la imagen arriba y el texto abajo, sin bloque oscuro sobrante.
* El contador de paginas ahora indica `Pagina 1 de 10`.

### Pruebas realizadas

* Validacion sintactica de JavaScript.
* Validacion JSON del cuento.
* Capturas Playwright de escritorio y movil.
* Revision visual de capturas.
* Eliminacion de capturas temporales antes de preparar el commit.

### Errores o incidentes

* El primer copiado ordeno `(10)` antes de `(8)` y `(9)` por orden alfabetico. Se corrigio usando orden natural numerico por parentesis.
* El encabezado partia el titulo letra por letra porque los metadatos largos ocupaban demasiado ancho. Se compacto el encabezado.
* En movil aparecia una franja oscura por reglas heredadas de altura y `aspect-ratio`; se ajusto la vista movil a flujo natural.

### Soluciones aplicadas

* Nombres ASCII normalizados para evitar problemas de ruta y publicacion.
* Libro en modo full-bleed por defecto.
* Imagenes en proporcion real en movil.
* PageFlip limitado a pantallas muy anchas para evitar layouts torpes en 1280px o celulares.

### Pendientes

* Revisar legal/editorialmente las 10 imagenes antes de publicacion formal.
* Optimizar peso de imagenes para web si se publicara masivamente.
* Verificar GitHub Pages despues de fusionar o publicar la rama.

### Riesgos

* Las imagenes PNG pesan entre 1.7 MB y 2.7 MB cada una; pueden ser pesadas para celulares con baja conectividad.
* La consistencia visual y derechos del personaje requieren validacion humana.
* Si se requiere offline real, conviene optimizar y cachear assets.

### Recomendaciones

* Crear versiones WebP o JPG optimizadas antes de difusion publica.
* Conservar los PNG originales como candidatos de alta calidad.
* No publicar hasta cerrar autorizaciones de personaje, autoria e imagenes.

## 2026-06-29 19:40

### Proyecto

* Nombre: Libros de Carlitos - Ajuste inmersivo de doble pagina
* Cliente o institucion: PARACEL / FACEN-UNA / investigapyrm
* Ruta local: `C:\Users\Diego\OneDrive - PARACEL S.A\MONITOREO_IMPACTO_SOCIAL_PARACEL\PROYECTO_CARLITOS\libros_de_carlitos`
* Repositorio: `https://github.com/investigapyrm/libros_de_carlitos.git`
* URL local de prueba: `http://127.0.0.1:8792/#cuento-dia-nino`
* Rama de trabajo: `feature/cuento-dia-del-nino-2026`
* Responsable: Codex
* Version: `v0.6.2`

### Objetivo de la intervencion

* Hacer que el libro ocupe absolutamente toda la pantalla al abrir la vista del cuento.
* Mostrar ambas paginas del libro en escritorio.
* Solapar el texto sobre las imagenes con bloques semitransparentes que no tapen completamente la ilustracion.

### Diagnostico inicial

* La version `v0.6.1` ya integraba imagenes reales, pero el lector todavia se sentia como una seccion dentro de la pagina.
* El texto quedaba debajo o sobre una franja demasiado amplia en algunas vistas.
* El avance era pagina por pagina, no como doble pagina abierta.

### Acciones realizadas

* Se cambio `#cuento-dia-nino` a visor inmersivo de `100svh`.
* Se convirtio el lector propio en una doble pagina para escritorio.
* Se ajusto la navegacion para avanzar de a dos paginas.
* Se cambio el estado de pagina a `Paginas 1-2 de 10`, etc.
* Se crearon bloques de texto semitransparentes con desenfoque suave sobre cada ilustracion.
* Se redujo el ancho del texto para que no tape completamente la imagen.
* Se dejaron los controles flotantes sobre el libro.
* En movil se mantuvo una pagina por vez por legibilidad, con controles flotantes abajo.
* Se actualizo version/cache a `v0.6.2`.

### Archivos modificados

* `index.html`
* `app.js`
* `styles.css`
* `README.md`
* `BITACORA_LIBROS_DE_CARLITOS_PARACEL_REPO.md`
* `G:\Mi unidad\MANUAL_MAESTRO_FORMATOS_FUNCIONES_APPWEB\APRENDIZAJE_CARLITOS_CUENTO_DIA_DEL_NINO_2026-06-29.md`

### Comandos o scripts ejecutados

* `node --check app.js`
* `node -e "JSON.parse(require('fs').readFileSync('data/story-dia-nino.json','utf8'))"`
* `python -m http.server 8792 --bind 127.0.0.1` o reutilizacion del servidor local activo
* `npx playwright screenshot --wait-for-timeout=2500 "http://127.0.0.1:8792/?v=0.6.2-spread#cuento-dia-nino" "tmp_storybook_spread_desktop.png"`
* `npx playwright screenshot --viewport-size="390,844" --wait-for-timeout=2500 "http://127.0.0.1:8792/?v=0.6.2-mobile#cuento-dia-nino" "tmp_storybook_spread_mobile.png"`

### Resultados verificados

* En escritorio se muestran dos paginas simultaneas.
* El texto queda sobre la imagen en bloques semitransparentes y no cubre toda la ilustracion.
* El visor ocupa la pantalla completa de la seccion.
* En movil la pagina ocupa la pantalla y mantiene legibilidad.

### Pruebas realizadas

* Validacion sintactica JavaScript.
* Validacion JSON.
* Captura Playwright de escritorio.
* Captura Playwright movil.
* Revision visual de capturas.

### Errores o incidentes

* PowerShell no acepto `&&` como separador al preparar el commit; se reejecutaron los comandos de Git por separado.
* Se decidio mantener una pagina por vez en movil porque dos paginas simultaneas no son legibles en 390px de ancho.

### Soluciones aplicadas

* Spread de doble pagina para escritorio.
* Texto tipo vidrio semitransparente.
* Controles flotantes.
* Navegacion por spread de dos paginas.

### Pendientes

* Revisar la vista en GitHub Pages luego de publicar la rama.
* Optimizar imagenes antes de difusion publica.
* Validar derechos de personaje, autores e imagenes.

### Riesgos

* Imagenes pesadas para conectividad baja.
* En pantallas muy pequenas la doble pagina no es legible; por eso se usa pagina unica en movil.

### Recomendaciones

* Mantener doble pagina solo desde tablet/escritorio.
* En futuras versiones, agregar boton de pantalla completa nativo del navegador si se desea modo kiosco.

## 2026-06-29 19:52

### Proyecto

* Nombre: Libros de Carlitos - Biblioteca inicial de ediciones
* Cliente o institucion: PARACEL / FACEN-UNA / investigapyrm
* Ruta local: `C:\Users\Diego\OneDrive - PARACEL S.A\MONITOREO_IMPACTO_SOCIAL_PARACEL\PROYECTO_CARLITOS\libros_de_carlitos`
* Repositorio: `https://github.com/investigapyrm/libros_de_carlitos.git`
* URL local de prueba: `http://127.0.0.1:8792/#biblioteca`
* Rama de trabajo: `feature/cuento-dia-del-nino-2026`
* Responsable: Codex
* Version: `v0.7.0`

### Objetivo de la intervencion

* Dejar una vista inicial simple donde se listen diferentes ediciones.
* Permitir abrir cada edicion disponible con un clic en una vista propia de libro digital.
* Evitar interfaces cargadas para que el protagonismo sea de los cuentos y sus imagenes.

### Diagnostico inicial

* La app entraba directamente desde una experiencia heredada con muchas secciones editoriales.
* El lector del Dia del Nino funcionaba, pero no existia un catalogo de ediciones.
* La arquitectura no estaba preparada para que cada cuento cargara su propio JSON.

### Acciones realizadas

* Se creo `data/editions.json` como catalogo de la biblioteca digital.
* Se agrego una segunda edicion disponible, `residuos-oportunidad`, usando imagenes ya existentes.
* Se creo `data/story-residuos-oportunidad.json` con paginas breves para lectura tipo cuento.
* Se cambio la ruta inicial a una biblioteca simple en `#biblioteca`.
* Se agregaron rutas compartibles `#libro/<id>` para abrir cada cuento.
* Se mantuvo `#cuento-dia-nino` como alias hacia `#libro/cuento-dia-nino-2026`.
* Se agrego boton `Biblioteca` dentro del lector.
* Se actualizo version/cache a `v0.7.0`.

### Archivos modificados

* `index.html`
* `app.js`
* `styles.css`
* `README.md`
* `data/editions.json`
* `data/story-residuos-oportunidad.json`
* `BITACORA_LIBROS_DE_CARLITOS_PARACEL_REPO.md`

### Comandos o scripts ejecutados

* `node --check app.js`
* `node -e "for (const f of ['data/book.json','data/editions.json','data/story-dia-nino.json','data/story-residuos-oportunidad.json']) { JSON.parse(require('fs').readFileSync(f,'utf8')); } console.log('JSON OK')"`
* `git diff --check`
* `npx playwright screenshot --wait-for-timeout=2000 "http://127.0.0.1:8792/?v=0.7.0-library2#biblioteca" "tmp_library_desktop.png"`
* `npx playwright screenshot --viewport-size="390,844" --wait-for-timeout=2000 "http://127.0.0.1:8792/?v=0.7.0-mobile3#biblioteca" "tmp_library_mobile.png"`
* `npx playwright screenshot --wait-for-timeout=2000 "http://127.0.0.1:8792/?v=0.7.0-residuos3#libro/residuos-oportunidad" "tmp_reader_residuos_desktop.png"`
* `npx playwright screenshot --wait-for-timeout=1800 "http://127.0.0.1:8792/?v=0.7.0-alias#cuento-dia-nino" "tmp_reader_alias.png"`

### Resultados verificados

* La vista inicial muestra una biblioteca simple con dos ediciones disponibles.
* Cada edicion disponible abre una ruta propia de lector: `#libro/cuento-dia-nino-2026` y `#libro/residuos-oportunidad`.
* La biblioteca desktop muestra portadas grandes, textos breves y botones completos.
* La biblioteca movil muestra el boton `Abrir libro` de la primera edicion dentro del primer viewport y deja ver el inicio de la segunda.
* El lector de residuos abre en doble pagina sin que el titulo largo invada el toolbar o las paginas.
* El alias historico `#cuento-dia-nino` sigue abriendo el lector del Dia del Nino.

### Pruebas realizadas

* Validacion sintactica JavaScript.
* Validacion JSON de cuatro archivos de datos.
* Validacion de espacios y errores de diff.
* Captura Playwright de biblioteca desktop.
* Captura Playwright de biblioteca movil.
* Captura Playwright de lector de residuos desktop.
* Captura Playwright del alias historico.
* Revision visual de capturas.

### Errores o incidentes

* Sin incidentes registrados durante la implementacion.

### Soluciones aplicadas

* Catalogo declarativo de ediciones.
* Vista inicial liviana con tarjetas de portada.
* Lector reutilizable por edicion.
* Rutas hash simples compatibles con GitHub Pages.

### Pendientes

* Validar sintaxis JavaScript, JSON y capturas visuales.
* Revisar GitHub Pages luego de publicar.
* Optimizar imagenes antes de difusion publica.
* Validar derechos de personaje, autores e imagenes.

### Riesgos

* Las imagenes siguen siendo pesadas para celulares con baja conectividad.
* Las ediciones en preparacion no deben presentarse como publicadas.
* Si se agregan muchos cuentos, conviene paginar o filtrar la biblioteca.

### Recomendaciones

* Mantener el catalogo en `data/editions.json` como fuente unica para nuevas ediciones.
* Cada cuento debe tener su propio `data/story-*.json` con textos breves y rutas de imagen normalizadas.
* Conservar la portada simple: pocas palabras, imagenes grandes y un boton claro para abrir.

## 2026-06-29 20:11

### Proyecto

* Nombre: Libros de Carlitos - Publicacion GitHub Pages biblioteca v0.7.0
* Cliente o institucion: PARACEL / FACEN-UNA / investigapyrm
* Ruta local: `C:\Users\Diego\OneDrive - PARACEL S.A\MONITOREO_IMPACTO_SOCIAL_PARACEL\PROYECTO_CARLITOS\libros_de_carlitos`
* Repositorio: `https://github.com/investigapyrm/libros_de_carlitos.git`
* URL publica: `https://investigapyrm.github.io/libros_de_carlitos/`
* Rama publicada: `main`
* Responsable: Codex
* Version: `v0.7.0`

### Objetivo de la intervencion

* Publicar en GitHub Pages la biblioteca inicial de ediciones y proveer el enlace publico.

### Diagnostico inicial

* La URL publica respondia `200`, pero todavia servia `APP_VERSION = "v0.5.0"`.
* El archivo publico `data/editions.json` respondia `404`, por lo que la biblioteca nueva aun no estaba publicada.

### Acciones realizadas

* Se cambio de `feature/cuento-dia-del-nino-2026` a `main`.
* Se aplico fast-forward de `main` hasta `b25c44b`.
* Se hizo `git push origin main`.
* Se espero la propagacion de GitHub Pages.
* Se verifico nuevamente la URL publica.

### Archivos modificados

* `BITACORA_LIBROS_DE_CARLITOS_PARACEL_REPO.md`

### Comandos o scripts ejecutados

* `git checkout main`
* `git merge --ff-only feature/cuento-dia-del-nino-2026`
* `git push origin main`
* `Invoke-WebRequest https://investigapyrm.github.io/libros_de_carlitos/app.js?v=verify-2`
* `Invoke-WebRequest https://investigapyrm.github.io/libros_de_carlitos/data/editions.json?v=verify-2`
* `Invoke-WebRequest https://investigapyrm.github.io/libros_de_carlitos/data/story-residuos-oportunidad.json?v=verify-2`

### Resultados verificados

* `app.js` publico devuelve `APP_VERSION = "v0.7.0"`.
* `index.html` publico referencia `v=0.7.0`.
* `data/editions.json` publico responde `200` y titulo `Biblioteca digital de Carlitos`.
* `data/story-residuos-oportunidad.json` publico responde `200` y `id = residuos-oportunidad`.

### Pruebas realizadas

* Verificacion HTTP publica de `index.html`.
* Verificacion HTTP publica de `app.js`.
* Verificacion HTTP publica del catalogo de ediciones.
* Verificacion HTTP publica del JSON del segundo cuento.

### Errores o incidentes

* GitHub Pages tardo unos segundos en pasar de `v0.5.0` a `v0.7.0`; se espero y se volvio a verificar.

### Soluciones aplicadas

* Publicacion por fast-forward a `main`.
* Cache-busting por query string en archivos CSS/JS y consultas de verificacion.

### Pendientes

* Validar visualmente la URL publica desde navegador de usuario final.
* Optimizar imagenes antes de difusion amplia.
* Validar derechos de personaje, autores e imagenes.

### Riesgos

* Las imagenes PNG siguen siendo pesadas para conectividad baja.
* GitHub Pages puede mantener cache temporal en algunos navegadores.

### Recomendaciones

* Compartir preferentemente `https://investigapyrm.github.io/libros_de_carlitos/#biblioteca`.
* Para lectura directa del cuento del Dia del Nino usar `#libro/cuento-dia-nino-2026`.
* Para lectura directa del cuento de residuos usar `#libro/residuos-oportunidad`.
