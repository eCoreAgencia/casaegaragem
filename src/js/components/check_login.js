class checkLogin {
    constructor() {
        this.init();
    }

    init() {
        vtexjs.checkout.getOrderForm().done(function(orderForm) {
            let stateLogin = true;
            let email = orderForm.clientProfileData.email;
            if(stateLogin) {
                var htmlLogin = "<span class='contact__box contact_login'>"+email+"</span>";
                $(htmlLogin).insertAfter('.contact__whatsapp');
            }
        });
    }
}

window.checkLogin = new checkLogin();