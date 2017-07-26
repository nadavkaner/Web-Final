import angular from 'angular';

angular.module('advanced.services')
    .factory('Auth', (User, $http) => {
      let currentUser = null;

      return {
        login ({username, password}) {
          return $http.post('/api/users/login', {username, password})
                    .then(response => {
                      console.log(response);
                      localStorage.setItem('token', response.data);
                      currentUser = User.get({id: response.data});

                      return response;
                    });
        },
        getCurrentUser () {
          return currentUser;
        }
      };
    });