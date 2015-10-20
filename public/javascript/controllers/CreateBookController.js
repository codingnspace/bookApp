(function() {
	'use strict';
	angular.module('app')
	.controller('CreateBookController', CreateBookController);

	function CreateBookController(HomeFactory,$state) {
		var vm = this;
    vm.newBook ={};
    vm.newBook.tags =[];
    // vm.newBook.tags = [];

vm.createBook = function(){
  HomeFactory.createBook(vm.newBook).then(function(res){
    vm.newBook = res;
    $state.go('Home');
  });
};
	}
})();
