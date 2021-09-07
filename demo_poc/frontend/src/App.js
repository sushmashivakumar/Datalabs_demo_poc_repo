
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FileUpload from './Components/FileUpload/FileUploadPage';
// import Card from './Components/Card/Card';
import Dropdown from './Components/Dropdown/Dropdown';
import Tabs from './Components/Tabs/Tabs';

// import App from '../../src/Components/Dropdown/Dropdown';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  const handleSubmit=(country, category, storeName)=>{
    console.log(country, category, storeName, 'all data');
    }

  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        <Grid xs={6} sm={3}>
          <Paper className={classes.paper}>
              <FileUpload></FileUpload>
        </Paper>
        </Grid>
        <Grid item xs={3} sm={3}>
          <Paper className={classes.paper}>
          <Dropdown handleSubmit={handleSubmit}>
         
          </Dropdown>
              </Paper>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Paper className={classes.paper}>
          <Tabs></Tabs>
          </Paper>
        </Grid>
       
      </Grid>
    </div>
  );
}

// export default App;