import angular from 'angular';
import 'angular-moment';
import angularMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import ngMap from 'ngmap';

import services from './services';
import controllers from './controllers';

import 'mdi/css/materialdesignicons.css';
import 'angular-material/angular-material.css';
import './style.less';

angular.module('ipoke', [
  angularMaterial,
  uiRouter,
  ngMap,
  'angularMoment',
  'ngAnimate',
  controllers,
  services
])
    .config(($urlRouterProvider, $locationProvider, $mdThemingProvider) => {
      $mdThemingProvider.theme('default')
          .primaryPalette('light-blue')
          .accentPalette('orange')
          .dark();

      $urlRouterProvider
          .otherwise('/login');

      $locationProvider.html5Mode(true);
    })
    .run(($rootScope, $state, amMoment, Auth) => {
      $rootScope.$on('$stateChangeStart', (event, next) => {
        if (!Auth.getCurrentUser() && next.name !== 'login'){
          event.preventDefault();
          $state.go('login');
        }

        if (next.name === 'shell.admin') {
          const user = Auth.getCurrentUser();

          if (user && !user.admin) {
            event.preventDefault();
            $state.go('shell.main');
          }
        }
      });
      amMoment.changeLocale('en');
    });
