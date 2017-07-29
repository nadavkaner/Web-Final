import angular from 'angular';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME)
    .controller('shell', ($scope, Auth) => {

        createLogoInCanvas();
      $scope.login = () => {
        Auth.login({username: $scope.userName, password: $scope.password});
      };

      $scope.getUser = () => Auth.getCurrentUser();

        createLogoInCanvas();

      $scope.isLoggedOn = () => {
        return Auth.getCurrentUser();
      };

      $scope.isUserAdmin = () => {
        return Auth.getCurrentUser() && Auth.getCurrentUser().admin;
      };
    });

function createLogoInCanvas() {
    const canvas = document.getElementById('logoCanvas');
    const ctx = canvas.getContext('2d');
    ctx.font = '36px Roboto';
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";
    ctx.fillText('IPoke', canvas.width / 2, 45);
    // ctx.strokeText('IPoke', canvas.height / 2, 50);
}
