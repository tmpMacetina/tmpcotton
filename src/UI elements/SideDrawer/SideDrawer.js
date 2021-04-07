/* eslint-disable react/prop-types */
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
      this.setState(prevState => ({
        showSideDrawer: !prevState.showSideDrawer
      }));
    };

    return ReactDOM.createPortal(
      <>
        <button
          type="button"
          className="burgerbutton"
          onClick={toggleSideDrawer}
          aria-label="burger button"
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

            <div className="sidedrawer">
              <div
                className="close"
                onClick={toggleSideDrawer}
                onKeyDown={toggleSideDrawer}
                role="link"
                tabIndex={0}
              >
                <FaTimes className="close-icon" />
              </div>
              <div>
                <NavLink
                  onClick={toggleSideDrawer}
                  activeClassName="active-class"
                  className="link"
                  exact
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  onClick={toggleSideDrawer}
                  activeClassName="active-class"
                  to="/forhim"
                  className="link"
                >
                  For him
                </NavLink>
                <NavLink
                  onClick={toggleSideDrawer}
                  activeClassName="active-class"
                  to="/forher"
                  className="link"
                >
                  For her
                </NavLink>
                {this.props.userId || this.props.token ? (
                  <NavLink
                    onClick={() => {
                      toggleSideDrawer();
                      handleLogOut();
                    }}
                    className="link"
                    to="/cotton"
                  >
                    Log out
                  </NavLink>
                ) : (
                  <NavLink
                    onClick={toggleSideDrawer}
                    activeClassName="active-class"
                    className="link"
                    to="/login"
                  >
                    Log In
                  </NavLink>
                )}
                <NavLink
                  onClick={toggleSideDrawer}
                  activeClassName="active-class"
                  to="/cart"
                  className="link"
                >
                  Cart
                </NavLink>{" "}
              </div>

              <img className="sd-img" src={Logo} alt="logo" />
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
