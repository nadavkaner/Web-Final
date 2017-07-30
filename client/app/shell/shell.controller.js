import angular from 'angular';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME)
    .controller('shell', ($scope, Auth, $mdDialog) => {

      // createLogoInCanvas();
      $scope.logout = () => {
        Auth.logout();
        $scope.openLogin();
      };

      $scope.getUser = () => Auth.getCurrentUser();

      // createLogoInCanvas();

      $scope.isLoggedOn = () => {
        return Auth.getCurrentUser();
      };

      $scope.isUserAdmin = () => {
        return Auth.getCurrentUser() && Auth.getCurrentUser().admin;
      };

      $scope.openLogin = () => {

        if (Auth.getCurrentUser()) return;
        $mdDialog.show({
          controller: 'login',
          templateUrl: '/app/shell/login/login.html',
          clickOutsideToClose: false,
          escapeToClose: false
        }).then(result => {
          $scope.posts.push(result);
        });
      };
      // openLogin();
    });
