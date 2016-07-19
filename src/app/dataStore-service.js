angular.module('PEPFAR.datastore').factory('dataStore', dataStore);

function dataStore(Restangular) {
    var dataStoreEndPoint = Restangular.all('dataStore');

    function getNameSpaces() {
        return dataStoreEndPoint.getList();
    }

    function getKeysInNamespace(namespace) {
        return dataStoreEndPoint.all(namespace).getList();
    }

    function getValuesForKeyInNamespace(namespace, key) {
        return dataStoreEndPoint.all(namespace).get(key);
    }

    return {
        getNameSpaces: getNameSpaces,
        getKeysInNamespace: getKeysInNamespace,
        getValuesForKeyInNamespace: getValuesForKeyInNamespace
    };
}
