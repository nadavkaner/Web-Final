import angular from 'angular';
import './users.controller';
import './users.less';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME)
    .config($stateProvider => {
      $stateProvider
          .state('shell.users', {
            url: '/',
            templateUrl: 'app/users/users.html',
            controller: 'users'
          });
    });