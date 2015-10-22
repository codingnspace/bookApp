(function() {
	'use strict';
	angular.module('app')
	.factory('Auth', Auth);


	function Auth($window) {
		var o = {
      request: function(config){
        if($window.localStorage.getItem('token')){
          config.headers.authorization = "Bearer " +
          $window.localStorage.getItem('token');
        }
        return config;
      }
    };

    return o;
  }
})();
