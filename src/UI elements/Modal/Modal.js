/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.scss";

const Modal = props => {
  return ReactDOM.createPortal(
    <>
      <div className="modal">
        <div className="img_container">
          <img className="modal-img" src={props.image} alt="modal" />
        </div>
        <div className="info">
          <p>Name: {props.name}</p>
          <p>Type: {props.type}</p>
          <p>Gender: {props.gender}</p>
          <p>Price: {props.price}&euro;</p>
          <p>Material: cotton</p>
          {props.showMessage ? (
            <p className="on_added_text">
              {props.name}&nbsp; has been added to cart
            </p>
          ) : null}
        </div>
        <div className="buttons">
          <div className="close-button" onClick={props.toggle}>
            Close
          </div>
          <div className="add-button" onClick={props.addToCart}>
            Add to cart
          </div>
        </div>

        <div className="close" onClick={props.toggle}>
          <FaTimes />
        </div>
      </div>
      <Backdrop onclick={props.toggle} />
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
