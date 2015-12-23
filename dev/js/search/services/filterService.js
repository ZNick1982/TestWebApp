'use strict';

require('angular');

module.exports = ['$log', 'localStorageService',
function($log, localStorageService){
    
    var service = {
        
        filter: {
            fromDt: null,
            toDt: null,
            inStockOnly: false,
            priceFrom: null,
            priceTo: null,
            color: null
        },
        
        colorList:[ 'Red', 'White', 'Black', 'Blue', 'Yellow', 'Green'],
        
                    
        storageKey: 'filter'        
    };
    
    service.RestoreFilter = function(){
        service.filter = angular.extend(service.filter, localStorageService.get(service.storageKey));
    }
    
    service.SaveFilter = function(){
        localStorageService.set(service.storageKey, service.filter);
    }
    
    return service;
    
}];

