using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Entities;

namespace Domain.Concrete
{
    public interface IRepository
    {
        System.Threading.Tasks.Task AddAsync(Task task);
        System.Threading.Tasks.Task UpdateAsync(Task task);
        IEnumerable<Task> Get();
        System.Threading.Tasks.Task<IEnumerable<Task>> GetAsync();
    }
}
