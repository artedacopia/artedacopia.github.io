/**
 * Arte da Cópia — main.js
 * Header injection, dark mode toggle, mobile menu
 */

// ── SVG Icons ─────────────────────────────────
const ICONS = {
  whatsapp: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
  sun: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`,
  moon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  arrow: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
};

const WPP_URL = 'https://wa.me/5584988334461';

// ── Theme ──────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// ── Active nav link ────────────────────────────
function setActiveLink(nav) {
  const path = window.location.pathname;
  nav.querySelectorAll('a').forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href');
    if (href === '/' && (path === '/' || path === '/index.html')) {
      a.classList.add('active');
    } else if (href !== '/' && path.startsWith(href)) {
      a.classList.add('active');
    }
  });
}

// ── Build Header ───────────────────────────────
function buildHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  header.innerHTML = `
    <div class="header-inner">
      <a href="/" class="header-logo">
        <img src="/imagens/logoac.svg" alt="Arte da Cópia" onerror="this.style.display='none'">
        <div>
          <span class="logo-text">Arte da Cópia</span>
          <span class="logo-sub">Gráfica & Personalização</span>
        </div>
      </a>

      <nav id="menu">
        <a href="/">Início</a>
        <a href="/servicos.html">Serviços</a>
        <a href="/contatos.html">Contatos</a>
        <a href="${WPP_URL}" id="whatsapp-btn" target="_blank" rel="noopener">
          ${ICONS.whatsapp} Orçamento
        </a>
      </nav>

      <div style="display:flex;align-items:center;gap:8px;">
        <button id="theme-toggle" aria-label="Alternar tema" title="Alternar tema claro/escuro">
          <span class="icon-sun">${ICONS.sun}</span>
          <span class="icon-moon">${ICONS.moon}</span>
        </button>
        <button id="burger-btn" aria-label="Menu">
          ${ICONS.menu}
        </button>
      </div>
    </div>

    <nav id="mobile-nav">
      <a href="/">Início</a>
      <a href="/servicos.html">Serviços</a>
      <a href="/contatos.html">Contatos</a>
      <a href="${WPP_URL}" id="whatsapp-btn-m" target="_blank" rel="noopener">
        ${ICONS.whatsapp} Solicitar Orçamento
      </a>
    </nav>
  `;

  // active state
  setActiveLink(header.querySelector('nav#menu'));
  setActiveLink(header.querySelector('nav#mobile-nav'));

  // theme toggle
  header.querySelector('#theme-toggle').addEventListener('click', toggleTheme);

  // burger
  const burger = header.querySelector('#burger-btn');
  const mobileNav = header.querySelector('#mobile-nav');
  burger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    burger.innerHTML = open ? ICONS.close : ICONS.menu;
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
}

// ── Build Footer ───────────────────────────────
function buildFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  footer.innerHTML = `
    © ${new Date().getFullYear()} Arte da Cópia · Todos os direitos reservados ·
    Desenvolvido por <a href="https://github.com/marcosrochadeveloper" target="_blank" rel="noopener">Marcos Rocha</a>
  `;
}

// ── Init ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  buildHeader();
  buildFooter();
});
