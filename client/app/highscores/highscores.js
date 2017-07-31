import angular from 'angular';
import './highscores.controller';
import './highscores.less';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME)
    .config($stateProvider => {
      $stateProvider
            .state('shell.highscores', {
              templateUrl: 'app/highscores/highscores.html',
              controller: 'highscores'
            });
    });