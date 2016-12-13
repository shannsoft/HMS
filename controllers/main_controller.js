mainApp.controller('Main_Controller',function($scope,$rootScope){
  $rootScope.is_loggedin = true;

  /*******************************************************/
  /****This event is fired for javascript dependency******/
  /*******************************************************/
  $scope.init = function(){
    $scope.$on('$viewContentLoaded',function(event) {
      $(document).trigger("TemplateLoaded");
    });
  }
});
