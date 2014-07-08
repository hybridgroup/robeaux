describe('IndexCtrl', function() {
    var $scope, $rootScope, $httpBackend, $timeout, testController;
    beforeEach(inject(function($injector) {
        $timeout = $injector.get('$timeout');
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();

        var $controller = $injector.get('$controller');

        testController = function() {
            return $controller('IndexCtrl', {
                '$scope': $scope
            });
        };
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('IndexCtrl should get array of robots', function() {
        var controller = testController();
        jasmine.getJSONFixtures().fixturesPath='base/test/support';
        var data = loadJSONFixtures('robots.json');
        $httpBackend.expect('GET', '/robots').respond(data);
        $httpBackend.flush();
        expect($scope.robots).toEqual(data);
    });
});