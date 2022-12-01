var CrudCtrl = function ($scope, ApiService) {
  $scope.categories = [];
  $scope.addCategory = function () {
    ApiService.addCategory($scope.cat)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  $scope.delete = function (id) {
    ApiService.deleteCategory(id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ApiService.getCategories()
    .then((response) => {
      $scope.categories = response.value;
    })
    .catch((error) => {
      console.log(error);
    });
};
