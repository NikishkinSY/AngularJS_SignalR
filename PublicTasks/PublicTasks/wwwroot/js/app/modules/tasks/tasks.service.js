(function () {
    'use strict';

    angular
        .module('app.tasks')
        .service('tasksService', ['$resource', '$rootScope', '$q', tasksService]);

    tasksService.$inject = ['$resource'];
    tasksService.$inject = ['$rootScope'];
    tasksService.$inject = ['$q'];

    function tasksService($resource, $rootScope, $q) {

        // privates
        var _hubConnection = $.hubConnection();
        var _tasksHubProxy = undefined;

        // Service methods implementation
        function _initialize() {

            // Hub Proxy (allows to make calls and register callbacks handlers)
            _tasksHubProxy = _hubConnection.createHubProxy(tasksSignalR.hubName);

            // signalR callbacks handlers
            _tasksHubProxy.on(tasksSignalR.onNewTask, broadcastNewTask);
            _tasksHubProxy.on(tasksSignalR.onUpdateTask, broadcastUpdateTask);

            // connect
            _hubConnection.start()
                .done(connectedToSignalR)
                .fail(function () { console.error('Error connecting to signalR'); });
        }

        function broadcastNewTask(task) {
            console.debug(tasksSignalR.onNewTask + " " + task.Name);
            $rootScope.$broadcast(tasksSignalR.onNewTask, { task: task });
        }

        function broadcastUpdateTask(task) {
            console.debug(tasksSignalR.onUpdateTask + " " + task.name);
            $rootScope.$broadcast(tasksSignalR.onUpdateTask, { task: task });
        }

        function connectedToSignalR() {
            console.debug('connected to signalR, connection ID =' + _hubConnection.id);
            $rootScope.$broadcast(signalR.onConnected, { connectionId: _hubConnection.id });
        }

        function _addTask(task) {
            _tasksHubProxy.invoke(tasksSignalR.addTask, task);
        }

        function _updateTask(task) {
            _tasksHubProxy.invoke(tasksSignalR.updateTask, task);
        }

        // get all tasks with promise
        function _getAllTasksAsync() {

            var deferred = $q.defer();

            _tasksHubProxy.invoke(tasksSignalR.getAllTasks)
               .done(function (tasks) {
                   deferred.resolve(tasks);
               });

            return deferred.promise;
        }

        // Service public methods
        var service = {};

        // SignalR hub
        service.tasksHubProxy = _tasksHubProxy;

        service.initialize = _initialize;
        service.addTask = _addTask;
        service.updateTask = _updateTask;
        service.getAllTasksAsync = _getAllTasksAsync;

        return service;

    }
})();
