


/* $('.shelf__carousel--category ul').slick({
  arrows: true,
  slideToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  centerMode: true,
  variableWidth: true,
  prevArrow: shelf__prev,
  nextArrow:shelf__next
}); */


$(document).ready(function(){
  if($('body').hasClass('home')){
    if($('li.helperComplement')[0]){
      $('li.helperComplement').remove();
    }

    var $gallery = $('.banner--full .banner__inner');
    var slideCount = null;

    $gallery.on('init', function(event, slick){
      slideCount = slick.slideCount;
      setSlideCount();
      setCurrentSlideNumber(slick.currentSlide);
    });

    $gallery.on('beforeChange', function(event, slick, currentSlide, nextSlide){
      setCurrentSlideNumber(nextSlide);
    });

    function setSlideCount() {
      var $el = $('.slide-count-wrap').find('.total');
      $el.text(function (i, n) {
          var result = Number(n) + 1;
          if ( result < 10 ) {
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
          if ( result < 10 ) {
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

    $('.shelf__brand ul').slick({
      arrows: true,
      slideToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      centerMode: true,
      variableWidth: true,
      prevArrow: shelf__prev,
      nextArrow:shelf__next
    });
  }
})
