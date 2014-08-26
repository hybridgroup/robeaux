var WidgetsCtrl = function WidgetsCtrl($scope, Widgets) {
  $scope.widgets = Widgets;
  $scope.activeWidgets = Widgets.activeWidgets || [];
  $scope.newWidget = false;

  $scope.newActiveWidget = function(widget) {
    if (widget.base === '') {
      return false;
    }

    widget.name = widget.base.name;
    delete widget.base;

    $scope.activeWidgets.push(widget);
    $scope.newWidget = false;
  }
};
