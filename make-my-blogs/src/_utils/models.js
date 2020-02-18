
export class UserLoginDto {
    constructor(){
        this.Username = "";
        this.Password = "";
    }

  }

  export class UserSignupDto {
      constructor(){
        this.FirstName = "";
        this.LastName = "";
        this.Email = "";
        this.Username = "";
        this.Password = "";
        this.ConfirmPassword = "";
      }
  }

  export class BlogContentModel {
      constructor(){
        this.UserID = 0;
        this.Title = "";
        this.Summary = "";
        this.Body = "";
        this.Footer = "";
      }
  }

  export class BlogUserContentModel {
    constructor(){
      this.UserID = 0;
      this.Username = "";
      this.Title = "";
      this.CreatedOn = new Date();
      this.UpdatedOn = new Date();
      this.PostContent = new Date();
      this.Summary = "";
    }
  }

  export class CommentDto {
    constructor(){
      this.UserId = 0;
      this.CommentContent = "";
      this.IsComment = true;
      this.ParentId = 0;
      this.BlogId = 0;
    }
  }