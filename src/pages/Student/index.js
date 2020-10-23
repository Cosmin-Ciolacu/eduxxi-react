import React from "react";
import "./Student.scss";
import Courses from './components/courses/Courses';

const Student = (props) => (
    <div className="container">
        <div className="title_container">
            <h1 className="title mb-0">Cursurile mele</h1>
        </div>
        <h1 className="title">Hai să începem să învăţăm!</h1>
        <Courses/>
    </div>
);

export default Student;