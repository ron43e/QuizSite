
var app = angular.module('myApp', ['ngRoute', 'ngMaterial'])

  .run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth, $cookies) {
    $rootScope.loggedIn = false;
    $rootScope.admin = true;
    $rootScope.currentTest = '';
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      // enumerate routes that don't need authentication
      var routesThatDontRequireAuth = ['/login', '/'];
      // check if current location matches route
      var routeClean = function (route) {
        return (routesThatDontRequireAuth.indexOf(route) > -1);
        // return _.find(routesThatDontRequireAuth,
        //   function (noAuthRoute) {
        //     return _find(route, noAuthRoute);
        //   });
      };
      // if route requires auth and user is not logged in
      if (!routeClean($location.url()) && !Auth.isLoggedIn()) {
        // redirect back to login
        $location.path('/login');
      }
      //       if (!Auth.isLoggedIn()) {
      //         console.log('DENY');
      //         //        event.preventDefault();
      //         $location.path('/login');
      //       }
      //       else {
      //         console.log('ALLOW');
      // //        $location.path('/welcome');
      //       }
    });
    $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
      // both newUrl and oldUrl are strings
      console.log('Starting to leave %s to go to %s', oldUrl, newUrl);
    });
  }])

  .factory('Data', function () {
    var tests;
    var questions;
    return {
      setTests: function (testList) {
        tests = testList;
      },
      setQuestions: function (questList) {
        questions = questList;
      },
      getTests: function () {
        return tests;
      },
      getQuestions: function () {
        return questions;
      }
    }
  })

  .factory('Auth', function () {
    var user;
    return {
      setUser: function (aUser) {
        user = aUser;
      },
      isLoggedIn: function () {
        return (user) ? user : false;
      }
    }
  })

  // Use mdDialog and verify that user wants to delete item
  .factory('verifyDelete', function ($mdDialog) {
    //Include a reference to the user object we're deleting
    return function (item) {
      //Call the confirm() function to configure the confirmation dialog
      var confirm = $mdDialog.confirm()
        .title('Delete?')
        .content('Are you sure you want to delete ' + item + '?')
        .ariaLabel('Delete')
        .ok('Delete')
        .cancel('Cancel');
      return $mdDialog.show(confirm);
    }
  })