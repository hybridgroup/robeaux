var DeviceEventsCtrl = function DeviceEventsCtrl($scope, $filter) {
  $scope.listen = function() {
    if ($scope.eventName === "") { return; }

    if ($scope.device.events == null) { $scope.device.events = []; }
    if ($scope.device.listeners == null) { $scope.device.listeners = {}; }

    var robot = $scope.robot.name,
        device = $scope.device.name,
        event = $scope.eventName;

    var uri = "/api/robots/" + robot + "/devices/" + device + "/events/" + event;
    var $device = $scope.device;
    var source = new EventSource(uri);

    source.addEventListener('message', function(message) {
      $scope.$apply(function() {
        if ($device.events.length > 4) { $device.events.pop(); }
        $device.events.unshift({ name: event, data: JSON.parse(message.data) });
      });
    }, false);

    $scope.device.listeners[event] = source;
    $scope.eventName = "";
  };

  $scope.remove = function(name) {
    $scope.device.listeners[name].close();
    delete $scope.device.listeners[name];
  };
}
