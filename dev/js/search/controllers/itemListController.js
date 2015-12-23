'use strict';

module.exports = ['$scope', 'CartService', 'ItemsFactory',
function($scope, CartService, ItemsFactory){
    var self = this;
    
    self.itemsFactory = ItemsFactory;
    
    self.Order = function(item){
        CartService.AddItem(item);
    }
    
}];