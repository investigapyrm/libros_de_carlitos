# Libros de Carlitos - prototipo editorial

Prototipo inicial para ensayar una edicion digital de la serie:

**Carlitos y la Economia Ambiental Sostenible**

Libro piloto:

**Carlitos y los residuos que se convierten en oportunidad**

## Estado

Este repositorio fue clonado desde `investigapyrm/libros_de_carlitos`, que al inicio de esta preparacion estaba vacio y sin rama por defecto.

La rama `main` ya fue inicializada, empujada al remoto y sincronizada con `origin/main`.

Hito actual verificado: `v0.5.0`, propuesta tecnica-editorial Paracel-FACEN integrada en la seccion `#iniciativas`.

Avance editorial en rama `feature/cuento-dia-del-nino-2026`: borrador interno del cuento **Carlitos y el bosque que guarda abrazos**, pensado como pieza revisable para compartir por el Dia del Nino en Paraguay, 16 de agosto, con base en la antologia propuesta en el PDF Paracel-FACEN. La rama incluye tambien un paquete inicial de contenido, prompts para GPT Imagen y una vista de libro digital con imagenes reales.

Pendiente: confirmar GitHub Pages, autorizaciones editoriales/legales y despliegue GAS si se decide usar la hoja online como fuente publica.

## Contenido de la appweb

```text
index.html              Appweb estatica para GitHub Pages.
styles.css              Diseno responsive con hero animado, misiones, tarjetas y detalle.
app.js                  Render del libro desde JSON local o GAS opcional, interacciones y modo lectura.
data/book.json          Contenido editorial y rutas de imagenes.
data/story-dia-nino.json Datos del cuento digital de Dia del Nino.
assets/generated/       Imagenes finales de la appweb.
docs/                   Instructivos de generacion visual.
gas_src/                Backend Google Apps Script clonado y preparado.
```

Instructivos visuales disponibles:

```text
docs/INSTRUCCIONES_IMAGENES_CARLITOS_APPWEB_2026-06-25.md
docs/INSTRUCCIONES_ICONOS_CARLITOS_APPWEB_2026-06-25.md
docs/CUENTO_DIA_DEL_NINO_CARLITOS_BOSQUE_GUARDA_ABRAZOS_2026-06-29.md
docs/CONTENIDO_INICIAL_PROMPTS_GPT_IMAGEN_CUENTO_DIA_DEL_NINO_2026-06-29.md
docs/INVESTIGACION_LIBRERIAS_LIBRO_DIGITAL_INTERACTIVO_2026-06-29.md
```

## Paquete Dia del Nino 2026

La rama `feature/cuento-dia-del-nino-2026` contiene dos documentos de trabajo:

* `docs/CUENTO_DIA_DEL_NINO_CARLITOS_BOSQUE_GUARDA_ABRAZOS_2026-06-29.md`: borrador narrativo, actividad y criterios de revision.
* `docs/CONTENIDO_INICIAL_PROMPTS_GPT_IMAGEN_CUENTO_DIA_DEL_NINO_2026-06-29.md`: contenido inicial, secuencia de laminas, prompts para GPT Imagen en linea, nombres sugeridos de archivos y control de calidad visual.
* `docs/INVESTIGACION_LIBRERIAS_LIBRO_DIGITAL_INTERACTIVO_2026-06-29.md`: evaluacion de librerias libres para libro digital y criterio de integracion.

La appweb incorpora una vista `#cuento-dia-nino` con formato de libro digital interactivo a pantalla completa. La vista carga 10 paginas desde `data/story-dia-nino.json`, usa las imagenes copiadas desde `J:\Mi unidad\carlitos\cuento_dia_Del_niño`, ofrece controles de avance y progreso, y reserva `StPageFlip` como mejora progresiva para pantallas muy anchas. En escritorio comun y movil prioriza un lector full-bleed propio para que el libro ocupe casi toda la vista.

Uso recomendado:

1. Validar autorizaciones del personaje, autores e instituciones antes de publicar.
2. Revisar las 10 imagenes integradas con criterios editorial, legal, tecnico ambiental e institucional.
3. Optimizar peso de imagenes si se publicara para celulares o aulas con baja conectividad.
4. Revisar que no aparezcan textos, logos, marcas, escudos ni numeros deformes dentro de las imagenes.

## Mejora visual 2026-06-25

La version `v0.2.0` incorpora una experiencia mas atractiva para ninos y docentes:

* hero con imagen real de Carlitos, movimiento suave y ruta de aprendizaje;
* misiones verdes interactivas: separar, medir, transformar y emprender;
* tarjetas visuales con transiciones livianas;
* progreso de lectura por escena;
* modo de lectura persistente `Normal / Comoda / Grande`;
* versionado de `styles.css` y `app.js` para reducir problemas de cache en GitHub Pages;
* soporte `prefers-reduced-motion` para usuarios que prefieren menos movimiento.

Estas decisiones reutilizan criterios de MASTER: animacion didactica con sentido, legibilidad movil, zoom/modo lectura, version visible y visuales evidentes dentro del flujo principal.

## Contenido didactico 2026-06-25

La version `v0.3.0` amplia cada seccion del libro/appweb con contenido editorial de aula:

* objetivo pedagogico;
* pregunta guia;
* aprendizajes esperados;
* guia narrativa;
* pasos para hacer;
* materiales;
* evidencias;
* notas para docentes, comunidad y cuidado.

La app muestra estos bloques solo cuando existen en `data/book.json`, por lo que mantiene compatibilidad con una fuente GAS/Sheets mas simple.

## Correccion de navegacion 2026-06-25

La version `v0.3.1` corrige los botones de navegacion:

* los botones del hero llevan a `#misiones` y `#recorrido`;
* la ruta superior de aprendizaje ahora usa botones reales y selecciona la mision correspondiente;
* las misiones y tarjetas de capitulos llevan al detalle correcto en `#detalle`;
* el hash de la URL se actualiza con cada salto para reducir confusion en GitHub Pages;
* `index.html` actualiza el cache-busting de `styles.css` y `app.js` a `v0.3.1`.

Validacion local realizada: `node --check app.js`, parseo de `data/book.json`, `git diff --check`, captura Playwright CLI y prueba headless de clics sobre `http://127.0.0.1:8787/`.

## Empresas e iniciativas ambientales 2026-06-25

La version `v0.4.0` incorpora el puente que faltaba entre residuos, educacion ambiental y desarrollo economico sostenible:

* se agrega la seccion `Empresas e iniciativas que cuidan`;
* se incorpora la mision `Conectar`, orientada a unir escuela, empresa y comunidad;
* se agregan dos capitulos: `Empresas que cuidan el territorio` y `La ficha de la iniciativa verde`;
* se propone una metodologia editorial para publicar casos sin caer en propaganda: problema, accion, evidencia, indicador, beneficio comunitario y mejora pendiente;
* se actualiza el recorrido para presentar residuos, emprendimientos, productores y empresas ambientalmente responsables como parte de una misma narrativa educativa.

Esta version prepara la appweb para solicitar apoyo editorial a una empresa aliada: el patrocinio puede financiar publicaciones infantiles sobre iniciativas reales que cuidan ambiente y comunidad, siempre que cada caso tenga autorizacion y evidencia verificable.

## Propuesta tecnica-editorial Paracel-FACEN 2026-06-26

La version `v0.5.0` ajusta la seccion publica `#iniciativas` con base en el PDF local:

`J:\Mi unidad\carlitos\propuesta_tecnica_carlitos_paracel_sostenibilidad.pdf`

Cambios principales:

* la seccion se presenta como `Serie Carlitos y el Desarrollo Sostenible integrada a la Estrategia Socioambiental de Paracel`;
* se incorpora la institucion de origen FACEN-UNA y el equipo de autores;
* se registra la linea de enfoque: sostenibilidad industrial, gestion forestal, captura de carbono y monitoreo de biodiversidad;
* se destacan los 31 programas socioambientales de Paracel y el criterio de mas del 30% de contenidos vinculados a sustentabilidad ambiental y social del sector forestal-industrial;
* se incorpora la Propuesta A: antologia de 10 cuentos infantiles para 4 a 10 anos;
* se incorpora la Propuesta B: texto tecnico por capitulos para 7mo grado al 3er ano de la Media;
* se agrega propuesta de valor para area de influencia, inversion social, educacion ambiental, medicion mediante encuestas y uso potencial en reportes de sostenibilidad;
* se mantiene advertencia editorial/legal antes de publicar como material final.

## Imagenes integradas

Las imagenes fueron tomadas de:

`J:\Mi unidad\carlitos\imagenes`

Y copiadas con nombres normalizados a:

```text
assets/generated/carlitos_character_sheet_v01.png
assets/generated/hero_carlitos_residuos_oportunidad_1920x1080.png
assets/generated/cap01_bolsa_hablaba_bajito.png
assets/generated/cap02_mesa_colores.png
assets/generated/cap03_compost_cascaras.png
assets/generated/cap04_viaje_botella_acopio.png
assets/generated/cap05_oportunidad_emprendimiento_verde.png
assets/generated/cierre_feria_segundas_vidas_1920x1080.png
```

El visor usa estas imagenes como portada, hoja de personaje, capitulos visuales y cierre comunitario.

## Fuente online

Hoja de contenido:

`https://docs.google.com/spreadsheets/d/1y5d5aIUYQItqP9rsX7wv-oMb3oqDbx8AKLQo11aAPco/edit`

Proyecto Apps Script:

`1o2UTlon9N7rhYK03OyFbjbmuYGiEiRfDkThQk7v-Q7LKxhBRo1iiKVms`

## Uso local

Abrir `index.html` directamente en el navegador o servir la carpeta con cualquier servidor estatico.

La app carga por defecto `data/book.json`. Si luego se despliega el Apps Script como Web App, se puede configurar la URL en `app.js`:

```js
const GAS_ENDPOINT = "";
```

Servidor local usado en esta preparacion:

```powershell
python -m http.server 8787 --bind 127.0.0.1
```

URL local:

`http://127.0.0.1:8787/`

## Apps Script

El codigo en `gas_src/Codigo.js` lee la hoja `Hoja 1` y devuelve JSON para el visor.

Antes de publicar o hacer `clasp push`, verificar:

1. Cuenta autenticada en `clasp`.
2. Permiso de edicion sobre el proyecto GAS.
3. Que el script remoto pueda ser reemplazado.
4. Despliegue como Web App con permisos correctos.

## Derechos y permisos

Las imagenes integradas deben tratarse como material de muestra interna hasta confirmar autorizaciones. Antes de publicar, imprimir o difundir:

* confirmar autorizacion de los titulares de la obra/personaje;
* validar condiciones de licencia;
* autorizar uso de imagen, nombre, logos y marcas;
* revisar tecnicamente contenidos ambientales y casos reales.

No usar este prototipo como publicacion final sin validacion editorial, legal e institucional.

## Proximo paso

1. Revisar editorial, tecnica y legalmente el cuento de Dia del Nino.
2. Confirmar si se puede usar oficialmente la figura de Carlitos.
3. Definir si la pieza publica mencionara a Paracel o quedara como cuento educativo sin marcas visibles.
4. Producir imagenes piloto con el paquete de prompts GPT Imagen.
5. Activar o verificar GitHub Pages sobre la rama `main`.
6. Optimizar imagenes para web antes de difusion publica.
7. Desplegar GAS como Web App y conectar `GAS_ENDPOINT`.
8. Agregar PWA/offline si la app se usara en aulas con conectividad irregular.
