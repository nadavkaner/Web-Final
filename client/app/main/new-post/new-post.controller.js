import angular from 'angular';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME).controller('newPost', ($scope, Poke, $mdDialog) => {
  $scope.post = {
    content: '',
    title: '',
    author: '',
    genre: ''
  };

  $scope.savePost = () => {
    $scope.post.date = new Date();

    Poke.save($scope.post).$promise
            .then(post => $mdDialog.hide(post));
  };

  $scope.closeModal = () => {
    return $mdDialog.cancel();
  };
});