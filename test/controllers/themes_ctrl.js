describe("Testing Controllers", function() {
    describe('Controller ThemesCtrl:', function() {
        
        beforeEach(module('robeaux'));
        
        var $scope, $rootScope, $httpBackend, $timeout, $routeParams, testController, data;
        
        beforeEach(inject(function($injector) {
            localStorage.clear();
            $timeout = $injector.get('$timeout');
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            $routeParams = $injector.get('$routeParams');
            $scope = $rootScope.$new();
            $scope.themes = $injector.get('Themes')

            var $controller = $injector.get('$controller');

            testController = function() {
                return $controller('ThemesCtrl', {
                    '$scope': $scope

                });
            };
            var controller = testController();
            jasmine.getJSONFixtures().fixturesPath='base/test/support';
            data = loadJSONFixtures('themes.json')['themes.json'];

        }));

        afterEach(function() {
            $scope.themes = null;
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should get array of themes', function() {
            expect($scope.themes.list).toEqual(data.themes);
        });

        describe('add:', function() {
            it('should not add theme with empty name', function() {
                expect($scope.themes.list.length).toEqual(5);
                $scope.add('');
                expect($scope.themes.list.length).toEqual(5);
                $scope.add();
                expect($scope.themes.list.length).toEqual(5);
            });

            it('should not add theme if name already exist', function() {
                expect($scope.themes.list.length).toEqual(5);
                $scope.add('artoo');
                expect($scope.themes.list.length).toEqual(5);
            });

            it('should add theme', function() {
                expect($scope.themes.list.length).toEqual(5);
                $scope.add('first theme');
                expect($scope.themes.list.length).toEqual(6);
            });

            it('should add theme and put it on edit mode', function() {
                expect($scope.editing).toEqual(null);
                $scope.add('second theme');
                expect($scope.editing.name).toEqual('second theme');
            });
        });

        describe('edit:', function() {
            it('should not set theme on edit mode if is not a custom theme', function() {
                expect($scope.editing).toEqual(null);
                $scope.edit(data.themes[0].name)
                expect($scope.editing).toEqual(null);
            });

            it('should not set theme on edit mode if theme is already being edited', function() {
                expect($scope.editing).toEqual(null);
                $scope.add('third theme')
                expect($scope.editing.name).toEqual('third theme');

                $scope.edit('third theme');
                expect($scope.editing).toEqual(null);
            });
        });

        describe('remove:', function() {
            it('should remove theme', function() {
                expect($scope.themes.list.length).toEqual(5);
                $scope.remove('artoo');
                expect($scope.themes.list.length).toEqual(4);
            });
        });
        

    });
});
