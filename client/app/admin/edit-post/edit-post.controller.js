import angular from 'angular';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME).controller('editPost', ($scope, Poke, $mdDialog, $mdToast, post) => {
  $scope.post = {
    author: post.author,
    content: post.content,
    title: post.title
  };

  $scope.editPost = () => {
    Poke.update({id: post._id}, $scope.post).$promise
            .then(result => $mdDialog.hide(result));
  };

  $scope.closeModal = () => {
    return $mdDialog.cancel();
  };
});