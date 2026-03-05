/**
 * Arte da Cópia — servicos.js
 * Carregamento de produtos via JSON, filtro por categoria e pesquisa
 *
 * ╔═══════════════════════════════════════════════════╗
 * ║  CONFIGURAÇÃO: altere DEFAULT_FILTER para mudar   ║
 * ║  a categoria exibida por padrão.                  ║
 * ║  Valores possíveis: 'canecas' | 'camisas' |       ║
 * ║  'almofadas' | 'todos'                            ║
 * ╚═══════════════════════════════════════════════════╝
 */
const DEFAULT_FILTER = 'canecas';

// ── Fontes de dados ─────────────────────────────────
// Adicione novos arquivos JSON aqui para incluir novas categorias
const DATA_SOURCES = [
  { file: '/data/canecas.json',  label: 'Canecas',   emoji: '☕' },
  { file: '/data/camisas.json',  label: 'Camisas',   emoji: '👕' },
  { file: '/data/almofadas.json',label: 'Almofadas', emoji: '🛋️' },
];

// ── WPP Number ──────────────────────────────────────
const WPP_BASE = 'https://wa.me/5584988334461';

// ── SVG Icons ───────────────────────────────────────
const WPP_ICON = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

const SEARCH_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`;

const EMPTY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M8 11h6M11 8v6"/></svg>`;

const RULER_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4Z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 13.5 2 2"/></svg>`;

const TAG_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>`;

// ── State ────────────────────────────────────────────
let allProducts = [];
let activeFilter = DEFAULT_FILTER;
let searchQuery  = '';

// ── Load all JSON data ───────────────────────────────
async function loadAllProducts() {
  const fetches = DATA_SOURCES.map(src =>
    fetch(src.file)
      .then(r => r.ok ? r.json() : [])
      .catch(() => [])
  );
  const results = await Promise.all(fetches);
  allProducts = results.flat();
}

// ── Filter & Search ──────────────────────────────────
function getFiltered() {
  return allProducts.filter(p => {
    const matchCat = activeFilter === 'todos' || p.categoria === activeFilter;
    if (!matchCat) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.nome?.toLowerCase().includes(q) ||
      p.categoria?.toLowerCase().includes(q) ||
      p.subcategoria?.toLowerCase().includes(q) ||
      p.material?.toLowerCase().includes(q) ||
      p.tamanho?.toLowerCase().includes(q)
    );
  });
}

// ── Format price ─────────────────────────────────────
function fmt(val) {
  return `R$ ${Number(val).toFixed(2).replace('.', ',')}`;
}

// ── Build price table ────────────────────────────────
function buildPriceTable(precos) {
  if (!precos || precos.length === 0) return '';
  // Mark cheapest unit price as "best"
  const sorted = [...precos].sort((a, b) => a.preco - b.preco);
  const lowestPrice = sorted[0].preco;

  const rows = precos.map(p => {
    const isBest = p.preco === lowestPrice && precos.length > 1;
    const qtyLabel = p.quantidade === 1 ? '1 unid.' : `${p.quantidade}+ unid.`;
    return `
      <tr class="${isBest ? 'best-price' : ''}">
        <td>${qtyLabel}</td>
        <td>${fmt(p.preco)} / unid.</td>
      </tr>`;
  }).join('');

  return `
    <div class="price-table">
      <div class="price-table-title">Tabela de Preços</div>
      <table><tbody>${rows}</tbody></table>
    </div>`;
}

// ── Build single product card ─────────────────────────
function buildCard(product) {
  const { nome, categoria, subcategoria, tamanho, imagem, precos } = product;

  const imgHtml = imagem
    ? `<img src="${imagem}" alt="${nome}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'no-img\\'>📦</div>'">`
    : `<div class="no-img">📦</div>`;

  const metaPills = [
    subcategoria ? `<span class="meta-pill">${TAG_ICON} ${subcategoria}</span>` : '',
    tamanho      ? `<span class="meta-pill">${RULER_ICON} ${tamanho}</span>` : '',
  ].filter(Boolean).join('');

  const wppMsg = encodeURIComponent(`Olá! Tenho interesse no produto: *${nome}*. Poderia me dar mais informações?`);
  const wppUrl = `${WPP_BASE}?text=${wppMsg}`;

  return `
    <article class="product-card">
      <div class="product-card-img">
        ${imgHtml}
        <span class="product-card-badge">${categoria.charAt(0).toUpperCase() + categoria.slice(1)}</span>
      </div>
      <div class="product-card-body">
        <h3 class="product-card-title">${nome}</h3>
        <div class="product-card-meta">${metaPills}</div>
        ${buildPriceTable(precos)}
      </div>
      <div class="product-card-footer">
        <a href="${wppUrl}" target="_blank" rel="noopener" class="btn-orcamento">
          ${WPP_ICON} Pedir Orçamento
        </a>
      </div>
    </article>`;
}

// ── Render grid ───────────────────────────────────────
function renderGrid() {
  const grid  = document.getElementById('products-grid');
  const empty = document.getElementById('empty-state');
  const info  = document.getElementById('results-info');
  if (!grid) return;

  const filtered = getFiltered();

  if (filtered.length === 0) {
    grid.innerHTML = '';
    empty?.classList.add('show');
  } else {
    empty?.classList.remove('show');
    grid.innerHTML = filtered.map(buildCard).join('');
    // stagger animation
    grid.querySelectorAll('.product-card').forEach((card, i) => {
      card.style.animationDelay = `${i * 50}ms`;
    });
  }

  if (info) {
    const total = allProducts.filter(p => activeFilter === 'todos' || p.categoria === activeFilter).length;
    if (searchQuery) {
      info.textContent = `${filtered.length} produto${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`;
    } else {
      info.textContent = `${filtered.length} produto${filtered.length !== 1 ? 's' : ''}`;
    }
  }
}

// ── Build filter chips ────────────────────────────────
function buildFilters() {
  const container = document.getElementById('filter-chips');
  if (!container) return;

  // Build chips from actual categories present in loaded data
  const allCategories = [...new Set(allProducts.map(p => p.categoria))];
  const sourceMap = {};
  DATA_SOURCES.forEach(s => {
    const key = s.file.match(/\/(\w+)\.json/)?.[1];
    if (key) sourceMap[key] = s;
  });
  const chips = [
    { value: 'todos', label: 'Todos', emoji: '✨' },
    ...allCategories.map(cat => sourceMap[cat]
      ? { value: cat, label: sourceMap[cat].label, emoji: sourceMap[cat].emoji }
      : { value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1), emoji: '🏷️' }
    )
  ];

  container.innerHTML = chips.map(c => `
    <button class="chip ${c.value === activeFilter ? 'active' : ''}" data-filter="${c.value}">
      <span>${c.emoji}</span> ${c.label}
    </button>
  `).join('');

  container.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      container.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGrid();
    });
  });
}

// ── Search input ──────────────────────────────────────
function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchQuery = input.value.trim();
      renderGrid();
    }, 200);
  });
}

// ── Build toolbar HTML ────────────────────────────────
function buildToolbar() {
  const toolbar = document.getElementById('servicos-toolbar');
  if (!toolbar) return;
  toolbar.innerHTML = `
    <div class="search-box">
      ${SEARCH_ICON}
      <input type="search" id="search-input" placeholder="Buscar produto…" autocomplete="off">
    </div>
    <div class="filter-chips" id="filter-chips"></div>
  `;
}

// ── Init ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  // Allow override via URL param ?cat=xxx or window.__CAT_OVERRIDE__
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('cat') || window.__CAT_OVERRIDE__;
  if (catParam) activeFilter = catParam;

  buildToolbar();
  await loadAllProducts();
  buildFilters();
  initSearch();
  renderGrid();
});
