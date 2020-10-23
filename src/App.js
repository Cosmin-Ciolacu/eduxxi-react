import React, { useState, useEffect } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { Switch } from "react-router";
import { connect } from "react-redux";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Professor from "./pages/Professor/index";
import Courses from "./pages/Professor/components/courses/index";
import Layout from "./pages/Layout/Layout";
import SignUp from "./pages/Auth/components/SignUp";
import SignIn from "./pages/Auth/components/Signin";
import CoursesForm from "./pages/Professor/components/courses/Form";
import "./App.scss";
import StudentHome from "./pages/Student/index";
import StudentCourseDetails from "./pages/Student/components/courses/CourseDetails";
import HomeProfesor from "./pages/Professor/components/homework/HomeProfesor";
import CreateHomework from "./pages/Professor/components/homework/components/CreateHomework";
import StudentHomeworks from "./pages/Student/components/homeworks/Homeworks";
import Homework from "./pages/Professor/components/homework/Homework";
import Homeworks from "./pages/Professor/components/homework/Homeworks";
import CreateHour from "./pages/Professor/hours/CreateHour";
import JoinHour from "./pages/Professor/hours/JoinHour";
import Hours from "./pages/Student/components/hours/Hours";

const App = (props) => {
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("jwt");
    setJwt(data);
  }, [jwt]);

  let routes = (
    <Switch>
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/" exact>
        {!jwt ? <Auth /> : <Home />}
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  if (props.user.token !== null) {
    if (props.user.accountType === "profesor") {
      routes = (
        <Switch>
          <Route
            path="/plus/instructor/homework/create"
            component={CreateHomework}
          />
          <Route
            path="/plus/instructor/courses/create"
            component={CoursesForm}
          />
          <Route path="/plus/instructor/courses" exact component={Courses} />
          <Route path="/plus/instructor" exact component={Professor} />
          <Route path="/plus" exact component={Professor} />
          <Route path="/" exact component={HomeProfesor} />
          <Route
            path="/student-homework/:homeworkId"
            exact
            component={Homeworks}
          />
          <Route path="/create-hour" component={CreateHour}></Route>

          <Route path="/join-hour/:hourId" component={JoinHour}></Route>
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/student/homeworks" component={StudentHomeworks} />
          <Route path="/student/courses/favorites" component={StudentHome} />
          <Route path="/student/courses" component={StudentHome} />
          <Route path="/student/course" component={StudentCourseDetails} />
          <Route path="/student" exact component={StudentHome} />
          <Route path="/student/hours" exact component={Hours} />
          <Route path="/join-hour/:hourId" component={JoinHour}></Route>
          <Route path="/" exact component={StudentHome} />
          <Redirect to="/" />
        </Switch>
      );
    }
  }

  return <Layout>{routes}</Layout>;
};

const mapStateToProps = (state) => {
  return {
    user: { ...state.user },
  };
};

export default withRouter(connect(mapStateToProps)(App));
