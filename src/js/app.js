var app = angular.module('myApp', ['ngRoute', 'LocalStorageModule'])
  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('myApp')
      .setStorageType('sessionStorage');
  })

  .run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth, $route, $routeParams, $routeProvider) {
    $rootScope.userID = localStorage.getItem("userID");
    if ($rootScope.userID != '') {
      Auth.setUserID($rootScope.userID);
      $rootScope.loggedIn = true;
    } else {
      Auth.setUserID('');
      $rootScope.loggedIn = false;
    }
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      // console.log('Next Template: ' + next.$$route.templateUrl);
      // console.log('Original Path: ' + next.$$route.originalPath);
      // console.log('Controller: ' + next.$$route.controller);
    });
    $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
      // both newUrl and oldUrl are strings
      // enumerate routes that don't need authentication
      var routesThatDontRequireAuth = ['/login', '/home'];
      // check if current location matches route
      var routeClean = function (route) {
        return (routesThatDontRequireAuth.indexOf(route) > -1);
      };
      // if route requires auth and user is not logged in
      if (!routeClean($location.url()) && !Auth.isLoggedIn()) {
        // redirect back to login
        $rootScope.loggedIn = false;
        $location.path('/login');
      }
      console.log('Starting to leave %s to go to %s', oldUrl, newUrl);
    });
  }])

