import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

const Hours = (props) => {
  const [hours, setHours] = useState([]);
  useEffect(() => {
    axios
      .get("/standard/student/hours", {
        headers: {
          "auth-token": props.user.token,
        },
      })
      .then((res) => {
        console.log(res);
        setHours(res.data.codes);
      });
  }, []);
  const goToHour = (code) => {
    //
    props.history.push(`/join-hour/${code}`);
  };
  return (
    <div className="container">
      <ul>
        {hours.map((hour) => (
          <li onClick={() => goToHour(hour.hour_code)}>{hour.hour_code}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: { ...state.user },
  };
};

export default withRouter(connect(mapStateToProps)(Hours));
