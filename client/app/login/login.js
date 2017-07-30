import angular from 'angular';
import './login.controller';
import './login.less';
import './login/login-popup.controller'
import './login/login-popup.less'
import './register/register-popup.controller'
import './register/register-popup.less'

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