var IndexCtrl = function IndexCtrl($scope, $http, $location) {
  $http.get("/api/robots").success(function(data) {
    $scope.robots = data.robots;
  });

  $scope.details = function (robot) {
    $location.path("robots/" + robot);
  }
};
