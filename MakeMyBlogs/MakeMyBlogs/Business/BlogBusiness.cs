using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MakeMyBlogs.Models;
using MakeMyBlogs.Common;

namespace MakeMyBlogs.Business
{
    public class BlogBusiness: BaseBusiness 
    {
        public static List<BlogUserContentModel> GetAllBlogs()
        {
            using (var context = GetMMBContext())
            { 
                var listOfBlogs = context.Blog.Where(x => 1 == 1).ToList();
                var blogList = new List<BlogUserContentModel>();
                if (listOfBlogs.Any()) 
                {
                    foreach (var item in listOfBlogs)
                    {
                        var singleBlog = new BlogUserContentModel();
                        singleBlog.BlogID = item.Id;
                        singleBlog.UserID = item.UserId;
                        singleBlog.Username = item.User.Username;
                        singleBlog.Title = item.Title;
                        singleBlog.CreatedOn = item.CreatedOn;
                        singleBlog.UpdatedOn = item.UpdatedOn;
                        singleBlog.PostContent = item.PostContent;
                        singleBlog.Summary = item.Summary;

                        blogList.Add(singleBlog);
                    }
                }
                return blogList;
            }
        }

        public static BlogUserContentModel GetSingleBlog(int Id)
        {
            using (var context = GetMMBContext())
            {
                var requestedUserBlog = context.Blog.Where(x => x.Id == Id).FirstOrDefault();
                var userBlog = new BlogUserContentModel();
                if (requestedUserBlog != null)
                {
                    userBlog.BlogID = requestedUserBlog.Id;
                    userBlog.UserID = requestedUserBlog.UserId;
                    userBlog.Username = requestedUserBlog.User.Username;
                    userBlog.Title = requestedUserBlog.Title;
                    userBlog.CreatedOn = requestedUserBlog.CreatedOn;
                    userBlog.UpdatedOn = requestedUserBlog.UpdatedOn;
                    userBlog.PostContent = requestedUserBlog.PostContent;
                    userBlog.Summary = requestedUserBlog.Summary;
                }
                else
                {
                    //blog not present
                    userBlog = null;
                }
                return userBlog;
            }
        }
        public static string SaveBlog(BlogContentModel model)
        {
            if(Convert.ToBoolean(model.UserID) && model.Title.Any() && model.Body.Any())
            {
                using (var context = GetMMBContext())
                {
                    var userDetails = context.User.Where(x => x.Id == model.UserID && x.RecordStatus == 1);
                    if (userDetails.Any())
                    {
                        var blogTitleExists = context.Blog.Where(x => x.UserId == model.UserID && x.Title == model.Title);
                        if (blogTitleExists.Any())
                        {
                            //Title already exists
                            //duplicate
                            return "Duplicate";
                        }
                        else
                        {
                            var blogEntity = BlogEntity();
                            blogEntity.UserId = model.UserID;
                            blogEntity.Title = model.Title;
                            blogEntity.CreatedOn = DateTime.UtcNow;
                            blogEntity.UpdatedOn = DateTime.UtcNow;
                            blogEntity.PostContent = model.Body + model.Footer;
                            blogEntity.Summary = model.Summary;

                            context.Blog.Add(blogEntity);
                            context.SaveChanges();
                            return "Success";
                        }
                    }
                    else
                    {
                        //no user found.Login to create post
                        return "AuthenticationFailed";
                    }
                }
            }
            return "Failed";
        }

        public static List<BlogUserContentModel> GetFilterDataOnSearch(string searchKeyword)
        {
            if (searchKeyword != null)
            {
                using(var context = GetMMBContext())
                {
                    var listOfBlogs = context.FN_spSearchAllByFtt(searchKeyword).ToList();
                    var filteredBlogs = new List<BlogUserContentModel>();
                    if (listOfBlogs.Any())
                    {
                        foreach (var item in listOfBlogs)
                        {
                            var singleBlog = new BlogUserContentModel();
                            singleBlog.BlogID = item.Id;
                            singleBlog.UserID = item.UserId;
                            singleBlog.Username = item.User.Username;
                            singleBlog.Title = item.Title;
                            singleBlog.CreatedOn = item.CreatedOn;
                            singleBlog.UpdatedOn = item.UpdatedOn;
                            singleBlog.PostContent = item.PostContent;
                            singleBlog.Summary = item.Summary;

                            filteredBlogs.Add(singleBlog);
                        }
                    }
                    return filteredBlogs;
                }
            }
            return null;
        }
    }
}