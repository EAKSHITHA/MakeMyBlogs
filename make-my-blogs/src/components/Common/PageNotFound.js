import React, { Component } from 'react'

export class PageNotFound extends Component {
    render() {
        return (
            <div className="page-not-found-background-color">
                <div className="page-not-found-background-image">
                    <h3><span className="changing-text">Please</span> try blogging else where ...</h3>
                </div>
            </div>
        )
    }
}

export default PageNotFound
