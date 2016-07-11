(function () {
    'use strict';

    angular
        .module('app.tasks')
        .controller('TasksController', Tasks);

    Tasks.$inject = ['tasksService', '$scope'];

    function Tasks(tasksService, $scope) {
        var vm = this;
        vm.title = 'tasks';
        vm.modalTitle = '';

        vm.editedTask = {};
        vm.tempTask = {};
        vm.tasks = [];

        vm.connected = false;
        vm.connectionId = "not connected";
        vm.activate = _activate;

        vm.activate();

        function _activate() {
            tasksService.initialize();

            // event on connect
            $scope.$on(signalR.onConnected, function (event, args) {
                connectedToSignalR(args.connectionId);
            });

            // event on new task
            $scope.$on(tasksSignalR.onNewTask, function (event, args) {
                $scope.$apply(function () {
                    vm.tasks.push(args.task);
                });
            });

            // event on update task
            $scope.$on(tasksSignalR.onUpdateTask, function (event, args) {
                $scope.$apply(function () {
                    for (var i = 0; i < vm.tasks.length; i++) {
                        if (vm.tasks[i].Id == args.task.Id) {
                            vm.copyProperties(args.task, vm.tasks[i]);
                            break;
                        }
                    }
                });
            });
        }

        function connectedToSignalR(connectionId) {
            // this needs to be executed within the apply, otherwise angular cannot update bindings
            $scope.$apply(function () {
                vm.connected = true;
                vm.connectionId = connectionId;

                // load all tasks
                tasksService.getAllTasksAsync().then(function (tasks) {
                    vm.tasks = tasks;
                });
            });
        }

        vm.addTask = function () {
            vm.modalTitle = 'Add';
            vm.tempTask = {};
        };

        //save to temp value choosen task
        vm.editTask = function (task) {
            vm.modalTitle = 'Edit';
            vm.editedTask = task;
            vm.copyProperties(task, vm.tempTask);
        };

        // save or update task
        vm.saveTask = function () {
            if (vm.modalTitle == 'Add') {
                tasksService.addTask(vm.tempTask);
                vm.tempTask = {};
                closeModal();
            }
            else if(vm.modalTitle == 'Edit') {
                tasksService.updateTask(vm.tempTask);
                closeModal();
            }
        };

        // copy properties (map)
        vm.copyProperties = function (obj, copy) {
            for (var propety in obj)
                copy[propety] = obj[propety];
        };

        // close modal window
        function closeModal() {
            angular.element('#addTaskModal').modal('hide');
        };
    }
})();
