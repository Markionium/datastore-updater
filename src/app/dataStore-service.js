angular.module('PEPFAR.datastore').factory('dataStore', dataStore);

function dataStore(Restangular, $q) {
    var dataStoreEndPoint = Restangular.all('dataStore');

    function plain(response) {
        return response.plain();
    }

    function getNameSpaces() {
        return dataStoreEndPoint.getList().then(plain);
    }

    function getKeysInNamespace(namespace) {
        return dataStoreEndPoint.all(namespace).getList().then(plain);
    }

    function getValueForKeyInNamespace(namespace, key) {
        return dataStoreEndPoint.all(namespace).get(key).then(plain);
    }

    function getValuesForAllKeysInNameSpace(namespace) {
        return dataStoreEndPoint
            .all(namespace)
            .getList()
            .then(plain)
            .then(function (keys) {
                var keyRequests = keys.map(function (key) {
                    return getValueForKeyInNamespace(namespace, key)
                        .then(function (value) {
                            return {
                                namespace: namespace,
                                key: key,
                                value: value
                            };
                        });
                });

                return $q.all(keyRequests);
            });
    }

    function updateValueToDataStore(namespace, key, value) {
        return dataStoreEndPoint
            .all(namespace)
            .all(key)
            .doPUT(value);
    }

    return {
        getNameSpaces: getNameSpaces,
        getKeysInNamespace: getKeysInNamespace,
        getValueForKeyInNamespace: getValueForKeyInNamespace,
        getValuesForAllKeysInNameSpace: getValuesForAllKeysInNameSpace,
        updateValueToDataStore: updateValueToDataStore
    };
}
