'use strict';

require('angular');

var CryptoJS = require('./../../modifiedVendors/cryptoJs/sha3.js');

module.exports = ['$q', '$log', 'localStorageService', 
function($q, $log, localStorageService){
    
//    var hash = CryptoJS.SHA3("Message", { outputLength: 224 });    
//    $log.debug(hash.toString());

    if(localStorageService.isSupported) {
         $log.debug('local storage supported!'); 
    }
    
    var keyPrefix = 'auth_';
    var cookieKey = '__auth__cookie_';
    var currentUserKey = 'auth_current_';
    

    var service = {};
    
    service.IsEmailAvailable = function(email){
           return localStorageService.get(keyPrefix + email) === null;
    }
    
    service.Signup = function(email, password){
        
        $log.debug('Call AuthService.Signup with email: "' + email + '" and password: "' + password + '"');
        
        var encryptStr = email + password;
        $log.debug('String to encrypt: ' + encryptStr);
        
        var hash = CryptoJS.SHA3(encryptStr, { outputLength: 224 }).toString();
        
        $log.debug('String encrypted, result hash: ' + hash);
        
        $log.debug('Storing hash to local storage with key: ' + keyPrefix+email);
        localStorageService.set(keyPrefix+email, hash);
        
        var loginPromise = service.Login(email, password);
        $log.debug('Called service.Login and return its promise'); 
        return loginPromise;
    }
    
    service.Login = function(email, password){
        
        $log.debug('Call AuthService.Login with email: "' + email + '" and password: "' + password + '"');
        
        var deferred = $q.defer();
        
        $log.debug('Key is: ' + keyPrefix + email);
        var savedHash = localStorageService.get(keyPrefix + email);
        
        $log.debug('Readed hash is: ' + savedHash);
        
        if(!savedHash)
        {
            $log.warn('Ooops!!! No saved hash. Returning rejected promise');
            deferred.reject();
            return deferred.promise;
        }
            
        var encryptStr = email + password;
        $log.debug('String to encrypt is: ' + encryptStr);
        var hash = CryptoJS.SHA3(encryptStr, { outputLength: 224 }).toString();
        
        $log.debug('Result hash is: ' + hash);
        
        
        if(savedHash === hash)
        {
            $log.debug('Hashes are equeal setting up auth cookie');
            localStorageService.cookie.set(cookieKey, hash);
            localStorageService.set(currentUserKey, email);
            $log.debug('Returning resolved promise with hash');
            deferred.resolve(hash);
            return deferred.promise;
        }
        else{
            $log.warn('Ooops!!!  Hashes are not equeal returning rejected promise');
            deferred.reject();
            return deferred.promise;
        }
    }
    
    service.Logout = function(){
        localStorageService.cookie.remove(cookieKey);
        localStorageService.remove(currentUserKey);
    }
    
    service.GetCurrentUser = function(){
        var cookieHash = localStorageService.cookie.get(cookieKey);
        if(!cookieHash)
            return null;
        var curUserEmail = localStorageService.get(currentUserKey);
        if(!curUserEmail)
            return null;
        var curUserHash = localStorageService.get(keyPrefix + curUserEmail);
        if(curUserHash === cookieHash){
            return curUserEmail;
        }
        else
        {
            return null;
        }
    }
    
    return service;
}];





