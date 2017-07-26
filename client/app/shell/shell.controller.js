import angular from 'angular';

const MODULE_NAME = 'advanced.controllers';

angular.module(MODULE_NAME)
    .controller('shell', ($scope, Auth) => {
      $scope.login = () => {
        Auth.login({username: $scope.userName, password: $scope.password});
      };

      $scope.getUser = () => Auth.getCurrentUser();

      $scope.isLoggedOn = () => {
        return Auth.getCurrentUser();
      };

      $scope.isUserAdmin = () => {
        return Auth.getCurrentUser() && Auth.getCurrentUser().admin;
      };
    });
