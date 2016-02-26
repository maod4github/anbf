
(function () {

  var i18nConf = {
    chinese: {
      front: {
        common: { n0: '抱歉，系统繁忙，请稍后重试。' },
        head: { n0: '首页', n1: '用户列表', n2: '登录', n3: '注册', n4: '语言', n5: '中文', n6: '英文' },
        home: { n0: '您好，欢迎光临NABF。', n1: '欢迎成为我们的会员 ^_^!', n2: '立即注册' },
        foot: { n0: '友情链接' },
        signup: {
          n0: '手机号码', n1: '请填写手机号码', n2: '请填写有效的手机号码', n3: '该手机号码已存在',
          n4: '登录密码', n5: '请填写登录密码', n6: '登录密码长度为6~16个字符',
          n7: '确认密码', n8: '请确认密码', n9: '密码不一致',
          n10: '提交', n11:'有账号了？去登录吧。 ^_^!', n12: '登录',
          n13: '注册失败'
        },
        signin: {
          n0: '手机号码', n1: '请填写手机号码', n2: '请填写有效的手机号码', n3: '该手机号码不存在',
          n4: '登录密码', n5: '请填写登录密码', n6: '登录密码长度为6~16个字符',
          n7: '登录', n8: '没有账号？去注册一个呗。 ^_^!', n9: '注册',
          n10: '登录失败'
        },
        userList: {}
      }
    },
    english: {
      front: {
        common: { n0: 'Sorry, System very busy, Please retry a little later.' },
        head: { n0: 'Home', n1: 'User list', n2: 'signin', n3: 'signup', n4: 'Language', n5: 'Chinese', n6: 'English' },
        home: { n0: 'Hello, Welcome NABF.', n1: 'Welcome become our VIP ^_^!', n2: 'Signup now' },
        foot: { n0: 'Friendship link' },
        signup: {
          n0: 'Mobile no', n1: 'Please input mobile no', n2: 'Please input valid mobile no', n3: 'The mobile no already exists',
          n4: 'Signin password', n5: 'Please input signin password', n6: 'Signin password range is 6~16 chars',
          n7: 'Confirm password', n8: 'Please confirm password', n9: 'Password are not consistent',
          n10: 'Submit', n11:'Have account? let\'s go signin. ^_^!', n12: 'Signin',
          n13: 'Signup failure'
        },
        signin: {
          n0: 'Mobile no', n1: 'Please input mobile no', n2: 'Please input valid mobile no', n3: 'The mobile no inexistent',
          n4: 'Signin password', n5: 'Please input signin password', n6: 'Signin password range is 6~16 chars',
          n7: 'Signin', n8: 'No account? let\'s go signup. ^_^!', n9: 'Signup',
          n10: 'Signin failure'
        },
        userList: {}
      }
    }
  };
    
  var main = angular.module('main', [ 'ui.router' ]);

  main.run([ '$rootScope', '$window', function ($rootScope, $window) {
    if (!$window.localStorage.language) {
      $window.localStorage.language = 'chinese';
    }
    $rootScope.i18n = i18nConf[$window.localStorage.language];
    $rootScope.changeLanguage = function (language) {
      $window.localStorage.language = language;
      $rootScope.i18n = i18nConf[language];
    };
  }]);

  main.config([ '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider.state('main', {
      views: {
        'main': {
          templateUrl: '/tpl/main.html'
        }
      }
    }).state('main.front', {
      views: {
        'head@main': {
          templateUrl: '/tpl/front/head.html'
        },
        'foot@main': {
          templateUrl: '/tpl/front/foot.html'
        }
      }
    }).state('main.front.home', {
      url: '/home',
      views: {
        'body@main': {
          templateUrl: '/tpl/front/home.html',
          controller: [ '$rootScope', function ($rootScope) {
            $rootScope.curNavitem = 'Home';
          }]
        }
      }
    }).state('main.front.userList', {
      url: '/user-list',
      views: {
        'body@main': {
          templateUrl: '/tpl/front/user-list.html',
          controller: [ '$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
            $rootScope.curNavitem = 'User list';
            $http({
              method: 'post',
              url: '/front/user/find',
              data: { conditions: {} }
            }).success(function (ri) {
              if (ri.code < 1) {
                $window.alert($rootScope.i18n.front.common.n0);
                return;
              }
              $scope.users = ri.data.users;
            }).error(function () {
              $window.alert($rootScope.i18n.front.common.n0);
            });
          }]
        }
      }
    }).state('main.front.signup', {
      url: '/signup',
      views: {
        'body@main': {
          templateUrl: '/tpl/front/signup.html',
          controller: [ '$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
            $rootScope.curNavitem = '';
            $scope.signup = function (valid) {
              if (valid) {
                $http({
                  method: 'post',
                  url: '/front/user/save',
                  data: { user: $scope.user }
                }).success(function (ri) {
                  if (ri.code === -9999) {
                    $window.alert($rootScope.i18n.front.common.n0);
                    return;
                  }
                  if (ri.code < 1) {
                    $window.alert($rootScope.i18n.front.signup.n13);
                    return;
                  }
                  $window.location.href = '#/user-list';
                }).error(function () {
                  $window.alert($rootScope.i18n.front.common.n0);
                });
              }
            };
          }]
        }
      }
    }).state('main.front.signin', {
      url: '/signin',
      views: {
        'body@main': {
          templateUrl: '/tpl/front/signin.html',
          controller: [ '$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
            $rootScope.curNavitem = '';
            $scope.signin = function (valid) {
              if (valid) {
                $http({
                  method: 'post',
                  url: '/front/user/findOne',
                  data: { conditions: $scope.user }
                }).success(function (ri) {
                  if (ri.code === -9999) {
                    $window.alert($rootScope.i18n.front.common.n0);
                    return;
                  }
                  if (ri.code < 1) {
                    $window.alert($rootScope.i18n.front.signin.n10);
                    return;
                  }
                  $window.location.href = '#/home';
                }).error(function () {
                  $window.alert($rootScope.i18n.front.common.n0);
                });
              }
            };
          }]
        }
      }
    });
  }]);

})();
