/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import PropTypes from "prop-types";
import "./Card.scss";

const Card = props => {
  const { onclick, name, price, image, addToCart } = props;
  return (
    <div className="fullcard">
      <div className="card" onClick={onclick}>
        <div className="card-name">{name}</div>
        <div className="card-price">{price}&euro;</div>
        <img src={image} className="card-img" alt="cardy" />
      </div>
      <button type="button" className="card-button" onClick={addToCart}>
        ADD TO CART &ensp;
        <FaShoppingCart className="shopingcart-icon" />
      </button>
    </div>
  );
};

export default Card;
Card.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onclick: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired
};
