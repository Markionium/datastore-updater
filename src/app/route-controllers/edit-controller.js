angular.module('PEPFAR.datastore').controller('EditController', EditController);

function EditController(dataStore, dataStoreEntry, notify) {
    var vm = this;

    vm.updateInProgress = false;
    vm.dataStoreEntry = {
        namespace: dataStoreEntry.namespace,
        key: dataStoreEntry.key,
        value: JSON.stringify(dataStoreEntry.value, undefined, 2)
    };

    vm.isValueValidJSON = isValueValidJSON;
    vm.isUpdating = isUpdating;
    vm.updateValueToDataStore = updateValueToDataStore;

    function isUpdating() {
        return vm.updateInProgress;
    }

    function isValueValidJSON() {
        try {
            JSON.parse(vm.dataStoreEntry.value);
            return true;
        } catch (e) {
            return false;
        }
    }

    function updateValueToDataStore() {
        vm.updateInProgress = true;

        dataStore.updateValueToDataStore(vm.dataStoreEntry.namespace, vm.dataStoreEntry.key, JSON.parse(vm.dataStoreEntry.value))
            .then(function () {
                notify.success('Updated ' + vm.dataStoreEntry.key + ' in ' + vm.dataStoreEntry.namespace);
            })
            .catch(function () {
                notify.success('Could not update ' + vm.dataStoreEntry.key + ' in ' + vm.dataStoreEntry.namespace);
            })
            .then(function () {
                vm.updateInProgress = false;
            });
    }
}
