using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMyBlogs.Models
{
    public class CommentModelDTO
    {
        public int UserId { get; set; }
        public string CommentContent { get; set; }
        public bool IsComment { get; set; }
        public int ParentId { get; set; }
        public int BlogId { get; set; }
    }

    public class CommentsModel
    {
        public int Id { get; set; }
        public string CommentContent { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public int? Likes { get; set; }
        public int? Dislikes { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public bool IsRoot { get; set; }
        public List<CommentsModel> Replies { get; set; }
    }
}