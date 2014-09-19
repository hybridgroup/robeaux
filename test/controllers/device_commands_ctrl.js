describe('Controller DeviceCommandsCtrl:', function() {

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

        var data = loadJSONFixtures('myDevice.json')['myDevice.json'];

        $scope.device = data[0];
        $scope.device.results = [];
        $scope.device.params = [{ name: '', value: '', type: 'string' }];
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('command: should be an empty string', function (){
        expect($scope.command).toBe("");
    });
    
    it('command types: should be an array of string, boolean and number', function (){
        var command_types = [ 'string', 'boolean', 'number' ];
        expect($scope.types).toEqual(command_types);
    });

    it('isDisabled: should return true if command is empty', function (){
        expect($scope.isDisabled()).toBe(true);
    });

    it('isDisabled: should return false if command exist', function (){
        $scope.command = 'test_command'
        expect($scope.isDisabled()).toBe(false);
    });

    it('addParam: should add params if last', function (){
        expect($scope.device.params.length).toBe(1)
        $scope.addParam($scope.device);
        expect($scope.device.params.length).toBe(2)
    });

    it('addParam: should not add params if not last', function (){
        expect($scope.device.params.length).toBe(1)
        $scope.addParam();
        expect($scope.device.params.length).toBe(1)
    });

    it('removeParam: should remove param if there is more than one', function (){
        $scope.device.params = [
          { name: '', value: '', type: 'string' },
          { name: '', value: '', type: 'string' }
        ];

        expect($scope.device.params.length).toBe(2)
        $scope.removeParam($scope.device);
        expect($scope.device.params.length).toBe(1)
    });

    it('removeParam: should not remove param if there just one', function (){
        $scope.device.params = [
          { name: '', value: '', type: 'string' }
        ];

        expect($scope.device.params.length).toBe(1)
        $scope.removeParam($scope.device);
        expect($scope.device.params.length).toBe(1)
    });

    it('removeParam: should remove the correct param passed to the function', function (){
        $scope.device.params = [
          { name: 'param1', value: 'value1', type: 'string' },
          { name: 'param2', value: 'value2', type: 'string' }
        ];

        var param_to_remove = { name: 'param1', value: 'value1', type: 'string' };
        var param_to_keep = { name: 'param2', value: 'value2', type: 'string' };

        expect($scope.device.params[0]).toEqual(param_to_remove)
        $scope.removeParam(param_to_remove);
        expect($scope.device.params[0]).toEqual(param_to_keep)
    });

    it('submit: should run command and return results', function (){
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