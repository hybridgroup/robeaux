var WidgetsCtrl = function WidgetsCtrl($scope, Widgets) {
  $scope.widgets = Widgets;
  $scope.newWidget = false;
  $scope.activeWidgets = [];
}
