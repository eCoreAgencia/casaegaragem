import '../scss/main.scss'
import './modules/vtexRequest'
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


import './components/buy-by-category/main'
import './components/buyList';


import './pages/home';
import './pages/empty-search';


$(document).ready(function(){
    if($('li.helperComplement')[0]){
        $('li.helperComplement').remove();
      }

      if($('.shelf--flip')[0]){
        $('.shelf--flip').joker();
      }
})

