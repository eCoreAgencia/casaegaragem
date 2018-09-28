// Price from '../modules/price';

(function($) {
    $.fn.joker = function(options) {



        var element = $(this);

        var defaults = {};

        var settings = $.extend( {}, defaults, options );

        var html = '';
        var methods = {
            init: function() {

                
                var urlProtocol = window.location.protocol;
                var apiUrl = `${urlProtocol}//api.vtex.com/casaegaragem/dataentities/PC/search?_where=active=True&_fields=productId,text`;
                var response;
        
                $.ajax({
                    "headers": {
                        "Accept": "application/vnd.vtex.masterdata.v10.profileSchema+json"
                    },
                    "url": apiUrl,
                    "async": false,
                    "crossDomain": true,
                    "type": "GET"
                }).success(function (data) {
                    data.map(item => {
                        console.log(item, 'masterData')
                        methods.create(item)
                    })
                }).fail(function (data) {
                    response = data;
                });
                
            },
            getPrice: function(product){
                const price = new Price(product);
                return price.mont(product);
            },
            getUrlImageTag: function(image, width, height){

                image = image.replace('#width#', width)
                image = image.replace('#height#', height)
                image = image.replace('~', 'http://casaegaragem.vteximg.com.br')
                image = image.replace('-undefined', '')

                return image;
            },
            create: function(item){
                const urlProduct = `/api/catalog_system/pub/products/search?fq=productId:${item.productId}`;
                $.ajax({
                    url: urlProduct,
                    type: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "rapplication/json"
                    }
                }).done(function (product) {
                    methods.render(item.text, product[0]);
                })

                //vtexjs.ca

            },
            render: function(text, item){

                let {
					link,
					productName,
					items,
					productId
				} = item
				let imgId = items[0].images[0].imageId
                let thumb = `http://casaegaragem.vteximg.com.br/arquivos/ids/${imgId}-120-120`

                vtexjs.catalog.getProductWithVariations(productId).done(function (data) {
                    let bestPriceFormated = `<span class="price__list">${data.skus[0].bestPriceFormated} no boleto</span>`;
					let listPriceFormated = `<span class="price__list">${data.skus[0].listPriceFormated} no boleto</span>`;
					let stock = data.skus[0].availablequantity;
					let listPrice = data.skus[0].listPrice;
					let html = '';
					let parcelas = data.skus[0].installments;
                    let valorParcela = data.skus[0].installmentsValue;
                    if(valorParcela !== 0){
                        var num = valorParcela / 100;
                        valorParcela = parseFloat(num).toFixed(2).replace('.',',');
                    }
                    let installments = `<span class="price__instament">${parcelas}x de R$ ${valorParcela} sem juros</span>`

                    
                    
                    var shelf = `<div class="product product--shelf product--shelf-flip">
                        <div class="product__flip">
                        <div class="product__front">
                            <div class="product__front-inner">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1342" height="1024" viewBox="0 0 1342 1024">
                                <path d="M-0.001 268.217c38.825-6.682 83.539-10.501 129.147-10.501 16.288 0 32.464 0.487 48.51 1.448l-2.209-0.106c24.965 2.127 46.233 16.218 58.241 36.449l0.189 0.346c4.271 7.205 12.008 11.959 20.854 11.959 0.832 0 1.652-0.042 2.462-0.124l-0.102 0.008h661.525c18.793 0 18.793 0 11.844 16.74-11.37 27.793-23.372 55.43-33.794 83.539-2.059 7.842-9.084 13.533-17.439 13.533-1.093 0-2.161-0.097-3.2-0.284l0.109 0.016h-528.872c-13.581 0-18.793 3.001-16.582 16.74 1.579 10.107 1.579 20.688 3.632 30.794 6.632 31.584 20.371 44.060 53.218 48.955 13.852 1.941 29.855 3.050 46.116 3.050 2.053 0 4.102-0.018 6.147-0.053l-0.307 0.004h289.151c12.159 0 15.792 1.579 10.264 14.212-12.634 29.215-24.32 59.061-35.689 88.909-1.912 6.723-7.999 11.565-15.215 11.565-0.873 0-1.729-0.070-2.563-0.206l0.091 0.012c-26.367-1.079-57.314-1.695-88.405-1.695-55.132 0-109.812 1.934-163.977 5.737l7.291-0.41c-24.951 1.895-33.636 10.422-39.006 34.742-2.684 11.844-5.054 23.846-7.896 35.689-1.422 6.474 0 9.949 7.422 9.317h527.452c15.792 0 15.792 0 9.317 14.687-12.792 29.215-26.056 58.272-38.375 87.645-1.649 7.096-7.917 12.304-15.402 12.304-0.75 0-1.488-0.052-2.211-0.153l0.084 0.010c-158.867 1.106-317.735 1.422-476.601 0-29.531 0-59.061-2.842-88.593-3.79-34.427-1.106-50.219-27.478-53.376-55.113-0.879-7.747-1.38-16.724-1.38-25.819 0-41.395 10.389-80.364 28.704-114.441l-0.634 1.292c4.106-8.212 5.527-11.686-5.685-13.423-47.375-7.58-75.959-36.638-89.54-82.433-9.508-29.834-17.211-65.235-21.662-101.64l-0.289-2.903c0.148-0.758 0.233-1.628 0.233-2.519 0-7.588-6.151-13.739-13.739-13.739-1.263 0-2.485 0.17-3.646 0.489l0.096-0.023c-18.635 1.422-37.584 0-56.377 0-0.497 0.063-1.070 0.1-1.652 0.1-5.195 0-9.714-2.882-12.050-7.135l-0.036-0.072c-27.636-45.797-55.588-91.435-83.382-137.233-0.87-1.84-1.63-3.999-2.165-6.245l-0.046-0.229zM823.707 991.014c-36.39-0.089-65.854-29.608-65.854-66.010 0-0.166 0.001-0.333 0.002-0.499v0.025c0-36.892 29.907-66.799 66.799-66.799s66.799 29.907 66.799 66.799v0c0.005 0.293 0.007 0.639 0.007 0.985 0 36.194-29.341 65.537-65.537 65.537-0.781 0-1.558-0.013-2.331-0.040l0.112 0.004zM350.423 991.014c-0.335 0.006-0.73 0.010-1.125 0.010-35.585 0-64.431-28.847-64.431-64.431 0-0.558 0.007-1.116 0.022-1.672l-0.001 0.083c-0.006-0.33-0.010-0.72-0.010-1.111 0-36.369 29.483-65.853 65.853-65.853 0.28 0 0.561 0.001 0.841 0.005h-0.042c36.498 0.446 65.924 30.093 66.010 66.633v0.008c0.005 0.289 0.007 0.629 0.007 0.971 0 36.108-29.271 65.379-65.379 65.379-0.613 0-1.225-0.008-1.834-0.025l0.090 0.002zM1115.542 191.784l10.739 29.057c0.449 1.012 1.447 1.707 2.605 1.707s2.156-0.693 2.598-1.689l0.007-0.018 10.739-29.057c8.88-23.553 27.139-41.813 50.102-50.497l0.59-0.195 29.057-10.739c1.012-0.449 1.707-1.447 1.707-2.605s-0.693-2.156-1.689-2.598l-0.018-0.007-29.057-10.739c-23.553-8.88-41.813-27.139-50.497-50.102l-0.195-0.59-10.739-29.057c-0.449-1.012-1.447-1.707-2.605-1.707s-2.156 0.693-2.598 1.689l-0.007 0.018-10.739 29.057c-8.88 23.553-27.139 41.813-50.102 50.497l-0.59 0.195-29.057 10.739c-1.012 0.449-1.707 1.447-1.707 2.605s0.693 2.156 1.689 2.598l0.018 0.007 29.057 10.739c23.564 8.861 41.831 27.128 50.497 50.103l0.195 0.589zM1264.934 334.7l7.58 20.688c0.318 0.748 1.046 1.264 1.895 1.264s1.577-0.515 1.89-1.25l0.005-0.013 7.58-20.688c6.327-16.807 19.356-29.835 35.743-36.024l0.421-0.14 20.688-7.58c0.748-0.318 1.264-1.046 1.264-1.895s-0.515-1.577-1.25-1.89l-0.013-0.005-20.688-7.58c-16.807-6.327-29.835-19.356-36.024-35.743l-0.14-0.421-7.58-20.688c-0.318-0.748-1.046-1.264-1.895-1.264s-1.577 0.515-1.89 1.25l-0.005 0.013-7.58 20.688c-6.327 16.807-19.356 29.835-35.743 36.024l-0.421 0.14-20.688 7.58c-0.748 0.318-1.264 1.046-1.264 1.895s0.515 1.577 1.25 1.89l0.013 0.005 20.688 7.58c16.807 6.327 29.835 19.356 36.024 35.743l0.14 0.421zM1127.703 467.196l5.37 14.37c0.242 0.461 0.716 0.77 1.264 0.77s1.022-0.31 1.26-0.762l0.004-0.007 5.37-14.37c4.4-11.665 13.443-20.71 24.817-25.012l0.293-0.097 14.37-5.37c0.461-0.242 0.77-0.716 0.77-1.264s-0.31-1.022-0.762-1.26l-0.007-0.004-14.37-5.37c-11.665-4.4-20.71-13.443-25.012-24.817l-0.097-0.293-5.37-14.37c-0.242-0.461-0.716-0.77-1.264-0.77s-1.022 0.31-1.26 0.762l-0.004 0.007-5.37 14.37c-4.4 11.665-13.443 20.71-24.817 25.012l-0.293 0.097-14.37 5.37c-0.461 0.242-0.77 0.716-0.77 1.264s0.31 1.022 0.762 1.26l0.007 0.004 14.37 5.37c11.665 4.4 20.71 13.443 25.012 24.817l0.097 0.293z"></path>
                                </svg>

                            <p class="product__flip-phrase">${text}</p>
                            <span class="product__flip-action">(Clique para revelar o nome)  </span>
                            </div>
                        </div>
                        <div class="product__back">      <span class="product__id" data-product-id="${productId}"></span>
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
                            </div>
                            <div class="product__reviews"></div>
                            <div class="product__actions">
                                <a class="button product__link" title="${productName}" href="${link}">Ver Produto</a>
                                <a class="button button--primary product__buy" href="${link}" data-product-id="${productId}">Compre Rápido</a></div>
                        </div>
                        </div>
                    </div>`

                    html += `<li>${shelf}</li>`;
                    element.find('ul').append(html);
                });
                

                
                
                
            }

        }
        return this.each(function() {
            methods.init();
        });
    };
})(jQuery)