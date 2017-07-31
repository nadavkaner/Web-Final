import angular from 'angular';
import _ from 'lodash';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME)
  .controller('main', ($scope, Auth, Poke) => {
      let currentUser = Auth.getCurrentUser();
      const allLosingPokes = Poke.query({term: currentUser.username, filter: 'userReceived'});
      const allWinningPokes = Poke.query({term: currentUser.username, filter: 'userSent'});
      $scope.visibleLosingPokes = allLosingPokes;
      $scope.visibleWinningPokes = allWinningPokes;
      $scope.losingSearchTerm = '';
      $scope.winningSearchTerm = '';

      $scope.losingSearch = () => {
        let term = $scope.losingSearchTerm;
        console.log(allLosingPokes);
        $scope.visibleLosingPokes  = allLosingPokes.filter(x => x.userSent.includes(term));
      };

      $scope.winningSearch = () => {
        let term = $scope.winningSearchTerm;
        $scope.visibleWinningPokes  = allWinningPokes.filter(x => x.userSent.includes(term));
      };

      $scope.onPoke = (poke) => {
        const updatePoke = {
          userSent: poke.userReceived,
          userReceived: poke.userSent,
          lastPokeTime: Date.now(),
          numberOfPokes: poke.numberOfPokes + 1
        };

        Poke.update({id: poke._id}, updatePoke).$promise
          .then(newPoke => {
            _.remove($scope.losingPokes , (p) => p._id === poke._id);
            $scope.winningPokes.push(newPoke);
        });
      };
    });