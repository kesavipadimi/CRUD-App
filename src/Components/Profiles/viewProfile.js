import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, IconButton, Drawer, Avatar, Card, Grid, CardContent, Hidden} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import RoomIcon from '@material-ui/icons/Room';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import Comments from './comments';
import profileActions from '../../Redux/Profiles/profileActions';

const imgLink = "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(6)
    },
    Avatar:{
        width: '50%',
        height: 'auto',
        margin: '30px auto'
    },
    name:{
        fontWeight: 700,
        margin: theme.spacing(1)
    },
    iconButton: {
        padding: theme.spacing(1),
    },
    detail: {
        padding: theme.spacing(1, 3),
        display: 'flex',
        fontSize: '14px'
    },
    sideBarIcons: {
        fontSize: '22px',
        marginRight: theme.spacing(1)
    }
}));  

const ViewProfile = ({getPostsData, getCommentsData, postList, location: {state}, window}) => {
    const {profile} = state || {};
    const classes = useStyles();

    useEffect(() => {
        getPostsData(profile.id);
        getCommentsData(profile.id);
    }, []);

    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <>
        <Toolbar/>
        <Avatar src={imgLink} className={classes.Avatar} />
        <Typography align='center' variant="h6" color="primary" className={classes.name}>{profile.name}</Typography>
        <Typography align='center' variant="subtitle1" color="primary" className={classes.detail}><RoomIcon className={classes.sideBarIcons} />{profile.address.city}</Typography>
        <Typography align='center' variant="subtitle1" color="primary" className={classes.detail}><EmailIcon className={classes.sideBarIcons} />{profile.email}</Typography>
        <Typography align='center' variant="subtitle1" color="primary" className={classes.detail}><PhoneIcon className={classes.sideBarIcons} />{profile.phone}</Typography>
        </>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

return (
    <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    View Profile
                </Typography>
            </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                        paper: classes.drawerPaper
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <Toolbar/>
                <Grid container spacing={10}>
                    <Grid item xs={12} md={11} lg={9}>
                        <Typography variant="h4" color="primary">Posts</Typography>
                        <Card>
                            <CardContent>
                                <Grid item container wrap="nowrap" xs={11}>
                                    <Grid item  xs={3} sm={2} md={1}>
                                        <Avatar src={imgLink} />
                                    </Grid>
                                    <Grid item xs={9} sm={10} md={11}>
                                        <Typography variant="h6" color="primary">{postList.title}</Typography>
                                        <Typography variant="subtitle1">{postList.body}</Typography>
                                    </Grid>
                                </Grid>                    
                            </CardContent>
                        </Card>
                        <Comments />
                    </Grid>      
                </Grid>
            </main>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        postList: state.profile.postList
    };
};

const mapDispatchToProps = profileActions;

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);

