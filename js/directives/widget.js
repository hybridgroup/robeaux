robeaux.directive("widget", function(Widgets) {
  var directive = {};

  directive.restrict = "E";

  directive.template = function(elem, attrs) {
    var widget = Widgets.find(attrs.name);
    if (widget) {
      return widget.template;
    }
  };

  directive.link = function(scope, element, attrs) {
    var widget = Widgets.find(attrs.name);
    if (widget) {
      return eval(widget.script)
    }
  };

  return directive;
});
