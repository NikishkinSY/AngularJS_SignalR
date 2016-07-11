using Domain.Entities;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Domain.Concrete
{
    public interface IContext
    {
        ConcurrentBag<Task> Tasks { get; }
    }
}
