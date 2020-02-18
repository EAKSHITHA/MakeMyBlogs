import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from '../Home/Home';
import Signup from '../Accounts/signup';
import Login from '../Accounts/login';
import PageNotFound from '../Common/PageNotFound';
import Blogs from '../Blogs/blogs';
import blogPost from '../Blogs/blogPost';
import createBlog from '../User/createBlog';
import Preloader from '../Common/Preloader';

function routePage() {
    return (
        //<div>
            <Router>
                {/* <div> */}
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/Signup" component={Signup}/>
                        <Route path="/Login" component={Login}/>
                        <Route path="/Blogs" component={Blogs}/>
                        <Route path="/blogPost" component={blogPost}/>
                        <Route path="/createBlog" component={createBlog}/> 
                        <Route path="/preloader" component={Preloader}/>               
                        <Route component={PageNotFound} />
                    </Switch>
                {/* </div> */}
            </Router>
        //</div>
    )
}

export default routePage

