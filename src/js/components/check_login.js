class checkLogin {
    constructor() {
        this.init();
    }

    init() {
        $(window).on('orderFormUpdated.vtex', (evt, orderForm) => {
            if(orderForm.loggedIn && !$('.contact_login')[0]) {
                let email = orderForm.clientProfileData.email;
                var htmlLogin = "<span class='contact__box contact_login'>"+email+"</span>";
                $(htmlLogin).insertAfter('.contact__whatsapp');
            }
        });
    }
}

window.checkLogin = new checkLogin();
