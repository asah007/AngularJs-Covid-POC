angular.module("myModule").service("ApiConfig", [

    function(){
      this.covidDataUrl = "https://covid19.mathdro.id/api",
      this.covidDataByCountry = function (countryName) {
             return "https://covid19.mathdro.id/api/countries/" + countryName;
            }
    }
  

//   this.getUrls = {
//     covidData: "https://covid19.mathdro.id/api",
//     covidDataByCountry: function (countryName) {
//       return "https://covid19.mathdro.id/api/countries/" + countryName;
//     },
//   },
]);
