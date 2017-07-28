import angular from 'angular';

const MODULE_NAME = 'ipoke.controllers';

// need to add to the DI the advanced.filters and advanced.directives

angular.module(MODULE_NAME, ['ipoke.services']);

require('./shell/shell');
require('./main/main');
require('./admin/admin');
require('./about/about');
require('./statistics/statistics');

export default MODULE_NAME;