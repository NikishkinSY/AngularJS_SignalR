using Domain.Entities;
using System.Collections.Generic;

namespace PublicTasks.Hubs.Tasks
{
    public interface ITasksCalls
    {
        // Add task
        System.Threading.Tasks.Task AddTask(Task task);
        // Get all tasks
        System.Threading.Tasks.Task<IEnumerable<Task>> GetAllTasks();
        // Update task
        System.Threading.Tasks.Task UpdateTask(Task task);
    }
}
