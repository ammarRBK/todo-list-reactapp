import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  ServerAPI from './apis/ServerAPI';

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
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]:event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    let user={
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    user.username && user.password ? axios.post(ServerAPI.url + `users/signup`,  user )
    .then(res => {
      console.log(res.data);
      res.data === "User saved with hashed password" ? this.props.history.push('/Login') :
      console.error("cannot route");
    })
    .catch(function (error) {
      console.log(error);
    }) : alert("you've missed required inputs");
  };

  componentDidMount() {
    
  }

  render() {
    return (
        <div >
          <nav id="nav"class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
              <div class="navbar-header">
                <a class="navbar-brand" href="/">My Daily Tasks</a>
                <Link id="loginlink" to='/Login'><a class="navbar-brand">Log In</a></Link>
              </div>
            </div>
          </nav>
          <br/>
          <center>
          <h1>Sign Up</h1>
          <p>Please fill out all information</p>
          <hr/>
          <form onSubmit={this.handleSubmit}>
            <label><b> User Name:</b></label><br/>
            <input className="form-control" type='text' name="username" value={this.state.username} placeholder="Enter user name" onChange={this.handleChange} required/><br/>
            <label > <b>Email:</b> </label><br/>
            <input className="form-control" type='text' name='email' value={this.state.email} placeholder='Enter your email' onChange={this.handleChange}/><br/>
            <label ><b>Password:</b></label><br/>
            <input className="form-control" type='password' name="password" value={this.state.password} placeholder="Enter Password" onChange={this.handleChange} required/><br/>
            <label ><b>Repeat Password:</b></label><br/>
            <input className="form-control" type='password'  name="confermedPassword" value={this.state.confermedPassword} placeholder="Repeat Password" onChange={this.handleChange} required/><br/>
            <input type='submit' class="btn btn-success" value="Submit Sign Up"/>
          </form>
          </center>
        </div>
    );
  }
}

export default App;

{/* <Link to='/Login'><p>To Login</p></Link>
        <Link to='/Tasks'><p>To Tasks</p></Link>
        <Link to='/AddTask'><p>To AddTask</p></Link> */}