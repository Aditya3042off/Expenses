import React from "react";
import ReactDOM from "react-dom";

import classes from "./Overlay.module.css";

const portalElement = document.getElementById("overlays");

const Overlay = (props) => {
  const classesNames = [
    classes.modal,
    props.show ? classes.modalOpen : classes.modalClose
  ];

  return ReactDOM.createPortal(
    <div className={classesNames.join(" ")}>
      <div className={classes.content}>{props.children}</div>
    </div>,
    portalElement
  );
};

export default Overlay;
