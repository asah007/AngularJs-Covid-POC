angular.module("myModule").service("ApiConfig", [

     // return APIs URLS //
    function(){
      this.covidDataUrl = "https://covid19.mathdro.id/api"
      this.productsUrl    = "https://fakestoreapi.com/products"    
      this.addproductUrl  = "https://fakestoreapi.com/products" 
      this.orderByPrice = "https://services.odata.org/OData/OData.svc/Products?$orderby=Price asc&$format=json"
      this.getCount = "https://services.odata.org/OData/OData.svc/Products/$count"
      this.getCategories = "https://services.odata.org/V3/(S(qzuttktpdu4t4ahxu22biwzo))/OData/OData.svc/Categories?$format=json"
      this.addCategory = "https://services.odata.org/V3/(S(qzuttktpdu4t4ahxu22biwzo))/OData/OData.svc/Categories"
      
      this.covidDataByCountry = function (countryName) {
        return "https://covid19.mathdro.id/api/countries/" + countryName;
       }

      this.updateProductUrl = function(id){
              return "https://fakestoreapi.com/products/"+ id
      } 

      this.deleteProductUrl = function(id){
        return "https://fakestoreapi.com/products/"+ id
      }

      this.getODataProducts = function(top,skip){
        return "https://services.odata.org/V3/(S(qzuttktpdu4t4ahxu22biwzo))/OData/OData.svc/Products?$select=ID,Name,Description,Rating,ReleaseDate,Price&$top="+top+"&$skip="+skip+"&$format=json"
      }

      this.filterRatings = function(rating){
        return "https://services.odata.org/OData/OData.svc/Products?$filter=Rating eq "+rating+"&$format=json"
      }

     
      this.deleteCategory = function(id){
      return "https://services.odata.org/V3/(S(qzuttktpdu4t4ahxu22biwzo))/OData/OData.svc/Categories("+id+")?$format=json"
      }
    }
  
]);
