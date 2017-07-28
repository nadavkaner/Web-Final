import angular from 'angular';
import './about.controller';
import './about.less';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME)
    .config($stateProvider => {
      $stateProvider
            .state('shell.about', {
              url: '/about',
              templateUrl: 'app/about/about.html',
              controller: 'about'
            });
    });