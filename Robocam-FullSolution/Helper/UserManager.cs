using Microsoft.AspNetCore.Http;
using Robocam_FullSolution.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViewModels;

namespace Robocam_FullSolution.Helper
{
    public static class UserManager
    {
        public static void SetLoggedUser(this HttpContext Context, User user)
        {
            Context.Session.Set("CurrentUser", user);
        }

        public static User GetLoggedUser(this HttpContext Context, RobocamDbContext context)
        {
            User user = Context.Session.Get<User>("CurrentUser");
            if (user != null)
            {
                //refresh data
                //make extra function to just set necessary session data to not call the database
                user = context.Users.Find(user.UserId);
            }
            return user;
        }

        public static void LogoutUser(this HttpContext Context)
        {
            Context.Session.Set("CurrentUser", null);
        }
    }
}
