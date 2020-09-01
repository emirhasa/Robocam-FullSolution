using System;

namespace ViewModels
{
    public class CommandVM
    {
        public long CommandId { get; set; }
        public string Content { get; set; }
        public string Value { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
