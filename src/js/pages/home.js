import {
  addToCart,
  formatter,
  discountPrice,
} from '../utils';





$(document).ready(function () {
  if ($('body').hasClass('home')) {
    if ($('li.helperComplement')[0]) {
      $('li.helperComplement').remove();
    }

    if ($('.call__box')[0]) {
      $('.call__box').each(function () {
        const img = $('img', this).attr('src');

        $(this).css('background-image', 'url(' + img + ')');
      })
    }

    var $gallery = $('.banner--full .banner__inner');
    var slideCount = null;

    $gallery.on('init', function (event, slick) {
      slideCount = slick.slideCount;
      setSlideCount();
      setCurrentSlideNumber(slick.currentSlide);
    });

    $gallery.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      setCurrentSlideNumber(nextSlide);
    });

    function setSlideCount() {
      var $el = $('.slide-count-wrap').find('.total');
      $el.text(function (i, n) {
        var result = Number(n) + 1;
        if (result < 10) {
          return "0" + slideCount;
        } else {
          return result;
        }
      })
    }

    function setCurrentSlideNumber(currentSlide) {
      var $el = $('.slide-count-wrap').find('.current');
      var n = currentSlide + 1;
      $el.text(function (i, n) {
        var result = currentSlide + 1;
        if (result < 10) {
          return "0" + result;
        } else {
          return result;
        }
      });

    }




    $gallery.slick({
      dots: true,
      autoplay: true,
      arrows: false,
      fade: true,
      infinite: false
    });

    $('.banner--full .box-banner').each(function () {
      const img = $('img', this).attr('src');
      $(this).css('background-image', 'url("' + img + '")');
    })



    const shelf__prev = `<button type='button' class='slick-prev shelf__button'><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M0 32.47l30.24 29.98 2.62-2.49L4.19 31.23 32.95 2.49 30.22 0 0 29.98v2.49z"/></svg></button>`
    const shelf__next = `<button type='button' class='slick-next shelf__button'><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M32.95 29.98L2.72 0 .1 2.49l28.66 28.74L0 59.96l2.73 2.49 30.22-29.98v-2.49z"/></svg></button>`






    $(".shelf__carousel--full").each(function (index) {
      var shelf = $('.prateleira > ul', this);
      const ulLength = shelf.length;
      console.log(ulLength);
      shelf.find("li.helperComplement").remove();
      shelf.addClass('owl-carousel');

      $('.owl-carousel', this).owlCarousel({
        items: 2,
        dots: true
      });


    });



    $('.shelf__brand').slick({
      arrows: false,
      dots: true,
      slideToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      centerMode: true,
      variableWidth: true
    });




    $(window).on('productFinished', function () {
      console.log('productFinished');


      $('.buy-by-category .product--shelf').each(function () {

        if (!$(this).hasClass('price--updated')) {
          $(this).addClass('price--updated')
          $('.product__name .product__link', this).ellipsis({
            lines: 2
          });
          const unvailable = $('.product__price', this)[0];
          discountPrice(this);
        }


      });
      $('.buy-by-category .shelf ul:not(.owl-carousel)').each(function () {
        if ($('li.helperComplement', this)[0]) {
          $('li.helperComplement', this).remove();
        }

        $(this).addClass('owl-carousel');

        $(this).owlCarousel({
          items: 2,
          dots: true
        });
        $(this).parents('.shelf').removeClass('shelf--loading');
      })
    })
  }
})
