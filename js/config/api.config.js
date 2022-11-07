angular.module("myModule").service("ApiConfig", [
    function(){
      this.covidDataUrl = "https://covid19.mathdro.id/api"
      this.covidDataByCountry = function (countryName) {
             return "https://covid19.mathdro.id/api/countries/" + countryName;
            }
      this.productsUrl    = "https://fakestoreapi.com/products"    
      this.addproductUrl  = "https://fakestoreapi.com/products" 
      this.updateProductUrl = function(id){
              return "https://fakestoreapi.com/products/"+ id
      } 

      this.deleteProductUrl = function(id){
        return "https://fakestoreapi.com/products/"+ id
      }
    }
  
]);
