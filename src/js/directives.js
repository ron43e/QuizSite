//
// add / remove 'active' to menu
app.directive('isActiveNav', ['$location', function ($location) {
  return {
    restrict: 'A',
    link: function (scope, element) {
      scope.location = $location;
      scope.$watch('location.path()', function (currentPath) {
        if ('/#' + currentPath === element[0].attributes['href'].nodeValue) {
          element.parent().addClass('active');
        } else {
          element.parent().removeClass('active');
        }
      });
    }
  };
}]);

//
// do not allow a form to submit if form is invalid
var jhSubmitDirective = {
  'jhSubmit': ['$parse', function ($parse) {
    return {
      restrict: 'A',
      require: 'form',
      link: function (scope, formElement, attributes, formController) {
        var fn = $parse(attributes.rcSubmit);
        formElement.bind('submit', function (event) {
          // if form is not valid cancel it.
          if (!formController.$valid) return false;
          scope.$apply(function () {
            fn(scope, { $event: event });
          });
        });
      }
    };
  }]
};