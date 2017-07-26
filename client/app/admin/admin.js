import angular from 'angular';
import './admin.controller';
import './admin.less';
import './edit-post/edit-post.controller';
import './edit-post/edit-post.less';

const MODULE_NAME = 'advanced.controllers';

angular.module(MODULE_NAME)
    .config($stateProvider => {
      $stateProvider
            .state('shell.admin', {
              url: '/admin',
              templateUrl: 'app/admin/admin.html',
              controller: 'admin'
            });
    });