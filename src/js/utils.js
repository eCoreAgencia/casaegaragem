export let isLocalhost = ~window.location.host.indexOf('localhost') ? true : false;
export const vtexSearchPageEndpoint = (query, shelfId, ps) => `/buscapagina?&ft=${query}&PS=${ps}&sl=${shelfId}&cc=50&sm=0&PageNumber=1`;
export const vtexcategoryTreeEndpoint = (level) => `/api/catalog_system/pub/category/tree/${level}`;
export const vtexSeachProductByCategoryEndpoint = (categoryId) => `/api/catalog_system/pub/products/search/?fq=C:${categoryId}`;

export const addToCart = function(id, quantity = 1, seller = '1', redirect = false) {
	let item = { id, quantity, seller }
	vtexjs.checkout.addToCart([item], null, 1)
	  .done(orderForm => {
	    console.log(orderForm);
	  })
}
