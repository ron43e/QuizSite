
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
app.controller('mainCtrl', function ($rootScope, $scope, $location, $http, Auth, Data) {
  $scope.admin = true;
  Data.setTests(tests);
  Data.setQuestions(questions);
  Auth.setUser = {
    id: '',
    name: 'James',
    email: 'jhindmon@gmail.com',
    password: 'dallas',
    admin: true
  }
  $scope.user = Auth.getUser();
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
      Auth.setUserID('');
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

app.controller('loginCtrl', function ($rootScope, $scope, Auth, $location, $cookies) {
  $scope.user = Auth.getUser();
  $scope.logIn = function () {
    firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password)
      .then(function (j) {
        $scope.user.id = j.i; // save auth id
        Auth.setUserID($scope.user.id);
        //        $cookies.put(loggedIn, true);
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
})

app.controller('adminCtrl', function ($scope, Auth, $location) {
});

// Controller for addQuest.html - editing a question for a test
app.controller('addQuestCtrl', function ($scope, $location, Auth, Data) {
  $scope.loggedIn = Auth.isLoggedIn();
  $scope.test = tests[Data.currentTest];
  $scope.questNum = Data.currentQuest;
  $scope.quest = questions[Data.currentQuest];
  // save question & add another
  $scope.next = function () {
    // save question
    $scope.questNum++;
  }
});

// Controller for adminTests.html - tests
app.controller('adminTestsCtrl', function ($scope, $location, Auth, $mdDialog, Data) {
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
    Data.currentTest = test;
    $location.path('/editTest');
  };
});

// Controller for adminEditTest - editing a test
app.controller('editTestCtrl', function ($scope, $location, Auth, Data, verifyDelete) {
  $scope.loggedIn = Auth.isLoggedIn();
  $scope.questions = Data.getQuestions();
  $scope.test = tests[Data.currentTest];
  // edit a question
  $scope.edit = function(quest) {
    Data.currentQuest = quest.id;
    $location.path('/addQuest')
  };
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
  // Angular Function
  $scope.done = function () {
    $location.path('/adminTests');
  };
});

