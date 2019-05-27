
import Price from '../modules/price';


$(document).ready(function(){
    if($('body').hasClass('catalog')){
        let smartResearchOptions = {
            filtersMenu: '.search-multiple-navigator',
            emptySearchMsg: '<h3>Esta combinação de filtros não retornou nenhum resultado!</h3>',
            showSelectedFilters: false,
            elemLoading: '<div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
            callback: function () {
                $('li.helperComplement').remove()
            },
            shelfCallback: function () {
                $('li.helperComplement').remove()
            }
        }
		window.location.search.indexOf('profissionais') != -1 ? $('.banner.banner__category.banner--profi').show() : null;
		window.location.search.indexOf('fa%C3%A7a%20voc%C3%AA%20mesmo') != -1 ? $('.banner.banner__category.banner--faca').show() : null;
		window.location.search.indexOf('leve%20mais') != -1 ? $('.banner.banner__category.banner--leve').show() : null;
	}
})
