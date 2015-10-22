(function(){
  'use strict';
  angular.module('app')
  .controller('EditBookController', EditBookController);

  function EditBookController($state, $stateParams, HomeFactory){
    var vm = this;
    vm.book = {};

    vm.book.id = $stateParams.BookId;
    // if(!$stateParams.id) $state.go('Home');
    // HomeFactory.getBookById($stateParams.id).then(function(res){
    //   vm.booked = res;
    // });

    vm.editBook = function(BookId){
      // vm.book.tags = [];
      // console.log(BookId);
      HomeFactory.editBook({IDofBooktoEdit: BookId, EditedBook: vm.book}).then(function(){
        $state.go('Home');
      });
    };

  }
 })();
