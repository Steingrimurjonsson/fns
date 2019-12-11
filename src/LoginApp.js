import React, { Component } from "react";
import facadeAdmin from "./LoginFacade";

class LogInAsAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  loginAsAdmin = evt => {
    evt.preventDefault();
    this.props.loginAsAdmin(this.state.username, this.state.password);
  };
  onChange = evt => {
    this.setState({ [evt.target.id]: evt.target.value });
  };

  render() {
    return (
      <div>
        <h2>Login as Admin</h2>
        <form onSubmit={this.loginAsAdmin} onChange={this.onChange}>
          <input placeholder="Username" id="username" />
          <input placeholder="Password" id="password" />
          <button>Login as Admin</button>
        </form>
      </div>
    );
  }
}
class LoggedInAsAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = { dataFromServer: "Fetching!!" };
  }
  componentDidMount() {
    facadeAdmin
      .fetchData()
      .then(res => this.setState({ dataFromServer: res.msg }));
  }
  render() {
    return (
      <div>
        <h2>Data Received from server</h2>
        <h3>{this.state.dataFromServer}</h3>
      </div>
    );
  }
}

class LogInApp extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  logoutAsAdmin = () => {
    facadeAdmin.logoutAsAdmin();
    this.setState({ loggedIn: false });
  };
  loginAsAdmin = (user, pass) => {
    facadeAdmin
      .loginAsAdmin(user, pass)
      .then(res => this.setState({ loggedIn: true }));
  };

  render() {
    return (
      <div>
        {!this.state.loggedIn ? (
          <LogInAsAdmin loginAsAdmin={this.loginAsAdmin} />
        ) : (
          <div>
            <LoggedInAsAdmin />
            <button onClick={this.logoutAsAdmin}>Logout</button>
          </div>
        )}
      </div>
    );
  }
}
export default LogInApp;