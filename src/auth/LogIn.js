/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import "./LogIn.scss";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/authActions";

class LogIn extends Component {
  state = {
    email: {
      value: "",
      valid: false,
      touched: false
    },
    password: {
      value: "",
      valid: false,
      touched: false
    }
  };

  render() {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

    const validateEmail = () => {
      if (emailRegex.test(this.state.email.value))
        this.setState(prevState => ({
          ...prevState,
          email: {
            ...prevState.email,
            valid: true
          }
        }));
      else
        this.setState(prevState => ({
          ...prevState,
          email: {
            ...prevState.email,
            valid: false
          }
        }));
    };

    const handleChangeEmail = event => {
      const targetValue = event.target.value;

      this.setState(
        prevState => ({
          ...prevState,
          email: {
            ...prevState.email,
            value: targetValue,
            touched: true
          }
        }),
        () => validateEmail()
      );
    };
    const validatePassword = () => {
      if (this.state.password.value.length >= 8)
        this.setState(prevState => ({
          ...prevState,
          password: {
            ...prevState.password,
            valid: true
          }
        }));
      else
        this.setState(prevState => ({
          ...prevState,
          password: {
            ...prevState.password,
            valid: false
          }
        }));
    };

    const handleChangePassword = event => {
      const targetValue = event.target.value;

      this.setState(
        prevState => ({
          ...prevState,
          password: {
            ...prevState.password,
            value: targetValue,
            touched: true
          }
        }),
        () => validatePassword()
      );
    };

    const handleSubmit = event => {
      event.preventDefault();
    };
    const handleLogin = (email, password) => {
      this.props.onLogIn(email, password);
    };

    const buttonEnable = this.state.password.valid && this.state.email.valid;

    return (
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-text">Log In</div>
        <div className="form-item">
          <p className="input-title">E-mail:</p>
          <input
            className="login-input"
            type="email"
            required
            value={this.state.email.value}
            placeholder="example@mail.com"
            onChange={handleChangeEmail}
          />
          <p className="error-text">
            {!this.state.email.valid && this.state.email.touched
              ? "Enter valid e-mail"
              : null}
          </p>
        </div>
        <div className="form-item">
          <p className="input-title">Password:</p>
          <input
            className="login-input"
            placeholder="password"
            type="password"
            value={this.state.password.value}
            required
            onChange={handleChangePassword}
          />
          <p className="error-text">
            {!this.state.password.valid && this.state.password.touched
              ? "Must have 8 characters"
              : null}
          </p>
        </div>
        <button
          type="button"
          className="login-button"
          disabled={!buttonEnable}
          onClick={() =>
            handleLogin(this.state.email.value, this.state.password.value)
          }
        >
          Log In
        </button>
        <NavLink className="to-signup" to="/signup">
          Do not have an account? Click here!
        </NavLink>
        {this.props.error ? (
          <div className="login-error">Invalid e-mail or password</div>
        ) : null}
        {this.props.token && this.props.userId ? <Redirect to="/" /> : null}
      </form>
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
    onLogIn: (email, password) => dispatch(actions.authLogIn(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
