# Libros de Carlitos - prototipo editorial

Prototipo inicial para ensayar una edicion digital de la serie:

**Carlitos y la Economia Ambiental Sostenible**

Libro piloto:

**Carlitos y los residuos que se convierten en oportunidad**

## Estado

Este repositorio fue clonado desde `investigapyrm/libros_de_carlitos`, que al inicio de esta preparacion estaba vacio y sin rama por defecto.

La rama `main` ya fue inicializada y empujada al remoto. Ultimo commit verificado:

`15b48cb3f7cd46adc0acc694be4e14b02ee92aaa` - `Mejora experiencia visual Carlitos`

Pendiente: confirmar GitHub Pages, autorizaciones editoriales/legales y despliegue GAS si se decide usar la hoja online como fuente publica.

## Contenido de la appweb

```text
index.html              Appweb estatica para GitHub Pages.
styles.css              Diseno responsive con hero animado, misiones, tarjetas y detalle.
app.js                  Render del libro desde JSON local o GAS opcional, interacciones y modo lectura.
data/book.json          Contenido editorial y rutas de imagenes.
assets/generated/       Imagenes finales de la appweb.
docs/                   Instructivos de generacion visual.
gas_src/                Backend Google Apps Script clonado y preparado.
```

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

1. Confirmar si se puede usar oficialmente la figura de Carlitos.
2. Activar o verificar GitHub Pages sobre la rama `main`.
3. Optimizar imagenes para web antes de difusion publica.
4. Desplegar GAS como Web App y conectar `GAS_ENDPOINT`.
5. Agregar PWA/offline si la app se usara en aulas con conectividad irregular.
