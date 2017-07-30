import angular from 'angular';
const MODULE_NAME = 'ipoke.controllers';
angular.module(MODULE_NAME).controller('register-popup', ($scope, Poke, $mdDialog, Auth, $state) => {
    $scope.user = {
        username: '',
        password: '',
        location: ''
    };

    $scope.register = () => {
      if(!$scope.registrationForm.$valid) return;

      var registerTask = Auth.create({username: $scope.user.username, password: $scope.user.password, location: $scope.user.locationJson});
      registerTask.finally(() => {
          if(Auth.getCurrentUser()){
              $mdDialog.cancel();
              $state.go('shell.main');
          } else {
              $scope.isRegisterFailed = true;
              $scope.isLoginFailed = false;
          }
      });
    };

  $scope.openLogin = () => {
    $mdDialog.cancel();
    if(Auth.getCurrentUser()) return;
    $mdDialog.show({
      controller: 'login-popup',
      templateUrl: '/app/login/login/login-popup.html',
      clickOutsideToClose: false,
      escapeToClose: false
    }).then(result => {
      $scope.posts.push(result);
    });
  };


  $scope.closeModal = () => {
    return $mdDialog.cancel();
  };


  var placeSearch, autocomplete;
  var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

  $scope.initAutocomplete = () => {
    console.log("loaded");
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', $scope.fillInAddress);
    console.log(autocomplete);
  };

  $scope.fillInAddress = () => {
    var place = autocomplete.getPlace();
    console.log(place);
    $scope.user.locationJson = {
      locationName: place.formatted_address,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng()
    };
    console.log($scope.user.locationJson);
  };

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  $scope.geolocate = () => {
    if(!autocomplete) $scope.initAutocomplete();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }
});
