import React from 'react';
import Menu from "../Menu/Menu";
import {withRouter} from 'react-router-dom';
import useStyles from "../../styles";

const Layout = props => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Menu/>
            {props.children}
        </div>
    );
}

export default withRouter(Layout);