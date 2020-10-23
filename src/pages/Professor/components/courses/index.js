import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import * as actions from "../../../../store/actions";
import {connect} from "react-redux";
import Course from './Course';

const Courses = (props) => {

    const {fetchProfessorCourses} = props;

    let [courses_list, set_courses_list] = useState([]);

    useEffect(() => {
        fetchProfessorCourses(props.user.token);
    }, [fetchProfessorCourses]);


    useEffect(() => {
        if(props.courses) {
            set_courses_list((old_course) => props.courses.map((course, index) => {
                return [...old_course, <Course course={course} key={index} token={props.user.token}/>];
            }));
        }
    }, [props.courses]);

    return (
        <div className='container'>
            <div className="row align-items-center justify-content-between">
                <h1 className="title">Cursurile tale</h1>
            </div>
            <div className="row">
                {courses_list}
            </div>
        </div>
    )
};
const mapStateToProps = state => {
    return {
        courses: state.professor_courses,
        user: {...state.user}
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProfessorCourses: (token) => dispatch(actions.fetchProfessorCourses(token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);