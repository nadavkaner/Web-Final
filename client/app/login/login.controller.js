import angular from 'angular';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME).controller('login', ($scope, Poke, $state, $mdDialog, Auth) => {
  $scope.user = {
    username: '',
    password: ''
  };

  $scope.openLogin = () => {
    if(Auth.getCurrentUser()) return;
    $mdDialog.show({
      controller: 'login-popup',
      templateUrl: '/app/login/login/login-popup.html',
      clickOutsideToClose: false,
      escapeToClose: false
    });
  };
});
