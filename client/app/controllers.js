import angular from 'angular';

const MODULE_NAME = 'ipoke.controllers';

angular.module(MODULE_NAME, ['ipoke.services']);

require('./login/login');
require('./shell/shell');
require('./main/main');
require('./users/users');
require('./admin/admin');
require('./about/about');
require('./statistics/statistics');

export default MODULE_NAME;