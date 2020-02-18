using MakeMyBlogs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static MakeMyBlogs.Common.Constants;

namespace MakeMyBlogs.Business
{
    public class CommonBusiness: BaseBusiness
    {
        public static System.Web.Mvc.JsonResult GetErrorResponse(string errorMessage = "")
        {
            return new System.Web.Mvc.JsonResult
            {
                Data = new ApiRespnoseWrapper
                {
                    Status = ApiRespnoseStatus.Failed,
                    ErrorMessage = errorMessage
                }
            };
        }
    }
}