
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBo_GwY19BYQ6HTSdhLkXwXayEjoQrCN60",
  authDomain: "web-quizzes.firebaseapp.com",
  databaseURL: "https://web-quizzes.firebaseio.com",
  storageBucket: "web-quizzes.appspot.com",
  messagingSenderId: "752526691221"
};
firebase.initializeApp(config);


var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode(true);
  $routeProvider
    .when("/", {
      templateUrl: "pages/main.html"
    })
    .when("/tests", {
      templateUrl: "pages/tests.html"
    })
    .when("/results", {
      templateUrl: "pages/results.html"
    })
    .when(",/login", {
      templateUrl: "pages/results.html",
    })
    .when(",/badLogin", {
      templateUrl: "pages/badLogin.html",
      controller: "mainCtrl"
    })
});

app.run([
  '$rootScope',
  function ($rootScope) {
    $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
      // both newUrl and oldUrl are strings
      console.log('Starting to leave %s to go to %s', oldUrl, newUrl);
    });
  }
]);

// create the controller and inject Angular's $scope
app.controller('mainCtrl', function ($scope, $location) {
  $scope.loggedIn = false;
  $scope.user = {
    id: '',
    name: 'James',
    email: 'jhindmon@gmail.com',
    password: 'dallas'
  }
  // create a message to display in our view
  $scope.message = 'Everyone come and see how good I look!';
  // const rootRef = firebase.database().ref().child('angular');
  // const ref = rootRef.child('object');
  // this.object = $firebaseObject(ref);
  $scope.logIn = function () {
    firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password)
      .then(function (j) {
        $scope.user.id = j.i; // save auth id
        $scope.loggedIn = true;
        $location.path('/results');
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $location.path('/badLogin')
      })
  }
  $scope.logout = function () {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      $scope.loggedIn = false;
    }, function (error) {
      // An error happened.
    });
  }
});

app.controller('aboutCtrl', function ($scope) {
  $scope.message = 'Look! I am an about page.';
});
