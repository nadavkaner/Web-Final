import angular from 'angular';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME).controller('users', ($scope, User) => {
  $scope.users = User.query();
  console.log($scope.users);
  $scope.searchTerm = '';
  $scope.filterBy = '';

  $scope.filterTypes = ['username', 'content', 'genre'];

  $scope.search = () => {
    const filter = $scope.filterBy;
    let term = $scope.searchTerm;

    if (!filter) {
      term = '';
    }

    $scope.users = User.query({term, filter});
  };
});