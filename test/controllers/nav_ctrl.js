describe("Testing Controllers", function() {
    describe('Controller NavCtrl:', function() {
        
        beforeEach(module('robeaux'));
        
        var $scope, $rootScope, $httpBackend, $location, $timeout, testController;
        
        beforeEach(inject(function($injector) {
            $timeout = $injector.get('$timeout');
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            $location = $injector.get('$location');
            $scope = $rootScope.$new();

            var $controller = $injector.get('$controller');

            testController = function() {
                return $controller('NavCtrl', {
                    '$scope': $scope
                });
            };

            var controller = testController();
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        describe('active:', function() {
            it('should return if current path is the same as the location path', function() {
                $location.path('robots');
                
                expect($scope.active('robots')).toEqual(true);
                expect($scope.active('robots/myRobot')).toEqual(false);
            });
        });
    });
});
