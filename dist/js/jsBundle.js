(function() {
    'use strict';
    angular.module('app', ['ui.router', 'ngMaterial'])
        .config(config);

    function config($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider.state('Home', {
            url: '/',
            templateUrl: 'views/Home.html'
        }).state('Create', {
            url: '/create',
            templateUrl: 'views/create.html'
        }).state("Register", {
            url: '/register',
            templateUrl: 'views/register.html'
        }).state("Login", {
            url: '/login',
            templateUrl: 'views/login.html'
        }).state('Profile', {
            url: '/profile/:id',
            templateUrl: 'views/profile.html'
        }).state('Edit', {
            url: '/edit/:id',
            templateUrl: 'views/edit.html'
        }).state('ReadMore', {
            url: '/readmore/:id',
            templateUrl: 'views/readmore.html'
        });
        $urlRouterProvider.otherwise('/');
        $httpProvider.interceptors.push('Auth');
    }
})();

(function() {
    'use strict';
    angular.module('app')
        .controller('CreateBookController', CreateBookController);

    function CreateBookController(HomeFactory, $state) {
        var vm = this;
        vm.newBook = {};
        vm.newBook.tags = [];
        // vm.newBook.tags = [];

        vm.createBook = function() {
            HomeFactory.createBook(vm.newBook).then(function(res) {
                $state.go('Home');
                // }, function(res){
                // 		vm.newBook = res;
                //   });
            });
        };
    }
})();

(function() {
    'use strict';
    angular.module('app')
        .controller('EditBookController', EditBookController);

    function EditBookController($state, $stateParams, HomeFactory) {
        var vm = this;
        vm.booked = {};

        // vm.booked.id = $stateParams.BookId;
        // if(!$stateParams.id) $state.go('Home');
        HomeFactory.getBookById($stateParams.id).then(function(res) {
            vm.booked = res;
        });

        vm.editBook = function() {
            // vm.book.tags = [];
            // console.log(BookId);
            HomeFactory.editBook(vm.booked).then(function() {
                console.log("Made it back to the controller for editing");
                $state.go('Home');
            });
        };

    }
})();

(function() {
    'use strict';
    angular.module('app')
        .controller('GlobalController', GlobalController);

    function GlobalController(UserFactory, $state) {
        var vm = this;
        vm.user = {};
        vm.status = UserFactory.status;

        vm.registerUser = function() {
            UserFactory.registerUser(vm.user).then(function() {
                $state.go('Home');
            });
        };

        vm.loginUser = function() {
            UserFactory.loginUser(vm.user).then(function() {
                $state.go('Home');
            });
        };

        vm.logout = function() {
            UserFactory.logout();
            $state.go('Login');
        };
    }
})();

(function() {
    'use strict';
    angular.module('app')
        .controller('HomeController', HomeController);

    function HomeController(HomeFactory) {
        var vm = this;

        HomeFactory.getBooks().then(function(res) {
            vm.books = res;
            console.log("whats up");
        });


        vm.deleteBook = function(bookToDelete) {
            HomeFactory.deleteBook(bookToDelete._id)
                .then(function() {
                    // console.log("Made it back to controller. about to splice!");
                    vm.books.splice(vm.books.indexOf(bookToDelete), 1);
                });
        };
    }
})();

(function() {
    'use strict';
    angular.module('app')
        .controller('ProfileController', ProfileController);

    function ProfileController(UserFactory, $stateParams) {
        var vm = this;
        vm.userBooks = {};


        UserFactory.getUserBooks($stateParams.id).then(function(res) {
            vm.userBooks = res;
        });

    }
})();

(function() {
    'use strict';
    angular.module('app')
        .controller('ReadMoreController', ReadMoreController);

    function ReadMoreController($stateParams, HomeFactory) {
        var vm = this;
        vm.newReview = {};

        // vm.readmore.id = $stateParams.id;

        // vm.getBookById = function(){
        HomeFactory.getBookById($stateParams.id).then(function(res) {
            vm.readmore = res;
            // console.log("made it back to controller");
            console.log(vm.readmore);

        });

        vm.addReview = function() {
            HomeFactory.addReview(vm.newReview, $stateParams.id)
                .then(function(res) {
                    // vm.readmore.reviews.push(res);

                });
        };

        // };

    }
})();

(function() {
    'use strict';
    angular.module('app')
        .factory('Auth', Auth);


    function Auth($window) {
        var o = {
            request: function(config) {
                if ($window.localStorage.getItem('token')) {
                    config.headers.authorization = "Bearer " +
                        $window.localStorage.getItem('token');
                }
                return config;
            }
        };

        return o;
    }
})();

(function() {
    'use strict';
    angular.module('app')
        .factory('HomeFactory', HomeFactory);


    function HomeFactory($http, $q) {
        var o = {};

        o.createBook = function(book) {
            var q = $q.defer();
            $http.post('/api/book', book)
                .then(function() {
                    q.resolve();
                });
            return q.promise;
        };

        o.getBookById = function(BookId) {
            var q = $q.defer();
            $http.get('/api/book/' + BookId)
                .then(function(res) {
                    q.resolve(res.data);
                });
            return q.promise;
        };

        o.addReview = function(newReview, id) {
            var q = $q.defer();
            console.log(newReview + "new review factory");
            $http.post('/api/book/' + id + '/review', newReview)
                .then(function(res) {
                    // console.log("made it to the factory for addreview funct");
                    q.resolve(res.data);
                });
            return q.promise;
        };
        o.editBook = function(EditedBook) {
            var q = $q.defer();

            $http.put('/api/book/' + EditedBook._id, EditedBook)
                .then(function(res) {
                    console.log("madee it to factory, made http req ");

                    q.resolve(res.data);
                    // console.log(res.data + "res.data in factory");
                    console.log(EditedBook + "Edited book");
                });
            return q.promise;
        };

        o.getBooks = function() {
            var q = $q.defer();
            $http.get('/api/book')
                .then(function(res) {
                    q.resolve(res.data);
                });
            return q.promise;
        };

        o.deleteBook = function(deletedBookId) {
            var q = $q.defer();
            console.log("I made it to the factory");
            $http.delete('/api/book/' + deletedBookId)
                .then(function() {
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

(function() {
    'use strict';
    angular.module('app')
        .factory('UserFactory', UserFactory);


    function UserFactory($http, $q) {
        var o = {};
        o.status = {};

        // o.getUserBooks = function(id){
        // 	var q = $q.defer();
        // 	$http.get('/api/user/profile/' + id)
        // 	.then(function(res){
        // 		q.resolve(res.data);
        // 	});
        // 	return q.promise;
        // };




        o.registerUser = function(user) {
            var q = $q.defer();
            $http.post('/api/user/register', user).then(function(res) {
                setToken(res.data);
                setUser();
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.loginUser = function(user) {
            var q = $q.defer();
            $http.post('/api/user/login', user).then(function(res) {
                setToken(res.data); //puts the token on localStorage
                //  var user = o.getUser();
                //  o.status.username = user.username;
                //  o.status._id = user._id;
                setUser();
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.logout = function() {
            removeToken();
            removeUser();
            //  o.status.username = null;
            //  o.status._id = null;
        };

        function setToken(token) {
            return localStorage.setItem('token', token);
        }

        function getToken() {
            return localStorage.getItem('token');
        }

        function removeToken() {
            localStorage.removeItem('token');
        }

        function setUser() {
            var user = JSON.parse(urlBase64Decode(getToken().split('.')[1]));
            o.status.username = user.username;
            o.status._id = user._id;
        }

        function removeUser() {
            o.status.username = null;
            o.status._id = null;
        }

        function urlBase64Decode(str) {
            var output = str.replace(/-/g, '+').replace(/_/g, '/');
            switch (output.length % 4) {
                case 0:
                    {
                        break;
                    }
                case 2:
                    {
                        output += '==';
                        break;
                    }
                case 3:
                    {
                        output += '=';
                        break;
                    }
                default:
                    {
                        throw 'Illegal base64url string!';
                    }
            }
            return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
        }

        //  o.getUser = function() {
        //    return JSON.parse(urlBase64Decode(getToken().split('.')[1]));
        //  };

        //  var token = getToken();
        //  o.status = {};
        //  if(token) {
        //    var user = o.getUser();
        //    o.status.username = user.username;
        //    o.status._id = user._id;
        //  }
        //
        //  function getAuth(){
        // 	 return{
        // 		 headers: {
        // 			 Authorization: "Bearer " + localStorage.getItem('token'),
        // 		 }
        // 	 };
        //  }
        if (getToken()) setUser();
        return o;

    }
})();