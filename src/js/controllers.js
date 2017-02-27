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
	$scope.logOut = function () {
		firebase.auth().signOut().then(function () {
			// Sign-out successful.
			Auth.setUserID('');
			localStorage.setItem("userID", '');
			$rootScope.loggedIn = false;
			$location.path('/login');
			$scope.$apply();
		}, function (error) {
			// An error happened.
		});
	}
});

// Login controller
//
app.controller('loginCtrl', function ($rootScope, $scope, Auth, $location) {
	$scope.user = Auth.getUser();
	$scope.logIn = function () {
		firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password)
			.then(function (j) {
				$scope.user.id = j.i; // save auth id
				Auth.setUserID($scope.user.id);
				//        $cookies.put(loggedIn, true);
				$rootScope.loggedIn = true;
				localStorage.setItem("userID", j.i);
				$location.path('/welcome');
				$scope.$apply();
			})
			.catch(function (error) {
				// Handle Errors here.
				$rootScope.$apply(function () {
					var errorCode = error.code;
					var errorMessage = error.message;
					$location.path('/badLogin')
				})
			})
	}
})

// Tests
//
app.controller('testsCtrl', function($scope, $location, $http, tests) {
	$scope.tests = tests.data;
  $scope.addTest = function () {
//    $location.path("/createTest");
		$location.path('/createTest');
	};
});

// Add Test
//
app.controller('createTestCtrl', function($scope) {

});