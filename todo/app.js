var todoApp = angular.module('todoApp', []);

todoApp.controller('mainController', ['$scope', '$window', function($scope, $window) {
	$scope.data = {
		todoList: angular.fromJson($window.localStorage.getItem('todoAppData')) || [],
		newItemText: '',
		availableOptions: [
      {id: '1', name: 'Important'},
      {id: '2', name: 'Very Important'},
      {id: '3', name: 'Urgent'}
    ],
    selectedOption: {id: '1', name: 'Important'}
	};
	$scope.addItem = function() {
		if($scope.data.newItemText.length > 0) {
			$scope.data.todoList.push({
				text: $scope.data.newItemText,
				priority: $scope.data.selectedOption.name,
				done: false
			});
			$scope.data.newItemText = '';
			$scope.data.selectedOption = {id: '1', name: 'Important'};
			$scope.updateLocalStorage();
		}
	};
	$scope.updateLocalStorage = function() {
		$window.localStorage.setItem('todoAppData', angular.toJson($scope.data.todoList));
	};
	$scope.removeTodo = function(todoIndex) {
		$scope.data.todoList.splice(todoIndex, 1);
		$scope.updateLocalStorage();
	};
	$scope.toggleComplete = function(todoIndex) {
		$scope.data.todoList[todoIndex].done = !$scope.data.todoList[todoIndex].done;
		$scope.updateLocalStorage();
	};
	$scope.itemLeft = function() {
		var number = $scope.data.todoList.filter(function(e) {
			return !e.done;
		}).length;
		return number > 1 ? number + ' items' : number + ' item';
	};
}]);
