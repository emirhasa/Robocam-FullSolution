using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Robocam_FullSolution.Database;
using Robocam_FullSolution.Helper;
using Robocam_FullSolution.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViewModels;

namespace Robocam_FullSolution.Controllers
{
    public class LogController : BaseGetController<CommandVM, object>
    {
        public LogController(ICommandsService service) : base(service)
        {
        }
    }
}
