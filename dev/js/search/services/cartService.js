'use strict';

require('angular');

module.exports = ['$log', 'localStorageService',
function($log, localStorageService){
    
    var storageKey = '__cart__';
    
    var service = {
        
        cartItems: [],
        totalCount: 0
                
    };
    
    service.RestoreItems = function(){
        service = angular.extend(service, localStorageService.get(storageKey));
    }
    
    service.AddItem = function(inpitem){
        var foundItem = findItem(inpitem);
        if(foundItem){
            foundItem.count ++;
            service.totalCount ++;
        }
        else{
            service.cartItems.push({item: inpitem, count: 1});
            service.totalCount ++;    
        }
        
        $log.debug(service);
        
        service.Save();    
    }
    
    service.Save = function(){
        localStorageService.set(storageKey, service);
    }
    
    service.Clear = function(){
        service.cartItems = [];
        service.totalCount = 0;
        localStorageService.set(storageKey, service);
    }
    
    function findItem(item){
        if(!item)
            return null;
        if(!item.Id)
            return null;
            
            
                    
        for(var i in service.cartItems){
            if(service.cartItems[i].item){
                if(service.cartItems[i].item.Id == item.Id)
                    return service.cartItems[i];
                
            }
        }
        return null;    
    }
    
    return service;
    
}];

