import angular from 'angular';
import './main.controller';
import './main.less';
import './new-post/new-post.controller';
import './new-post/new-post.less';

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