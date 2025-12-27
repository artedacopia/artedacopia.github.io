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

function mudouTamanho(){
    criarMenu();
    if(window.innerWidth >= 768){
        menu.classList.add("ativo");
    }else {
        menu.classList.remove("ativo");
    }
}