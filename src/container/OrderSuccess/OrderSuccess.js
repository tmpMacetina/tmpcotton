/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import "./OrderSuccess.scss";
// this page shows on successful order, route is protected by ordered state from redux
// attempt to go to /ordersucces redriects to homepage
class OrderSuccess extends PureComponent {
  render() {
    let toShow = null;
    if (this.props.ordered) {
      toShow = (
        <p>
          {" "}
          Your order was succesful, check e-mail for more info
          <br /> Click&nbsp;
          <NavLink className="success-link" to="/allproducts">
            here
          </NavLink>
          &nbsp; to continue shopping
        </p>
      );
    } else toShow = <Redirect to="/" />;
    return <div className="success">{toShow}</div>;
  }
}

const mapStateToProps = state => {
  return {
    ordered: state.cart.ordered
  };
};

export default connect(mapStateToProps)(OrderSuccess);
