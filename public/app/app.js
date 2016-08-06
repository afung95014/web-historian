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
      $scope.jobId = res.data;
    })
  };
});

app.controller('viewStatusController', function($scope, $http, $sce) {
  $scope.showJobStatus = false;
  $scope.archiveStatus = '';
  $scope.archivedData = "archivedData";
  $scope.jobId = {
    id: ""
  };
  $scope.getArchived = function() {
    $http.post('/searchArchive', $scope.jobId)
    .then(function(res) {
      if(res.status === 204) { 
        $scope.archiveStatus = 'The url associated with this job ID has not been archived yet. Please check back again later!';
        $scope.archivedData = '';
      } else {
        $scope.archiveStatus = '';
        $scope.archivedData = $sce.trustAsHtml(res.data.data);  
      }
    })
  };
});


