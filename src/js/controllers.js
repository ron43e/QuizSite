// TODO: body does not include all questions on editTest.html
//

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
app.controller('mainCtrl', function ($rootScope, $scope, $location, $http, Auth, data) {
	$scope.admin = true;
	data.setTests(tests);
	data.setQuestions(questions);
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

// List Tests
//
app.controller('testsCtrl', function ($scope, $location, data, tests, verifyDelete, prompt, $mdDialog) {
	$scope.tests = tests.data;

	// add a test
	$scope.addTest = function () {
		$location.path('/createTest');
	};
	// edit a test
	$scope.editTest = function (test) {
		data.curTest = test;
		$location.path('/editTest');
	};
	// delete a test
	$scope.deleteTest = function (test) {
		// var msg = prompt('title', 'content', 'placehldr', 'initValue', 'okStr', 'canStr')
		// 	.then(function (result) {
		// 		console.log(result);
		// 	});
		var msg = verifyDelete(test.name)
			.then(function (result) {
				console.log(result);
				if (result == true) {
					// delete test
					var testID = test.id;
					data.deleteTest(testID)
						.then(function (results) {
							console.log(results);
						})
				}
			});
	};

});

// Add Test
//
app.controller('createTestCtrl', function ($scope, $location, data, $mdDialog, confirmDlg) {
	$scope.test = {
		name: '',
		time: ''
	};
	$scope.questions = [];
	// next button clicked
	$scope.addQuest = function () {
		data.curTest = $scope.test;
		showDialog();
		// $location.path('/addQuest');
	};
	// done button clicked
	$scope.done = function () {
		if ($scope.questions.length == 0) {
			confirmDlg('', 'Important!', 'You must add questions. If you leave you will lose what you have entered', 'Leave', 'Cancel')
				.then(function (results) {
					console.log(results);
				});
		}
	};
	// show dialog to get questions
	function showDialog($event) {
		var parentEl = angular.element(document.body);
		$mdDialog.show({
			parent: parentEl,
			targetEvent: $event,
			templateUrl: 'pages/quest.html',
			// '<md-dialog aria-label="List dialog">' +
			// 	'  <md-dialog-content>' +
			// 	'    <md-list>' +
			// 	'      <md-list-item ng-repeat="item in items">' +
			// 	'       <p>Number {{item}}</p>' +
			// 	'      ' +
			// 	'    </md-list-item></md-list>' +
			// 	'  </md-dialog-content>' +
			// 	'  <md-dialog-actions>' +
			// 	'    <md-button ng-click="closeDialog()" class="md-primary">' +
			// 	'      Close Dialog' +
			// 	'    </md-button>' +
			// 	'  </md-dialog-actions>' +
			// 	'</md-dialog>',
			locals: {
				items: $scope.items
			},
			controller: DialogController
		});

		function DialogController($scope, $mdDialog, items) {
			$scope.items = items;
			$scope.closeDialog = function () {
				$mdDialog.hide();
			}
		}
	}
});

// edit a test
//
app.controller('editTestCtrl', function ($scope, $location, data, confirmDlg) {
	$scope.tests = data.getTests();
	$scope.test = data.curTest;
	$scope.questions = data.getQuestions();
	// edit a question
	$scope.edit = function (quest) {
		data.curQuestNum = quest;
		$location.path('/editQuest')
	}
	// finished
	$scope.done = function () {
		if ($scope.testForm.$invalid) { // check to see if valid form
			confirmDlg('', 'Important!', 'If you leave you will lose what you have entered', 'Leave', 'Cancel')
				.then(function (results) {
					console.log(results);
					$location.path('/tests')
				});
		} else { // form is valid
			$location.path('/tests')
		}
	}
});

// Edit a Question
//
app.controller('editQuestCtrl', function ($scope, $location, data) {
	var quests = data.getQuestions();
	$scope.numQuests = quests.length;
	$scope.questNum = data.curQuestNum;
	$scope.quest = quests[data.curQuestNum];
	$scope.test = data.curTest;
	// next button clicked
	$scope.next = function () {
		if ($scope.questForm.$dirty) {
			// TODO: save question
			console.log('need to save');
			$scope.questForm.$setPristine();
		}
		$scope.questNum = ++data.curQuestNum;
		$scope.quest = quests[$scope.questNum];
	};
	// previous button
	$scope.prev = function () {
		if ($scope.questForm.$dirty) {
			// TODO: save question
			console.log('need to save');
			$scope.questForm.$setPristine();
		}
		$scope.questNum = --data.curQuestNum;
		$scope.quest = quests[$scope.questNum];
	};
	$scope.finished = function () {
		if ($scope.questForm.$dirty) {
			// TODO: save question
			console.log('need to save');
			$scope.questForm.$setPristine();
		}
	};
});

// Add Questions
//
app.controller('addQuestCtrl', function ($scope, $location, data) {
	$scope.questNum = 1;
	$scope.quest;
	$scope.test = data.curTest;
	$scope.next = function (quest) {
		// save question
		$scope.questNum++;

	};
	$scope.prev = function (quest) {
		if ($scope.questNum > 1) {
			$scope.questNum--;
		}
	}
});