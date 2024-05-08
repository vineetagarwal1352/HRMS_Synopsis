import React, { Component } from "react";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import { Provider } from "./context";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import About from "./components/layouts/About";
import ContactUs from "./components/layouts/ContactUs";
import PageNotFound from "./components/layouts/PageNotFound";

import "./App.css";
import AddEmployee from "./components/layouts/AddEmployee";
import ActiveLoans from "./components/layouts/Admin/ActiveLoans";
import EditEmpProfile from "./components/layouts/Admin/EditEmpProfile";
import Options from "./components/layouts/Admin/Options";
import Payroll from "./components/layouts/Admin/Payroll";
import Statistics from "./components/layouts/Admin/Stats/Statistics";
import ViewRequests from "./components/layouts/Admin/View Requests/ViewRequests";
import ViewEmployees from "./components/layouts/Admin/ViewEmployees";
import EmpDashboard from "./components/layouts/EmpDashboard";
import CompanyInfo from "./components/layouts/Employee/CompanyInfo";
import LeaveRequest from "./components/layouts/Employee/LeaveRequest";
import MyAttendance from "./components/layouts/Employee/MyAttendance";
import MyRequests from "./components/layouts/Employee/MyRequests";
import MySalDetails from "./components/layouts/Employee/MySalDetails";
import OtherRequests from "./components/layouts/Employee/OtherRequests";
import ViewSingleRequest from "./components/layouts/Employee/ViewSingleRequest";
import Header from "./components/layouts/Header";
import Profile from "./components/layouts/Profile";

export default class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div>
            <Header branding="HRMS" />

            <Switch>
              {/* general */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/contactus" component={ContactUs} />
              <Route exact path="/about" component={About} />

              {/* emp related */}
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/leaveRequest" component={LeaveRequest} />
              <Route exact path="/myAttendance" component={MyAttendance} />
              <Route exact path="/myRequests" component={MyRequests} />
              <Route exact path="/empDashboard" component={EmpDashboard} />
              <Route exact path="/otherRequest" component={OtherRequests} />
              <Route exact path="/mySalDetails" component={MySalDetails} />
              <Route exact path="/companyInfo" component={CompanyInfo} />
              <Route
                exact
                path="/viewSingleRequest/:title/:reqId"
                component={ViewSingleRequest}
              />

              {/* admin related */}
              <Route exact path="/" component={Statistics} />
              <Route exact path="/add" component={AddEmployee} />
              <Route exact path="/viewRequests" component={ViewRequests} />
              <Route exact path="/statistics" component={Statistics} />
              <Route exact path="/options" component={Options} />
              <Route exact path="/payroll" component={Payroll} />
              <Route exact path="/viewEmployees" component={ViewEmployees} />
              <Route exact path="/activeLoans" component={ActiveLoans} />
              <Route
                exact
                path="/editEmpProfile/:id"
                component={EditEmpProfile}
              />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
