var NavCtrl = function NavCtrl($scope, $location) {
  $scope.active = function(path) {
    return ($location.path().substring(1).split("/")[0] || "robots") === path;
  }
}
