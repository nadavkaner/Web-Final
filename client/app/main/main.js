import angular from 'angular';
import './main.controller';
import './main.less';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME)
    .config($stateProvider => {
      $stateProvider
          .state('shell.main', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'main'
          });
    });