import React, { Component } from 'react'
import Logo from '../../assets/Personality.jpg';
import './common.css';
import userUtilities from '../../_utils/user-utilities';

export class NavbaarUI extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
        new userUtilities().logoutUser();
    }

    render() {
        var loginLogout = null
        if (new userUtilities().isUserLoggedIn()) {
            loginLogout = <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="/Dashboard">
                        {new userUtilities().getDisplayNameFromCookies()}
                        <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                        <li><a href="/Dashboard">Dashboard</a></li>
                        <li><a href="/Blogs">My Blogs</a></li>
                        <li><a href="/createBlog">Create New Blog</a></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={this.handleClick} href="/Login">Logout</a>
                </li>
            </ul>
        }
        else {
            console.log("false")
            loginLogout = <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/Login">Login</a>
                </li>;
                            <li className="nav-item">
                    <a className="nav-link" href="/Signup">SignUp</a>
                </li>
            </ul>;
        }

        return (
            <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
                <img src={Logo} alt="logo" className="navbar-logo-img-size"></img>
                <a className="navbar-brand" href="/">Make My Blogs</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav" >
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="/Blogs">Blogs
                                <span className="caret"></span>
                            </a>
                            <ul className="dropdown-menu">
                                <li><a href="/Blogs">Featured Blogs</a></li>
                                <li><a href="/Blogs">All Blogs</a></li>
                                <li><a href="/createBlog?sample=sample">Create Sample Blog</a></li>
                            </ul>
                        </li>
                    </ul>
                    {loginLogout}
                </div>
            </nav>
        )
    }
}

export default NavbaarUI
