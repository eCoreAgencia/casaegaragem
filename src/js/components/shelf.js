import {
  addToCart,
  formatter
} from '../utils';

import swal from 'sweetalert';
/*
import Price from '../modules/price';

import vtexRequest from '../modules/vtexRequest';


export const productShelf = (product, list = false) => {

  const {
    productId,
    name,
    link,
    skus,
    image,
    categories
  } = product
  const price = new Price(skus[0]);
  const getUrlImage = (item) => item.images[0].imageUrl;
  const getUrlImageTag = (image, width, height) => {
   image = image.replace('#width#', width)
   image = image.replace('#height#', height)
   image = image.replace('~', 'http://casaegaragem.vteximg.com.br')
   image = image.replace('-undefined', '')

    return image;
  };


  let product_shelf = `
    <div class="product product--shelf" data-product-id="${productId}">
      <div class="product__header">
        <div class="product__media">
          <a class="product__link" href="${link}" tabindex="-1">
                ${getUrlImageTag(image, 279, 365)}
          </a>
        </div>
        <div class="product__actions">
          <a class="button product__link" title="Nome do produto" href="${link}" tabindex="-1">Ver Produto</a><a class="button button--primary product__buy" href="${link}" data-product-id="225047" tabindex="-1">Compre Rápido</a></div>
      </div>
	    <div class="product__reviews"></div>
      <div class="product__info">
        <h3 class="product__name"><a class="product__link" title="${name}" href="${link}" tabindex="-1"> ${name} </a></h3>
        <div class="product__price">
          ${price.mont(skus[0])}
        </div>
      </div>
      ${ categories ? `<div class="product__category"><a class="button" href="/category.html" tabindex="-1">+ Iluminação</a></div>` : ''}

    </div>`;

  if (list) product_shelf = `<li>${product_shelf}</li>`
  return product_shelf;
}*/

$(document).ready(function () {

$('.product--shelf').each(function(){

    const productId = $('.product__id', this).data('product-id')

    const unvailable = $('.product__unavailable', this)[0];
    if(!unvailable) {
        const priceElement = $('.product__price .price__list', this);
        let price = parseFloat(priceElement.html().replace('R$ ', '').replace('.', '').replace(',', '.').replace(' no boleto', ''));
        price = formatter.format(price * 0.9);
        price = `${price} no boleto`;
        priceElement.html(price);
    }
    
    // vtexjs.catalog.getProductWithVariations(productId).done(function(product){
    //     const sku = product.skus[0]

    //     const html = sku.bestPrice ? sku.bestPriceFormated.replace('R$ ', '').replace(',', '.') : sku.listPriceFormated.replace('R$').replace(',', '.')
    //     if(sku.bestPrice){
    //         console.log(sku.bestPrice, 'list');
    //         priceElement.html(html);
    //     }else{
    //         console.log(sku.listPrice, 'best');
    //     }

    // })

});

  $('body').on('click','.product--shelf .product__buy', function (e) {
    e.preventDefault();
    const button = $(this);
    const productID = button.parents('.product--shelf').find('.product__id').data('product-id');

    console.log(productID);




    vtexjs.catalog.getProductWithVariations(productID).done(function(product){
        console.log(product)
        if(product.skus.length > 1){
            let wrap = document.createElement('div');
            let skus = product.skus.map(product => `<button class="button button--sku" value="${product.sku}"> ${product.skuname}</button>`).join('');
            wrap.innerHTML = skus;

            let sku = ''

            swal({
                text: "Selecione a voltagem",
                content: wrap,
                buttons: {
                    cancel: {
                        text: "Cancelar",
                        className: "button"
                    },
                    confirm: {
                        text: "Comprar",
                        value: '',
                        visible: true,
                        className: "button button--primary",
                        closeModal: true
                    }
                }

            }).then((value) => {
                console.log(value, 'modal');
                if(value){
                    addToCart(button, value);
                }
            })

            $('body').on('click', '.button--sku', function(){
                console.log($(this).attr('value'))
                swal.setActionValue($(this).val());
            })



        }else{
            addToCart(button, product.skus[0].sku);
        }
    });


    //
  })
});
