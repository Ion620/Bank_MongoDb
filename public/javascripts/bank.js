var app = angular.module('Bank', ['ngResource','ngRoute']);
app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		})
		.when('/add-customers', {
			templateUrl: 'partials/customers-form.html',
			controller: 'AddCustomersCtrl'
		})
		.when('/customers/:id', {
			templateUrl: 'partials/customers-form.html',
			controller: 'EditCustomersCtrl'
		})
		.when('/customers/delete/:id', {
			templateUrl: 'partials/customers-delete.html',
			controller: 'DeleteCustomersCtrl'
		})
		.when('/add-workers', {
			templateUrl: 'partials/workers-form.html',
			controller: 'AddWorkersCtrl'
		})
		.when('/workers/:id', {
			templateUrl: 'partials/workers-form.html',
			controller: 'EditWorkersCtrl'
		})
		.when('/workers/delete/:id', {
			templateUrl: 'partials/workers-delete.html',
			controller: 'DeleteWorkersCtrl'
		})
		.when('/add-deposit', {
			templateUrl: 'partials/deposit-form.html',
			controller: 'AddDepositCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);
app.controller('HomeCtrl', ['$scope', '$resource',
function($scope, $resource){
	var Customers = $resource('/api/customers');
	Customers.query(function(customers){
		$scope.customers = customers;
	});
	var Workers = $resource('/api/workers');
	Workers.query(function(workers){
		$scope.workers = workers;
	});
	var Bills = $resource('/api/bills');
	Bills.query(function(bills){
		$scope.bills = bills;
	});
	var Deposit = $resource('/api/deposit');
	Deposit.query(function(deposit){
		$scope.deposit = deposit;
	});
}]);
app.controller('AddCustomersCtrl', ['$scope', '$resource', '$location',
	function($scope, $resource, $location){
		$scope.save = function(){
			var Customers = $resource('/api/customers');
			Customers.save($scope.customers, function(){
				$location.path('/');
			});
		};
	}]);
app.controller('EditCustomersCtrl', ['$scope', '$resource', '$location',
'$routeParams',
function($scope, $resource, $location, $routeParams){
	var Customers = $resource('/api/customers/:id', { id: '@_id' }, {
		update: { method: 'PUT' }
	});
	Customers.get({ id: $routeParams.id }, function(customers){
		$scope.customers = customers;
	});
	$scope.save = function(){
		Customers.update($scope.customers, function(){
			$location.path('/');
		});
	}
}]);
app.controller('DeleteCustomersCtrl', ['$scope', '$resource', '$location',
'$routeParams',
function($scope, $resource, $location, $routeParams){
	var Customers = $resource('/api/customers/:id');
	Customers.get({ id: $routeParams.id }, function(customers){
		$scope.customers = customers;
	})
	$scope.delete = function(){
		Customers.delete({ id: $routeParams.id }, function(customers){
			$location.path('/');
		});
	}
}]);



app.controller('AddWorkersCtrl', ['$scope', '$resource', '$location',
	function($scope, $resource, $location){
		$scope.save = function(){
			var Workers = $resource('/api/workers');
			Workers.save($scope.workers, function(){
				$location.path('/');
			});
		};
	}]);
app.controller('EditWorkersCtrl', ['$scope', '$resource', '$location',
'$routeParams',
function($scope, $resource, $location, $routeParams){
	var Workers = $resource('/api/workers/:id', { id: '@_id' }, {
		update: { method: 'PUT' }
	});
	Workers.get({ id: $routeParams.id }, function(workers){
		$scope.workers = workers;
	});
	$scope.save = function(){
		Workers.update($scope.workers, function(){
			$location.path('/');
		});
	}
}]);
app.controller('DeleteWorkersCtrl', ['$scope', '$resource', '$location',
'$routeParams',
function($scope, $resource, $location, $routeParams){
	var Workers = $resource('/api/workers/:id');
	Workers.get({ id: $routeParams.id }, function(workers){
		$scope.workers = workers;
	})
	$scope.delete = function(){
		Workers.delete({ id: $routeParams.id }, function(workers){
			$location.path('/');
		});
	}
}]);


app.controller('AddDepositCtrl', ['$scope', '$resource', '$location',
	function($scope, $resource, $location){
		$scope.save = function(){
			var Deposit = $resource('/api/deposit');
			Deposit.save($scope.deposit, function(){
				$location.path('/');
			});
		};
	}]);