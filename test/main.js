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
        $httpBackend.expect('GET', '/api/robots').respond(data);
        $httpBackend.flush();
        expect($scope.robots).toEqual(data);
    });
});

describe('RobotCtrl', function() {
    beforeEach(module('robeaux'));
    var $scope, $rootScope, $httpBackend, $timeout, $routeParams, testController;
    beforeEach(inject(function($injector) {
        $timeout = $injector.get('$timeout');
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $routeParams = $injector.get('$routeParams');
        $scope = $rootScope.$new();

        var $controller = $injector.get('$controller');

        testController = function() {
            return $controller('RobotCtrl', {
                '$scope': $scope

            });
        };
        var controller = testController();

        jasmine.getJSONFixtures().fixturesPath='base/test/support';
        $httpBackend.expect('GET', '/api/robots/' + $routeParams.robot).respond(loadJSONFixtures('myRobot.json'));
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
        expect($scope.robot[0]).toNotEqual($scope.device);
    });


    it('RobotCtrl should keep device selected', function (){
        var robotArray= [{"name": "robo1"},{"name":"robo2"}];
        $scope.robot = robotArray;
        $scope.select($scope.robot);
        expect($scope.selected($scope.robot)).toBeTruthy();
    });
});



describe('parseParams', function(){

    beforeEach(module('robeaux'));

        
    it('should set param name to value', function(){
        var form = [
            { 'name': 'bool', 'value': 'TRUE', 'type': 'boolean' },
            { 'name': 'boole', 'value': 'sadg', 'type': 'boolean' },
            { 'name': 'str', 'value': 'isOn', 'type': 'string' },
            { 'name': 'num', 'value': 100, 'type': 'number' }
        ];
        var params = parseParams(form);
        expect(params['num']).toEqual(100);
        expect(params['bool']).toEqual(true);
        expect(params['boole']).toEqual(false);
        expect(params['str']).toEqual('isOn');
    });

    it('should set empty params to true', function(){
        var form = [
            { 'name': '', 'value': '', 'type': 'boolean' },
            { 'name': '21', 'value': '12','type': 'boolean' },
        ];
         
        expect(paramsAreEmpty([form[1]])).toEqual(false);
        expect(paramsAreEmpty([form[0]])).toEqual(true);
    });

});

describe('RobotCommandsCtrl', function() {
    beforeEach(module('robeaux'));
    var $scope, $rootScope, $httpBackend, $timeout, testController;
    var $injector = angular.injector(['robeaux', 'ng']);
    beforeEach(inject(function($injector) {
        $timeout = $injector.get('$timeout');
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();

        var $controller = $injector.get('$controller');

        testController = function() {
            return $controller('RobotCommandsCtrl', {
                '$scope': $scope
            });
        };
        var controller = testController();

        jasmine.getJSONFixtures().fixturesPath='base/test/support';
        var data = loadJSONFixtures('myRobot.json');
        $scope.robot = data;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('RobotCommandsCtrl command should be an empty string', function (){
        $scope.command = "";
        expect($scope.isDisabled()).toBe(true);
    });

    it('RobotCommandsCtrl should add params if last', function (){
        expect($scope.robot.params.length).toBe(1)
        $scope.addParam($scope.robot);
        expect($scope.robot.params.length).toBe(2)
    });

    it('RobotCommandsCtrl command should be an empty string', function (){
        expect($scope.robot.params.length).toBe(2)
        $scope.removeParam($scope.robot);
        expect($scope.robot.params.length).toBe(1)
    });

    it('RobotCommandsCtrl should get robot command results', function (){
        $scope.robot.name = "myRobot";
        $scope.command = "relax";
        $scope.robot.params= [{'name': 'relax', 'value':'true', 'type':'string'}];
        var params  = {'relax': 'true'};
        var data= {'result': "myRobot says relax"};

        $scope.submit();
        $httpBackend.expectPOST('/api/robots/myRobot/commands/relax', params).respond(data);
        $httpBackend.flush();
        expect($scope.robot.results).toEqual([{'result': "myRobot says relax"}])
    });
});

describe('DeviceCommandsCtrl', function() {
    beforeEach(module('robeaux'));
    var $scope, $rootScope, $httpBackend, $timeout, testController;
    beforeEach(inject(function($injector) {
        $timeout = $injector.get('$timeout');
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();

        var $controller = $injector.get('$controller');

        testController = function() {
            return $controller('DeviceCommandsCtrl', {
                '$scope': $scope
            });
        };
        var controller = testController();

        jasmine.getJSONFixtures().fixturesPath='base/test/support';
        var data = loadJSONFixtures('myDevice.json');
        $scope.device = data;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('DeviceCommandsCtrl command should be an empty string', function (){
        $scope.command = "";
        expect($scope.isDisabled()).toBe(true);
    });

    it('DeviceCommandsCtrl should add params if last', function (){
        expect($scope.device.params.length).toBe(1)
        $scope.addParam($scope.device);
        expect($scope.device.params.length).toBe(2)
    });

    it('DeviceCommandsCtrl command should be an empty string', function (){
        expect($scope.device.params.length).toBe(2)
        $scope.removeParam($scope.device);
        expect($scope.device.params.length).toBe(1)
    });

    it('DeviceCommandsCtrl command should be an empty string', function (){
        $scope.robot = {'name':"myRobot"};
        $scope.device.name = "led";
        $scope.command = "brightness";
        $scope.device.params = [{'name': 'brightness', 'value': 255, 'type':'string'}];
        var params = {'brightness': 255};
        var data= {'result': "brightness is 255"};

        $scope.submit();
        $httpBackend.expectPOST('/api/robots/myRobot/devices/led/commands/brightness', params).respond(data);
        $httpBackend.flush();
        expect($scope.device.results[0]).toEqual({'result': "brightness is 255"})
    });

});

