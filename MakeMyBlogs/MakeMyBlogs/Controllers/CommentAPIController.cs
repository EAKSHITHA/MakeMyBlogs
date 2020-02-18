using MakeMyBlogs.Business;
using MakeMyBlogs.Common;
using MakeMyBlogs.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static MakeMyBlogs.Common.Constants;

namespace MakeMyBlogs.Controllers
{
    public class CommentAPIController : Controller
    {
        // GET: CommentAPI
        [HttpPost]
        public JsonResult AddNewComment(CommentModelDTO model)
        {
            try
            {
                var addStatus = CommentBusiness.AddNewComment(model);
                if(addStatus == "Success")
                {
                    var response = new ApiRespnoseWrapper { Status = ApiRespnoseStatus.Success, Results = new ArrayList() { addStatus } };
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
        public JsonResult LoadAllComments(int blogId)
        {

            try
            {
                if(blogId != 0)
                {
                    var result = CommentBusiness.LoadAllComments(blogId);
                    var response = new ApiRespnoseWrapper { Status = ApiRespnoseStatus.Success, Results = new ArrayList() { result } };
                    return new JsonResult { Data = response };
                }
                else
                {
                    var response = new ApiRespnoseWrapper { Status = ApiRespnoseStatus.Failed, Results = new ArrayList() { "No Blog found" } };
                    return new JsonResult { Data = response };
                }
            }
            catch (Exception ex)
            {
                CommonFunctions.LogDetails(ex, null);
                return CommonBusiness.GetErrorResponse();
            }
        }
    }
}