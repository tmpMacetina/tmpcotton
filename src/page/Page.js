/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SideDrawer from "../UI elements/SideDrawer/SideDrawer";
import Notification from "../UI elements/Notification/Notification";
import Home from "../components/Home/Home";
import ForHim from "../container/ForHim/ForHim";
import ForHer from "../container/ForHer/ForHer";
import AllProducts from "../container/AllProducts/AllProducts";
import Cart from "../container/Cart/Cart";
import LogIn from "../auth/LogIn";
import SignUp from "../auth/SignUp";
import OrderSuccess from "../container/OrderSuccess/OrderSuccess";
import * as actions from "../store/actions/authActions";
import ErrorPage from "./ErrorPage";
import "./Page.scss";

class Page extends Component {
  state = {
    notification: {
      showNotification: false,
      notificationMsg: ""
    }
  };

  componentDidMount() {
    this.props.authCheck();
  }

  render() {
    const openNoti = msg => {
      this.setState({
        notification: {
          showNotification: true,
          notificationMsg: msg
        }
      });
    };
    const closeNoti = () => {
      this.setState({ notification: { showNotification: false } });
    };
    const notify = msg => {
      if (this.state.notification.showNotification === false) {
        openNoti(msg);
        setTimeout(() => closeNoti(), 1000);
      } else
        setTimeout(() => {
          openNoti(msg);
          setTimeout(() => closeNoti(), 1000);
        }, 1000);
    };
    const handleLogOut = () => {
      this.props.onLogOut();
      notify("You have logged out");
    };
    return (
      <div className="page">
        <Header
          auth={!!(this.props.token || this.props.userId)}
          logOutHandler={handleLogOut}
        />
        <SideDrawer />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/tmpcotton" exact component={Home} />
          <Route path="/forher" exact component={ForHer} />
          <Route path="/forhim" exact component={ForHim} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/cart" component={Cart} />
          <Route path="/allproducts" component={AllProducts} />
          <Route path="/ordersuccess" component={OrderSuccess} />
          <Route path="*" component={ErrorPage} />
        </Switch>
        <Footer />

        {this.state.notification.showNotification ? (
          <Notification msg={this.state.notification.notificationMsg} />
        ) : null}
      </div>
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
    onLogOut: () => dispatch(actions.logout()),
    authCheck: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
