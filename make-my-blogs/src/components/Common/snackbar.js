import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar'

class CustomSnackbar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            open: this.props.open
        }
    }
    
    static getDerivedStateFromProps(props, state){
      state.open = props.open
      return state
    }
    
    render() {
        return (
            <div>
                <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.props.handler(false)}
            message={this.props.message}
            action={
              <React.Fragment>
                <Button color="secondary" size="small" onClick={this.props.handler(false)}>
                  X
                </Button>
                 {/* <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                  <CloseIcon fontSize="small" /> 
                </IconButton>   */}
              </React.Fragment>
            }
            />
            </div>
        )
    }
}

export default CustomSnackbar
