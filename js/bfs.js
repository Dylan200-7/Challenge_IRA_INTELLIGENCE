/* Autor: QUISPE CHARRES MATHIAS DYLAN HENRY */
(function (root) {
  'use strict';
  const graph = { E0: ['E1', 'E2', 'E3'], E1: ['E4'], E2: ['E4'], E3: ['E4'], E4: ['E5'], E5: ['OBJETIVO'], OBJETIVO: [] };
  const states = {
    E0: ['Muchos casos de IRA y neumonía', 'Situación inicial del ejercicio. Motiva la exploración de intervenciones en un modelo simplificado.'],
    E1: ['Mayor vacunación', 'Operador: incrementar vacunación. La transición a E4 es una relación conceptual propuesta; depende de recursos, acceso y cobertura.'],
    E2: ['Prevención en hogares', 'Operador: promover prevención en hogares. El modelo propone una transición a E4, sin asignar probabilidades ni efectos causales medidos.'],
    E3: ['Atención temprana', 'Operador: facilitar atención temprana. Su alcance está condicionado por el acceso a establecimientos de salud y los recursos disponibles.'],
    E4: ['Menos contagios y casos', 'Estado intermedio esperado dentro del ejercicio conceptual, alcanzable desde E1, E2 o E3. No representa un resultado sanitario demostrado.'],
    E5: ['Menos complicaciones', 'Estado posterior a E4 dentro del grafo. Conecta con el objetivo general del ejercicio.'],
    OBJETIVO: ['Reducir casos y muertes', 'Objetivo: reducir casos y muertes por IRA y neumonía infantil. Es la meta del modelo conceptual, no una garantía de intervención.']
  };
  // Mark nodes as discovered when enqueued so convergent edges do not duplicate E4.
  function bfsTrace(inputGraph = graph, start = 'E0', goal = 'OBJETIVO') {
    const queue = [[start]], discovered = new Set([start]), visited = [], trace = [];
    while (queue.length) {
      const path = queue.shift(), current = path[path.length - 1];
      visited.push(current);
      if (current !== goal) {
        for (const next of inputGraph[current] || []) {
          if (!discovered.has(next)) { discovered.add(next); queue.push([...path, next]); }
        }
      }
      trace.push({ current, queue: queue.map(p => p[p.length - 1]), visited: [...visited], path: current === goal ? path : [], discovered: [...discovered] });
      if (current === goal) break;
    }
    return trace;
  }
  const pythonCode = `from collections import deque

grafo = {
    "E0": ["E1", "E2", "E3"],
    "E1": ["E4"], "E2": ["E4"], "E3": ["E4"],
    "E4": ["E5"], "E5": ["OBJETIVO"], "OBJETIVO": []
}

def buscar_ruta(grafo, inicio, objetivo):
    cola = deque([[inicio]])
    descubiertos = {inicio}
    visitados = []
    while cola:
        ruta = cola.popleft()
        estado = ruta[-1]
        visitados.append(estado)
        if estado == objetivo:
            return ruta, visitados
        for vecino in grafo.get(estado, []):
            if vecino not in descubiertos:
                descubiertos.add(vecino)
                cola.append(ruta + [vecino])
    return [], visitados

ruta, visitados = buscar_ruta(grafo, "E0", "OBJETIVO")
print(" -> ".join(ruta))`;
  root.IRABfs = { graph, states, bfsTrace, pythonCode };
  if (typeof module !== 'undefined') module.exports = root.IRABfs;
})(typeof window !== 'undefined' ? window : globalThis);
