
// Module Declared //
var app = angular.module("myModule", [ "ngRoute" ]);

// Routers Defined //
app.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/corona", {
        templateUrl: "pages/covid.html",
        controller: "CovidCtrl",
      })
      .when("/products", {
        templateUrl: "pages/products.html",
        controller: "ProductCtrl",
      })
      .when("/oData", {
        templateUrl: "pages/oData.html",
        controller: "ODataCtrl",
      })
      .when("/oData-crud", {
        templateUrl: "pages/oData-crud.html",
        controller: "CrudCtrl",
      });;
  },
]);

// Controllers Declared //
app.controller('CovidCtrl',CovidCtrl);
app.controller('ProductCtrl',ProductCtrl);
app.controller('ODataCtrl',ODataCtrl);
app.controller('CrudCtrl',CrudCtrl);









