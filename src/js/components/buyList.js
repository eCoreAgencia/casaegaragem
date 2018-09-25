//import swal from 'sweetalert';

$(document).ready(function () {

    const listUrlEmail = `/api/dataentities/LC/search?email=`;

    let isLogin = false;

    if(sessionStorage.getItem('userList')){
        sessionStorage.setItem('userList', '');
    }

    
    const checkIsLogin = () => {
        vtexjs.checkout.getOrderForm()
            .done(function(orderForm) {
                if(orderForm.loggedIn){
                    console.log(orderForm.loggedIn)
                    logged(orderForm.clientProfileData.email);
                }
            });
    }

    const listExist = (email) => {
        let exist = false;

        $.ajax({
            url: listUrlEmail + email,
            type: "GET",
            headers: {
                Accept: "application/vnd.vtex.masterdata.v10.profileSchema+json",
                "REST-Range": "resources=0-900"
            }
        }).done(function(data){
            if(data.length > 0){
                exist = true;
            }
        })

        return exist;
    }

    const logged = (email) => {
        sessionStorage.setItem('email', email)
    }
    const login = (productID) => {
        //const returnUrl = encodeURI(window.location.href);
        sessionStorage.setItem('productID', productID);
        window.location = `/login`;
    }


    const addList = (productID) => {
        const email =  sessionStorage.getItem('email');

        if(listExist(email)){
            if(userList.products.find(product => product==productID)){
                // swal({
                //     text: 'Esse Produto já está na Lista',
                //     icon: 'warning',
                //   })
                  return false;
            }
            userList.products.push(productID);

            listUpdate(userList);
        }

    }

    const listUpdate = (userList) => {

    }

    $('.button--add-list').on('click', () => {

        const productID = $('#___rc-p-id').val();
        if(sessionStorage.getItem('email', email)) {
            login(productID)
        }else{
            addList(productID);
        }
    });

    checkIsLogin();


    if(sessionStorage.getItem('productID')){
        addList(sessionStorage.getItem('productID'))
    }
  
  
});