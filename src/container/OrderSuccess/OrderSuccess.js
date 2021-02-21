/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import "./OrderSuccess.scss";
// this page shows on successful order,route is protected by ordered state from redux
// attempt to go to /ordersucces redriects to homepage
class OrderSuccess extends PureComponent {
  render() {
    let toShow = null;
    if (this.props.ordered) {
      toShow = (
        <div className="success">
          Your order was succesful,check e-mail for more info Click&nbsp;
          <NavLink className="success-link" to="/allproducts">
            here
          </NavLink>
          &nbsp; to continue shopping
        </div>
      );
    } else toShow = <Redirect to="/cotton" />;
    return <div className="success">{toShow}</div>;
  }
}

const mapStateToProps = state => {
  return {
    ordered: state.cart.ordered
  };
};

export default connect(mapStateToProps)(OrderSuccess);
