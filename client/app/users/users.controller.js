import angular from 'angular';
import _ from 'lodash';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME).controller('users', ($scope, Poke, Auth) => {
  const {username} = Auth.getCurrentUser();
  const allSuggestedPokes = Poke.suggestedPokes({username});
  $scope.suggestedPokes = allSuggestedPokes;

  $scope.searchTerm = '';

  $scope.onPoke = (user) => {
    Poke.save({
      'userSent': username,
      'userReceived': user.username,
      'lastPokeTime': Date.now(),
      'numberOfPokes': 1
    }).$promise.then(newPoke => {
      console.log('new poke: ' + newPoke._id + ' user: ' + newPoke.userReceived);
      _.remove(allSuggestedPokes, u => u._id === user._id);
      newPoke.userSentData = Auth.getCurrentUser();
      newPoke.userReceivedData = user;
      socket.emit('poke', newPoke);
    });
  };

  socket.on('poke', poke => {
    console.log('poke received: ' + poke.userSent);
    $scope.$apply(() => {
      _.remove(allSuggestedPokes, u => u.username === poke.userSent);
    });
  });

  $scope.search = () => {
    let term = $scope.searchTerm;
    $scope.suggestedPokes  = allSuggestedPokes.filter(x => x.username.includes(term));
  };
});