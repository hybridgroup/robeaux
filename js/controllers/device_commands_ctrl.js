var DeviceCommandsCtrl = function DeviceCommandsCtrl($scope, $http) {
  $scope.command = "";
  $scope.types = [ 'string', 'boolean', 'number' ];

  $scope.isDisabled = function() {
    return ($scope.command === "")
  };

  $scope.addParam = function(last) {
    if (!last) { return; }
    $scope.device.params.push({ name: '', value: '', type: 'string' });
  };

  $scope.removeParam = function(index) {
    if ($scope.device.params.length === 1) { return; }
    $scope.device.params.splice(index, 1);
  };

  $scope.submit = function() {
    var robot = $scope.robot.name,
        device = $scope.device.name,
        command = $scope.command,
        params = parseParams($scope.device.params);

    var url ='/api/robots/' + robot + "/devices/" + device + "/commands/" + command;

    $http.post(url, params).success(function(data) {
      if (data.result) {
        if ($scope.device.results.length > 4) { $scope.device.results.pop(); }
        $scope.device.results.unshift(data);
      }
    });
  };
}

// Parses command params, coercing to types where necessary.
//
// Returns an array.
var parseParams = function(formParams) {
  if (paramsAreEmpty(formParams)) { return null; }

  var params = {};

  for (var i = 0; i < formParams.length; i++) {
    var param = formParams[i];

    // skip if param name or value is empty
    if (param.name === '' || param.value === '') { continue; }

    params[param.name] = param.value;

    switch(param.type) {
      case 'boolean':
        string = String(param.value).toLowerCase();
        params[param.name] = (string === 'true' || string === 't');
        break;

      case 'number':
        params[param.name] = Number(param.value)
        break;

      default:
        // assume a string, nothing changes
        break;
    }
  };

  return params;
};

var paramsAreEmpty = function(params) {
  for (var i = 0; i < params.length; i++) {
    var param = params[i]

    if (param.name !== '' || param.value !== '') {
      return false;
    };
  }

  return true;
};
