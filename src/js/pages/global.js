class Global{
    constructor() {
        if($('body').hasClass('search')){
            this.renameTitle();
        }
    }

    renameTitle() {
        var urlBusca = window.location.href;
        var nomeDaColecao = document.querySelector(".search__word");
        var buscaPor = document.querySelectorAll(".search__title");
    
        if(urlBusca.indexOf("?fq=H:") != -1){
            nomeDaColecao.textContent = document.title;
            buscaPor.style.display = "none";
        }
    }
}

window.Global = new Global();
