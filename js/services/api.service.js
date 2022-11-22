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

    this.getODataProducts = function(top,skip){
    
      var deferred = $q.defer();
      $http({
        method: "GET",
        url: "https://services.odata.org/V3/(S(qzuttktpdu4t4ahxu22biwzo))/OData/OData.svc/Products?$select=ID,Name,Description,Rating,ReleaseDate,Price&$top="+top+"&$skip="+skip+"&$format=json",
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

    this.getFilterRatings = function(rating){
    
      var deferred = $q.defer();
      $http({
        method: "GET",
        url: "https://services.odata.org/OData/OData.svc/Products?$filter=Rating eq "+rating+"&$format=json",
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

    this.orderByPrice = function(){
      var deferred = $q.defer();
      $http({
        method: "GET",
        url: "https://services.odata.org/OData/OData.svc/Products?$orderby=Price asc&$format=json",
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

    this.getCount = function(){
      var deferred = $q.defer();
      $http({
        method: "GET",
        url: "https://services.odata.org/OData/OData.svc/Products/$count",
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

    this.getCategories = function(){
      var deferred = $q.defer();
      $http({
        method: "GET",
        url: "https://services.odata.org/V3/(S(qzuttktpdu4t4ahxu22biwzo))/OData/OData.svc/Categories?$format=json",
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


    this.addCategory = function(cat){
      var deferred = $q.defer();
      console.log({...cat,"odata.type":"ODataDemo.Category"});
      $http({
        url: "https://services.odata.org/V3/(S(qzuttktpdu4t4ahxu22biwzo))/OData/OData.svc/Categories",
        method: "POST",
        data: {...cat,"odata.type":"ODataDemo.Category"}
      })
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (msg) {
          deferred.reject(msg);
        });
      return deferred.promise;
    }

    this.deleteCategory = function(id){
      console.log("Service ---- "+ id);
      var deferred = $q.defer();
      $http({
        url: "https://services.odata.org/V3/(S(qzuttktpdu4t4ahxu22biwzo))/OData/OData.svc/Categories("+id+")?$format=json",
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
