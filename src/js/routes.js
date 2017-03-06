app.config(function ($routeProvider, $locationProvider) {
  //  $locationProvider.html5Mode(true).hashPrefix('*');
  //  $locationProvider.hashPrefix('');
  $routeProvider
    .when("/", {
      templateUrl: "pages/main.html"
    })
    .when("/welcome", {
      templateUrl: "pages/welcome.html"
    })
    // .when("/test", {
    //   templateUrl: "pages/tests.html"
    // })
    // .when("/results", {
    //   templateUrl: "pages/results.html"
    // })
    // .when("/changePW", {
    //   templateUrl: "pages/changePassword.html",
    //   controller: "loginCtrl"
    // })
    // .when("/adminScores", {
    //   templateUrl: "pages/adminScores.html",
    //   controller: "adminCtrl"
    // })
    .when("/tests", {
      templateUrl: "pages/tests.html",
      controller: "testsCtrl",
      resolve: {
        tests: function (data) {
          return data.getTests();
        }
      }
    })
    .when("/createTest", {
      templateUrl: "pages/createTest.html",
      controller: "createTestCtrl"
    })
    // .when("/addQuest", {
    //   templateUrl: "pages/addQuest.html",
    //   controller: "addQuestCtrl"
    // })
    // .when("/addQuestion", {
    //   templateUrl: "pages/addquestions.html",
    //   controller: "mainCtrl"
    // })
    .when("/editTest", {
      templateUrl: "pages/editTest.html",
      controller: "editTestCtrl",
      resolve: {
        quests: function (data) {
          return data.getQuest();
        }
      }
    })
    .when("/editQuest", {
      templateUrl: "pages/quest.html",
      controller: "editQuestCtrl"
    })
    .when("/login", {
      templateUrl: "pages/login.html",
      controller: "loginCtrl"
    })
    .when("/badLogin", {
      templateUrl: "pages/badLogin.html",
      controller: "mainCtrl"
    });

  // use the HTML5 History API
  $locationProvider.html5mode = true;
});