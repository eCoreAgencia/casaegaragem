
// $.getScript('http://io.vtex.com.br/vtex.js/2.2.0/vtex.min.js');


// <script type="text/javascript">
// 	var _st_account = 1027;
// 	(function () {
// 		var ss = document.createElement('script');
// 		ss.type = 'text/javascript';
// 		ss.async = true;
// 		ss.src = '//app.shoptarget.com.br/js/tracking.js';
// 		var sc = document.getElementsByTagName('script')[0];
// 		sc.parentNode.insertBefore(ss, sc);
// 	})();

// </script>

(function() {
  var method;
  var noop = function() {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    if (!console[method]) {
      console[method] = noop;
    }
  }
});

jQuery.fn.simulateClick = function() {
	return this.each(function() {
		if ('createEvent' in document) {
			var doc = this.ownerDocument,
			evt = doc.createEvent('MouseEvents');
			evt.initMouseEvent('click', true, true, doc.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			this.dispatchEvent(evt);
		} else {
			this.click();
		}
	});
}

var body = $('body'),
	htmlBody = $('html, body'),
	$document = $(document),
	header = $('#header'),
	submenuDesktopWrapper = $('.js-submenu-wrap'),
	userSubmenu = $('.submenu-user'),
	sidePanelMobile = $('.side-panel'),
	mobileSubmenu = $('.submenu-mobile'),
	minicart = $('.minicart'),
	slide = $('.slide'),
	slideShelf = $('.slideShelf'),
	slideBrands = $('.slideBrands'),
	carousel = $('.shelf-carousel'),
	backToTop = $('.js-back-to-top'),
	shelf = $('.prateleira'),
	paginatedShelf = $('.prateleira[id*=ResultItems]'),
	orderList = $('.order-list'),
	formNews = $('.newsletter'),
	depCatBus = $('.dep-cat-bus'),
	pagProduto = $('.produto'),
	sidebar = $('.sidebar');
	skuTamanhoAro = $('.Tamanhodoaro');
	btModalAro = $('.bt-modal-aro');

$(function() {

	// Ajuste Meus Pedidos //
		if (skuTamanhoAro.length > 0) {
			btModalAro.addClass('active');
		}
	// Ajuste Meus Pedidos //

	// Verificação tamanho aro anel //
		if (orderList.length > 0) {
			orderList.find('link').remove();
			orderList.find('.page-header').unwrap('.container');
		}
	// Verificação tamanho aro anel //


	// BreadCrumb Ajuste Texto //
		try {
			$('.bread-crumb').find('li:first-child a').text('Home');
		} catch (e) {}
	// BreadCrumb Ajuste Texto //


	// Remocao de Li HelperComplement Prateleira //
		if ($('.helperComplement').length) {
			$('.helperComplement').remove();
		}
	// Remocao de Li HelperComplement Prateleira //


  	// Voltar ao Topo
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();

			if (scroll >= 450) {
				$('.js-back-to-top').addClass('active');
			} else {
				$('.js-back-to-top').removeClass('active');
			}
		});

		body.on('click', '.js-back-to-top', function(event) {
		    event.preventDefault();
		    htmlBody.animate({ scrollTop: 0 }, 300);
		});

		body.on('click', '.bt-open-news', function(event) {
		    event.preventDefault();
		    htmlBody.animate({ scrollTop: 3500 }, 300);
		});
		body.on('click', '.rating-click-here', function(event) {
		    event.preventDefault();
		    htmlBody.animate({ scrollTop: 3500 }, 300);
		});
  	// Voltar ao Topo

	// Compra Rapida
		body.on('click', '.btn-fast-buy', function(event) {
			event.preventDefault();
			var url = $(this).attr('href');
			$.get(url, function(data) {
				vtexjs.checkout.getOrderForm().done(function(orderForm) {
					console.log(orderForm);
					htmlBody.animate({ scrollTop: 0 }, 300);
				});
			});
		});
	// Compra Rapida

	// Slider
		if (slide.length > 0) {
			slide.slick({
				adaptiveHeight: true,
				autoplay: true,
				autoplaySpeed: 5000,
				pauseOnHover: false,
				arrows: true,
				dots: true,
				draggable: true,
				touchMove: true,
				slidesToShow: 1,
				slidesToScroll: 1
			});
		}
	// Slider

	// slideShelf
		if (slideShelf.length > 0) {
		    $('.home').find('.slideShelf .prateleira').find('ul').slick({
				adaptiveHeight: true,
				autoplay: false,
				arrows: true,
				dots: false,
				mobileFirst: true,
				draggable: true,
				touchMove: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 4
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 479,
						settings: {
							slidesToShow: 2
						}
					}
				]
		    });
		}

		if (slideShelf.length > 0) {
		    $('.busca-vazia').find('.slideShelf .prateleira').find('ul').slick({
				adaptiveHeight: true,
				autoplay: false,
				arrows: true,
				dots: false,
				mobileFirst: true,
				draggable: true,
				touchMove: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 4
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 479,
						settings: {
							slidesToShow: 2
						}
					}
				]
		    });
		}

		if (slideShelf.length > 0) {
		    $('.produto').find('.slideShelf .prateleira').find('ul').slick({
				adaptiveHeight: true,
				autoplay: false,
				arrows: true,
				dots: false,
				mobileFirst: true,
				draggable: true,
				touchMove: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 4
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 479,
						settings: {
							slidesToShow: 2
						}
					}
				]
		    });
		}
		
	// slideShelf //

	// Menu SidePanel //
		var sidePanelMobile = $(".side-panel"),
		    header = $("header");
		    header.on("click", ".js-open-mobile-menu", function(event) {
		   	$('.close-menu').addClass('active');
	        event.preventDefault(), sidePanelMobile.addClass("side-panel--open")
	    });

	    header.on("click", ".js-close-mobile-menu", function(event) {
	        event.preventDefault(), sidePanelMobile.removeClass("side-panel--open")
		   	$('.close-menu').removeClass('active');
	    });

		$("#menu-mob li.has-sub a.menu-anchor-sidepanel").click(function() {
			$(this).removeAttr("href");
			$(this).toggleClass("active");
			$(this).next().slideToggle();
		});
	// Menu SidePanel //

	// Smart Research //
		if (sidebar.length > 0) {
			try {
				sidebar.find('input[type="checkbox"]').vtexSmartResearch({
					authorizeScroll:function(){return true;},
					elemLoading: '',
					returnTopText: '',
					elemLoading:'<i class="shelf__loading"></i>',
					filterScrollTop: function(shelfOffset) {
						return 20;
					}
				});
			} catch(e) {}
		}
	// Smart Research //


	// Frete Gratis Aberto //
		try {
			$document.ready(function(){
				$('.shipping-value').simulateClick('click');
			});
		} catch(e) {}
	// Frete Gratis Aberto //


	// Menu Persistente Begin //
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();

			if (scroll >= 350) {
				$('header').addClass('menu-persistente');
				$('body').addClass('top-height-active');
			} else {
				$('header').removeClass('menu-persistente');
				$('body').removeClass('top-height-active');
			}
		});
    // Menu Persistente END //

    // Remocao Loading Meus Pedidos//
		try {
			$document.ajaxStop(function() {
				orderList.parents('html').removeClass('is-loading');
			});
		} catch(e) {}
    // Remocao Loading Meus Pedidos//

    // Filtros departamento //
	    $('h5').click(function(){
		    $(this).next().slideToggle();
		});
	// Filtros departamento //

	// Colocando video na descrição //
		$('td.Video').appendTo('.descricao');
	// Colocando video na descrição //

	//Mostra Lupa no Mobile //

		$(".search-mob").click(function(){
		    $(".searchform-mob").show()
		});

	//Mostra Lupa no Mobile //


	// if($('body.produto.kit').length > 0) {

 //        $('.opcao-kit.one #valor-boleto').text().clone().appendTo('.opcao-kit.two #valor-boleto');

	// }

});