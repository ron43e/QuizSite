app.factory('data', ['$http', function ($http) {
	var tests = [];
	var curTest = {};
	var curQuestNum;
	var questions = [];
	return {
		readDBTests: function () {
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
		setTests: function (testList) {
			tests = testList;
		},
		getTests: function () {
			return tests;
		},
		readDBQuest: function () {
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
		setQuestions: function (questList) {
			questions = questList;
		},
		getQuestions: function () {
			return questions;
		},
		updateQuest: function (question) {

		},
		addQuest: function (question) {

		},
		setCurQuest: function (questNum) {
			curQuestNum = questNum;
		},
		getCurQuest: function () {
			return curQuestNum;
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

// Confirm dialog
//
app.factory('confirmDlg', function ($mdDialog) {
	//Include a reference to the user object we're deleting
	return function (item, title, content, okBtn, canBtn) {
		//Call the confirm() function to configure the confirmation dialog
		var confirm = $mdDialog.confirm()
			.title(title)
			.content(content + '?')
			.ariaLabel('')
			.ok(okBtn)
			.cancel(canBtn);
		return $mdDialog.show(confirm);
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
			//			.targetEvent(ev)
			.ok(okStr)
			.cancel(canStr);

		return $mdDialog.show(confirm);
		//.then(function (result) {
		//   $scope.status = 'You decided to name your dog ' + result + '.';
		//}, function () {
		//   $scope.status = 'You didn\'t name your dog.';
		//});
	};
})

