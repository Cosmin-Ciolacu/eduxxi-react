import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CreateHomework = (props) => {
  const classes = useStyles();
  const [homework_title, setHomeworkTitle] = useState("");
  const [homework_description, setHomeworkDescription] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [clasa, setClasa] = useState("");
  const [files, setFiles] = useState([]);
  const createHomework = async (e) => {
    e.preventDefault();
    if (homework_title && homework_description && discipline && clasa) {
      // send request
      const fd = new FormData();
      fd.append("homework_title", homework_title);
      fd.append("homework_description", homework_description);
      fd.append("discipline", discipline);
      fd.append("clasa", clasa);
      if (files.length > 0) {
        fd.append("files", files);
      }

      const res = await axios.post("/standard/teacher/add-homework", fd, {
        headers: {
          "auth-token": props.user.token,
        },
      });
      console.log(res);
    } else {
      alert("Completati campurile");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          CREAȚI O TEMĂ
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="homework-title"
            label="Titlu temă"
            name="homework-title"
            onChange={(e) => setHomeworkTitle(e.target.value)}
            value={homework_title}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="homework-description"
            label="Descriere Temă"
            onChange={(e) => setHomeworkDescription(e.target.value)}
            value={homework_description}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="homework-discipline"
            label="Selectează materia dorită"
            onChange={(e) => setDiscipline(e.target.value)}
            value={discipline}
          />
          <InputLabel>Selecteaza Clasa</InputLabel>
          <Select onChange={(e) => setClasa(e.target.value)} value={clasa}>
            <MenuItem value={""}>Selecteaza clasa</MenuItem>
            <MenuItem value={"1"}>a I-a</MenuItem>
            <MenuItem value={"2"}>a II-a</MenuItem>
            <MenuItem value={"3"}>a III-a</MenuItem>
            <MenuItem value={"4"}>a IV-a</MenuItem>
            <MenuItem value={"5"}>a V-a</MenuItem>
            <MenuItem value={"6"}>a VI-a</MenuItem>
            <MenuItem value={"7"}>a VII-a</MenuItem>
            <MenuItem value={"8"}>a VIII-a</MenuItem>
            <MenuItem value={"9"}>a IX-a</MenuItem>
            <MenuItem value={"10"}>a X-a</MenuItem>
            <MenuItem value={"11"}>a XI-a</MenuItem>
            <MenuItem value={"12"}>a XII-a</MenuItem>
          </Select>
          <InputLabel htmlFor="files">
            SELECTEAZĂ FIȘERE PENTRU TEMĂ(OPȚIONAL)
          </InputLabel>
          <Form.File
            id="files"
            label="alege fisier"
            custom
            onChange={(e) => setFiles(e.target.files)}
            className="my-2"
          />
          <Button
            type="submit"
            fullWidth
            onClick={(e) => createHomework(e)}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            CREAȚI TEMA
          </Button>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    user: { ...state.user },
  };
};

export default connect(mapStateToProps)(CreateHomework);
