app.factory('data', ['$http', function ($http) {
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
		tests: function () {
			return tests;
		},
		questions: function () {
			return questions;
		},
		getTests: function () {
			var promise = $http({
				method: 'GET',
				url: 'php/getTests.php'
			});
			promise.success(function (data, status, headers, conf) {
				tests = data;
				return data;
			});
			return promise;
		},
		getQuest: function () {
			var promise = $http({
				method: 'GET',
				url: 'php/getQuest.php'
			});
			promise.success(function (data, status, headers, conf) {
				questions = data;
				return data;
			});
			return promise;
		},
		saveQuest: function(question) {

		}
	}
}])

app.factory('Auth', function () {
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
//
app.factory('verifyDelete', function ($mdDialog) {
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
app.factory('prompt', function ($mdDialog) {
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

