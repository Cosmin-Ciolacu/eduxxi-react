import axios from "axios";
import * as actionTypes from "./actions";

export const fetchHomeworksSuccess = (homeworks) => {
  return {
    type: actionTypes.GET_PROFESSOR_HOMEWORKS_SUCCESS,
    homeworks: homeworks,
  };
};

export const fetchProfessorHomeworks = (token) => {
  return (dispatch) => {
    axios
      .get("/standard/teacher/get-homeworks", {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(fetchHomeworksSuccess(response.data.homeworks));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchCoursesSuccess = (courses) => {
  return {
    type: actionTypes.GET_PROFESSOR_COURSES_SUCCESS,
    courses: courses,
  };
};

export const fetchProfessorCourses = (token) => {
  return (dispatch) => {
    axios
      .get("/plus/course", {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(fetchCoursesSuccess(response.data.courses));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
