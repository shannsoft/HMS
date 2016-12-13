var mainApp = angular.module('hms-app',['ui.router','ui.bootstrap', 'ngResource', 'ngStorage', 'ngAnimate','ngCookies']);
mainApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
    .state('dashboard', {
        templateUrl: 'views/dashboard.html',
        url: '/dashboard',
        controller:"Main_Controller"
    })
    .state('login', {
        templateUrl: 'views/login.html',
        url: '/login',
        controller:"Main_Controller"
    })
});
mainApp.run(function($rootScope) {
  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
    $rootScope.stateName = toState.name;
  });
});
