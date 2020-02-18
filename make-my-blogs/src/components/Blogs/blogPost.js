import React, { Component } from 'react'
import userUtilities from '../../_utils/user-utilities'
import { Redirect } from "react-router-dom";
import queryString from 'query-string';
import httpService from '../../_services/http-service';
import { API_ENDPOINTS, UtilFunction, DATE_FORMAT } from '../../_utils/utils';
import { CommentDto } from '../../_utils/models';
import CustomSnackbar from '../Common/snackbar';
import Preloader from '../Common/Preloader';

export class blogPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            blog: {},
            comment: "",
            reply: "",
            commentsList: [],
            open: false,
            message:""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

    loadComments(BlogId){
        console.log(BlogId)
        new httpService().postDataOuter(
            API_ENDPOINTS.loadAllComments,
            { blogId: BlogId }
        ).then(response =>{
            if(response.data.Results[0]){
                this.setState({
                    commentsList: response.data.Results[0]
                })
            }
            else{
                this.setState({
                    open: true,
                    message: "No Comments",
                    blogId: 0
                })
            }
        }).catch(error => 
            console.log(error))
    }

    componentDidMount() {
        if (new userUtilities().isUserLoggedIn()) {
            const values = queryString.parse(this.props.location.search)
            console.log(values.Id)
            
            this.setState({
                blogId: values.Id
            })
            new httpService().postDataOuter(
                API_ENDPOINTS.getSingleBlog,
                { Id: values.Id }
                // {
                //     params: {
                //       Id: values.Id,
                //     }
                // }
            ).then(response => {
                this.setState({
                    blog: response.data.Results[0]
                });
            }).catch(error =>
                console.log(error))
            this.loadComments(values.Id);
        }
    }

    handleSubmit(isComment, parentId){
        return event => {
            event.preventDefault();
            if(this.state.comment !== null && this.state.comment !== ""){
                var model = new CommentDto();
                model.UserId = this.state.blog.UserID;
                model.CommentContent = this.state.comment;
                model.IsComment = isComment;
                model.ParentId = parentId;
                model.BlogId = this.state.blogId;
                new httpService().postDataOuter(
                    API_ENDPOINTS.addNewComment,
                    model
                ).then(response => {
                    if(response.data.Results[0] === "Success"){
                        this.setState({
                            comment:"",
                            open: true,
                            message: "Comment added"
                        })
                        this.loadComments(this.state.blogId);
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
            else{
                this.setState({
                    open: true,
                    message: "Please put some comment before submitting."
                })
            }
        }

        
    }

    handleChange(event){
        this.setState({comment: event.target.value});
    }

    render() {
        if (new userUtilities().isUserLoggedIn()) {
            const blog = this.state.blog
            const commentsList = this.state.commentsList
            return (
                <div className="container">
                    <div className="row">                        
                        {/* Post Content Column */}
                        <div className="col-sm-8 blog-post">

                            {/* Title */}
                            <h1 className="mt-4"><span dangerouslySetInnerHTML={{ __html: blog.Title }}></span></h1>

                            {/* Author */}
                            <p className="lead">by <a href="/"><span dangerouslySetInnerHTML={{ __html: blog.Username }}></span></a>
                            </p>
                            <hr></hr>

                            {/* Date/Time */}
                            {/* <p>Posted on January 21, 2020 at 12:45 PM</p> */}
                            <p>
                                <span dangerouslySetInnerHTML={{
                                    __html: blog.UpdatedOn
                                        // new UtilFunction().getFormattedDate(
                                        //     new UtilFunction().getDateObjectFromAspDateTime(blog.UpdatedOn),
                                        //     DATE_FORMAT.monthfullddyyyy)
                                }}>
                                </span>
                            </p>
                            <hr></hr>

                            {/* Preview Image */}
                            <img className="img-fluid rounded" src="http://placehold.it/900x300" alt=""></img>
                            <hr></hr>

                            {/* Post Content */}
                            {/* <p className="lead">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, doloribus, dolorem iusto blanditiis unde eius illum consequuntur neque dicta incidunt ullam ea hic porro optio ratione repellat perspiciatis. Enim, iure!
                            </p>
                            <blockquote className="blockquote">
                                <p className="mb-0">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                                </p>
                                <footer className="blockquote-footer">
                                    "Someone famous in"<cite title="Source Title"> Source Title</cite>
                                </footer>
                            </blockquote>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nostrum, aliquid, animi, ut quas placeat totam sunt tempora commodi nihil ullam alias modi dicta saepe minima ab quo voluptatem obcaecati?
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, dolor quis. Sunt, ut, explicabo, aliquam tenetur ratione tempore quidem voluptates cupiditate voluptas illo saepe quaerat numquam recusandae? Qui, necessitatibus, est!
                            </p> */}
                            <p>
                                <span dangerouslySetInnerHTML={{ __html: blog.PostContent }}></span>
                            </p>
                            <hr></hr>

                            {/* Comments Form */}
                            <div className="card my-4">
                                <h5 className="card-header">Leave a Comment:</h5>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <textarea className="form-control" value={this.state.comment} onChange={this.handleChange} rows="3"></textarea>
                                        </div>
                                        <button type="submit" onClick={this.handleSubmit(true,null)} className="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>


                            {/* Comments with nested comments */}
                            <button type="button" className="btn btn-primary" data-toggle="collapse" data-target="#comments">View Previous Comments</button>
                            <br></br>
                            <div id="comments" className="collapse">
                            {
                            commentsList.length ?
                            commentsList.map(comment =>
                            <div className="media mb-4">
                                <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="" />
                                <div className="media-body">
                                    <h5 className="mt-0"><span dangerouslySetInnerHTML={{ __html: comment.Username}}></span></h5>
                                    <span dangerouslySetInnerHTML={{ __html: comment.CommentContent}}></span>
  
                                    <button type="button" className="btn btn-sm btn-primary" data-toggle="collapse" data-target={"#replies" + comment.Id}>View Replies</button>
                                    <button type="button" data-toggle="collapse" data-target={"#replyBox" + comment.Id} className="btn btn-sm btn-primary">Reply</button>

                                    <div id={"replies" + comment.Id} className="collapse">
                                    { comment.Replies != null ?
                                    comment.Replies.map(reply =>
                                        <div className="media mt-4">
                                            <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="" />
                                            <div className="media-body">
                                                <h5 className="mt-0"><span dangerouslySetInnerHTML={{ __html: reply.Username}}></span></h5>
                                                <span dangerouslySetInnerHTML={{ __html: reply.CommentContent}}></span>
                                            </div>
                                        </div>
                                        ) :
                                        null
                                    }
                                    </div>
                                    
                                    { /* Reply Form */}
                                    <div id={"replyBox" + comment.Id}>
                                        <div className="card my-4">
                                        <h5 className="card-header">Leave a Reply:</h5>
                                        <div className="card-body">
                                            <form>
                                                <div className="form-group">
                                                    <textarea className="form-control" value={this.state.comment} onChange={this.handleChange} rows="3"></textarea>
                                                </div>
                                                <button type="submit" onClick={this.handleSubmit(false, comment.Id)} className="btn btn-primary">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                                ) :
                                null    
                            }
                            </div>

                        </div>

                        {/* Filters Column */}
                        <div className="col-sm-4 filters">

                            {/* Search Widget */}
                            <div className="card my-4">
                                <h5 className="card-header">Search</h5>
                                <div className="card-body">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Search for..." />
                                        <span className="input-group-btn">
                                            <button className="btn btn-primary" type="button">Go!</button>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Categories Widget */}
                            <div className="card my-4">
                                <h5 className="card-header">Categories</h5>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <ul className="list-unstyled mb-0">
                                                <li>
                                                    <a href="/">Fasion</a>
                                                </li>
                                                <li>
                                                    <a href="/">Food</a>
                                                </li>
                                                <li>
                                                    <a href="/">Travel</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6">
                                            <ul className="list-unstyled mb-0">
                                                <li>
                                                    <a href="/">Music</a>
                                                </li>
                                                <li>
                                                    <a href="/">Lifestyle</a>
                                                </li>
                                                <li>
                                                    <a href="/">Fitness</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Side Widget */}
                            <div className="card my-4">
                                <h5 className="card-header">Side Widget</h5>
                                <div className="card-body">
                                    You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!
                                </div>
                            </div>

                        </div>
                    </div>
                    <CustomSnackbar open={this.state.open} message={this.state.message} handler={this.handleClose}/>
                </div>
            )
        }
        return <Redirect to='/Login' />
    }
}

export default blogPost
