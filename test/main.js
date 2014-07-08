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

describe('RobotCtrl', function() {
    beforeEach(module('robeaux'));
    var $scope, $rootScope, $httpBackend, $timeout, testController;
    beforeEach(inject(function($injector) {
        $timeout = $injector.get('$timeout');
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();

        var $controller = $injector.get('$controller');

        testController = function() {
            return $controller('RobotCtrl', {
                '$scope': $scope
            });
        };
        var controller = testController();

        jasmine.getJSONFixtures().fixturesPath='base/test/support';
        var data = loadJSONFixtures('myRobot.json');
        $httpBackend.expect('GET', '/robots/undefined').respond(data);
        $httpBackend.flush();

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('RobotCtrl should get robot data', function() {
        var data = loadJSONFixtures('myRobot.json');
        data.params = [ { name: '', value: '', type: 'string' } ];
        data.results = [];
        expect($scope.robot).toEqual(data);
    });

    it('RobotCtrl should select device', function (){
        var robotArray= [{"name": "robo1"},{"name":"robo2"}];
        $scope.robot = robotArray;
        $scope.select($scope.robot[1]);
        expect($scope.robot[1]).toEqual($scope.device);
    });


    it('RobotCtrl should keep device selected', function (){
        expect($scope.selected($scope.device)).toBeTruthy;
    });
});
