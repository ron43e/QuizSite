
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBo_GwY19BYQ6HTSdhLkXwXayEjoQrCN60",
  authDomain: "web-quizzes.firebaseapp.com",
  databaseURL: "https://web-quizzes.firebaseio.com",
  storageBucket: "web-quizzes.appspot.com",
  messagingSenderId: "752526691221"
};
firebase.initializeApp(config);


var app = angular.module('myApp', ['ngRoute'])
  .run(function ($rootScope) {
    $rootScope.loggedIn = false;
  });

app.config(function ($routeProvider, $locationProvider) {
  //  $locationProvider.html5Mode(true).hashPrefix('*');
  $locationProvider.hashPrefix('');
  $routeProvider
    .when("/", {
      templateUrl: "pages/main.html"
    })
    .when("/welcome", {
      templateUrl: "pages/welcome.html"
    })
    .when("/tests", {
      templateUrl: "pages/tests.html"
    })
    .when("/results", {
      templateUrl: "pages/results.html"
    })
    .when("/login", {
      templateUrl: "pages/login.html",
      controller: "mainCtrl"
    })
    .when("/badLogin", {
      templateUrl: "pages/badLogin.html",
      controller: "mainCtrl"
    })
});


// create the controller and inject Angular's $scope
app.controller('mainCtrl', function ($scope, $location, $rootScope, $http) {
  $scope.user = {
    id: '',
    name: 'James',
    email: 'jhindmon@gmail.com',
    password: 'dallas'
  }
  $scope.tests = [
    { name: 'Server 1' },
    { name: 'Server 2' },
    { name: 'Server 3' },
    { name: 'Server 4' },
    { name: 'Server 5' },
  ]
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  today = mm + '/' + dd + '/' + yyyy;
  $scope.results = [
    { date: today, user: 'jim', test: '2', score: '100' },
    { date: today, user: 'sam', test: '2', score: '100' },
    { date: today, user: 'jim', test: '3', score: '94' },
    { date: today, user: 'jim', test: '4', score: '92' },
    { date: today, user: 'jim', test: '5', score: '90' },
  ]
  // create a message to display in our view
  $scope.message = 'Everyone come and see how good I look!';
  // const rootRef = firebase.database().ref().child('angular');
  // const ref = rootRef.child('object');
  // this.object = $firebaseObject(ref);
  $scope.logIn = function () {
    firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password)
      .then(function (j) {
        $scope.user.id = j.i; // save auth id
        $rootScope.loggedIn = true;
        $location.path('/welcome');
        $scope.$apply();
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $location.path('/badLogin')
      })
  }
  $scope.logOut = function () {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      $rootScope.loggedIn = false;
      $location.path('/');
      $scope.$apply();
    }, function (error) {
      // An error happened.
    });
  }
});

app.controller('resultsCtrl', function ($scope, $http) {
  $scope.message = 'Look! I am a results page.';
  $scope.results = scores;
//  $http.get("getTests.php")
//    .then(function (response) {
//      $scope.results = response.data.records;
//    });
  // $scope.results = [
  //   { test: 'Sv 1', score: 94 },
  //   { test: 'Sv 2', score: 91 }
  // ]
});
