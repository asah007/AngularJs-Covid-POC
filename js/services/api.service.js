angular.module("myModule").service("ApiService", [
  "$http",
  "$q",
  "ApiConfig",
  function ($http, $q,ApiConfig) {
    this.getCovidDetails = function () { 
      var deferred = $q.defer();
      $http({
        method: "GET",
        url: ApiConfig.covidDataUrl,
        cache: true,
      })
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (msg) {
          deferred.reject(msg);
        });

      return deferred.promise;
    };

    this.getCovidDetailsByCountry = function (countryName) {
      var deferred = $q.defer();
      $http({
        method: "GET",
        url: ApiConfig.covidDataByCountry(countryName),
        cache: true,
      })
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (msg) {
          deferred.reject(msg);
        });
      return deferred.promise;
    };


    this.getProducts = function(){
      var deferred = $q.defer();
      $http({
        method: "GET",
        url: ApiConfig.productsUrl,
        cache: true,
      })
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (msg) {
          deferred.reject(msg);
        });
      return deferred.promise;
    }

    this.addProduct = function(newProduct){
      var deferred = $q.defer();
      $http({
        url: ApiConfig.addproductUrl,
        method: "POST",
        data: newProduct
      })
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (msg) {
          deferred.reject(msg);
        });
      return deferred.promise;
    }

    this.updateProduct = function(product,id){
      var deferred = $q.defer();
      $http({
        url: ApiConfig.updateProductUrl(id),
        method: "PUT",
        data: product
      })
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (msg) {
          deferred.reject(msg);
        });
      return deferred.promise;
    }

    this.deleteProduct = function(id){
      console.log("Service ---- "+ id);
      var deferred = $q.defer();
      $http({
        url: ApiConfig.deleteProductUrl(id),
        method: "DELETE",
      })
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (msg) {
          deferred.reject(msg);
        });
      return deferred.promise;
    }

  },
]);
