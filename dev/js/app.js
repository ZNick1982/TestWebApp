'use strict';

require('angular');
require('angular-animate');
require('angular-ui-router');
require('angular-strap');
require('angular-messages');
require('bootstrap-css');

require('./core');
require('./login');
require('./signup');
require('./search');
require('./cache/templates');


// angular.module('test', []);

angular.module('testApp', 
[
    'testApp.core', 
    'testApp.login', 
    'testApp.signup', 
    'testApp.search', 
    'templates', 
    'mgcrea.ngStrap',
    'ngMessages'    
]);



