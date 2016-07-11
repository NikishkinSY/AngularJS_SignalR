using Domain.Entities;

namespace PublicTasks.Hubs.Tasks
{
    // Client callbacks
    public interface ITasksCallbacks
    {
        // Notify task added
        System.Threading.Tasks.Task BroadcastNewTask(Task task);
        // Notify task updated
        System.Threading.Tasks.Task BroadcastUpdateTask(Task task);
    }
}
