using System.Collections.Generic;

namespace CourseWork.Support
{
    public class LogSupport
    {
        public string GetCurrentTime()
        {
            return DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss.fff");
        }
    }
}