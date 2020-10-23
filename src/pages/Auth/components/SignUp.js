import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from "axios";
import UploadForm from "./UploadForm";

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

const SignUp = (props) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account_type, setAccountType] = useState("");
  const [clasa, setClasa] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [user_id, setUserId] = useState(null);
  const [token, setToken] = useState("");

  const register = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !account_type) {
      alert("Completati Campurile");
    } else {
      try {
        const res = await axios.post("/register", {
          username,
          email,
          password,
          account_type,
          clasa,
        });
        if (res.data.success === 1) {
          setShowUpload(true);
          setUserId(res.data.user_id);
          setToken(res.data.token);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const registerForm = (
    <>
      {" "}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          INREGISTRARE
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nume de utilizator"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <InputLabel>Tip Cont</InputLabel>
          <Select
            onChange={(e) => setAccountType(e.target.value)}
            value={account_type}
          >
            <MenuItem value={""}>Tip cont</MenuItem>
            <MenuItem value={"elev"}>Elev</MenuItem>
            <MenuItem value={"profesor"}>Profesor</MenuItem>
          </Select>
          <br />
          {account_type === "elev" ? (
            <>
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
            </>
          ) : null}
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={register}
          >
            Creare Cont
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );

  return (
    <Container component="main" maxWidth="xs">
      {showUpload ? (
        <UploadForm user_id={user_id} token={token} />
      ) : (
        registerForm
      )}
    </Container>
  );
};

export default SignUp;
