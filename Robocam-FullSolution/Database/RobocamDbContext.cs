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
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId);
                entity.Property(e => e.Username).HasMaxLength(50);
                entity.Property(e => e.Email).HasMaxLength(50);
                entity.Property(e => e.PasswordHash).HasMaxLength(200);
                entity.Property(e => e.PasswordSalt).HasMaxLength(200);

                entity.HasData(new User
                {
                    UserId=1,
                    Username="Streamer",
                    Email="emir.hasagic@gmail.com",
                    PasswordHash= "/E4FQ09EcgXx8LWTjfKuJNtw6n0=",
                    PasswordSalt= "YbejCDm54OvG/p3yHVO+uQ=="
                },
                new User
                {
                    UserId=2,
                    Username = "Commander",
                    Email = "emir.hasagic@gmail.com",
                    PasswordHash = "/E4FQ09EcgXx8LWTjfKuJNtw6n0=",
                    PasswordSalt = "YbejCDm54OvG/p3yHVO+uQ=="
                });
            });
        }
    }
}
