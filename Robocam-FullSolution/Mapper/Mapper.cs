using AutoMapper;
using Robocam_FullSolution.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViewModels;

namespace Robocam_FullSolution.Mapper
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<CommandVM, Command>().ReverseMap();
            CreateMap<UserVM, User>().ReverseMap();
        }
    }
}
