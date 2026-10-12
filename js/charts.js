/* Autor: QUISPE CHARRES MATHIAS DYLAN HENRY */
(function (root) {
  'use strict';
  const years = [2023, 2024, 2025], episodes = [1003178, 883959, 824978];
  const meanX = years.reduce((s, v) => s + v, 0) / years.length;
  const meanY = episodes.reduce((s, v) => s + v, 0) / episodes.length;
  const slope = years.reduce((s, v, i) => s + (v - meanX) * (episodes[i] - meanY), 0) / years.reduce((s, v) => s + (v - meanX) ** 2, 0);
  const predict = year => meanY + slope * (year - meanX);
  const format = n => Math.round(n).toLocaleString('en-US');
  function renderChart(target, mini = false) {
    const mobile = typeof matchMedia !== 'undefined' && matchMedia('(max-width:650px)').matches;
    const height = mini ? (mobile ? 190 : 170) : (mobile ? 270 : 320), width = mobile ? 380 : 760, bottom = height - 38;
    const left = mobile ? 72 : 80, right = width - (mobile ? 25 : 56);
    const x = year => left + (year - 2023) * (right-left)/3;
    const y = value => 24 + (1050000 - value) / 400000 * (bottom - 24);
    const grids = [700000, 800000, 900000, 1000000].map(v => `<line class="chart-grid" x1="${left}" y1="${y(v)}" x2="${right}" y2="${y(v)}"/><text class="chart-label" x="${left-10}" y="${y(v) + 4}" text-anchor="end">${format(v)}</text>`).join('');
    const observedPoints = years.map((v, i) => `${x(v)},${y(episodes[i])}`).join(' ');
    const points = [...years, 2026].map((year, i) => {
      const value = i === 3 ? predict(year) : episodes[i];
      const label = `${year}: ${format(value)} episodios · ${i === 3 ? 'estimación por regresión lineal' : 'observado en el caso académico'}`;
      return `<g class="chart-point ${i === 3 ? 'forecast' : ''}" tabindex="0" role="button" aria-label="${label}" data-label="${label}"><title>${label}</title><circle cx="${x(year)}" cy="${y(value)}" r="${i === 3 ? 7 : 5}"/><circle cx="${x(year)}" cy="${y(value)}" r="17" style="fill:transparent;stroke:none"/></g><text class="chart-label" x="${x(year)}" y="${height - 16}" text-anchor="middle">${year}${i === 3 ? '*' : ''}</text>`;
    }).join('');
    target.innerHTML = `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="group" aria-label="Gráfico de episodios IRA por año. 2026 es una estimación.">${!mini ? '<text class="chart-label" x="80" y="12">EPISODIOS DE IRA</text>' : ''}${grids}<path d="M${x(2023)},${y(episodes[0])} L${observedPoints.split(' ').slice(1).join(' L')} L${x(2025)},${bottom} L${x(2023)},${bottom} Z" fill="#36cdd208"/><polyline class="observed-line" points="${observedPoints}"/><path class="regression-line" d="M${x(2023)},${y(predict(2023))}L${x(2026)},${y(predict(2026))}"/>${points}</svg>`;
    for (const point of target.querySelectorAll('.chart-point')) {
      const show = () => {
        const readout = mini ? target.querySelector('.mini-readout') : document.getElementById('chart-readout');
        if (readout) readout.textContent = point.dataset.label;
      };
      point.addEventListener('pointerenter', show); point.addEventListener('focus', show); point.addEventListener('click', show);
      point.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(); } });
    }
    if (mini) { const readout = document.createElement('p'); readout.className = 'mini-readout micro'; readout.style.minHeight = '17px'; readout.style.margin = '0 0 6px'; readout.textContent = '2026* · Estimación académica'; target.appendChild(readout); }
  }
  const pythonCode = `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

X = np.array([[2023], [2024], [2025]])
y = np.array([1003178, 883959, 824978])

modelo = LinearRegression()
modelo.fit(X, y)

anio_nuevo = [[2026]]
prediccion_2026 = modelo.predict(anio_nuevo)[0]
print(round(prediccion_2026))`;
  root.IRACharts = { years, episodes, slope, meanY, predict, format, renderChart, pythonCode };
  if (typeof module !== 'undefined') module.exports = root.IRACharts;
})(typeof window !== 'undefined' ? window : globalThis);
