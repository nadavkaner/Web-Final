import angular from 'angular';
import _ from 'lodash';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME)
  .controller('main', ($scope, Auth, Poke) => {
      let {username} = Auth.getCurrentUser();
      const allLosingPokes = Poke.query({term: username, filter: 'userReceived'});
      const allWinningPokes = Poke.query({term: username, filter: 'userSent'});
      $scope.visibleLosingPokes = allLosingPokes;
      $scope.visibleWinningPokes = allWinningPokes;
      $scope.losingSearchTerm = '';
      $scope.winningSearchTerm = '';

      $scope.losingSearch = () => {
        let term = $scope.losingSearchTerm;
        $scope.visibleLosingPokes  = allLosingPokes.filter(x => x.userSent.includes(term));
      };

      $scope.winningSearch = () => {
        let term = $scope.winningSearchTerm;
        $scope.visibleWinningPokes  = allWinningPokes.filter(x => x.userSent.includes(term));
      };

      socket.on('poke', poke => {
        if (poke.userReceived === username) {
          $scope.$apply(() => {
            allLosingPokes.push(poke);
            _.remove(allWinningPokes, p => p._id === poke._id);
          });
        }
      });

      $scope.onPoke = (poke) => {
        const updatePoke = {
          userSent: poke.userReceived,
          userReceived: poke.userSent,
          lastPokeTime: Date.now(),
          numberOfPokes: poke.numberOfPokes + 1
        };

        Poke.update({id: poke._id}, updatePoke).$promise
          .then(newPoke => {
            let oldPoke = _.remove($scope.visibleLosingPokes , p => p._id === poke._id)[0];
            newPoke.userSentData = oldPoke.userReceivedData;
            newPoke.userReceivedData = oldPoke.userSentData;
            $scope.visibleWinningPokes.push(newPoke);
            socket.emit('poke', newPoke);
        });
      };
    });