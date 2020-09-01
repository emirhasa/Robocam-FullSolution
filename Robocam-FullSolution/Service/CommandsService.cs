using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViewModels;
using Robocam_FullSolution.Database;
using AutoMapper;
using ViewModels.Requests;

namespace Robocam_FullSolution.Service
{
    public class CommandsService : BaseGetService<CommandVM, object, Command>, ICommandsService
    {
        public CommandsService(RobocamDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task LogCommand(CommandInsertVM command)
        {
            if(command != null)
            {
                if(!string.IsNullOrEmpty(command.Content))
                {
                    await _context.Commands.AddAsync(new Command
                    {
                        Content = command.Content,
                        Value = command.Value,
                        Timestamp = DateTime.Now
                    });
                    await _context.SaveChangesAsync();
                }
            }
        }
    }
}
