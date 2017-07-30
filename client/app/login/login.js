import angular from 'angular';
import './login.controller';
import './login.less';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME)
  .config($stateProvider => {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'login'
      });
  });