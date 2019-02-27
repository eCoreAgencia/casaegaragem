import {
  addToCart,
  formatter,
  discountPrice,
} from '../utils';

import swal from 'sweetalert';


$(document).ready(function () {

  function limitWords(textToLimit, wordLimit) {
    var newText = textToLimit;
    if (textToLimit.length > wordLimit) {
      newText = `${newText.substr(0, wordLimit - 15)}...`;
    }

    return newText
  }

  $('.product--shelf').each(function () {

    const productId = $('.product__id', this).data('product-id')




    // const text = limitWords($('.product__name .product__link', this).text(), 50);
    // $('.product__name .product__link', this).html(text);

    // console.log(text);


    $('.product__name .product__link', this).ellipsis({
      lines: 2
    });

    const unvailable = $('.product__price', this)[0];
    discountPrice(this);



  });

  $('body').on('click', '.product--shelf .product__buy', function (e) {
    e.preventDefault();
    const button = $(this);
    const productID = button.parents('.product--shelf').find('.product__id').data('product-id');

    console.log(productID);




    vtexjs.catalog.getProductWithVariations(productID).done(function (product) {
      console.log(product)
      if (product.skus.length > 1) {
        let wrap = document.createElement('div');
        let skus = product.skus.map(sku => `<button class="button button--sku" value="${sku.sku}"> ${sku.skuname.replace(product.name, '').replace(' - ', '')}</button>`).join('');
        wrap.innerHTML = skus;

        let sku = '';

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
          if (value) {
            addToCart(button, value);
          }
        })

        $('body').on('click', '.button--sku', function () {
          console.log($(this).attr('value'))
          swal.setActionValue($(this).val());
        })



      } else {
        addToCart(button, product.skus[0].sku);
      }
    });


    //
  })
});
