'use strict';

module.exports = ['$scope', '$log', 'AuthService', '$state',
function($scope, $log, AuthService, $state){
    var self = this;
    
    self.showErrors = false;
    
    self.email = '';
    self.password = '';
    
    self.Login = function(){
        validateFields();
        if(!$scope.loginFrm.$invalid){
            AuthService.Login(self.email, self.password)
            .then(function(hash){
                $log.debug('Login successfull!!! with hash:' + hash);
                $state.go('search');               
            }, function(){
                $scope.loginFrm.inputEmail.$errorVal.credentials = true;
                self.showErrors = true;
            });
        }
    }
    
    
    function validateFields (){            
        $scope.loginFrm.inputEmail.$errorVal = angular.extend({}, $scope.loginFrm.inputEmail.$error);
        $scope.loginFrm.inputPassword.$errorVal = angular.extend({}, $scope.loginFrm.inputPassword.$error);
        
        if($scope.loginFrm.$invalid)
            self.showErrors = true;
        else
            self.showErrors = false;
    }
  
}];