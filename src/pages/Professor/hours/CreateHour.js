import { Button } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import { v1 as uuid } from "uuid";
import { connect } from "react-redux";
import axios from "axios";

const CreateHour = (props) => {
  const createHour = async () => {
    const hourId = uuid();
    if (hourId) {
      const res = await axios.post(
        "/standard/teacher/create-virtual-hour",
        {
          hour_code: hourId,
        },
        {
          headers: {
            "auth-token": props.user.token,
          },
        }
      );
      if (res.data.success === 1) {
        props.history.push(`/join-hour/${hourId}`);
      }
    }
  };
  return (
    <div className="container">
      <Button color="secondary" onClick={createHour}>
        Creaza o ora virtuala!
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: { ...state.user },
  };
};

export default withRouter(connect(mapStateToProps)(CreateHour));
