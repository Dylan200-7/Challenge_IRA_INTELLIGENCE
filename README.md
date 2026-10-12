# IRA INTELLIGENCE

**Autor: QUISPE CHARRES MATHIAS DYLAN HENRY**  
**Proyecto individual.** Universidad Peruana Cayetano Heredia (UPCH).  
Carrera: Ingeniería Informática. Curso: Machine Learning.  
Docente: Yannick Patrick Carrasco Merma.  
Challenge Individual — Pipeline de Machine Learning, caso B: Infecciones Respiratorias Agudas (IRA).

## Abrir la plataforma

Abre `index.html` en un navegador moderno. La web no requiere instalación, compilación, backend, claves ni servicios de pago. Funciona también en GitHub Pages dentro de un subdirectorio de repositorio porque utiliza rutas relativas.

La bienvenida dura 4.3 segundos, se puede omitir y se muestra una vez por sesión de pestaña. Con movimiento reducido se omite automáticamente. Para volver a verla, abre una nueva sesión o borra el almacenamiento de sesión del sitio. Los recursos descargables se encuentran en Documentación.

## Organización

```text
index.html                 Entrada principal
css/style.css              Diseño responsive, efectos y accesibilidad
js/config.js               Enlaces reales de GitHub y Colab
js/main.js                 Navegación, bienvenida, grafos y pipeline
js/bfs.js                  Grafo, traza BFS y código Python equivalente
js/charts.js               Mínimos cuadrados y gráficos SVG interactivos
assets/favicon.svg         Icono local
datos/ira_dataset.csv       Datos observados del enunciado
notebooks/                 Dos notebooks reproducibles
docs/documentacion.md      Metodología, limitaciones y referencias
docs/espacio-estados.md     Grafo, operadores y restricciones
docs/presentacion-caso.md   Guion para presentar los cuatro apartados
.nojekyll                  Publicación de archivos estáticos
```

## Publicar gratuitamente en GitHub Pages

1. Inicia sesión en tu cuenta de GitHub y crea un repositorio público (por ejemplo, con el nombre que prefieras para este proyecto). No se ha creado ni publicado un repositorio desde esta entrega.
2. En **Add file → Upload files**, carga **el contenido de esta carpeta**, incluidas sus subcarpetas. `index.html` debe quedar en la raíz del repositorio; evita subir el ZIP sin descomprimir o una carpeta contenedora adicional. Confirma los archivos con **Commit changes**. Para conservar archivos ocultos como `.nojekyll`, también puedes usar GitHub Desktop o Git.
3. Abre **Settings → Pages**. En **Build and deployment**, elige **Deploy from a branch**.
4. Selecciona la rama `main` y la carpeta **/(root)**. Guarda.
5. Espera a que termine la publicación y abre el enlace que GitHub muestre en esa misma sección. No se incluye una URL inventada: depende de tu cuenta y repositorio.
6. Revisa la web en una ventana nueva y en móvil. Las modificaciones que confirmes en la rama seleccionada se reflejarán en futuras publicaciones.

Guía oficial consultada: https://docs.github.com/en/pages/quickstart (12-oct-2026). El código es estático y no necesita un plan de pago; un repositorio público permite utilizar GitHub Pages en GitHub Free. Las condiciones y disponibilidad dependen de GitHub.

## Enlaces de Google Colab y GitHub

1. Sube cada notebook a tu Google Drive o ábrelo con la opción de subir notebook de Colab.
2. Ejecuta sus celdas. Si deseas que el docente pueda verlo, configura el acceso adecuado en **Compartir** y copia el enlace verdadero de cada notebook.
3. Edita `js/config.js`: coloca el enlace de tu repositorio en `github`, el de BFS en `colabBfs` y el de regresión en `colabModelo`, entre las comillas correspondientes. Usa URLs HTTPS.
4. Guarda y vuelve a subir ese archivo. Los botones abrirán los enlaces configurados.

Mientras no haya enlaces, los botones muestran un diálogo explicativo con acceso a esta guía. Las descargas locales de notebooks, dataset y documentación sí están disponibles desde la entrega. No se simula la conexión con un repositorio ni con un notebook original no proporcionado.

## Las cuatro actividades (5 puntos cada una)

| Actividad | Ubicación | Evidencia |
|---|---|---|
| Presentación del caso y problema | El problema | Contexto, cifras, justificación y autor |
| Espacio de estados | Espacio de estados | Siete nodos, ocho relaciones, operadores y restricciones |
| Pipeline de razonamiento, búsqueda y resultados | AI reasoning engine + Resultados | BFS real, cola, visitados, pasos, ruta y código |
| Pipeline de predicción y visualización | Predictive intelligence + Resultados | Datos, fit, predict, gráfico interactivo y alcance |

## Reproducibilidad y límites

Los notebooks de esta entrega fueron creados a partir del enunciado y del fragmento de regresión proporcionado; **no son copias cotejadas con notebooks originales**, porque no se adjuntaron. El grafo y su orden de vecinos respetan el enunciado. No se alteró ningún archivo original del estudiante.

En el navegador, BFS se ejecuta realmente en JavaScript. La animación muestra el estado de la cola después de extraer un nodo y añadir sus vecinos aún no descubiertos. `visitados` son nodos ya extraídos; el conjunto `descubiertos` evita insertar E4 tres veces. Las implementaciones Python y JavaScript comparten ese comportamiento.

El modelo Python usa `LinearRegression` de scikit-learn. La web calcula en JavaScript la misma recta de mínimos cuadrados para visualizarla: no ejecuta Python ni un entrenamiento remoto. Pendiente: −89,100 episodios/año. Predicción 2026: 725,838.333… (redondeada: 725,838).

Las cifras 2023–2025 y las muertes por neumonía proceden del enunciado, sin verificación independiente. No se atribuyen esos totales al CDC. Solo hay tres observaciones, no hay validación externa, prueba temporal ni variables explicativas adicionales. Los grafos de intervenciones son conceptuales y no prueban causalidad.

Fuentes, explicación completa y pruebas de aceptación: `docs/documentacion.md`. La fuente tipográfica web es opcional: si Google Fonts no está disponible, se utilizan las fuentes del sistema. No hay otras dependencias de red para las interacciones.

## Autoría visual

El nombre **QUISPE CHARRES MATHIAS DYLAN HENRY** aparece en la bienvenida (con salto de línea después de los apellidos), el dashboard, la presentación del caso, Project Developer, el footer, los metadatos, esta guía, los documentos y el encabezado de ambos notebooks. No se agregan otros integrantes.
