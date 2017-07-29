import angular from 'angular';
import './shell.controller';
import './shell.less';
import './login/login.controller';
import './login/login.less';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME)
    .config($stateProvider => {
      $stateProvider
            .state('shell', {
              abstract: true,
              templateUrl: 'app/shell/shell.html',
              controller: 'shell'
            });
    });