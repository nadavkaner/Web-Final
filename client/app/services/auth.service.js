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
                    console.log("register");
                    console.log(response);
                    localStorage.setItem('token', response.data);
                    currentUser = User.get({id: response.data});

                    return response;
                });
        },
        login({username, password}) {
          return $http.post('/api/users/login', {username, password})
              .then(response => {
                console.log("login");
                console.log(response);
                localStorage.setItem('token', response.data);
                currentUser = User.get({id: response.data});

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