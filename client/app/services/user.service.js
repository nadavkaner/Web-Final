import angular from 'angular';

angular.module('ipoke.services')
    .factory('User', $resource => $resource('/api/users/:id/:controller', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    }));