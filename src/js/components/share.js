(function($) {
    $.fn.share = function(options) {

        var element = $(this);

        var defaults = {
            'social': ['facebook', 'whatsapp', 'google', 'pinterest', 'twitter'],
            'message': 'Veja o que eu encontrei nesse site'

        };

        var shareInner = '';
  
        var settings = $.extend( {}, defaults, options );

        var methods = {
            create: function() {
        
                //console.log(message);
        
                settings.social.map(function(social){
        
                    var pageUrl = window.location.href;
                    var pageMedia = $('#image-main').attr('src');
                    switch(social) {
                        case 'facebook':
                            var href = "http://www.facebook.com/sharer.php?u=" + pageUrl;
                            var link = `<a target="_blank" class="share--${social}" href="${href}"><i class="icon-${social}"></i></a>`
                            methods.html(link)
                            break;
                        case 'twitter':
                            var href = "http://twitter.com/home?status="+settings.message+" "+ pageUrl;
                            var link = `<a target="_blank" class="share--${social}" href="${href}" ><i class="icon-${social}"></i></a>`
                            methods.html(link)
                            break;
                        case 'whatsapp':
                            var href = "whatsapp://send?text="+settings.message;
                            var link = `<a target="_blank" class="share--${social}" href="${href}" data-href="${pageUrl}"><i class="icon-${social}"></i></a>`
                            methods.html(link)
                            break;
                        case 'google':
                            var href = "https://plus.google.com/share?url=" + pageUrl;
                            var link = `<a target="_blank" class="share--${social}" href="${href}"><i class="icon-${social}"></i></a>`
                            methods.html(link)
                            break;
                        case 'pinterest':
                            var href = "https://pinterest.com/pin/create/button/?url="+pageUrl+"&media="+pageMedia+"&description=Olha%20o%20que%20eu%20achei";
                            var link = `<a target="_blank" class="share--${social}" href="${href}" data-href="${pageUrl}><i class="icon-${social}"></i></a>`
                            methods.html(link)
                            break;
                        case 'email':
                            var href = "mailto:?subject="+message+"&amp;body=" + pageUrl;
                            var link = `<a target="_blank" class="share--${social}" href="${href}" data-href="${pageUrl}><i class="icon-${social}"></i></a>`
                            methods.html(link)
                            break;
                        default:
                            
                    }
                });
            },
            html: function(link){
                shareInner += `<li>${link}</li>`;
                const shareHtml = `<div class="share"><span class="share__text">Compartilhe: </span>
                <ul class="share__list">${shareInner}</ul>
              </div>`
              element.html(shareHtml);
            }
        }
        return this.each(function() {
            methods.create();
        });
    };
})(jQuery)