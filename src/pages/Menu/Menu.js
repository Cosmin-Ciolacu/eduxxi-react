import React from "react";
import MenuItem from "./MenuItem/MenuItem";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import "./Menu.scss";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Menu = (props) => {
  let items = (
    <div>
      <Button color="inherit">
        <MenuItem link="/signin">Conectare</MenuItem>
      </Button>
      <Button color="inherit">
        <MenuItem link="/signup">Înregistrare</MenuItem>
      </Button>
    </div>
  );

  if (props.user.token !== null) {
    if (props.user.accountType === "profesor") {
      items = (
        <div>
          <Button color="inherit">
            <MenuItem link="/">Teme</MenuItem>
          </Button>
          <Button color="inherit">
            <MenuItem link="/plus">Cursuri</MenuItem>
          </Button>
          <Button color="inherit">
            <MenuItem link="/create-hour">Ore</MenuItem>
          </Button>
        </div>
      );
    } else {
      items = (
        <div>
          <Button color="inherit">
            <MenuItem link="/student/homeworks">Temele mele</MenuItem>
          </Button>
          <Button color="inherit">
            <MenuItem link="/student/courses">Cursurile mele</MenuItem>
          </Button>
          <Button color="inherit">
            <MenuItem link="/student/hours">Orele mele</MenuItem>
          </Button>
          <Button color="inherit">
            <MenuItem link="/student/courses/favorites">
              <FavoriteIcon />
            </MenuItem>
          </Button>
        </div>
      );
    }
  }

  return (
    <AppBar position="static">
      <Toolbar className="row justify-content-between align-items-center">
        <img src={require("../../images/logo_edu.png")} height="30px" />
        {items}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    user: { ...state.user },
  };
};

export default connect(mapStateToProps)(Menu);
