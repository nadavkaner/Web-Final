import angular from 'angular';

angular.module('advanced.services')
    .factory('Post', $resource => $resource('/api/posts/:id/:controller', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      group: {
        method: 'GET',
        params: {
          controller: 'group'
        },
        isArray: true
      },
      author: {
        method: 'GET',
        params: {
          controller: 'author'
        },
        isArray: true
      }
    }));