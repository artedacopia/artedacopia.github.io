let menu;

function criarMenu(){
    if(!menu){
        menu = document.querySelector("#menu");
    }
}

function clickMenu(){
    criarMenu();
    menu.classList.toggle("ativo");
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('/base/header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header').innerHTML = html;
        });
});

window.addEventListener('resize', () => {
    criarMenu();
    if(window.innerWidth >= 768){
        menu.classList.add("ativo");
    }else {
        menu.classList.remove("ativo");
    }
});