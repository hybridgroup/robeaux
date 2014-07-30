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
    if ($scope.editing === widget || !widget.custom) {
      return $scope.editing = null;
    }

    $scope.editing = widget;
  };

  $scope.addAttr = function() {
    if ($scope.editing && $scope.newAttr.length) {
      $scope.editing.attrs.push($scope.newAttr);
    }

    $scope.newAttr = '';

    Widgets.save();
  };

  $scope.removeAttr = function(attr) {
    if (!$scope.editing) {
      return;
    }

    var index = $scope.editing.attrs.indexOf(attr);

    if (index > -1) {
      $scope.editing.attrs.splice(index, 1);
    }

    Widgets.save();
  };
};
