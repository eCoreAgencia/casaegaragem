import '../scss/main.scss'
import './components/share'
// './components/joker'

import './components/minicart';
//import './components/loader';
//import './components/menu';
//import './components/makeMenu';
import './components/searchForm';
import './components/shelf';
import './components/filter';
//import './components/buyBuyCategory';
import './components/product';


import './components/buy-by-category/main'
import './components/buyList';


import './pages/home';
import './components/send-form';


$(document).ready(function () {
  if ($('.diff')[0]) {
    $('.diff__container').slick({
      dots: true,
      arrows: false,
      slideToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      centerMode: true,
      variableWidth: true,
      autoplay: true
    })
  }
  $('.header__search .icon-search').on('click', function () {
    $('.header__search-form').show();
    $('.search-form input').focus();
  });

  $('.icon-menu').on('click', function () {
    $('.menu--modal').addClass('is-active');
  })

  $('.menu--modal__overlay, .button--close').on('click', function (e) {
    $('.menu--modal').removeClass('is-active');
  })

  if ($('body').hasClass('search')) {
    const search = window.location.pathname;
    $('.search__word').text(`"${search}"`);
  }
  $('.search-form').searchform({
    'vtexStore': 'casaegaragem',
    'showDepartments': false
  });
  $('.newsletter .form').sendForm('NL')

  $('body').on('click', '.vtexIdUI-page .close', function () {
    window.location.href = '/';
  })

  $('.menu__dropdown > a').on('click', function (e) {
    e.preventDefault();
    $(this).parent().find('.submenu').toggleClass('is-active');
  })

  $('.has-dropdown > .navbar-link').on('click', function (e) {
    e.preventDefault();

    $('.submenu--todo').addClass('is-open');

  });

  $('.has-dropup > .navbar-link').on('click', function (e) {
    e.preventDefault();

    $('.submenu--todo').removeClass('is-open');

  });
})
