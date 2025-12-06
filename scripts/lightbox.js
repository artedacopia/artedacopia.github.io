// Lightbox para múltiplas imagens
const lightbox = document.getElementById('lightbox-gif');
const lightboxImg = document.getElementById('lightbox-gif-img');


function bindGifLinks() {
    const gifLinks = document.querySelectorAll('.open-gif');
    gifLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const gifSrc = this.getAttribute('data-gif');
            lightboxImg.src = gifSrc;
            lightbox.style.display = 'flex';
        });
    });
}


lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
    }
});

document.addEventListener('click', function(e) {
    const btn = e.target.closest('[data-url]'); // qualquer botão dinâmico

    if (!btn) return;

    e.preventDefault();

    const url = btn.dataset.url;
    const targetSelector = btn.dataset.target;
    const target = document.querySelector(targetSelector);

    fetch(url)
        .then(r => r.text())
        .then(html => {
            target.innerHTML = html;
            bindGifLinks(); // reaplica eventos se precisar
        });
});


