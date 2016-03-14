
(function () {

  var errMsg = '抱歉，系统繁忙，请稍后重试。';

  var main = angular.module('main', [ 'ui.router' ]);

  main.run([ function () {
    console.log('运行且仅运行一次');
  }]);

  main.config([ '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .when(/^\/reg$/i, '/signup')
      .when(/^\/register$/i, '/signup')
      .when(/^\/login$/i, '/signin')
      .otherwise('/home');
    $stateProvider
      .state('main', {
        resolve: {
          loadSession: [ '$rootScope', '$http', function ($rootScope, $http) {
            return $http({
              method: 'get',
              url: '/front/user/getSession'
            })
            .success(function (ri) {
              if (ri.code < 1) {
                $window.alert(ri.msg);
                return;
              }
              $rootScope.session = ri.data.session;
            })
            .error(function () {
              $window.alert(errMsg);
            });
          }]
        },
        onEnter: [ '$rootScope', '$state', function ($rootScope, $state) {
          $rootScope.refresh = function () {
            if ($state.current.name === '') {
              $state.go('main.front.home');
              return;
            }
            $state.reload();
          };
        }],
        views: {
          'main': {
            templateUrl: '/tpl/main.html'
          }
        }
      })
      .state('main.front', {
        views: {
          'head@main': {
            templateUrl: '/tpl/front/head.html',
            controller: [ '$scope', '$rootScope', '$http', '$state', '$window', function ($scope, $rootScope, $http, $state, $window) {
              $scope.signout = function () {
                $http({
                  method: 'post',
                  url: '/front/user/signout'
                })
                .success(function (ri) {
                  if (ri.code < 1) {
                    $window.alert(ri.msg);
                    return;
                  }
                  delete $rootScope.session.user;
                  $state.go('main.front.home');
                })
                .error(function () {
                  $window.alert(errMsg);
                });
              };
            }]
          },
          'foot@main': {
            templateUrl: '/tpl/front/foot.html'
          }
        }
      })
      .state('main.front.home', {
        url: '/home',
        views: {
          'body@main': {
            templateUrl: '/tpl/front/home.html',
            controller: [ '$rootScope', function ($rootScope) {
              $rootScope.curNavitem = 'Home';
            }]
          }
        }
      })
      .state('main.front.userList', {
        url: '/userlist',
        onEnter: [ '$rootScope', '$state', function ($rootScope, $state) {
          if (!$rootScope.session.user) {
            $state.go('main.front.signin');
          }
        }],
        views: {
          'body@main': {
            templateUrl: '/tpl/front/user-list.html',
            controller: [ '$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
              $rootScope.curNavitem = 'User list';
              $http({
                method: 'post',
                url: '/front/user/find',
                data: { conditions: {} }
              })
              .success(function (ri) {
                if (ri.code < 1) {
                  $window.alert(errMsg);
                  return;
                }
                $scope.users = ri.data.users;
              })
              .error(function () {
                $window.alert(errMsg);
              });
            }]
          }
        }
      })
      .state('main.front.signup', {
        url: '/signup',
        onEnter: [ '$rootScope', function ($rootScope) {
          if ($rootScope.session.user) {
            $rootScope.refresh();
          }
        }],
        views: {
          'body@main': {
            templateUrl: '/tpl/front/signup.html',
            controller: [ '$scope', '$rootScope', '$http', '$window', '$state', function ($scope, $rootScope, $http, $window, $state) {
              $rootScope.curNavitem = '';
              $scope.signup = function (valid) {
                if (valid) {
                  $http({
                    method: 'post',
                    url: '/front/user/signup',
                    data: { user: $scope.user }
                  })
                  .success(function (ri) {
                    if (ri.code === -9999) {
                      $window.alert(errMsg);
                      return;
                    }
                    if (ri.code < 1) {
                      $window.alert('注册失败');
                      return;
                    }
                    $rootScope.session.user = ri.data.user;
                    $state.go('main.front.home');
                  })
                  .error(function () {
                    $window.alert(errMsg);
                  });
                }
              };
            }]
          }
        }
      })
      .state('main.front.signin', {
        url: '/signin',
        onEnter: [ '$rootScope', function ($rootScope) {
          if ($rootScope.session.user) {
            $rootScope.refresh();
          }
        }],
        views: {
          'body@main': {
            templateUrl: '/tpl/front/signin.html',
            controller: [ '$scope', '$rootScope', '$http', '$window', '$state', function ($scope, $rootScope, $http, $window, $state) {
              $rootScope.curNavitem = '';
              $scope.signin = function (valid) {
                if (valid) {
                  $http({
                    method: 'post',
                    url: '/front/user/signin',
                    data: { conditions: $scope.user }
                  })
                  .success(function (ri) {
                    if (ri.code === -9999) {
                      $window.alert(errMsg);
                      return;
                    }
                    if (ri.code < 1) {
                      $window.alert('登录失败');
                      return;
                    }
                    $rootScope.session.user = ri.data.user;
                    $state.go('main.front.home');
                  })
                  .error(function () {
                    $window.alert(errMsg);
                  });
                }
              };
            }]
          }
        }
      });
  }]);

})();
