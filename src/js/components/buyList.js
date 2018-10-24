import swal from 'sweetalert';
import axios from 'axios';
const R = require('ramda');

import { isLogin, getUserEmail, formatter } from '../utils';

$(document).ready(function () {








    const headers = {
        "headers": {
            "Accept": "application/vnd.vtex.ds.v10+json",
            "Content-Type": "application/json"
        }
    }





    $('.button--add-list').on('click', function(){
        const productID = $('#___rc-p-id').val();

        if(window.userEmail){
            addList(window.userEmail, productID)
        }else {
            login();
        }
    })

    const login = () => {
        sessionStorage.setItem('logged', true);
        window.location.href = '/login';
    }

    const addList = (email, productID) => {
        $('.button--add-list').addClass('is-loading');
        let item = {
            email: email,
            products: productID
        }
        const response = postInMasterData('LC', item);
        response.then(res => {
            if(res.status == 201){
                swal({
                    text: 'Produto Adicionado',
                    icon: 'success',
				})

				$('.button--add-list').removeClass('is-loading');
				$('.button--add-list').html('Adicionado');
            }
        });

    }



    const postInMasterData = async (entity, fields) => {
        try {
            var urlProtocol = window.location.protocol;
		    var apiUrl = `${urlProtocol}//api.vtex.com/casaegaragem/dataentities/${entity}/documents`;
			const response = await axios.post(apiUrl, fields, headers);
			return response;
            console.log(response);
        } catch(error) {
            console.log(error)
        }

	}

	const getInMasterData = async (entity, where, fields) => {
        try {
            var urlProtocol = window.location.protocol;
		    var apiUrl = `${urlProtocol}//api.vtex.com/casaegaragem/dataentities/${entity}/search?_where=${where}&_fields=${fields}`;
			const response = await axios.get(apiUrl, fields);
			return response;
            console.log(response);
        } catch(error) {
            console.log(error)
        }

    }

    const deleteInMasterData = async (entity, id) => {
        try {
            var urlProtocol = window.location.protocol;
		    var apiUrl = `${urlProtocol}//api.vtex.com/${variables.STORE_ID}/dataentities/${entity}/documents/${id}`;
			const response = await axios.get(apiUrl, fields, headers);
			return response;
        } catch(error) {
            console.log(error)
        }

    }


    


    const checkLogin = () => {
        const logged = sessionStorage.getItem('logged');
        const productID = $('#___rc-p-id').val();

        if(logged){

			addList(window.userEmail, productID)
			sessionStorage.removeItem('logged');
        }
    }

    $(window).on('orderFormUpdated.vtex', (evt, orderForm) => {
        if(isLogin){
            window.userEmail = getUserEmail(orderForm);
            checkLogin();
        }
	})

	if($('body').hasClass('buy-list')){
		const getProducts = () => {
            $(window).on('orderFormUpdated.vtex', (evt, orderForm) => {
                const userEmail = getUserEmail(orderForm);
<<<<<<< HEAD
                const products = getInMasterData('LT', `email=${userEmail}`, 'product,id');

                // const products = [
                //     {
                //         "email": "luiz.felipe@ecorecomunicacao.com",
                //         "product": "600",
                //         "id": "2f40593c-d6fc-11e8-823b-0e494be63d08"
                //     },
                //     {
                //         "email": "luiz.felipe@ecorecomunicacao.com",
                //         "product": "670",
                //         "id": "35560eaf-d6fc-11e8-823b-123488b5d30a"
                //     },
                //     {
                //         "email": "luizgodneo@gmail.com",
                //         "product": "700",
                //         "id": "90cd2457-d700-11e8-823b-0e42ca7902b8"
                //     },
                //     {
                //         "email": "luizgodneo@gmail.com",
                //         "product": "770",
                //         "id": "9a252893-d700-11e8-823b-0abb30915d54"
                //     },
                //     {
                //         "email": "luiz.felipe@ecorecomunicacao.com",
                //         "product": "603",
                //         "id": "43151185-d6fc-11e8-823b-123488b5d30a"
                //     },
                //     {
                //         "email": "luizgodneo@gmail.com",
                //         "product": "600",
                //         "id": "85bae485-d700-11e8-823b-0e04396e001c"
                //     }
                // ];

                const render = (item) => {
                    const element = $('.shelf ul');

                    let {
                        link,
                        productName,
                        items,
                        productId
                    } = item
                    let imgId = items[0].images[0].imageId
                    let thumb = `http://casaegaragem.vteximg.com.br/arquivos/ids/${imgId}-120-120`
    
    
                    let price = parseFloat(priceElement.html().replace('R$ ', '').replace(',', '.').replace(' no boleto', ''));
        price = formatter.format(price * 0.9);
        price = `${price} no boleto`;
    
                    vtexjs.catalog.getProductWithVariations(productId).done(function (data) {
                        let bestPriceFormated = `<span class="price__list">${formatter.format(parseFloat(data.skus[0].bestPriceFormated.replace('R$ ', '').replace(',', '.')) * 0.9)} no boleto</span>`;
                        let listPriceFormated = `<span class="price__list">${formatter.format(parseFloat(data.skus[0].listPriceFormated.replace('R$ ', '').replace(',', '.')) * 0.9)} no boleto</span>`;
                        let stock = data.skus[0].availablequantity;
                        let listPrice = data.skus[0].listPrice;
                        let html = '';
                        let parcelas = data.skus[0].installments;
                        let valorParcela = data.skus[0].installmentsValue;
                        if(valorParcela !== 0){
                            var num = valorParcela / 100;
                            valorParcela = formatter.format(num);
                        }
                        let installments = `<span class="price__instament">${parcelas}x de R$ ${valorParcela} sem juros</span>`
    
    
    
                        var shelf = `<div class="product product--shelf">
                            <span class="product__id" data-product-id="${productId}"></span>
                                <div class="product__header">
                                    <div class="product__media">
                                        <a class="product__link" href="${link}">
                                            <img src="${thumb}" alt="${productName}"/>
                                        </a>
                                    </div>
                                    <div class="product__info">
                                    <h3 class="product__name"><a class="product__link" title="${productName}" href="${link}">${productName}</a></h3>
                                    <div class="product__price">
                                        <div class="price">
                                            ${(listPrice !== 0) ? listPriceFormated : bestPriceFormated}
                                            ${(valorParcela !== 0) ? installments : ''}
                                        </div>
                                    </div>
                                </div>
                                <div class="product__reviews"></div>
                                <div class="product__actions">
                                    <a class="button product__link" title="${productName}" href="${link}">Ver Produto</a>
                                    <a class="button button--primary product__buy" href="${link}" data-product-id="${productId}">Compre Rápido</a></div>
                        </div>`
    
                        html += `<li>${shelf}</li>`;
                        element.find('ul').append(html);
                    });
    
                }

        
                

                products.map( item => {
                    
                    const urlProduct = `/api/catalog_system/pub/products/search?fq=productId:${item.product}`;
                    $.ajax({
                        url: urlProduct,
                        type: "GET",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "rapplication/json"
                        }
                    }).done(function (product) {
                        render(product[0]);
                    })
                    
                });




                
            });     
        }
        
        
=======
                const products = getInMasterData('LT', `email=${userEmail}`, 'product');

                console.log(products);
            });     
		}
>>>>>>> develop

		getProducts()
	};



});


class BuyList {
    constructor() {

    }

    getBuyListbyUser(email) {
        const userEmail = email;
        const userBuyList = '';

        userBuyList.cache = userBuyList.cache || {}
        const endpoint = `//api.vtex.com/casaegaragem/dataentities/LT/search?_where=email=${email}&_fields=product,id`

        return userBuyList;

    }

    async renderProduct(productId) {
        const product = await this.getProduct(productId);
        const productVariations = await this.getProductWithVariations(productId);
    }

    getProduct(productId) {
        getProduct.cache = getProduct.cache || {}
        const endpoint = `/api/catalog_system/pub/products/search?fq=productId:${productId}`
        
        return new Promise((resolve, reject) => {
          let res = getProduct.cache[query]
          if (res) return resolve(res)
          else {
            return fetch(endpoint)
              .then(data => {
                getProduct.cache[product] = data.json()
                return resolve(getProduct.cache[product])
              })
              .catch(err => reject(err))
          }
          //return reject("Couldn't get product.")
        })
    }

    getProductWithVariations(productId) {
        getProductWithVariations.cache = getProductWithVariations.cache || {}
        const endpoint = `/api/catalog_system/pub/products/variations/${productId}`
        
        return new Promise((resolve, reject) => {
          let res = getProductWithVariations.cache[query]
          if (res) return resolve(res)
          else {
            return fetch(endpoint)
              .then(data => {
                getProductWithVariations.cache[product] = data.json()
                return resolve(getProductWithVariations.cache[product])
              })
              .catch(err => reject(err))
          }
          //return reject("Couldn't get product.")
        })
    }
}
