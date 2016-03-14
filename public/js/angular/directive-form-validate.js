// 说明：
// 1. 该文件中只允许定义表单验证相关的指令
// 2. 指令名称请均以fv (form validate) 开头驼峰定义，例：fvMobileNo

(function () {
  
  var main = angular.module('main');

  main.directive('fvMobileNo', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, elem, attrs, ngModel) {
        scope.$watch(attrs.ngModel, function (newVal, oldVal, scope) {
          ngModel.$setValidity('fvMobileNo', RegExp.mobileNo.test(newVal));
        });
      }
    };
  });

  main.directive('fvSigninPwd', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, elem, attrs, ngModel) {
        scope.$watch(attrs.ngModel, function (newVal, oldVal, scope) {
          ngModel.$setValidity('fvSigninPwd', RegExp.signinPwd.test(newVal));
        });
      }
    };
  });

  main.directive('fvEq', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, elem, attrs, ngModel) {
        scope.$watch(attrs.ngModel, function (newVal, oldVal, scope) {
          ngModel.$setValidity('fvEq', newVal === $(attrs.fvEq).val());
        });
        $(attrs.fvEq).keyup(function (event) {
          var _this = $(this);
          scope.$apply(function () {
            ngModel.$setValidity('fvEq', _this.val() === ngModel.$modelValue);
          });
        });
      }
    };
  });

  main.directive('fvInexistentMobileNo', [ '$http', function ($http) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, elem, attrs, ngModel) {
        scope.$watch(attrs.ngModel, function (newVal, oldVal, scope) {
          if (RegExp.mobileNo.test(newVal)) {
            $http({
              method: 'post',
              url: '/front/user/findOne',
              data: { conditions: { mobileNo: newVal } }
            })
            .success(function (ri) {
              ngModel.$setValidity('fvInexistentMobileNo', ri.code === -1);
            })
            .error(function () {
              ngModel.$setValidity('fvInexistentMobileNo', false);
            });
          }
        });
      }
    };
  }]);

  main.directive('fvExistedMobileNo', [ '$http', function ($http) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, elem, attrs, ngModel) {
        scope.$watch(attrs.ngModel, function (newVal, oldVal, scope) {
          if (RegExp.mobileNo.test(newVal)) {
            $http({
              method: 'post',
              url: '/front/user/findOne',
              data: { conditions: { mobileNo: newVal } }
            })
            .success(function (ri) {
              ngModel.$setValidity('fvExistedMobileNo', ri.code === 1);
            })
            .error(function () {
              ngModel.$setValidity('fvExistedMobileNo', false);
            });
          }
        });
      }
    };
  }]);

})();
