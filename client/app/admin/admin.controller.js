import angular from 'angular';
import _ from 'lodash';

const MODULE_NAME = 'advanced.controllers';

angular.module(MODULE_NAME).controller('admin', ($scope, Post, $mdDialog, $mdToast) => {
  $scope.posts = Post.query();

  $scope.searchTerm = '';
  $scope.filterBy = '';

  $scope.filterTypes = ['author', 'content', 'genre'];

  $scope.search = () => {
    const filter = $scope.filterBy;
    let term = $scope.searchTerm;

    if (!filter) {
      term = '';
    }

    $scope.posts = Post.query({term, filter});
  };

  $scope.editPost = post => {
    $mdDialog.show({
      controller: 'editPost',
      templateUrl: '/app/admin/edit-post/edit-post.html',
      clickOutsideToClose: false,
      locals: {
        post
      }
    })
            .then(result => {
              $scope.posts = _.map($scope.posts, p => {
                if (p._id !== result._id) {
                  return p;
                }

                return result;
              });
            })
            .then(() => {
              return $mdToast.show(
                    $mdToast.simple()
                        .textContent('Post updated!')
                        .position('bottom left')
                        .hideDelay(3000)
                );
            });
  };

  $scope.deletePost = post => {
    Post.delete({id: post._id}).$promise.then(() => {
      $scope.posts = _.filter($scope.posts, p => p._id !== post._id);

      return $mdToast.show(
                $mdToast.simple()
                    .textContent('Post deleted!')
                    .position('bottom left')
                    .hideDelay(3000)
            );
    });
  };
});