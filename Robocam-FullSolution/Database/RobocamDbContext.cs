using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Robocam_FullSolution.Database
{
    public class RobocamDbContext : DbContext
    {
        public RobocamDbContext(DbContextOptions<RobocamDbContext> options) : base(options)
        {
        }

        public DbSet<Command> Commands { get; set; }
    }
}
