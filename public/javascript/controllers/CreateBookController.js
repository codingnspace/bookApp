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
	console.log("hmm");
  HomeFactory.createBook(vm.newBook);

// , function(res){
// 		vm.newBook = res;
  };
// HomeFactory.get(vm.createBook);

// vm.createBook = function(data) {
//
//         vm.newBook = data;
// 				console.log(data);
//     };



	// };
}
})();
