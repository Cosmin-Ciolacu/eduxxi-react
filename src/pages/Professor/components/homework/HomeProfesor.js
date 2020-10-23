import React, {useEffect, useState} from "react";
import "./Profesor.scss";
import * as actions from "../../../../store/actions";
import {connect} from "react-redux";
import Homework from "./Homework";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const HomeProfesor = props => {

    const {fetchProfessorHomeworks} = props;

    let [homeworks_list, set_homeworks_list] = useState([]);

    useEffect(() => {
        fetchProfessorHomeworks(props.user.token);
    }, [fetchProfessorHomeworks]);


    useEffect(() => {
        if(props.homeworks) {
            set_homeworks_list((old_homework) => props.homeworks.map((homework, index) => {
                return [...old_homework, <Homework homework={homework} key={index} token={props.user.token}/>];
            }));
        }
    }, [props.homeworks]);

  return (
    <div className="container">
      <div
        className={[
          "row",
          "justify-content-between",
          "align-items-center",
          "mx-0",
        ].join(" ")}
      >
        <p className="title">Temele dv.</p>
      <Button variant="contained" color="secondary">
          <Link to="/plus/instructor/homework/create">Creaza o tema</Link>
      </Button>
      </div>
        <div className="row mt-4">
            { homeworks_list }
        </div>
    </div>
  );
};

const mapStateToProps = state => {
    return {
        homeworks: state.professor_homeworks,
        user: {...state.user}
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProfessorHomeworks: (token) => dispatch(actions.fetchProfessorHomeworks(token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeProfesor);