describe('Controller WidgetEditorCtrl:', function() {

    beforeEach(module('robeaux'));

    var $scope, $rootScope, $httpBackend, $timeout, testController, data;

    beforeEach(inject(function($injector) {
        localStorage.clear();
        $timeout = $injector.get('$timeout');
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        $scope.widgets = $injector.get('Widgets');

        var $controller = $injector.get('$controller');

        testController = function() {
            return $controller('WidgetEditorCtrl', {
                '$scope': $scope
            });
        };

        var controller = testController();
        jasmine.getJSONFixtures().fixturesPath='base/test/support';
        data = loadJSONFixtures('widgets.json')['widgets.json'];

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get array of widgets', function() {
        expect($scope.widgets.list).toEqual(data.widgets);
    });

    describe('add:', function() {
        it('should not add widget with empty name', function() {
            expect($scope.widgets.list.length).toEqual(2);
            $scope.add();
            expect($scope.widgets.list.length).toEqual(2);
            $scope.add('');
            expect($scope.widgets.list.length).toEqual(2);
        });

        it('should add widget', function() {
            expect($scope.widgets.list.length).toEqual(2);
            $scope.add('new widget');
            expect($scope.widgets.list.length).toEqual(3);
        });

        it('should add widget and put it on edit mode', function() {
            expect($scope.editing).toEqual(null);
            $scope.add('second widget');
            expect($scope.editing.name).toEqual('second widget');
        });
    });

    describe('edit:', function() {
        it('should not set widget on edit mode if is not a custom widget', function() {
            expect($scope.editing).toEqual(null);
            $scope.edit(data.widgets[0].name)
            expect($scope.editing).toEqual(null);
        });

        it('should not set widget on edit mode if widget is already being edited', function() {
            expect($scope.editing).toEqual(null);
            $scope.add('third widget')
            expect($scope.editing.name).toEqual('third widget');

            $scope.edit('third widget');
            expect($scope.editing).toEqual(null);
        });
    });

    describe('addAttr:', function() {
        it('should not add attr to the widget if widget is not on edit mode', function() {
            $scope.newAttr = 'new attr';
            expect($scope.editing).toEqual(null);
            $scope.addAttr();
            expect($scope.editing).toEqual(null);
        });

        it('should add attr to the widget if widget is on edit mode', function() {
            $scope.editing = $scope.widgets.list[0];
            $scope.newAttr = 'new attr';
            expect($scope.editing.attrs.length).toEqual(3);
            $scope.addAttr();
            expect($scope.editing.attrs.length).toEqual(4);
        });
    });

    describe('removeAttr:', function() {
        it('should not remove attr to the widget if widget is not on edit mode', function() {
            $scope.newAttr = 'new attr';
            expect($scope.editing).toEqual(null);
            $scope.removeAttr();
            expect($scope.editing).toEqual(null);
        });

        it('should remove attr to the widget if widget is on edit mode', function() {
            $scope.editing = $scope.widgets.list[0];
            expect($scope.editing.attrs.length).toEqual(3);
            $scope.removeAttr();
            expect($scope.editing.attrs.length).toEqual(2);
        });
    });
});
