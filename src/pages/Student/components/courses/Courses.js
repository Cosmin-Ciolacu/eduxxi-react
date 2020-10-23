import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import * as actions from "../../../../store/actions";
import Course from './Course';
import {useLocation} from "react-router";

const Courses = (props) => {

    let [courses_list, set_course_list] = useState([]);
    const location = useLocation();
    useEffect(() => {
        if(location.pathname === "/student/courses/favorites") {
            props.fetchFavoriteCourses(props.user.token);
        } else {
            props.fetchCourses(props.user.token);
        }

    }, [props.fetchCourses, props.fetchFavoriteCourses, location]);

    useEffect(() => {
        if(props.courses) {
            console.log(props);
            set_course_list((old_course) => props.courses.map((course, index) => {
                return [...old_course, <Course course={course} key={index} token={props.user.token}/>];
            }));
        }
    }, [props.courses]);

    return (
        <div className="row">
            { courses_list }
        </div>
    );
};


const mapStateToProps = state => {
    return {
        courses: state.courses,
        user: {...state.user}
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCourses: (token) => dispatch(actions.fetchCourses(token)),
        fetchFavoriteCourses: (token) => dispatch(actions.fetchFavoriteCourses(token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);