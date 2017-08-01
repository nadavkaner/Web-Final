import angular from 'angular';
import _ from 'lodash';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME).controller('admin', ($scope, User, $mdDialog, $mdToast) => {
  const allUsers = User.query();

  $scope.users = allUsers;

  $scope.searchTerm = '';
  $scope.filterBy = '';

  $scope.filterTypes = ['Name', 'Reaction Time', 'Pokes No.'];

  const filterMap = ['username', 'avgReactionTime', 'numberOfPokes'];

  $scope.search = () => {
    let filter = $scope.filterBy;
    let term = $scope.searchTerm;

    if (!filter) {
      term = '';
      $scope.users = allUsers;
    }
    else {
      filter = filterMap[$scope.filterTypes.indexOf($scope.filterBy)];
      $scope.users = allUsers.filter(x => x[filter].toString().includes(term));
    }
  };

  $scope.deleteUser = user => {
    User.delete({id: user._id}).$promise.then(() => {
      $scope.users = _.filter($scope.users, u => u._id !== user._id);

      return $mdToast.show(
        $mdToast.simple()
          .textContent('User deleted!')
          .position('bottom left')
          .hideDelay(3000)
      );
    });
  };
});