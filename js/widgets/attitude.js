$attrs.robotName = $attrs.robotName || "TestBot";

// HTTP URI new data is requested from
var uri = "/api/robots/" + $attrs.robotName + "/commands/attitude";

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

var fetchData = function() {
  var req = $http.get(uri);

  req.success(function(data) {
    $scope.attitude = data.result;
  });
};

setInterval(fetchData, 500);
