'use strict';

module.exports = ['$scope', 'FilterService', 'ItemsFactory', 'CartService',
function($scope, FilterService, ItemsFactory, CartService){
    var self = this;
    
//    ItemsFactory.Load();
    
    FilterService.RestoreFilter();
    CartService.RestoreItems();
    
    self.filter = FilterService.filter;
    self.colorList = FilterService.colorList;
    
    ItemsFactory.ApplyFilter(self.filter);
    
    self.ApplyFilter = function(){
        FilterService.SaveFilter();
        ItemsFactory.ApplyFilter(self.filter);
    }
    
}];