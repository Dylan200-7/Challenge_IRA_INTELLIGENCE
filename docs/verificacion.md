# Verificación de la entrega

Autor del proyecto: **QUISPE CHARRES MATHIAS DYLAN HENRY**.  
Fecha de revisión: 12 de octubre de 2026.

Comprobaciones realizadas:

- JavaScript: los cuatro archivos pasan revisión de sintaxis.
- BFS: se verificaron el orden completo de extracción, la cola de cada paso, la ruta encontrada, el número de aristas y el caso de un grafo cíclico sin meta alcanzable.
- Python: se ejecutaron las celdas de BFS y sus aserciones. Resultado: E0 → E1 → E4 → E5 → OBJETIVO. Se comprobó la sintaxis de las celdas de ambos notebooks.
- Regresión: resultado JavaScript 725,838.333333…; contraste independiente con mínimos cuadrados de NumPy 725,838.333333…; pendiente −89,100.
- Sitio: respuesta HTTP correcta, recursos y descargas locales existentes, destinos de navegación válidos, sin IDs HTML duplicados.
- Autoría: nombre completo en README, documentos, metadatos y encabezados de ambos notebooks; tarjeta del autor y footer revisados visualmente.
- Navegador: bienvenida, resultado automático BFS, pasos de BFS, selección de estados, recorrido de las tres rutas, pestaña de predicción, selección del punto 2026, alternador de regresión y diálogo de enlace pendiente comprobados.
- Responsive: vista de escritorio y vista móvil de 390 × 844; grafo vertical, navegación móvil y ausencia de desbordamiento horizontal comprobados.
- Consola del navegador: no se observaron advertencias ni errores durante la revisión.

## Estado actual y verificación de la entrega

**Fecha de revisión:** 12 de octubre de 2026.

### 1. Verificación de los notebooks

- **Bloque 1 — Razonamiento y búsqueda BFS:** Se ejecutó correctamente el notebook en Python, obteniendo la ruta `E0 → E1 → E4 → E5 → OBJETIVO`. Se comprobó que el algoritmo explora el grafo y presenta los estados correspondientes.
- **Bloque 2 — Modelo predictivo:** Se ejecutó correctamente el notebook utilizando `scikit-learn`, `NumPy` y `Matplotlib`. El modelo de regresión lineal generó una predicción aproximada de **725 838 episodios de IRA para 2026**, junto con su gráfica interpretativa.
- Ambos notebooks contienen resultados de ejecución guardados y pueden volver a ejecutarse en Google Colab.

### 2. Publicación del proyecto

El proyecto se encuentra publicado en GitHub y dispone de una plataforma interactiva accesible públicamente.

- **Repositorio:** https://github.com/Dylan200-7/Challenge_IRA_INTELLIGENCE
- **Página web:** https://dylan200-7.github.io/Challenge_IRA_INTELLIGENCE/

El repositorio incluye el código fuente, los notebooks, el dataset y la documentación correspondiente. El README proporciona enlaces para consultar los notebooks en Google Colab.

### 3. Coherencia entre código y resultados

Se verificó que los notebooks de Python y la plataforma web presentan los mismos resultados principales:

- **Búsqueda BFS:** `E0 → E1 → E4 → E5 → OBJETIVO`.
- **Regresión lineal:** predicción aproximada de 725 838 episodios para 2026.

La plataforma web representa los algoritmos mediante JavaScript, mientras que los notebooks contienen su implementación académica en Python.

### 4. Limitaciones y mejoras pendientes

- El modelo predictivo utiliza únicamente tres observaciones anuales (2023, 2024 y 2025). La estimación de 2026 es académica y no constituye un pronóstico epidemiológico validado.
- La plataforma todavía contiene un enlace al repositorio señalado como «Enlace configurable», pendiente de actualización.
- Las pruebas realizadas permiten comprobar el funcionamiento de los notebooks, pero no constituyen una validación exhaustiva de rendimiento o compatibilidad con todos los entornos.
- La preferencia de movimiento reducido está contemplada en la implementación web, pero no se ha verificado en todas las configuraciones del sistema operativo.

### 5. Conclusión

La entrega integra los cuatro componentes establecidos en el Challenge 1: presentación del caso, espacio de estados, pipeline de razonamiento y búsqueda, y pipeline de predicción y visualización.

Los notebooks se ejecutan correctamente y los resultados principales son consistentes con los mostrados en la plataforma. La documentación refleja los alcances y limitaciones de la solución desarrollada.
