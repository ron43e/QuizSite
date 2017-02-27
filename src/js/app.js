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
      console.log('Next Template: ' + next.$$route.templateUrl);
      console.log('Original Path: ' + next.$$route.originalPath);
      console.log('Controller: ' + next.$$route.controller);

      //   //       if (!Auth.isLoggedIn()) {
      //   //         console.log('DENY');
      //   //         //        event.preventDefault();
      //   //         $location.path('/login');
      //   //       }
      //   //       else {
      //   //         console.log('ALLOW');
      //   // //        $location.path('/welcome');
      //   //       }
    });
    $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
      // both newUrl and oldUrl are strings
      // enumerate routes that don't need authentication
      var routesThatDontRequireAuth = ['/login', '/home'];
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
        $rootScope.loggedIn = false;
        $location.path('/login');
      }
      console.log('Starting to leave %s to go to %s', oldUrl, newUrl);
    });
  }])

  .factory('Data', function () {
    var tests;
    var currentTest;
    var currentQuest;
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
    var user = {
      id: '',
      name: '',
      email: '',
      password: '',
      admin: false
    };
    return {
      setUserID: function (aUser) {
        user.id = aUser;
      },
      setUser: function (auser) {
        user.id = auser.id;
        user.name = auser.name;
        user.email = auser.email;
        user.password = auser.password;
        user.admin = auser.admin;
      },
      getUser: function () {
        return user;
      },
      isLoggedIn: function () {
        return (user.id) ? user.id : false;
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

  // Use mdDialog and prompt for an input
  .factory('prompt', function ($mdDialog) {
    return function (title, content, placehldr, initValue, okStr, canStr) {
      var confirm = $mdDialog.prompt()
        .title(title)
        .textContent(content)
        .placeholder(placehldr)
        .ariaLabel(placehldr)
        .initialValue(initValue)
        .targetEvent(ev)
        .ok(okStr)
        .cancel(canStr);

      // $mdDialog.show(confirm).then(function (result) {
      //   $scope.status = 'You decided to name your dog ' + result + '.';
      // }, function () {
      //   $scope.status = 'You didn\'t name your dog.';
      // });
    };
  })

  // Get Data
  //
  .factory('data', ['$http', function($http) {
    var sdo = {
      getTests: function() {
        var promise = $http({
          method: 'GET',
          url: 'php/getTests.php'
        });
        promise.success(function(data, status, headers, conf) {
          return data;
        });
        return promise;
      }
    }
    return sdo;
  }]);