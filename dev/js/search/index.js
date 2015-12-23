'use strict';

require('angular');


var m = angular.module('testApp.search', ['testApp.core.services']);
m.controller('FilterController', require('./controllers/filterController.js'));
m.controller('ItemListController', require('./controllers/itemListController.js'));
m.controller('CartPopupController', require('./controllers/cartPopupController.js'));
m.factory('CartService', require('./services/cartService.js'));
m.factory('FilterService', require('./services/filterService.js'));
m.factory('ItemsFactory', require('./services/itemsFactory.js'));
m.directive('starRating', require('./directives/starRating.js'));