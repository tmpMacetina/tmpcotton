import React from "react";
import { Route, Switch } from "react-router-dom";
import LogIn from "../auth/LogIn";
import ResetPassword from "../auth/ResetPassword";
import Footer from "../components/Footer/Footer";

// admin part has not been made due to lack of proper back-end
// this was made just to show idea behind it
// rest of the app was made ignoring admin part
// and focusing on user part

const Admin = () => {
  return (
    <div className="admin">
      <Switch>
        <Route path="/items" exact component={null} />
        <Route path="/sales" exact component={null} />
        <Route path="/reports" exact component={null} />
        <Route path="/login" exact component={LogIn} />
        <Route path="/passwordreset" exact component={ResetPassword} />
      </Switch>
      <Footer />
    </div>
  );
};

export default Admin;
