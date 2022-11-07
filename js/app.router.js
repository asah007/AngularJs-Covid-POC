
var app = angular.module('myModule',['ngRoute']);
app.config(['$routeProvider',function($routeProvider){
   $routeProvider
   .when('/corona',{
       templateUrl:'pages/covid.html',
       controller:"CovidCtrl"
   })
   .when('/products',{
       templateUrl:'pages/products.html',
       controller:'ProductCtrl'
   })
}])



app.controller('CovidCtrl',function($scope,ApiService){
    $scope.data = {};
    $scope.dataByCountry = {};
    $scope.countryName = "";
    $scope.showCountryData = false;
    $scope.showData = false;
    $scope.errorMsg = "";
    $scope.showErrMsg = false;

    setTimeout(()=>{
        ApiService.getCovidDetails().then(function(response){
            $scope.data = response;
            $scope.showData = true;
        });
    },500)
       
    $scope.getByCountry = function(){
        $scope.errorMsg = "";
        $scope.showErrMsg = false;
        $scope.showSpinner = true;
        $scope.showCountryData = false;
        setTimeout(()=>{
            ApiService.getCovidDetailsByCountry($scope.countryName).then(function(response){
                $scope.dataByCountry = response;
                $scope.showCountryData = true;
                $scope.showSpinner = false;
          }).catch(function(err){
               $scope.showErrMsg = true;
               $scope.showSpinner = false;
               $scope.errorMsg = err.error.message;
             
          })
        },2000) 
    }
});


app.controller('ProductCtrl',function($scope,ApiService){
      
      $scope.showProducts = false;
      $scope.products = [];
      $scope.addProductModal = function(){
          $scope.product ={
            "title":"",
            "description":"",
            "price":"",
            "category":"",
            "image":""
          }
      }

      $scope.addEditModal = function(prod){
        $scope.productId = prod.id;
        $scope.product ={
            "title":prod.title,
            "description":prod.description,
            "price":prod.price,
            "category":prod.category,
            "image":prod.image
        }
      }

      $scope.deleteProductModal = function(prodId){
        $scope.productId = prodId;
      }

      $scope.updateProduct = function(){
        ApiService.updateProduct($scope.product, $scope.productId).then(function(response){
            console.log(response);
            $scope.products.splice($scope.products.findIndex(prod => prod.id === response.id) , 1)
            $scope.products.unshift(response);
          }).catch(function(err){
         })
      }

      $scope.addProduct = function(){
        ApiService.addProduct($scope.product).then(function(response){
              $scope.products.unshift(response);
        }).catch(function(err){
        })
      }

    
      $scope.deleteProduct = function(){
         ApiService.deleteProduct($scope.productId).then(function(response){
            $scope.products.splice($scope.products.findIndex(prod => prod.id === response.id) , 1)    
         }).catch(function(err){

         })
      }

      setTimeout(()=>{
          ApiService.getProducts().then(function(response){
            console.log(response);
            $scope.products = response;
            $scope.showProducts = true;
          }).catch(function(err){

        })
      },1000)
      

})




