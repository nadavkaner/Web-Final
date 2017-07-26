import angular from 'angular';
import 'angular-moment';
import angularMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import ngMap from 'ngmap';

import advancedServices from './services';
import advancedControllers from './controllers';

import 'mdi/css/materialdesignicons.css';
import 'angular-material/angular-material.css';
import './style.less';

angular.module('advanced', [
  angularMaterial,
  uiRouter,
  ngMap,
  'angularMoment',
  'ngAnimate',
  advancedControllers,
  advancedServices
])
    .config(($urlRouterProvider, $locationProvider, $mdThemingProvider) => {
      $mdThemingProvider.theme('default')
          .primaryPalette('blue', {
            default: '500'
          })
          .warnPalette('blue-grey', {
            default: '900',
            'hue-1': '50'
          })
          .accentPalette('amber', {
            default: '400',
            'hue-1': '600'
          });

      $urlRouterProvider
          .otherwise('/');

      $locationProvider.html5Mode(true);
    })
    .run(($rootScope, $state, amMoment, Auth) => {
      $rootScope.$on('$stateChangeStart', (event, next) => {
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
