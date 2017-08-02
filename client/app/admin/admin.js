import angular from 'angular';
import './admin.controller';
import './admin.less';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME)
    .config($stateProvider => {
      $stateProvider
            .state('shell.admin', {
              url: '/admin',
              templateUrl: 'app/admin/admin.html',
              controller: 'admin'
            });
    });