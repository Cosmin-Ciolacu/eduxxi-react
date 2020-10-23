import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red, green } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { fetchHomeworksSuccess } from "../../../../store/actions/homeworks";

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
}));

const Homework = (props) => {
  const classes = useStyles();

  const getHomeworks = (id) => {
    //props.history.push(`/homewok/${id}`);
  };

  return (
    <div className="Homework col-lg-4 col-md-4 col-sm-6 col-12">
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.homework.homework_title.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.homework.homework_title}
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.homework.homework_description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Link to={"/student-homework/" + props.homework.id}>
            <Button size="small">
              Vezi rezolvarile la tema <ExpandMoreIcon />
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};

export default withRouter(Homework);