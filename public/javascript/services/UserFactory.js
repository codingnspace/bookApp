(function() {
	'use strict';
	angular.module('app')
	.factory('UserFactory', UserFactory);


	function UserFactory($http, $q) {
		var o = {};
		o.status = {};

		o.getUserBooks = function(id){
			var q = $q.defer();
			$http.get('/api/user/profile/' + id)
			.then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};




    o.registerUser = function(user) {
       var q = $q.defer();
       $http.post('/api/user/register', user).then(function(res) {
				 setToken(res.data);
				 setUser();
				 q.resolve(res.data);
       });
       return q.promise;
     };

     o.loginUser = function(user) {
       var q = $q.defer();
       $http.post('/api/user/login', user).then(function(res) {
         setToken(res.data); //puts the token on localStorage
        //  var user = o.getUser();
        //  o.status.username = user.username;
        //  o.status._id = user._id;
				setUser();
         q.resolve(res.data);
       });
       return q.promise;
     };

     o.logout = function() {
       removeToken();
			 removeUser();
      //  o.status.username = null;
      //  o.status._id = null;
     };

     function setToken(token) {
			 return localStorage.setItem('token', token);
     }

     function getToken() {
       return localStorage.getItem('token');
     }

     function removeToken() {
       localStorage.removeItem('token');
     }

		 function setUser(){
			var user = JSON.parse(urlBase64Decode(getToken().split('.')[1]));
			o.status.username = user.username;
			o.status._id = user._id;
		 }

		 function removeUser(){
			 o.status.username = null;
			 o.status._id = null;
		 }

     function urlBase64Decode(str) {
       var output = str.replace(/-/g, '+').replace(/_/g, '/');
       switch (output.length % 4) {
         case 0: { break; }
         case 2: { output += '=='; break; }
         case 3: { output += '='; break; }
         default: {
           throw 'Illegal base64url string!';
         }
       }
       return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
     }

    //  o.getUser = function() {
    //    return JSON.parse(urlBase64Decode(getToken().split('.')[1]));
    //  };

    //  var token = getToken();
    //  o.status = {};
    //  if(token) {
    //    var user = o.getUser();
    //    o.status.username = user.username;
    //    o.status._id = user._id;
    //  }

		 function getAuth(){
			 return{
				 headers: {
					 Authorization: "Bearer " + localStorage.getItem('token'),
				 }
			 };
		 }
     return o;

  }
})();
