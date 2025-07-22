let menu = document.querySelector("#menu");

function clickMenu(){
    if (menu.style.display != "flex"){
        menu.style.display = "flex";
    } else {
        menu.style.display = "none";
    }
}

function mudouTamanho(){
    if(window.innerWidth >= 768){
        menu.style.display = "block";
    }
}