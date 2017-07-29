import angular from 'angular';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME)
    .controller('shell', ($scope, Auth, $mdDialog) => {

        createLogoInCanvas();
      $scope.logout = () => {
        Auth.logout();
        $scope.openLogin();
      };

      $scope.getUser = () => Auth.getCurrentUser();

        createLogoInCanvas();

      $scope.isLoggedOn = () => {
        return Auth.getCurrentUser();
      };

      $scope.isUserAdmin = () => {
        return Auth.getCurrentUser() && Auth.getCurrentUser().admin;
      };

        $scope.openLogin = () => {

            if(Auth.getCurrentUser()) return;
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

function createLogoInCanvas() {
    const canvas = document.getElementById('logoCanvas');
    const ctx = canvas.getContext('2d');
    ctx.font = '36px Roboto';
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";
    ctx.fillText('IPoke', canvas.width / 2, 45);
    // ctx.strokeText('IPoke', canvas.height / 2, 50);
}
