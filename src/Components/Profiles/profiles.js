import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, IconButton, Grid, Card, CardActions, CardContent, Button, Avatar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import profileActions from '../../Redux/Profiles/profileActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  Appbar:{
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  listItems:{
    width:"80%",
    margin: '50px auto',
  },
  Avatar:{
    width: '50%',
    height: 'auto',
    margin: '0 auto'
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  card: {
      padding: theme.spacing(2)
  }
}));

const Profiles = ({history, getProfileData, userList}) => {
  const classes = useStyles();

  useEffect(() => {
    getProfileData();
  }, [])

  const viewProfileClick = (item) =>{
    history.push('/ViewProfile', {profile: item});
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.Appbar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Profiles
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Grid container spacing={5} className={classes.listItems}>
      {userList.map((item) =>{
        const {name, email, id} = item
        return(
            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.alignCenter}>
                <Card className={classes.card} >
                    <Avatar className={classes.Avatar} src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" />
                    <CardContent>
                        <Typography variant="h6">{name} </Typography> 
                        <Typography variant="subtitle1">{email}</Typography>
                    </CardContent>
                    <CardActions className={classes.alignCenter}>
                        <Button variant="contained" className={classes.btn} color="primary" onClick={() => viewProfileClick(item)}>View Profile</Button> 
                    </CardActions>
                </Card>
            </Grid>    
          )
      })}
      </Grid>
    </div>
  );
}

const mapStateToProps = state => {
    return {
        userList:state.profile.userList
    };
};

const mapDispatchToProps = profileActions;

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);