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
      <div className="cartitem-left">
        <img className="cartitem-img" src={img} alt="smallCart" />
        <div className="cartitem-nameprice">
          <div>{name}</div>
          <div>{price}&euro;</div>
        </div>
      </div>
      <div className="cartitem-right">
        <button type="button" onClick={addQuantity} className="cartitem-add">
          +
        </button>
        <div className="cartitem-quanti">{quantity}</div>
        <button type="button" onClick={reduceQuantity} className="cartitem-sub">
          -
        </button>
        <button
          type="button"
          onClick={removeFromCart}
          className="cartitem-remove"
        >
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
