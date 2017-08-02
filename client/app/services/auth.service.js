import angular from 'angular';

angular.module('ipoke.services')
    .factory('Auth', (User, $http) => {
      let currentUser = null;

      return {
        index()
        {
            return $http.get('/api/users')
        },
        create({username, password, location})
        {
            return $http.post('/api/users', {username, password, location})
                .then(response => {
                    console.log(response);
                    localStorage.setItem('token', response.data);
                    return User.get({id: response.data}).$promise
                      .then(user => currentUser = user);
                });
        },
        login({username, password}) {
          return $http.post('/api/users/login', {username, password})
              .then(response => {
                localStorage.setItem('token', response.data._id);
                currentUser = response.data;

                return response;
              });
        },
        getCurrentUser() {
          return currentUser;
        },
        logout(){
            currentUser = null;
        }
      };
    });