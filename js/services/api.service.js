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
  },
]);
