describe('Controller DeviceEventsCtrl:', function() {

    beforeEach(module('robeaux'));
    
    var $scope, $rootScope, $httpBackend, $timeout, testController;
    
    beforeEach(inject(function($injector) {
        $timeout = $injector.get('$timeout');
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();

        var $controller = $injector.get('$controller');

        testController = function() {
            return $controller('DeviceEventsCtrl', {
                '$scope': $scope
            });
        };
        var controller = testController();

        jasmine.getJSONFixtures().fixturesPath='base/test/support';

        var data = loadJSONFixtures('myDevice.json')['myDevice.json'];

        $scope.robot = {'name':"myRobot"};
        $scope.eventName = "";
        $scope.device = data[0];
        $scope.device.events = null;
        $scope.device.listeners = null;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('listen: should add a listener for an event and clear eventName', function (){
        expect($scope.device.listeners).toBe(null);
        $scope.eventName = "listen_event";
        $scope.listen();
        expect($scope.device.listeners['listen_event']).not.toBe(null);
        expect($scope.eventName).toBe("");
    });

    it('listen: should listen to multiple events', function (){
        expect($scope.device.listeners).toBe(null);
        
        $scope.eventName = "first_event";
        $scope.listen();
        $scope.eventName = "second_event";
        $scope.listen();
        $scope.eventName = "third_event";
        $scope.listen();

        expect($scope.device.listeners['first_event']).not.toBe(null);
        expect($scope.device.listeners['second_event']).not.toBe(null);
        expect($scope.device.listeners['third_event']).not.toBe(null);
    });


    it('remove: should remove listener', function (){
        expect($scope.device.listeners).toBe(null);
        
        $scope.eventName = "listen_event";
        $scope.listen();
        expect($scope.device.listeners['listen_event']).not.toBe(null);

        $scope.remove("listen_event")

        expect($scope.device.listeners['listen_event']).toBe(undefined);
        
    });


    
});