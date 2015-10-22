(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);


	function HomeFactory($http, $q) {
		var o = {};

o.createBook = function(book){
	var q = $q.defer();
	$http.post('/api/book', book)
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

o.addReview = function(newReview, id) {
	var q = $q.defer();
	console.log(newReview + "new review factory");
	$http.post('/api/book/' +id + '/review', newReview)
	.then(function(res){
		// console.log("made it to the factory for addreview funct");
		q.resolve(res.data);
	});
	return q.promise;
};
o.editBook = function(EditedBook){
	var q = $q.defer();

	$http.put('/api/book/'+EditedBook._id,EditedBook)
	.then(function(res){
		console.log("madee it to factory, made http req ");

        q.resolve(res.data);
				// console.log(res.data + "res.data in factory");
				console.log(EditedBook + "Edited book");
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

// function getAuth(){
// 	return{
// 		headers: {
// 			Authorization: "Bearer " + localStorage.getItem('token'),
// 		}
// 	};
// }
		return o;
	}
})();
