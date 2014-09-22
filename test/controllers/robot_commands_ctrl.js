describe('Controller RobotCommandsCtrl:', function() {
    
    beforeEach(module('robeaux'));
    
    var $scope, $rootScope, $httpBackend, $timeout, $routeParams, testController;
    var $injector = angular.injector(['robeaux', 'ng']);
    
    beforeEach(inject(function($injector) {
        $timeout = $injector.get('$timeout');
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $routeParams = $injector.get('$routeParams');
        $scope = $rootScope.$new();

        var $controller = $injector.get('$controller');

        testController = function() {
            return $controller('RobotCommandsCtrl', {
                '$scope': $scope
            });
        };
        var controller = testController();

        jasmine.getJSONFixtures().fixturesPath='base/test/support';
        var data = loadJSONFixtures('myRobot.json')['myRobot.json'];
        $scope.robot = data.robot;
        $scope.robot.params = [ { name: '', value: '', type: 'string' } ];
        $scope.robot.results = [];
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('command:', function() {
        it('should be an empty string', function (){
            expect($scope.command).toBe("");
        });
    });

    describe('command types:', function() {
        it('should be an array of string, boolean and number', function (){
            var command_types = [ 'string', 'boolean', 'number' ];
            expect($scope.types).toEqual(command_types);
        });
    });

    describe('isDisabled:', function() {
        it('should return true if command is empty', function (){
            expect($scope.isDisabled()).toBe(true);
        });

        it('should return false if command exist', function (){
            $scope.command = 'test_command'
            expect($scope.isDisabled()).toBe(false);
        });
    });

    describe('addParam:', function() {
        it('should add params if last', function (){
            expect($scope.robot.params.length).toBe(1)
            $scope.addParam($scope.robot);
            expect($scope.robot.params.length).toBe(2)
        });

        it('should not add params if not last', function (){
            expect($scope.robot.params.length).toBe(1)
            $scope.addParam();
            expect($scope.robot.params.length).toBe(1)
        });
    });

    describe('removeParam:', function() {
        it('should remove param if there is more than one', function (){
            $scope.robot.params = [
              { name: '', value: '', type: 'string' },
              { name: '', value: '', type: 'string' }
            ];

            expect($scope.robot.params.length).toBe(2)
            $scope.removeParam($scope.robot);
            expect($scope.robot.params.length).toBe(1)
        });

        it('should not remove param if there just one', function (){
            $scope.robot.params = [
              { name: '', value: '', type: 'string' }
            ];

            expect($scope.robot.params.length).toBe(1)
            $scope.removeParam($scope.robot);
            expect($scope.robot.params.length).toBe(1)
        });

        it('should remove the correct param passed to the function', function (){
            $scope.robot.params = [
              { name: 'param1', value: 'value1', type: 'string' },
              { name: 'param2', value: 'value2', type: 'string' }
            ];

            var param_to_remove = { name: 'param1', value: 'value1', type: 'string' };
            var param_to_keep = { name: 'param2', value: 'value2', type: 'string' };

            expect($scope.robot.params[0]).toEqual(param_to_remove)
            $scope.removeParam(param_to_remove);
            expect($scope.robot.params[0]).toEqual(param_to_keep)
        });
    });

    describe('submit:', function() {
        it('should run command and return results', function (){
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
});