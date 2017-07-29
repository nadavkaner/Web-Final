import angular from 'angular';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME).controller('main', ($scope, Poke, $mdDialog) => {
  $scope.pokes = Poke.query();
  console.log($scope.pokes)
  $scope.searchTerm = '';
  $scope.filterBy = '';

  $scope.filterTypes = ['author', 'content', 'genre'];

  $scope.search = () => {
    const filter = $scope.filterBy;
    let term = $scope.searchTerm;

    if (!filter) {
      term = '';
    }

    $scope.pokes = Poke.query({term, filter});
  };

  $scope.openNewPostModal = () => {
    $mdDialog.show({
      controller: 'newPost',
      templateUrl: '/app/main/new-post/new-post.html',
      clickOutsideToClose: false
    }).then(result => {
      $scope.pokes.push(result);
    });
  };
});