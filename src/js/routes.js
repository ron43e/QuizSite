
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
    // .when("/createTest", {
    //   templateUrl: "pages/createTest.html",
    //   controller: "mainCtrl"
    // })
    .when("/addQuest", {
      templateUrl: "pages/addQuest.html",
      controller: "addQuestCtrl"
    })
    // .when("/addQuestion", {
    //   templateUrl: "pages/addquestions.html",
    //   controller: "mainCtrl"
    // })
    .when("/editTest", {
      templateUrl: "pages/adminEditTest.html",
      controller: "editTestCtrl"
    })
    .when("/login", {
      templateUrl: "pages/login.html",
      controller: "loginCtrl"
    })
    .when("/badLogin", {
      templateUrl: "pages/badLogin.html",
      controller: "mainCtrl"
    })
});
