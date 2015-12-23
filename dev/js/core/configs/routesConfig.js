'use strict';

module.exports=['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider){
        
        $stateProvider
        .state('signup', {
            url: '/signup',
            templateUrl: 'js/signup/html/signup.html',
        })
        .state('login', {
            url: '/login',
            templateUrl: 'js/login/html/login.html',
        })
        .state('search', {
            url: '/search',
            templateUrl: 'js/search/html/search.html',
            resolve:{
                loader: ['ItemsFactory', function(ItemsFactory){
                    return ItemsFactory.Load();
                }]
            }
        });
        
        $urlRouterProvider.otherwise("/login");
}];