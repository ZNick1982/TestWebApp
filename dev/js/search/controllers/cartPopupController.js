'use strict';

module.exports = ['$scope', 'FilterService', 'ItemsFactory', 'CartService',
function($scope, FilterService, ItemsFactory, CartService){
    var self = this;
    
    self.cartService = CartService;
    
    self.ClearCart = function(){
        CartService.Clear();
    }
    
}];