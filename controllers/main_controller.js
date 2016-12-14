mainApp.controller('Main_Controller',function($scope,$rootScope,loginService,$cookieStore,Util,$localStorage,$state){
  $rootScope.is_loggedin = false;
  $scope.loginPage = function(){
    $scope.user = {};
    if($cookieStore.get('user_name')){
      $scope.user.username = $cookieStore.get('user_name');
      $scope.user.password = $cookieStore.get('password');
    }
  }

  /*******************************************************/
  /****This event is fired for javascript dependency******/
  /*******************************************************/
  $scope.init = function(){
    $scope.$on('$viewContentLoaded',function(event) {
      $(document).trigger("TemplateLoaded");
    });
  }
  /*******************************************************/
  /*************This is use for check user login**********/
  /*******************************************************/
  $scope.getUserDetails = function(){
   if($localStorage.user){
     $rootScope.logedIn_user = $localStorage.user;
     $rootScope.is_loggedin  = true;
   }
   else{
     $rootScope.logedIn_user = {};
     $rootScope.is_loggedin  = false;
   }
 }
  /*******************************************************/
  /*************This is use for  user login***************/
  /*******************************************************/
   $scope.login = function(){
     loginService.login($scope.user).then(function(pRes) {
       if(pRes.data.statusCode == 200){
         $localStorage.user = {
           "id"           : pRes.data.data.id,
           "user_name"    : pRes.data.data.user_name,
           "first_name"   : pRes.data.data.first_name,
           "last_name"    : pRes.data.data.last_name,
           "token"        : pRes.data.data.token,
         }
        localStorage.setItem("token",pRes.data.data.token);
         $scope.getUserDetails();
          $state.go("dashboard");
       }
       else{
           Util.alertMessage('danger', pRes.data.data.message);
       }
    })
   }
});
