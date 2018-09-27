import swal from 'sweetalert';
import vtexRequest from '../modules/vtexRequest';

$(document).ready(function () {

    




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

        postInMasterData('LC', item);

    }

    const updateList = (item, productId) => {
        
        item.products.push(productId);

        putInMasterData('LC', item);

    }

    const postInMasterData = (entity, fields) => {
        var urlProtocol = window.location.protocol;
		var apiUrl = `${urlProtocol}//api.vtex.com/casaegaragem/dataentities/${entity}/documents`;


        $.ajax({
            "headers": {
                "Accept": "application/vnd.vtex.ds.v10+json",
                "Content-Type": "application/json"
            },
            "url": apiUrl,
            "async" : false,
            "crossDomain": true,
            "type": "POST",
            "data": JSON.stringify(fields)
        }).success(function(data) {
            swal({
                text: 'Produto Adicionado',
                icon: 'success',
            })
            $('.button--add-list').removeClass('is-loading');
        }).fail(function(data) {
            swal({
                text: 'Não foi possível adicionar o produto',
                icon: 'error',
              })
            console.log(data);
            $('.button--add-list').removeClass('is-loading');
        });

        //return response;
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
        }
    }

    $(window).on('orderFormUpdated.vtex', (evt, orderForm) => {
        if(orderForm.loggedIn){
            window.userEmail = orderForm.clientProfileData.email;
            checkLogin();
        }
    })
  
  
});