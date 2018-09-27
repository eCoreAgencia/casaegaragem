import requestHttp from './requestHttp';
import * as api from './endpoint';
import variables from '../../../config/variables';

export default class vtexRequest {




	async getCategoryTree(level) {
		try {
			const http = new requestHttp();
			const response = await http.get(api.vtexCategoryTree(level));
			const categoryTree = await response.json();
			return categoryTree;
		} catch (err) {
			console.log(err);
		}

	}

	async getProductsByCategoryId(id) {
		try {
			const http = new requestHttp();
			const response = await http.get(api.vtexSeachProductByCategory(id));
			const products = await response.json();
			return products;
		} catch (err) {
			console.log(err);
		}
	}

	async getProductById(id) {
		try {
			const http = new requestHttp();
			const response = await http.get(api.vtexSeachProductByCategory(id));
			const product = await response.json();
			return product;
		} catch (err) {
			console.log(err);
		}
	}

	async getProductWithVariations(id) {
		try {
			const http = new requestHttp();
			const response = await http.get(api.vtexProductWithVariations(id));
			const product = await response.json();
			return product;
		} catch (err) {
			console.log(err);
		}
	}

	async getProductWithShelfId(query, shelfId, ps) {
		try {
			const http = new requestHttp();
			const response = await http.get(api.vtexSearchPage(query, shelfId, ps));
			const search = await response.text();
			return search;
		} catch (err) {
			console.log(err);
		}
	}

	async getDocumentsSearchMD(entity, query) {
		try {
			const http = new requestHttp();
			const response = await http.get(api.vtexMasterDataSearch(entity, query));
			const search = await response.json();
			return search;
		} catch (err) {
			console.log(err);
		}
	}

	getFromMasterData(entity, where, fields) {
		var urlProtocol = window.location.protocol;
		var apiUrl = `${urlProtocol}//api.vtex.com/${variables.STORE_ID}/dataentities/${entity}'/search?_where=${where}&_fields=${fields}`;
		var response;

		$.ajax({
			"headers": {
				"Accept": "application/vnd.vtex.masterdata.v10.profileSchema+json"
			},
			"url": apiUrl,
			"async": false,
			"crossDomain": true,
			"type": "GET"
		}).success(function (data) {
			response = data;
		}).fail(function (data) {
			response = data;
		});

		return response;
    }
    
    postInMasterData(entity, fields) {
        var urlProtocol = window.location.protocol;
		var apiUrl = `${urlProtocol}//api.vtex.com/${variables.STORE_ID}/dataentities/${entity}'/search?_where=${where}&_fields=${fields}`;
		var response;  
        
    
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
            response = data;
        }).fail(function(data) {
            response = data;
        });
        
        return response;
    }
}
