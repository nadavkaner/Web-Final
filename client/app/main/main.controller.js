import angular from 'angular';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME)
    .controller('main', ($scope, Auth, Poke, $mdDialog) => {
      let currentUser = Auth.getCurrentUser();
      $scope.pokes = Poke.query({term: currentUser.username, filter: 'userReceived'});
      $scope.searchTerm = '';
      $scope.filterBy = '';

      $scope.filterTypes = ['name'];

      $scope.search = () => {
        const filter = $scope.filterBy;
        let term = $scope.searchTerm;

        if (!filter) {
          term = '';
        }

        $scope.pokes = Poke.query({term, filter});
      };

      $scope.onNewPoke = (poke) => {
        const newPoke = {
          userSent: '',
          userReceived: '',
          lastPokeTime: '',
          numberOfPokes: 0
        };

        Poke.save(newPoke);
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