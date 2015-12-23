'use strict';

module.exports = ['$http', '$log', function($http, $log) {
    
    var service = { loadedData: [], data: []};
    
    service.Load = function(){
        
        $log.debug('Called ItemFactory.Load()');
        return $http.get('/items.json')
        .success(function(result){
            service.loadedData = result;
            service.data = result;
        });
    }
    
    service.ApplyFilter = function (filter){
        $log.debug('Applying filter: ');
        $log.debug(filter);
        
        if(!filter)
            return;
            
        service.data = service.loadedData.filter(function(item){
            var datesValid = true;
            var inStockValid = true;
            var priceValid = true;
            var colorValid = true;
            
            if(filter.inStockOnly){
                inStockValid = item.InStock == true;
            }
            
            if(filter.color){
                colorValid = item.Color == filter.color;
            }
            
            
            if(filter.fromDt){
                datesValid = (new Date(item.IssueDate)) > (new Date(filter.fromDt));
            }
            if(filter.toDt){
                datesValid = (new Date(item.IssueDate)) < (new Date(filter.toDt));
            }
            if(filter.fromDt && filter.toDt){
                datesValid = (new Date(item.IssueDate)) < (new Date(filter.toDt)) && (new Date(item.IssueDate)) > (new Date(filter.fromDt));
            }
            
            if(filter.priceFrom){
                priceValid = item.Price > filter.priceFrom;
            }
            if(filter.priceTo){
                priceValid = item.Price < filter.priceTo;
            }
            if(filter.priceFrom && filter.priceTo){
                priceValid = item.Price > filter.priceFrom && item.Price < filter.priceTo;
            }
            
            
            
            return datesValid && inStockValid && priceValid && colorValid;
        });
        
        $log.debug('Result:');
        $log.debug(service.data);
        
        return service.data;    
    }
    
    return service;
    
    
}];