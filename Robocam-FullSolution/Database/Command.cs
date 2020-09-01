using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Robocam_FullSolution.Database
{
    public class Command
    {
        public long CommandId { get; set; }
        public string Content { get; set; }
        public string Value { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
