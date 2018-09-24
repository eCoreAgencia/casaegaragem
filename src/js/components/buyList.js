import vtexRequest from '../modules/vtexRequest';

class BuyList {
    constructor() {
        const LCEndpoint = `/api/dataentities/LC/search`;
        
        this.isLogged();

        $(window).on('userLogged', this.getList());
        $(window).on('userListUpdated', function(){
            console.log(window.userList);
            if($('body').hasClass('product')){
                
            }
        });
    }

    isLogged(){
        vtexjs.checkout.getOrderForm()
        .done(function(orderForm) {
          if(orderForm.loggedIn){
            window.userEmail = orderForm.clientProfileData.email;  
            $(window).trigger('userLogged');
          }
      });
    }

    requestListByEmail(email) {
        const api = new vtexRequest();
        const list = api.getDocumentsSearchMD('LC', `?email=${email}`);
        return list;
    }

    getList(){
        const list = this.requestListByEmail(window.userEmail).then(data => {
            if(data.length){
                window.userList = data[0].productIds;
                $(window).trigger('userListUpdated');    
            }
        });
    }
}

$(document).ready(function () {

    window.buyList = new BuyList();
  
  
  })