(function ($) {
   /**
    * Formulário de busca nos moldes do Rex
    * @method Searchform
    * @param {Object} options Opções do plugin
    */
   $.fn.searchform = function (options) {
     let self = $.fn.searchform
     let el = this
     let defaults = {
       vtexStore: '',
       autocomplete: true,
       showDepartments: true,
       thumbWidth: 100,
       thumbHeight: 100,
       charactersToStartAjax: 3,
       excludeKeys: [9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 91, 92, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145, 224],
     }
     let settings = $.extend({}, defaults, options)
     if (!settings.vtexStore) throw Error('[searchform] Prop vtexStore can\'t be empty.')
     let { vtexStore, autocomplete, showDepartments, thumbWidth, thumbHeight, charactersToStartAjax, excludeKeys } = settings
     let isLocalhost = ((window.location.hostname === 'localhost') || (~window.location.hostname.indexOf('192.168'))) ? true : false
     let urlPrefix = isLocalhost ? `//${vtexStore}.vtexcommercestable.com.br` : ''
     let input = el.find('.input')
     let select = el.find('.select')
     let list = $('.search-form__result-list')

     input.on('keyup focus', function () {
      $('.search-form').addClass('search-form--focus');
      
    })

    input.on('blur', function () {
      $('.search-form').removeClass('search-form--focus'); 

    })
  
     self.searchformMountResultList = function (items) {
       if (!items) return
  
       list.html('')
       items.forEach(item => {
         let { href, name, thumbUrl: thumb } = item
         let html = `
           <a class="search-form__result-item" href="${href}" title="${name}">
             ${thumb ? `
               <div class="search-form__result-img">
                 <img src="${thumb.replace('-25-25', `-${thumbWidth}-${thumbHeight}`)}" alt="${name}"/>
               </div>
             ` : ''}
             <span class="search-form__result-name">${name}</span>
           </a>
         `
         list.append(html)
       })
     }
  
     self.searchformMountDepartmentList = function (departments) {
       departments.forEach(function (department) {
         let { name } = department
         select.append(`<option value="${name}">${name}</option>`)
       })
     }
  
     self.searchformReset = function (e) {
       input.val('').trigger('input')
     }
  
     self.searchformDoSearch = function (e) {
       let search = input.val().replace(/\./g, '').replace(/(^[\s]+|[\s]+$)/g, '')
  
       if (search.length >= settings.charactersToStartAjax) {
         clearTimeout(self.timeOut)
         self.timeOut = setTimeout(() => {
           if (search === input.val()) self.searchformRequestApiData(search)
         }, 500)
       }
       else {
         if (search.length < settings.charactersToStartAjax) {
           list.removeClass('is-fetching').hide()
           self.searchformMountResultList(null)
         }
       }
  
       return false
     }
  
     self.searchformRequestApiData = function (query) {
       if (self.xhr) self.xhr.abort()
  
       list.addClass('is-fetching').show()
  
       self.xhr = $.ajax({
         type: 'GET',
         url: urlPrefix + '/buscaautocomplete/?productNameContains=' + query,
         error(err) {
           console.error(err)
           list.removeClass('is-fetching').hide()
           self.itemsReturned = null
         },
         success(data) {
           console.log(data.itemsReturned)
           list.removeClass('is-fetching')
           self.searchformMountResultList(data.itemsReturned)
         },
       })
     }
  
     self.searchformGetDepartments = function () {
       $.ajax({
         url: `${urlPrefix}/api/catalog_system/pub/category/tree/0`,
         type: 'GET',
         headers: { 'content-type': 'application/json' },
         error(err) { $('.searchform__select').hide() },
         success(data) { self.searchformMountDepartmentList(data) },
       })
     }
  
     this.on('submit', function (e) {
       e.preventDefault()
       let search = input.val().replace(/\./g, '').replace(/(^[\s]+|[\s]+$)/g, '')
       let department = select.val() ? '/' + select.val() : ''
       window.location = department + '/' + encodeURI(search)
     })
  
     if (settings.showDepartments)
       self.searchformGetDepartments()
     else
       select.remove()
  
     if (settings.autocomplete)
       input.on('input', self.searchformDoSearch)
     else
       list.remove()
   }
  })(jQuery)