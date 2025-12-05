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


// Injeção do conteúdo do dia dos Professores
document.getElementById('btnDiaDosProfessores').addEventListener('click', function(e) {
    e.preventDefault();
    fetch('/p/pageServices/diadosprofessores.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('content_servicos').innerHTML = html;
            bindGifLinks(); // Reaplica eventos nos novos elementos
        });
});


//Injeção do conteúdo do dia dos Namorados
document.getElementById('btnDiaDosNamorados').addEventListener('click', function(e) {
    e.preventDefault();
    fetch('/p/pageServices/diadosnamorados.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('content_servicos').innerHTML = html;
            bindGifLinks(); // Reaplica eventos nos novos elementos
        });
});

//Injeção do conteúdo de Canecas
document.getElementById('btnCanecas').addEventListener('click', function(e) {
    e.preventDefault();
    fetch('/p/pageServices/canecas.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('content_servicos').innerHTML = html;
            bindGifLinks(); // Reaplica eventos nos novos elementos
        });
});