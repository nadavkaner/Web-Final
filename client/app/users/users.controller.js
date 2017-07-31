import angular from 'angular';
import _ from 'lodash';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME).controller('users', ($scope, Poke, Auth) => {
  const currentUser = Auth.getCurrentUser().username;
  const allSuggestedPokes = Poke.suggestedPokes({username: currentUser});
  $scope.suggestedPokes = allSuggestedPokes;

  $scope.searchTerm = '';

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

  $scope.search = () => {
    let term = $scope.searchTerm;
    $scope.suggestedPokes  = allSuggestedPokes.filter(x => x.username.includes(term));
  };
});