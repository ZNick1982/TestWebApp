'use strict';

module.exports=['$rootScope', '$state', 'AuthService', '$log',   
    function($rootScope, $state, AuthService, $log){
        $rootScope.$on('$locationChangeSuccess', function(evt) {
            // Halt state change from even starting
        evt.preventDefault();
        $log.debug('Location changed! Checking current User');
        var user = AuthService.GetCurrentUser();
        
        $log.debug('Current User is: ' + user);
         
        if(!user && $state.current.name == 'search')
            $state.go('login');
      });
}];