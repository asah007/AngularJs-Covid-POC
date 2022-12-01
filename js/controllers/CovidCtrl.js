
var CovidCtrl = function ($scope, ApiService) {
    $scope.data = {};
    $scope.dataByCountry = {};
    $scope.countryName = "";
    $scope.showCountryData = false;
    $scope.showData = false;
    $scope.errorMsg = "";
    $scope.showErrMsg = false;

    setTimeout(() => {
      // Get overall covid details //
      ApiService.getCovidDetails().then(function (response) {
        $scope.data = response;
        $scope.showData = true;
      });
    }, 500);

    // Get Covid Details on country search //
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
  };
  
