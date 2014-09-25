describe("Testing Controllers", function() {
    describe('Controller WidgetsCtrl:', function() {

        beforeEach(module('robeaux'));

        var $scope, $rootScope, $httpBackend, $timeout, testController, data;

        beforeEach(inject(function($injector) {
            localStorage.clear();
            $timeout = $injector.get('$timeout');
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            

            var $controller = $injector.get('$controller');

            testController = function() {
                return $controller('WidgetsCtrl', {
                    '$scope': $scope
                });
            };

            var controller = testController();
            jasmine.getJSONFixtures().fixturesPath='base/test/support';
            data = loadJSONFixtures('widgets.json')['widgets.json'];

            $scope.widgets = $injector.get('Widgets');
            $scope.activeWidgets = [];
            $scope.newWidget = false;

        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should get array of widgets', function() {
            expect($scope.widgets.list).toEqual(data.widgets);
        });

        describe('newActiveWidget:', function() {
            it('should not activate widget if base is not provided', function() {
                expect($scope.activeWidgets.length).toEqual(0);
                var new_widget = {base: ''}
                $scope.newActiveWidget(new_widget);
                expect($scope.activeWidgets.length).toEqual(0);
            });

            it('should activate widget if base is provided', function() {
                expect($scope.activeWidgets.length).toEqual(0);
                
                var new_widget = {base: $scope.widgets.list[0]}
                $scope.newActiveWidget(new_widget);
                expect($scope.activeWidgets.length).toEqual(1);
            });
        });

        describe('removeWidget:', function() {
            it('should remove widget form active list', function() {
                expect($scope.activeWidgets.length).toEqual(0);
                
                var new_widget = {base: $scope.widgets.list[0]}
                $scope.newActiveWidget(new_widget);
                expect($scope.activeWidgets.length).toEqual(1);

                $scope.removeWidget(0);
                expect($scope.activeWidgets.length).toEqual(0);
            });
        });
        
    });
});
