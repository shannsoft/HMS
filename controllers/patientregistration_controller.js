mainApp.controller('patientregistration_controller',function($scope,$rootScope,$state){
  $rootScope.is_loggedin = true;

  /*******************************************************/
  /****This event is fired for javascript dependency******/
  /*******************************************************/
  $scope.gotoedit = function(){
     $state.go('editpatientdetails');
  }
  $scope.showModal = false;
  /***************************************************************************/
  /**************************This is use to show a pop up****************************/
  /***************************************************************************/
  $scope.open = function () {
    $scope.showModal = true;
  };
  /***************************************************************************/
  /**************************This is use to hide a pop up****************************/
  /***************************************************************************/
  $scope.ok = function () {
    $scope.showModal = false;
  };
  /***************************************************************************/
  /**************************This is use to hide a pop up****************************/
  /***************************************************************************/
  $scope.cancel = function () {
     $scope.showModal = false;
  };
});
