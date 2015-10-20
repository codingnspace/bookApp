(function() {
	'use strict';
	angular.module('app', ['ui.router','ngMaterial'])
	.config(Config);
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		}).state('Create',{
			url: '/create',
			templateUrl: 'views/create.html'
		}).state("Register",{
			url: '/register',
			templateUrl: 'views/register.html'
		}).state("Login",{
			url: '/login',
			templateUrl: '/views/login.html'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
