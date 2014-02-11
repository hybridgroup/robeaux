// Routes
var robeaux = angular.module("robeaux", ['ngRoute']);

robeaux.config(["$routeProvider", function($routeProvider) {
  $routeProvider

  .when("/robots", {
    templateUrl: "/partials/robot-index.html",
    controller: RobotIndexCtrl
  })

  .when("/robots/:robotId", {
    templateUrl: "/partials/robot-detail.html",
    controller: RobotDetailCtrl
  })

  .when("/themes", {
    templateUrl: "/partials/themes.html",
    controller: ThemesCtrl
  })

  .otherwise({
    redirectTo: "/robots"
  });
}]);

robeaux.service("Themes", function() {
  var service = {};
  var defaultThemes = {
    "default": { custom: false, url: "/stylesheets/themes/default.css" },
    "dark": { custom: false, url: "/stylesheets/themes/dark.css" },
    "flat": { custom: false, url: "/stylesheets/themes/flat.css" }
  };

  var saveThemes = function() {
    localStorage.setItem("themes", angular.toJson(service.themes));
  };

  var loadThemes = function() {
    if (localStorage.getItem("themes")) {
      return angular.fromJson(localStorage.getItem("themes"));
    } else {
      return defaultThemes;
    }
  };

  var getActiveTheme = function() {
    return localStorage.getItem("activeTheme") || "default";
  };

  service.themes = loadThemes();

  service.activeTheme = getActiveTheme();

  service.saveThemes = saveThemes;

  service.current = function() {
    return service.themes[service.activeTheme];
  };

  service.list = function() {
    return Object.keys(service.themes);
  };

  service.customThemes = function() {
    var themes = {};

    for (var name in service.themes) {
      if (service.themes[name].custom) {
        themes[name] = service.themes[name];
      }
    }

    return themes;
  };

  service.setActiveTheme = function() {
    localStorage.setItem("activeTheme", service.activeTheme);
  }

  service.newTheme = function(name) {
    if (service.themes[name] || name === '' || name === undefined) {
      return false;
    }

    service.themes[name] = {css: "", custom: true};
    return true;
  };

  return service;
});

// Controllers
var ThemesCtrl = function($scope, Themes) {
  $scope.themes = Themes;

  $scope.selectTheme = function(name) {
    $scope.selectedTheme = Themes.themes[name];
  }

  $scope.newTheme = function(name) {
    if (Themes.newTheme(name)) {
      $scope.newThemeName = '';
    }
  }
}

var NavigationCtrl = function($scope, $location) {
  $scope.active = function(path) {
    return ($location.path().substring(1) || "robots") === path;
  }
}

var RobotIndexCtrl = function($scope, $http, $location, $route) {
  $http.get('/robots').success(function(data) {
    $scope.robots = data;
  });

  $scope.robotDetail = function(robotId) {
    return $location.path("/robots/" + robotId);
  };
};

var RobotDetailCtrl = function($scope, $http, $routeParams, $location) {
  $scope.params = [
    { name: '', value: '', type: 'string' }
  ];

  $scope.paramTypes = ["string", "boolean", "number"]

  $scope.addParam = function() {
    $scope.params.push({name: '', value: '', type: 'string'});
  }

  $scope.removeParam = function(index) {
    $scope.params.splice(index, 1)
  }

  $scope.isConnected = function(connection) {
    if (connection && connection.connected) { return "connected"; }
  };

  $http.get('/robots/' + $routeParams.robotId).success(function(data) {
    $scope.robot = data;
  });

  $scope.getDeviceDetail = function(deviceId) {
    var url = '/robots/' + $scope.robot.name + "/devices/" + deviceId;
    $http.get(url).success(function(data) {
      $scope.deviceDetail = data;
    });
  };

  $scope.executeDisabled = function() {
    return $scope.command === void 0
  }

  $scope.executeCommand = function() {
    var robot = $scope.robot.name,
        device = $scope.deviceDetail.name,
        command = $scope.command,
        params = extractParams(),
        url ='/robots/' + robot + "/devices/" + device + "/commands/" + command;

    $http.post(url, params).success(function(data) {
      $(".console code").append(data.result + "\n");
    });
  };

  var extractParams = function() {
    var params = {}

    for (var i = 0; i < $scope.params.length; i++) {
      var base = $scope.params[i];
      params[base.name] = base.value;

      switch (base.type) {
        case "boolean":
          str = String(params[base.name]).toLowerCase();
          params[base.name] = (str === 'true' || str === 't');
          break;

        case "number":
          params[base.name] = Number(params[base.name]);
          break;

        default:
          // assume string, nothing changes
          break;
      }
    }

    // check if empty (no params)
    if (isEmptyParams(params)) {
      return null;
    } else {
      return params;
    }
  }

  var isEmptyParams = function(params) {
    var empty = true;

    for (var key in params) {
      value = params[key];
      if (key !== "" || value !== "") {
        empty = false;
        break;
      }
    }

    return empty;
  }
};
