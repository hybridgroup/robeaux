robeaux.config(function($routeProvider) {
  $routeProvider

    .when('/robots', {
      controller: 'IndexCtrl',
      templateUrl: '/partials/index.html',
    })

    .when('/robots/:robot', {
      controller: 'RobotCtrl',
      templateUrl: '/partials/robot.html',
    })

    .when('/themes', {
      controller: 'ThemesCtrl',
      templateUrl: '/partials/themes.html',
    })

    .otherwise({
      redirectTo: '/robots'
    });
});
