robeaux.directive("widget", function(Widgets, $http) {
  var directive = {};

  var fetchTemplate = function(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);

    if (request.status === 200) {
      return request.responseText;
    }
  };

  directive.restrict = "E";

  directive.template = function(elem, attrs) {
    var widget = Widgets.find(attrs.name);
    if (!widget) {
      return;
    }

    if (widget.template) {
      return widget.template;
    }

    if (widget.template_url) {
      return fetchTemplate(widget.template_url);
    }
  };

  directive.link = function(scope, element, attrs) {
    var widget = Widgets.find(attrs.name);
    if (!widget) {
      return;
    }

    if (widget.script) {
      return eval(widget.script)
    }

    if (widget.script_url) {
      $http.get(widget.script_url).success(function(data) {
        return eval(data);
      });
    }
  };

  return directive;
});
