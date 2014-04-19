var RobotCommandsCtrl = function RobotCommandsCtrl($scope, $http) {
  $scope.command = "";
  $scope.types = [ 'string', 'boolean', 'number' ];

  $scope.isDisabled = function() {
    return ($scope.command === "")
  };

  $scope.addParam = function(last) {
    console.log("HEY");
    if (!last) { return; }
    $scope.robot.params.push({ name: '', value: '', type: 'string' });
  };

  $scope.removeParam = function(index) {
    if ($scope.robot.params.length === 1) { return; }
    $scope.robot.params.splice(index, 1);
  };

  $scope.submit = function() {
    var robot = $scope.robot.name,
        command = $scope.command,
        params = parseParams($scope.robot.params);

    var url ='/robots/' + robot + "/commands/" + command;

    $http.post(url, params).success(function(data) {
      if (data.result) {
        if ($scope.robot.results.length > 4) { $scope.robot.results.pop(); }
        $scope.robot.results.unshift(data);
      }
    });
  };
}
