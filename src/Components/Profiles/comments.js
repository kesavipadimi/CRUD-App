import React from 'react';
import {connect} from 'react-redux';
import { Avatar, Grid, Typography, Paper, InputBase, Divider, IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import profileActions from '../../Redux/Profiles/profileActions';

const imgLink = "https://www.oneworldplayproject.com/wp-content/uploads/2016/03/avatar-1024x1024.jpg";

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    gridItem: {
        margin: theme.spacing(2)
    },
    comment: {
        background: "#e3f2fd", 
        borderRadius: 10,
        position: "relative"
    },
    delButton: {
        position: "absolute",
        right: 0,
        top: 0
    }
  }));

const Comments = ({commentsList, addPostComment, deletePostComment, comment, updateComment}) => {
    const classes = useStyles();

  return (
     <>
      {commentsList.length > 0 && commentsList.map((item) => {
        const {name, body, id} = item;
            return(
                <>
                    <Grid item container wrap="nowrap" xs={11} spacing={4} className={classes.gridItem}>
                        <Grid item xs={3} sm={2} md={1}>
                            <Avatar src={imgLink} />
                        </Grid>
                        <Grid item className={classes.comment} xs={9} sm={10} md={11}>
                            <Typography variant="subtitle2" color="primary">{name}</Typography>
                            <IconButton className={classes.delButton} onClick={() => deletePostComment(id)}>
                                <DeleteIcon color="error" />
                            </IconButton>
                            <Typography variant="body2">{body}</Typography>
                        </Grid>
                    </Grid>
                </>)
            })}
            <Grid container item wrap="nowrap" xs={11} spacing={4} className={classes.gridItem}>
            <Grid item>
                <Avatar src={imgLink} />
            </Grid>
            <Paper className={classes.root} component="form" >
                <InputBase
                    className={classes.input}
                    placeholder="Write a comment"     
                    value={comment} 
                    onChange={(e) => updateComment(e.target.value)}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} onClick={() => {addPostComment(comment);updateComment("")}}>
                    <SendIcon />
                </IconButton>
            </Paper>
            </Grid>
        </>    
  );
}

const mapStateToProps = state => {
    return {
        commentsList: state.profile.commentsList,
        comment: state.profile.comment
    };
};

const mapDispatchToProps = profileActions;

export default connect(mapStateToProps, mapDispatchToProps)(Comments);


