var app = angular.module("myModule", ["ngRoute"]);
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

app.controller("CovidCtrl", function ($scope, ApiService) {
  $scope.data = {};
  $scope.dataByCountry = {};
  $scope.countryName = "";
  $scope.showCountryData = false;
  $scope.showData = false;
  $scope.errorMsg = "";
  $scope.showErrMsg = false;

  setTimeout(() => {
    ApiService.getCovidDetails().then(function (response) {
      $scope.data = response;
      $scope.showData = true;
    });
  }, 500);

  $scope.getByCountry = function () {
    $scope.errorMsg = "";
    $scope.showErrMsg = false;
    $scope.showSpinner = true;
    $scope.showCountryData = false;
    setTimeout(() => {
      ApiService.getCovidDetailsByCountry($scope.countryName)
        .then(function (response) {
          $scope.dataByCountry = response;
          $scope.showCountryData = true;
          $scope.showSpinner = false;
        })
        .catch(function (err) {
          $scope.showErrMsg = true;
          $scope.showSpinner = false;
          $scope.errorMsg = err.error.message;
        });
    }, 2000);
  };
});

app.controller("ProductCtrl", function ($scope, ApiService) {
  $scope.showProducts = false;
  $scope.products = [];
  $scope.addProductModal = function () {
    $scope.product = {
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
    };
  };

  $scope.addEditModal = function (prod) {
    $scope.productId = prod.id;
    $scope.product = {
      title: prod.title,
      description: prod.description,
      price: prod.price,
      category: prod.category,
      image: prod.image,
    };
  };

  $scope.deleteProductModal = function (prodId) {
    $scope.productId = prodId;
  };

  $scope.updateProduct = function () {
    ApiService.updateProduct($scope.product, $scope.productId)
      .then(function (response) {
        console.log(response);
        $scope.products.splice(
          $scope.products.findIndex((prod) => prod.id === response.id),
          1
        );
        $scope.products.unshift(response);
      })
      .catch(function (err) {});
  };

  $scope.addProduct = function () {
    ApiService.addProduct($scope.product)
      .then(function (response) {
        $scope.products.unshift(response);
      })
      .catch(function (err) {});
  };

  $scope.deleteProduct = function () {
    ApiService.deleteProduct($scope.productId)
      .then(function (response) {
        $scope.products.splice(
          $scope.products.findIndex((prod) => prod.id === response.id),
          1
        );
      })
      .catch(function (err) {});
  };

  setTimeout(() => {
    ApiService.getProducts()
      .then(function (response) {
        console.log(response);
        $scope.products = response;
        $scope.showProducts = true;
      })
      .catch(function (err) {});
  }, 1000);
});

app.controller("ODataCtrl", function ($scope, ApiService) {
  $scope.products = [];
  $scope.currentTop = 2;
  $scope.currentSkip = 0;


  $scope.getCount = function(){
    ApiService.getCount().then((res)=>{
        console.log(res);
        $scope.count = res
    }).catch((err)=>{
    })
  }


  $scope.nextData = function(val){
     switch(val){
       case 1:
       $scope.currentSkip = 0; 
       getData($scope.currentTop,$scope.currentSkip)
       break;
       case 2:
       $scope.currentSkip = 2;  
       getData($scope.currentTop,$scope.currentSkip)
       break;
       case 3:
       $scope.currentSkip = 4;  
       getData($scope.currentTop,$scope.currentSkip) 
       break;
       case 'next':
       $scope.currentSkip =  $scope.currentSkip + 2; 
       getData($scope.currentTop,$scope.currentSkip) 
       break;
     }
   
  }

  function getData(top,skip){
    ApiService.getODataProducts(top,skip)
    .then(function (response) {
      console.log(response);
      $scope.products = response.value;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  $scope.selectRating = function (rating) {
    console.log(rating);
    if (rating == 0) {
      ApiService.getODataProducts()
        .then(function (response) {
          console.log(response);
          $scope.products = response.value;
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      ApiService.getFilterRatings(rating)
        .then(function (response) {
          console.log(response);
          $scope.products = response.value;
        })
        .catch(function (error) {});
    }
  };

  $scope.orderByPrice = function(){
    ApiService.orderByPrice().then((response)=>{
         $scope.products = response.value
    }).catch((error)=>{

    })
  }

  getData($scope.currentTop,$scope.currentSkip);
 
});


app.controller("CrudCtrl",function($scope,ApiService){

    $scope.categories = [];

    $scope.addCategory = function(){
      console.log({...$scope.cat,"odata.type":"ODataDemo.Category"});
      ApiService.addCategory($scope.cat).then((response)=>{
          console.log(response);
      }).catch((error)=>{

      })

    }

    $scope.delete = function(id){

      ApiService.deleteCategory(id).then((response)=>{
        console.log(response);
    }).catch((error)=>{

    })
    }

    ApiService.getCategories().then((response)=>{
       $scope.categories = response.value;
    }).catch((error)=>{

    })
})
