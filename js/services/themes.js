robeaux.factory('Themes', function() {
  var service = {};

  // default themes
  var defaults = [
    { name: 'default',    custom: false, css: '' },
    { name: 'artoo',      custom: false, url: '/css/themes/artoo.css'},
    { name: 'cylon',      custom: false, url: '/css/themes/cylon.css'},
    { name: 'gobot',      custom: false, url: '/css/themes/gobot.css'},
    { name: 'blackboard', custom: false, url: '/css/themes/blackboard.css'},
    { name: 'dark',       custom: false, url: '/css/themes/dark.css'},
    { name: 'custom',     custom: true,  css: ''}
  ];

  service.list = [];
  service.active = {};

  // loads themes from localstorage, falling back to the above default themes
  service.load = function() {
    if (localStorage['themes']) {
      this.list = angular.fromJson(localStorage['themes']);
    } else {
      this.list = defaults;
    }

    if (localStorage['active'] && this.find(localStorage['active'])) {
      this.active = this.find(localStorage['active']);
    } else {
      this.active = this.find('default');
    }
  };

  // saves themes to localstorage
  service.save = function() {
    localStorage.setItem('themes', angular.toJson(this.list));
    localStorage.setItem('active', this.active.name);
  };

  // find a specific theme by name
  service.find = function(name) {
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].name === name) { return this.list[i]; }
    }
    return false;
  };

  // add a new custom theme
  service.add = function(name) {
    if (this.find(name)) { return false; }

    var theme = {
      name: name,
      custom: true,
      css: "/* write some css for the " + name + " theme here */"
    };

    this.list.push(theme);

    this.save();

    return this.find(name);
  };

  service.remove = function(name) {
    if (this.active.name === name) {
      this.active = this.find('default');
    };

    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].name === name) {
        this.list.splice(i, 1);
      }
    }

    this.save();
  };

  // reset localStorage and reload everything from defaults.
  service.reset = function() {
    localStorage.removeItem('themes');
    localStorage.removeItem('active');
    this.load();
  }

  service.load();

  return service;
});
