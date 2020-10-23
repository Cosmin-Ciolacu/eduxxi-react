import React from "react";
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
import { withRouter } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import Form from "react-bootstrap/Form";

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
  checked: {
    color: green[800],
  },
}));

const Homework = (props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [checked, setChecked] = React.useState(false);

  const openHomework = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendHomework = () => {
    if (file) {
      let formData = new FormData();
      formData.append("homework_id", props.homework.id);
      formData.append("files", file);
      axios
        .post("/standard/student/complete-homework/", formData, {
          headers: {
            "auth-token": props.token,
          },
        })
        .then((response) => {
          setOpen(false);
          setChecked(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const changeFile = (e) => {
    setFile(e.target.files[0]);
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
          <IconButton
            aria-label="checked"
            className={`${checked ? classes.checked : ""}`}
          >
            <CheckCircleIcon />
          </IconButton>
          <Button size="small" onClick={openHomework}>
            Vezi tema <ExpandMoreIcon />
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className="homework"
      >
        <DialogTitle id="form-dialog-title">
          {props.homework.homework_title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.homework.homework_description}
          </DialogContentText>
          <Form.File
            id={"fisier"}
            label="alege fisier"
            custom
            onChange={(e) => changeFile(e)}
            className="my-2 w-100"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={sendHomework} color="secondary">
            Incarca tema
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withRouter(Homework);
