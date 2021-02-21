/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import "./LogIn.scss";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/authActions";
// Firebase Authentcation is used to simulate authentication
// https://firebase.google.com/docs/reference/rest/auth for more info
// TODO add spinner while waiting for an answer, add reset password
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

  // auth error removed on reloading / page change
  // error is set to true on bad login info
  componentDidMount() {
    this.props.authErrorRemove();
  }

  render() {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
    // email validation using regex
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
    // handles name input, calls verification too
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
    // validates password, just if it is >=8 chars
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
    // handles password input, calls validation too
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
    // prevent page refresh on submit
    const handleSubmit = event => {
      event.preventDefault();
    };
    // handle login function (from redux)
    const handleLogin = (email, password) => {
      this.props.onLogIn(email, password);
    };
    // enables button if all info is valid
    const buttonEnable = this.state.password.valid && this.state.email.valid;

    return (
      <form className="login-form " onSubmit={handleSubmit}>
        <h1 className="title">Log In</h1>
        <div className="form-item">
          <label htmlFor="name" className="input-title">
            E-mail:
            <input
              className="login-input"
              type="email"
              id="email"
              required
              value={this.state.email.value}
              placeholder="example@mail.com"
              onChange={handleChangeEmail}
            />
            <p className="input-error-text">
              {!this.state.email.valid && this.state.email.touched
                ? "Enter valid e-mail"
                : null}
            </p>
          </label>
        </div>
        <div className="form-item">
          <label htmlFor="password" className="input-title">
            Password:
            <input
              className="login-input"
              placeholder="password"
              type="password"
              id="password"
              value={this.state.password.value}
              required
              onChange={handleChangePassword}
            />
            <p className="input-error-text">
              {!this.state.password.valid && this.state.password.touched
                ? "Must have 8 characters"
                : null}
            </p>
          </label>
        </div>
        <button
          type="submit"
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
        {/* on successful login,redirect to home page */}
        {this.props.token && this.props.userId ? (
          <Redirect to="/cotton" />
        ) : null}
      </form>
    );
  }
}
// data from redux
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.auth.error
  };
};
// functions from redux
const mapDispatchToProps = dispatch => {
  return {
    onLogIn: (email, password) => dispatch(actions.authLogIn(email, password)),
    authErrorRemove: () => dispatch(actions.authErrorRemove())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
