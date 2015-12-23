'use strict';

module.exports=['$rootScope', '$state', 'AuthService', '$log','$location',   
    function($rootScope, $state, AuthService, $log, $location){
        $rootScope.$on('$locationChangeSuccess', function(evt) {
            // Halt state change from even starting
        evt.preventDefault();
        $log.debug('Location changed! Checking current User');
        var user = AuthService.GetCurrentUser();
        
        $log.debug('Current User is: ' + user);
        
        $log.debug('Current location is: ' + $location.path());
        
         
        if(!user && $location.path() ==='/search'){
            $log.debug('Redirect to login');
            $state.go('login');
        }
            
        if(user && ($location.path() ==='/login' || $location.path() ==='/signup'))
        {
            $log.debug('Redirect to search');
            $state.go('search');
        }
//                        
      });
}];