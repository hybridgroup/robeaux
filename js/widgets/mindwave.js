$attrs.robotName = $attrs.robotName || "TestBot";

// HTTP URI new data is requested from
var uri = "/api/robots/" + $attrs.robotName + "/commands/eeg";

var scaleEEG = function(original) {
  var eeg = {};

  for (var key in original) {
    var num = original[key];
    num = (num / 20000000) * 100;
    eeg[key] = num;
  }

  return eeg;
};

var fetchData = function() {
  var req = $http.get(uri);

  req.success(function(data) {
    var eeg = data.result;
    $scope.eeg = scaleEEG(eeg);
  });
};

setInterval(fetchData, 500);
