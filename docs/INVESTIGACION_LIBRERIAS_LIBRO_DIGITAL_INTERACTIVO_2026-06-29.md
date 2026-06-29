# Investigacion de librerias para libro digital interactivo

Fecha: 2026-06-29

Proyecto: Libros de Carlitos

Objetivo: identificar codigo libre aprovechable para preparar una vista de cuento digital interactivo compatible con GitHub Pages, HTML, CSS y JavaScript sin proceso de compilacion.

## Criterios de seleccion

* Licencia permisiva y verificable.
* Uso directo desde navegador.
* Sin dependencia obligatoria de React, Vue, jQuery o backend.
* Compatible con contenido HTML, no solo imagenes.
* Experiencia usable en escritorio y movil.
* Degradacion aceptable si falla el CDN.

## Repositorio seleccionado

Repositorio: `https://github.com/Nodlik/StPageFlip`

Paquete npm/CDN: `page-flip@2.0.7`

Licencia: MIT.

Razones:

* biblioteca JavaScript sin dependencias;
* permite crear efecto realista de paso de pagina;
* permite cargar paginas desde HTML con `loadFromHTML`;
* expone metodos simples como `flipNext`, `flipPrev` y `flip`;
* funciona como mejora progresiva sobre una vista HTML normal;
* se puede cargar desde `jsdelivr` sin modificar el flujo de GitHub Pages.

URL CDN usada:

```text
https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.min.js
```

## Criterio de integracion aplicado

La app no depende exclusivamente de la libreria externa. La vista del cuento renderiza primero un lector HTML propio con:

* paginas desde `data/story-dia-nino.json`;
* botones Anterior y Siguiente;
* indice de paginas;
* barra de progreso;
* navegacion por teclado en escritorio;
* modo responsive movil.

Luego, si `StPageFlip` carga correctamente y el usuario no tiene `prefers-reduced-motion`, se activa el efecto de libro. Si el CDN falla, el lector propio sigue funcionando.

## Archivos afectados

* `index.html`
* `app.js`
* `styles.css`
* `data/story-dia-nino.json`

## Riesgos

* CDN no disponible en aulas sin conexion.
* Cambios futuros del paquete npm si se usa una URL sin version fija.
* Efecto de pagina menos adecuado en pantallas pequenas.

## Mitigaciones

* Version fijada en `page-flip@2.0.7`.
* Fallback HTML/CSS sin dependencia externa.
* En movil se prioriza el lector simple por pagina.
* No se copia codigo de terceros dentro del repositorio; se consume la libreria por CDN con referencia documentada.

## Proximo paso recomendado

Si el cuento se publica como pieza final y debe funcionar offline, copiar una version minificada aprobada de la libreria dentro de `assets/vendor/page-flip/`, conservar la licencia MIT y actualizar la bitacora.
