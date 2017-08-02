import angular from 'angular';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME).controller('login-popup', ($scope, Poke, $mdDialog, Auth, $state) => {
    $scope.user = {
        username: '',
        password: ''
    };

    $scope.login = () => {
        var loginTask = Auth.login({username: $scope.user.username, password: $scope.user.password});
        loginTask.finally(() => {
            if(Auth.getCurrentUser()){
              $mdDialog.cancel();
              $state.go('shell.main');
            } else {
                $scope.isLoginFailed = true;
                $scope.isRegisterFailed = false;
            }
        })

    };

    $scope.openRegister = () => {
      console.log("open register");
      $mdDialog.cancel();
      if(Auth.getCurrentUser()) return;
      $mdDialog.show({
        controller: 'register-popup',
        templateUrl: '/app/login/register/register-popup.html',
        clickOutsideToClose: false,
        escapeToClose: false
      });
    };

    $scope.closeModal = () => {
        return $mdDialog.cancel();
    };
});
