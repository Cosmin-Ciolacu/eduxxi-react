import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import Axios from "axios";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.default,
  },
}));

const Homeworks = (props) => {
  const classes = useStyles();
  const { homeworkId } = useParams();
  const [completedHomeworks, setCompletedHomeworks] = useState([]);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    async function getData() {
      const res = await Axios.get(
        "/standard/teacher/completed-homeworks/" + homeworkId,
        {
          headers: {
            "auth-token": props.user.token,
          },
        }
      );
      console.log(res.data);
      if (res.data.success === 1) {
        setCompletedHomeworks(res.data.completedHomeworks);
      }
    }
    getData();
  }, [homeworkId]);

  const showFiles = function (id) {
    setOpen((prevState) => !prevState);
    Axios.get("/standard/teacher/completed-homeworks-files/" + id, {
      headers: {
        "auth-token": props.user.token,
      },
    }).then((res) => {
      if (res.data.success === 1) {
        setFiles(res.data.completedFiles);
      }
    });
  };

  const homeworksData = completedHomeworks.map((homework) => (
    <ListItem onClick={() => showFiles(homework.id)}>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={homework.student_name} secondary={homework.date} />
    </ListItem>
  ));

  return (
    <div className="container">
      <div
        className={[
          "row",
          "justify-content-center",
          "align-items-center",
          "mx-0",
        ].join(" ")}
      >
        <List width="75%" className={classes.root}>
          {homeworksData}
        </List>
      </div>
      <Dialog
        open={open}
        onClose={() => {
          setOpen((prevState) => !prevState);
          setFiles([]);
        }}
      >
        <DialogTitle>Fisiere incarcate</DialogTitle>
        <DialogContent>
          <ul>
            {files.map((file) => (
              <a href={file.url}>
                <li style={{ color: "black" }}>{file.filename}</li>
              </a>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: { ...state.user },
  };
};

export default connect(mapStateToProps)(Homeworks);
