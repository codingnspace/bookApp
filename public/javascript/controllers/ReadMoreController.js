(function() {
	'use strict';
	angular.module('app')
	.controller('ReadMoreController', ReadMoreController);

	function ReadMoreController($stateParams,HomeFactory) {
		var vm = this;
		vm.newReview ={};

		// vm.readmore.id = $stateParams.id;

// vm.getBookById = function(){
HomeFactory.getBookById($stateParams.id).then(function(res){
	vm.readmore = res;
	// console.log("made it back to controller");
	console.log(vm.readmore);

});

vm.addReview = function(){
	HomeFactory.addReview(vm.newReview, $stateParams.id)
	.then(function(res){
		// vm.readmore.reviews.push(res);

	});
};

// };

	}
})();
