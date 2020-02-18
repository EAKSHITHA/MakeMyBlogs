import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import './accounts.css'
import { UserLoginDto } from '../../_utils/models'
import { API_ENDPOINTS } from '../../_utils/utils'
import userUtilities from '../../_utils/user-utilities';
import { httpService } from '../../_services/http-service';
import CustomSnackbar from '../Common/snackbar';


export class login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            message:"",
            toDashboard: new userUtilities().isUserLoggedIn(),
            userModel: new UserLoginDto()
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(event) {

        let inputName = event.target.name;
        let inputValue = event.target.value;
        let stateCopy = Object.assign({}, this.state);
        stateCopy.userModel[inputName] = inputValue;
        this.setState(stateCopy);
    }

    handleClose(value) {
        return (event,reason) => {
            this.setState({
                open: false
            });
            if (reason === 'clickaway') {
                return;
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.userModel.Username && this.state.userModel.Password) {
            new httpService().postDataOuter(
                API_ENDPOINTS.loginUrl,
                this.state.userModel,
            ).then(response => {
                console.log(response);
                console.log(response.data); //contains status, error-message, results
                console.log(response.data.Results);
                console.log(response.data.Results[0]); //userObj-cookie
                console.log(response.data.Results[0].Success);
                if (response.data.Results.length > 0) {
                    if (response.data.Results[0].Success) {
                        let cookiesSet = new userUtilities().storeLoginDataInCookies(response.data.Results[0], false);
                        if (cookiesSet) {
                            this.setState({
                                toDashboard: true,
                                open: true,
                                message: "Logged In Successfully.",
                                userModel: new UserLoginDto()
                            })
                            window.location= '/Blogs';
                        }
                    }
                    else {
                        this.setState({
                            toDashboard: false,
                            userModel: new UserLoginDto(),
                            open: true,
                            message: "Login Failed, Please check your credentials"
                        })
                    }
                }
                else {
                    this.setState({
                        toDashboard: false,
                        open: true,
                        message: "Some Error occured while processing the request.",
                        userModel: new UserLoginDto()
                    })
                }
            }
            ).catch(error => {
                console.log(error)
            }
            )
        }
        else {
            this.setState({
                open: true,
                message: "Fields cannot be left blank.",
                toDashboard: false,
                userModel: new UserLoginDto()
            })
        }
    }

    render() {

        if (this.state.toDashboard === true) {
            console.log("cookie has user data");
            return <Redirect to='/Blogs' />
        }
        else {
            console.log("cookie do not have user data");

        }
        return (
            <div className="login">
                <div>
                    <h3><span className="changing-text">Login</span> to kick start your blogging skills!!</h3>
                </div>
                <form className="login-box" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="Username">Username:</label>
                        <input type="text" name="Username" className="form-control"
                            placeholder="Enter Username" value={this.state.userModel.Username}
                            onChange={this.handleChange} id="Username" />
                    </div>
                    <div className="form-group">
                        <label for="Password">Password:</label>
                        <input type="password" name="Password" className="form-control"
                            placeholder="Enter password" value={this.state.userModel.Password}
                            onChange={this.handleChange} id="pwd" />
                    </div>
                    <div className="form-group form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" /> Remember me
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <CustomSnackbar open={this.state.open} message={this.state.message} handler={this.handleClose}/>
            </div>
        )
    }
}

export default login
