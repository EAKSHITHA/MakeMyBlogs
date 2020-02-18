using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMyBlogs.Models
{
    public class BlogContentModel
    {
        public int UserID { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Body { get; set; }
        public string Footer { get; set; }
    }

    public class BlogUserContentModel
    {
        public int BlogID { get; set; }
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Title { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string PostContent { get; set; }
        public string Summary { get; set; }
    }
}