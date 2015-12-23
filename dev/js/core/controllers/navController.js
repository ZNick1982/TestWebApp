'use strict';

module.exports = ['$rootScope', '$scope', 'AuthService', '$state', 'CartService', '$modal',
function($rootScope, $scope, AuthService, $state, CartService, $modal){
    var self = this;
    self.$state = $state;
    
    self.curUser = AuthService.GetCurrentUser();
    self.cartService = CartService;
    
    $scope.cartService = CartService; 
    
    self.Logout = function(){
        AuthService.Logout()
        $state.go('login');
    }
    
    
    $rootScope.$on('$locationChangeSuccess', function(){
        self.curUser = AuthService.GetCurrentUser();
    });
    
    var cartModal = $modal({
        scope: $scope, 
        template: 'js/search/html/cartPopup.html', 
        show: false,
        title: 'Cart Items'
        });
    self.showCart = function() {
        cartModal.show();
    };
        
}];