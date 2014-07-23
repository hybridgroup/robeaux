var WidgetsCtrl = function WidgetsCtrl($scope, Widgets) {
  $scope.widgets = Widgets;

  $scope.add = function(name) {
    if (!name || name === '') {
      return false;
    }

    var result = Widgets.add(name);

    if (result) {
      $scope.edit(result);
      $scope.name = '';
    }
  };

  $scope.edit = function(widget) {
    if ($scope.editing === widget) {
      return $scope.editing = null;
    }

    $scope.editing = widget;
  }
};
