import * as actionTypes from "./actions";
import axios from "axios";

export const fetchCoursesSuccess = (courses) => {
  return {
    type: actionTypes.GET_COURSES_SUCCESS,
    courses: courses,
  };
};

export const fetchCoursesFavoriteSuccess = (courses) => {
  return {
    type: actionTypes.GET_COURSES_FAVORITE_SUCCESS,
    courses: courses,
  };
};

export const fetchCourseSuccess = (course) => {
  return {
    type: actionTypes.GET_COURSE_SUCCESS,
    course: course,
  };
};

export const fetchCourses = (token) => {
  return (dispatch) => {
    axios
      .get("/plus/student/courses", {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        const fetchData = [];
        for (let key in response.data.courses) {
          fetchData.push({ ...response.data.courses[key] });
        }
        dispatch(fetchCoursesSuccess(fetchData));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchFavoriteCourses = (token) => {
  return (dispatch) => {
    axios
      .get("/plus/student/favorites", {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        const fetchData = [];
        for (let key in response.data.courses) {
          fetchData.push({ ...response.data.courses[key] });
        }
        dispatch(fetchCoursesFavoriteSuccess(fetchData));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchCourse = (token, id) => {
  return (dispatch) => {
    axios
      .get("/plus/student/lessons/" + id, {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(fetchCourseSuccess(response.data.lessons));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
