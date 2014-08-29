var WidgetEditorCtrl = function WidgetEditorCtrl($scope, Widgets) {
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

  $scope.removeAttr = function(index) {
    if (!$scope.editing) {
      return;
    }

    $scope.editing.attrs.splice(index, 1);

    Widgets.save();
  };
};
