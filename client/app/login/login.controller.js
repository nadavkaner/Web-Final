import angular from 'angular';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME).controller('login', ($scope, Poke, $state, $mdDialog, Auth) => {
  $scope.user = {
    username: '',
    password: ''
  };

  $scope.login = () => {
    const loginTask = Auth.login({username: $scope.user.username, password: $scope.user.password})
    loginTask.finally(() => {
        if (Auth.getCurrentUser()) {
          $state.go('shell.main');
        } else {
          $scope.isLoginFailed = true;
          $scope.isRegisterFailed = false;
        }
      })
  };

  $scope.register = () => {
    const registerTask = Auth.create({username: $scope.user.username, password: $scope.user.password}).$promise
    registerTask.finally(() => {
        if (Auth.getCurrentUser()) {
          $mdDialog.cancel();
        } else {
          $scope.isRegisterFailed = true;
          $scope.isLoginFailed = false;
        }
      })
  };
});
