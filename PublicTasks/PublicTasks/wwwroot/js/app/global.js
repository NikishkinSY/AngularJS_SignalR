// global variables for help

function signalR() {
}

// connected event
signalR.onConnected = "signalRConnected";

function tasksSignalR() {
}

// hub
tasksSignalR.hubName = "tasksHub";

// client calls
tasksSignalR.addTask = "addTask";
tasksSignalR.updateTask = "updateTask";
tasksSignalR.getAllTasks = "getAllTasks";

// client callbacks
tasksSignalR.onNewTask = "broadcastNewTask";
tasksSignalR.onUpdateTask = "broadcastUpdateTask";



