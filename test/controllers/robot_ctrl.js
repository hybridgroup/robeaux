describe("Testing Controllers", function() {
    describe('Controller RobotCtrl:', function() {
        
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
            $httpBackend.expect('GET', '/api/robots/' + $routeParams.robot).respond(loadJSONFixtures('myRobot.json')['myRobot.json']);
            $httpBackend.flush();

        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should get robot details', function() {
            var data = loadJSONFixtures('myRobot.json')['myRobot.json'];
            data.robot.params = [ { name: '', value: '', type: 'string' } ];
            data.robot.results = [];
            expect($scope.robot).toEqual(data.robot);
        });

        describe('select:', function() {
            it('should select a device', function (){
                var robotArray= [{"name": "robo1"},{"name":"robo2"}];
                $scope.robot = robotArray;
                $scope.select($scope.robot[1]);
                expect($scope.robot[1]).toEqual($scope.device);
                expect($scope.robot[0]).toNotEqual($scope.device);
            });
        });

        describe('selected:', function() {
            it('should return if device is still selected', function (){
                var robotArray= [{"name": "robo1"},{"name":"robo2"}];
                $scope.robot = robotArray;
                $scope.select($scope.robot);
                expect($scope.selected($scope.robot)).toBeTruthy();
            });
        });
    });
});
