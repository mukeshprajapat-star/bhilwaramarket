import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon />

      <Typography>Page Not Found </Typography>
      <Link to="/"><Button style={{width:"250px" ,paddingLeft:" 7vmax"}}>Home </Button></Link>
    </div>
  );
};

export default NotFound;