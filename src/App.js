import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confermedPassword: ""
    };
    this.handleChange= this.handleChange.bind(this);
  }

  handleChange(event){
    const target= event.target;
    this.setState({username:target.value});
    alert(this.state.username);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <center>
        <div class="container">
          <br/>
          <h1>Sign Up</h1>
          <p>Please fill out all information</p>
          <hr/>
          <form>
            <label><b> User Name:</b></label><br/>
            <input class="input" type='text' name="username" value={this.state.username} placeholder="please enter user name" onChange={this.handleChange} required/><br/><br/>
            <label > <b>Email:</b> </label><br/>
            <input class="input" type='text' name='email' placeholder='enter your email'/><br/><br/>
            <label ><b>Password:</b></label><br/>
            <input class="input" type="password" placeholder="Enter Password" name="psw" required/><br/><br/>
            <label ><b>Repeat Password:</b></label><br/>
            <input type="password" placeholder="Repeat Password" name="psw-repeat" required/>
          </form>
          <h1>{this.state.username}</h1>
        </div>
      </center>
    );
  }
}

export default App;

{/* <Link to='/Login'><p>To Login</p></Link>
        <Link to='/Tasks'><p>To Tasks</p></Link>
        <Link to='/AddTask'><p>To AddTask</p></Link> */}