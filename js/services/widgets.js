robeaux.factory('Widgets', function() {
  var service = {};

  var defaults = [
    {
      name: 'mindwave',
      custom: false,
      template_url: '/js/widgets/mindwave.html',
      script_url: '/js/widgets/mindwave.js',
    },
    {
      name: 'attitude',
      custom: false,
      template_url: '/js/widgets/attitude.html',
      script_url: '/js/widgets/attitude.js',
    }
  ];

  service.list = [];

  service.load = function() {
    if (localStorage['widgets']) {
      this.list = angular.fromJson(localStorage['widgets']);
    } else {
      this.list = defaults;
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
  };

  service.add = function(name) {
    var widget = {
      name: name,
      template: "",
      script: "",
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
