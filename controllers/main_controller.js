mainApp.controller('Main_Controller',function($scope,$rootScope,LoginService,$cookieStore,Util,$localStorage,$state,$timeout){
  $scope.loginPage = function(){
    $scope.user = {};
    if($cookieStore.get('username')){
      $scope.user.username = $cookieStore.get('username');
      $scope.user.password = $cookieStore.get('password');
    }
  }

  $scope.changeLanguage = function(lang){
    $rootScope.language = lang
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
     $rootScope.loggedin_success = true;
   }
   else{
     $rootScope.logedIn_user = {};
     $rootScope.loggedin_success = false;
   }
 }
  /*******************************************************/
  /*************This is use for  user login***************/
  /*******************************************************/
   $scope.login = function(){
     LoginService.login($scope.user).then(function(pRes) {
       if(pRes.data.statusCode == 200){
         if($scope.user.remember){
           $cookieStore.put('username', $scope.user.username);
           $cookieStore.put('password', $scope.user.password);
         }
         $localStorage.user = {
           "id"           : pRes.data.data.id,
           "user_name"    : pRes.data.data.user_name,
           "first_name"   : pRes.data.data.first_name,
           "last_name"    : pRes.data.data.last_name,
           "token"        : pRes.data.data.token,
         }
         localStorage.setItem("token",pRes.data.data.token);
         $timeout(function(){
           $scope.getUserDetails();
           $state.go("dashboard");
        });
       }
       else{
           Util.alertMessage('danger', pRes.data.message);
       }
    })
   }
   /*******************************************************/
   /*************This is use for  signout***************/
   /*******************************************************/
   $scope.signout = function(){
     LoginService.logout().then(function(pRes) {
       if(pRes.data.statusCode == 200){
         $rootScope.loggedin_success = false;
         delete $localStorage.user;
         setTimeout(function () {
           $state.go("login");
         }, 500);
       }
     },
     function(err) {
       console.log(">>>>>>>>>>>>>   ",err);
     })
   }
});
