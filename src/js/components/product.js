import swal from 'sweetalert';
import {
	addToCart,
	formatter
} from '../utils';

import SimulateShipping from './simulateShipping';

export default (function () {
	if ($('body').hasClass('product')) {

		const productID = $('#___rc-p-id').val();
		vtexjs.catalog.getProductWithVariations(productID).done(function (product) {
			//console.log(product)
			if(product.available){
                const priceElement = $('.skuBestPrice');
                if($('.economia-de')[0]){
                    $('.economia-de').insertBefore('.price-installments');
                }
                console.log(priceElement.html());
                let price = parseFloat(priceElement.html().replace('R$ ', '').replace('.', '').replace(',', '.'));
                price = formatter.format(price * 0.9);
                price = `<em class="valor-boleto price-boleto"><strong class="skuBoletoPrice">ou ${price} no boleto</strong></em>`;
        
                
                
                $(price).insertAfter('.price-installments');
              }
		})



		if ($('.value-field.Garantia').is(':not(:empty)')) {
			const garantia = $('.value-field.Garantia').text();
			$('.button--garantia').css('display', 'flex');
			$('.button--garantia strong').text(`Garantia de ${garantia}`);
		}

		$('.button--product-more').on('click', function () {
			$('#caracteristicas').toggleClass('is-active');
		})

		$('.product__share').share({
			'social': ['whatsapp', 'facebook']
		});
		let thumbs = $('.thumbs')
		let fix_zoom = function () {
			window.LoadZoom = function (pi) {
				let zoomImage = $(".image-zoom")
				// zoomImage.jqzoom()
				$('.zoomPup, .zoomWindow, .zoomPreload').remove()
				if (!zoomImage.length) {
					let img = $('#image-main')
					let imgUrl = img.attr('src')
					img.wrap(`<a href="${imgUrl}" class="image-zoom" />`)
				}
				let zoom = $('#image').addClass('easyzoom easyzoom--overlay').easyZoom()
				window.zoomAPI = zoom.data('easyZoom')
				window.ImageControl = () => null
			}
			LoadZoom(0)
		}
		$(fix_zoom)



		const shelf__prev = `<button type='button' class='slick-prev shelf__button'><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M0 32.47l30.24 29.98 2.62-2.49L4.19 31.23 32.95 2.49 30.22 0 0 29.98v2.49z"/></svg></button>`
		const shelf__next = `<button type='button' class='slick-next shelf__button'><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M32.95 29.98L2.72 0 .1 2.49l28.66 28.74L0 59.96l2.73 2.49 30.22-29.98v-2.49z"/></svg></button>`

		$('.shelf__carousel--full ul').slick({
			arrows: true,
			slideToShow: 4,
			slidesToScroll: 1,
			infinite: true,
			variableWidth: true,
			prevArrow: shelf__prev,
			nextArrow: shelf__next
		});

		class Product {
			constructor() {
				let self = this
				window.ImageControl = () => null
				this.skuJson = skuJson ? skuJson : skuJson_1
				this.thumbsClickEvent()
				this.simulateShipping()



				if ($('td.buy')[0]) {
					$('.section__buy-together').show();
				}

				if ($('td.buy')[0]) {

					const regex = /Valor total:.*/gmi;
					const str = $('td.buy').html();
					let m = str.match(regex);
					console.log(m);
					m = m[0].replace('Valor total:  R$ ', 'Compre todos por  <strong>R$ ');


					const price = '<span class="price-cash">' + m + '</strong></span>';

					if (!$('td.buy span').hasClass('price-cash')) {
						$(price).insertBefore('td.buy .comprar-junto');
					}


				}

				if ($('.flag.leve-mais-pague-menos')[0]) {
					$('.product__more').addClass('is-active');
					$('.buy-more__inner').empty();


					const desc = [{
							leve: 2,
							pague: 0.02
						},
						{
							leve: 3,
							pague: 0.07
						},
						{
							leve: 4,
							pague: 0.06
						},
						{
							leve: 5,
							pague: 0.08
						},
						{
							leve: 6,
							pague: 0.1
						},
					]
					console.log(desc);
					desc.map(item => {
						console.log($('.skuBestPrice').html())
						const skuPrice = $('.skuBestPrice').html().replace('R$', '').replace('.', '').replace(',', '.').replace('&nbsp;', '') * 0.9;

						console.log(skuPrice);
						const html = `
            <div class="buy-more__item">
                    <span class="buy-more__text">Leve ${item.leve} pague <strong>${formatter.format(skuPrice - skuPrice*item.pague)}</strong> cada</span>
                </div>`;
						$('.buy-more__inner').append(html);
					});



				}

				$('.button--more-products').on('click', () => {
					$('.buy-more').toggleClass('is-active');
				})

				$('body').on('click', function (e) {
					console.log(e.target);

					const buyMore = document.querySelector('.button--more-products')
					if (e.target != buyMore && e.target.parentNode != buyMore) {
						$('.buy-more').removeClass('is-active');
					}
				})

				$('.button--change').on('click', function (e) {
					e.preventDefault()
					const wrapText = $('.texto-troca').html();
					let wrap = document.createElement('div');
					wrap.innerHTML = wrapText
					swal({
						className: 'swal--product',
						content: wrap
					})
				})


				$('.button--garantia').on('click', function (e) {
					e.preventDefault()
					const wrapText = $('.texto-garantia').html();
					let wrap = document.createElement('div');
					wrap.innerHTML = wrapText
					swal({
						className: 'swal--product',
						content: wrap
					})
				})

				$('.button--add-list').on('click', () => {
					vtexjs.checkout.getOrderForm()
						.done(function (orderForm) {
							if (!orderForm.loggedIn) {
								const returnUrl = encodeURI(window.location.href);
								window.location = `/login?ReturnUrl=${returnUrl}`;

							} else {
								self.addList(orderForm.clientProfileData.email)
							}
						});
				})

				$('.button--plus').on('click', () => {
					self.changeQuantity(1);
				})

				$('.button--minus').on('click', () => {
					self.changeQuantity(-1);
				})

				$('.buy-button').on('click', function (e) {
					e.preventDefault();
					let href = $(this).attr('href');
					const text = "javascript:alert('Por favor, selecione o modelo desejado.');";
					let qtd = $('.product__qtd-value').val()

					if (href === text) {
						swal({
							text: 'Selecione o modelo',
							icon: 'warning',
						})
						return false;
					}

					href = href.split('?');
					href = href[1].split('&');
					const sku = href[0].split('=');
					console.log(sku);
					addToCart($(this), sku[1], qtd)

				});
				const thumbsCarousel = () => {
					const shelf__prev = `<button type='button' class='slick-prev shelf__button'><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M0 32.47l30.24 29.98 2.62-2.49L4.19 31.23 32.95 2.49 30.22 0 0 29.98v2.49z"/></svg></button>`
					const shelf__next = `<button type='button' class='slick-next shelf__button'><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M32.95 29.98L2.72 0 .1 2.49l28.66 28.74L0 59.96l2.73 2.49 30.22-29.98v-2.49z"/></svg></button>`

					$('ul.thumbs').slick({
						vertical: true,
						slidesToShow: 3,
						infinite: false,
						prevArrow: shelf__prev,
						nextArrow: shelf__next
					});
				}

				if ($('ul.thumbs li').length > 3) {
					thumbsCarousel();
				}


				$(window).on('skuSelected', function () {

					if ($('ul.thumbs li').length > 3) {
						$('ul.thumbs').slick('unslick');

						setTimeout(function () {
							thumbsCarousel();
						}, 2000)

					}

				})


			}

			changeQuantity(val) {
				let currentVal = $('.product__qtd-value').val()
				let newVal = +currentVal + +val
				if (newVal) {
					$('.product__qtd-value').val(newVal)
				}
			}

			thumbsClickEvent() {
				thumbs.on('click', 'a', function (e) {
					e.preventDefault()
					let imgUri = $(this).attr('rel')
					zoomAPI._init()
					zoomAPI.swap(imgUri, imgUri)
					if (!imgUri) {
						zoomAPI.teardown()
					}
					thumbs.find('a').removeClass('ON')
					$(this).addClass('ON')
				})
			}

			simulateShipping() {
				window.SimulateShipping = new SimulateShipping()
			}


		}

		$(() => {
			window.OMProduct = new Product()
		})
	}
})()
