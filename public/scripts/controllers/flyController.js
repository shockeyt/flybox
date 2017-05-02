angular.module('FlyBox')
	.controller('FlyController', FlyController)
	.controller('FlyShowController', FlyShowController)
	.config(flyRouter);


//*****ROUTES*****

flyRouter.$inject = ['$routeProvider', '$locationProvider'];
function flyRouter ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/templates/fly-index.html',
			//controller: 'FlyController'
		})
		.when('/show/:id', {
			templateUrl: '/templates/fly-show.html',
			//controller: 'FlyShowController'
		});
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
}



//*****CONTROLLERS******
FlyController.$inject = ['$http'];
function FlyController ($http) {
	console.log("controller working");
	var vm = this;
	//vm.helloWorld = "initial message";

	vm.all = [];
	vm.flyList = [];

	$http
	.get('/flies')
	.then(function(response) {
		vm.flyList = response.data;
		console.log(vm.flyList);
	});

	// vm.showFly = showFly;
	// vm.singleFly = {};

	// function showFly(flies) {
	// 	$http
	// 	.get('/flies/' + flies._id)
	// 	.then(function(response) {
	// 		console.log(response.data._id);
	// 		vm.singleFly = response.data;
	// 	});
	// }

	vm.addFly = addFly;
	vm.newFly = {};

	function addFly() {
		vm.all.push(vm.newFly);
		$http
		.post('/flies', vm.newFly)
		.then(function(response) {
			console.log(response);
			vm.flyList.push(response.data);
		});
		vm.newFly = {};
	}

	vm.deleteFly = deleteFly;

	function deleteFly(flies) {
		console.log("delete button clicked");
		console.log(flies._id);
		$http
		.delete('/flies/' + flies._id)
		.then(function(response) {
			var index = vm.flyList.indexOf(flies);
			vm.flyList.splice(index, 1);
			console.log(index);
		});
	}


}

FlyShowController.$inject = ['$http', '$routeParams'];
function FlyShowController ($http, $routeParams) {
	console.log($routeParams.id);
	var vm = this;
	//vm.showFly = showFly;
	vm.singleFly = {};

		$http
		.get('/flies/' + $routeParams.id)
		.then(function(response) {
			console.log("response from server is ", response.data._id);
			vm.singleFly = response.data;
		});
	

}


