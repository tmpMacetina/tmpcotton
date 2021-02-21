import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import PropTypes from "prop-types";
import "./Card.scss";
// presentational card component for an item
const Card = props => {
  const { onclick, name, price, image, addToCart } = props;
  return (
    <div className="fullcard">
      <div
        className="card"
        onClick={onclick}
        onKeyDown={onclick}
        role="button"
        tabIndex={0}
        // eslint wins this one
      >
        <div className="name">{name}</div>
        <div className="price">{price}&euro;</div>
        <img src={image} className="card-img" alt="cardy" />
      </div>
      <button type="button" className="button" onClick={addToCart}>
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
