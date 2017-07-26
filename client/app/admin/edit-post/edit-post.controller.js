import angular from 'angular';

const MODULE_NAME = 'advanced.controllers';

angular.module(MODULE_NAME).controller('editPost', ($scope, Post, $mdDialog, $mdToast, post) => {
  $scope.post = {
    author: post.author,
    content: post.content,
    title: post.title
  };

  $scope.editPost = () => {
    Post.update({id: post._id}, $scope.post).$promise
            .then(result => $mdDialog.hide(result));
  };

  $scope.closeModal = () => {
    return $mdDialog.cancel();
  };
});