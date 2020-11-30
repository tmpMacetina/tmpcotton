/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import * as actions from "../../store/actions/authActions";
import Logo from "../../assets/Logo/Logo.png";
import Backdrop from "../Backdrop/Backdrop";
import "./SideDrawer.scss";

class SideDrawer extends Component {
  state = {
    showSideDrawer: false
  };

  SDref = React.createRef();

  render() {
    const handleLogOut = () => {
      this.props.onLogOut();
    };

    const toggleSideDrawer = () => {
      this.setState({ showSideDrawer: !this.state.showSideDrawer });
    };

    return ReactDOM.createPortal(
      <>
        <button
          type="button"
          className="sideDrawerButton"
          onClick={toggleSideDrawer}
        >
          <FaBars className="bars" />
        </button>

        <CSSTransition
          in={this.state.showSideDrawer}
          nodeRef={this.SDref}
          timeout={800}
          classNames="my-node"
          mountOnEnter
          unmountOnExit
        >
          <div className="holder" ref={this.SDref}>
            <Backdrop onclick={toggleSideDrawer} />

            <div className="sideDrawer">
              <div
                className="sideDrawerClose"
                onClick={toggleSideDrawer}
                onKeyDown={toggleSideDrawer}
              >
                <FaTimes className="close" />
              </div>

              <NavLink
                onClick={toggleSideDrawer}
                activeClassName="active-class"
                className="sideDrawerLink"
                exact
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                onClick={toggleSideDrawer}
                activeClassName="active-class"
                to="/forhim"
                className="sideDrawerLink"
              >
                For him
              </NavLink>
              <NavLink
                onClick={toggleSideDrawer}
                activeClassName="active-class"
                to="/forher"
                className="sideDrawerLink"
              >
                For her
              </NavLink>
              {this.props.userId || this.props.token ? (
                <div
                  className="logoutSideDraw"
                  onClick={handleLogOut}
                  onKeyDown={handleLogOut}
                >
                  Log out
                </div>
              ) : (
                <NavLink
                  onClick={toggleSideDrawer}
                  activeClassName="active-class"
                  className="sideDrawerLink"
                  to="/login"
                >
                  Log In
                </NavLink>
              )}

              <NavLink
                onClick={toggleSideDrawer}
                activeClassName="active-class"
                to="/cart"
                className="sideDrawerLink"
              >
                Cart
              </NavLink>
              <img className="sideDrawerImg" src={Logo} alt="logo" />
            </div>
          </div>
        </CSSTransition>
      </>,

      document.getElementById("side-drawer")
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.auth.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch(actions.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
