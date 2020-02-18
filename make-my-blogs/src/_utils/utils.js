var baseApiUrl = 'http://www.makemyblogs.me';

export const API_ENDPOINTS = {
  baseApiUrlProp: baseApiUrl,
  test: baseApiUrl + '/AccountAPI/Login',
  loginUrl: baseApiUrl + '/AccountAPI/DoLogin',
  logoutUrl: baseApiUrl + '/AccountAPI/Logout',
  signupUrl: baseApiUrl + '/AccountAPI/DoSignup',
  getAllBlogs: baseApiUrl + '/BlogAPI/GetAllBlogs',
  createBlog: baseApiUrl + '/BlogAPI/SaveBlog',
  getSingleBlog: baseApiUrl + '/BlogAPI/GetSingleBlog',
  getFilterDataOnSearch: baseApiUrl + '/BlogAPI/GetFilterDataOnSearch',
  addNewComment: baseApiUrl + '/CommentAPI/AddNewComment',
  loadAllComments: baseApiUrl + '/CommentAPI/LoadAllComments'

};

export const RESPONSE_CODES = {
  successResponse: 1,
  failResponse: 2,
  authenticateFailResponse: 3,
  duplicate: 4
};

export const COOKIE_VALUES = {
  displayName: 'DisplayName',
  userId: 'UserId',
  SiteUser: 'SiteUser',
  longExpirationDate: 14,
  shortExpirationDate: 1
};

export const DATE_FORMAT = {
  ddmmyyyy: 1,
  mmddyyyy: 2,
  ddmonthshortyyyy: 3,
  monthshortddyyyy: 4,
  ddmonthfullyyyy: 5,
  monthfullddyyyy: 6
}

export class UtilFunction {

  getDateObjectFromAspDateTime(input) {
    var slicedValue = input.substring(6, input.length-2);
    return new Date(parseInt(slicedValue));
  }

  getFormattedDate(jsdate, format) {
    const monthsShort = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const monthsFull = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dd = jsdate.getDate();
    var mm = jsdate.getMonth() + 1;
    var yyyy = jsdate.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    if(format === 1){
      return dd + '/' + mm + '/' + yyyy;
    }
    else if(format === 2){
      return mm + '/' + dd + '/' + yyyy;
    }
    else if(format === 3){
      return dd + " of" + monthsShort[mm - 1] + ", " + yyyy;
    }
    else if(format === 4){
      return monthsShort[mm - 1]+ " " + dd + ", " + yyyy;
    }
    else if(format === 5){
      return dd + " of " + monthsFull[mm - 1] + ", " + yyyy;
    }
    else if(format === 6){
      return " " + monthsFull[mm - 1] + " " + dd + ", " + yyyy;
    }
  }
}




