import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends Component {

  constructor() {
    super();
    this.state = {
    }
      
  }

  render() {
    return (
      <div class="container">
       <h1>Welcom from Login</h1>
      </div>
    );
  }
}

export default Login;