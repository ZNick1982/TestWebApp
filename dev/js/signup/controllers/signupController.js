'use strict'

module.exports = ['$scope', '$log', 'AuthService', '$state',
function($scope, $log, AuthService, $state){
    
    var self = this;
    self.email = '';
    self.password = '';
    self.confirmPassword = '';
    
    self.showErrors = false;
    
    self.Signup = function(){
        
        validateFields();
        if(!$scope.signupFrm.$invalid){
            AuthService.Signup(self.email, self.password)
            .then(function(hash){
                $log.debug('Signup successfull!!! with hash:' + hash);
                $state.go('search');               
            });
        }
    }
    
    function validateFields (){
            
        $scope.signupFrm.inputEmail.$errorVal = angular.extend({}, $scope.signupFrm.inputEmail.$error);
        $scope.signupFrm.inputPassword.$errorVal = angular.extend({}, $scope.signupFrm.inputPassword.$error);
        $scope.signupFrm.confirmPassword.$errorVal = angular.extend({}, $scope.signupFrm.confirmPassword.$error);
        
        if(self.password != self.confirmPassword){
            $scope.signupFrm.confirmPassword.$errorVal.match = true;
            $scope.signupFrm.$invalid = true;
        }
        
        if(!AuthService.IsEmailAvailable(self.email)){
            $scope.signupFrm.inputEmail.$errorVal.emailAvailable = true;
            $scope.signupFrm.$invalid = true;
        }
        
        if($scope.signupFrm.$invalid)
            self.showErrors = true;
        else
            self.showErrors = false;
    }
  
}];