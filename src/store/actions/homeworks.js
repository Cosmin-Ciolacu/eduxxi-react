import * as actionTypes from "./actions";
import axios from "axios";

export const fetchHomeworksSuccess = (homeworks) => {
  return {
    type: actionTypes.GET_HOMEWORKS_SUCCESS,
    homeworks: homeworks,
  };
};

export const fetchHomeworkSuccess = (homework) => {
  return {
    type: actionTypes.GET_HOMEWORK_SUCCESS,
    homework: homework,
  };
};

export const fetchHomeworks = (token) => {
  return (dispatch) => {
    axios
      .get("/standard/student/homeworks", {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        dispatch(fetchHomeworksSuccess(response.data.homeworks));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchHomework = (token, id) => {
  return (dispatch) => {
    axios
      .get("/plus/student/lessons/" + id, {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        console.log(response.data);
        //dispatch(fetchHomeworkSuccess(response.data.lessons));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
