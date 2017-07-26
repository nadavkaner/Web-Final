import angular from 'angular';
import './statistics.controller';
import './statistics.less';

const MODULE_NAME = 'advanced.controllers';

angular.module(MODULE_NAME)
    .config($stateProvider => {
      $stateProvider
            .state('shell.statistics', {
              templateUrl: 'app/statistics/statistics.html',
              controller: 'statistics'
            });
    });