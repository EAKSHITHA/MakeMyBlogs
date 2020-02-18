using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MakeMyBlogs.Models;
using MakeMyBlogs.Common;

namespace MakeMyBlogs.Business
{
    public class AccountBusiness: BaseBusiness
    {
        internal static LoginResponseViewModel ValidateUser(LoginViewModel model)
        {
            using (var context = GetMMBContext())
            {
                //model.password = CommonFunctions.CustomEncryptString(model.password, EncryptionKey.LoginPartialEncKey);
                var userDetails = context.User.Where(r => r.Username == model.Username && r.RecordStatus == 1).ToList();
                if (userDetails.Any())
                {
                    var matchedUser = userDetails.FirstOrDefault(r => r.UserPassword == model.Password);
                    if (matchedUser != null)
                    {
                        var result = new LoginResponseViewModel
                        {
                            UserId = matchedUser.Id,
                            //DisplayName = matchedUser.Staffs.FirstOrDefault(x => x.User.Username.ToLower() == model.username.ToLower()).FirstName + " " + matchedUser.Staffs.FirstOrDefault(x => x.User.Username.ToLower() == model.username.ToLower()).LastName,
                            DisplayName = matchedUser.Username,
                            Success = true,
                            Response = ""
                        };

                        result.c = CommonFunctions.GetDefaultSessionTimeOut();
                        //result.userType = CommonFunctions.GetUserRoleNameFromRoleId(matchedUser.UserRoles.FirstOrDefault().RoleId);
                        result.LoginKey = GetEncLoginKey(matchedUser.Username, matchedUser.UserPassword, matchedUser.Id);
                        return result;
                    }
                }
            }

            return new LoginResponseViewModel
            {
                Success = false
            };
        }

        private static string GetEncLoginKey(string username, string pwd, int userId)
        {
            var newToken = CommonFunctions.CreateToken(userId, CommonFunctions.GetDefaultSessionTimeOut());
            var currentDateTime = CommonFunctions.GetCurrentDateTime();
            var loginPartial = CommonFunctions.GetKeyFormatFromDateTime(currentDateTime);
            var loginKey = Guid.NewGuid() + "|" + loginPartial + "|" + username + "|" + pwd + "|" + newToken + "|" + Guid.NewGuid();
            loginKey = CommonFunctions.CustomEncryptString(loginKey, EncryptionKey.LoginPartialEncKey);
            return loginKey;
        }

        internal static string SaveUserDetails(SignupViewModel model, bool isNewUser)
        {
            using( var context = GetMMBContext())
            {
                if (Convert.ToBoolean(model.FirstName.Length) && Convert.ToBoolean(model.Password.Length) && Convert.ToBoolean(model.Email.Length) && Convert.ToBoolean(model.Username.Length))
                {
                    if (model.Password == model.ConfirmPassword)
                    {
                        var userDetails = context.User.Where(r => r.Username == model.Username && r.Email == model.Email);
                        if (userDetails.Any())
                        {
                            return "Duplicate";
                            //username or email already exists
                        }
                        else
                        {
                            var userEntity = UserEntity();
                            userEntity.FirstName = model.FirstName;
                            userEntity.LastName = model.LastName;
                            userEntity.UserPassword = model.Password;
                            userEntity.RecordStatus = 0; //currently inactive account
                            userEntity.IsAdmin = 0;
                            userEntity.CreatedOn = DateTime.UtcNow;
                            userEntity.LastUpdatedOn = DateTime.UtcNow;
                            userEntity.ResetPasswordKey = "";
                            userEntity.Email = model.Email;
                            userEntity.Username = model.Username;
                            context.User.Add(userEntity);
                            context.SaveChanges();
                            return "Success";
                        }
                    }
                }
                else
                {
                    //all fields are not filled
                    return "KnownFailure";
                }
            }
            return "Failed";
        }
    }
}