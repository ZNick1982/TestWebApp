'use strict';

require('angular');


var m = angular.module('testApp.login', ['testApp.core.services']);
m.controller('LoginController', require('./controllers/loginController.js'));