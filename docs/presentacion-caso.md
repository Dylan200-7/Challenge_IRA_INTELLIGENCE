# Presentación del caso — IRA INTELLIGENCE

**Autor y expositor: QUISPE CHARRES MATHIAS DYLAN HENRY**  
Universidad Peruana Cayetano Heredia (UPCH).  
Carrera: Ingeniería Informática. Curso: Machine Learning.  
Docente: Yannick Patrick Carrasco Merma.  
Challenge Individual — Caso B: Infecciones Respiratorias Agudas.

## Apertura

Presento IRA INTELLIGENCE, mi proyecto individual de Machine Learning. El objetivo es representar el problema de las infecciones respiratorias agudas infantiles, explorar rutas mediante BFS y analizar la tendencia de episodios mediante regresión lineal.

## 1. Presentación del caso y problema — 5 puntos

El caso se centra en niños menores de cinco años en Perú. El enunciado proporciona 1,003,178 episodios en 2023, 883,959 en 2024 y 824,978 en 2025. También indica que las muertes por neumonía pasaron de 113 en 2023 a 51 en 2025. Estas cifras proceden del caso del examen; no las presento como verificadas externamente. Aunque disminuyen, el volumen de episodios sigue siendo considerable.

En pantalla: abrir **El problema** y recorrer la línea de tiempo. La tendencia por sí misma no permite explicar sus causas.

## 2. Espacio de estados — 5 puntos

Definí E0 como la situación inicial. E1, E2 y E3 representan mayor vacunación, prevención en hogares y atención temprana. Convergen en E4, menos contagios y casos, y luego en E5, menos complicaciones, antes del objetivo general.

En pantalla: seleccionar nodos y activar **Explorar espacio de estados**. Las relaciones son propuestas del ejercicio. Su aplicación real depende de recursos, acceso y cobertura, y el grafo no garantiza resultados sanitarios.

## 3. Pipeline de razonamiento, búsqueda y resultados — 5 puntos

BFS utiliza una cola FIFO para recorrer el grafo por niveles. Al extraer E0, se agregan E1, E2 y E3. E1 descubre E4; E2 y E3 no duplican ese nodo en la cola. Después se exploran E4, E5 y OBJETIVO.

En pantalla: reiniciar y avanzar paso a paso. Mostrar cola, visitados y ruta E0 → E1 → E4 → E5 → OBJETIVO. El resultado depende del orden de vecinos y del número de aristas, no de una comparación clínica entre intervenciones.

## 4. Pipeline de predicción y visualización — 5 puntos

Usé los años como X y los episodios como y. En Python, `modelo.fit(X, y)` realiza el ajuste y `modelo.predict([[2026]])` produce la estimación. La predicción es aproximadamente 725,838 episodios.

En pantalla: recorrer Datos, Entrenamiento, Predicción y Visualización. Seleccionar los puntos del gráfico y distinguir la recta ajustada de los datos observados. El navegador presenta un cálculo equivalente en JavaScript; el código Python se encuentra en el notebook.

## Cierre

Con este proyecto representé el problema mediante un espacio de estados y utilicé BFS para explorar una ruta hacia el objetivo. Además, desarrollé una regresión lineal para analizar la tendencia y obtener una estimación para 2026. El modelo usa solo tres observaciones; es un ejercicio académico y no un pronóstico epidemiológico validado.

La sección Documentación ofrece el dataset, los notebooks reproducibles, el grafo y las referencias. Los notebooks de esta entrega se construyeron a partir del material proporcionado; no se cotejaron con un notebook original no adjuntado.
