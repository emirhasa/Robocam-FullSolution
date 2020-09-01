using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViewModels;
using ViewModels.Requests;

namespace Robocam_FullSolution.Service
{
    public interface ICommandsService : IBaseGetService<CommandVM, object>
    {
        Task LogCommand(CommandInsertVM command);
    }
}
