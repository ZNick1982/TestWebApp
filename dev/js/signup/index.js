'use strict';

require('angular');


var m = angular.module('testApp.signup', ['testApp.core.services']);
m.controller('SignupController', require('./controllers/signupController.js'));