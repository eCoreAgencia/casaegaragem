import swal from 'sweetalert';

export let isLocalhost = ~window.location.host.indexOf('localhost') ? true : false;
export const vtexSearchPageEndpoint = (query, shelfId, ps) => `/buscapagina?&ft=${query}&PS=${ps}&sl=${shelfId}&cc=50&sm=0&PageNumber=1`;
export const vtexcategoryTreeEndpoint = (level) => `/api/catalog_system/pub/category/tree/${level}`;
export const vtexSeachProductByCategoryEndpoint = (categoryId) => `/api/catalog_system/pub/products/search/?fq=C:${categoryId}`;

export const addToCart = function(button, id, quantity = 1, seller = '1', redirect = false) {
	let item = { id, quantity, seller }
    console.log(item)
    button.addClass('button');
    button.addClass('is-loading');
	vtexjs.checkout.addToCart([item], null, 1)
	  .done(orderForm => {
        swal({
            text: 'Produto Adicionado\n Deseja fazer o que agora?',
            icon: 'success',
            buttons: {
                continue: {
                    text: "Continuar Comprando",
                    value: false,
                    className: "button"
                },
                checkout: {
                    text: "Finalizar Pedido",
                    value: true,
                    className: "button button--primary"
                }
            }
        }).then((value) => {
            if(value){
                window.location.href = "/checkout/#/cart"
            }
        });
          button.removeClass('is-loading');
	  })
}

export const slugify = (string) => {
  const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
  const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
  const p = new RegExp(a.split('').join('|'), 'g')
  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple — with single -
    .replace(/^-+/, '') // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
}

export const myLoad = (url, sourceContainer, targetContainer, replace) => {
  var xhr = new XMLHttpRequest();
  xhr.onerror = function() {
    throw "Request failed. HTTP code " + xhr.status;
  };
  xhr.onload = function() {
    if (!xhr.status || (xhr.status >= 400)) {
      throw "Request failed. HTTP code " + xhr.status;
    }
    var temp = document.createElement("DIV");
    temp.innerHTML = xhr.responseText;
    var ele = temp.querySelector(sourceContainer);
    if (ele) {
      if (replace) {
        targetContainer.innerHTML = ele.outerHTML;
      } else {
        targetContainer.appendChild(ele);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

export const formatter = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
	minimumFractionDigits: 2
})

export const isLogin = (orderForm) => orderForm.loggedIn;

export const getUserEmail = (orderForm) => orderForm.clientProfileData.email;

export const discountPrice = (element) => {
	if ($('.product__price .price__list', element)[0]) {
		const priceElement = $('.product__price .price__list', element);
		const priceInstallment = $('.product__price .price', element);
		let price = parseFloat(priceElement.html().replace('R$ ', '').replace('.', '').replace(',', '.').replace(' no boleto', ''));
		price = formatter.format(price * 0.9);
		price = `<span class="price__boleto">${price} <small> no boleto</small><span>`;
		priceInstallment.append(price);
	}
}
