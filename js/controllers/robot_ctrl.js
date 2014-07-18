var RobotCtrl = function RobotCtrl($scope, $http, $routeParams) {
  $http.get("/api/robots/" + $routeParams.robot).success(function(data) {
    $scope.robot = data;

    $scope.robot.params = [ { name: '', value: '', type: 'string' } ];
    $scope.robot.results = [];
  });

  $scope.select = function(device) {
    $scope.device = ($scope.device === device) ? null : device;

    // setting up params we'll need in other controllers
    if ($scope.device.params == null) {
      $scope.device.params = [ { name: '', value: '', type: 'string' } ];
    }

    if ($scope.device.events == null) { $scope.device.events = []; }
    if ($scope.device.results == null) { $scope.device.results = []; }
    if ($scope.device.listeners == null) { $scope.device.listeners = {}; }
  }

  $scope.selected = function(device) {
    return ($scope.device === device);
  }
}
