// Routes
var robeaux = angular.module("robeaux", ['ngRoute']);

robeaux.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/robots", {
    templateUrl: "/partials/robot-index.html",
    controller: RobotIndexCtrl
  }).when("/robots/:robotId", {
    templateUrl: "/partials/robot-detail.html",
    controller: RobotDetailCtrl
  }).otherwise({
    redirectTo: "/robots"
  });
}]);

robeaux.service("Themes", function() {
  var service = {};

  service.list = ["default", "dark"];
  service.selected = "default";

  service.url = function() {
    return "/stylesheets/themes/" + service.selected + ".css"
  };

  service.set = function(name) {
    localStorage.setItem("theme", name);
  }

  // load from localStorage if set
  if (theme = localStorage.getItem("theme")) { service.selected = theme; }

  return service;
});

// Controllers
var ThemesCtrl = function($scope, Themes) {
  $scope.themes = Themes;
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
