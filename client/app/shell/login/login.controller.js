import angular from 'angular';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME).controller('login', ($scope, Poke, $mdDialog, Auth) => {
    $scope.user = {
        username: '',
        password: ''
    };

    // console.log(Auth.index())
    $scope.login = () => {
        var loginTask = Auth.login({username: $scope.user.username, password: $scope.user.password});
        loginTask.finally(() => {
            if(Auth.getCurrentUser()){
                $mdDialog.cancel();
            } else {
                $scope.isLoginFailed = true;
                $scope.isRegisterFailed = false;
            }
        })

    };

    $scope.register = () => {
        var registerTask = Auth.create({username: $scope.user.username, password: $scope.user.password});
        registerTask.finally(() => {
            if(Auth.getCurrentUser()){
                $mdDialog.cancel();
            } else {
                $scope.isRegisterFailed = true;
                $scope.isLoginFailed = false;
            }
        })
    };

    $scope.savePost = () => {
        // $scope.post.date = new Date();

        Poke.save($scope.post).$promise
            .then(post => $mdDialog.hide(post));
    };

    $scope.closeModal = () => {
        return $mdDialog.cancel();
    };
});
