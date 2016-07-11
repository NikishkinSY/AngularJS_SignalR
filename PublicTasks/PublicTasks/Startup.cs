using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Web.Mvc;
using Domain.Concrete;
using PublicTasks.Hubs.Tasks;

[assembly: OwinStartup(typeof(PublicTasks.Startup))]

namespace PublicTasks
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // dependency injection
            GlobalHost.DependencyResolver.Register(
                typeof(TasksHub), 
                () => new TasksHub(new Repository(new AppDBContext())));

            app.MapSignalR();
        }
    }
}
