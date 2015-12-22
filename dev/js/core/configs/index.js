'use strict';

require('angular');
require('angular-ui-router');

var m = angular.module('testApp.core.configs', ['ui.router']);
m.config(require('./routesConfig.js'));
m.run(require('./runConfig.js'));
