import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { API_ENDPOINTS } from '../../_utils/utils';
import { userUtilities } from '../../_utils/user-utilities';
import { Redirect } from "react-router-dom";
import { BlogContentModel } from '../../_utils/models';
import httpService from '../../_services/http-service';
import queryString from 'query-string';
import CustomSnackbar from '../Common/snackbar';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

// const editorConfiguration = {
//     plugins: [SimpleUploadAdapter ],
//     simpleUpload: {
//         // The URL that the images are uploaded to.
//         uploadUrl: 'http://makemyblogs.me',

//         // Headers sent along with the XMLHttpRequest to the upload server.
//         headers: {
//             'X-CSRF-TOKEN': 'CSFR-Token',
//             Authorization: 'Bearer <JSON Web Token>'
//         }
//     }    
// };

export class createBlog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            blogContentModel: new BlogContentModel(),
            open: false,
            message: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    componentDidMount() {
        if (new userUtilities().isUserLoggedIn() || queryString.parse(this.props.location.search).sample === "sample") {
            var tempModel = { ...this.state.blogContentModel }
            tempModel.UserID = new userUtilities().getUserIdFromCookies();
            this.setState({
                blogContentModel: tempModel
            })
        }
        else {
            alert("Login to create your own blog.")
        }
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

    handleReset() {
        window.location.reload(true);
    }

    handleSubmit(event) {
        event.preventDefault();
        if(new userUtilities().isUserLoggedIn() && !(queryString.parse(this.props.location.search).sample === "sample")){
            if (this.state.blogContentModel.Title && this.state.blogContentModel.Body) {
                console.log(this.state.blogContentModel.UserID);
                if (this.state.blogContentModel.UserID) {
                    new httpService().postDataOuter(
                        API_ENDPOINTS.createBlog,
                        this.state.blogContentModel
                    ).then(response => {
                        console.log(response);
                        if (response.data.Status) {
                            this.setState({
                                open: true,
                                message: "Your blog created successfully."
                            })
                        }
                        this.handleReset();
                    }).catch(error => {
                        console.log(error);
                    })
                }
                else {
                    this.setState({
                        open: true,
                        message: "User not found.Login to Create post."
                    })
                }
            }
            else {
                this.setState({
                    open: true,
                    message: "Title and Body cant be blank."
                })
            }
        }
        else if(queryString.parse(this.props.location.search).sample === "sample"){
            //preview blog
            window.location("/blogPost?Id=sample");
        }
    }

    render() {
        if (new userUtilities().isUserLoggedIn() || queryString.parse(this.props.location.search).sample === "sample") {
            return (
                <div className="container-fluid App">
                    <form onSubmit={this.handleSubmit}>
                        <h2><center>Get started with your Blog!!</center></h2>
                        <CKEditor
                            // config={{ckfinder: {
                            //     // Upload the images to the server using the CKFinder QuickUpload command.
                            //     // uploadUrl: 'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
                            //     uploadUrl: API_ENDPOINTS.test
                            //   }}}
                            editor={InlineEditor}
                            //config={ editorConfiguration }
                            data="<p> Header - Consists of the Title of your blog (max 50 characters)</p>"
                            onInit={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                var tempModel = { ...this.state.blogContentModel }
                                tempModel.Title = data;
                                this.setState({
                                    blogContentModel: tempModel
                                })
                                console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                        <CKEditor
                            editor={InlineEditor}
                            data="<p> Summary - Consists of brief overview of your Blog </p>"
                            onInit={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                var tempModel = { ...this.state.blogContentModel }
                                tempModel.Summary = data;
                                this.setState({
                                    blogContentModel: tempModel
                                })
                                console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                        <CKEditor
                            editor={InlineEditor}
                            data="<p> Body - Consists of Content of your Blog </p>"
                            onInit={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                var tempModel = { ...this.state.blogContentModel }
                                tempModel.Body = data;
                                this.setState({
                                    blogContentModel: tempModel
                                })
                                console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                        <CKEditor
                            editor={InlineEditor}
                            data="<p> Footer - Consists of your closing Quotes </p>"
                            onInit={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                var tempModel = { ...this.state.blogContentModel }
                                tempModel.Footer = data;
                                this.setState({
                                    blogContentModel: tempModel
                                })
                                console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                        <div className="row">
                            <div className="col-sm-4"></div>
                            <div className="col-sm-2">
                                <button type="submit" className="btn btn-primary">Create Post</button>
                            </div>
                            <div className="col-sm-2">
                                <button type="button" onClick={this.handleReset} className="btn btn-primary">Reset Post</button>
                            </div>
                            <div className="col-sm-4"></div>
                        </div>
                    </form>
                    <CustomSnackbar open={this.state.open} message={this.state.message} handler={this.handleClose}/>
                </div>
            )
        }
        return <Redirect to='/Login' />
    }
}

export default createBlog
