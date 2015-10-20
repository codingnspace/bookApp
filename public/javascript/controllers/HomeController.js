(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController(HomeFactory) {
		var vm = this;

HomeFactory.getBooks().then(function(res){
	vm.books = res;
});
	}
})();
