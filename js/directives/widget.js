robeaux.directive("widget", function(Widgets, $http, $compile) {
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

  directive.scope = {};

  directive.link = function($scope, $element, $attrs) {
    var widget = Widgets.find($attrs.name),
        tpl;

    $scope.attrs = angular.fromJson($attrs.attrs);

    if (!widget) {
      return;
    }

    if (widget.template) {
      tpl = $compile("<span>" + widget.template + "</span>")($scope);
    }

    if (widget.template_url) {
      tpl = $compile("<span>" + fetchTemplate(widget.template_url) + "</span>")($scope);
    }

    $element.append(tpl);

    if (widget.script) {
      eval(widget.script)
    }

    if (widget.script_url) {
      $http.get(widget.script_url).success(function(data) {
        eval(data);
      });
    }
  };

  return directive;
});
