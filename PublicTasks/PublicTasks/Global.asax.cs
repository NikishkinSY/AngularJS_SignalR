﻿using System;
using System.Web;
using System.Web.Mvc;

namespace PublicTasks
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
            AreaRegistration.RegisterAllAreas();
        }
    }
}