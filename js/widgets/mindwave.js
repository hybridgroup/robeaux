var scaleEEG = function(original) {
  var eeg = {};

  for (var key in original) {
    var num = original[key];
    num = (num / 20000000) * 100;
    eeg[key] = num;
  }

  return eeg;
};

var url = "/api/robots/" + $attrs.robot + "/devices/" + $attrs.device + "/events/" + $attrs.event;

var es = new EventSource(url);

es.addEventListener('message', function(message) {
  var eeg = JSON.parse(message.data);

  $scope.$apply(function() {
    $scope.eeg = scaleEEG(eeg);
  });
}, false);
