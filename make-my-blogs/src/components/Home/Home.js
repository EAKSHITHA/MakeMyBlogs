import React, { Component } from 'react'
import './home.css';

const textArray = ['Ideate', 'Create' , 'Innovate'];

export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             textId: 0
        }
    }

    componentDidMount() {
        this.timeout = setInterval(() => {
            let currentId = this.state.textId;
            if(currentId < textArray.length-1) {
                this.setState({ textId: currentId + 1 });
            }
            else {
                this.setState({ textId : 0 });
            }
        }, 3000);
    }

     componentWillUnmount() {
         clearInterval(this.timeout);
     }
    
    render() {
        let textThatChanges = textArray[this.state.textId];

        return (
            <div>
               <div className="tagLine">
                <h1>
                    <span className="changing-text">{ textThatChanges }</span> your own Blog
                </h1>
               </div>
            </div>
        )
    }
}

export default Home
