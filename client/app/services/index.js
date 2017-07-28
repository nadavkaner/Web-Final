import angular from 'angular';
import angularResource from 'angular-resource';

const MODULE_NAME = 'ipoke.services';

angular.module(MODULE_NAME, [angularResource]);

require('./user.service');
require('./poke.service');
require('./auth.service');

export default MODULE_NAME;
