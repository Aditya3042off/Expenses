import React from "react";
import ReactDOM from "react-dom";
import classes from "./Backdrop.module.css";

const portalElement = document.getElementById("overlays");

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className={classes.backdrop} onClick={props.onClose} />,
    portalElement
  );
};

export default Backdrop;
