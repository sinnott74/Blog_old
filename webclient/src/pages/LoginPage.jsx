import React from 'react';
import Card from '../components/Card';
import Link from '../components/Link';
import { connect } from "react-redux";
import { login } from '../actions/auth';
import { Redirect } from 'react-router';
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields/TextField';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Log In";
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    if (username && password) {
       this.props.handleLogin(username, password);
    }
  }

  render() {
    if(this.props.loggedIn){
      return <Redirect to={this._getRedirectUrl()} />
    }

    return (
      <Card>
        <h2>Login</h2>

        <form onSubmit={this.handleSubmit}>
          <TextField
            type='email'
            name='username'
            label='Username'
            required
            value={this.state.username}
            autoComplete='email'
            onChange={(username, e) => {
              this.setState({username});
            }}
          />
          <TextField
            type='password'
            name='password'
            label='Password'
            required
            autoComplete='current-password'
            value={this.state.password}
            onChange={(password, e) => {
              this.setState({password});
            }}
          />
          <Button raised={true} primary type="submit">Login</Button>
          <Link to="/signup">Sign Up</Link>
        </form>
      </Card>
    );
  }

  _getRedirectUrl() {
    var { from } = this.props.location.state || {from: {pathname: '/'}}
    let forwardUrl = from;
    return forwardUrl;
  }
}


const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn
});

const mapDispatchToProps = {
  handleLogin: login
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)