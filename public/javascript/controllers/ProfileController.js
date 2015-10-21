(function() {
	'use strict';
	angular.module('app')
	.controller('ProfileController', ProfileController);

	function ProfileController(UserFactory, $stateParams) {
		var vm = this;
	 vm.userBooks = {};


UserFactory.getUserBooks($stateParams.id).then(function(res){
	vm.userBooks = res;
});

  }
})();
