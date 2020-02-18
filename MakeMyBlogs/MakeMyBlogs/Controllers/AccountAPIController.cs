using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MakeMyBlogs.Models;
using MakeMyBlogs.Business;
using static MakeMyBlogs.Common.Constants;
using System.Collections;
using MakeMyBlogs.Common;

namespace MakeMyBlogs.Controllers
{
    public class AccountAPIController : Controller
    {
        [HttpGet]
        public string Login()
        {
            return "hello";
        }

        // GET: AccountAPI
        [HttpPost]
        public JsonResult DoLogin(LoginViewModel model)
        {
            try 
            {
                var result = AccountBusiness.ValidateUser(model);
                var response = new ApiRespnoseWrapper { Status = ApiRespnoseStatus.Success, Results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                CommonFunctions.LogDetails(ex, null);
                return CommonBusiness.GetErrorResponse();
            }
        }

        [HttpPost]

        public JsonResult DoSignup(SignupViewModel model)
        {
            try
            {
                var result = AccountBusiness.SaveUserDetails(model, true);
                if(result == "Duplicate")
                {
                    var response = new ApiRespnoseWrapper { Status = ApiRespnoseStatus.Duplicate, ErrorMessage = "Username and Email already exists", Results = new ArrayList() { result } };
                    return new JsonResult { Data = response };
                }
                else if(result == "KnownFailure")
                {
                    var response = new ApiRespnoseWrapper { Status = ApiRespnoseStatus.Failed, ErrorMessage = "Fields cannpot be empty.", Results = new ArrayList() { result } };
                    return new JsonResult { Data = response };
                }
                else if(result == "Success")
                {
                    var response = new ApiRespnoseWrapper { Status = ApiRespnoseStatus.Success, Results = new ArrayList() { result } };
                    return new JsonResult { Data = response };
                }
                else
                {
                    var response = new ApiRespnoseWrapper { Status = ApiRespnoseStatus.Failed, Results = new ArrayList() { result } };
                    return new JsonResult { Data = response };
                }

            }
            catch(Exception ex)
            {
                CommonFunctions.LogDetails(ex, null);
                return CommonBusiness.GetErrorResponse();
            }
        }
    }
}