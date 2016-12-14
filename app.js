var mainApp = angular.module('hms-app',['ui.router','ui.bootstrap', 'ngResource', 'ngStorage', 'ngAnimate','ngCookies']);
mainApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
    .state('dashboard', {
        templateUrl: 'views/dashboard.html',
        url: '/dashboard',
        controller:"Main_Controller",
        onEnter: function($localStorage, $state) {
           if (!$localStorage.user) {
               $state.go('login');
           }
         }
    })
    .state('login', {
        templateUrl: 'views/login.html',
        url: '/login',
        controller:"Main_Controller",
        onEnter: function($localStorage, $state) {
           if ($localStorage.user) {
               $state.go('dashboard');
           }
         }
    })
    .state('registeredList', {
        templateUrl: 'views/registration/patient_list.html',
        url: '/registeredList',
        controller:"Registration_Controller",
        onEnter: function($localStorage, $state) {
           if (!$localStorage.user) {
               $state.go('login');
           }
         }
    })
    .state('newRegistration', {
        templateUrl: 'views/registration/patient_registration.html',
        url: '/newRegistration',
        controller:"Registration_Controller",
        onEnter: function($localStorage, $state) {
           if (!$localStorage.user) {
               $state.go('login');
           }
         }
    })
    .state('registerEdit', {
        templateUrl: 'views/registration/patient_edit.html',
        url: '/registerEdit',
        controller:"Registration_Controller",
        onEnter: function($localStorage, $state) {
           if (!$localStorage.user) {
               $state.go('login');
           }
         }
    })
});
mainApp.constant('CONFIG', {
  'HTTP_HOST': './server/api.php' //client staging
})
mainApp.run(function($rootScope) {
  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
    $rootScope.stateName = toState.name;
  });
});
mainApp.factory('Util', ['$rootScope',  '$timeout' , function( $rootScope, $timeout){
    var Util = {};
    $rootScope.alerts =[];
    Util.alertMessage = function(msgType, message){
        console.log(1212121);
        var alert = { type:msgType , msg: message };
        $rootScope.alerts.push( alert );
         $timeout(function(){
            $rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
         }, 5000);
    };
    return Util;
  }]);
