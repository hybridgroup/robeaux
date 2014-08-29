var WidgetsCtrl = function WidgetsCtrl($scope, Widgets) {
  $scope.widgets = Widgets;
  $scope.activeWidgets = [];
  $scope.newWidget = false;

  // fetch robot name from parent
  var interval = setInterval(function() {
    if ($scope.$parent.robot) {
      $scope.$apply(function() {
        $scope.robot = $scope.$parent.robot.name;
        $scope.activeWidgets = Widgets.activeWidgets[$scope.robot] || [];
      })
    }
  }, 100);

  var save = function() {
    Widgets.activeWidgets[$scope.robot] = $scope.activeWidgets;
    Widgets.save();
  }

  $scope.newActiveWidget = function(widget) {
    if (widget.base === '') {
      return false;
    }

    widget.name = widget.base.name;
    delete widget.base;

    $scope.activeWidgets.push(widget);

    save();

    $scope.newWidget = false;
  };

  $scope.removeWidget = function(i) {
    $scope.activeWidgets.splice(i, 1);
    save();
  };
};
