angular.module('PEPFAR.datastore').controller('appController', appController);

function appController($scope, dataStore) {

    dataStore.getNameSpaces()
        .then(function (data) {
            $scope.namespace = data;
        });

    dataStore.getKeysInNamespace('dedupe')
        .then(function (data) {
            $scope.key = data;
        });

    dataStore.getValueForKeyInNamespace('dedupe', 'periodSettings')
        .then(function (data) {
            $scope.value = data;
        });
}
