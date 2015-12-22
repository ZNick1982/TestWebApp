'use strict';

require('angular');

var m = angular.module('testApp.core.services', []);

m.factory('AuthService', require('./authService.js'));
