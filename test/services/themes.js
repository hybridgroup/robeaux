describe("Testing Services:", function() {
    describe('Service Themes:', function() {

        beforeEach(module('robeaux'));

        var $service, data;
        
        beforeEach(inject(function($injector) {
            localStorage.clear();
            $service = $injector.get('Themes')

            jasmine.getJSONFixtures().fixturesPath='base/test/support';
            data = loadJSONFixtures('themes.json')['themes.json'];
        }));

        it('should contain a Themes service', function() {
            expect($service).not.toEqual(null);
        });

        describe('load:', function() {
            it('should initialize default and active if nothing is on local storage', function() {
                $service.load();
                expect($service.list).toEqual(data.themes);
                expect($service.active).toEqual(data.themes[0]);
                expect(localStorage['themes']).toEqual(undefined);
                expect(localStorage['active']).toEqual(undefined);
            });
            it('should set default and active with local storage values', function() {
                expect(localStorage['themes']).toEqual(undefined);
                expect(localStorage['active']).toEqual(undefined);

                var new_themes = [{ name: 'artoo',   custom: false, url: '/css/themes/artoo.css'}, { name: 'cylon',   custom: false, url: '/css/themes/cylon.css'}];
                localStorage.setItem('themes', angular.toJson(new_themes));
                localStorage.setItem('active', 'cylon');
                
                $service.load();
                expect($service.list).toEqual(new_themes);
                expect($service.active).toEqual(new_themes[1]);
            });
        });

        describe('save:', function() {
            it('should save values on local storage', function() {
                expect(localStorage['themes']).toEqual(undefined);
                expect(localStorage['active']).toEqual(undefined);


                var new_themes = [{ name: 'artoo',   custom: false, url: '/css/themes/artoo.css'}, { name: 'cylon',   custom: false, url: '/css/themes/cylon.css'}];
                $service.list = new_themes;
                $service.active = new_themes[1];
                
                $service.save();
                expect(localStorage['themes']).toEqual(angular.toJson(new_themes));
                expect(localStorage['active']).toEqual('cylon');
            });
        });

        describe('find:', function() {
            it('should find a specific theme by name', function() {

                var new_themes = [{ name: 'artoo',   custom: false, url: '/css/themes/artoo.css'}, { name: 'cylon',   custom: false, url: '/css/themes/cylon.css'}];
                $service.list = new_themes;  
                $service.save();

                expect($service.find('cylon')).toEqual(new_themes[1]);
            });
        });

        describe('add:', function() {
            it('should not add new theme if name already exists', function() {
                var new_themes = [{ name: 'artoo',   custom: false, url: '/css/themes/artoo.css'}, { name: 'cylon',   custom: false, url: '/css/themes/cylon.css'}];
                $service.list = new_themes;
                $service.save();

                expect(angular.fromJson(localStorage['themes']).length).toEqual(2);
                expect($service.add('cylon')).toEqual(false);
                expect(angular.fromJson(localStorage['themes']).length).toEqual(2);
            });

            it('should add new theme ', function() {
                var new_themes = [{ name: 'artoo',   custom: false, url: '/css/themes/artoo.css'}, { name: 'cylon',   custom: false, url: '/css/themes/cylon.css'}];
                $service.list = new_themes;
                $service.save();

                expect(angular.fromJson(localStorage['themes']).length).toEqual(2);
                expect($service.add('my-new-theme')).toEqual($service.find('my-new-theme'));
                expect(angular.fromJson(localStorage['themes']).length).toEqual(3);
            });
        });

        describe('remove:', function() {
            it('should remove theme', function() {
                var new_themes = [{ name: 'artoo',   custom: false, url: '/css/themes/artoo.css'}, { name: 'cylon',   custom: false, url: '/css/themes/cylon.css'}];
                $service.list = new_themes;
                $service.save();

                expect(angular.fromJson(localStorage['themes']).length).toEqual(2);
                $service.remove('artoo')
                expect(angular.fromJson(localStorage['themes']).length).toEqual(1);
            });
        });

        describe('reset:', function() {
            it('should clear local storage themes and active vars', function() {
                expect(localStorage['themes']).toEqual(undefined);
                expect(localStorage['active']).toEqual(undefined);

                var new_themes = [{ name: 'artoo',   custom: false, url: '/css/themes/artoo.css'}, { name: 'cylon',   custom: false, url: '/css/themes/cylon.css'}];
                $service.list = new_themes;
                $service.active = new_themes[1];
                $service.save();

                expect(angular.fromJson(localStorage['themes']).length).toEqual(2);
                expect(localStorage['active']).toEqual('cylon');

                $service.reset();
                expect(localStorage['themes']).toEqual(undefined);
                expect(localStorage['active']).toEqual(undefined);
            });
        });
    });
});