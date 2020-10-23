import React from "react";
import "./Professor.scss";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import CoursesList from './components/courses/index';

const Professor = (props) => (
    <div className="container">
        <div className={["row", "justify-content-between", "align-items-center", "mx-0"].join(' ')}>
            <p className="title">Începe crearea cursului</p>
            <Button variant="contained" color="secondary">
                <Link to="/plus/instructor/courses/create">Crează cursul</Link>
            </Button>
        </div>
        <CoursesList/>
    </div>
);

export default Professor;