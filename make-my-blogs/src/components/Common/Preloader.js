import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     '& > * + *': {
//       marginLeft: theme.spacing(2),
//       position: 'relative',
//     },
//   },
// }));

function Preloader() {
  //const classes = useStyles();

  return (
    <div className="preloader-outer-div" id="upperdiv">
     {/* <div className={classes.root}> */}
      {/* <CircularProgress /> */}
      <CircularProgress color="secondary" className="preloader-position" id="preloader" />
    </div>
  );
}

export default Preloader
