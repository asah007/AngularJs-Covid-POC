
var ODataCtrl = function ($scope,ApiService){
  
  $scope.products = [];
  $scope.currentTop = 2;
  $scope.currentSkip = 0;
  $scope.getCount = function(){
    ApiService.getCount().then((res)=>{
        $scope.count = res
    }).catch((err)=>{
      console.log(err);
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
        .catch(function (error) {
          console.log(error)
        });
    }
  };

  $scope.orderByPrice = function(){
    ApiService.orderByPrice().then((response)=>{
         $scope.products = response.value
    }).catch((error)=>{
       console.log(error)
    })
  }


  getData($scope.currentTop,$scope.currentSkip);

  // Function to get OData Products //
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
 
}