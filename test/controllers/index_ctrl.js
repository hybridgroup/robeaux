describe("Testing Controllers", function() {
    describe('Controller IndexCtrl:', function() {
        
        beforeEach(module('robeaux'));
        
        var $scope, $rootScope, $httpBackend, $location, $timeout, testController, data;
        
        beforeEach(inject(function($injector) {
            $timeout = $injector.get('$timeout');
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            $location = $injector.get('$location');
            $scope = $rootScope.$new();

            var $controller = $injector.get('$controller');

            testController = function() {
                return $controller('IndexCtrl', {
                    '$scope': $scope
                });
            };

            var controller = testController();

            jasmine.getJSONFixtures().fixturesPath='base/test/support';
            data = loadJSONFixtures('robots.json')['robots.json'];
            $httpBackend.expect('GET', '/api/robots').respond(data);
            $httpBackend.flush();
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should get array of robots', function() {
            expect($scope.robots).toEqual(data.robots);
        });

        describe('details:', function() {
            it('should redirect to robot show page', function() {
                expect($location.path()).toEqual('');
                $scope.details(data.robots[0].name);
                expect($location.path()).toEqual('/robots/' + data.robots[0].name);
            });
        });
    });
});
