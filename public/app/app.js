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
  $scope.jobId = " ";
  $scope.showJobId = false;
  $scope.link = {
    url: ""
  };
  $scope.addLink = function() {
    $http.post('/addLink', $scope.link)
    .then(function(res) {
      console.log(res.data);
      $scope.jobId = res.data;
    })
  };
});

app.controller('viewStatusController', function($scope, $http, $sce) {
  $scope.showJobStatus = false;
  $scope.archivedData = "archivedData";
  $scope.jobId = {
    id: ""
  };
  $scope.getArchived = function() {
    $http.post('/searchArchive', $scope.jobId)
    .then(function(res) {
      console.log(res);
      if(res.data.archived === false) {
        $scope.archivedData = 'The url ' + res.data.url + ' has not been archived yet. Please check back again later!';
      } else {
        $scope.archivedData = $sce.trustAsHtml(res.data.data);  
      }
    })
  };
});


