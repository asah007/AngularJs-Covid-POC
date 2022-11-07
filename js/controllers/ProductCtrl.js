

var app = angular.module("myModule", []);    
app.controller('ProductCtrl',function($scope,ApiService){
    $scope.products = [];
    $scope.product ={
      "title":"",
      "description":"",
      "price":"",
      "category":"",
      "image":""
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

    $scope.updateProduct = function(){
        
      console.log($scope.product);
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

    $scope.deleteProduct = function(prodId){
       ApiService.deleteProduct(prodId).then(function(response){
          $scope.products.splice($scope.products.findIndex(prod => prod.id === response.id) , 1)    
       }).catch(function(err){

       })
    }

    ApiService.getProducts().then(function(response){
        console.log(response);
        $scope.products = response;
    }).catch(function(err){

    })

})
