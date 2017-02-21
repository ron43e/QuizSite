
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBo_GwY19BYQ6HTSdhLkXwXayEjoQrCN60",
  authDomain: "web-quizzes.firebaseapp.com",
  databaseURL: "https://web-quizzes.firebaseio.com",
  storageBucket: "web-quizzes.appspot.com",
  messagingSenderId: "752526691221"
};
firebase.initializeApp(config);



// create the controller and inject Angular's $scope
app.controller('mainCtrl', function ($scope, $location, $rootScope, $http, Auth, Data) {
  Data.setTests(tests);
  Data.setQuestions(questions);
  $scope.user = {
    id: '',
    name: 'James',
    email: 'jhindmon@gmail.com',
    password: 'dallas'
  }
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
  // check to see if logged in
  // $scope.$watch(Auth.isLoggedIn, function (value, oldValue) {
  //   if (!value && oldValue) {
  //     console.log("Disconnect");
  //     $location.path('/login');
  //   }
  //   if (value) {
  //     console.log("Connect");
  //     //Do something when the user is connected
  //   }
  // }, true);
  // create a message to display in our view
  $scope.message = 'Everyone come and see how good I look!';
  // const rootRef = firebase.database().ref().child('angular');
  // const ref = rootRef.child('object');
  // this.object = $firebaseObject(ref);
  $scope.logOut = function () {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      $rootScope.loggedIn = false;
      $rootScope.admin = false;
      Auth.setUser('');
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

app.controller('loginCtrl', function ($rootScope, $scope, Auth, $location) {
  $scope.logIn = function () {
    firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password)
      .then(function (j) {
        $scope.user.id = j.i; // save auth id
        $rootScope.loggedIn = true;
        $rootScope.admin = true;
        Auth.setUser($scope.user.id);
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
})

app.controller('adminCtrl', function ($rootScope, $scope, Auth, $location) {
});

app.controller('addQuestCtrl', function ($scope, $location) {
  $scope.loggedIn = Auth.isLoggedIn();
  $scope.test = {
    name: 'Server 1'
  };
  $scope.questNum = 1;
  $scope.quest = {
    question: '',
    ans1: '',
    ans2: '',
    ans3: '',
    ans4: '',
    correct: '1'
  }
  // save question & add another
  $scope.next = function () {
    // save question
    $scope.questNum++;
  }
});

app.controller('adminTestsCtrl', function ($rootScope, $scope, $location, Auth, $mdDialog, Data) {
  $scope.loggedIn = Auth.isLoggedIn();
  $scope.tests = Data.getTests();
  $scope.questions = Data.getQuestions();
//  $scope.questions = questions;
//  $scope.tests = tests;
  $scope.addTest = function () {
    //    $location.path("/createTest");
    this.showTabDialog = function (ev) {
      $mdDialog.show({
        controller: function () {
          return self;
        },
        controllerAs: 'ctrl',
        templateUrl: 'tabDialog.tmpl.html',
      });
    };
  }
  // edit a test
  $scope.editTest = function (test) {
    $rootScope.currentTest = test;
    $location.path('/editTest');
  };
});

app.controller('editTestCtrl', function ($rootScope, $scope, $location, Auth, Data, verifyDelete) {
  $scope.loggedIn = Auth.isLoggedIn();
  $scope.questions = Data.getQuestions();
  $scope.test = tests[$rootScope.currentTest];
  // delete a question
  $scope.delete = function (quest) {
    verifyDelete('this question').then(function () {
      var index = $scope.questions.indexOf(quest);
      if (index != -1) { // if index = -1, it was not found
        $scope.questions.splice(index, 1);
        Data.setQuestions($scope.questions);
      }
    });
  };
});