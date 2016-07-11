using Domain.Concrete;
using Domain.Entities;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Collections.Generic;

namespace PublicTasks.Hubs.Tasks
{
    //web api for signalR
    [HubName("tasksHub")]
    public class TasksHub : Hub<ITasksCallbacks>, ITasksCalls
    {
        IRepository _repository;
        public TasksHub(IRepository repository)
        {
            _repository = repository;
        }

        // add new task
        public async System.Threading.Tasks.Task AddTask(Task task)
        {
            await _repository.AddAsync(task);
            await Clients.All.BroadcastNewTask(task);
        }

        // get all tasks
        public async System.Threading.Tasks.Task<IEnumerable<Task>> GetAllTasks()
        {
            return await _repository.GetAsync();
        }

        // update existed task
        public async System.Threading.Tasks.Task UpdateTask(Task task)
        {
            await _repository.UpdateAsync(task);
            await Clients.All.BroadcastUpdateTask(task);
        }
    }
}