using MakeMyBlogs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMyBlogs.Business
{
    public class CommentBusiness: BaseBusiness
    {
        public static string AddNewComment(CommentModelDTO model)
        {
            if(Convert.ToBoolean(model.UserId) && model.CommentContent.Any())
            {
                using (var context = GetMMBContext())
                {
                    var commentEntity = CommentEntity();
                    commentEntity.CommentContent = model.CommentContent;
                    commentEntity.UserId = model.UserId;
                    commentEntity.Likes = 0;
                    commentEntity.Dislikes = 0;
                    commentEntity.CreatedOn = DateTime.UtcNow;
                    commentEntity.UpdatedOn = DateTime.UtcNow;
                    commentEntity.IsRoot = model.IsComment;
                    if (model.ParentId == 0)
                    {
                        commentEntity.ParentId = null;
                    }
                    else
                    {
                        commentEntity.ParentId = model.ParentId;
                    }
                    if(commentEntity.BlogId == 0)
                    {
                        commentEntity.BlogId = null;
                    }
                    else
                    {
                       commentEntity.BlogId = model.BlogId;
                    }
                    context.Comment.Add(commentEntity);
                    context.SaveChanges();
                    return "Success";
                }
            }
            else
            {
                return "Failed";
            }
        }

        public static List<CommentsModel> LoadAllComments(int blogId)
        {
            using(var context = GetMMBContext())
            {
                var comments = context.Comment.Where(x => x.BlogId == blogId).ToList();
                var rootComments = comments.Where(x => x.IsRoot == true).ToList();
                var childComments = comments.Where(x => x.IsRoot == false).ToList();
                List<CommentsModel> commentsModel = null;
                if (comments.Any())
                {
                    commentsModel = new List<CommentsModel>();
                    foreach (var rootComment in rootComments)
                    {
                        var root = new CommentsModel();
                        root.Id = rootComment.Id;
                        root.CommentContent = rootComment.CommentContent;
                        root.UserId = rootComment.UserId;
                        root.Username = rootComment.User.Username;
                        root.Likes = rootComment.Likes;
                        root.Dislikes = rootComment.Dislikes;
                        root.CreatedOn = rootComment.CreatedOn;
                        root.UpdatedOn = rootComment.UpdatedOn;
                        root.IsRoot = rootComment.IsRoot;
                        root.Replies = null;
                        var replies = childComments.Where(x => x.ParentId == rootComment.Id).ToList();
                        if (replies.Any())
                        {
                            var childComment = new List<CommentsModel>();
                            foreach (var reply in replies)
                            {
                                var child = new CommentsModel();
                                child.Id = reply.Id;
                                child.CommentContent = reply.CommentContent;
                                child.UserId = reply.UserId;
                                child.Username = reply.User.Username;
                                child.Likes = reply.Likes;
                                child.Dislikes = reply.Dislikes;
                                child.CreatedOn = reply.CreatedOn;
                                child.UpdatedOn = reply.UpdatedOn;
                                child.IsRoot = reply.IsRoot;
                                child.Replies = null;
                                childComment.Add(child);
                            }
                            root.Replies = childComment;
                        }
                        commentsModel.Add(root);
                    }
                }
                return commentsModel;
            }
        }
    }
}