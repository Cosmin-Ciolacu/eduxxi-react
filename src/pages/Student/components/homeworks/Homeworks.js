import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import * as actions from "../../../../store/actions";
import Homework from './Homework';

const Homeworks = (props) => {

    const {fetchHomeworks} = props;

    let [homeworks_list, set_homeworks_list] = useState([]);

    useEffect(() => {
        fetchHomeworks(props.user.token);
    }, [fetchHomeworks]);

    useEffect(() => {
        if(props.homeworks) {
            set_homeworks_list((old_homework) => props.homeworks.map((homework, index) => {
                return [...old_homework, <Homework homework={homework} key={index} token={props.user.token}/>];
            }));
        }
    }, [props.homeworks]);

    return (
        <div className="container">
            <div className="title_container">
                <h1 className="title mb-0">Temele mele</h1>
            </div>
            <h1 className="title">Hai să începem să învăţăm!</h1>
            <div className="row">
                { homeworks_list }
            </div>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        homeworks: state.homeworks,
        user: {...state.user}
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchHomeworks: (token) => dispatch(actions.fetchHomeworks(token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Homeworks);