/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/authActions";
import Countries from "../assets/phonesData.json";
import "./SignUp.scss";
// Firebase Authentcation is used to simulate authentication
// https://firebase.google.com/docs/reference/rest/auth for more info
// TODO split into 2 parts,add spinner while waiting for an answer
class SignUp extends Component {
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
    },
    passwordRepeat: {
      value: "",
      valid: false,
      touched: false
    },
    country: {
      value: "Afghanistan",
      code: "+93"
    },
    phone: {
      value: "",
      valid: false,
      touched: false
    },
    name: {
      value: "",
      valid: false,
      touched: false
    }
  };

  componentDidMount() {
    this.props.authErrorRemove();
  }

  render() {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegex = /^[0-9]+$/;
    const nameRegex = /^[a-z ,.'-]+$/;

    const validateName = () => {
      if (
        this.state.name.value.length > 7 &&
        nameRegex.test(this.state.name.value)
      )
        this.setState(prevState => ({
          ...prevState,
          name: {
            ...prevState.name,
            valid: true
          }
        }));
      else
        this.setState(prevState => ({
          ...prevState,
          name: {
            ...prevState.name,
            valid: false
          }
        }));
    };

    const handleChangeName = event => {
      const targetValue = event.target.value;
      this.setState(
        prevState => ({
          ...prevState,
          name: {
            ...prevState.name,
            value: targetValue,
            touched: true
          }
        }),
        () => {
          validateName();
        }
      );
    };

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

    const validatePasswordRepeat = () => {
      if (this.state.password.value === this.state.passwordRepeat.value)
        this.setState(prevState => ({
          ...prevState,
          passwordRepeat: {
            ...prevState.passwordRepeat,
            valid: true
          }
        }));
      else
        this.setState(prevState => ({
          ...prevState,
          passwordRepeat: {
            ...prevState.passwordRepeat,
            valid: false
          }
        }));
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

    const handleChangePasswordRepeated = event => {
      const targetValue = event.target.value;
      this.setState(
        prevState => ({
          ...prevState,
          passwordRepeat: {
            ...prevState.passwordRepeat,
            value: targetValue,
            touched: true
          }
        }),
        () => validatePasswordRepeat()
      );
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
        () => {
          validatePassword();
          validatePasswordRepeat();
        }
      );
    };

    const handleChangeCountry = event => {
      const targetValue = event.target.value;
      const code = Countries.find(obj => {
        return obj.name === targetValue;
      }).dial_code;
      this.setState({ country: { value: targetValue, code } });
    };

    const validatePhone = () => {
      if (
        phoneRegex.test(this.state.phone.value) &&
        this.state.phone.value.length > 5
      )
        this.setState(prevState => ({
          ...prevState,
          phone: {
            ...prevState.phone,
            valid: true
          }
        }));
      else
        this.setState(prevState => ({
          ...prevState,
          phone: {
            ...prevState.phone,
            valid: false
          }
        }));
    };

    const handleChangePhone = event => {
      const targetValue = event.target.value;
      this.setState(
        prevState => ({
          ...prevState,
          phone: {
            ...prevState.phone,
            value: targetValue,
            touched: true
          }
        }),
        () => {
          validatePhone();
        }
      );
    };
    // options for country selection
    const selectCountryOptions = Countries.map(country => (
      <option key={country.code} value={country.name}>
        {country.name}
      </option>
    ));

    const handleSubmit = event => {
      event.preventDefault();
    };
    // handle sign up (from redux)
    const handleSignUp = (email, password) => {
      this.props.onSignUp(email, password);
    };
    // enables button if all info is valid
    const buttonEnable =
      this.state.password.valid &&
      this.state.email.valid &&
      this.state.name.valid &&
      this.state.passwordRepeat.valid &&
      this.state.phone.valid;

    return (
      <form className="signup-form " onSubmit={handleSubmit}>
        <h1 className="title">Sign up</h1>
        <div className="form-item">
          <label htmlFor="name" className="input-title">
            Name:
            <input
              required
              className="signup-input"
              type="text"
              id="name"
              value={this.state.name.value}
              placeholder="full name"
              onChange={handleChangeName}
            />
            <p className="input-error-text">
              {!this.state.name.valid && this.state.name.touched
                ? "Enter valid name"
                : null}
            </p>
          </label>
        </div>
        {/* ==========               put label for all                    ======== */}
        <div className="form-item">
          <label htmlFor="email" className="input-title">
            E-mail:
            <input
              className="signup-input"
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
              className="signup-input"
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
        <div className="form-item">
          <label htmlFor="rpassword" className="input-title">
            Repeat password:
            <input
              className="signup-input"
              placeholder="repeat password"
              type="password"
              id="rpassword"
              required
              value={this.state.passwordRepeat.value}
              onChange={handleChangePasswordRepeated}
            />
            <p className="input-error-text">
              {!this.state.passwordRepeat.valid &&
              this.state.passwordRepeat.touched
                ? "Passwords do not match"
                : null}
            </p>
          </label>
        </div>
        <div className="form-item">
          <label htmlFor="country" className="input-title">
            Choose your country:
            <select
              id="country"
              onChange={handleChangeCountry}
              className="country-selector"
            >
              {selectCountryOptions}
            </select>
          </label>
        </div>
        <div className="form-item">
          <label htmlFor="phone" className="input-title">
            Phone number:
            <div className="phone">
              <input
                type="text"
                className="phone-start"
                value={this.state.country.code}
                readOnly
              />
              <input
                className="phone-end"
                type="text"
                id="phone"
                value={this.state.phone.value}
                placeholder="your phone number"
                onChange={handleChangePhone}
                required
              />
            </div>
            <p className="input-error-text">
              {!this.state.phone.valid && this.state.phone.touched
                ? "Enter valid phone number"
                : null}
            </p>
          </label>
        </div>

        <button
          type="submit"
          className="signup-button"
          disabled={!buttonEnable}
          onClick={() =>
            handleSignUp(this.state.email.value, this.state.password.value)
          }
        >
          Sign up
        </button>

        <NavLink className="to-login" to="/login">
          Already have an account? Click here to log in!
        </NavLink>

        {this.props.error ? (
          <div className="signup-error">User already exits or data error</div>
        ) : null}
        {/* on successful login,redirect to home page */}
        {this.props.token && this.props.userId ? (
          <Redirect to="/cotton" />
        ) : null}
      </form>
    );
  }
}
// get data from redux
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.auth.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (email, password) =>
      dispatch(actions.authSignUp(email, password)),
    authErrorRemove: () => dispatch(actions.authErrorRemove())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
