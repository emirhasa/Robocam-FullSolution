using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Robocam_FullSolution.Exceptions
{
    public class UserException : Exception
    {
        public UserException(string message) :
             base(message)
        {

        }
    }
}
