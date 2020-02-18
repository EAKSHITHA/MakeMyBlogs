import React, { Component } from 'react'
import { API_ENDPOINTS, UtilFunction, DATE_FORMAT } from '../../_utils/utils'
import httpService from '../../_services/http-service';

export class blogs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            blogs: [],
            searchKeyword:""
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        new httpService().getDataOuter(
            API_ENDPOINTS.getAllBlogs
        ).then(response => {
            this.setState({
                blogs: response.data.Results[0]
            });
        }).catch(error =>
            console.log(error))
    }

    handleSearch(event){
        event.preventDefault();
        if(this.state.searchKeyword){
            new httpService().postDataOuter(
                API_ENDPOINTS.getFilterDataOnSearch,
                {
                    searchKeyword: this.state.searchKeyword
                }
            ).then(response => {
                this.setState({
                    blogs: response.data.Results[0]
                });
            }).catch(error => {
                console.log(error)
            })
        }
    }

    handleChange(event) {

        let inputName = event.target.name;
        let inputValue = event.target.value;
        let stateCopy = Object.assign({}, this.state);
        stateCopy.searchKeyword = inputValue;
        this.setState(stateCopy);
    }

    render() {
        const { blogs } = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 blog-list">

                        <h1 >Featured Posts,
                            <small> revive your skills</small>
                        </h1>

                        {/* Blog Posts on loop  */}
                        {
                            blogs.length ?
                                blogs.map(blog =>

                                    // Blog Post
                                    <div className="card mb-4">    
                                        <img className="card-img-top" src="http://placehold.it/750x300" alt="Card cap" />
                                        <div className="card-body">
                                            <h2 className="card-title"><span dangerouslySetInnerHTML={{ __html: blog.Title}}></span></h2>
                                            <p className="card-text"><span dangerouslySetInnerHTML={{ __html: blog.Summary}}></span></p>
                                            <a href={"/blogPost?Id=" + blog.BlogID} className="btn btn-primary">Read More &rarr;</a>
                                        </div>
                                        <div className="card-footer text-muted">Posted on 
                                            <span dangerouslySetInnerHTML={{ __html: 
                                                new UtilFunction().getFormattedDate(
                                                    new UtilFunction().getDateObjectFromAspDateTime(blog.UpdatedOn),
                                                     DATE_FORMAT.monthfullddyyyy) }}>
                                            </span> by <a href="/"><span dangerouslySetInnerHTML={{ __html: blog.Username}}></span></a>
                                        </div>
                                    </div>
                                ) :
                                null
                        }

                        {/* Paginator */}
                        <ul className="pagination justify-content-center mb-4">
                            <li className="page-item">
                                <a className="page-link" href="/">&larr; Older</a>
                            </li>
                            <li className="page-item disabled">
                                <a className="page-link" href="/">Newer &rarr;</a>
                            </li>
                        </ul>

                    </div>
                    <div className="col-sm-4 filters">

                        {/* Search Widget */}
                        <div className="card my-4">
                            <h5 className="card-header">Search</h5>
                            <div className="card-body">
                                <div className="input-group">
                                    <input type="text" name="searchKeyword" value={this.state.searchKeyword} onChange={this.handleChange} className="form-control" placeholder="Search for..." />
                                    <span className="input-group-btn">
                                        <button className="btn btn-primary" onClick={this.handleSearch} type="button">Go!</button>
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
            </div>
        )
    }
}

export default blogs
