(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);


	function HomeFactory($http, $q) {
		var o = {};

o.createBook = function(book){
	var q = $q.defer();
	$http.post('/api/book', book, getAuth())
	.then(function(){
		q.resolve();
	});
	return q.promise;
};

o.getBookById = function(BookId){
	var q = $q.defer();
	$http.get('/api/book/'+ BookId)
	.then(function(res){
		q.resolve(res.data);
	});
	return q.promise;
};

o.editBook = function(EditedBookObj){
	var q = $q.defer();
	$http.put('/api/book', EditedBookObj)
	.then(function(res){
        q.resolve(res.data);
      });
      return q.promise;
    };

o.getBooks = function(){
	var q = $q.defer();
	$http.get('/api/book')
	.then(function(res){
		q.resolve(res.data);
	});
	return q.promise;
};

o.deleteBook = function(deletedBookId){
	var q = $q.defer();
	console.log("I made it to the factory");
	$http.delete('/api/book/' + deletedBookId)
	.then(function(){
		q.resolve();
	});
	return q.promise;
};
//o.addBook = function(boo)

function getAuth(){
	return{
		headers: {
			Authorization: "Bearer " + localStorage.getItem('token'),
		}
	};
}
		return o;
	}
})();
