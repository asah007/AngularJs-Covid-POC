

var ProductCtrl = function ($scope,ApiService){

  // Product Modal //
  function Product(title,description,price,category,image){
       this.title = title;
       this.description = description;
       this.price = price;
       this.category = category;
       this.image = image;
  }

  $scope.showProducts = false;
  $scope.products = [];  

  // On Add Product Modal Open  event //
  $scope.addProductModal = function () {
    $scope.product = new Product("","","","","");
  };

  // On Edit Product Modal Open  event //
  $scope.addEditModal = function (prod) {
    $scope.productId = prod.id;
    $scope.product = new Product(prod.title,prod.description,prod.price,prod.category,prod.image);
  };

  // On Add Product Modal Open  event //
  $scope.deleteProductModal = function (prodId) {
    $scope.productId = prodId;
  };


  // Updating Product function //
  $scope.updateProduct = function () {
    ApiService.updateProduct($scope.product, $scope.productId)
      .then(function (response) {
        $scope.products.splice(
          $scope.products.findIndex((prod) => prod.id === response.id),
          1
        );
        $scope.products.unshift(response);
      })
      .catch(function (err) {
         console.log(err);
      });
  };

  // Adding new product function //
  $scope.addProduct = function () {
    ApiService.addProduct($scope.product)
      .then(function (response) {
        $scope.products.unshift(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // Deleting product function //
  $scope.deleteProduct = function () {
    ApiService.deleteProduct($scope.productId)
      .then(function (response) {
        $scope.products.splice(
          $scope.products.findIndex((prod) => prod.id === response.id),
          1
        );
      })
      .catch(function (err) {
        console.log(err);
      });
  };


  setTimeout(() => {
    // fetching Products on init //
    ApiService.getProducts()
      .then(function (response) {
        $scope.products = response;
        $scope.showProducts = true;
      })
      .catch(function (err) {
        console.log(err);
      });
  }, 1000);
}
