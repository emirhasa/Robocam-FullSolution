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
