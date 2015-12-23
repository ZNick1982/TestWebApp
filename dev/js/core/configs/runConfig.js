'use strict';

module.exports=['$rootScope', '$state', 'AuthService', '$log',   
    function($rootScope, $state, AuthService, $log){
        $rootScope.$on('$locationChangeSuccess', function(evt) {
            // Halt state change from even starting
        evt.preventDefault();
        $log.debug('Location changed! Checking current User');
        var user = AuthService.GetCurrentUser();
        
        $log.debug('Current User is: ' + user);
        
        $log.debug('Current state is: ');
        $log.debug($state.current.name);
         
        if(!user)
            $state.go('login');
        else
            $state.go('search');            
      });
}];