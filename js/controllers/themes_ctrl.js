var ThemesCtrl = function ThemesCtrl($scope, Themes) {
  $scope.themes = Themes;

  // save when a theme is selected
  $scope.$watch('themes.active', function() {
    // watch for corner case where 'themes.active' update was causing themes to
    // be saved as undefined
    if (Themes.list) { Themes.save(); }
  });

  // selecting a theme for editing
  $scope.edit = function(theme) {
    if ($scope.editing === theme || !theme.custom) {
      return $scope.editing = null;
    }

    $scope.editing = theme;
  };

  // add a new theme
  $scope.add = function(name) {
    if (!name || name === '') { return false; }

    var result = Themes.add(name);
    if (result) {
      $scope.edit(result);
      $scope.name = '';
    }
  };

  // remove an existing theme
  $scope.remove = function(name) {
    if ($scope.editing === Themes.find(name)) { $scope.editing = null; }
    Themes.remove(name);
  };
};
