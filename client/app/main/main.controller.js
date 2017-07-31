import angular from 'angular';
import _ from 'lodash';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME)
  .controller('main', ($scope, Auth, Poke) => {
      let currentUser = Auth.getCurrentUser();
      $scope.losingPokes = Poke.query({term: currentUser.username, filter: 'userReceived'});
      console.log($scope.losingPokes);
      $scope.winningPokes = Poke.query({term: currentUser.username, filter: 'userSent'});
      $scope.searchTerm = '';
      $scope.filterBy = '';

      $scope.filterTypes = ['Name'];

      $scope.search = () => {
        const filter = $scope.filterBy.toLowerCase();
        let term = $scope.searchTerm;

        if (!filter) {
          term = '';
        }

        $scope.losingPokes  = Poke.query({term, filter});
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