import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui stadard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">
          <p>{props.message}</p>
        </div>
        <div className="actions">
          <div onClick={() => props.onAccept()} className="ui red button">
            {props.btn1}
          </div>
          <div onClick={props.onDismiss} className="ui primary button">
            {props.btn2}
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
