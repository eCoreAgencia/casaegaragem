import swal from 'sweetalert';
import {
  addToCart
} from '../utils';


export default (function() {
if ($('body').hasClass('product')) {

  const productID = $('#___rc-p-id').val();

  if($('.value-field.Garantia').is(':not(:empty)')){
    const garantia = $('.value-field.Garantia').text();
    $('.button--garantia').css('display', 'flex');
    $('.button--garantia strong').text(`Garantia de ${garantia}`);
  }

  $('.button--product-more').on('click', function(){
    $('#caracteristicas').toggleClass('is-active');
  })

  $('.product__share').share({ 'social': ['whatsapp','facebook']});
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
    nextArrow:shelf__next
  });

  class Product {
    constructor() {
      let self = this
      window.ImageControl = () => null
      this.skuJson = skuJson ? skuJson : skuJson_1
      this.thumbsClickEvent()
      this.simulateShipping()

      // $('.js-product-buy-button').on('click', function (e) {
      //   e.preventDefault()
      //   let quantity = $('.js-quantity-value').val()
      //   addToCart(self.skuJson.skus[0], +quantity)
      // })

      // $('.js-product-qty-button').on('click', function (e) {
      //   e.preventDefault()
      //   let val = $(this).data('value')
      //   self.changeQuantity(val)
      // })

      // $('.js-product-qty-value').on('blur', function (e) {
      //   e.preventDefault()
      //   let val = +$(this).val()
      //   if (!val || val < 1) $(this).val(1)
      // })

      $('.button--add-list').on('click', () => {
        vtexjs.checkout.getOrderForm()
        .done(function(orderForm) {
          if(!orderForm.loggedIn){
            const returnUrl = encodeURI(window.location.href);
            window.location = `/login?ReturnUrl=${returnUrl}`;

          }else{
            self.addList(orderForm.clientProfileData.email)
          }
        });
      })

      $('.button--plus').on('click', () =>{
        self.changeQuantity(1);
      })

      $('.button--minus').on('click', () =>{
        self.changeQuantity(-1);
      })

      $('.buy-button').on('click', function(e){ 
        e.preventDefault();
        let href = $(this).attr('href');
        const text = "javascript:alert('Por favor, selecione o modelo desejado.');";
        let qtd = $('.product__qtd-value').val()

        if(href === text){
          swal({
            text: 'Selecione o sku',
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

      if($('ul.thumbs li').length > 4) {
        const shelf__prev = `<button type='button' class='slick-prev shelf__button'><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M0 32.47l30.24 29.98 2.62-2.49L4.19 31.23 32.95 2.49 30.22 0 0 29.98v2.49z"/></svg></button>`
        const shelf__next = `<button type='button' class='slick-next shelf__button'><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M32.95 29.98L2.72 0 .1 2.49l28.66 28.74L0 59.96l2.73 2.49 30.22-29.98v-2.49z"/></svg></button>`
  
        $('ul.thumbs').slick({
          vertical: true,
            slidesToShow: 4,
            infinite: false,
            prevArrow: shelf__prev,
            nextArrow:shelf__next
        });
      }
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
      //window.OMSimulateShipping = new SimulateShipping()
    }

    
  }

  $(() => {
    window.OMProduct = new Product()
  })
}
})()
