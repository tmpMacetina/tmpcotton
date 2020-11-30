/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cartActions";

import "./Cart.scss";
import CartItem from "./CartItem/CartItem";

class Cart extends Component {
  render() {
    const handleOnSubmit = () => {
      this.props.onCleanCart();
      this.props.history.push(`/ordersuccess`);
    };
    const handleAddQuantity = id => {
      this.props.onAddFromCart(id);
    };
    const handleSubQuantity = id => {
      this.props.onSubFromCart(id);
    };
    const handleRemoveFromCart = id => {
      this.props.onRemoveFromCart(id);
    };
    const itemsToAdd = this.props.addedItems.map(item => {
      return (
        <CartItem
          key={item.id}
          img={item.image}
          price={item.price}
          name={item.name}
          quantity={item.quantity}
          addQuantity={() => handleAddQuantity(item.id)}
          removeFromCart={() => handleRemoveFromCart(item.id)}
          reduceQuantity={() => handleSubQuantity(item.id)}
        />
      );
    });

    const loggedIn = this.props.token && this.props.userId;
    const enableButton = !!(this.props.addedItems.length > 0 && loggedIn);

    return (
      <div className="cart">
        <div className="cart-text">CART:</div>
        {itemsToAdd}
        <div className="cart-total">TOTAL:{this.props.total} &euro;</div>

        <button
          type="button"
          className="cart-orderbutton"
          disabled={!enableButton}
          onClick={handleOnSubmit}
        >
          ORDER NOW
        </button>
        <p className="cart-require">
          {loggedIn ? null : "you must be logged in to order"}
        </p>
        <p className="cart-require">
          {this.props.addedItems.length === 0 ? "cart can not be empty" : null}
        </p>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    items: state.cart.items,
    addedItems: state.cart.addedItems,
    total: state.cart.total,
    token: state.auth.token,
    userId: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRemoveFromCart: id => dispatch(actions.removeItem(id)),
    onSubFromCart: id => dispatch(actions.subtractQuantity(id)),
    onAddFromCart: id => dispatch(actions.addQuantity(id)),
    onCleanCart: () => dispatch(actions.clearCart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
