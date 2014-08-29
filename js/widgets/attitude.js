$scope.styles = function() {
  var styles = {};

  var prefixes = [
    "-webkit-",
    "-moz-",
    "-ms-",
    "-o-",
    ""
  ];

  prefixes.forEach(function(prefix) {
    styles[prefix + "transform"] = "rotate(" + $scope.attitude / 4 + "turn)";
  });

  return styles;
};

var url = "/api/robots/" + $attrs.robot + "/devices/" + $attrs.device + "/events/" + $attrs.event;

var es = new EventSource(url);

es.addEventListener('message', function(message) {
  $scope.$apply(function() {
    $scope.attitude = JSON.parse(message.data);
  });
}, false);
