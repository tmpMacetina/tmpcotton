/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./AuthStyles.scss";
// does not work, only returns to log in on valid email input
class ResetPassoword extends Component {
  state = {
    email: {
      value: "",
      valid: false,
      touched: false
    },
    reset: false
  };

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
    // handles email  input, calls verification too
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
    const handleSubmit = event => {
      event.preventDefault();
    };
    const handleReset = () => {
      this.setState({ reset: true });
    };
    const buttonEnable = this.state.email.valid;
    return this.state.reset ? (
      <div className="reset-password">
        E-mail sent,&nbsp;
        <NavLink className="auth-reset-link" to="/login">
          click here to log in!
        </NavLink>
      </div>
    ) : (
      <form className="auth-form " onSubmit={handleSubmit}>
        <h1 className="title">Password Reset</h1>
        <div className="item">
          <label htmlFor="name" className="input-title">
            E-mail:
            <input
              className="input"
              type="email"
              id="email"
              required
              value={this.state.email.value}
              placeholder="your@mail.com"
              onChange={handleChangeEmail}
            />
            <p className="input-error_text">
              {!this.state.email.valid && this.state.email.touched
                ? "Enter valid e-mail"
                : null}
            </p>
          </label>
        </div>
        <button
          type="submit"
          className="auth-button"
          disabled={!buttonEnable}
          onClick={handleReset}
        >
          Reset Password
        </button>
        <NavLink className="auth-link" to="/login">
          If u know your password, click here!
        </NavLink>
      </form>
    );
  }
}

export default ResetPassoword;
