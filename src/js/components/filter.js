class Filter {
  constructor(){
    this.menu = document.querySelector('.logo ');
    this.init();
  }

  init(){
    $('.orderBy .select select').on('change', function(){
      const value = $(this).val();
      window.location.href = window.location.pathname + '?PS=12&' + value;
    })

    if(this.isExist(this.menu)){
      console.log(this.menu);
    } else {
      console.log('Não existe');
    }

    $('.filter .search-single-navigator h4').each(function(){
		const html = $(this).html();

		$('.filter__category .filter__options').append(html);
	})

    $('.filter fieldset h5').each(function(){
      if($(this).next('div').find('label')[0]){
        const text = $(this).text();
        let label = $(this).next('div').html();
        const html = `
          <li class="filter__item"><span><i class="icon-arrow-left"></i> <span>${text}</span></span>
            <div class="filter__options">
              ${label}
            </div>
          </li>`
        $('.filter__menu').append(html);
      }
    })

    $(".filter input[type='checkbox']").vtexSmartResearch();
  }

  isExist(e){
    const exist = (e == null) ? false : true;
    return exist;
  }
}

if($('body').hasClass('category')){
  window.filter = new Filter();
}

$(document).ready(function(){

  $('.filter__item').on('click', function(e) {
    e.stopPropagation();
    $(this).toggleClass('is-active');
    $('.filter__actions').toggleClass('is-active');
  })

  $('.order__item').on('click', function(e) {
    e.stopPropagation();
    $(this).toggleClass('is-active');
    $('.filter__actions').toggleClass('is-active');
  })

  $('#filter').on('click', function(e) {
    $('.filter__box').addClass('is-active');
    $('.order__box').removeClass('is-active');
  })

  $('#order').on('click', function(e) {
    $('.order__box').addClass('is-active');
    $('.filter__box').removeClass('is-active');
  })

  $('.filter__actions').on('click', function(){
    $(this).removeClass('is-active');
    $('.filter__item').removeClass('is-active');
  })
})
