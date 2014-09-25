describe("Testing Services:", function() {
    describe('Service Widgets:', function() {

        beforeEach(module('robeaux'));

        var $service, data, new_widgets;
        
        beforeEach(inject(function($injector) {
            localStorage.clear();
            $service = $injector.get('Widgets')

            jasmine.getJSONFixtures().fixturesPath='base/test/support';
            data = loadJSONFixtures('widgets.json')['widgets.json'];

            new_widgets = [{name: 'mindwave',custom: false,template_url: '/js/widgets/mindwave.html',script_url: '/js/widgets/mindwave.js',attrs: ['robot', 'device', 'event']}];

        }));

        it('should contain a Widgets service', function() {
            expect($service).not.toEqual(null);
        });

        describe('load:', function() {
            it('should initialize default and activeWidgets if nothing is on local storage', function() {
                $service.load();
                expect($service.list).toEqual(data.widgets);
                expect($service.activeWidgets).toEqual({});
                expect(localStorage['widgets']).toEqual(undefined);
                expect(localStorage['activeWidgets']).toEqual(undefined);
            });
            it('should set default and activeWidgets with local storage values', function() {
                expect(localStorage['widgets']).toEqual(undefined);
                expect(localStorage['activeWidgets']).toEqual(undefined);

                localStorage.setItem('widgets', angular.toJson(new_widgets));
                localStorage.setItem('activeWidgets', angular.toJson(new_widgets[0]));
                
                $service.load();
                expect($service.list).toEqual(new_widgets);
                expect($service.activeWidgets).toEqual(new_widgets[0]);
            });
        });

        describe('save:', function() {
            it('should save values on local storage', function() {
                expect(localStorage['widgets']).toEqual(undefined);
                expect(localStorage['activeWidgets']).toEqual(undefined);

                $service.list = new_widgets;
                $service.activeWidgets = new_widgets[0];
                
                $service.save();
                expect(localStorage['widgets']).toEqual(angular.toJson(new_widgets));
                expect(localStorage['activeWidgets']).toEqual(angular.toJson(new_widgets[0]));
            });
        });

        describe('find:', function() {
            it('should find a specific widget by name', function() {

                $service.list = new_widgets;  
                $service.save();

                expect($service.find('mindwave')).toEqual(new_widgets[0]);
            });
        });

        describe('add:', function() {
            it('should add new widget ', function() {
                $service.list = new_widgets;
                $service.save();

                expect(angular.fromJson(localStorage['widgets']).length).toEqual(1);
                expect($service.add('my-new-widget')).toEqual($service.find('my-new-widget'));
                expect(angular.fromJson(localStorage['widgets']).length).toEqual(2);
            });
        });

        describe('remove:', function() {
            it('should remove widget', function() {
                $service.list = new_widgets;
                $service.save();

                expect(angular.fromJson(localStorage['widgets']).length).toEqual(1);
                $service.remove('mindwave')
                expect(angular.fromJson(localStorage['widgets']).length).toEqual(0);
            });
        });

        describe('reset:', function() {
            it('should clear local storage widgets vars', function() {
                expect(localStorage['widgets']).toEqual(undefined);

                $service.list = new_widgets;
                $service.save();

                expect(angular.fromJson(localStorage['widgets']).length).toEqual(1);

                $service.reset();
                expect(localStorage['widgets']).toEqual(undefined);
            });
        });
    });
});
