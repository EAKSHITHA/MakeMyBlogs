using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MakeMyBlogs.Entities;

namespace MakeMyBlogs.Business
{
    public class BaseBusiness
    {
        internal static MakeMyBlogsEntities GetMMBContext()
        {
            return new MakeMyBlogsEntities();
        }

        internal static User UserEntity()
        {
            return new User();
        }

        internal static Blog BlogEntity()
        {
            return new Blog();
        }

        internal static Token TokenEntity()
        {
            return new Token();
        }

        internal static Comment CommentEntity()
        {
            return new Comment();
        }
    }
}