class Global{
    constructor() {
        if($('body').hasClass('search')){
            this.renameTitle();
        }
    }

    renameTitle() {
        let titleUrl = window.location.href;

        if(titleUrl.indexOf('&colecao=')) {
            let title = titleUrl.split('&colecao=')[1];

            $('.search-word .search__word').text(title.replace(/%20/g, ' ').replace(/%C3%A7/g, 'ç').replace(/%C3%AA/g, 'ê'));
        }

        // var urlBusca = window.location.href;
        // var nomeDaColecao = document.querySelector(".search__word");
        // var buscaPor = document.querySelectorAll(".search__title");
    
        // if(urlBusca.indexOf("?fq=H:") != -1){
        //     nomeDaColecao.textContent = document.title;
        //     buscaPor.style.display = "none";
        // }
    }
}


$(document).ready(function(){
    window.Global = new Global();
})