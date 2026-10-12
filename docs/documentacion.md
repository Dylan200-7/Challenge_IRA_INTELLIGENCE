# Documentación del proyecto — IRA INTELLIGENCE

**Autor: QUISPE CHARRES MATHIAS DYLAN HENRY**  
Universidad Peruana Cayetano Heredia (UPCH) — Ingeniería Informática.  
Curso: Machine Learning. Docente: Yannick Patrick Carrasco Merma.  
Tipo de proyecto: Challenge Individual. Año: 2026.

## 1. Presentación del caso y problema (5 puntos)

El caso B estudia episodios de infecciones respiratorias agudas en menores de cinco años en Perú. El enunciado suministra 1,003,178 episodios en 2023, 883,959 en 2024 y 824,978 en 2025, además de 113 muertes por neumonía en 2023 y 51 en 2025. Los fallecimientos se incluyen solo en el contexto; no son la variable objetivo de la regresión.

Estas cifras se transcriben del material proporcionado. No se dispone del documento original del examen ni de un enlace público para validar sus cifras o alcance temporal. La referencia del CDC [1] contextualiza la vigilancia de IRA; no confirma estos totales.

El propósito académico es representar un problema mediante un grafo, explorar una ruta con BFS y ajustar una tendencia de episodios usando regresión lineal. La disminución observada no permite atribuir causalidad a las intervenciones del grafo.

## 2. Espacio de estados (5 puntos)

E0: muchos casos de IRA y neumonía. E1: mayor vacunación. E2: prevención en hogares. E3: atención temprana. E4: menos contagios y casos. E5: menos complicaciones. OBJETIVO: reducir casos y muertes por IRA y neumonía infantil.

Relaciones dirigidas: E0→E1, E0→E2, E0→E3, E1→E4, E2→E4, E3→E4, E4→E5, E5→OBJETIVO. Se mantienen el orden y las relaciones del enunciado. Hay siete nodos y ocho aristas; no se agregan pesos ni probabilidades.

Operadores: incrementar vacunación, promover prevención en hogares y facilitar atención temprana. Restricciones: recursos disponibles, acceso a establecimientos y cobertura. Las relaciones son hipótesis conceptuales del ejercicio, no efectos garantizados. Detalle en `espacio-estados.md`.

## 3. Pipeline de razonamiento, búsqueda y resultados (5 puntos)

Representación: diccionario de listas de adyacencia en Python; objeto equivalente en JavaScript. La función `buscar_ruta()` emplea `collections.deque` [2], una cola FIFO de rutas, un conjunto de descubiertos y una lista de visitados. El conjunto evita duplicar nodos en cola; la lista conserva el orden de extracción. Se detiene al extraer OBJETIVO.

| Paso | Extraído | Cola tras expansión | Visitados |
|---|---|---|---|
| Inicial | — | E0 | — |
| 1 | E0 | E1, E2, E3 | E0 |
| 2 | E1 | E2, E3, E4 | E0, E1 |
| 3 | E2 | E3, E4 | E0, E1, E2 |
| 4 | E3 | E4 | E0, E1, E2, E3 |
| 5 | E4 | E5 | E0, E1, E2, E3, E4 |
| 6 | E5 | OBJETIVO | E0, E1, E2, E3, E4, E5 |
| 7 | OBJETIVO | Vacía | E0, E1, E2, E3, E4, E5, OBJETIVO |

Resultado: **E0 → E1 → E4 → E5 → OBJETIVO**. La búsqueda por niveles encuentra una ruta de cuatro aristas; existen rutas de igual longitud por E2 y E3. E1 aparece primero por el orden de vecinos. Esta propiedad no constituye una priorización sanitaria óptima.

En la web se puede ejecutar, pausar, continuar, avanzar paso a paso, variar velocidad y reiniciar. Al seleccionar nodos se muestra información; el botón de exploración recorre las tres rutas conceptuales.

## 4. Pipeline de predicción y visualización (5 puntos)

**Datos:** X = [[2023], [2024], [2025]]; y = [1003178, 883959, 824978]. No se agregan datos sintéticos ni la estimación al entrenamiento.

**Entrenamiento:** `modelo = LinearRegression()` y `modelo.fit(X, y)` ajustan un modelo lineal con intercepto usando scikit-learn [3].

**Predicción:** `modelo.predict([[2026]])[0]`. Para comprobar el resultado, el año promedio es 2024 y el promedio de episodios es 904,038.333… La pendiente es (824,978 − 1,003,178) / 2 = −89,100. La ecuación centrada es:

```text
episodios_estimados(año) = 904038.333333… − 89100 × (año − 2024)
episodios_estimados(2026) = 725838.333333…
```

**Visualización:** la línea cian conecta los datos observados del caso; la recta violeta discontinua representa el ajuste sobre 2023–2026; el punto violeta es la predicción. La línea ajustada no coincide exactamente con los tres puntos porque minimiza errores cuadrados. Tooltips y selección por teclado/táctil muestran los valores. El control de regresión permite ocultar solo la recta ajustada.

El navegador ejecuta el cálculo equivalente por mínimos cuadrados en JavaScript, no el código Python. El notebook sí utiliza scikit-learn y matplotlib. Los notebooks están sin resultados guardados para que el estudiante pueda ejecutarlos en su entorno; no se presentan salidas ficticias como ejecuciones realizadas.

**Limitaciones:** tres observaciones anuales no capturan estacionalidad, población, variabilidad del registro ni otros determinantes. No hay conjunto de prueba, validación epidemiológica, intervalos de incertidumbre ni evidencia causal. No se informa una precisión inventada. La estimación es exclusivamente académica.

## Implementación y accesibilidad

HTML, CSS, JavaScript y SVG, sin backend ni paquetes obligatorios. Rutas relativas para GitHub Pages. Gráficos, diagramas y botones tienen etiquetas; controles accesibles por teclado; tabs con flechas, Inicio y Fin; navegación móvil, enlace para saltar al contenido y movimiento reducido. La bienvenida usa almacenamiento de sesión y ofrece omisión. El nombre del autor se expone completo también en los metadatos y los notebooks.

Los enlaces externos faltantes abren un diálogo explicativo. `js/config.js` admite solo URLs HTTPS. Los documentos locales se descargan directamente. Tipografías de Google Fonts opcionales con fallback local.

## Comprobación manual de aceptación

- Inicio: bienvenida de menos de cinco segundos, nombre completo y botón de omisión.
- Autoría: dashboard, sección Project Developer, footer, README, documentos y dos notebooks.
- Navegación: ocho destinos internos y sección activa; menú móvil abre/cierra.
- Estados: siete nodos seleccionables y ocho conexiones; tres rutas explorables.
- BFS: cola y visitados coinciden con la tabla; pausa/reinicio no dejan temporizadores activos; la ruta contiene cuatro aristas.
- Modelo: las cuatro etapas se pueden seleccionar y recorrer; estimación redondeada 725,838.
- Gráfico: controles de puntos y alternador de recta; datos observados separados de la estimación.
- Recursos: descargas locales; diálogo visible para enlaces todavía no configurados.
- Responsive: revisar escritorio y móvil; movimiento reducido omite animaciones.

## Referencias IEEE

[1] Centro Nacional de Epidemiología, Prevención y Control de Enfermedades, “Vigilancia de EDA/IRA/SGB (UTVEIS).” [En línea]. Disponible: https://www.dge.gob.pe/portalnuevo/vigilancia-epidemiologica/vigilancia-de-eda-ira-sgb-utveis/ . [Consulta: 12-oct-2026].

[2] Python Software Foundation, “collections — Container datatypes.” [En línea]. Disponible: https://docs.python.org/3/library/collections.html#collections.deque . [Consulta: 12-oct-2026].

[3] scikit-learn, “LinearRegression.” [En línea]. Disponible: https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html . [Consulta: 12-oct-2026].

Fuente interna: enunciado del Challenge individual de Machine Learning, caso B, aportado por el estudiante en el material de trabajo. No se inventan fecha, editor ni enlace del examen.
