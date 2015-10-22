(function() {
	'use strict';
	angular.module('app')
	.controller('ReadMoreController', ReadMoreController);

	function ReadMoreController($stateParams,HomeFactory) {
		var vm = this;

		// vm.readmore.id = $stateParams.id;

// vm.getBookById = function(){
HomeFactory.getBookById($stateParams.id).then(function(res){
	vm.readmore = res;
	console.log("made it back to controller");
	console.log(vm.readmore);

});

// };

	}
})();
