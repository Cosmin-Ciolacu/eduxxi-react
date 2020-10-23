import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { withRouter } from "react-router-dom";
import * as actionTypes from "../../../../store/actions/actions";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  heart: {
    color: red[500],
  },
}));

const Course = (props) => {
  const classes = useStyles();

  const [is_favorite, set_is_favorite] = useState(false);

  const openCourse = () => {
    props.fetchCourse(props.token, props.course.id);
    props.setCourse(props.course.course_name, props.course.discipline);
    props.history.push("/student/course");
  };

  const setFavorite = () => {
    axios
      .post(
        "/plus/student/set-favorite",
        { course_id: props.course.id },
        {
          headers: {
            "auth-token": props.token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        set_is_favorite(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="course col-lg-4 col-md-4 col-sm-6 col-12">
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.course.course_name.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.course.course_name}
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.course.discipline}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={setFavorite}
            className={`${
              is_favorite || props.course.is_favorite ? classes.heart : ""
            }`}
          >
            <FavoriteIcon />
          </IconButton>
          <Button size="small" onClick={openCourse}>
            Vezi curs <ExpandMoreIcon />
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourse: (token, id) => dispatch(actions.fetchCourse(token, id)),
    setCourse: (title, description) =>
      dispatch({
        type: actionTypes.SET_SELECTED_COURSE,
        title: title,
        description: description,
      }),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Course));
