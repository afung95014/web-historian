var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.
  when('/', {
  	templateUrl: './views/addLink.html',
  	controller: 'addLinkController'
  }).
  when('/addLink', {
  	templateUrl: './views/addLink.html',
  	controller: 'addLinkController'
  }).
  when('/viewStatus', {
  	templateUrl: './views/viewStatus.html',
  	controller: 'viewStatusController'
  });
});

app.controller('addLinkController', function($scope, $http){
  $scope.link = {
    url: ""
  };
  $scope.addLink = function() {
    $http.post('/addLink', $scope.link);
  };
});

app.controller('viewStatusController', function($scope, $http) {
  $http.get('/getArchived').then(function(res) {
    $scope.archivedData = res.data;
  })
});


