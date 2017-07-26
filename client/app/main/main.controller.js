import angular from 'angular';

const MODULE_NAME = 'advanced.controllers';

angular.module(MODULE_NAME).controller('main', ($scope, Post, $mdDialog) => {
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

  $scope.openNewPostModal = () => {
    $mdDialog.show({
      controller: 'newPost',
      templateUrl: '/app/main/new-post/new-post.html',
      clickOutsideToClose: false
    }).then(result => {
      $scope.posts.push(result);
    });
  };
});