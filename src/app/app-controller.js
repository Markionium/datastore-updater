angular.module('PEPFAR.datastore').controller('appController', appController);

function appController($scope, $http) {

    $http.get('/api/dataStore/').success(function (data) {
        $scope.namespace = data;
    });

    $http.get('/api/dataStore/dedupe').success(function (data) {
        $scope.key = data;
    });

    $http.get('/api/dataStore/dedupe/periodSettings').success(function (data) {
        $scope.value = data;
    });

}
