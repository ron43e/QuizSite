
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
    .when("/test", {
      templateUrl: "pages/tests.html"
    })
    .when("/results", {
      templateUrl: "pages/results.html"
    })
    .when("/changePW", {
      templateUrl: "pages/changePassword.html",
      controller: "loginCtrl"
    })
    .when("/adminScores", {
      templateUrl: "pages/adminScores.html",
      controller: "adminCtrl"
    })
    .when("/adminTests", {
      templateUrl: "pages/adminTests.html",
      controller: "adminTestsCtrl"
    })
    .when("/editTest", {
      templateUrl: "pages/adminEditTest.html",
      controller: "editTestCtrl"
    })
    .when("/createTest", {
      templateUrl: "pages/createTest.html",
      controller: "createTestCtrl"
    })
    .when("/addQuest", {
      templateUrl: "pages/addQuest.html",
      controller: "addQuestCtrl"
    })
    .when("/login", {
      templateUrl: "pages/login.html",
      controller: "loginCtrl"
    })
    .when("/badLogin", {
      templateUrl: "pages/badLogin.html",
      controller: "mainCtrl"
    })
    .otherwise({ redirectTo: '/'});
});
