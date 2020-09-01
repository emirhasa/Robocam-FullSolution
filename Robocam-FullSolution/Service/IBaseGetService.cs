using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Robocam_FullSolution.Service
{
    public interface IBaseGetService<TModel, TSearch>
    {
        List<TModel> Get(TSearch search);
        TModel GetById(int id);
    }
}
