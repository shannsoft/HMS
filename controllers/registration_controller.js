mainApp.controller('Registration_Controller',function($scope,$rootScope,$state,RegisterService){
  $scope.showModal = false;
  /***************************************************************************/
  /************************This is use to show a pop up***********************/
  /***************************************************************************/
  $scope.open = function () {
    $scope.showModal = true;
  };
  /***************************************************************************/
  /***********************This is use to hide a pop up************************/
  /***************************************************************************/
  $scope.ok = function () {
    $scope.showModal = false;
    console.log(12121);
  };
  /***************************************************************************/
  /***********************This is use to hide a pop up************************/
  /***************************************************************************/
  $scope.cancel = function () {
     $scope.showModal = false;
  };
  /***************************************************************************/
  /******************This is use to load the register list********************/
  /***************************************************************************/
  $scope.loadRegisterList  = function(){
    var obj = {};
    RegisterService.register(obj,"get").then(function(pRes) {
      if(pRes.data.statusCode == 200){
        $scope.registerList = pRes.data.data;
      }
    });
  }
  $scope.register = function(){
    var obj = {
      "reg_type":"OPD",
      "first_name":"Santosh",
      "last_name" : "Majhi",
      "gender":"male",
      "mobile":"9438753143",
      "street":"Test",
      "city":"Test",
      "state":"Test",
      "zip_code":"123456",
      "dob":"1982-10-10",
      "age":"30",
      "marital_status":"Single",
      "religion":"hindu",
      "reg_date":"2016-12-12",
      "email":"santoshmajhi99@gmail.com"
    }
    RegisterService.register(obj).then(function(pRes) {
      if(pRes.data.statusCode == 200){
      }
    });
  }
});
