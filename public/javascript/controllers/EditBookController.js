(function(){
  'use strict';
  angular.module('app')
  .controller('EditBookController', EditBookController);

  function EditBookController($state, $stateParams, HomeFactory){
    var vm = this;
    vm.booked = {};

    // vm.booked.id = $stateParams.BookId;
    // if(!$stateParams.id) $state.go('Home');
    HomeFactory.getBookById($stateParams.id).then(function(res){
      vm.booked = res;
    });

    vm.editBook = function(){
      // vm.book.tags = [];
      // console.log(BookId);
      HomeFactory.editBook(vm.booked).then(function(){
        console.log("Made it back to the controller for editing");
        $state.go('Home');
      });
    };

  }
 })();
