(function(){
  'use strict';
  angular.module('app')
  .controller('EditBookController', EditBookController);

  function EditBookController($state, $stateParams, HomeFactory){
    var vm = this;


    // if(!$stateParams.id) $state.go('Home');
    HomeFactory.getBookById($stateParams.id).then(function(res){
      vm.book = res;
    });

    vm.editBook = function(){
      // vm.book.tags = [];

      HomeFactory.putBook(vm.book).then(function(){
        $state.go('Home');
      });
    };

  }
 })();
