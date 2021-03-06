import angular from 'angular';

angular.module('ipoke.services')
    .factory('Poke', $resource => $resource('/api/pokes/:id/:controller', {
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
      suggestedPokes: {
        method: 'GET',
        params: {
          controller: 'suggestedPokes'
        },
        isArray: true
      }
    }));