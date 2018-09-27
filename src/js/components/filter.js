class Filter {
  constructor(){
    this.menu = document.querySelector('.logo ');
    this.init();
  }

  init(){
    $('.orderBy .select select').on('change', function(){
      const value = $(this).val();
      window.location.href = window.location.href + '?PS=12&O=' + value;
    })
    
    if(this.isExist(this.menu)){
      console.log(this.menu);
    } else {
      console.log('Não existe');
    }

    $('.filter .search-multiple-navigator fieldset').each(function(){
      if($('div', this).find('label')[0]){
        const text = $('h5', this).text();
        let label = $('div', this).html();
        const html = `
          <li class="filter__item"><span>${text}</span>
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
  $(document).ready(function(){
    window.filter = new Filter();
  })
 
}

