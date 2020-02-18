import { Component } from 'react'
import cookie from 'react-cookies'
import { COOKIE_VALUES } from '../_utils/utils'

export class userUtilities extends Component {

    _isRememberMeChecked = false;

    isUserLoggedIn() {
        //console.log("COOKIE_VALUES.SiteUser:");
        //console.log(cookie.load(COOKIE_VALUES.SiteUser));
        if(cookie.load(COOKIE_VALUES.SiteUser) !== null && cookie.load(COOKIE_VALUES.SiteUser) !== ""
         && cookie.load(COOKIE_VALUES.SiteUser) !== undefined) {
            //console.log("cookie present")
            return true;
        }
        else {
            //console.log("cookie absent")
            return false;
        }
    }

    logoutUser() {
        // Cookie.deleteAll();
        // TODO: Move hardcoded values
        // this.cookieService.delete(COOKIE_VALUES.SiteUser, "/");
        cookie.remove(COOKIE_VALUES.SiteUser);
        return true;
    }

    storeLoginDataInCookies(userObj, isRememberMeChecked) {
        if (this.logoutUser()) {
          console.log(userObj)
          // var cookieExpiryDuration = 0;
          // if (isRememberMeChecked) {
          //   cookieExpiryDuration = COOKIE_VALUES.longExpirationDate;
          // } else {
          //   cookieExpiryDuration = COOKIE_VALUES.shortExpirationDate;
          // }
    
          // saving Remember me checkbox value for logout
          this._isRememberMeChecked = isRememberMeChecked;
    
          // Cookie.set(COOKIE_VALUES.displayName, userObj.displayName, cookieExpiryDuration);
          // Cookie.set(COOKIE_VALUES.userId, userObj.userId, cookieExpiryDuration);
          var d = new Date();
          //d.setMinutes(d.getMinutes() + userObj.c);
          d = new Date(d.getTime() + (userObj.c * 60));
          cookie.save(COOKIE_VALUES.SiteUser, JSON.stringify(userObj), 
            {
                path: '/',
                expires:d,
                maxAge:d
          })
          return true;
        } else {
          return false;
        }
    }

    renewLoginDataInCookies() {
        if (this.isUserLoggedIn()) {
    
          // saving Remember me checkbox value for logout
          this._isRememberMeChecked = false;
    
          var cookieData = cookie.load(COOKIE_VALUES.SiteUser);
    
          var d = new Date();
          //d.setMinutes(d.getMinutes() + cookieDataObj.c);
          d = new Date(d.getTime() + (cookieData.c * 60));          
          cookie.save(COOKIE_VALUES.SiteUser, cookieData, 
            {
                path: '/',
                expires:d,
                maxAge:d
          })
          return true;
        } else {
          return false;
        }
    }

    getLoginKeyFromCookies() {
        if (this.isUserLoggedIn()) {
          var cookieData = cookie.load(COOKIE_VALUES.SiteUser);
          return cookieData.LoginKey;
        }
    
        return "";
      }
    
      getUserIdFromCookies() {
        if (this.isUserLoggedIn()) {
          var cookieData = cookie.load(COOKIE_VALUES.SiteUser);
          console.log(cookieData.UserId);
          return parseInt(cookieData.UserId);
        }
        return 0;
      }
    
      getDisplayNameFromCookies() {
        if (this.isUserLoggedIn()) {
          var cookieData = cookie.load(COOKIE_VALUES.SiteUser);
          return cookieData.DisplayName;
        }
        return "";
      }
    
      static getFirstName(fullName) {
        if (fullName.indexOf(' ') < 0) {
          return fullName;
         }
        return fullName.substring(0, fullName.lastIndexOf(' ')).trim();
      }
    
      static getLastName(fullName) {
        if (fullName.indexOf(' ') < 0) {
          return '';
         }
        return fullName.substring(fullName.lastIndexOf(' ', fullName.length)).trim();
      }
    
      getC(){
        if (this.isUserLoggedIn()) {
          var cookieData = cookie.load(COOKIE_VALUES.SiteUser); 
          return parseInt(cookieData.c);
        }
    
        return 0;
      }

}

export default userUtilities
