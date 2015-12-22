'use strict';

module.exports = ['$rootScope', '$scope', 'AuthService', '$state',
function($rootScope, $scope, AuthService, $state){
    var self = this;
    self.$state = $state;
    
    self.curUser = AuthService.GetCurrentUser();
    
    self.Logout = function(){
        AuthService.Logout()
        $state.go('login');
    }
    
    
    $rootScope.$on('$locationChangeSuccess', function(){
        self.curUser = AuthService.GetCurrentUser();
    });
        
}];