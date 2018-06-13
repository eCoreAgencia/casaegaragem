function orderBy(pos){
	var orderBySelect = $(".orderBy").first();
	orderBySelect.find("select option").eq(pos).prop("selected", true);
    orderBySelect.find("select option").eq(pos).change();
    orderBySelect.find("select option").eq(pos).trigger('change');
}

function orderByFilterLink(){
	if($('body').hasClass('busca-vazia')) return false;
	
	var filter = $('<div/>').addClass('filter').append($('<span/>').addClass('filter-label').text('Filtrar:')).append($('<ul/>'));
	var mais_vendidos, menor_preco, maior_preco, alfabetica, url;

	mais_vendidos = $('<li/>').append($('<a/>').text('Mais Vendidos').attr({rel:"3"}));
	menor_preco   = $('<li/>').append($('<a/>').text('Menor Preço').attr({rel:"1"}));
	maior_preco   = $('<li/>').append($('<a/>').text('Maior Preço').attr({rel:"2"}));
	alfabetica    = $('<li/>').append($('<a/>').text('Alfabética').attr({rel:"5"}));

	var rel;

	switch(getUrlParameter("O")){
		case "OrderByPriceASC":
		rel = 1;
		break;

		case "OrderByPriceDESC":
		rel = 2;
		break;

		case "OrderByTopSaleDESC":
		rel = 3;
		break;

		case "OrderByReviewRateDESC":
		rel = 4;
		break;

		case "OrderByNameASC":
		rel = 5;
		break;

		case "OrderByNameDESC":
		rel = 6;
		break;

		case "OrderByReleaseDateDESC":
		rel = 7;
		break;

		default:
		rel = 3;
		break;
	}

	filter.find('ul').append(mais_vendidos).append(menor_preco).append(maior_preco).append(alfabetica);
  	filter.find("a[rel="+rel+"]").attr("href","#").parent().addClass("current");
  	
	$('.section-products .section-content .section-head').append(filter);

	filter.find("a").on('click', function (event) {
		var pos = $(this).attr("rel");
		orderBy(pos);
		event.preventDefault();
	});
}