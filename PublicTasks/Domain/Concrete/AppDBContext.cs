using Domain.Entities;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace Domain.Concrete
{
    //will work in 1 domain only, for test
    //here you can plug DBContext if needed
    public class AppDBContext: IContext
    {
        private static ConcurrentBag<Task> _tasks { get; set; } = new ConcurrentBag<Task>();
        
        public ConcurrentBag<Task> Tasks
        {
            get { return AppDBContext._tasks; }
        }
    }
}
