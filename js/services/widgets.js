robeaux.factory('Widgets', function() {
  var service = {};

  var defaults = [
    {
      name: 'mindwave',
      custom: false,
      template_url: '/js/widgets/mindwave.html',
      script_url: '/js/widgets/mindwave.js',
      attrs: ['robot', 'device', 'event']
    },
    {
      name: 'attitude',
      custom: false,
      template_url: '/js/widgets/attitude.html',
      script_url: '/js/widgets/attitude.js',
      attrs: ['robot', 'device', 'event']
    }
  ];

  service.list = [];

  service.load = function() {
    if (localStorage['widgets']) {
      this.list = angular.fromJson(localStorage['widgets']);
    } else {
      this.list = defaults;
    }

    if (localStorage['activeWidgets']) {
      this.activeWidgets = angular.fromJson(localStorage['activeWidgets']);
    } else {
      this.activeWidgets = {};
    }
  };

  service.find = function(name) {
    var match;

    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].name === name) {
        match = this.list[i];
      }
    }

    return match;
  };

  service.save = function() {
    localStorage.setItem('widgets', angular.toJson(this.list));
    localStorage.setItem('activeWidgets', angular.toJson(this.activeWidgets));
  };

  service.add = function(name) {
    var widget = {
      name: name,
      template: "",
      script: "",
      attrs: [],
      custom: true
    };

    this.list.push(widget);
    this.save();
    return this.list[this.list.length - 1];
  };

  service.remove = function(name) {
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].name === name) {
        this.list.splice(i, 1);
      }
    }

    this.save();
  };

  service.reset = function() {
    localStorage.removeItem('widgets');
    this.load();
  }

  service.load();

  return service;
});
