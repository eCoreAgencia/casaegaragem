import swal from 'sweetalert';
import vtexRequest from '../modules/vtexRequest';

$(document).ready(function () {

    const listUrlEmail = `/api/dataentities/LC/search?email=`;

    const api = new vtexRequest();

                

    let isLogin = false;

    if(sessionStorage.getItem('userList')){
        sessionStorage.setItem('userList', '');
    }

    
    const checkIsLogin = () => {
        vtexjs.checkout.getOrderForm()
            .done(function(orderForm) {
                if(orderForm.loggedIn){
                    logged(orderForm.clientProfileData.email);
                }
            });
    }

    const listExist = (email) => {
        let exist = false;
        const data = api.getFromMasterData('LC', `email=${email}`, 'products,email'); 

        if(data.length > 0){
            exist = true;
        }

        return exist;
    }

    const logged = (email) => {
        sessionStorage.setItem('email', email)
    }
    const login = (productID) => {
        window.location = `/login`;
    }


    const addList = (productID) => {
        const email =  sessionStorage.getItem('email');

        if(listExist(email)){
            if(userList.products.find(product => product==productID)){
                swal({
                    text: 'Esse Produto já está na Lista',
                    icon: 'warning',
                  })
                  return false;
            }
            userList.products.push(productID);

            listUpdate(userList);
        }else{

            const list = {
                email: sessionStorage.getItem('email'),
                products: productID
            }
            const data = api.postFromMasterData('LC', list);
            console.log(data); 
        }

    }

    const listUpdate = (userList) => {

    }

    $('.button--add-list').on('click', () => {

        const productID = $('#___rc-p-id').val();
        if(sessionStorage.getItem('email')) {
            addList(productID);
        }else{
            
            sessionStorage.setItem('productID', productID);
            login(productID)
        }
    });

    checkIsLogin();


    if(sessionStorage.getItem('productID')){
        addList(sessionStorage.getItem('productID'))
    }
  
  
});