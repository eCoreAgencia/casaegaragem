import swal from 'sweetalert';
import axios from 'axios';
const R = require('ramda');

import { isLogin, getUserEmail } from '../utils';

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
		    var apiUrl = `${urlProtocol}//api.vtex.com/${variables.STORE_ID}/dataentities/${entity}/search?_where=${where}&_fields=${fields}`;
			const response = await get.get(apiUrl, fields, headers);
			return response;
            console.log(response);
        } catch(error) {
            console.log(error)
        }

    }


    const putInMasterData = (name, item) => {
        var urlProtocol = window.location.protocol;
        var apiUrl = urlProtocol + '//api.vtexcrm.com.br/casaegaragem/dataentities/' + name + '/documents';



        $.ajax({
            "headers": {
                "Accept": "application/vnd.vtex.masterdata.v10+json",
                "Content-Type": "application/json"
            },
            "url": apiUrl,
            "async" : false,
            "crossDomain": true,
            "type": "PUT",
            "data": JSON.stringify(item)
        }).success(function(data) {
            response = data;
        }).fail(function(data) {
            response = data;
        });

        return response;
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
			const userEmail = getUserEmail(orderForm);
			const products = getInMasterData('LC', `email=${userEmail}`, 'products');

		}

		$(window).on('orderFormUpdated.vtex', (evt, orderForm) => {
			getProducts()
		});
	};



});
