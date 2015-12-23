'use strict';


module.exports = function(){
    
    return {
            restrict: 'A',
            scope:{
                rate: '='    
            },
            template:'<div><span class="glyphicon glyphicon-star text-warning" ng-repeat="i in fillArr track by $index"></span><span class="glyphicon glyphicon-star-empty text-warning" ng-repeat="s in emptyArr track by $index"></span></div>',
            
            link: function (scope, element, attrs) 
            {
                
                console.log('star-rating Link()');
                console.log('scope.rate is:' + scope.rate);
                var fillCnt = Math.min(Math.max(0, 5 - scope.rate), 5);
                var emptyCnt = 5 - fillCnt;
                
                scope.fillArr = new Array(fillCnt);
                console.log(fillCnt);
                
                
                scope.emptyArr = new Array(emptyCnt);
                console.log(emptyCnt);
                
                
            }
        };
    
    
};