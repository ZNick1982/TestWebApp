'use strict';

require('angular');
require('angular-ui-router');
require('./configs');
require('./services');
require('./controllers');
require('angular-local-storage');

var m = angular.module('testApp.core', 
['ui.router', 'testApp.core.configs', 'testApp.core.services', 'testApp.core.controllers',
'LocalStorageModule']);

