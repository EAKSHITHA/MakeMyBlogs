import React, { Component } from 'react'
import { UserSignupDto } from '../../_utils/models'
import httpService from '../../_services/http-service';
import { API_ENDPOINTS } from '../../_utils/utils';

export class signup extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
                newUserModel: new UserSignupDto()
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        let inputName = event.target.name;
        let inputValue = event.target.value;
        let stateCopy = Object.assign({}, this.state);
        stateCopy.newUserModel[inputName] = inputValue;
        this.setState(stateCopy);
    }

    handleSubmit(event) {
        event.preventDefault();

        if(this.state.newUserModel.FirstName && this.state.newUserModel.Username && this.state.newUserModel.Email 
            && this.state.newUserModel.Password && this.state.newUserModel.ConfirmPassword) {
            if(this.state.newUserModel.Password === this.state.newUserModel.ConfirmPassword){
                alert("Passwords Match");
                new httpService().postDataOuter(
                    API_ENDPOINTS.signupUrl,
                    this.state.newUserModel
                ).then(response => {
                    console.log(response)
                    if (response.data.Results.length > 0) {
                        if (response.data.Results[0] === "Success") {
                            alert("Please verify yourself from the url sent to your Email.")
                            this.setState({
                                newUserModel: new UserSignupDto()
                            })
                        }
                        else {
                            alert(response.data.ErrorMessage)
                            this.setState({
                                newUserModel: new UserSignupDto()
                            })
                        }
                    }
                    else {
                        alert("Some Error occured while processing the request.")
                        this.setState({
                            newUserModel: new UserSignupDto()
                        })
                    }
                }
                ).catch(error => {
                    console.log(error)
                }
                )
            }
            else{
                alert("Passwords Did not Match");
                var tempModel = {...this.state.newUserModel}
                tempModel.Password = "";
                tempModel.ConfirmPassword = "";
                this.setState({
                    newUserModel: tempModel
                })
            }
        }
        else {
            alert("Fields cannot be empty.")
        }
    }

    render() {
        return (
            <div className="signup">
                <div>
                    <h3><span className="changing-text">Sign Up</span> to kick start your blogging skills!!</h3>
                </div>
                <form className="signup-box" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="Firstname">First Name:</label>
                        <input type="text" name="FirstName" className="form-control" 
                        placeholder="Enter your first name" id="Firstname" required 
                        value={this.state.newUserModel.FirstName}
                        onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label for="LastName">Last Name:</label>
                        <input type="text" name="LastName" className="form-control"
                         placeholder="Enter your last name" id="LastName" 
                         value={this.state.newUserModel.LastName}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label for="Email">Email address:</label>
                        <input type="email" name="Email" className="form-control" 
                        placeholder="Enter email" id="Email" required
                        value={this.state.newUserModel.Email}
                        onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label for="Username">Username:</label>
                        <input type="text" name="Username" className="form-control" 
                        placeholder="Enter username" id="Username" required
                        value={this.state.newUserModel.Username}
                        onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label for="Password">Password:</label>
                        <input type="Password" name="Password" className="form-control" 
                        placeholder="Enter password" id="Password" required
                        value={this.state.newUserModel.Password}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label for="ConfirmPassword">Confirm Password:</label>
                        <input type="password" name="ConfirmPassword" className="form-control" 
                        placeholder="Re-enter your password" id="ConfirmPassword" required
                        value={this.state.newUserModel.ConfirmPassword}
                        onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">SignUp</button>
                </form>
            </div>
        )
    }
}

export default signup
