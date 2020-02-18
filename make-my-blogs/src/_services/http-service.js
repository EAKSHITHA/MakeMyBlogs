import React, { Component } from 'react'
import Axios from 'axios'
import userUtilities from '../_utils/user-utilities'
import { RESPONSE_CODES } from '../_utils/utils'
import { Redirect } from "react-router-dom"
//comment
export class httpService extends Component {

    openLoader(){
        document.getElementById("upperdiv").style.display = 'block';
    }
    closeLoader(){
        document.getElementById("upperdiv").style.display = 'none';
    }
    async postDataInner(url, data, authenticaitonNeeded) {
        if (authenticaitonNeeded && new userUtilities().isUserLoggedIn()) {
            if (data == null) {
              data = {};
            }
            this.openLoader();
            var response = await Axios.post(url, data);
            this.closeLoader();
            return response;
        }
      
        if (data == null) {
            this.openLoader();
            var response = await Axios.post(url, data);
            this.closeLoader();
        }
        this.openLoader();
        var response = await Axios.post(url, data);
        this.closeLoader();
        //console.log(response);
        return response;
    }

    postDataOuter(url, data) {
        return this.postDataInner(url, data, true).then(response => {          
            if (response.data && response.data.Status === RESPONSE_CODES.successResponse) {
                // success.Response
                return response;
            } 
            else if (response.data && response.data.Status === RESPONSE_CODES.authenticateFailResponse) {
                // authenticaiton failed
                alert("User not found. Login to save your changes.")
                return <Redirect to='/Login' />
            } 
            else if(response.data && response.data.Status === RESPONSE_CODES.duplicate){
                //duplicate data
                alert("Duplicate Data entered. Retry again");
            }
            else {
                // fail.Response
                //console.log(response.data);
                if (response.data.ErrorMessage !== null && response.data.ErrorMessage !== '' 
                && response.data.ErrorMessage !== undefined) {
                    //TODO: snackbar
                    alert(response.data.ErrorMessage);
                } 
                else {
                    //TODO: Snackbar
                    alert("Error occurred while processing the request");
                }
                return;
            }
        });
    }

    async getDataInner(url) {
      
        this.openLoader();
        var response = await Axios.get(url);
        //console.log(response);
        this.closeLoader();
        return response;
    }

    getDataOuter(url) {
        return this.getDataInner(url).then(response => {
            //console.log(response);
            if (response.data && response.data.Status === RESPONSE_CODES.successResponse) {
                // success.Response
                return response;
            } 
            else if (response.data && response.data.Status === RESPONSE_CODES.authenticateFailResponse) {
                // authenticaiton failed
                return <Redirect to='/Login' />
            } 
            else {
                // fail.Response
                //console.log(response.data);
                if (response.data.ErrorMessage !== null && response.data.ErrorMessage !== '' 
                && response.data.ErrorMessage !== undefined) {
                    //TODO: snackbar
                    console.log(response.data.ErrorMessage);
                } 
                else {
                    //TODO: Snackbar
                    console.log("Error occurred while processing the request");
                }
                return response;
            }
        });
    }
}

export default httpService
