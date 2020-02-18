using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMyBlogs.Models
{
    public class LoginViewModel
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class LoginResponseViewModel
    {
        public string LoginKey { get; set; }
        public int UserId { get; set; }
        public string DisplayName { get; set; }
        public bool Success { get; set; }
        public string Response { get; set; }
        public string UserType { get; set; }
        public int c { get; set; }
    }

    public class SignupViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}