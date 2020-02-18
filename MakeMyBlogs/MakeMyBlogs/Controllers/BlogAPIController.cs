using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MakeMyBlogs.Models;
using MakeMyBlogs.Common;
using MakeMyBlogs.Business;
using static MakeMyBlogs.Common.Constants;
using System.Collections;

namespace MakeMyBlogs.Controllers
{
    public class BlogAPIController : Controller
    {
        // GET: BlogsAPI
        [HttpGet]
        public JsonResult GetAllBlogs()
        {
            try
            {
                var results = BlogBusiness.GetAllBlogs();
                var response = new ApiRespnoseWrapper { Status = ApiRespnoseStatus.Success, Results = new ArrayList() { results } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                CommonFunctions.LogDetails(ex, null);
                return CommonBusiness.GetErrorResponse();
            }
        }

        [HttpPost]
        public JsonResult GetSingleBlog(int Id)
        {
            try
            {
                var results = BlogBusiness.GetSingleBlog(Id);
                var response = new ApiRespnoseWrapper { Status = ApiRespnoseStatus.Success, Results = new ArrayList() { results } };
                return new JsonResult { Data = response};
            }
            catch (Exception ex)
            {
                CommonFunctions.LogDetails(ex, null);
                return CommonBusiness.GetErrorResponse();
            }
        }

        [HttpPost]
        public JsonResult SaveBlog(BlogContentModel model)
        {
            try
            {
                var addStatus = BlogBusiness.SaveBlog(model);
                if(addStatus == "Success")
                {
                    var response = new ApiRespnoseWrapper { Status = ApiRespnoseStatus.Success, Results = new ArrayList() { addStatus } };
                    return new JsonResult { Data = response };
                }
                else if(addStatus == "Duplicate")
                {
                    var response = new ApiRespnoseWrapper { Status = ApiRespnoseStatus.Duplicate, Results = new ArrayList() { addStatus } };
                    return new JsonResult { Data = response };
                }
                else if(addStatus == "AuthenticationFailed")
                {
                    var response = new ApiRespnoseWrapper { Status = ApiRespnoseStatus.AuthenticationFailed, Results = new ArrayList() { addStatus } };
                    return new JsonResult { Data = response };
                }
                else
                {
                    var response = new ApiRespnoseWrapper { Status = ApiRespnoseStatus.Failed, Results = new ArrayList() { addStatus } };
                    return new JsonResult { Data = response };
                }
            }
            catch (Exception ex)
            {
                CommonFunctions.LogDetails(ex, null);
                return CommonBusiness.GetErrorResponse();
            }
        }

        [HttpPost]
        public JsonResult GetFilterDataOnSearch(string searchKeyword)
        {
            try
            {
                var results = BlogBusiness.GetFilterDataOnSearch(searchKeyword);
                var response = new ApiRespnoseWrapper { Status = ApiRespnoseStatus.Success, Results = new ArrayList() { results } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                CommonFunctions.LogDetails(ex, null);
                return CommonBusiness.GetErrorResponse();
            }
        }
    }
}