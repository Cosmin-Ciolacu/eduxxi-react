import React from "react";
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
import axios from "axios";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actions";

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

const SignIn = (props) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = (e) => {
    e.preventDefault();
    axios
      .post("/login", {
        email,
        password,
      })
      .then(function (res) {
        const { data } = res;
        if (
          data.success === 1 &&
          data.user_exists === 1 &&
          data.account_type &&
          data.token
        ) {
          props.setUser(data.token, data.account_type);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          CONECTARE
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresa de email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Parola"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            onClick={(e) => login(e)}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
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
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (token, account) =>
      dispatch({ type: actionTypes.SET_USER, token: token, account: account }),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
