import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UploadForm = ({ user_id, token }) => {
  const classes = useStyles();
  const [file, setFile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    const image = URL.createObjectURL(e.target.files[0]);
    setImageUrl(image);
  };
  const upload = async (e) => {
    e.preventDefault();
    if (file) {
      const fd = new FormData();
      fd.append("picture_name", file);
      const res = await axios.post("/upload-photo", fd, {
        headers: {
          "upload-token": token,
        },
      });
      if (res.data.success === 1) {
        alert("ok");
      }
    } else {
      alert("Alege-ti poza de profil");
    }
  };
  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        INCARCARE POZA DE PROFIL
      </Typography>
      <form className={classes.form} noValidate>
        {file && (
          <Avatar alt="Remy Sharp" src={imageUrl} className={classes.large} />
        )}
        <InputLabel htmlFor="upload-photo" className="mx-auto text-center">
          <input
            style={{ display: "none" }}
            id="upload-photo"
            onChange={handleChange}
            name="upload-photo"
            type="file"
          />

          <Button color="secondary" variant="contained" component="span">
            SELECTEAZA POZA DE PROFIL
          </Button>
        </InputLabel>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={upload}
        >
          incarca poza
        </Button>
      </form>
    </div>
  );
};

export default UploadForm;
