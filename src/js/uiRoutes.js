app.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		// HOME STATES AND NESTED VIEWS ========================================
		.state('home', {
			url: '/home',
			templateUrl: 'pages/main.html'
		})
		// LOGIN PAGE =================================
		.state('login', {
			url: '/login',
			templateUrl: 'pages/login.html',
			controller: 'loginCtrl'
		})
		// ADMIN TESTS PAGE =================================
		.state('adminTests', {
			url: '/adminTests',
			templateUrl: 'pages/adminTests.html',
			controller: 'adminTestsCtrl'
		})
		// ADMIN EDIT TEST PAGE =================================
		.state('editTest', {
			url: '/editTest',
			templateUrl: 'pages/adminEditTest.html',
			controller: 'editTestCtrl'
		})
		// WELCOME PAGE =================================
		.state('welcome', {
			url: '/welcome',
			templateUrl: 'pages/welcome.html',
			controller: 'mainCtrl'
		});
})

