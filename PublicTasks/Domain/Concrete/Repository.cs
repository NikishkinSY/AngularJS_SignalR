using Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Domain.Concrete
{
    public class Repository: IRepository
    {
        private readonly IContext _appDBContext;

        public Repository(IContext appDBContext)
        {
            _appDBContext = appDBContext;
        }
        
        // add new task
        public System.Threading.Tasks.Task AddAsync(Task task)
        {
            return System.Threading.Tasks.Task.Run(() =>
            {
                _appDBContext.Tasks.Add(task);
            });
        }

        // update task's values
        public System.Threading.Tasks.Task UpdateAsync(Task task)
        {
            return System.Threading.Tasks.Task.Run(() =>
            {
                var taskDB = Get().FirstOrDefault(x => x.Id == task.Id);
                if (taskDB != null)
                {
                    taskDB.Name = task.Name;
                    taskDB.Description = task.Description;
                }
            });
        }

        // get all tasks
        public IEnumerable<Task> Get()
        {
            return _appDBContext.Tasks;
        }
        public System.Threading.Tasks.Task<IEnumerable<Task>> GetAsync()
        {
            return System.Threading.Tasks.Task.Run(() => Get());
        }
    }
}
