/* Autor: QUISPE CHARRES MATHIAS DYLAN HENRY */
'use strict';
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const { graph, states, bfsTrace } = IRABfs;
const escapeText = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function highlight(code) {
  return escapeText(code).replace(/("[^"\n]*")|\b(from|import|def|while|if|for|in|not|return|as)\b/g, (match, string) => `<span class="${string ? 'string' : 'kw'}">${match}</span>`);
}
$('#bfs-code').innerHTML = highlight(IRABfs.pythonCode);
$('#model-code').innerHTML = highlight(IRACharts.pythonCode);

// Decorative, deterministic lung network: no statistical meaning is assigned.
function drawLungs() {
  let markup = '';
  const all = [];
  for (const side of [-1, 1]) {
    const points = [];
    for (let row = 0; row < 17; row++) {
      const t = row / 16, cy = 100 + t * 220;
      const center = 260 + side * (42 + t * 48);
      const radius = 15 + Math.sin(t * Math.PI * .86) * 57;
      for (let col = 0; col < 8; col++) {
        const u = col / 7, cx = center + (u - .5) * radius * 2;
        const yy = cy + Math.sin(u * Math.PI) * 8 + Math.sin(row * 5 + col * 3) * 3;
        points.push([cx, yy]);
        if (col > 0) { const p = points[points.length - 2]; markup += `<path d="M${p[0]},${p[1]}L${cx},${yy}" stroke="#32a9bd" stroke-opacity=".26" fill="none"/>`; }
        if (row > 0) { const p = points[points.length - 9]; markup += `<path d="M${p[0]},${p[1]}L${cx},${yy}" stroke="#41bde1" stroke-opacity=".3" fill="none"/>`; }
        if (row > 0 && col > 0) { const p = points[points.length - 10]; markup += `<path d="M${p[0]},${p[1]}L${cx},${yy}" stroke="#45cde0" stroke-opacity=".15" fill="none"/>`; }
      }
    }
    all.push(...points);
    markup += `<path d="M260 127L${260 + side * 62} 185L${260 + side * 81} 285M${260 + side * 62} 185L${260 + side * 109} 232M${260 + side * 76} 239L${260 + side * 40} 279" stroke="#5edbe7" stroke-opacity=".6" fill="none" stroke-width="1.4"/>`;
  }
  markup += all.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 7 === 0 ? 2.1 : 1}" fill="${i % 5 === 0 ? '#9df9ee' : '#42b5d6'}" opacity="${i % 3 === 0 ? '.9' : '.5'}"/>`).join('');
  $('#lung-network').innerHTML = markup;
}
drawLungs();

const mobileLayout = matchMedia('(max-width:650px)');
const short = { E0:'Inicio', E1:'Vacunación', E2:'Prevención', E3:'Atención', E4:'Menos casos', E5:'Complicaciones', OBJETIVO:'Meta' };
function drawGraph(container) {
  const prefix = container.id;
  const mobile = mobileLayout.matches;
  const positions = mobile ? {E0:[170,35],E1:[55,125],E2:[170,125],E3:[285,125],E4:[170,225],E5:[170,315],OBJETIVO:[170,405]} : { E0:[45,150], E1:[175,50], E2:[175,150], E3:[175,250], E4:[310,150], E5:[440,150], OBJETIVO:[575,150] };
  let svg = `<svg viewBox="${mobile ? '0 0 340 455' : '0 0 630 305'}" role="group" aria-label="Espacio de estados. Selecciona un nodo para conocer su descripción."><defs><marker id="arrow-${prefix}" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#50798b"/></marker></defs>`;
  for (const [from, nexts] of Object.entries(graph)) for (const to of nexts) {
    const [x1,y1] = positions[from], [x2,y2] = positions[to];
    const d = mobile ? `M${x1},${y1+26}C${x1},${(y1+y2)/2} ${x2},${(y1+y2)/2} ${x2},${y2-28}` : `M${x1+38},${y1}C${(x1+x2)/2},${y1} ${(x1+x2)/2},${y2} ${x2-41},${y2}`;
    svg += `<path class="edge" data-from="${from}" data-to="${to}" marker-end="url(#arrow-${prefix})" d="${d}"/>`;
  }
  for (const [id,[x,y]] of Object.entries(positions)) {
    svg += `<g class="node" data-node="${id}" role="button" tabindex="0" aria-label="${id}: ${states[id][0]}" aria-pressed="false"><title>${states[id][0]}</title><rect x="${x-38}" y="${y-24}" width="76" height="48" rx="9"/><text x="${x}" y="${y+4}" text-anchor="middle" style="${id === 'OBJETIVO' ? 'font-size:9px' : ''}">${id}</text><text class="node-label" x="${x}" y="${y+41}" text-anchor="middle">${short[id]}</text></g>`;
  }
  container.innerHTML = svg + '</svg>';
  container.querySelectorAll('.node').forEach(node => {
    const select = () => selectState(node.dataset.node, container);
    node.addEventListener('click', select);
    node.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(); } });
    node.addEventListener('pointerenter', () => highlightConnections(container, node.dataset.node));
    node.addEventListener('pointerleave', () => restoreEdges(container));
    node.addEventListener('focus', () => highlightConnections(container, node.dataset.node));
    node.addEventListener('blur', () => restoreEdges(container));
  });
}
function highlightConnections(container, id) {
  container.querySelectorAll('.edge').forEach(edge => edge.classList.toggle('active', edge.dataset.from === id || edge.dataset.to === id));
}
function restoreEdges(container) {
  const selected = container.querySelector('.selected');
  if (container.id === 'bfs-graph') { paintBfs(); return; }
  highlightConnections(container, selected ? selected.dataset.node : '');
}
function selectState(id, container = $('#state-graph')) {
  $('#state-id').textContent = 'ESTADO ' + id;
  $('#state-title').textContent = states[id][0];
  $('#state-description').textContent = states[id][1];
  $('#state-links').textContent = graph[id].length ? graph[id].join(' · ') : 'Estado final';
  container.querySelectorAll('.node').forEach(node => { const selected = node.dataset.node === id; node.classList.toggle('selected', selected); node.setAttribute('aria-pressed', String(selected)); });
  highlightConnections(container, id);
  // BFS nodes additionally explain themselves inside the visible workbench.
  if (container.id === 'bfs-graph') $('#bfs-message').textContent = id + ': ' + states[id][0];
}
drawGraph($('#state-graph')); drawGraph($('#bfs-graph')); selectState('E0');
let exploring = false;
$('#explore-states').addEventListener('click', async () => {
  if (exploring) return;
  exploring = true;
  const button = $('#explore-states'); button.disabled = true;
  for (const via of ['E1','E2','E3']) {
    const route = ['E0',via,'E4','E5','OBJETIVO'];
    for (const id of route) {
      selectState(id);
      $('#state-links').textContent = route.join(' → ');
      button.textContent = `Ruta vía ${via} · ${id}`;
      await new Promise(resolve => setTimeout(resolve, reduced.matches ? 50 : 420));
    }
  }
  $('#state-description').textContent = 'Tres rutas conceptuales: E0 → E1/E2/E3 → E4 → E5 → OBJETIVO. Todas tienen cuatro aristas. BFS devuelve primero la que pasa por E1 por el orden del grafo.';
  button.textContent = 'Explorar de nuevo ↗'; button.disabled = false; exploring = false;
});

const trace = bfsTrace(); let bfsIndex = -1, bfsTimer = null;
function paintBfs() {
  const step = trace[bfsIndex];
  $$('#bfs-graph .node').forEach(node => {
    const id = node.dataset.node;
    node.classList.toggle('visited', !!step?.visited.includes(id));
    node.classList.toggle('current', step?.current === id);
    node.classList.toggle('route-node', !!step?.path.includes(id));
  });
  $$('#bfs-graph .edge').forEach(edge => {
    const path = step?.path || [], index = path.indexOf(edge.dataset.from);
    edge.classList.toggle('active', path.length ? index >= 0 && path[index+1] === edge.dataset.to : edge.dataset.from === step?.current);
  });
}
function showBfs() {
  const step = trace[bfsIndex]; paintBfs();
  $('#bfs-current').textContent = step?.current || 'Listo para explorar';
  $('#bfs-queue').textContent = step ? step.queue.join(' · ') || 'Vacía' : 'E0';
  $('#bfs-visited').textContent = step ? step.visited.join(' · ') : '—';
  $('#bfs-route').textContent = step?.path.length ? step.path.join(' → ') : 'Pendiente';
  $('#bfs-message').textContent = step ? step.path.length ? 'Objetivo encontrado · 4 aristas · Primera ruta según el orden de vecinos.' : `Se extrae ${step.current}. Se agregan sus vecinos aún no descubiertos; los nodos repetidos se omiten.` : 'Orden de vecinos de E0: E1, E2, E3.';
  $('#bfs-step').disabled = bfsIndex === trace.length - 1 || bfsTimer !== null;
}
function stopBfs() { clearTimeout(bfsTimer); bfsTimer = null; $('#bfs-run').textContent = '▶ Ejecutar búsqueda BFS'; }
function advanceBfs() { if (bfsIndex < trace.length - 1) bfsIndex++; showBfs(); }
$('#bfs-step').addEventListener('click', () => { stopBfs(); advanceBfs(); });
$('#bfs-reset').addEventListener('click', () => { stopBfs(); bfsIndex = -1; $$('#bfs-graph .node').forEach(n => { n.classList.remove('selected'); n.setAttribute('aria-pressed','false'); }); showBfs(); });
$('#bfs-run').addEventListener('click', () => {
  if (bfsTimer !== null) { stopBfs(); showBfs(); return; }
  if (bfsIndex === trace.length - 1) bfsIndex = -1;
  const tick = () => {
    advanceBfs();
    if (bfsIndex < trace.length - 1) { bfsTimer = setTimeout(tick, reduced.matches ? 80 : Number($('#bfs-speed').value)); $('#bfs-step').disabled = true; $('#bfs-run').textContent = 'Ⅱ Pausar búsqueda'; }
    else { stopBfs(); showBfs(); }
  };
  tick();
});

IRACharts.renderChart($('#mini-chart'), true); IRACharts.renderChart($('#main-chart'));
mobileLayout.addEventListener('change', () => {
  drawGraph($('#state-graph')); drawGraph($('#bfs-graph')); paintBfs();
  IRACharts.renderChart($('#mini-chart'), true); IRACharts.renderChart($('#main-chart'));
  $('#main-chart .regression-line').style.display = $('#show-regression').checked ? '' : 'none';
});
$('#show-regression').addEventListener('change', e => { $('#main-chart .regression-line').style.display = e.target.checked ? '' : 'none'; });
const stageTexts = [
  '<b>01 / DATOS.</b> X contiene los años 2023, 2024 y 2025. y contiene 1,003,178; 883,959 y 824,978 episodios. Son datos del enunciado académico.',
  '<b>02 / ENTRENAMIENTO.</b> En Python, modelo.fit(X, y) ajusta una recta por mínimos cuadrados con scikit-learn. La pendiente calculada es −89,100 episodios por año.',
  '<b>03 / PREDICCIÓN.</b> modelo.predict([[2026]]) devuelve aproximadamente 725,838.33 episodios, que se redondean a 725,838. El navegador muestra el cálculo equivalente en JavaScript; no ejecuta Python.',
  '<b>04 / VISUALIZACIÓN.</b> La línea cian conecta los datos del caso. La recta violeta discontinua es el ajuste de regresión. El punto violeta de 2026 es una estimación. Solo hay tres observaciones, sin validación externa.'
];
let stage = 0;
function selectStage(index, focus = false) {
  stage = index;
  $$('.pipeline-tabs button').forEach((button, i) => { button.setAttribute('aria-selected', String(i === index)); button.tabIndex = i === index ? 0 : -1; if (i === index && focus) button.focus(); });
  $('#pipeline-detail').innerHTML = '<p>' + stageTexts[index] + '</p>';
  $('#pipeline-detail').setAttribute('aria-labelledby', 'tab-' + index);
  $('#pipeline-next').textContent = index === 3 ? 'Volver a los datos ↺' : 'Siguiente etapa →';
}
$$('.pipeline-tabs button').forEach(button => { button.addEventListener('click', () => selectStage(Number(button.dataset.stage))); button.addEventListener('keydown', e => { let next = stage; if (e.key === 'ArrowRight') next = (stage+1)%4; else if (e.key === 'ArrowLeft') next = (stage+3)%4; else if(e.key === 'Home') next = 0; else if(e.key === 'End') next = 3; else return; e.preventDefault(); selectStage(next, true); }); });
$('#pipeline-next').addEventListener('click', () => selectStage((stage+1)%4)); selectStage(0);

const labels = { github: 'Repositorio GitHub', colabBfs: 'Notebook BFS en Google Colab', colabModelo: 'Modelo predictivo en Google Colab' };
$$('[data-external]').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.external, link = (window.IRA_LINKS[key] || '').trim();
  let valid = false; try { valid = new URL(link).protocol === 'https:'; } catch {}
  if (valid) { window.open(link, '_blank', 'noopener,noreferrer'); return; }
  $('#dialog-title').textContent = labels[key];
  $('#dialog-copy').textContent = `Todavía no se proporcionó el enlace real. Puedes descargar los notebooks desde Documentación. Para conectar este recurso, coloca su URL HTTPS en el campo ${key} del archivo js/config.js.`;
  $('#link-dialog').showModal();
}));
$('#close-dialog').addEventListener('click', () => $('#link-dialog').close());
$('#link-dialog').addEventListener('click', e => { if(e.target === $('#link-dialog')) { const r = e.target.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) e.target.close(); } });

$('.menu-toggle').addEventListener('click', () => { const open = $('.sidebar').classList.toggle('open'); $('.menu-toggle').setAttribute('aria-expanded',String(open)); $('.menu-toggle').setAttribute('aria-label',open ? 'Cerrar navegación' : 'Abrir navegación'); });
function closeMenu() { $('.sidebar').classList.remove('open'); $('.menu-toggle').setAttribute('aria-expanded','false'); $('.menu-toggle').setAttribute('aria-label','Abrir navegación'); }
$$('nav a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeMenu(); });
document.addEventListener('click', e => { if (!$('.sidebar').contains(e.target) && !$('.menu-toggle').contains(e.target)) closeMenu(); });
let scrolling = false;
function updateScroll() {
  const height = document.documentElement.scrollHeight - innerHeight;
  $('#journey-progress').style.width = `${height > 0 ? scrollY/height*100 : 100}%`;
  let current = 'inicio'; for(const section of $$('main>section')) if(section.getBoundingClientRect().top <= 150) current = section.id;
  if (height > 0 && scrollY >= height - 4) current = 'autor';
  $$('nav a').forEach(link => { const active = link.hash === '#' + current; link.classList.toggle('active', active); if(active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
  scrolling = false;
}
addEventListener('scroll', () => { if(!scrolling) { scrolling = true; requestAnimationFrame(updateScroll); } }, {passive:true});
addEventListener('resize', updateScroll); updateScroll();
const observer = new IntersectionObserver(entries => { for(const entry of entries) if(entry.isIntersecting) { entry.target.classList.add('entered'); observer.unobserve(entry.target); } }, {threshold:.2});
$$('.chart-panel,.trend-panel').forEach(el => observer.observe(el));

// Brief intro, once per tab session. No motion or waiting with reduced motion.
let introTimers = [];
function countMetrics() {
  if(reduced.matches) return;
  const begin = performance.now();
  const tick = now => { const t = Math.min((now-begin)/1000,1), eased = 1-(1-t)**3; $$('[data-count]').forEach(el => el.textContent = IRACharts.format(Number(el.dataset.count)*eased)); if(t < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}
function finishIntro() {
  introTimers.forEach(clearTimeout); introTimers = [];
  const wasVisible = !$('#welcome').hidden;
  $('#welcome').hidden = true; $('.page').inert = false; $('.sidebar').inert = false; document.body.style.overflow = '';
  try { sessionStorage.setItem('ira-intro-seen','1'); } catch {}
  if(wasVisible) { const heading = $('h1'); heading.tabIndex = -1; heading.focus({preventScroll:true}); }
  countMetrics();
}
let seen = false; try { seen = sessionStorage.getItem('ira-intro-seen') === '1'; } catch {}
if (!seen && !reduced.matches && !location.hash) {
  const lines = ['QUISPE CHARRES','MATHIAS DYLAN HENRY']; let i = 0;
  $('#boot-name').innerHTML = lines.map(line => [...line].map(letter => `<span aria-hidden="true" style="--i:${i++}">${letter === ' ' ? '&nbsp;' : letter}</span>`).join('')).join('<br>');
  $('#welcome').hidden = false; $('.page').inert = true; $('.sidebar').inert = true; document.body.style.overflow = 'hidden'; $('#skip-intro').focus();
  ['Loading data...', 'Initializing AI pipeline...', 'Preparing predictive model...', 'System ready. · IRA INTELLIGENCE'].forEach((text,i) => introTimers.push(setTimeout(() => $('#boot-status').textContent = text, 700+i*900)));
  introTimers.push(setTimeout(finishIntro,4300));
} else finishIntro();
$('#skip-intro').addEventListener('click', finishIntro);
reduced.addEventListener('change', e => { if(e.matches && !$('#welcome').hidden) finishIntro(); });
