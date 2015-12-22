'use strict';

require('angular');
require('angular-ui-router');
require('./../services');

var coreModule = angular.module('testApp.core.controllers', ['ui.router', 'testApp.core.services']);
coreModule.controller('NavController', require('./navController.js'));
