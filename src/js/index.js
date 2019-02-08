import '../scss/main.scss'
import './components/share'
import './components/joker'

import './components/minicart';
//import './components/loader';
//import './components/menu';
//import './components/makeMenu';
import './components/searchForm';
import './components/shelf';
import './components/filter';
//import './components/buyBuyCategory';
import './components/product';
import './components/check_login';

import './pages/global';

import './components/buy-by-category/main'
import './components/buyList';


import './pages/home';
//import './pages/empty-search';
import './components/send-form'


$(document).ready(function(){

  $('.search-form').searchform({'vtexStore': 'casaegaragem', 'showDepartments': false});
    if($('li.helperComplement')[0]){
        $('li.helperComplement').remove();
      }

      if($('.shelf--flip')[0]){
        $('.shelf--flip').joker();
      }






      $('.newsletter .form').sendForm('NL')

    $('body').on('click', '.vtexIdUI-page .close', function(){
        window.location.href = '/';
	})

	$('link[href="//io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap-responsive.min.css"]').remove();
	$('link[href="//io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap.min.css"]').remove();
})

