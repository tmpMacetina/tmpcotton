import React from "react";
import "./CartItem.scss";
import PropTypes from "prop-types";

const CartItem = props => {
  const {
    img,
    name,
    price,
    addQuantity,
    quantity,
    reduceQuantity,
    removeFromCart
  } = props;
  return (
    <div className="cartitem">
      <div className="left">
        <img className="cartitem-img" src={img} alt="smallCart" />
        <div className="nameprice">
          <div>{name}</div>
          <div>{price}&euro;</div>
        </div>
      </div>
      <div className="right">
        <button type="button" onClick={addQuantity} className="add">
          +
        </button>
        <div className="quanti">{quantity}</div>
        <button type="button" onClick={reduceQuantity} className="sub">
          -
        </button>
        <button type="button" onClick={removeFromCart} className="remove">
          REMOVE THE ITEM
        </button>
      </div>
    </div>
  );
};

export default CartItem;

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  addQuantity: PropTypes.func.isRequired,
  reduceQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired
};
