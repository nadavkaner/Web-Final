import angular from 'angular';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME)
  .controller('shell', ($scope, $state, Auth) => {
    $scope.logout = () => {
      Auth.logout();
      $state.go('login');
    };

    $scope.getUser = () => Auth.getCurrentUser();

    $scope.isLoggedOn = () => {
      return Auth.getCurrentUser();
    };

    $scope.isUserAdmin = () => {
      return Auth.getCurrentUser() && Auth.getCurrentUser().admin;
    };
  });
