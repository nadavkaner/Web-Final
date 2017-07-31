import angular from 'angular';
import _ from 'lodash';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME).controller('users', ($scope, Poke, Auth) => {
  const currentUser = Auth.getCurrentUser().username;
  $scope.suggestedPokes = Poke.suggestedPokes({username: currentUser});

  $scope.searchTerm = '';
  $scope.filterBy = '';

  $scope.filterTypes = ['username'];

  $scope.onPoke = (user) => {
    Poke.save({
      'userSent': currentUser,
      'userReceived': user.username,
      'lastPokeTime': Date.now(),
      'numberOfPokes': 1
    }).$promise.then(() => {
      _.remove($scope.suggestedPokes, u => u._id === user._id);
    });
  };

  // $scope.search = () => {
  //   const filter = $scope.filterBy;
  //   let term = $scope.searchTerm;
  //
  //   if (!filter) {
  //     term = '';
  //   }
  //
  //   $scope.users = User.query({term, filter});
  // };
});